import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-950 dark:via-blue-900 dark:to-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob"></div>
      <div className="absolute -bottom-8 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-2000"></div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          className="bg-gradient-to-br from-blue-600 to-blue-700 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6"
        >
          <span className="text-4xl font-black text-white">SD</span>
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Student Dropout
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-light mb-2">
          Prediction System
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Early intervention for student success. Identify at-risk students and provide targeted support.
        </p>
      </motion.div>

      {/* Primary CTAs */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-4 z-10">
        <button onClick={() => navigate('/dashboard')} className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg shadow-md font-semibold transition-colors">Get Started</button>
        <button onClick={() => navigate('/predict')} className="bg-gray-200 dark:bg-slate-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors">Predict Student</button>
      </motion.div>

      {/* Quick info cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl z-10"
      >
        {[
          { number: '1000+', label: 'Students Tracked' },
          { number: '95%', label: 'Prediction Accuracy' },
          { number: '24/7', label: 'Support Available' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="backdrop-blur-md bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 p-6 rounded-2xl text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-sm"
          >
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stat.number}
            </p>
            <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
