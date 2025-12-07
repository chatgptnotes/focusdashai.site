'use client'

import { useState } from 'react'
import { useAccounts } from '@/hooks/useAccounts'
import { useTenant } from '@/hooks/useTenant'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import AccountTable from '@/components/AccountTable'
import FileDownload from '@mui/icons-material/FileDownload'

export default function AccountsPageDynamic() {
  const { tenantId } = useTenant()
  const [vertical, setVertical] = useState<string>('all')
  const [status, setStatus] = useState<string>('all')
  const [segment, setSegment] = useState<string>('all')
  const [owner, setOwner] = useState<string>('all')

  const { accounts, loading, error, refetch } = useAccounts({
    tenantId: tenantId || 'demo-tenant-1',
    vertical,
    status,
    segment,
    ownerId: owner,
  })

  const handleExportCSV = () => {
    if (accounts.length === 0) return

    const headers = ['Account Name', 'Vertical', 'Segment', 'Pulse Score', 'Status', 'MRR', 'Owner']
    const rows = accounts.map((account) => [
      account.name,
      account.vertical,
      account.segment || '',
      account.latestScore?.score.toFixed(1) || '',
      account.latestScore?.status || '',
      account.mrr,
      account.owner?.name || '',
    ])

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `accounts-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Accounts</h1>
          <p className="mt-2 text-sm text-gray-700">
            All customer accounts with Focus Pulse Scores
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleExportCSV}
            disabled={accounts.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileDownload sx={{ fontSize: 18 }} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
            <label htmlFor="vertical" className="block text-sm font-medium text-gray-700">
              Vertical
            </label>
            <select
              id="vertical"
              value={vertical}
              onChange={(e) => setVertical(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">All Verticals</option>
              <option value="tech">Tech</option>
              <option value="healthcare">Healthcare</option>
              <option value="manufacturing">Manufacturing</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">All Status</option>
              <option value="green">Green</option>
              <option value="amber">Amber</option>
              <option value="red">Red</option>
            </select>
          </div>

          <div>
            <label htmlFor="segment" className="block text-sm font-medium text-gray-700">
              Segment
            </label>
            <select
              id="segment"
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">All Segments</option>
              <option value="enterprise">Enterprise</option>
              <option value="mid-market">Mid-market</option>
              <option value="smb">SMB</option>
            </select>
          </div>

          <div>
            <label htmlFor="owner" className="block text-sm font-medium text-gray-700">
              Owner
            </label>
            <select
              id="owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">All Owners</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 text-sm text-gray-700">
        Showing {accounts.length} account{accounts.length !== 1 ? 's' : ''}
      </div>

      {/* Accounts Table */}
      <div className="mt-4">
        {loading ? (
          <LoadingSpinner message="Loading accounts..." />
        ) : error ? (
          <ErrorMessage message={error} retry={refetch} />
        ) : (
          <AccountTable accounts={accounts} />
        )}
      </div>
    </div>
  )
}
