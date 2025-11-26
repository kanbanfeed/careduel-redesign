// app/auth/callback/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Crown, CheckCircle, XCircle, Loader } from 'lucide-react'

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Processing authentication...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for tokens in URL hash (from Crowbar redirect)
        const hash = window.location.hash
        console.log('URL Hash:', hash)

        if (hash && hash.includes('access_token')) {
          const params = new URLSearchParams(hash.substring(1))
          const access_token = params.get('access_token')
          const refresh_token = params.get('refresh_token')

          if (access_token && refresh_token) {
            setMessage('Setting up your session...')
            
            // Set the session with tokens from Crowbar
            const { data: { session }, error } = await supabase.auth.setSession({
              access_token,
              refresh_token
            })

            if (error) {
              console.error('Supabase session error:', error)
              throw error
            }

            if (session) {
              setStatus('success')
              setMessage('Successfully authenticated! Redirecting to dashboard...')
              
              // Clear the hash from URL
              window.history.replaceState(null, '', window.location.pathname)
              
              // Redirect to dashboard
              setTimeout(() => {
                router.push('/dashboard')
              }, 1500)
              return
            }
          }
        }

        // If no tokens in hash, check if we're already authenticated
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          setStatus('success')
          setMessage('Welcome back! Redirecting to dashboard...')
          setTimeout(() => router.push('/dashboard'), 1000)
          return
        }

        // If we reach here and no tokens, it might be an error
        throw new Error('No authentication tokens found')

      } catch (error) {
        console.error('Auth callback error:', error)
        setStatus('error')
        setMessage(error instanceof Error ? error.message : 'Authentication failed')
        
        setTimeout(() => {
          router.push('/')
        }, 3000)
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
        {status === 'loading' && (
          <>
            <Loader className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
            <Crown className="w-8 h-8 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Connecting to Crowbar</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <Crown className="w-8 h-8 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to CareDuel!</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h2>
            <p className="text-gray-600">{message}</p>
            <button 
              onClick={() => router.push('/')}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  )
}