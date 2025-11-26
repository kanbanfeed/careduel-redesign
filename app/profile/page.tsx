'use client'

import { motion } from 'framer-motion'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <Header />
      
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-2xl mb-8 border border-gray-200/60"
          >
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">U</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
                <p className="text-gray-600">Connected via Crowbar SSO</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Account Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                    user@example.com
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                    January 2024
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Crowbar ID</label>
                  <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                    CB-123456789
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Health Preferences</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Daily Goal</label>
                  <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                    5 tasks per day
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Focus Areas</label>
                  <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                    Hydration, Exercise, Nutrition
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Update Preferences
                </button>
              </div>
            </div>
          </motion.div>

          {/* Crowbar Integration Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-4">Crowbar Integration</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Account Status</span>
                <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Crowbar Credits</span>
                <span className="text-xl font-bold">245</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Platform Level</span>
                <span className="text-xl font-bold">Silver</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}