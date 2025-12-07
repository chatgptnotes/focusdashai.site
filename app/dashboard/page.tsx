'use client'

import { usePortfolio } from '@/hooks/usePortfolio'
import { useTenant } from '@/hooks/useTenant'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import MetricCard from '@/components/MetricCard'
import { formatCurrency, formatPercent } from '@/lib/utils'
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet'
import TrendingUp from '@mui/icons-material/TrendingUp'
import Assessment from '@mui/icons-material/Assessment'
import People from '@mui/icons-material/People'

export default function PortfolioDashboardDynamic() {
  const { tenantId } = useTenant()
  const { portfolio, loading, error, refetch } = usePortfolio({
    tenantId: tenantId || 'demo-tenant-1',
  })

  if (loading) {
    return <LoadingSpinner message="Loading portfolio metrics..." />
  }

  if (error) {
    return <ErrorMessage message={error} retry={refetch} />
  }

  if (!portfolio) {
    return <ErrorMessage message="No portfolio data available" />
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Portfolio Overview</h1>
          <p className="mt-2 text-sm text-gray-700">
            A comprehensive view of all customer accounts and their health scores
          </p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Accounts"
          value={portfolio.totalAccounts}
          icon={<People className="text-blue-600" sx={{ fontSize: 40 }} />}
        />

        <MetricCard
          title="Total MRR"
          value={formatCurrency(portfolio.totalMRR)}
          icon={<AccountBalanceWallet className="text-green-600" sx={{ fontSize: 40 }} />}
        />

        <MetricCard
          title="NRR"
          value={formatPercent(portfolio.nrr, 1)}
          change={portfolio.nrr > 100 ? portfolio.nrr - 100 : portfolio.nrr - 100}
          changeLabel="vs target"
          variant={portfolio.nrr >= 100 ? 'success' : 'warning'}
          icon={<TrendingUp className="text-purple-600" sx={{ fontSize: 40 }} />}
        />

        <MetricCard
          title="Avg Pulse Score"
          value={portfolio.avgPulseScore.toFixed(1)}
          variant={
            portfolio.avgPulseScore >= 70
              ? 'success'
              : portfolio.avgPulseScore >= 50
              ? 'warning'
              : 'danger'
          }
          icon={<Assessment className="text-amber-600" sx={{ fontSize: 40 }} />}
        />
      </div>

      {/* Status Distribution */}
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Score Distribution</h3>
          <div className="mt-5 grid grid-cols-3 gap-5">
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <dt className="text-sm font-medium text-gray-500">Green</dt>
              <dd className="mt-1 text-2xl font-semibold text-pulse-green">
                {portfolio.scoreDistribution.green}
              </dd>
              <dd className="mt-1 text-xs text-gray-500">
                {portfolio.totalAccounts > 0
                  ? Math.round((portfolio.scoreDistribution.green / portfolio.totalAccounts) * 100)
                  : 0}
                % of total
              </dd>
            </div>
            <div className="border border-amber-200 rounded-lg p-4 bg-amber-50">
              <dt className="text-sm font-medium text-gray-500">Amber</dt>
              <dd className="mt-1 text-2xl font-semibold text-pulse-amber">
                {portfolio.scoreDistribution.amber}
              </dd>
              <dd className="mt-1 text-xs text-gray-500">
                {portfolio.totalAccounts > 0
                  ? Math.round((portfolio.scoreDistribution.amber / portfolio.totalAccounts) * 100)
                  : 0}
                % of total
              </dd>
            </div>
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <dt className="text-sm font-medium text-gray-500">Red</dt>
              <dd className="mt-1 text-2xl font-semibold text-pulse-red">
                {portfolio.scoreDistribution.red}
              </dd>
              <dd className="mt-1 text-xs text-gray-500">
                {portfolio.totalAccounts > 0
                  ? Math.round((portfolio.scoreDistribution.red / portfolio.totalAccounts) * 100)
                  : 0}
                % of total
              </dd>
            </div>
          </div>
        </div>
      </div>

      {/* Top Risk / Top Upside */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Top 10 Risk</h3>
            {portfolio.topRisk.length > 0 ? (
              <div className="space-y-2">
                {portfolio.topRisk.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{account.name}</p>
                      <p className="text-xs text-gray-500">{account.vertical} • {account.owner?.name || 'Unassigned'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-pulse-red">{account.latestScore?.score.toFixed(1) || 'N/A'}</p>
                      <p className="text-xs text-gray-500">{formatCurrency(account.mrr)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No risk accounts to display</p>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Top 10 Upside</h3>
            {portfolio.topUpside.length > 0 ? (
              <div className="space-y-2">
                {portfolio.topUpside.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{account.name}</p>
                      <p className="text-xs text-gray-500">{account.vertical} • {account.owner?.name || 'Unassigned'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-pulse-green">{account.latestScore?.score.toFixed(1) || 'N/A'}</p>
                      <p className="text-xs text-gray-500">{formatCurrency(account.mrr)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No upside accounts to display</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
