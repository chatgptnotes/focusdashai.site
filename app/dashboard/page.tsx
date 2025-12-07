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
    <div className="px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold gradient-text-blue">Portfolio Overview</h1>
          <p className="mt-2 text-base text-gray-600">
            A comprehensive view of all customer accounts and their health scores
          </p>
        </div>
      </div>

      {/* Key Metrics Grid with enhanced cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Status Distribution with glassmorphism */}
      <div className="mt-8 glass rounded-2xl shadow-card border border-white/20 backdrop-blur-xl overflow-hidden hover-lift">
        <div className="px-6 py-6 sm:p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Score Distribution</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <dt className="text-sm font-semibold text-green-700 uppercase tracking-wide">Green</dt>
                <dd className="mt-3 text-4xl font-bold text-pulse-green">
                  {portfolio.scoreDistribution.green}
                </dd>
                <dd className="mt-2 text-sm font-medium text-green-600">
                  {portfolio.totalAccounts > 0
                    ? Math.round((portfolio.scoreDistribution.green / portfolio.totalAccounts) * 100)
                    : 0}
                  % of total
                </dd>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <dt className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Amber</dt>
                <dd className="mt-3 text-4xl font-bold text-pulse-amber">
                  {portfolio.scoreDistribution.amber}
                </dd>
                <dd className="mt-2 text-sm font-medium text-amber-600">
                  {portfolio.totalAccounts > 0
                    ? Math.round((portfolio.scoreDistribution.amber / portfolio.totalAccounts) * 100)
                    : 0}
                  % of total
                </dd>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <dt className="text-sm font-semibold text-red-700 uppercase tracking-wide">Red</dt>
                <dd className="mt-3 text-4xl font-bold text-pulse-red">
                  {portfolio.scoreDistribution.red}
                </dd>
                <dd className="mt-2 text-sm font-medium text-red-600">
                  {portfolio.totalAccounts > 0
                    ? Math.round((portfolio.scoreDistribution.red / portfolio.totalAccounts) * 100)
                    : 0}
                  % of total
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Risk / Top Upside with modern styling */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
        <div className="glass rounded-2xl shadow-card border border-white/20 backdrop-blur-xl overflow-hidden hover-lift">
          <div className="px-6 py-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-glow">
                <span className="text-white text-xl font-bold">⚠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Top 10 Risk</h3>
            </div>
            {portfolio.topRisk.length > 0 ? (
              <div className="space-y-3 custom-scrollbar max-h-[600px] overflow-y-auto">
                {portfolio.topRisk.map((account) => (
                  <div
                    key={account.id}
                    className="group relative flex items-center justify-between p-4 bg-gradient-to-br from-red-50/80 to-rose-50/80 border-2 border-red-100 rounded-xl hover:shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-red-200"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900 group-hover:text-red-700 transition-colors">{account.name}</p>
                      <p className="text-xs text-gray-600 mt-1 font-medium">{account.vertical} • {account.owner?.name || 'Unassigned'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-pulse-red">{account.latestScore?.score.toFixed(1) || 'N/A'}</p>
                      <p className="text-xs text-gray-600 font-medium">{formatCurrency(account.mrr)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">No risk accounts to display</p>
            )}
          </div>
        </div>

        <div className="glass rounded-2xl shadow-card border border-white/20 backdrop-blur-xl overflow-hidden hover-lift">
          <div className="px-6 py-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-glow">
                <span className="text-white text-xl font-bold">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Top 10 Upside</h3>
            </div>
            {portfolio.topUpside.length > 0 ? (
              <div className="space-y-3 custom-scrollbar max-h-[600px] overflow-y-auto">
                {portfolio.topUpside.map((account) => (
                  <div
                    key={account.id}
                    className="group relative flex items-center justify-between p-4 bg-gradient-to-br from-green-50/80 to-emerald-50/80 border-2 border-green-100 rounded-xl hover:shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-green-200"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900 group-hover:text-green-700 transition-colors">{account.name}</p>
                      <p className="text-xs text-gray-600 mt-1 font-medium">{account.vertical} • {account.owner?.name || 'Unassigned'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-pulse-green">{account.latestScore?.score.toFixed(1) || 'N/A'}</p>
                      <p className="text-xs text-gray-600 font-medium">{formatCurrency(account.mrr)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">No upside accounts to display</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
