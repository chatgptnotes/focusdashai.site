import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

/**
 * GET /api/accounts
 * List accounts with optional filters and latest pulse scores
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get('tenantId')
    const vertical = searchParams.get('vertical')
    const status = searchParams.get('status')
    const segment = searchParams.get('segment')
    const ownerId = searchParams.get('ownerId')

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 })
    }

    // DEMO MODE: Return mock accounts for demo tenant
    if (tenantId === 'demo-tenant-1') {
      return NextResponse.json({
        accounts: [
          { id: '1', name: 'TechCorp Inc', vertical: 'tech', segment: 'enterprise', mrr: 15000, baseCurrency: 'USD', owner: { name: 'Sarah Johnson', email: 'sarah@demo.com' }, latestScore: { score: 35, status: 'red', periodStart: new Date(), components: { usage: 30, experience: 40, outcomes: 35, risk: 30 } } },
          { id: '2', name: 'HealthPlus Medical', vertical: 'healthcare', segment: 'mid-market', mrr: 8000, baseCurrency: 'USD', owner: { name: 'Mike Chen', email: 'mike@demo.com' }, latestScore: { score: 42, status: 'red', periodStart: new Date(), components: { usage: 45, experience: 40, outcomes: 42, risk: 40 } } },
          { id: '3', name: 'Manufacturing Co', vertical: 'manufacturing', segment: 'enterprise', mrr: 12000, baseCurrency: 'USD', owner: { name: 'Lisa Wong', email: 'lisa@demo.com' }, latestScore: { score: 48, status: 'amber', periodStart: new Date(), components: { usage: 50, experience: 48, outcomes: 50, risk: 45 } } },
          { id: '4', name: 'Innovation Labs', vertical: 'tech', segment: 'enterprise', mrr: 25000, baseCurrency: 'USD', owner: { name: 'John Smith', email: 'john@demo.com' }, latestScore: { score: 95, status: 'green', periodStart: new Date(), components: { usage: 95, experience: 92, outcomes: 98, risk: 95 } } },
          { id: '5', name: 'Enterprise Solutions', vertical: 'tech', segment: 'enterprise', mrr: 20000, baseCurrency: 'USD', owner: { name: 'Emily Davis', email: 'emily@demo.com' }, latestScore: { score: 88, status: 'green', periodStart: new Date(), components: { usage: 90, experience: 85, outcomes: 88, risk: 90 } } },
        ],
      })
    }

    // Build where clause
    const where: any = { tenantId }
    if (vertical && vertical !== 'all') where.vertical = vertical
    if (segment && segment !== 'all') where.segment = segment
    if (ownerId && ownerId !== 'all') where.ownerUserId = ownerId

    // Get accounts with latest pulse scores
    const accounts = await prisma.account.findMany({
      where,
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
        pulseScores: {
          orderBy: { periodStart: 'desc' },
          take: 1,
        },
      },
      orderBy: { name: 'asc' },
    })

    // Filter by status if provided
    let filteredAccounts = accounts
    if (status && status !== 'all') {
      filteredAccounts = accounts.filter(
        (account) => account.pulseScores[0]?.status === status.toLowerCase()
      )
    }

    // Format response
    const formattedAccounts = filteredAccounts.map((account) => ({
      id: account.id,
      name: account.name,
      vertical: account.vertical,
      segment: account.segment,
      mrr: account.mrr,
      baseCurrency: account.baseCurrency,
      owner: account.owner,
      latestScore: account.pulseScores[0]
        ? {
            score: account.pulseScores[0].score,
            status: account.pulseScores[0].status,
            periodStart: account.pulseScores[0].periodStart,
            components: JSON.parse(account.pulseScores[0].componentsJson),
          }
        : null,
    }))

    return NextResponse.json({ accounts: formattedAccounts })
  } catch (error: any) {
    console.error('Accounts list error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch accounts',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/accounts
 * Create a new account
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tenantId, name, vertical, segment, ownerUserId, mrr, baseCurrency } = body

    if (!tenantId || !name || !vertical) {
      return NextResponse.json(
        { error: 'Tenant ID, name, and vertical are required' },
        { status: 400 }
      )
    }

    const account = await prisma.account.create({
      data: {
        tenantId,
        name,
        vertical,
        segment: segment || null,
        ownerUserId: ownerUserId || null,
        mrr: mrr || 0,
        baseCurrency: baseCurrency || 'USD',
      },
    })

    return NextResponse.json({ account }, { status: 201 })
  } catch (error: any) {
    console.error('Account creation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to create account',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
