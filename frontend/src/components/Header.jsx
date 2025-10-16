import React, { useEffect } from 'react'
import useTheme from '../store/useTheme'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'

export default function Header(){
  const dark = useTheme((s) => s.dark)
  const toggle = useTheme((s) => s.toggle)

  useEffect(() => {
    const html = document.documentElement
    if(dark) html.classList.add('dark')
    else html.classList.remove('dark')
  }, [dark])

  return (
    <header className="max-w-6xl mx-auto flex items-center justify-between py-4 px-2">
      <motion.div initial={{ x: -50, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ duration:0.4 }} className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg">
          <motion.span whileHover={{ scale:1.1 }} className="text-white font-black">SD</motion.span>
        </div>
        <h1 className="text-xl font-semibold">Student Dropout</h1>
      </motion.div>

      <div className="flex items-center space-x-3">
        <motion.button whileTap={{ scale:0.95 }} onClick={toggle} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
          {dark ? <SunIcon className="w-5 h-5 text-yellow-400"/> : <MoonIcon className="w-5 h-5 text-blue-400"/>}
        </motion.button>
      </div>
    </header>
  )
}
