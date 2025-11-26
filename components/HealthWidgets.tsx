'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function HealthWidgets() {
  const [hydration, setHydration] = useState(0)
  const [steps, setSteps] = useState(0)
  const [sleep, setSleep] = useState(0)

  const addWater = () => {
    if (hydration < 8) {
      setHydration(prev => prev + 1)
      // Add credits for hydration tracking
      updateCredits(2)
    }
  }

  const addSteps = () => {
    setSteps(prev => prev + 1000)
    if (steps % 5000 === 0) {
      updateCredits(5)
    }
  }

  const logSleep = (hours: number) => {
    setSleep(hours)
    if (hours >= 7) {
      updateCredits(3)
    }
  }

  const updateCredits = (points: number) => {
    // This would update the global credit state
    console.log(`Earned ${points} credits!`)
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {/* Hydration Tracker */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-blue-50 rounded-2xl p-6 border border-blue-200"
      >
        <h3 className="font-bold text-blue-900 mb-4">💧 Hydration Tracker</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-700">{hydration}/8</span>
          <span className="text-blue-600">Glasses</span>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`h-3 rounded-full transition-all duration-300 ${
                i < hydration ? 'bg-blue-500' : 'bg-blue-200'
              }`}
            />
          ))}
        </div>
        <button
          onClick={addWater}
          disabled={hydration >= 8}
          className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          + Add Glass
        </button>
      </motion.div>

      {/* Step Counter */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-green-50 rounded-2xl p-6 border border-green-200"
      >
        <h3 className="font-bold text-green-900 mb-4">🚶 Step Counter</h3>
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-green-700 mb-2">
            {steps.toLocaleString()}
          </div>
          <div className="text-green-600">Steps Today</div>
        </div>
        <div className="w-full bg-green-200 rounded-full h-2 mb-4">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((steps / 10000) * 100, 100)}%` }}
          />
        </div>
        <button
          onClick={addSteps}
          className="w-full bg-green-500 text-white py-2 rounded-xl font-semibold hover:bg-green-600 transition-colors"
        >
          + 1,000 Steps
        </button>
      </motion.div>

      {/* Sleep Tracker */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-purple-50 rounded-2xl p-6 border border-purple-200"
      >
        <h3 className="font-bold text-purple-900 mb-4">😴 Sleep Tracker</h3>
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-purple-700 mb-2">
            {sleep}h
          </div>
          <div className="text-purple-600">Last Night</div>
        </div>
        <div className="flex space-x-2">
          {[6, 7, 8, 9].map(hours => (
            <button
              key={hours}
              onClick={() => logSleep(hours)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                sleep === hours 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
              }`}
            >
              {hours}h
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}