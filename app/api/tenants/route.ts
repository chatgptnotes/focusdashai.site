import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

/**
 * POST /api/tenants
 * Create a new tenant (organization)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ error: 'Organization name is required' }, { status: 400 })
    }

    const tenant = await prisma.tenant.create({
      data: {
        name,
        status: 'active',
      },
    })

    // Create default pulse weights for this tenant
    await prisma.pulseWeight.createMany({
      data: [
        {
          tenantId: tenant.id,
          vertical: 'default',
          usageWeight: 0.35,
          experienceWeight: 0.25,
          outcomeWeight: 0.25,
          riskWeight: 0.15,
          greenMin: 70,
          amberMin: 50,
        },
        {
          tenantId: tenant.id,
          vertical: 'tech',
          usageWeight: 0.4,
          experienceWeight: 0.2,
          outcomeWeight: 0.3,
          riskWeight: 0.1,
          greenMin: 70,
          amberMin: 50,
        },
        {
          tenantId: tenant.id,
          vertical: 'healthcare',
          usageWeight: 0.3,
          experienceWeight: 0.35,
          outcomeWeight: 0.25,
          riskWeight: 0.1,
          greenMin: 70,
          amberMin: 50,
        },
        {
          tenantId: tenant.id,
          vertical: 'manufacturing',
          usageWeight: 0.25,
          experienceWeight: 0.2,
          outcomeWeight: 0.4,
          riskWeight: 0.15,
          greenMin: 70,
          amberMin: 50,
        },
      ],
    })

    return NextResponse.json({ tenant }, { status: 201 })
  } catch (error: any) {
    console.error('Tenant creation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to create organization',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
