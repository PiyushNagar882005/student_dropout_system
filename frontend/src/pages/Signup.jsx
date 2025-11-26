import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import useAuth from '../store/useAuth'

export default function Signup() {
  const navigate = useNavigate()
  const login = useAuth((s) => s.login)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast.error('Please fill in all fields')
      return
    }
    if (password !== confirm) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)

    // Save to localStorage as demo "registered users"
    const usersJson = localStorage.getItem('registeredUsers')
    const users = usersJson ? JSON.parse(usersJson) : []
    if (users.find(u => u.email === email)) {
      toast.error('Email already registered')
      setLoading(false)
      return
    }

    const newUser = { id: Date.now(), name, email, password, role: 'user', joinDate: new Date().toISOString() }
    users.push(newUser)
    localStorage.setItem('registeredUsers', JSON.stringify(users))

    // Auto-login after signup
    login({ id: newUser.id, name: newUser.name, email: newUser.email, role: 'user' }, 'user')
    toast.success('Account created and logged in')
    setLoading(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }} className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create an account</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sign up to access predictions and counseling features</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" type="email" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Choose a password" type="password" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">Confirm Password</label>
              <input value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm password" type="password" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white" />
            </div>

            <button disabled={loading} className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 mt-4">{loading ? 'Creating...' : 'Create account'}</button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline">Sign in</button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
