'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import PulseScoreChart from '@/components/charts/PulseScoreChart'
import ComponentBreakdownChart from '@/components/charts/ComponentBreakdownChart'
import MetricTrendChart from '@/components/charts/MetricTrendChart'
import { formatCurrency, getPulseScoreColor } from '@/lib/utils'
import TrendingUp from '@mui/icons-material/TrendingUp'
import Edit from '@mui/icons-material/Edit'

export default function AccountDetailPageDynamic() {
  const params = useParams()
  const accountId = params.id
  const [account, setAccount] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('metrics')

  useEffect(() => {
    fetchAccountDetail()
  }, [accountId])

  const fetchAccountDetail = async () => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, fetch from API
      // For now, show placeholder data
      const mockAccount = {
        id: accountId,
        name: 'Acme Corporation',
        vertical: 'tech',
        segment: 'enterprise',
        mrr: 50000,
        owner: { name: 'Sarah Johnson' },
        latestScore: {
          score: 85,
          status: 'green',
          components: {
            usage: 88,
            experience: 78,
            outcomes: 90,
            risk: 15,
          },
        },
        history: [
          { period: 'Jan', score: 72, status: 'green' },
          { period: 'Feb', score: 75, status: 'green' },
          { period: 'Mar', score: 78, status: 'green' },
          { period: 'Apr', score: 82, status: 'green' },
          { period: 'May', score: 85, status: 'green' },
        ],
        metrics: {
          nrr: [
            { period: 'Jan', value: 105 },
            { period: 'Feb', value: 108 },
            { period: 'Mar', value: 110 },
            { period: 'Apr', value: 112 },
            { period: 'May', value: 115 },
          ],
          activeUsers: [
            { period: 'Jan', value: 75 },
            { period: 'Feb', value: 78 },
            { period: 'Mar', value: 82 },
            { period: 'Apr', value: 85 },
            { period: 'May', value: 88 },
          ],
        },
      }

      setAccount(mockAccount)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch account details')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Loading account details..." />
  }

  if (error) {
    return <ErrorMessage message={error} retry={fetchAccountDetail} />
  }

  if (!account) {
    return <ErrorMessage message="Account not found" />
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Account Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900">{account.name}</h1>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Edit sx={{ fontSize: 18 }} className="text-gray-400" />
              </button>
            </div>
            <div className="mt-2 flex gap-4 text-sm text-gray-500">
              <span className="capitalize">{account.vertical}</span>
              <span>•</span>
              <span className="capitalize">{account.segment}</span>
              <span>•</span>
              <span>Owner: {account.owner?.name}</span>
              <span>•</span>
              <span>MRR: {formatCurrency(account.mrr)}</span>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getPulseScoreColor(account.latestScore.score)}`}>
              {account.latestScore.score}
            </div>
            <div className="text-sm text-gray-500 mt-1">Focus Pulse Score</div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                account.latestScore.status === 'green'
                  ? 'bg-green-100 text-green-800'
                  : account.latestScore.status === 'amber'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {account.latestScore.status}
            </span>
          </div>
        </div>
      </div>

      {/* Pulse Components */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Usage</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {account.latestScore.components.usage}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Experience</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {account.latestScore.components.experience}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Outcomes</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {account.latestScore.components.outcomes}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Risk</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {account.latestScore.components.risk}
            </dd>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Pulse Score History</h3>
          <PulseScoreChart data={account.history} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Component Breakdown</h3>
            <ComponentBreakdownChart components={account.latestScore.components} />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">NRR Trend</h3>
            <MetricTrendChart data={account.metrics.nrr} metricName="NRR" unit="%" color="#10b981" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('metrics')}
              className={`${
                activeTab === 'metrics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Tech Metrics
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              History
            </button>
            <button
              onClick={() => setActiveTab('actions')}
              className={`${
                activeTab === 'actions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Actions
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'metrics' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="border rounded-lg p-4">
                  <dt className="text-sm font-medium text-gray-500">NRR</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    115%
                    <TrendingUp className="text-green-600" sx={{ fontSize: 20 }} />
                  </dd>
                </div>
                <div className="border rounded-lg p-4">
                  <dt className="text-sm font-medium text-gray-500">Active Users</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">88%</dd>
                </div>
                <div className="border rounded-lg p-4">
                  <dt className="text-sm font-medium text-gray-500">NPS Score</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">45</dd>
                </div>
                <div className="border rounded-lg p-4">
                  <dt className="text-sm font-medium text-gray-500">License Utilization</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">78%</dd>
                </div>
                <div className="border rounded-lg p-4">
                  <dt className="text-sm font-medium text-gray-500">Feature Adoption</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">65%</dd>
                </div>
                <div className="border rounded-lg p-4">
                  <dt className="text-sm font-medium text-gray-500">Integrations</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">8</dd>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Metric Trends</h4>
                <MetricTrendChart
                  data={account.metrics.activeUsers}
                  metricName="Active Users"
                  unit="%"
                  color="#3b82f6"
                />
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Score History</h3>
              <div className="space-y-2">
                {account.history.map((h: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm text-gray-600">{h.period} 2024</span>
                    <span className={`text-sm font-semibold ${getPulseScoreColor(h.score)}`}>
                      {h.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
              <p className="text-sm text-gray-500">
                No actions logged yet. Actions and notes will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
