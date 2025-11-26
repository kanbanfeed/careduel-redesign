'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  Mic, 
  MicOff, 
  Bell, 
  Crown, 
  LogOut, 
  User, 
  Home, 
  Calendar, 
  FileText, 
  Heart,
  X
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signInWithCrowbar, signOut, loading } = useAuth()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Appointments', href: '/appointments', icon: Calendar },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Health Hub', href: '/health-hub', icon: Heart },
  ]

  const notifications = [
    { id: 1, title: 'Task Completed!', message: 'You earned 10 credits', read: false, time: '5 min ago' },
    { id: 2, title: 'Appointment Reminder', message: 'Checkup tomorrow at 2 PM', read: false, time: '1 hour ago' },
    { id: 3, title: 'New Message', message: 'Dr. Smith sent you a message', read: true, time: '2 hours ago' }
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  const handleCrowbarLogin = () => {
    signInWithCrowbar()
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  const startListening = () => {
    setIsListening(true)
    setTranscript('Listening...')
    
    // Simulate voice recognition
    setTimeout(() => {
      const commands = {
        'go to dashboard': () => { router.push('/dashboard'); return 'Taking you to dashboard...' },
        'book appointment': () => { router.push('/appointments'); return 'Opening appointments...' },
        'show reports': () => { router.push('/reports'); return 'Showing your reports...' },
        'health hub': () => { router.push('/health-hub'); return 'Opening health hub...' },
        'log water': () => 'Great! I logged one glass of water for you. 💧'
      }
      
      const randomCommand = Object.keys(commands)[Math.floor(Math.random() * Object.keys(commands).length)]
      setTranscript(`You said: "${randomCommand}"`)
      const result = commands[randomCommand as keyof typeof commands]()
      setResponse(result)
      setIsListening(false)
      
      setTimeout(() => {
        setTranscript('')
        setResponse('')
      }, 3000)
    }, 2000)
  }

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isNotificationsOpen) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isNotificationsOpen])

  if (loading) {
    return (
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 sticky top-0 z-50">
        <div className="w-full px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                CareDuel
              </h1>
            </div>
            <div className="animate-pulse bg-gray-200 rounded-lg w-32 h-10"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 sticky top-0 z-50">
      <div className="w-full px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                CareDuel
              </h1>
            </motion.div>
          </Link>
          
          {/* Navigation - Only show when user is logged in */}
          {user && (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center space-x-2 font-semibold transition-all duration-300 px-3 py-2 rounded-lg ${
                        pathname === item.href
                          ? 'bg-purple-100 text-purple-600'
                          : 'text-gray-600 hover:text-purple-500 hover:bg-purple-50'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{item.name}</span>
                    </motion.div>
                  </Link>
                )
              })}
            </nav>
          )}

          {/* Interactive Features */}
          <div className="flex items-center space-x-4">
            {/* Voice Assistant - Only show when user is logged in */}
            {user && (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startListening}
                  disabled={isListening}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    isListening 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </motion.button>

                {/* Voice Response */}
                {(transcript || response) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-12 right-0 w-64 bg-gray-900 text-white p-4 rounded-xl shadow-2xl z-50"
                  >
                    {transcript && <p className="text-sm text-gray-300 mb-2">{transcript}</p>}
                    {response && <p className="text-sm font-semibold text-green-400">Assistant: {response}</p>}
                  </motion.div>
                )}
              </div>
            )}

            {/* Notification Bell - Only show when user is logged in */}
            {user && (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-all duration-300"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </motion.button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
                  >
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-bold text-gray-900">Notifications</h3>
                      <div className="flex items-center space-x-2">
                        {unreadCount > 0 && (
                          <button className="text-purple-600 text-sm font-semibold hover:text-purple-700">
                            Mark all read
                          </button>
                        )}
                        <button 
                          onClick={() => setIsNotificationsOpen(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                            !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {notification.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* User Profile or Login Button */}
            {user ? (
              <div className="flex items-center space-x-3">
                {/* User Info */}
                <div className="hidden sm:flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-lg">
                  <User className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user.email?.split('@')[0]}
                  </span>
                </div>

                {/* Logout Button */}
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-semibold hover:bg-red-100 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </motion.button>
              </div>
            ) : (
              /* Crowbar Login Button */
              <motion.button
                onClick={handleCrowbarLogin}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <Crown className="w-5 h-5" />
                <span>Login with Crowbar</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Navigation - Only show when user is logged in */}
        {user && (
          <div className="flex md:hidden justify-center space-x-4 mt-4 pb-2">
            {navItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`flex flex-col items-center space-y-1 p-2 rounded-lg ${
                      pathname === item.href
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-600'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-xs font-medium">{item.name}</span>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </header>
  )
}