import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function ForgotPassword(){
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetLink, setResetLink] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    }
    setLoading(true)
    try {
      const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${BACKEND}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      // If network-level error, fetch will throw and we'll hit catch
      const text = await res.text()
      let json = null
      try { json = JSON.parse(text) } catch (e) { json = null }

      if (!res.ok) {
        const detail = (json && (json.detail || json.message)) || text || res.statusText
        toast.error(`Request failed: ${detail}`)
      } else {
        const link = (json && json.reset_link) || ''
        setResetLink(link)
        toast.success('Password reset link generated')
        console.info('Reset link:', link)
        // Optionally navigate or show link; we'll display it below
      }
    } catch (err) {
      console.error('Forgot password error', err)
      toast.error(`Request failed: ${err.message || err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Enter your email and we'll send a link to reset your password (dev will print link to console).</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="w-full p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800" />
          <button disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded-lg">{loading ? 'Sending...' : 'Send reset link'}</button>
        </form>

        {resetLink && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-800 rounded">
            <p className="text-sm text-gray-700 dark:text-gray-200">Reset link (dev):</p>
            <a className="break-all text-blue-600" href={resetLink}>{resetLink}</a>
          </div>
        )}
      </div>
    </div>
  )
}
