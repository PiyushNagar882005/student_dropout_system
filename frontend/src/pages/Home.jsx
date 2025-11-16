import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-8 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

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
          className="bg-gradient-to-r from-indigo-500 to-purple-500 w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6"
        >
          <span className="text-4xl font-black text-white">SD</span>
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-4">
          Student Dropout
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-300 font-light mb-2">
          Prediction System
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Early intervention for student success. Identify at-risk students and provide targeted support.
        </p>
      </motion.div>

      {/* Primary CTAs (replace three-dot menu) */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-4 z-10">
        <button onClick={() => navigate('/dashboard')} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold">Get Started</button>
        <button onClick={() => navigate('/predict')} className="bg-white/10 text-white px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/20">Predict Student</button>
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
            className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl text-center hover:border-purple-500/50 transition-colors"
          >
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
              {stat.number}
            </p>
            <p className="text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
