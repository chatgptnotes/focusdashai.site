export default function PortfolioDashboard() {
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
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Accounts</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total MRR</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">$0</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">NRR</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">0%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Avg Pulse Score</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Score Distribution</h3>
          <div className="mt-5 grid grid-cols-3 gap-5">
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <dt className="text-sm font-medium text-gray-500">Green</dt>
              <dd className="mt-1 text-2xl font-semibold text-pulse-green">0</dd>
            </div>
            <div className="border border-amber-200 rounded-lg p-4 bg-amber-50">
              <dt className="text-sm font-medium text-gray-500">Amber</dt>
              <dd className="mt-1 text-2xl font-semibold text-pulse-amber">0</dd>
            </div>
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <dt className="text-sm font-medium text-gray-500">Red</dt>
              <dd className="mt-1 text-2xl font-semibold text-pulse-red">0</dd>
            </div>
          </div>
        </div>
      </div>

      {/* Top Risk / Top Upside */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Top 10 Risk</h3>
            <div className="text-sm text-gray-500">
              No accounts to display. Upload metrics to see risk analysis.
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Top 10 Upside</h3>
            <div className="text-sm text-gray-500">
              No accounts to display. Upload metrics to see upside opportunities.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
