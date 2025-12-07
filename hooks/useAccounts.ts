'use client'

import { useState, useEffect } from 'react'
import type { AccountWithScore } from '@/lib/types'

interface UseAccountsOptions {
  tenantId: string
  vertical?: string
  status?: string
  segment?: string
  ownerId?: string
  autoFetch?: boolean
}

interface UseAccountsReturn {
  accounts: AccountWithScore[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useAccounts(options: UseAccountsOptions): UseAccountsReturn {
  const [accounts, setAccounts] = useState<AccountWithScore[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { tenantId, vertical, status, segment, ownerId, autoFetch = true } = options

  const fetchAccounts = async () => {
    if (!tenantId) return

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ tenantId })
      if (vertical && vertical !== 'all') params.append('vertical', vertical)
      if (status && status !== 'all') params.append('status', status)
      if (segment && segment !== 'all') params.append('segment', segment)
      if (ownerId && ownerId !== 'all') params.append('ownerId', ownerId)

      const response = await fetch(`/api/accounts?${params.toString()}`)

      if (!response.ok) {
        throw new Error('Failed to fetch accounts')
      }

      const data = await response.json()
      setAccounts(data.accounts || [])
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setAccounts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchAccounts()
    }
  }, [tenantId, vertical, status, segment, ownerId, autoFetch])

  return {
    accounts,
    loading,
    error,
    refetch: fetchAccounts,
  }
}
