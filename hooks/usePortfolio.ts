'use client'

import { useState, useEffect } from 'react'
import type { PortfolioMetrics } from '@/lib/types'

interface UsePortfolioOptions {
  tenantId: string
  autoFetch?: boolean
}

interface UsePortfolioReturn {
  portfolio: PortfolioMetrics | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function usePortfolio(options: UsePortfolioOptions): UsePortfolioReturn {
  const [portfolio, setPortfolio] = useState<PortfolioMetrics | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { tenantId, autoFetch = true } = options

  const fetchPortfolio = async () => {
    if (!tenantId) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/portfolio?tenantId=${tenantId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch portfolio metrics')
      }

      const data = await response.json()
      setPortfolio(data)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setPortfolio(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchPortfolio()
    }
  }, [tenantId, autoFetch])

  return {
    portfolio,
    loading,
    error,
    refetch: fetchPortfolio,
  }
}
