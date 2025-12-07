import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

/**
 * GET /api/accounts/[id]/actions
 * Fetch actions for a specific account
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const accountId = params.id
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where: any = { accountId }
    if (status) {
      where.status = status
    }

    const actions = await prisma.accountAction.findMany({
      where,
      orderBy: [{ dueDate: 'asc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json({ actions })
  } catch (error: any) {
    console.error('Actions fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch actions',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/accounts/[id]/actions
 * Create a new action for an account
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const accountId = params.id
    const body = await request.json()
    const { userId, actionType, title, description, dueDate } = body

    if (!userId || !actionType || !title) {
      return NextResponse.json(
        { error: 'User ID, action type, and title are required' },
        { status: 400 }
      )
    }

    const action = await prisma.accountAction.create({
      data: {
        accountId,
        userId,
        actionType,
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    })

    return NextResponse.json({ action }, { status: 201 })
  } catch (error: any) {
    console.error('Action creation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to create action',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/accounts/[id]/actions/[actionId]
 * Update action status
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { actionId, status } = body

    if (!actionId || !status) {
      return NextResponse.json(
        { error: 'Action ID and status are required' },
        { status: 400 }
      )
    }

    const updateData: any = { status }
    if (status === 'completed') {
      updateData.completedAt = new Date()
    }

    const action = await prisma.accountAction.update({
      where: { id: actionId },
      data: updateData,
    })

    return NextResponse.json({ action })
  } catch (error: any) {
    console.error('Action update error:', error)
    return NextResponse.json(
      {
        error: 'Failed to update action',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
