# Focus Dash - Deployment Guide

## Production Deployment to Vercel

### Prerequisites
- Vercel account (sign up at https://vercel.com)
- Supabase project with configured database
- GitHub repository (optional but recommended)

### Step 1: Configure Supabase Database

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/oeyutyjduidjfdwnbfkl
2. Navigate to Settings → Database
3. Copy the connection string under "Connection string" → "URI"
4. Save the password for environment variables

### Step 2: Push Database Schema

```bash
# Generate Prisma client
npm run db:generate

# Push schema to Supabase
npm run db:push

# Seed initial data (optional)
npx tsx prisma/seed.ts
```

### Step 3: Deploy to Vercel

#### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

#### Option B: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your Git repository
3. Configure project settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 4: Configure Environment Variables in Vercel

Add these environment variables in Vercel project settings:

```env
# Supabase Database
DATABASE_URL=postgresql://postgres.oeyutyjduidjfdwnbfkl:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres.oeyutyjduidjfdwnbfkl:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://oeyutyjduidjfdwnbfkl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate-a-strong-random-secret-here

# Application Version
NEXT_PUBLIC_APP_VERSION=1.0
NEXT_PUBLIC_BUILD_DATE=2025-12-07

# Application
NODE_ENV=production
```

### Step 5: Generate NEXTAUTH_SECRET

```bash
# Generate a secure random secret
openssl rand -base64 32
```

Use this value for `NEXTAUTH_SECRET`.

### Step 6: Deploy

```bash
# Deploy to production
vercel --prod
```

Or push to main branch if using Git integration.

### Step 7: Verify Deployment

1. Visit your deployed URL
2. Test login with demo credentials: `admin@bettroi.com` / `password123`
3. Verify dashboards load correctly
4. Test CSV upload functionality

## Version Management

When deploying updates:

1. Update version in `.env`:
```env
NEXT_PUBLIC_APP_VERSION=1.1  # Increment version
NEXT_PUBLIC_BUILD_DATE=2025-12-08  # Update date
```

2. Commit changes to Git
3. Deploy to Vercel
4. Version will appear in footer

## Custom Domain

1. In Vercel project settings, go to **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` to your custom domain

## Database Migrations

For schema changes:

```bash
# Create migration
npx prisma migrate dev --name your_migration_name

# Deploy migration to production
npx prisma migrate deploy
```

## Monitoring

### Vercel Analytics
- Enable in Vercel project settings
- Track performance and usage

### Error Tracking
Recommended: Sentry integration

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Database Monitoring
- Use Supabase Dashboard → Reports
- Monitor connection pooling
- Track query performance

## Environment-Specific Configs

### Development
- Local PostgreSQL or Supabase dev branch
- `NEXTAUTH_URL=http://localhost:3000`
- Debug logging enabled

### Staging
- Separate Supabase project
- `NEXTAUTH_URL=https://staging.yourdomain.com`
- Test with production-like data

### Production
- Production Supabase project
- `NEXTAUTH_URL=https://yourdomain.com`
- Error logging only

## Scaling Considerations

### Database Connection Pooling
- Supabase pooler handles this automatically
- Adjust `connection_limit` if needed

### Edge Functions
Consider moving API routes to edge for better performance:

```typescript
export const runtime = 'edge'
```

### Caching
Implement ISR (Incremental Static Regeneration) for static pages:

```typescript
export const revalidate = 3600 // Revalidate every hour
```

## Backup Strategy

### Database Backups
- Supabase automatically backs up daily
- Download backups: Settings → Database → Backups

### Application Backups
- Git repository serves as code backup
- Tag releases: `git tag v1.0 && git push --tags`

## Rollback Procedure

If deployment fails:

1. Revert to previous deployment in Vercel
2. Or revert Git commit and redeploy
3. Check error logs in Vercel dashboard

## Security Checklist

- [ ] All secrets in environment variables
- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] Database password is rotated regularly
- [ ] CORS configured properly
- [ ] Rate limiting enabled on APIs
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS prevention (React handles this)

## Performance Targets

- **Time to First Byte (TTFB)**: <200ms
- **First Contentful Paint (FCP)**: <1.5s
- **Largest Contentful Paint (LCP)**: <2.5s
- **Cumulative Layout Shift (CLS)**: <0.1

Monitor with Vercel Analytics and Lighthouse.

## Troubleshooting

**Build fails with Prisma error**:
- Ensure DATABASE_URL and DIRECT_URL are set
- Run `npx prisma generate` locally first

**Authentication not working**:
- Verify NEXTAUTH_URL matches deployment URL
- Check NEXTAUTH_SECRET is set
- Ensure database is accessible

**Database connection errors**:
- Check Supabase project is active
- Verify connection string is correct
- Test with `npm run db:studio` locally

**Version not updating**:
- Ensure NEXT_PUBLIC_APP_VERSION is set
- Clear browser cache
- Verify environment variables in Vercel

---

**Support**: Contact support@bettroi.com for deployment assistance

**Documentation**: https://docs.bettroi.com/focus-dash

**Status Page**: https://status.bettroi.com

---

Version 1.0 | Last Updated: 2025-12-07 | Repository: focusdashai.site
