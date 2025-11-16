import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement)

export default function Dashboard() {
  const [filter, setFilter] = useState('all')

  const stats = [
    { title: 'Total Students', value: '1,245', change: '+12%', icon: '👥', color: 'from-blue-500 to-cyan-500' },
    { title: 'At Risk', value: '147', change: '-8%', icon: '⚠️', color: 'from-red-500 to-pink-500' },
    { title: 'Predicted Dropouts', value: '89', change: '+5%', icon: '📉', color: 'from-orange-500 to-yellow-500' },
    { title: 'Success Rate', value: '92.8%', change: '+3%', icon: '✅', color: 'from-green-500 to-emerald-500' }
  ]

  const studentDistributionData = {
    labels: ['Safe', 'At Risk', 'Critical'],
    datasets: [{
      label: 'Student Distribution',
      data: [1098, 147, 89],
      backgroundColor: [
        'rgba(34, 197, 94, 0.6)',
        'rgba(245, 158, 11, 0.6)',
        'rgba(239, 68, 68, 0.6)'
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)'
      ],
      borderWidth: 2
    }]
  }

  const trendsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'At Risk Students',
        data: [120, 132, 128, 145, 150, 147],
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      },
      {
        label: 'Interventions Done',
        data: [50, 65, 70, 85, 92, 110],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4
      }
    ]
  }

  const departmentData = {
    labels: ['Engineering', 'Commerce', 'Science', 'Arts', 'Medicine'],
    datasets: [{
      label: 'Dropout Rate %',
      data: [15, 12, 8, 10, 5],
      backgroundColor: [
        'rgba(99, 102, 241, 0.6)',
        'rgba(168, 85, 247, 0.6)',
        'rgba(236, 72, 153, 0.6)',
        'rgba(59, 130, 246, 0.6)',
        'rgba(34, 197, 94, 0.6)'
      ],
      borderRadius: 8
    }]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white"
      >
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-200">Real-time student dropout prediction analytics</p>
      </motion.div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-lg backdrop-blur`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-100 font-semibold">{stat.title}</h3>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className="text-green-200">{stat.change} from last month</p>
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
          {/* Pie Chart */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Student Distribution</h2>
            <Pie data={studentDistributionData} options={{ maintainAspectRatio: true, plugins: { legend: { labels: { color: '#f3f4f6' } } } }} />
          </div>

          {/* Line Chart */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Trends</h2>
            <Line data={trendsData} options={{ maintainAspectRatio: true, plugins: { legend: { labels: { color: '#f3f4f6' } } }, scales: { y: { ticks: { color: '#f3f4f6' }, grid: { color: '#374151' } }, x: { ticks: { color: '#f3f4f6' }, grid: { color: '#374151' } } } }} />
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700"
        >
          <h2 className="text-xl font-bold text-white mb-6">Dropout Rate by Department</h2>
          <Bar data={departmentData} options={{ maintainAspectRatio: true, indexAxis: 'y', plugins: { legend: { labels: { color: '#f3f4f6' } } }, scales: { x: { ticks: { color: '#f3f4f6' }, grid: { color: '#374151' } }, y: { ticks: { color: '#f3f4f6' }, grid: { color: '#374151' } } } }} />
        </motion.div>
      </div>
    </div>
  )
}
