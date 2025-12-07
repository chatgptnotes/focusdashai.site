import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

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

  console.log('Created tenant:', tenant.name)

  // Create demo admin user
  const hashedPassword = await bcrypt.hash('password123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'admin@bettroi.com' },
    update: {},
    create: {
      tenantId: tenant.id,
      name: 'Admin User',
      email: 'admin@bettroi.com',
      passwordHash: hashedPassword,
      role: 'admin',
    },
  })

  console.log('Created user:', user.email)
  console.log('✅ Seed completed successfully!')
  console.log('\nDemo credentials:')
  console.log('Email: admin@bettroi.com')
  console.log('Password: password123')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
