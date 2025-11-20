import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useTheme from '../store/useTheme'
import ToggleTheme from './ToggleTheme'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function Header({ onOpenSidebar }){
  const dark = useTheme((s) => s.dark)
  const toggle = useTheme((s) => s.toggle)
  const navigate = useNavigate()

  useEffect(() => {
    const html = document.documentElement
    if(dark) html.classList.add('dark')
    else html.classList.remove('dark')
  }, [dark])

  return (
    <header className="max-w-6xl mx-auto flex items-center justify-between py-4 px-2 relative z-40 border-b border-gray-200 dark:border-slate-700">
      <motion.div initial={{ x: -50, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ duration:0.4 }} className="flex items-center space-x-3 cursor-pointer">
        <button onClick={() => navigate('/dashboard')} className="bg-gradient-to-br from-blue-600 to-blue-700 w-10 h-10 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow hover:from-blue-700 hover:to-blue-800">
          <motion.span whileHover={{ scale:1.1 }} className="text-white font-black text-sm">SD</motion.span>
        </button>
        <h1 onClick={() => navigate('/dashboard')} className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Student Dropout</h1>
      </motion.div>

      <div className="flex items-center space-x-4">
        <ToggleTheme className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700" animationType="wave-ripple" />

        <button onClick={onOpenSidebar} className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
          <Bars3Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </header>
  )
}
