import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { calculatePulseScore } from '../lib/pulse-calculator'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo tenant
  const tenant = await prisma.tenant.upsert({
    where: { id: 'demo-tenant-1' },
    update: {},
    create: {
      id: 'demo-tenant-1',
      name: 'Bettroi Demo',
      status: 'active',
    },
  })
  console.log('✓ Created tenant:', tenant.name)

  // Create demo users
  const passwordHash = await bcrypt.hash('password123', 10)

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@bettroi.com' },
    update: {},
    create: {
      tenantId: tenant.id,
      name: 'Admin User',
      email: 'admin@bettroi.com',
      role: 'admin',
      passwordHash,
    },
  })

  const csmUser1 = await prisma.user.upsert({
    where: { email: 'csm1@bettroi.com' },
    update: {},
    create: {
      tenantId: tenant.id,
      name: 'Sarah Johnson',
      email: 'csm1@bettroi.com',
      role: 'csm',
      passwordHash,
    },
  })

  const csmUser2 = await prisma.user.upsert({
    where: { email: 'csm2@bettroi.com' },
    update: {},
    create: {
      tenantId: tenant.id,
      name: 'Michael Chen',
      email: 'csm2@bettroi.com',
      role: 'csm',
      passwordHash,
    },
  })

  console.log('✓ Created users')

  // Create pulse weights for each vertical
  await prisma.pulseWeight.upsert({
    where: {
      tenantId_vertical: {
        tenantId: tenant.id,
        vertical: 'default',
      },
    },
    update: {},
    create: {
      tenantId: tenant.id,
      vertical: 'default',
      usageWeight: 0.35,
      experienceWeight: 0.25,
      outcomeWeight: 0.25,
      riskWeight: 0.15,
      greenMin: 70,
      amberMin: 50,
    },
  })

  await prisma.pulseWeight.upsert({
    where: {
      tenantId_vertical: {
        tenantId: tenant.id,
        vertical: 'tech',
      },
    },
    update: {},
    create: {
      tenantId: tenant.id,
      vertical: 'tech',
      usageWeight: 0.4,
      experienceWeight: 0.2,
      outcomeWeight: 0.3,
      riskWeight: 0.1,
      greenMin: 70,
      amberMin: 50,
    },
  })

  console.log('✓ Created pulse weights')

  // Sample accounts - Tech vertical
  const techAccounts = [
    {
      name: 'Acme Corporation',
      vertical: 'tech',
      segment: 'enterprise',
      ownerUserId: csmUser1.id,
      mrr: 50000,
    },
    {
      name: 'TechStart Inc',
      vertical: 'tech',
      segment: 'mid-market',
      ownerUserId: csmUser1.id,
      mrr: 15000,
    },
    {
      name: 'DataFlow Systems',
      vertical: 'tech',
      segment: 'enterprise',
      ownerUserId: csmUser2.id,
      mrr: 75000,
    },
    {
      name: 'CloudNine Solutions',
      vertical: 'tech',
      segment: 'smb',
      ownerUserId: csmUser2.id,
      mrr: 5000,
    },
  ]

  // Healthcare accounts
  const healthcareAccounts = [
    {
      name: 'City General Hospital',
      vertical: 'healthcare',
      segment: 'enterprise',
      ownerUserId: csmUser1.id,
      mrr: 45000,
    },
    {
      name: 'HealthCare Partners',
      vertical: 'healthcare',
      segment: 'mid-market',
      ownerUserId: csmUser2.id,
      mrr: 20000,
    },
  ]

  // Manufacturing accounts
  const manufacturingAccounts = [
    {
      name: 'Precision Manufacturing Co',
      vertical: 'manufacturing',
      segment: 'enterprise',
      ownerUserId: csmUser1.id,
      mrr: 60000,
    },
    {
      name: 'AutoParts Industries',
      vertical: 'manufacturing',
      segment: 'mid-market',
      ownerUserId: csmUser2.id,
      mrr: 25000,
    },
  ]

  const allAccounts = [...techAccounts, ...healthcareAccounts, ...manufacturingAccounts]

  for (const accountData of allAccounts) {
    const account = await prisma.account.create({
      data: {
        tenantId: tenant.id,
        ...accountData,
      },
    })
    console.log(`✓ Created account: ${account.name}`)
  }

  // Create sample metrics for October 2024
  const periodStart = new Date('2024-10-01')
  const periodEnd = new Date('2024-10-31')

  const accounts = await prisma.account.findMany({
    where: { tenantId: tenant.id },
  })

  // Tech metrics
  const techAccountIds = accounts.filter((a) => a.vertical === 'tech').map((a) => a.id)
  for (const accountId of techAccountIds) {
    const metrics = [
      { metricType: 'active_users_percent', value: 75 + Math.random() * 20 },
      { metricType: 'hero_feature_adoption_percent', value: 60 + Math.random() * 30 },
      { metricType: 'license_utilisation_percent', value: 70 + Math.random() * 25 },
      { metricType: 'integration_count', value: Math.floor(Math.random() * 10) + 1 },
      { metricType: 'nps_score', value: Math.floor(Math.random() * 60) - 10 },
      { metricType: 'csat_score', value: 70 + Math.random() * 25 },
      { metricType: 'nrr_percent', value: 95 + Math.random() * 25 },
    ]

    for (const metric of metrics) {
      await prisma.metric.create({
        data: {
          tenantId: tenant.id,
          accountId,
          metricType: metric.metricType,
          periodStart,
          periodEnd,
          value: metric.value,
          unit: metric.metricType.includes('percent') ? 'percent' : 'count',
          source: 'seed_data',
        },
      })
    }

    // Calculate pulse score
    await calculatePulseScore(tenant.id, accountId, periodStart, periodEnd)
  }

  // Healthcare metrics
  const healthcareAccountIds = accounts.filter((a) => a.vertical === 'healthcare').map((a) => a.id)
  for (const accountId of healthcareAccountIds) {
    const metrics = [
      { metricType: 'staff_adoption_percent', value: 70 + Math.random() * 25 },
      { metricType: 'patient_experience_score', value: 75 + Math.random() * 20 },
      { metricType: 'patient_wait_time_minutes', value: 15 + Math.random() * 20 },
      { metricType: 'no_show_rate_percent', value: 5 + Math.random() * 10 },
      { metricType: 'complaint_rate_per_1000', value: 2 + Math.random() * 5 },
    ]

    for (const metric of metrics) {
      await prisma.metric.create({
        data: {
          tenantId: tenant.id,
          accountId,
          metricType: metric.metricType,
          periodStart,
          periodEnd,
          value: metric.value,
          unit: metric.metricType.includes('percent')
            ? 'percent'
            : metric.metricType.includes('minutes')
            ? 'minutes'
            : 'count',
          source: 'seed_data',
        },
      })
    }

    await calculatePulseScore(tenant.id, accountId, periodStart, periodEnd)
  }

  // Manufacturing metrics
  const mfgAccountIds = accounts
    .filter((a) => a.vertical === 'manufacturing')
    .map((a) => a.id)
  for (const accountId of mfgAccountIds) {
    const metrics = [
      { metricType: 'sla_adherence_percent', value: 85 + Math.random() * 12 },
      { metricType: 'otif_percent', value: 80 + Math.random() * 15 },
      { metricType: 'first_pass_yield_percent', value: 88 + Math.random() * 10 },
      { metricType: 'unplanned_downtime_hours', value: Math.random() * 12 },
      { metricType: 'mttr_hours', value: 1 + Math.random() * 4 },
      { metricType: 'mtbf_hours', value: 50 + Math.random() * 100 },
      { metricType: 'line_stops_count', value: Math.floor(Math.random() * 20) },
    ]

    for (const metric of metrics) {
      await prisma.metric.create({
        data: {
          tenantId: tenant.id,
          accountId,
          metricType: metric.metricType,
          periodStart,
          periodEnd,
          value: metric.value,
          unit: metric.metricType.includes('percent')
            ? 'percent'
            : metric.metricType.includes('hours')
            ? 'hours'
            : 'count',
          source: 'seed_data',
        },
      })
    }

    await calculatePulseScore(tenant.id, accountId, periodStart, periodEnd)
  }

  console.log('✓ Created sample metrics and pulse scores')
  console.log('🎉 Seeding complete!')
  console.log('\nDemo credentials:')
  console.log('  Email: admin@bettroi.com')
  console.log('  Password: password123')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
