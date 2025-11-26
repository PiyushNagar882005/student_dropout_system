import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserIcon, DocumentTextIcon, ChartBarIcon, ExclamationTriangleIcon, CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', department: 'Engineering', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', department: 'Medicine', joinDate: '2024-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'inactive', department: 'Science', joinDate: '2024-03-10' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', status: 'active', department: 'Arts', joinDate: '2024-01-22' },
  ])

  const [systemStats] = useState({
    totalUsers: 2543,
    activeUsers: 2108,
    atRiskStudents: 342,
    predictedDropouts: 89,
    systemUptime: '99.98%',
    apiCalls: '1.2M/day'
  })

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id))
    toast.success('User removed successfully')
  }

  const handleDeactivateUser = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: 'inactive' } : u))
    toast.success('User deactivated')
  }

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg">
          <ChartBarIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">System management and user control</p>
        </div>
      </motion.div>

      {/* System Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        {[
          { label: 'Total Users', value: systemStats.totalUsers, icon: UserIcon, color: 'from-blue-600 to-blue-700' },
          { label: 'Active Users', value: systemStats.activeUsers, icon: CheckCircleIcon, color: 'from-green-600 to-green-700' },
          { label: 'At-Risk Students', value: systemStats.atRiskStudents, icon: ExclamationTriangleIcon, color: 'from-orange-600 to-orange-700' },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* System Health */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 shadow-md"
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">System Health</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { metric: 'Uptime', value: systemStats.systemUptime, status: 'excellent' },
            { metric: 'API Calls (24h)', value: systemStats.apiCalls, status: 'excellent' },
            { metric: 'Predictions Made', value: systemStats.predictedDropouts, status: 'good' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{item.metric}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{item.value}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ {item.status}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* User Management */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-md overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">User Management</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.department}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'active'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.joinDate}</td>
                  <td className="px-6 py-4 text-sm space-x-2 flex">
                    <button
                      onClick={() => handleDeactivateUser(user.id)}
                      className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition text-xs font-medium"
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition text-xs font-medium flex items-center gap-1"
                    >
                      <TrashIcon className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
