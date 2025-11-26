import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useTheme from '../store/useTheme'
import useAuth from '../store/useAuth'
import ToggleTheme from './ToggleTheme'
import { Bars3Icon, ArrowLeftOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function Header({ onOpenSidebar }){
  const dark = useTheme((s) => s.dark)
  const toggle = useTheme((s) => s.toggle)
  const navigate = useNavigate()
  const user = useAuth((s) => s.user)
  const logout = useAuth((s) => s.logout)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    if(dark) html.classList.add('dark')
    else html.classList.remove('dark')
  }, [dark])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <header className="max-w-6xl mx-auto flex items-center justify-between py-4 px-2 relative z-40 border-b border-gray-200 dark:border-slate-700">
      <motion.div initial={{ x: -50, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ duration:0.4 }} className="flex items-center space-x-3 cursor-pointer">
        <button onClick={() => navigate('/')} className="bg-gradient-to-br from-blue-600 to-blue-700 w-10 h-10 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow hover:from-blue-700 hover:to-blue-800">
          <motion.span whileHover={{ scale:1.1 }} className="text-white font-black text-sm">SD</motion.span>
        </button>
        <h1 onClick={() => navigate('/')} className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Student Dropout</h1>
      </motion.div>

      <div className="flex items-center space-x-4">
        <ToggleTheme className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700" animationType="wave-ripple" />

        {user && (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              <UserCircleIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
            </button>

            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-gray-200 dark:border-slate-800 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Role: <span className="capitalize font-semibold">{user.role}</span></p>
                </div>
                <button
                  onClick={() => {
                    handleLogout()
                    setShowDropdown(false)
                  }}
                  className="w-full px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                >
                  <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        )}

        <button onClick={onOpenSidebar} className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
          <Bars3Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </header>
  )
}
