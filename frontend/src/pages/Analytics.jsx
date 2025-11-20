import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DocumentArrowDownIcon, CalendarIcon, FunnelIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function Analytics() {
  const [dateRange, setDateRange] = useState('month')
  const [selectedMetrics, setSelectedMetrics] = useState(['dropout', 'attendance', 'grades'])
  const [isExporting, setIsExporting] = useState(false)

  const metrics = [
    { id: 'dropout', label: 'Dropout Predictions', icon: '📊' },
    { id: 'attendance', label: 'Attendance Trends', icon: '📅' },
    { id: 'grades', label: 'Grade Distribution', icon: '📈' },
    { id: 'interventions', label: 'Intervention History', icon: '🎯' },
    { id: 'counseling', label: 'Counseling Sessions', icon: '💬' },
    { id: 'demographics', label: 'Student Demographics', icon: '👥' }
  ]

  const reports = [
    {
      id: 1,
      name: 'Weekly Risk Report',
      description: 'Comprehensive weekly analysis of at-risk students',
      frequency: 'Weekly',
      format: ['PDF', 'Excel', 'CSV'],
      lastGenerated: '2024-11-19',
      icon: '📋'
    },
    {
      id: 2,
      name: 'Monthly Performance Dashboard',
      description: 'Aggregated monthly performance metrics and trends',
      frequency: 'Monthly',
      format: ['PDF', 'Excel'],
      lastGenerated: '2024-11-01',
      icon: '📊'
    },
    {
      id: 3,
      name: 'Intervention Effectiveness Report',
      description: 'Analysis of counseling and support effectiveness',
      frequency: 'Quarterly',
      format: ['PDF', 'Excel', 'PowerPoint'],
      lastGenerated: '2024-10-01',
      icon: '✅'
    },
    {
      id: 4,
      name: 'Departmental Analysis',
      description: 'Deep dive into performance by department/college',
      frequency: 'Monthly',
      format: ['PDF', 'Excel', 'CSV'],
      lastGenerated: '2024-11-15',
      icon: '🏢'
    }
  ]

  const handleExport = (format) => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      toast.success(`Report exported as ${format.toUpperCase()}`)
    }, 2000)
  }

  const toggleMetric = (id) => {
    setSelectedMetrics(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white"
      >
        <h1 className="text-4xl font-bold mb-2">Analytics & Reports</h1>
        <p className="text-blue-100">Generate custom reports and export data for deeper insights</p>
      </motion.div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Quick Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-slate-700 shadow-md mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <DocumentArrowDownIcon className="w-8 h-8 text-blue-600" />
            Quick Export
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Format Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Export Format</label>
              <div className="flex gap-2">
                {['PDF', 'Excel', 'CSV'].map(fmt => (
                  <motion.button
                    key={fmt}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleExport(fmt)}
                    disabled={isExporting}
                    className="flex-1 px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50"
                  >
                    {fmt}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Export Button */}
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isExporting}
                className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:shadow-lg transition-shadow disabled:opacity-70"
              >
                {isExporting ? 'Generating...' : 'Generate Report'}
              </motion.button>
            </div>
          </div>

          {/* Metrics Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Include Metrics</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {metrics.map(metric => (
                <motion.button
                  key={metric.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => toggleMetric(metric.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedMetrics.includes(metric.id)
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{metric.icon}</div>
                  <div className="text-xs font-semibold text-gray-900 dark:text-white">{metric.label}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pre-built Reports */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pre-built Reports</h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{report.icon}</div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full">
                  {report.frequency}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{report.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{report.description}</p>

              <div className="mb-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Last Generated: {report.lastGenerated}</p>
                <div className="flex gap-2 flex-wrap">
                  {report.format.map(fmt => (
                    <span key={fmt} className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs rounded font-semibold">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-sm hover:shadow-md transition-shadow flex items-center justify-center gap-2"
              >
                <DocumentArrowDownIcon className="w-4 h-4" />
                Download Latest
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Scheduled Reports */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Scheduled Reports</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-slate-700 shadow-md">
            <div className="space-y-4">
              {[
                { name: 'Weekly Risk Report', schedule: 'Every Monday 8 AM', recipients: 'admin@university.edu, dean@university.edu' },
                { name: 'Monthly Dashboard', schedule: 'First day of month', recipients: 'department-heads@university.edu' },
                { name: 'Intervention Reports', schedule: 'Weekly', recipients: 'counseling-team@university.edu' }
              ].map((scheduled, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white">{scheduled.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <span className="font-semibold">Schedule:</span> {scheduled.schedule}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Recipients:</span> {scheduled.recipients}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-semibold text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    Edit
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              + Create New Scheduled Report
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
