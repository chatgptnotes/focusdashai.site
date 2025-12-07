import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercent(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'green':
      return 'text-pulse-green bg-green-50'
    case 'amber':
      return 'text-pulse-amber bg-amber-50'
    case 'red':
      return 'text-pulse-red bg-red-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}

export function getPulseScoreColor(score: number): string {
  if (score >= 70) return 'text-pulse-green'
  if (score >= 50) return 'text-pulse-amber'
  return 'text-pulse-red'
}
