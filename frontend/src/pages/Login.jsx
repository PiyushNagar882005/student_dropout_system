import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import useAuth from '../store/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const login = useAuth((state) => state.login)
  
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const demoCredentials = {
    user: {
      email: 'student@example.com',
      password: 'student123'
    },
    admin: {
      email: 'admin@example.com',
      password: 'admin123'
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const role = isAdmin ? 'admin' : 'user'
      const validCredentials = demoCredentials[role]

      if (email === validCredentials.email && password === validCredentials.password) {
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          name: isAdmin ? 'Admin User' : 'Student User',
          email: email,
          role: role,
          loginTime: new Date().toLocaleString()
        }

        login(userData, role)
        toast.success(`Welcome ${userData.name}!`)
        
        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin-dashboard')
        } else {
          navigate('/')
        }
      } else {
        toast.error('Invalid credentials')
        console.log(`${role} credentials:`, validCredentials)
      }
      setLoading(false)
    }, 800)
  }

  // Social login removed

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg mb-4">
              <span className="text-white font-bold text-xl">SD</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Student Dropout System</h1>
            <p className="text-gray-600 dark:text-gray-400">Secure login to your account</p>
          </div>

          {/* Social login removed */}

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-slate-900 px-2 text-gray-500">Continue with email</span>
            </div>
          </div>

          {/* Role Toggle */}
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setIsAdmin(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                !isAdmin
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setIsAdmin(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                isAdmin
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="text-right">
                <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
              </div>

              <div className="relative">
                <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-800 text-center text-sm text-gray-600 dark:text-gray-400">
          </div>
        </div>
      </motion.div>
    </div>
  )
}
