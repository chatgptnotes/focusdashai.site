# Supabase Setup Guide

## Getting Your Database Password

The connection strings require your actual database password from Supabase. Here's how to get it:

### Option 1: From Supabase Dashboard

1. Go to https://supabase.com/dashboard/project/oeyutyjduidjfdwnbfkl
2. Navigate to **Settings** > **Database**
3. Under "Connection string", find the **URI** section
4. Click "Show" to reveal the connection string with password
5. Copy the password from the connection string

### Option 2: Reset Database Password

1. Go to https://supabase.com/dashboard/project/oeyutyjduidjfdwnbfkl/settings/database
2. Scroll to **Database Password**
3. Click **Reset database password**
4. Copy the new password
5. Update your `.env` file

## Update .env File

Once you have the password, update `.env`:

```env
# Replace [YOUR-PASSWORD] with your actual database password
DATABASE_URL="postgresql://postgres.oeyutyjduidjfdwnbfkl:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.oeyutyjduidjfdwnbfkl:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

## Alternative: Get Connection String from Supabase

The easier way:

1. Go to **Settings** > **Database** in Supabase dashboard
2. Under "Connection string", select **URI**
3. Copy the full connection string (password included)
4. Replace DATABASE_URL in `.env` with this string
5. For DIRECT_URL, use the same string but change port from 6543 to 5432

## Next Steps After Setting Password

```bash
# Generate Prisma client
npm run db:generate

# Push schema to Supabase
npm run db:push

# Seed sample data
npx tsx prisma/seed.ts

# Start development server
npm run dev
```

## Test Database Connection

```bash
# Test with Prisma Studio
npm run db:studio
```

This should open Prisma Studio at http://localhost:5555 if connection is successful.

## Troubleshooting

**Error: Can't reach database server**
- Verify password is correct
- Check if Supabase project is active
- Ensure no firewall blocking port 5432 or 6543

**Error: P1001**
- Password might contain special characters that need URL encoding
- Use Supabase dashboard connection string directly

**Connection timeout**
- Check your internet connection
- Verify Supabase project region matches connection string

---

**Current Project**: oeyutyjduidjfdwnbfkl
**Region**: US East 1
**Database**: PostgreSQL 15
