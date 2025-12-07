'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setResult(null)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('tenantId', 'demo-tenant-1') // TODO: Get from session

      const response = await fetch('/api/metrics/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Upload failed')
        setResult(data)
      } else {
        setResult(data)
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Upload metrics, manage accounts, and configure Focus Pulse weights
          </p>
        </div>
      </div>

      {/* Metrics Upload Section */}
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Upload Metrics (CSV)</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Upload a CSV file with customer metrics. The file should contain columns:</p>
            <code className="mt-2 block bg-gray-100 p-2 rounded text-xs">
              account_name, metric_type, period_start, period_end, value, unit, source
            </code>
          </div>

          <div className="mt-5">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>

          {file && (
            <div className="mt-4">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload Metrics'}
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {result && result.success && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              <p className="font-bold">Success!</p>
              <p>{result.message}</p>
              {result.period && (
                <p className="text-sm mt-2">
                  Period: {new Date(result.period.start).toLocaleDateString()} -{' '}
                  {new Date(result.period.end).toLocaleDateString()}
                </p>
              )}
            </div>
          )}

          {result && !result.success && result.errors && (
            <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded">
              <p className="font-bold">Validation Errors ({result.errors.length}):</p>
              <div className="mt-2 max-h-64 overflow-y-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-amber-300">
                      <th className="text-left py-1">Row</th>
                      <th className="text-left py-1">Field</th>
                      <th className="text-left py-1">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.errors.slice(0, 20).map((err: any, idx: number) => (
                      <tr key={idx} className="border-b border-amber-200">
                        <td className="py-1">{err.row}</td>
                        <td className="py-1">{err.field}</td>
                        <td className="py-1">{err.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {result.errors.length > 20 && (
                  <p className="mt-2 text-xs">
                    ... and {result.errors.length - 20} more errors
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Accounts</h3>
            <p className="mt-1 text-sm text-gray-500">Manage customer accounts</p>
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-500">
              View Accounts →
            </button>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Pulse Weights</h3>
            <p className="mt-1 text-sm text-gray-500">Configure scoring weights</p>
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-500">
              Configure →
            </button>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Users</h3>
            <p className="mt-1 text-sm text-gray-500">Manage team access</p>
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-500">
              Manage Users →
            </button>
          </div>
        </div>
      </div>

      {/* CSV Template Download */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900">Need a CSV template?</h4>
        <p className="mt-1 text-sm text-blue-700">
          Download vertical-specific templates with example data:
        </p>
        <div className="mt-3 flex gap-3">
          <a
            href="/templates/tech-metrics-template.csv"
            className="text-sm text-blue-600 hover:text-blue-500 underline"
          >
            Tech Template
          </a>
          <a
            href="/templates/healthcare-metrics-template.csv"
            className="text-sm text-blue-600 hover:text-blue-500 underline"
          >
            Healthcare Template
          </a>
          <a
            href="/templates/manufacturing-metrics-template.csv"
            className="text-sm text-blue-600 hover:text-blue-500 underline"
          >
            Manufacturing Template
          </a>
        </div>
      </div>
    </div>
  )
}
