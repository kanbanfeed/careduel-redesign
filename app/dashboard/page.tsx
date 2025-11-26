'use client'

import { motion } from 'framer-motion'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function Dashboard() {
  const [completedTasks, setCompletedTasks] = useState<number[]>([])
  const [userCredits, setUserCredits] = useState(1240) // Starting credits

  const dailyTasks = [
    { id: 1, icon: '💧', title: 'Drink 8 glasses of water', points: 10 },
    { id: 2, icon: '🚶', title: 'Walk 5,000 steps', points: 15 },
    { id: 3, icon: '😴', title: 'Sleep 7+ hours', points: 12 },
    { id: 4, icon: '🍎', title: 'Eat 2 fruits today', points: 8 },
    { id: 5, icon: '🧘', title: '5 minutes of stretching', points: 5 }
  ]

  const upcomingAppointments = [
    { id: 1, title: 'Dental Checkup', date: 'Today', time: '2:00 PM', doctor: 'Dr. Smith' },
    { id: 2, title: 'Blood Test', date: 'Tomorrow', time: '10:00 AM', doctor: 'Dr. Johnson' }
  ]

  // Load credits from localStorage on component mount
  useEffect(() => {
    const savedCredits = localStorage.getItem('userCredits')
    if (savedCredits) {
      setUserCredits(parseInt(savedCredits))
    }
  }, [])

  // Save credits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userCredits', userCredits.toString())
  }, [userCredits])

  const toggleTask = (taskId: number) => {
    if (completedTasks.includes(taskId)) {
      // Remove from completed tasks and deduct points
      setCompletedTasks(completedTasks.filter(id => id !== taskId))
      const task = dailyTasks.find(t => t.id === taskId)
      if (task) {
        setUserCredits(prev => prev - task.points)
      }
    } else {
      // Add to completed tasks and add points
      setCompletedTasks([...completedTasks, taskId])
      const task = dailyTasks.find(t => t.id === taskId)
      if (task) {
        setUserCredits(prev => prev + task.points)
      }
    }
  }

  const completedPoints = dailyTasks
    .filter(task => completedTasks.includes(task.id))
    .reduce((sum, task) => sum + task.points, 0)

  const totalPoints = dailyTasks.reduce((sum, task) => sum + task.points, 0)

  return (
     <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <Header />
      
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-2xl mb-8 border border-gray-200/60"
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
                <p className="text-gray-600">Complete your daily tasks and manage your health appointments</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  {userCredits}
                </div>
                <div className="text-sm text-gray-600">Crowbar Credits</div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Tasks */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200/60"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Daily Progress</h3>
                    <p className="text-gray-600">{completedTasks.length} of {dailyTasks.length} tasks completed</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                      {completedPoints}/{totalPoints}
                    </div>
                    <div className="text-sm text-gray-600">Points Earned Today</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedTasks.length / dailyTasks.length) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0%</span>
                  <span>{Math.round((completedTasks.length / dailyTasks.length) * 100)}% Complete</span>
                  <span>100%</span>
                </div>
              </motion.div>

              {/* Tasks List */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Todays Health Tasks</h2>
                {dailyTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 ${
                      completedTasks.includes(task.id)
                        ? 'border-green-500 bg-green-50/50'
                        : 'border-gray-200/60 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`text-2xl ${completedTasks.includes(task.id) ? 'scale-110' : ''} transition-transform duration-300`}>
                          {task.icon}
                        </div>
                        <div>
                          <h4 className={`font-semibold text-lg ${
                            completedTasks.includes(task.id) ? 'text-green-700' : 'text-gray-900'
                          }`}>
                            {task.title}
                          </h4>
                          <p className="text-gray-600">+{task.points} Crowbar points</p>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleTask(task.id)}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                          completedTasks.includes(task.id)
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                      >
                        {completedTasks.includes(task.id) ? (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </motion.svg>
                        ) : (
                          <motion.svg
                            className="w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </motion.svg>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Appointments & Stats */}
            <div className="space-y-8">
              {/* Upcoming Appointments */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-200/60"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Upcoming Appointments</h3>
                  <Link href="/appointments">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                      View All
                    </button>
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-blue-50 rounded-xl border border-blue-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{appointment.title}</h4>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                          {appointment.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{appointment.doctor}</p>
                      <p className="text-sm text-gray-500">⏰ {appointment.time}</p>
                    </motion.div>
                  ))}
                </div>

                <Link href="/appointments">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Book New Appointment
                  </motion.button>
                </Link>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl p-6 text-white shadow-2xl"
              >
                <h3 className="text-xl font-bold mb-4">Your Health Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">7</div>
                    <div className="text-blue-100 text-sm">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{completedTasks.length}</div>
                    <div className="text-blue-100 text-sm">Tasks Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-blue-100 text-sm">Appointments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-blue-100 text-sm">Badges Earned</div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Reports Access */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-200/60"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Health Reports</h3>
                <p className="text-gray-600 text-sm mb-4">Access your medical reports and test results</p>
                <Link href="/reports">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
                  >
                    View All Reports
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </ProtectedRoute>
  )
}