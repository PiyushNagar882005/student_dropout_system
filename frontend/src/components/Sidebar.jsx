import React from 'react'
import { NavLink } from 'react-router-dom'
import useTheme from '../store/useTheme'
import useAuth from '../store/useAuth'
import ToggleTheme from './ToggleTheme'
import { HomeIcon, ChartBarIcon, BoltIcon, ExclamationTriangleIcon, UserGroupIcon, InboxIcon, MagnifyingGlassIcon, XMarkIcon, SparklesIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

const userLinks = [
  { label: 'Home', to: '/', icon: HomeIcon },
  { label: 'Dashboard', to: '/dashboard', icon: ChartBarIcon },
  { label: 'Our Services', to: '/services', icon: SparklesIcon },
  { label: 'Student Prediction', to: '/predict', icon: BoltIcon },
  { label: 'Students at Risk', to: '/at-risk', icon: ExclamationTriangleIcon },
  { label: 'Counselor Connect', to: '/counselor', icon: UserGroupIcon },
  { label: 'Contact Us', to: '/contact', icon: InboxIcon }
]

const adminLinks = [
  { label: 'Admin Dashboard', to: '/admin-dashboard', icon: Cog6ToothIcon },
  { label: 'Submissions', to: '/admin/submissions', icon: InboxIcon }
]

export default function Sidebar({ isOpen = false, onClose = () => {} }){
  const dark = useTheme((s) => s.dark)
  const toggle = useTheme((s) => s.toggle)
  const userRole = useAuth((s) => s.role)
  
  const links = userRole === 'admin' ? adminLinks : userLinks

  return (
    <>
      {/* Overlay for mobile when sidebar open */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onClose} />}

      <aside className={`w-72 bg-white dark:bg-slate-900 backdrop-blur border-r border-gray-200 dark:border-slate-800 p-6 min-h-screen fixed md:static left-0 top-0 bottom-0 z-50 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`${userRole === 'admin' ? 'from-orange-600 to-orange-700' : 'from-blue-600 to-blue-700'} bg-gradient-to-br w-10 h-10 rounded-lg flex items-center justify-center shadow-md`}>
              <span className="text-white font-bold text-sm">{userRole === 'admin' ? 'AD' : 'SD'}</span>
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-sm">Student Dropout</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs">{userRole === 'admin' ? 'Admin Panel' : 'Prediction System'}</p>
            </div>
          </div>
          <button className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300" onClick={onClose}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {userRole !== 'admin' && (
          <div className="mb-6">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input placeholder="Search..." className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        )}

        <nav className="space-y-2">
          {links.map(link => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? userRole === 'admin' ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300' : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Appearance</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Toggle theme</p>
              </div>
            </div>
            <div>
              <ToggleTheme className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300" animationType="wave-ripple" />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
