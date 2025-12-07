import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

/**
 * GET /api/accounts/[id]/notes
 * Fetch notes for a specific account
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const accountId = params.id

    const notes = await prisma.accountNote.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ notes })
  } catch (error: any) {
    console.error('Notes fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch notes',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/accounts/[id]/notes
 * Create a new note for an account
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const accountId = params.id
    const body = await request.json()
    const { userId, content } = body

    if (!userId || !content) {
      return NextResponse.json(
        { error: 'User ID and content are required' },
        { status: 400 }
      )
    }

    const note = await prisma.accountNote.create({
      data: {
        accountId,
        userId,
        content,
      },
    })

    return NextResponse.json({ note }, { status: 201 })
  } catch (error: any) {
    console.error('Note creation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to create note',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
