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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex flex-col">
      {/* Navigation with glassmorphism */}
      <nav className="glass sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/dashboard" className="flex items-center group">
                <span className="text-2xl font-bold gradient-text-blue transition-all duration-300 group-hover:scale-105">
                  Focus Dash
                </span>
              </Link>

              <div className="hidden sm:ml-10 sm:flex sm:space-x-1">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-blue text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:-translate-y-0.5"
                >
                  Portfolio
                </Link>
                <Link
                  href="/dashboard/accounts"
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white/60 hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Accounts
                </Link>
                <Link
                  href="/dashboard/users"
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white/60 hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Users
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white/60 hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Settings
                </Link>
                <Link
                  href="/dashboard/admin"
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white/60 hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Upload
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Global Search */}
              <div className="relative">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="p-2 rounded-lg hover:bg-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <Search className="text-gray-600" sx={{ fontSize: 24 }} />
                </button>

                {/* Search Dropdown with glassmorphism */}
                {showSearch && (
                  <div className="absolute right-0 mt-2 w-96 glass rounded-xl shadow-card border border-white/20 z-50 animate-slide-up">
                    <div className="p-4">
                      <input
                        type="text"
                        placeholder="Search accounts, users..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full px-4 py-3 bg-white/60 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/80 transition-all duration-300"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
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
                          className="block p-4 border-b border-white/20 hover:bg-white/40 cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{result.name}</p>
                              <p className="text-xs text-gray-500 mt-1">{result.subtitle}</p>
                            </div>
                            {result.type === 'account' && result.score && (
                              <div className="text-lg font-semibold gradient-text-blue">
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
                  className="p-2 rounded-lg hover:bg-white/60 relative transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                >
                  {unreadCount > 0 ? (
                    <NotificationsActive className="text-blue-600 animate-pulse" sx={{ fontSize: 24 }} />
                  ) : (
                    <Notifications className="text-gray-600" sx={{ fontSize: 24 }} />
                  )}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs flex items-center justify-center shadow-glow animate-bounce">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown with glassmorphism */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 glass rounded-xl shadow-card border border-white/20 z-50 animate-slide-up">
                    <div className="p-4 border-b border-white/20">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-white/20 hover:bg-white/40 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${
                              !notification.read ? 'bg-blue-50/50' : ''
                            }`}
                          >
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-3 border-t border-white/20">
                      <Link
                        href="/dashboard/notifications"
                        className="text-sm text-blue-600 hover:text-blue-700 block text-center font-medium transition-colors duration-300"
                        onClick={() => setShowNotifications(false)}
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-gray-300/50"></div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/40 backdrop-blur-sm border border-white/40">
                  <div className="w-8 h-8 rounded-full bg-gradient-blue flex items-center justify-center text-white text-sm font-semibold shadow-glow">
                    A
                  </div>
                  <span className="text-sm font-medium text-gray-700">Admin User</span>
                </div>
                <Link
                  href="/api/auth/signout"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50/50 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  Sign out
                </Link>
              </div>
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
