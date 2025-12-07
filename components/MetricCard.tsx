import TrendingUp from '@mui/icons-material/TrendingUp'
import TrendingDown from '@mui/icons-material/TrendingDown'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

export default function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  variant = 'default',
}: MetricCardProps) {
  const variantStyles = {
    default: 'bg-white',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-amber-50 border-amber-200',
    danger: 'bg-red-50 border-red-200',
  }

  const isPositiveChange = change !== undefined && change > 0
  const isNegativeChange = change !== undefined && change < 0

  return (
    <div className={cn('overflow-hidden shadow rounded-lg border', variantStyles[variant])}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
            {change !== undefined && (
              <div className="mt-2 flex items-center gap-1">
                {isPositiveChange && <TrendingUp className="text-green-600" sx={{ fontSize: 16 }} />}
                {isNegativeChange && <TrendingDown className="text-red-600" sx={{ fontSize: 16 }} />}
                <span
                  className={cn(
                    'text-sm font-medium',
                    isPositiveChange && 'text-green-600',
                    isNegativeChange && 'text-red-600',
                    !isPositiveChange && !isNegativeChange && 'text-gray-600'
                  )}
                >
                  {change > 0 && '+'}
                  {change}%
                </span>
                {changeLabel && <span className="text-sm text-gray-500">{changeLabel}</span>}
              </div>
            )}
          </div>
          {icon && <div className="flex-shrink-0">{icon}</div>}
        </div>
      </div>
    </div>
  )
}
