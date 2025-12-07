'use client'

import { useState, useEffect } from 'react'
import { useTenant } from '@/hooks/useTenant'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import Save from '@mui/icons-material/Save'
import RestartAlt from '@mui/icons-material/RestartAlt'

interface PulseWeight {
  id: string
  vertical: string
  usageWeight: number
  experienceWeight: number
  outcomeWeight: number
  riskWeight: number
  greenMin: number
  amberMin: number
}

export default function SettingsPage() {
  const { tenantId } = useTenant()
  const [weights, setWeights] = useState<PulseWeight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [activeVertical, setActiveVertical] = useState('default')

  useEffect(() => {
    fetchWeights()
  }, [tenantId])

  const fetchWeights = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/pulse-weights?tenantId=${tenantId || 'demo-tenant-1'}`)

      if (!response.ok) {
        throw new Error('Failed to fetch pulse weights')
      }

      const data = await response.json()
      setWeights(data.weights || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleWeightChange = (vertical: string, field: string, value: number) => {
    setWeights((prev) =>
      prev.map((w) => (w.vertical === vertical ? { ...w, [field]: value } : w))
    )
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveSuccess(false)
    setError(null)

    try {
      const response = await fetch('/api/pulse-weights', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weights }),
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    fetchWeights()
  }

  const currentWeight = weights.find((w) => w.vertical === activeVertical)
  const totalWeight = currentWeight
    ? currentWeight.usageWeight +
      currentWeight.experienceWeight +
      currentWeight.outcomeWeight +
      currentWeight.riskWeight
    : 0

  if (loading) {
    return <LoadingSpinner message="Loading settings..." />
  }

  if (error && !weights.length) {
    return <ErrorMessage message={error} retry={fetchWeights} />
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Focus Pulse Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Configure pulse score calculation weights and thresholds for each vertical
        </p>
      </div>

      {/* Vertical Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {weights.map((weight) => (
              <button
                key={weight.vertical}
                onClick={() => setActiveVertical(weight.vertical)}
                className={`${
                  activeVertical === weight.vertical
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm capitalize`}
              >
                {weight.vertical}
              </button>
            ))}
          </nav>
        </div>

        {currentWeight && (
          <div className="p-6">
            {/* Component Weights */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Component Weights</h3>
              <p className="text-sm text-gray-600 mb-4">
                Adjust the importance of each component. Total must equal 1.00 (100%)
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Usage Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usage Weight
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.05"
                    value={currentWeight.usageWeight}
                    onChange={(e) =>
                      handleWeightChange(
                        activeVertical,
                        'usageWeight',
                        parseFloat(e.target.value)
                      )
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: `${currentWeight.usageWeight * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {(currentWeight.usageWeight * 100).toFixed(0)}%
                  </p>
                </div>

                {/* Experience Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Weight
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.05"
                    value={currentWeight.experienceWeight}
                    onChange={(e) =>
                      handleWeightChange(
                        activeVertical,
                        'experienceWeight',
                        parseFloat(e.target.value)
                      )
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${currentWeight.experienceWeight * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {(currentWeight.experienceWeight * 100).toFixed(0)}%
                  </p>
                </div>

                {/* Outcome Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outcome Weight
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.05"
                    value={currentWeight.outcomeWeight}
                    onChange={(e) =>
                      handleWeightChange(
                        activeVertical,
                        'outcomeWeight',
                        parseFloat(e.target.value)
                      )
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 transition-all"
                      style={{ width: `${currentWeight.outcomeWeight * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {(currentWeight.outcomeWeight * 100).toFixed(0)}%
                  </p>
                </div>

                {/* Risk Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Risk Weight
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.05"
                    value={currentWeight.riskWeight}
                    onChange={(e) =>
                      handleWeightChange(
                        activeVertical,
                        'riskWeight',
                        parseFloat(e.target.value)
                      )
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 transition-all"
                      style={{ width: `${currentWeight.riskWeight * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {(currentWeight.riskWeight * 100).toFixed(0)}%
                  </p>
                </div>
              </div>

              {/* Total Weight Validation */}
              <div className="mt-4 p-4 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Total Weight:</span>
                  <span
                    className={`text-lg font-semibold ${
                      Math.abs(totalWeight - 1.0) < 0.01
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {totalWeight.toFixed(2)} {Math.abs(totalWeight - 1.0) < 0.01 ? '✓' : '✗'}
                  </span>
                </div>
                {Math.abs(totalWeight - 1.0) >= 0.01 && (
                  <p className="mt-2 text-sm text-red-600">
                    Total weight must equal 1.00. Current total is {totalWeight.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            {/* Score Thresholds */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Score Thresholds</h3>
              <p className="text-sm text-gray-600 mb-4">
                Define score ranges for health status indicators
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Green Minimum Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={currentWeight.greenMin}
                    onChange={(e) =>
                      handleWeightChange(
                        activeVertical,
                        'greenMin',
                        parseInt(e.target.value)
                      )
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Scores ≥ {currentWeight.greenMin} are marked as Green (Healthy)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amber Minimum Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={currentWeight.amberMin}
                    onChange={(e) =>
                      handleWeightChange(
                        activeVertical,
                        'amberMin',
                        parseInt(e.target.value)
                      )
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Scores {currentWeight.amberMin}-{currentWeight.greenMin - 1} are marked as
                    Amber (At Risk)
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-gray-50">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded" />
                    <span className="font-medium">Green:</span>
                    <span className="text-gray-600">
                      {currentWeight.greenMin} - 100
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-amber-500 rounded" />
                    <span className="font-medium">Amber:</span>
                    <span className="text-gray-600">
                      {currentWeight.amberMin} - {currentWeight.greenMin - 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded" />
                    <span className="font-medium">Red:</span>
                    <span className="text-gray-600">
                      0 - {currentWeight.amberMin - 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <RestartAlt className="mr-2" sx={{ fontSize: 18 }} />
                Reset Changes
              </button>

              <div className="flex items-center gap-3">
                {saveSuccess && (
                  <span className="text-sm text-green-600 font-medium">
                    Settings saved successfully!
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || Math.abs(totalWeight - 1.0) >= 0.01}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="mr-2" sx={{ fontSize: 18 }} />
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-800">{error}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Formula Preview */}
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Pulse Score Formula</h3>
        {currentWeight && (
          <div className="font-mono text-sm bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-800">
              Score = (Usage × {currentWeight.usageWeight.toFixed(2)}) + (Experience ×{' '}
              {currentWeight.experienceWeight.toFixed(2)}) + (Outcomes ×{' '}
              {currentWeight.outcomeWeight.toFixed(2)}) + ((100 - Risk) ×{' '}
              {currentWeight.riskWeight.toFixed(2)})
            </p>
          </div>
        )}
        <p className="mt-3 text-sm text-gray-600">
          All component scores are normalized to 0-100 before applying weights
        </p>
      </div>
    </div>
  )
}
