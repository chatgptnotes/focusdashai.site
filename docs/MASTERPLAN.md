# Focus Dash - Technical Masterplan

This document serves as the internal technical masterplan for the Focus Dash platform.

## Vision

Focus Dash is a vertical customer success command centre designed to answer three critical questions for leadership teams:

1. Are our customers staying and growing with us?
2. Are customers actually using what they bought?
3. Who is at risk, and what must we do now?

## Version 1 Scope

### What Ships in V1

✅ **Core Platform**
- Multi-tenant PostgreSQL database with full data isolation
- Next.js 14 frontend with TypeScript and Tailwind CSS
- RESTful API endpoints for metrics, accounts, and portfolio
- Focus Pulse Score calculation engine

✅ **User Interfaces**
- Portfolio overview dashboard
- Account list with filters (vertical, status, segment, owner)
- Account detail view with pulse components
- Admin upload interface with CSV validation

✅ **Data Ingestion**
- CSV batch upload with row-level validation
- Automatic pulse score recalculation after upload
- Support for three verticals: Tech, Healthcare, Manufacturing

✅ **Metrics System**
- 20+ predefined metric types across verticals
- Configurable pulse weights per tenant/vertical
- Component scoring: Usage, Experience, Outcomes, Risk

### Non-Goals for V1

- ❌ Real-time streaming from product analytics
- ❌ Full self-service metric configuration
- ❌ Advanced tenant theming
- ❌ Production-grade authentication (placeholder only)
- ❌ Historical trend visualization (data collection only)

## Architecture

### Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js 14 (App Router) | Modern React framework with excellent DX |
| Backend | Next.js API Routes | Simplifies deployment, reduces complexity |
| Database | PostgreSQL + Prisma | Relational data model, type-safe queries |
| Styling | Tailwind CSS | Rapid UI development, consistent design |
| Charts | Recharts | Lightweight, composable chart library |
| CSV | PapaParse | Robust CSV parsing with error handling |

### Database Design

**Multi-tenancy Strategy**: Shared database with `tenantId` column on all tables. All queries scoped by tenant.

**Core Entities**:
```
tenants (1) → (N) users
tenants (1) → (N) accounts
tenants (1) → (N) pulse_weights
accounts (1) → (N) metrics
accounts (1) → (N) pulse_scores
```

**Key Indexes**:
- `metrics`: `(tenantId, accountId, metricType, periodStart)`
- `pulse_scores`: `(tenantId, accountId, periodStart)`
- `accounts`: `(tenantId, vertical, ownerUserId)`

### Focus Pulse Score Engine

**File**: `lib/pulse-calculator.ts`

**Algorithm**:

1. Fetch all metrics for account and period
2. Group metrics by component (Usage, Experience, Outcomes, Risk)
3. Normalize each metric to 0-100 scale based on type
4. Average normalized values within each component
5. Apply vertical-specific weights to calculate composite score
6. Determine status based on configurable thresholds

**Default Weights**:
- Usage: 35%
- Experience: 25%
- Outcomes: 25%
- Risk: 15% (inverted: `(100 - risk) × 0.15`)

**Status Thresholds**:
- Green: ≥70
- Amber: 50-69
- Red: <50

### Data Flow

```
CSV Upload → Validation → Metrics Table → Pulse Calculator → Pulse Scores Table → UI
```

**Validation Steps**:
1. Parse CSV with PapaParse
2. Check account name exists
3. Validate metric type is known
4. Validate date formats (YYYY-MM-DD)
5. Validate numeric values
6. Return detailed errors for invalid rows

**Calculation Trigger**:
- Automatically after successful CSV upload
- Can be manually triggered via API endpoint (future)
- Recalculates for entire period if new metrics added

## API Design

### POST /api/metrics/upload

**Purpose**: Batch upload metrics via CSV

**Input**:
- `file`: multipart/form-data CSV file
- `tenantId`: string

**Output**:
```typescript
{
  success: boolean
  message: string
  uploaded: number
  errors?: Array<{
    row: number
    field: string
    message: string
  }>
}
```

**Logic**:
1. Parse CSV
2. Validate all rows
3. If errors, return them with 400 status
4. If valid, insert metrics
5. Recalculate pulse scores for affected period
6. Return success

### GET /api/accounts

**Purpose**: List accounts with filters and latest scores

**Query Params**:
- `tenantId` (required)
- `vertical`, `status`, `segment`, `ownerId` (optional)

**Output**:
```typescript
{
  accounts: Array<{
    id: string
    name: string
    vertical: string
    segment: string | null
    mrr: number
    owner: { name: string } | null
    latestScore: {
      score: number
      status: string
      periodStart: Date
      components: {
        usage: number
        experience: number
        outcomes: number
        risk: number
      }
    } | null
  }>
}
```

### GET /api/portfolio

**Purpose**: Portfolio-level metrics

**Query Params**:
- `tenantId` (required)

**Output**:
```typescript
{
  totalAccounts: number
  totalMRR: number
  avgPulseScore: number
  scoreDistribution: {
    green: number
    amber: number
    red: number
  }
  topRisk: Account[]      // 10 lowest scores
  topUpside: Account[]    // 10 highest MRR with green status
}
```

## Vertical Metric Mappings

### Tech Vertical

| Metric Type | Component | Normalization |
|-------------|-----------|---------------|
| `active_users_percent` | Usage | 0-100 as-is |
| `hero_feature_adoption_percent` | Usage | 0-100 as-is |
| `license_utilisation_percent` | Usage | 0-100 as-is |
| `integration_count` | Usage | 0-10 → 0-100 |
| `nps_score` | Experience | -100 to 100 → 0-100 |
| `csat_score` | Experience | 0-100 as-is |
| `ces_score` | Experience | 0-100 as-is |
| `nrr_percent` | Outcomes | 0-100 as-is |
| `expansion_mrr` | Outcomes | 0-100 as-is |
| `contraction_mrr` | Risk | 0-100 as-is |

### Healthcare Vertical

| Metric Type | Component | Normalization |
|-------------|-----------|---------------|
| `staff_adoption_percent` | Usage | 0-100 as-is |
| `patient_experience_score` | Experience | 0-100 as-is |
| `patient_wait_time_minutes` | Risk | <30 mins = 100, inverse |
| `no_show_rate_percent` | Risk | Lower is better, inverse |
| `complaint_rate_per_1000` | Risk | <5 = 100, inverse |

### Manufacturing Vertical

| Metric Type | Component | Normalization |
|-------------|-----------|---------------|
| `sla_adherence_percent` | Usage | 0-100 as-is |
| `otif_percent` | Outcomes | 0-100 as-is |
| `first_pass_yield_percent` | Outcomes | 0-100 as-is |
| `unplanned_downtime_hours` | Risk | <8 hrs/month = 100, inverse |
| `mttr_hours` | Risk | <4 hrs = 100, inverse |
| `mtbf_hours` | Outcomes | 100+ hrs = 100 |
| `line_stops_count` | Risk | <20/month = 100, inverse |

## Delivery Sprints

### Sprint 1: Foundations ✅
- Database schema and Prisma setup
- Core types and utilities
- Basic Next.js structure
- Landing page

### Sprint 2: Pulse Engine ✅
- Pulse calculator implementation
- Metric normalization logic
- Seeding script with sample data
- Unit tests for calculations

### Sprint 3: Data Ingestion ✅
- CSV upload API endpoint
- Validation logic
- Admin upload UI
- Error reporting

### Sprint 4: Dashboards ✅
- Portfolio overview page
- Account list with filters
- Account detail view
- Vertical tabs

### Sprint 5: Polish (Future)
- Authentication with NextAuth
- Role-based access control
- Historical trend charts
- Performance optimization

## Deployment Checklist

### Pre-deployment

- [ ] Set production `DATABASE_URL`
- [ ] Generate strong `NEXTAUTH_SECRET`
- [ ] Set `NEXTAUTH_URL` to production domain
- [ ] Run database migrations: `npm run db:migrate`
- [ ] Build application: `npm run build`
- [ ] Test build locally: `npm run start`

### Infrastructure

- [ ] PostgreSQL 14+ instance provisioned
- [ ] Connection pooling configured (PgBouncer recommended)
- [ ] Backups scheduled (daily recommended)
- [ ] SSL enforced on database connections
- [ ] Node.js 18+ runtime
- [ ] Environment variables set in hosting platform

### Security

- [ ] Database credentials rotated
- [ ] CORS configured appropriately
- [ ] Rate limiting on API endpoints (future)
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS prevention (React handles this)

### Monitoring

- [ ] Error tracking configured (Sentry recommended)
- [ ] Database performance monitoring
- [ ] API response time tracking
- [ ] Uptime monitoring

## Performance Targets

| Metric | Target | Notes |
|--------|--------|-------|
| Portfolio page load | <2s | With 5,000 accounts |
| Account list render | <1s | With 1,000 accounts |
| CSV upload (1,000 rows) | <10s | Including validation and calculation |
| Pulse score calculation | <100ms | Per account |
| Database query time | <200ms | 95th percentile |

## Data Retention Policy

- Metrics: Keep indefinitely for historical analysis
- Pulse Scores: Keep indefinitely
- Audit logs: Keep 2 years (future feature)
- User sessions: 30 days

## Future Enhancements

### Version 1.1
- NextAuth.js integration with email/password
- RBAC middleware on all routes
- CSV export from account list
- Historical trend charts (line charts)

### Version 1.2
- Custom metric definitions per tenant
- Configurable pulse weights via UI
- Bulk account import
- User management interface

### Version 2.0
- Real-time metric ingestion API
- Webhooks for score changes
- Slack/Teams notifications
- Integration marketplace (Segment, Mixpanel, etc.)
- Multi-language support

### Version 3.0
- AI-powered risk prediction
- Automated intervention recommendations
- Cohort analysis
- Revenue forecasting

## Team Roles

| Role | Responsibility |
|------|----------------|
| Engagement Lead | Client communication, delivery oversight |
| Customer Success Architect | Metric design, review rhythms, training |
| Data Engineer | Database, APIs, pulse calculator |
| Frontend Developer | UI components, dashboards |
| QA Engineer | Testing, validation, performance |

## Success Metrics

- **Technical**: <2s page loads, <1% error rate, 99.9% uptime
- **Business**: Leadership can identify top 10 risk accounts in <5 minutes
- **Adoption**: 80% of CSMs log in weekly within 3 months
- **Accuracy**: Pulse scores trusted by both business and data teams

---

**Last Updated**: December 2024
**Document Owner**: BETTROI Engineering
**Status**: Active Development
