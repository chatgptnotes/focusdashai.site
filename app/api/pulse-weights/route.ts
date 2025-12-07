import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

/**
 * GET /api/pulse-weights
 * Fetch pulse weight configurations for a tenant
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get('tenantId')

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID is required' }, { status: 400 })
    }

    const weights = await prisma.pulseWeight.findMany({
      where: { tenantId },
      orderBy: { vertical: 'asc' },
    })

    return NextResponse.json({ weights })
  } catch (error: any) {
    console.error('Pulse weights fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch pulse weights',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/pulse-weights
 * Update pulse weight configurations
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { weights } = body

    if (!weights || !Array.isArray(weights)) {
      return NextResponse.json({ error: 'Weights array is required' }, { status: 400 })
    }

    // Validate each weight configuration
    for (const weight of weights) {
      const total =
        weight.usageWeight + weight.experienceWeight + weight.outcomeWeight + weight.riskWeight

      if (Math.abs(total - 1.0) >= 0.01) {
        return NextResponse.json(
          {
            error: `Invalid weights for ${weight.vertical}: total must equal 1.00, got ${total.toFixed(2)}`,
          },
          { status: 400 }
        )
      }

      if (weight.greenMin <= weight.amberMin) {
        return NextResponse.json(
          {
            error: `Invalid thresholds for ${weight.vertical}: greenMin must be greater than amberMin`,
          },
          { status: 400 }
        )
      }
    }

    // Update all weights
    const updatePromises = weights.map((weight) =>
      prisma.pulseWeight.update({
        where: { id: weight.id },
        data: {
          usageWeight: weight.usageWeight,
          experienceWeight: weight.experienceWeight,
          outcomeWeight: weight.outcomeWeight,
          riskWeight: weight.riskWeight,
          greenMin: weight.greenMin,
          amberMin: weight.amberMin,
        },
      })
    )

    await Promise.all(updatePromises)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Pulse weights update error:', error)
    return NextResponse.json(
      {
        error: 'Failed to update pulse weights',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
