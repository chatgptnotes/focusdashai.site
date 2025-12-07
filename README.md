# Focus Dash

**Customer Success Command Centre for Tech, Healthcare, and Manufacturing**

Focus Dash is a vertical-specific customer success platform that brings the pulse of customers onto a single, simple screen. It answers three critical questions:

1. Are our customers staying and growing with us?
2. Are customers actually using what they bought?
3. Who is at risk, and what must we do now?

## Key Features

- **Focus Pulse Score**: A composite 0-100 score per account combining Usage, Experience, Outcomes, and Risk
- **Vertical-Specific Metrics**: Tailored KPIs for Tech, Healthcare, and Manufacturing industries
- **Portfolio Overview**: Executive dashboard showing overall health, NRR, and top risk/upside accounts
- **Account List View**: Filterable list with pulse scores, status indicators, and financial metrics
- **Account Detail View**: Deep dive into individual accounts with component breakdowns and historical trends
- **CSV Batch Upload**: Easy metric ingestion with validation and error reporting
- **Multi-tenant Architecture**: Built for SaaS deployment with tenant isolation

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (ready to configure)
- **Charts**: Recharts
- **CSV Processing**: PapaParse

## Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL 14 or higher
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd focusdashai.site
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and configure your database connection:
```
DATABASE_URL="postgresql://username:password@localhost:5432/focusdash?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
```

4. **Initialize the database**
```bash
npm run db:push
```

This will create all tables based on the Prisma schema.

5. **Seed sample data (optional)**
```bash
npx tsx prisma/seed.ts
```

This creates:
- Demo tenant (Bettroi Demo)
- 3 users (admin, 2 CSMs)
- 8 sample accounts across Tech, Healthcare, Manufacturing
- Sample metrics for October 2024
- Calculated pulse scores

Demo credentials:
- Email: `admin@bettroi.com`
- Password: `password123`

6. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
focusdashai.site/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── accounts/             # Account CRUD endpoints
│   │   ├── metrics/              # Metric upload endpoints
│   │   └── portfolio/            # Portfolio metrics endpoint
│   ├── dashboard/                # Dashboard pages
│   │   ├── accounts/             # Account list and detail
│   │   ├── admin/                # Admin interface
│   │   └── page.tsx              # Portfolio overview
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── lib/                          # Shared libraries
│   ├── db.ts                     # Prisma client
│   ├── pulse-calculator.ts       # Focus Pulse Score engine
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Utility functions
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seeding script
├── public/
│   └── templates/                # CSV templates
│       ├── tech-metrics-template.csv
│       ├── healthcare-metrics-template.csv
│       └── manufacturing-metrics-template.csv
└── package.json
```

## Database Schema

### Core Entities

- **tenants**: Organizations using Focus Dash
- **users**: Admin, Manager, and CSM roles
- **accounts**: Customer accounts with vertical and segment
- **metrics**: Raw metric values by account and period
- **pulse_scores**: Calculated Focus Pulse Scores
- **pulse_weights**: Configurable weights and thresholds per vertical

### Metric Types by Vertical

**Tech Vertical**:
- `nrr_percent`, `mrr`, `expansion_mrr`, `contraction_mrr`
- `active_users_percent`, `hero_feature_adoption_percent`
- `license_utilisation_percent`, `integration_count`
- `nps_score`, `csat_score`, `ces_score`

**Healthcare Vertical**:
- `staff_adoption_percent`
- `patient_experience_score`
- `patient_wait_time_minutes`, `no_show_rate_percent`
- `complaint_rate_per_1000`

**Manufacturing Vertical**:
- `sla_adherence_percent`, `otif_percent`
- `first_pass_yield_percent`
- `unplanned_downtime_hours`, `mttr_hours`, `mtbf_hours`
- `line_stops_count`

## Focus Pulse Score Calculation

The Focus Pulse Score is a weighted composite of four components:

```
Pulse Score = (Usage × 0.35) + (Experience × 0.25) + (Outcomes × 0.25) + ((100 - Risk) × 0.15)
```

Each component is scored 0-100 based on normalized metrics.

**Status Thresholds**:
- Green: Score ≥ 70
- Amber: 50 ≤ Score < 70
- Red: Score < 50

Weights are configurable per tenant and vertical.

## Using the Platform

### Uploading Metrics

1. Navigate to **Admin** → **Upload Metrics**
2. Download the appropriate CSV template for your vertical
3. Fill in account names, metric types, period dates, and values
4. Upload the CSV file
5. Review validation results and fix any errors
6. Pulse scores are automatically recalculated

### Viewing Portfolio Overview

The portfolio dashboard shows:
- Total accounts and MRR
- Average pulse score
- Score distribution (Green/Amber/Red)
- Top 10 risk accounts (lowest scores)
- Top 10 upside accounts (high scores, high MRR)

### Managing Accounts

**Account List**:
- Filter by vertical, status, segment, owner
- Sort by any column
- Export to CSV

**Account Detail**:
- View current pulse score and components
- See vertical-specific metrics
- Review historical trends (when available)
- Log actions and notes

## API Reference

### POST /api/metrics/upload

Upload metrics via CSV.

**Form Data**:
- `file`: CSV file
- `tenantId`: Tenant ID

**Response**:
```json
{
  "success": true,
  "message": "Successfully uploaded 50 metrics",
  "uploaded": 50,
  "period": {
    "start": "2024-10-01T00:00:00.000Z",
    "end": "2024-10-31T00:00:00.000Z"
  }
}
```

### GET /api/accounts?tenantId={id}

List accounts with latest pulse scores.

**Query Parameters**:
- `tenantId` (required)
- `vertical` (optional): tech, healthcare, manufacturing
- `status` (optional): green, amber, red
- `segment` (optional): enterprise, mid-market, smb
- `ownerId` (optional): User ID

### GET /api/portfolio?tenantId={id}

Get portfolio metrics.

**Response**:
```json
{
  "totalAccounts": 8,
  "totalMRR": 295000,
  "avgPulseScore": 74.5,
  "scoreDistribution": {
    "green": 5,
    "amber": 2,
    "red": 1
  },
  "topRisk": [...],
  "topUpside": [...]
}
```

## Deployment

### Environment Variables

For production, ensure these are set:

```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<strong-random-secret>
NODE_ENV=production
```

### Database Migrations

```bash
npm run db:migrate
```

### Build and Start

```bash
npm run build
npm run start
```

## Roadmap

### Version 1.0 (Current)
- ✅ Multi-tenant database schema
- ✅ Focus Pulse Score calculation engine
- ✅ CSV batch upload
- ✅ Portfolio, account list, and account detail views
- ✅ Vertical-specific metric mappings

### Version 1.1 (Planned)
- [ ] Authentication with NextAuth.js
- [ ] Role-based access control (Admin, Manager, CSM)
- [ ] Account actions and notes
- [ ] Historical trend charts
- [ ] Excel export

### Version 2.0 (Future)
- [ ] Real-time metric ingestion via API
- [ ] Integrations with product analytics tools
- [ ] Custom metric definitions
- [ ] Advanced theming per tenant
- [ ] Email alerts for status changes

## Support

For questions or support:
- Email: support@bettroi.com
- Documentation: [docs.bettroi.com](https://bettroi.com)

## License

Proprietary - BETTROI FZE

---

Built with ❤️ by BETTROI FZE
