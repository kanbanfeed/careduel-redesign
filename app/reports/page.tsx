'use client'

import { motion } from 'framer-motion'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ReportModal from '../../components/ReportModal'

interface HealthReport {
  id: number
  title: string
  date: string
  type: 'blood_test' | 'checkup' | 'scan' | 'consultation'
  status: 'normal' | 'abnormal' | 'pending'
  doctor: string
}

export default function Reports() {
  const router = useRouter()
  const [selectedReport, setSelectedReport] = useState<HealthReport | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userCredits, setUserCredits] = useState(1240) // Starting credits

  const healthReports: HealthReport[] = [
    {
      id: 1,
      title: 'Blood Test Results',
      date: '2024-01-10',
      type: 'blood_test',
      status: 'normal',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      title: 'Annual Health Checkup',
      date: '2024-01-08',
      type: 'checkup',
      status: 'normal',
      doctor: 'Dr. Michael Chen'
    },
    {
      id: 3,
      title: 'Cardiac Scan',
      date: '2024-01-05',
      type: 'scan',
      status: 'pending',
      doctor: 'Dr. Emily Davis'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100'
      case 'abnormal': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blood_test': return '🩸'
      case 'checkup': return '🏥'
      case 'scan': return '📊'
      case 'consultation': return '👨‍⚕️'
      default: return '📄'
    }
  }

  const handleViewReport = (report: HealthReport) => {
    setSelectedReport(report)
    setIsModalOpen(true)
    
    // Earn 5 credits for viewing report
    setUserCredits(prev => prev + 5)
  }

  const handleDownloadReport = (report: HealthReport) => {
    // Create a blob with report content
    const reportContent = `
      CAREDUEL HEALTH REPORT
      =====================
      
      Report: ${report.title}
      Date: ${new Date(report.date).toLocaleDateString()}
      Doctor: ${report.doctor}
      Patient: John Doe
      Patient ID: PT-2024-001
      
      SUMMARY:
      ${getReportSummary(report)}
      
      This is a simulated health report from CareDuel.
      Generated on ${new Date().toLocaleDateString()}
    `
    
    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `CareDuel-Report-${report.title.replace(/\s+/g, '-')}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    // Earn 10 credits for downloading report
    setUserCredits(prev => prev + 10)
    alert(`Report "${report.title}" downloaded successfully! +10 credits earned.`)
  }

  const getReportSummary = (report: HealthReport) => {
    switch (report.type) {
      case 'blood_test':
        return 'Blood test results show all parameters within normal range. Excellent health indicators maintained.'
      case 'checkup':
        return 'Comprehensive health checkup completed. All vital signs and health metrics are within optimal ranges.'
      case 'scan':
        return 'Cardiac scan shows normal heart function and structure. No abnormalities detected in the scan results.'
      default:
        return 'Consultation completed successfully with positive health outcomes.'
    }
  }

  const handleGenerateReport = () => {
    // Generate a new comprehensive health report
    const newReport: HealthReport = {
      id: healthReports.length + 1,
      title: 'Comprehensive Health Summary',
      date: new Date().toISOString().split('T')[0],
      type: 'checkup',
      status: 'normal',
      doctor: 'Dr. CareDuel System'
    }
    
    // Add the new report to the list (in a real app, this would be saved to backend)
    healthReports.unshift(newReport)
    
    // Earn 25 credits for generating report
    setUserCredits(prev => prev + 25)
    
    alert('New comprehensive health report generated successfully! +25 credits earned.')
    
    // Show the new report
    setSelectedReport(newReport)
    setIsModalOpen(true)
  }

  const handleBookAppointment = () => {
    router.push('/appointments')
  }

  const handleShareReports = () => {
    // Simulate sharing functionality
    if (navigator.share) {
      navigator.share({
        title: 'My Health Reports - CareDuel',
        text: 'Check out my health reports from CareDuel',
        url: window.location.href,
      })
      .then(() => {
        // Earn 15 credits for sharing
        setUserCredits(prev => prev + 15)
        alert('Reports shared successfully! +15 credits earned.')
      })
      .catch((error) => {
        console.log('Error sharing:', error)
        // Fallback: copy to clipboard
        handleCopyToClipboard()
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyToClipboard()
    }
  }

  const handleCopyToClipboard = () => {
    const reportLinks = healthReports.map(report => 
      `${report.title} - ${new Date(report.date).toLocaleDateString()}`
    ).join('\n')
    
    navigator.clipboard.writeText(`My CareDuel Health Reports:\n${reportLinks}`)
      .then(() => {
        // Earn 15 credits for sharing
        setUserCredits(prev => prev + 15)
        alert('Report links copied to clipboard! +15 credits earned.')
      })
      .catch(() => {
        alert('Failed to copy to clipboard. Please try again.')
      })
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedReport(null)
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Reports</h1>
            <p className="text-lg text-gray-600">View and manage your medical reports and test results</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Reports List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {healthReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200/60 hover:border-blue-300 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">
                        {getTypeIcon(report.type)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{report.title}</h3>
                        <p className="text-gray-600 text-sm">By {report.doctor}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">
                      📅 {new Date(report.date).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleViewReport(report)}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                      >
                        View Report
                      </button>
                      <button 
                        onClick={() => handleDownloadReport(report)}
                        className="text-green-600 hover:text-green-700 font-semibold text-sm"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Health Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Health Stats */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/60">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Health Summary</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Overall Health Score</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Appointment Attendance</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Task Completion</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={handleGenerateReport}
                    className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    📄 Generate Health Report
                  </button>
                  <button 
                    onClick={handleBookAppointment}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors border border-white"
                  >
                    🏥 Book New Appointment
                  </button>
                  <button 
                    onClick={handleShareReports}
                    className="w-full bg-transparent text-white py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors border border-white"
                  >
                    📱 Share Reports
                  </button>
                </div>
              </div>

              {/* Crowbar Integration */}
              <div className="bg-gray-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">Crowbar Connected</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Your health data is securely synced with your Crowbar account
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Credits Earned</span>
                  <span className="text-green-400 font-semibold">{userCredits}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Report Modal */}
      {selectedReport && (
        <ReportModal
          report={selectedReport}
          isOpen={isModalOpen}
          onClose={closeModal}
          onDownload={handleDownloadReport}
        />
      )}
    </div>
  )
}