'use client'

import { useSession } from 'next-auth/react'

interface UseTenantReturn {
  tenantId: string | null
  tenantName: string | null
  userId: string | null
  userRole: string | null
  userName: string | null
  userEmail: string | null
  loading: boolean
  isAdmin: boolean
  isManager: boolean
  isCSM: boolean
}

export function useTenant(): UseTenantReturn {
  const { data: session, status } = useSession()

  const loading = status === 'loading'
  const tenantId = session?.user?.tenantId || null
  const tenantName = session?.user?.tenantName || null
  const userId = session?.user?.id || null
  const userRole = session?.user?.role || null
  const userName = session?.user?.name || null
  const userEmail = session?.user?.email || null

  const isAdmin = userRole === 'admin'
  const isManager = userRole === 'manager'
  const isCSM = userRole === 'csm'

  return {
    tenantId,
    tenantName,
    userId,
    userRole,
    userName,
    userEmail,
    loading,
    isAdmin,
    isManager,
    isCSM,
  }
}
