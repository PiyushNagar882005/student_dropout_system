import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Welcome(){
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 px-6">
      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} className="max-w-4xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-10 border border-gray-200 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Student Dropout System</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Predict at-risk students, connect with counselors, and take data-driven actions to reduce dropout rates. Secure, simple, and fast.</p>
            <div className="flex gap-3">
              <button onClick={() => navigate('/login')} className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow">Get Started</button>
              <button onClick={() => navigate('/signup')} className="px-6 py-3 rounded-lg border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300">Create account</button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key features</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Predictive analytics for early interventions</li>
              <li>• At-risk student dashboards & visualizations</li>
              <li>• Counselor connect with AI-assisted suggestions</li>
              <li>• Exportable reports and scheduled summaries</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
