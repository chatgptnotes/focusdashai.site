import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

/**
 * GET /api/portfolio
 * Get portfolio overview metrics
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get('tenantId')

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 })
    }

    // Get all accounts with latest pulse scores
    const accounts = await prisma.account.findMany({
      where: { tenantId },
      include: {
        owner: {
          select: { name: true },
        },
        pulseScores: {
          orderBy: { periodStart: 'desc' },
          take: 1,
        },
      },
    })

    // Calculate metrics
    const totalAccounts = accounts.length
    const totalMRR = accounts.reduce((sum, acc) => sum + acc.mrr, 0)

    // Score distribution
    const scoreDistribution = {
      green: 0,
      amber: 0,
      red: 0,
      none: 0,
    }

    let totalScore = 0
    let scoredAccounts = 0

    accounts.forEach((account) => {
      if (account.pulseScores[0]) {
        const status = account.pulseScores[0].status
        scoreDistribution[status as 'green' | 'amber' | 'red']++
        totalScore += account.pulseScores[0].score
        scoredAccounts++
      } else {
        scoreDistribution.none++
      }
    })

    const avgPulseScore = scoredAccounts > 0 ? totalScore / scoredAccounts : 0

    // Top risk (lowest scores, red/amber status)
    const topRisk = accounts
      .filter((a) => a.pulseScores[0])
      .sort((a, b) => (a.pulseScores[0]?.score || 0) - (b.pulseScores[0]?.score || 0))
      .slice(0, 10)
      .map((a) => ({
        id: a.id,
        name: a.name,
        vertical: a.vertical,
        segment: a.segment,
        mrr: a.mrr,
        owner: a.owner,
        score: a.pulseScores[0].score,
        status: a.pulseScores[0].status,
      }))

    // Top upside (high scores in green status with high MRR)
    const topUpside = accounts
      .filter((a) => a.pulseScores[0]?.status === 'green')
      .sort((a, b) => b.mrr - a.mrr)
      .slice(0, 10)
      .map((a) => ({
        id: a.id,
        name: a.name,
        vertical: a.vertical,
        segment: a.segment,
        mrr: a.mrr,
        owner: a.owner,
        score: a.pulseScores[0].score,
        status: a.pulseScores[0].status,
      }))

    return NextResponse.json({
      totalAccounts,
      totalMRR,
      avgPulseScore: Math.round(avgPulseScore * 10) / 10,
      scoreDistribution,
      topRisk,
      topUpside,
    })
  } catch (error: any) {
    console.error('Portfolio metrics error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch portfolio metrics',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
