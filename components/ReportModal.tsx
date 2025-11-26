'use client'

import { motion } from 'framer-motion'

interface ReportModalProps {
  report: any
  isOpen: boolean
  onClose: () => void
  onDownload: (report: any) => void
}

export default function ReportModal({ report, isOpen, onClose, onDownload }: ReportModalProps) {
  if (!isOpen) return null

  const getReportDetails = (report: any) => {
    switch (report.type) {
      case 'blood_test':
        return {
          parameters: [
            { name: 'Hemoglobin', value: '14.2 g/dL', normalRange: '13.5-17.5 g/dL', status: 'normal' },
            { name: 'White Blood Cells', value: '6.8 ×10³/μL', normalRange: '4.5-11.0 ×10³/μL', status: 'normal' },
            { name: 'Platelets', value: '250 ×10³/μL', normalRange: '150-450 ×10³/μL', status: 'normal' },
            { name: 'Blood Sugar', value: '95 mg/dL', normalRange: '70-100 mg/dL', status: 'normal' }
          ],
          summary: 'All blood parameters are within normal range. Excellent health indicators.'
        }
      case 'checkup':
        return {
          parameters: [
            { name: 'Blood Pressure', value: '120/80 mmHg', normalRange: 'Less than 120/80', status: 'normal' },
            { name: 'Heart Rate', value: '72 bpm', normalRange: '60-100 bpm', status: 'normal' },
            { name: 'BMI', value: '23.4', normalRange: '18.5-24.9', status: 'normal' },
            { name: 'Cholesterol', value: '180 mg/dL', normalRange: 'Less than 200 mg/dL', status: 'normal' }
          ],
          summary: 'Comprehensive health checkup shows excellent results. Maintain current lifestyle.'
        }
      case 'scan':
        return {
          parameters: [
            { name: 'Heart Function', value: 'Normal', normalRange: 'Normal', status: 'normal' },
            { name: 'Cardiac Output', value: '5.2 L/min', normalRange: '4.0-8.0 L/min', status: 'normal' },
            { name: 'Ejection Fraction', value: '60%', normalRange: '55-70%', status: 'normal' }
          ],
          summary: 'Cardiac scan shows normal heart function and structure. No abnormalities detected.'
        }
      default:
        return {
          parameters: [],
          summary: 'Consultation completed successfully.'
        }
    }
  }

  const details = getReportDetails(report)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-t-3xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{report.title}</h2>
              <p className="text-blue-100">Prepared by {report.doctor}</p>
              <p className="text-blue-100 text-sm">Date: {new Date(report.date).toLocaleDateString()}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="p-6">
          {/* Patient Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Patient Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-semibold">John Doe</span>
              </div>
              <div>
                <span className="text-gray-600">Age:</span>
                <span className="ml-2 font-semibold">35 years</span>
              </div>
              <div>
                <span className="text-gray-600">Gender:</span>
                <span className="ml-2 font-semibold">Male</span>
              </div>
              <div>
                <span className="text-gray-600">Patient ID:</span>
                <span className="ml-2 font-semibold">PT-2024-001</span>
              </div>
            </div>
          </div>

          {/* Test Results */}
          {details.parameters.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Test Results</h3>
              <div className="space-y-3">
                {details.parameters.map((param, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{param.name}</div>
                      <div className="text-sm text-gray-600">Normal range: {param.normalRange}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      param.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {param.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Doctors Summary</h3>
            <p className="text-blue-800">{details.summary}</p>
          </div>

          {/* Recommendations */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-semibold text-green-900 mb-2">Recommendations</h3>
            <ul className="text-green-800 list-disc list-inside space-y-1">
              <li>Continue with current exercise routine</li>
              <li>Maintain balanced diet with plenty of fruits and vegetables</li>
              <li>Schedule next checkup in 6 months</li>
              <li>Stay hydrated and get adequate sleep</li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onDownload(report)}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Download PDF
          </button>
        </div>
      </motion.div>
    </div>
  )
}