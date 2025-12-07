'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import type { PulseComponents } from '@/lib/types'

interface ComponentBreakdownChartProps {
  components: PulseComponents
}

export default function ComponentBreakdownChart({ components }: ComponentBreakdownChartProps) {
  const data = [
    { component: 'Usage', value: components.usage, fullMark: 100 },
    { component: 'Experience', value: components.experience, fullMark: 100 },
    { component: 'Outcomes', value: components.outcomes, fullMark: 100 },
    { component: 'Risk', value: 100 - components.risk, fullMark: 100 }, // Inverted
  ]

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="component"
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '12px',
            }}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
