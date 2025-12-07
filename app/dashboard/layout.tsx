'use client'

import Link from 'next/link'
import { ReactNode, useState } from 'react'
import VersionFooter from '@/components/VersionFooter'
import Notifications from '@mui/icons-material/Notifications'
import NotificationsActive from '@mui/icons-material/NotificationsActive'
import Search from '@mui/icons-material/Search'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [notifications] = useState([
    {
      id: '1',
      type: 'alert',
      message: 'Acme Corp pulse score dropped to 45',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'info',
      message: 'New user added: John Smith',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'success',
      message: 'TechFlow Inc renewed contract',
      time: '2 hours ago',
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length < 2) {
      setSearchResults([])
      return
    }

    // Mock search results - in production, this would call an API
    const mockResults = [
      {
        type: 'account',
        id: '1',
        name: 'Acme Corporation',
        subtitle: 'Enterprise • Tech',
        score: 85,
      },
      {
        type: 'account',
        id: '2',
        name: 'TechFlow Inc',
        subtitle: 'SMB • Tech',
        score: 72,
      },
      {
        type: 'user',
        id: '1',
        name: 'Sarah Johnson',
        subtitle: 'CSM • sarah@example.com',
      },
      {
        type: 'user',
        id: '2',
        name: 'Mike Chen',
        subtitle: 'Manager • mike@example.com',
      },
    ].filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
    )

    setSearchResults(mockResults)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/dashboard" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">Focus Dash</span>
              </Link>

              <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-gray-900"
                >
                  Portfolio
                </Link>
                <Link
                  href="/dashboard/accounts"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Accounts
                </Link>
                <Link
                  href="/dashboard/users"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Users
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Settings
                </Link>
                <Link
                  href="/dashboard/admin"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Upload
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Global Search */}
              <div className="relative">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Search className="text-gray-500" sx={{ fontSize: 24 }} />
                </button>

                {/* Search Dropdown */}
                {showSearch && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4">
                      <input
                        type="text"
                        placeholder="Search accounts, users..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.length === 0 && searchQuery.length >= 2 && (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No results found
                        </div>
                      )}
                      {searchResults.length === 0 && searchQuery.length < 2 && (
                        <div className="p-4 text-center text-sm text-gray-500">
                          Type to search...
                        </div>
                      )}
                      {searchResults.map((result) => (
                        <Link
                          key={`${result.type}-${result.id}`}
                          href={
                            result.type === 'account'
                              ? `/dashboard/accounts/${result.id}`
                              : `/dashboard/users/${result.id}`
                          }
                          onClick={() => {
                            setShowSearch(false)
                            setSearchQuery('')
                            setSearchResults([])
                          }}
                          className="block p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{result.name}</p>
                              <p className="text-xs text-gray-500 mt-1">{result.subtitle}</p>
                            </div>
                            {result.type === 'account' && result.score && (
                              <div className="text-lg font-semibold text-blue-600">
                                {result.score}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                >
                  {unreadCount > 0 ? (
                    <NotificationsActive className="text-blue-600" sx={{ fontSize: 24 }} />
                  ) : (
                    <Notifications className="text-gray-500" sx={{ fontSize: 24 }} />
                  )}
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                              !notification.read ? 'bg-blue-50' : ''
                            }`}
                          >
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      <Link
                        href="/dashboard/notifications"
                        className="text-sm text-blue-600 hover:text-blue-700 block text-center"
                        onClick={() => setShowNotifications(false)}
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <span className="text-sm text-gray-700">Admin User</span>
              <Link
                href="/api/auth/signout"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 w-full">
        {children}
      </main>

      {/* Version Footer */}
      <VersionFooter />
    </div>
  )
}
