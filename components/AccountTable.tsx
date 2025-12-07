'use client'

import Link from 'next/link'
import { formatCurrency, getStatusColor, getPulseScoreColor } from '@/lib/utils'
import type { AccountWithScore } from '@/lib/types'
import Visibility from '@mui/icons-material/Visibility'

interface AccountTableProps {
  accounts: AccountWithScore[]
}

export default function AccountTable({ accounts }: AccountTableProps) {
  if (accounts.length === 0) {
    return (
      <div className="bg-white shadow ring-1 ring-black ring-opacity-5 md:rounded-lg p-8 text-center">
        <p className="text-sm text-gray-500">No accounts found. Adjust your filters or upload metrics to get started.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              Account Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Vertical
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Segment
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Pulse Score
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              MRR
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Owner
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">View</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {accounts.map((account) => (
            <tr key={account.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {account.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                {account.vertical}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                {account.segment || '-'}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {account.latestScore ? (
                  <span className={getPulseScoreColor(account.latestScore.score) + ' font-semibold'}>
                    {account.latestScore.score.toFixed(1)}
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {account.latestScore ? (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(account.latestScore.status)}`}>
                    {account.latestScore.status}
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
                {formatCurrency(account.mrr, account.baseCurrency)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {account.owner?.name || '-'}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <Link
                  href={`/dashboard/accounts/${account.id}`}
                  className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                >
                  <Visibility sx={{ fontSize: 16 }} />
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
