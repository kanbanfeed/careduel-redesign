'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Achievement {
  id: number
  title: string
  description: string
  points: number
  unlocked: boolean
}

export default function AchievementCelebration() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first health task",
      points: 10,
      unlocked: false
    },
    {
      id: 2,
      title: "Hydration Hero",
      description: "Log 8 glasses of water for 3 consecutive days",
      points: 25,
      unlocked: false
    },
    {
      id: 3,
      title: "Week Warrior",
      description: "Complete all daily tasks for 7 days straight",
      points: 50,
      unlocked: false
    }
  ])
  const [showCelebration, setShowCelebration] = useState(false)
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null)

  const unlockAchievement = (id: number) => {
    const achievement = achievements.find(a => a.id === id)
    if (achievement && !achievement.unlocked) {
      setAchievements(prev => 
        prev.map(a => a.id === id ? { ...a, unlocked: true } : a)
      )
      setCurrentAchievement(achievement)
      setShowCelebration(true)
      
      setTimeout(() => {
        setShowCelebration(false)
      }, 4000)
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
        <h3 className="font-bold text-gray-900 mb-4">🏆 Achievements</h3>
        <div className="grid gap-3">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                achievement.unlocked
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-gray-50 hover:border-blue-300'
              }`}
              onClick={() => !achievement.unlocked && unlockAchievement(achievement.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className={`font-semibold ${
                    achievement.unlocked ? 'text-green-700' : 'text-gray-700'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${
                    achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    +{achievement.points}
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && currentAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-white text-center max-w-sm mx-4"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Achievement Unlocked!</h3>
              <h4 className="text-xl font-semibold mb-2">{currentAchievement.title}</h4>
              <p className="text-yellow-100 mb-4">{currentAchievement.description}</p>
              <div className="text-2xl font-bold text-yellow-200">
                +{currentAchievement.points} Credits!
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}