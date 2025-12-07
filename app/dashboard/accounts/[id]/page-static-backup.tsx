'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function AccountDetailPage() {
  const params = useParams()
  const accountId = params.id

  const [account, setAccount] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch account details
    setLoading(false)
  }, [accountId])

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Account Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Account Name</h1>
            <div className="mt-2 flex gap-4 text-sm text-gray-500">
              <span>Tech • Enterprise</span>
              <span>Owner: CSM Name</span>
              <span>MRR: $50,000</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-pulse-green">85</div>
            <div className="text-sm text-gray-500">Focus Pulse Score</div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-2">
              Green
            </span>
          </div>
        </div>
      </div>

      {/* Pulse Components */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Usage</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">85</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Experience</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">75</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Outcomes</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">80</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Risk</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">15</dd>
          </div>
        </div>
      </div>

      {/* Vertical Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm">
              Tech Metrics
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm">
              History
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm">
              Actions
            </button>
          </nav>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border rounded-lg p-4">
              <dt className="text-sm font-medium text-gray-500">NRR</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">115%</dd>
            </div>
            <div className="border rounded-lg p-4">
              <dt className="text-sm font-medium text-gray-500">Active Users</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">85%</dd>
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

          <div className="mt-6 text-sm text-gray-500">
            No historical data available yet. Upload metrics to see trends.
          </div>
        </div>
      </div>
    </div>
  )
}
