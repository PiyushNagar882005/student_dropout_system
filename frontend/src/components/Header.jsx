import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useTheme from '../store/useTheme'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
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
    <header className="max-w-6xl mx-auto flex items-center justify-between py-4 px-2 relative z-40">
      <motion.div initial={{ x: -50, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ duration:0.4 }} className="flex items-center space-x-3 cursor-pointer">
        <button onClick={() => navigate('/dashboard')} className="bg-gradient-to-r from-indigo-500 to-purple-500 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <motion.span whileHover={{ scale:1.1 }} className="text-white font-black">SD</motion.span>
        </button>
        <h1 onClick={() => navigate('/dashboard')} className="text-xl font-semibold hover:text-indigo-400 transition-colors">Student Dropout</h1>
      </motion.div>

      <div className="flex items-center space-x-3">
        <button onClick={() => { console.log('Toggle clicked'); toggle(); }} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer transition-colors">
          {dark ? <SunIcon className="w-5 h-5 text-yellow-400"/> : <MoonIcon className="w-5 h-5 text-blue-400"/>}
        </button>

        <button onClick={onOpenSidebar} className="p-2 rounded-md bg-gray-200 dark:bg-gray-700">
          <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </button>
      </div>
    </header>
  )
}
