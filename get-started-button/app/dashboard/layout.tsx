'use client'

import React from 'react'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardHeader } from '@/components/dashboard/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Development mode: Show dev banner if enabled
  const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === 'true'

  return (
    <div className="flex h-screen bg-background">
      {/* Dev Mode Banner */}
      {isDevMode && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500/20 border-b border-yellow-500 px-4 py-2 z-50">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            🔧 Development Mode Active - Auth Check Disabled
          </p>
        </div>
      )}
      
      {/* Sidebar Navigation */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className={`flex-1 overflow-y-auto ${isDevMode ? 'pt-12' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  )
}
