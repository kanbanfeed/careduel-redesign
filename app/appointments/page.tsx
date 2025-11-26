'use client'

import { motion } from 'framer-motion'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useState } from 'react'

interface Appointment {
  id: number
  title: string
  doctor: string
  date: string
  time: string
  type: 'consultation' | 'checkup' | 'followup'
  status: 'scheduled' | 'completed' | 'cancelled'
}

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [appointmentType, setAppointmentType] = useState('consultation')
  const [showSupportForm, setShowSupportForm] = useState(false)
  const [supportType, setSupportType] = useState<'call' | 'chat' | ''>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    urgency: 'normal'
  })

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      title: 'General Checkup',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'checkup',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Follow-up Consultation',
      doctor: 'Dr. Michael Chen',
      date: '2024-01-20',
      time: '02:00 PM',
      type: 'followup',
      status: 'scheduled'
    }
  ])

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
  
  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      const newAppointment: Appointment = {
        id: appointments.length + 1,
        title: `${appointmentType.charAt(0).toUpperCase() + appointmentType.slice(1)} Appointment`,
        doctor: getDoctorForAppointment(appointmentType),
        date: selectedDate,
        time: selectedTime,
        type: appointmentType as any,
        status: 'scheduled'
      }
      
      setAppointments([...appointments, newAppointment])
      alert(`✅ Appointment booked for ${new Date(selectedDate).toLocaleDateString()} at ${selectedTime} with ${newAppointment.doctor}`)
      setSelectedDate('')
      setSelectedTime('')
    } else {
      alert('Please select both date and time')
    }
  }

  const getDoctorForAppointment = (type: string) => {
    const doctors = {
      consultation: 'Dr. Sarah Johnson',
      checkup: 'Dr. Michael Chen',
      followup: 'Dr. Emily Davis',
      emergency: 'Dr. James Wilson'
    }
    return doctors[type as keyof typeof doctors] || 'Dr. Available Provider'
  }

  const handleCancelAppointment = (appointmentId: number) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.map(apt => 
        apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
      ))
      alert('❌ Appointment cancelled successfully')
    }
  }

  const handleRescheduleAppointment = (appointmentId: number) => {
    const appointment = appointments.find(apt => apt.id === appointmentId)
    if (appointment) {
      setSelectedDate(appointment.date)
      setSelectedTime(appointment.time)
      setAppointmentType(appointment.type)
      alert('📅 Appointment details loaded for rescheduling. Please select new date/time above.')
    }
  }

  const handleSupportRequest = (type: 'call' | 'chat') => {
    setSupportType(type)
    setShowSupportForm(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/xovkrdyl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          supportType: supportType,
          subject: `${supportType.toUpperCase()} Support Request - ${formData.urgency} priority`
        }),
      })

      if (response.ok) {
        alert(`✅ Thank you! Your ${supportType} support request has been submitted. We'll contact you within 24 hours.`)
        setShowSupportForm(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          urgency: 'normal'
        })
        setSupportType('')
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      alert('❌ Sorry, there was an error submitting your request. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLiveChat = () => {
    // Simulate live chat opening
    const chatWindow = window.open('', '_blank', 'width=400,height=600')
    if (chatWindow) {
      chatWindow.document.write(`
        <html>
          <head><title>CareDuel Live Chat</title></head>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>CareDuel Live Chat</h2>
            <p><strong>Support Agent:</strong> Hello! How can I help you today?</p>
            <div id="chatMessages" style="height: 400px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; margin-bottom: 20px;"></div>
            <input type="text" id="messageInput" placeholder="Type your message..." style="width: 100%; padding: 10px; margin-bottom: 10px;">
            <button onclick="sendMessage()" style="background: #3B82F6; color: white; border: none; padding: 10px 20px; border-radius: 5px;">Send</button>
            <script>
              function sendMessage() {
                const input = document.getElementById('messageInput');
                const messages = document.getElementById('chatMessages');
                if (input.value.trim()) {
                  messages.innerHTML += '<p><strong>You:</strong> ' + input.value + '</p>';
                  input.value = '';
                  // Simulate auto-response
                  setTimeout(() => {
                    messages.innerHTML += '<p><strong>Support Agent:</strong> Thank you for your message. Our team will assist you shortly.</p>';
                    messages.scrollTop = messages.scrollHeight;
                  }, 1000);
                }
              }
            </script>
          </body>
        </html>
      `)
    }
  }

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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Appointment</h1>
            <p className="text-lg text-gray-600">Schedule your healthcare appointments easily</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200/60"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule New Appointment</h2>
              
              <div className="space-y-6">
                {/* Appointment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type
                  </label>
                  <select
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="consultation">General Consultation</option>
                    <option value="checkup">Health Checkup</option>
                    <option value="followup">Follow-up Visit</option>
                    <option value="emergency">Emergency Care</option>
                  </select>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <motion.button
                        key={time}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-xl border-2 text-center transition-all duration-300 ${
                          selectedTime === time
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <motion.button
                  onClick={handleBookAppointment}
                  disabled={!selectedDate || !selectedTime}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Appointment
                </motion.button>
              </div>
            </motion.div>

            {/* Upcoming Appointments */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Appointments</h2>
              
              {appointments.filter(apt => apt.status !== 'cancelled').map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200/60 hover:border-blue-300 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{appointment.title}</h3>
                      <p className="text-gray-600">{appointment.doctor}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      appointment.status === 'scheduled' 
                        ? 'bg-blue-100 text-blue-700'
                        : appointment.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>📅 {new Date(appointment.date).toLocaleDateString()}</span>
                      <span>⏰ {appointment.time}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleRescheduleAppointment(appointment.id)}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                      >
                        Reschedule
                      </button>
                      <button 
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="text-red-600 hover:text-red-700 font-semibold text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-6 text-white"
              >
                <h3 className="font-bold text-lg mb-3">Need Help?</h3>
                <p className="text-blue-100 mb-4">Our support team is here to assist you</p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleSupportRequest('call')}
                    className="flex-1 bg-white text-blue-600 py-2 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Call Support
                  </button>
                  <button 
                    onClick={handleLiveChat}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors border border-white"
                  >
                    Live Chat
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Support Request Modal */}
      {showSupportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-md w-full"
          >
            <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {supportType === 'call' ? 'Request a Call Back' : 'Live Chat Support'}
                </h2>
                <button
                  onClick={() => setShowSupportForm(false)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urgency Level
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low - General Inquiry</option>
                    <option value="normal">Normal - Need Assistance</option>
                    <option value="high">High - Urgent Matter</option>
                    <option value="emergency">Emergency - Critical Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe how we can help you..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowSupportForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}