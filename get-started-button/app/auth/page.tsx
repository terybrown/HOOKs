'use client'

import Link from 'next/link'
import AuthContainer from '@/components/auth/auth-container'

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-12 text-center">
        <Link href="/" className="text-2xl font-bold text-foreground hover:opacity-80 transition-opacity">
          HOOK
        </Link>
      </div>

      {/* Auth Container */}
      <AuthContainer />

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          By signing up, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Terms
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
