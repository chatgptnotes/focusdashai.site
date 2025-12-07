# Focus Dash - Quick Start Guide

Get Focus Dash running in 5 minutes!

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Create a PostgreSQL database:

```sql
CREATE DATABASE focusdash;
```

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update `DATABASE_URL` in `.env`:

```
DATABASE_URL="postgresql://username:password@localhost:5432/focusdash?schema=public"
```

### 3. Initialize Database

```bash
npm run db:push
```

### 4. Seed Sample Data

```bash
npx tsx prisma/seed.ts
```

This creates:
- Demo tenant
- 3 users (1 admin, 2 CSMs)
- 8 sample accounts (Tech, Healthcare, Manufacturing)
- Sample metrics for October 2024
- Calculated pulse scores

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Credentials

- **Email**: admin@bettroi.com
- **Password**: password123

## What to Try

1. **Portfolio Overview** - See aggregated metrics across all accounts
2. **Accounts List** - Filter by vertical, status, segment
3. **Account Detail** - View pulse score breakdown (click any account)
4. **Admin Upload** - Upload metrics via CSV:
   - Go to Admin → Upload Metrics
   - Download a template (Tech/Healthcare/Manufacturing)
   - Upload the template to see validation in action

## Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio

# Production
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Create and run migrations
```

## Sample CSV Upload

Download templates from:
- `/public/templates/tech-metrics-template.csv`
- `/public/templates/healthcare-metrics-template.csv`
- `/public/templates/manufacturing-metrics-template.csv`

Or create your own with this format:

```csv
account_name,metric_type,period_start,period_end,value,unit,source
Acme Corporation,active_users_percent,2024-11-01,2024-11-30,85,percent,analytics
Acme Corporation,nps_score,2024-11-01,2024-11-30,45,score,survey
```

## Troubleshooting

**Database connection fails**:
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `.env`
- Ensure database exists: `psql -l`

**Seeding fails**:
- Run `npm run db:push` first
- Check `DATABASE_URL` is correct
- Verify PostgreSQL user has CREATE permissions

**Port 3000 in use**:
- Change port: `npm run dev -- -p 3001`

## Next Steps

1. Review the [README.md](README.md) for full documentation
2. Read [docs/MASTERPLAN.md](docs/MASTERPLAN.md) for technical details
3. Explore the code in `app/`, `lib/`, and `prisma/`
4. Customize pulse weights in the database
5. Add your own accounts and metrics

## Support

Questions? Email: support@bettroi.com

---

**Built by BETTROI FZE**
