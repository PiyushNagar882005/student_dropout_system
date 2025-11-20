import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bar, Doughnut, Radar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadarController, RadialLinearScale, Filler } from 'chart.js'
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/solid'

// Register the core and chart types used on this page
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadarController,
  RadialLinearScale,
  Filler
)

export default function AtRisk() {
  const [selectedStudent, setSelectedStudent] = useState(null)

  const atRiskStudents = [
    { id: 1, name: 'John Doe', semester: '4th', attendance: 45, grades: 38, risk: 'High', riskScore: 8.5 },
    { id: 2, name: 'Sarah Smith', semester: '3rd', attendance: 60, grades: 50, risk: 'Medium', riskScore: 6.2 },
    { id: 3, name: 'Mike Johnson', semester: '5th', attendance: 35, grades: 42, risk: 'Critical', riskScore: 9.1 },
    { id: 4, name: 'Emma Wilson', semester: '2nd', attendance: 55, grades: 48, risk: 'High', riskScore: 7.8 },
    { id: 5, name: 'Alex Brown', semester: '4th', attendance: 40, grades: 40, risk: 'Critical', riskScore: 8.9 }
  ]

  const riskDistributionData = {
    labels: ['Safe', 'At Risk', 'High Risk', 'Critical'],
    datasets: [{
      label: 'Students by Risk Level',
      data: [1098, 89, 45, 13],
      backgroundColor: [
        'rgba(34, 197, 94, 0.6)',
        'rgba(245, 158, 11, 0.6)',
        'rgba(239, 68, 68, 0.6)',
        'rgba(127, 29, 29, 0.6)'
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)',
        'rgb(127, 29, 29)'
      ],
      borderWidth: 2
    }]
  }

  const riskFactorsData = {
    labels: ['Attendance', 'Grades', 'Engagement', 'Family Support', 'Financial Strain', 'Health Issues'],
    datasets: [{
      label: 'Impact on Dropout Risk',
      data: [95, 88, 72, 65, 58, 45],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      borderWidth: 2,
      fill: true
    }]
  }

  const departmentRiskData = {
    labels: ['Engineering', 'Commerce', 'Science', 'Arts', 'Medicine'],
    datasets: [{
      label: 'High Risk Students',
      data: [34, 12, 8, 15, 3],
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(99, 102, 241, 0.8)'
      ],
      borderRadius: 8
    }]
  }

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Critical': return 'from-red-600 to-red-500'
      case 'High': return 'from-orange-600 to-orange-500'
      case 'Medium': return 'from-yellow-600 to-yellow-500'
      default: return 'from-green-600 to-green-500'
    }
  }

  const getRiskBgColor = (risk) => {
    switch(risk) {
      case 'Critical': return 'bg-red-500/10 border-red-500/30'
      case 'High': return 'bg-orange-500/10 border-orange-500/30'
      case 'Medium': return 'bg-yellow-500/10 border-yellow-500/30'
      default: return 'bg-green-500/10 border-green-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-600 to-red-600 p-8 text-white"
      >
        <div className="flex items-center gap-3 mb-2">
          <ExclamationTriangleIcon className="w-8 h-8" />
          <h1 className="text-4xl font-bold">Students at Risk</h1>
        </div>
        <p className="text-orange-100">Early identification and intervention strategies</p>
      </motion.div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            { label: 'High Risk Students', value: '58', icon: '⚠️' },
            { label: 'Critical Cases', value: '13', icon: '🚨' },
            { label: 'Interventions Needed', value: '71', icon: '🔔' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-red-600 to-orange-600 p-6 rounded-2xl text-white shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-100 font-semibold">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <span className="text-4xl">{stat.icon}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Doughnut Chart */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Risk Distribution</h2>
            <Doughnut data={riskDistributionData} options={{ maintainAspectRatio: true, plugins: { legend: { labels: { color: '#f3f4f6' } } } }} />
          </div>

          {/* Radar Chart */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Risk Factors</h2>
            <Radar data={riskFactorsData} options={{ maintainAspectRatio: true, plugins: { legend: { labels: { color: '#f3f4f6' } } }, scales: { r: { ticks: { color: '#f3f4f6' }, grid: { color: '#374151' } } } }} />
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-6">High Risk Students by Department</h2>
          <Bar data={departmentRiskData} options={{ maintainAspectRatio: true, indexAxis: 'y', plugins: { legend: { labels: { color: '#f3f4f6' } } }, scales: { x: { ticks: { color: '#f3f4f6' }, grid: { color: '#374151' } }, y: { ticks: { color: '#f3f4f6' }, grid: { color: '#374151' } } } }} />
        </motion.div>

        {/* At-Risk Students List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ExclamationTriangleIcon className="w-6 h-6 text-orange-500" />
              At-Risk Students Requiring Attention
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-gray-100">
              <thead className="bg-gray-700/50 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Semester</th>
                  <th className="px-6 py-4 text-left font-semibold">Attendance</th>
                  <th className="px-6 py-4 text-left font-semibold">Grades</th>
                  <th className="px-6 py-4 text-left font-semibold">Risk Level</th>
                  <th className="px-6 py-4 text-left font-semibold">Risk Score</th>
                  <th className="px-6 py-4 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {atRiskStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{student.name}</td>
                    <td className="px-6 py-4">{student.semester}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${student.attendance < 50 ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                        {student.attendance}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${student.grades < 50 ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                        {student.grades}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getRiskColor(student.risk)} text-white`}>
                        {student.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(student.riskScore / 10) * 100}%` }}></div>
                        </div>
                        <span className="font-semibold text-red-400">{student.riskScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedStudent(student)}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-semibold hover:shadow-lg transition-shadow"
                      >
                        View Details
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Student Detail Modal */}
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 rounded-2xl p-8 max-w-md border border-gray-700"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{selectedStudent.name}</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Semester:</span>
                  <span className="text-white font-semibold">{selectedStudent.semester}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Attendance:</span>
                  <span className="text-white font-semibold">{selectedStudent.attendance}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Grades:</span>
                  <span className="text-white font-semibold">{selectedStudent.grades}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Risk Score:</span>
                  <span className={`text-white font-semibold bg-gradient-to-r ${getRiskColor(selectedStudent.risk)} px-3 py-1 rounded-full`}>
                    {selectedStudent.riskScore}/10
                  </span>
                </div>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg mb-6">
                <h4 className="text-white font-semibold mb-3">Recommended Actions:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>✓ Schedule counseling session</li>
                  <li>✓ Review academic progress</li>
                  <li>✓ Connect with support services</li>
                  <li>✓ Monitor attendance</li>
                </ul>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedStudent(null)}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 rounded-lg"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
