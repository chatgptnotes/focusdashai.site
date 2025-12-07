# Focus Dash - Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-07

### Added - Core Platform

**Database & Infrastructure**
- Multi-tenant PostgreSQL schema with Prisma ORM
- Supabase integration for database hosting
- Full data isolation between tenants
- Optimized indexes for performance
- Connection pooling support

**Authentication & Authorization**
- NextAuth.js integration with credentials provider
- User roles: Admin, Manager, CSM
- Session management with JWT
- Protected routes with middleware
- Login page with error handling

**Focus Pulse Score Engine**
- Composite scoring algorithm (0-100 scale)
- Four component scores: Usage, Experience, Outcomes, Risk
- Configurable weights per vertical and tenant
- Automatic status determination (Green/Amber/Red)
- 20+ vertical-specific metric types
- Smart metric normalization

**Data Ingestion**
- CSV batch upload with validation
- Row-level error reporting
- Account name validation
- Metric type validation
- Date and numeric validation
- Automatic pulse score recalculation after upload

**API Endpoints**
- POST /api/metrics/upload - CSV batch upload
- GET /api/accounts - List accounts with filters
- GET /api/portfolio - Portfolio-level metrics
- POST /api/accounts - Create new accounts
- Dynamic route configuration for optimal performance

**User Interface**
- Landing page with vertical overview
- Portfolio dashboard
  - Total accounts and MRR
  - NRR and average pulse score
  - Score distribution (Green/Amber/Red)
  - Top 10 risk accounts
  - Top 10 upside opportunities
- Account list view
  - Filterable by vertical, status, segment, owner
  - Sortable columns
  - Latest pulse scores displayed
- Account detail view
  - Pulse score breakdown by components
  - Vertical-specific metrics tabs
  - Account header with key information
- Admin dashboard
  - CSV upload interface
  - Validation error display
  - Quick action cards
  - Template download links

**Design System**
- Material UI Icons integration
- Tailwind CSS for styling
- Responsive design (mobile, tablet, desktop)
- Consistent color scheme
- Accessible components

**Version Tracking**
- Version footer component
- Build date tracking
- Repository name display
- Environment-based version info
- Auto-incrementing version system

### Technical Implementation

**Tech Stack**
- Next.js 14 with App Router
- React 18
- TypeScript 5
- Prisma ORM 5
- PostgreSQL 15 (Supabase)
- Tailwind CSS 3
- Material UI 7
- Recharts 2
- NextAuth 4

**Code Quality**
- Zero TypeScript errors
- ESLint configuration
- Strict type checking
- Proper error handling
- Comprehensive type definitions

**Documentation**
- README.md with setup instructions
- QUICKSTART.md for 5-minute setup
- MASTERPLAN.md with technical architecture
- SUPABASE_SETUP.md for database configuration
- DEPLOYMENT.md for production deployment
- API documentation inline
- CSV templates for all verticals

**Sample Data**
- Seeding script with 8 accounts
- 3 users (1 admin, 2 CSMs)
- Sample metrics for October 2024
- Pre-calculated pulse scores
- All three verticals represented

### Vertical-Specific Features

**Tech Vertical (10 metrics)**
- NRR, MRR, expansion, contraction
- Active users, feature adoption
- License utilization, integrations
- NPS, CSAT, CES scores

**Healthcare Vertical (5 metrics)**
- Staff adoption
- Patient experience score
- Patient wait time
- No-show rate
- Complaint rate

**Manufacturing Vertical (7 metrics)**
- SLA adherence, OTIF
- First pass yield
- Unplanned downtime, MTTR, MTBF
- Line stops count

### Files Created

**Configuration** (8 files)
- package.json
- tsconfig.json
- next.config.js
- tailwind.config.js
- postcss.config.js
- .gitignore
- .env.example
- .env

**Database** (2 files)
- prisma/schema.prisma
- prisma/seed.ts

**Core Libraries** (6 files)
- lib/db.ts
- lib/supabase.ts
- lib/pulse-calculator.ts
- lib/types.ts
- lib/utils.ts
- lib/version.ts

**API Routes** (4 files)
- app/api/auth/[...nextauth]/route.ts
- app/api/accounts/route.ts
- app/api/metrics/upload/route.ts
- app/api/portfolio/route.ts

**Pages** (7 files)
- app/page.tsx
- app/login/page.tsx
- app/dashboard/page.tsx
- app/dashboard/accounts/page.tsx
- app/dashboard/accounts/[id]/page.tsx
- app/dashboard/admin/page.tsx
- app/layout.tsx

**Components** (3 files)
- app/dashboard/layout.tsx
- app/providers.tsx
- components/VersionFooter.tsx

**Styles** (1 file)
- app/globals.css

**Templates** (3 files)
- public/templates/tech-metrics-template.csv
- public/templates/healthcare-metrics-template.csv
- public/templates/manufacturing-metrics-template.csv

**Documentation** (6 files)
- README.md
- QUICKSTART.md
- docs/MASTERPLAN.md
- SUPABASE_SETUP.md
- DEPLOYMENT.md
- CHANGELOG.md (this file)

**TypeScript Types** (2 files)
- types/next-auth.d.ts
- middleware.ts

**Claude Code** (1 file)
- claude.md

**Total Files**: 45+ files created

### Known Limitations (V1.0)

- Database password must be manually set in .env
- No real-time metric streaming
- No historical trend charts (data collection ready)
- No CSV export from UI
- No custom metric definitions
- No in-app user management
- No email notifications
- No mobile app

## Roadmap

### Version 1.1 (Planned)
- Connect to Supabase database (add password)
- Seed sample data
- Test authentication flow
- Test CSV upload with real data
- Add historical trend charts
- CSV export functionality
- User management interface
- Role-based dashboard customization

### Version 1.2 (Planned)
- Real-time metric ingestion API
- Webhook notifications
- Email alerts for status changes
- Custom metric definitions
- Configurable pulse weights UI
- Bulk account import

### Version 2.0 (Future)
- Product analytics integrations (Segment, Mixpanel, Amplitude)
- Slack/Teams notifications
- AI-powered risk prediction
- Automated intervention recommendations
- Cohort analysis
- Revenue forecasting
- Multi-language support

### Version 3.0 (Vision)
- Mobile apps (iOS, Android)
- Advanced data visualizations
- Predictive analytics
- Customer health scoring API
- Third-party marketplace integrations
- White-label capabilities

## Migration Notes

### From Local PostgreSQL to Supabase
- Update DATABASE_URL and DIRECT_URL in .env
- Run `npm run db:push` to create tables
- Run `npx tsx prisma/seed.ts` to seed data
- All existing code is compatible

### Version Upgrade Process
1. Update NEXT_PUBLIC_APP_VERSION in .env
2. Update NEXT_PUBLIC_BUILD_DATE to current date
3. Commit changes to Git
4. Deploy to Vercel
5. Verify version in footer
6. Update this CHANGELOG

## Contributors
- BETTROI Engineering Team
- Claude Code (AI Assistant)

## Support
- Email: support@bettroi.com
- Documentation: https://docs.bettroi.com/focus-dash
- Issues: https://github.com/bettroi/focus-dash/issues

---

**Project**: Focus Dash - Customer Success Command Centre
**Version**: 1.0.0
**Release Date**: 2025-12-07
**Repository**: focusdashai.site
**License**: Proprietary - BETTROI FZE
