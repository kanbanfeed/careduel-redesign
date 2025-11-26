'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const healthTips = [
  {
    id: 1,
    tip: "Start your day with a glass of warm water and lemon to boost metabolism",
    category: "Nutrition",
    emoji: "🍋"
  },
  {
    id: 2,
    tip: "Take a 5-minute break every hour to stretch and move around",
    category: "Exercise",
    emoji: "💪"
  },
  {
    id: 3,
    tip: "Practice deep breathing for 2 minutes to reduce stress",
    category: "Mental Health",
    emoji: "🧘"
  },
  {
    id: 4,
    tip: "Stay hydrated - aim for 8 glasses of water throughout the day",
    category: "Hydration",
    emoji: "💧"
  }
]

export default function HealthTips() {
  const [currentTip, setCurrentTip] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % healthTips.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 text-white mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">💡 Daily Health Tip</h3>
        <span className="text-orange-100 text-sm">
          {currentTip + 1}/{healthTips.length}
        </span>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTip}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-3xl mb-3">{healthTips[currentTip].emoji}</div>
          <p className="text-lg mb-2">{healthTips[currentTip].tip}</p>
          <span className="text-orange-200 text-sm bg-orange-600 bg-opacity-50 px-3 py-1 rounded-full">
            {healthTips[currentTip].category}
          </span>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center space-x-2 mt-4">
        {healthTips.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTip(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentTip ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}