import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function ResetPassword(){
  const navigate = useNavigate()
  const location = useLocation()
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const t = params.get('token') || ''
    setToken(t)
  }, [location.search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      toast.error('Missing token')
      return
    }
    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    if (password !== confirm) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${BACKEND}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: password })
      })
      const json = await res.json()
      if (!res.ok) {
        toast.error(json.detail || 'Reset failed')
      } else {
        toast.success('Password reset successful')
        navigate('/login')
      }
    } catch (err) {
      console.error(err)
      toast.error('Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="New password" className="w-full p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800" />
          <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="Confirm password" className="w-full p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800" />
          <button disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded-lg">{loading ? 'Resetting...' : 'Reset password'}</button>
        </form>
      </div>
    </div>
  )
}
