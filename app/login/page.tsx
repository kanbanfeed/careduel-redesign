'use client'

import { motion } from 'framer-motion'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCrowbarLogin = async () => {
    setIsLoading(true)
    // Simulate Crowbar SSO login
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <Header />
      
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200/60"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to continue your health journey</p>
            </div>

            {/* Crowbar SSO Button */}
            <motion.button
              onClick={handleCrowbarLogin}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                    <span className="text-blue-500 font-bold text-sm">C</span>
                  </div>
                  <span>Continue with Crowbar</span>
                </>
              )}
            </motion.button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Dont have an account?{' '}
                <button 
                  onClick={handleCrowbarLogin}
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Sign up with Crowbar
                </button>
              </p>
            </div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200"
            >
              <h4 className="font-semibold text-blue-900 mb-2">Why sign in with Crowbar?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• One-click secure login</li>
                <li>• Earn Crowbar credits for health tasks</li>
                <li>• Sync across all Crowbar platforms</li>
                <li>• Secure and encrypted</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}