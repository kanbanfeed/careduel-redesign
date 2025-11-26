'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')

  const commands = {
    'log water': () => handleCommand('Great! I logged one glass of water for you. 💧'),
    'how are my tasks': () => handleCommand('You have 3 tasks completed today. Keep going! 🎯'),
    'book appointment': () => handleCommand('Opening appointment booking... 📅'),
    'show reports': () => handleCommand('Taking you to your health reports... 📊'),
    'I need help': () => handleCommand('Opening support options for you... 🆘')
  }

  const handleCommand = (message: string) => {
    setResponse(message)
    setTimeout(() => setResponse(''), 5000)
  }

  const startListening = () => {
    setIsListening(true)
    setTranscript('Listening...')
    
    // Simulate voice recognition
    setTimeout(() => {
      const randomCommand = Object.keys(commands)[Math.floor(Math.random() * Object.keys(commands).length)]
      setTranscript(`You said: "${randomCommand}"`)
      commands[randomCommand as keyof typeof commands]()
      setIsListening(false)
    }, 2000)
  }

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">🎤 Voice Assistant</h3>
        <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-green-400 animate-pulse' : 'bg-white'}`} />
      </div>

      <div className="text-center mb-4">
        <p className="text-purple-100 mb-2">Try saying: log water, book appointment, show reports</p>
        
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
    </div>
  )
}