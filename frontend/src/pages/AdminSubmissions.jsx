import React, { useEffect, useState } from 'react'
import api, { getSubmissions } from '../services/api'
import useAuth from '../store/useAuth'

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const userRole = useAuth((s) => s.role)

  useEffect(() => {
    let mounted = true
    const fetch = async () => {
      setLoading(true)
      try {
        const res = await getSubmissions(100)
        if (mounted) setSubmissions(res.submissions || [])
      } catch (err) {
        console.error(err)
        if (mounted) setError(err.message || 'Failed to load')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    if (userRole === 'admin') fetch()
    return () => { mounted = false }
  }, [userRole])

  if (userRole !== 'admin') return <div className="text-red-400">Unauthorized</div>

  return (
    <div className="backdrop-blur-md bg-white/5 p-6 rounded-2xl shadow-xl border border-white/10">
      <h2 className="text-2xl font-semibold mb-4">Recent Submissions</h2>
      {loading && <p className="text-sm text-gray-300">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && (
        <div className="overflow-auto max-h-96">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="text-left">
                <th className="px-2 py-1">Timestamp</th>
                <th className="px-2 py-1">User</th>
                <th className="px-2 py-1">Prediction</th>
                <th className="px-2 py-1">Probability</th>
                <th className="px-2 py-1">Feature Vector</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s, idx) => (
                <tr key={idx} className="border-t border-white/5">
                  <td className="px-2 py-2 align-top">{s.timestamp}</td>
                  <td className="px-2 py-2 align-top">{s.user?.email || s.user?.name || 'anon'}</td>
                  <td className="px-2 py-2 align-top">{s.prediction ? 'At Risk' : 'Continuing'}</td>
                  <td className="px-2 py-2 align-top">{s.probability ?? '-'}</td>
                  <td className="px-2 py-2 align-top"><pre className="text-xs">{JSON.stringify(s.feature_vector)}</pre></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
