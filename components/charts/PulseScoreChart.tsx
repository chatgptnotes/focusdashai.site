'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'

interface PulseScoreDataPoint {
  period: string
  score: number
  status: string
}

interface PulseScoreChartProps {
  data: PulseScoreDataPoint[]
  greenThreshold?: number
  amberThreshold?: number
}

export default function PulseScoreChart({
  data,
  greenThreshold = 70,
  amberThreshold = 50,
}: PulseScoreChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">No pulse score history available</p>
      </div>
    )
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />

          {/* Threshold lines */}
          <ReferenceLine
            y={greenThreshold}
            stroke="#10b981"
            strokeDasharray="3 3"
            label={{ value: 'Green', fontSize: 10, fill: '#10b981' }}
          />
          <ReferenceLine
            y={amberThreshold}
            stroke="#f59e0b"
            strokeDasharray="3 3"
            label={{ value: 'Amber', fontSize: 10, fill: '#f59e0b' }}
          />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Pulse Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
