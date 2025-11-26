'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useState, useEffect } from 'react'

export default function HealthHub() {
  const [hydration, setHydration] = useState(0)
  const [steps, setSteps] = useState(0)
  const [sleep, setSleep] = useState(0)
  const [mood, setMood] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [currentTip, setCurrentTip] = useState(0)
  const [achievements, setAchievements] = useState([
    { id: 1, title: 'First Steps', description: 'Complete your first health task', points: 10, unlocked: false },
    { id: 2, title: 'Hydration Hero', description: 'Log 8 glasses of water', points: 25, unlocked: false },
    { id: 3, title: 'Step Master', description: 'Reach 10,000 steps', points: 50, unlocked: false }
  ])
  const [showCelebration, setShowCelebration] = useState(false)
  const [currentAchievement, setCurrentAchievement] = useState<any>(null)

  const healthTips = [
    { id: 1, tip: "Start your day with a glass of warm water and lemon", category: "Nutrition", emoji: "🍋" },
    { id: 2, tip: "Take a 5-minute break every hour to stretch", category: "Exercise", emoji: "💪" },
    { id: 3, tip: "Practice deep breathing for 2 minutes to reduce stress", category: "Mental Health", emoji: "🧘" }
  ]

  // Health Tracking Functions
  const addWater = () => {
    if (hydration < 8) {
      const newHydration = hydration + 1
      setHydration(newHydration)
      
      if (newHydration === 8) {
        unlockAchievement(2)
      }
    }
  }

  const addSteps = (increment: number) => {
    const newSteps = steps + increment
    setSteps(newSteps)
    
    if (newSteps >= 10000 && steps < 10000) {
      unlockAchievement(3)
    }
  }

  const logSleep = (hours: number) => {
    setSleep(hours)
  }

  // Voice Assistant Functions
  const startListening = () => {
    setIsListening(true)
    setTranscript('Listening...')
    
    setTimeout(() => {
      const commands = {
        'log water': () => { addWater(); return 'Great! I logged one glass of water for you. 💧' },
        'add steps': () => { addSteps(1000); return 'Added 1,000 steps to your counter! 🚶' },
        'how are my stats': () => `You have ${hydration}/8 glasses, ${steps} steps, and ${sleep} hours sleep.`,
        'I feel tired': () => { setMood('😴 Tired'); return 'I logged your mood as tired. Rest well! 🌙' }
      }
      
      const randomCommand = Object.keys(commands)[Math.floor(Math.random() * Object.keys(commands).length)]
      setTranscript(`You said: "${randomCommand}"`)
      const result = commands[randomCommand as keyof typeof commands]()
      setResponse(result)
      setIsListening(false)
      
      setTimeout(() => {
        setTranscript('')
        setResponse('')
      }, 4000)
    }, 2000)
  }

  // Achievement System
  const unlockAchievement = (id: number) => {
    const achievement = achievements.find(a => a.id === id)
    if (achievement && !achievement.unlocked) {
      setAchievements(prev => prev.map(a => a.id === id ? { ...a, unlocked: true } : a))
      setCurrentAchievement(achievement)
      setShowCelebration(true)
      
      setTimeout(() => {
        setShowCelebration(false)
      }, 4000)
    }
  }

  // Auto-rotate health tips
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % healthTips.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <Header />
      
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Hub</h1>
            <p className="text-lg text-gray-600">Your interactive health companion with tracking, tips, and achievements</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Health Trackers */}
            <div className="lg:col-span-2 space-y-6">
              {/* Health Tips Carousel */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 text-white"
              >
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
              </motion.div>

              {/* Health Tracking Widgets */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Hydration Tracker */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-blue-200"
                >
                  <h3 className="font-bold text-blue-900 mb-4">💧 Hydration</h3>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-700 mb-2">{hydration}/8</div>
                    <div className="text-blue-600">Glasses Today</div>
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-green-200"
                >
                  <h3 className="font-bold text-green-900 mb-4">🚶 Steps</h3>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-700 mb-2">
                      {(steps / 1000).toFixed(1)}k
                    </div>
                    <div className="text-green-600">Steps Today</div>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((steps / 10000) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addSteps(1000)}
                      className="bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      +1K
                    </button>
                    <button
                      onClick={() => addSteps(5000)}
                      className="bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      +5K
                    </button>
                  </div>
                </motion.div>

                {/* Sleep Tracker */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-purple-200"
                >
                  <h3 className="font-bold text-purple-900 mb-4">😴 Sleep</h3>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-purple-700 mb-2">
                      {sleep}h
                    </div>
                    <div className="text-purple-600">Last Night</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[6, 7, 8, 9].map(hours => (
                      <button
                        key={hours}
                        onClick={() => logSleep(hours)}
                        className={`py-2 rounded-lg font-semibold transition-colors ${
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

              {/* Voice Assistant */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">🎤 Voice Assistant</h3>
                  <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-green-400 animate-pulse' : 'bg-white'}`} />
                </div>

                <div className="text-center mb-4">
                  <p className="text-purple-100 mb-2">Try saying: log water, add steps, how are my stats</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startListening}
                    disabled={isListening}
                    className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 disabled:opacity-50 transition-all duration-300 flex items-center justify-center space-x-2 mx-auto"
                  >
                    <span>{isListening ? '🛑' : '🎤'}</span>
                    <span>{isListening ? 'Listening...' : 'Start Voice Command'}</span>
                  </motion.button>
                </div>

                <AnimatePresence>
                  {transcript && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-purple-600 bg-opacity-50 rounded-xl p-4 mb-3"
                    >
                      <p className="text-sm">{transcript}</p>
                    </motion.div>
                  )}

                  {response && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white bg-opacity-20 rounded-xl p-4"
                    >
                      <p className="text-sm font-semibold">Assistant: {response}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right Column - Achievements */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 mb-4">🏆 Achievements</h3>
                <div className="space-y-4">
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
                          <div className="text-xs text-gray-500">credits</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-6 text-white"
              >
                <h3 className="font-bold text-lg mb-4">📊 Todays Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Water Intake</span>
                    <span className="font-semibold">{hydration}/8 glasses</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Steps</span>
                    <span className="font-semibold">{steps.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sleep</span>
                    <span className="font-semibold">{sleep}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Achievements</span>
                    <span className="font-semibold">
                      {achievements.filter(a => a.unlocked).length}/{achievements.length}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Mood Tracker */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-yellow-200"
              >
                <h3 className="font-bold text-gray-900 mb-4">😊 How are you feeling?</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['😊 Great', '😐 Okay', '😔 Low', '😴 Tired', '💪 Energetic', '😌 Calm'].map((moodOption) => (
                    <button
                      key={moodOption}
                      onClick={() => setMood(moodOption)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        mood === moodOption
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : 'border-gray-200 hover:border-yellow-300'
                      }`}
                    >
                      {moodOption}
                    </button>
                  ))}
                </div>
                {mood && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-yellow-600 font-semibold mt-3"
                  >
                    Current mood: {mood}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Achievement Celebration Modal */}
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
    </div>
  )
}