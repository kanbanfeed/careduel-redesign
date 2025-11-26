// contexts/AuthContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithCrowbar: () => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for tokens in URL hash after redirect from Crowbar
    const handleHashTokens = async () => {
      const hash = window.location.hash
      if (hash && hash.includes('access_token')) {
        const params = new URLSearchParams(hash.substring(1)) // Remove the # character
        const access_token = params.get('access_token')
        const refresh_token = params.get('refresh_token')

        if (access_token && refresh_token) {
          try {
            const { data: { session }, error } = await supabase.auth.setSession({
              access_token,
              refresh_token
            })

            if (error) throw error

            if (session) {
              // Clear the hash from URL
              window.history.replaceState(null, '', window.location.pathname)
              router.push('/dashboard')
            }
          } catch (error) {
            console.error('Error setting session from hash:', error)
          }
        }
      }
    }

    // Get initial session
    const initializeAuth = async () => {
      await handleHashTokens() // Check for tokens first
      
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    initializeAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [router])

  const signInWithCrowbar = () => {
    // Use the exact parameter name that Crowbar expects: 'redirect_to'
    const currentUrl = window.location.origin
    const returnUrl = `${currentUrl}/auth/callback`
    
    const crowbarLoginUrl = `https://www.crowbarltd.com/login?redirect_to=${encodeURIComponent(returnUrl)}`
    
    console.log('Redirecting to Crowbar login:', crowbarLoginUrl)
    window.location.href = crowbarLoginUrl
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithCrowbar, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}