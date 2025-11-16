import React from 'react'
import { NavLink } from 'react-router-dom'
import useTheme from '../store/useTheme'
import { HomeIcon, ChartBarIcon, BoltIcon, ExclamationTriangleIcon, UserGroupIcon, InboxIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

const links = [
  { label: 'Home', to: '/', icon: HomeIcon },
  { label: 'Dashboard', to: '/dashboard', icon: ChartBarIcon },
  { label: 'Student Prediction', to: '/predict', icon: BoltIcon },
  { label: 'Students at Risk', to: '/at-risk', icon: ExclamationTriangleIcon },
  { label: 'Counselor Connect', to: '/counselor', icon: UserGroupIcon },
  { label: 'Contact Us', to: '/contact', icon: InboxIcon }
]

export default function Sidebar({ isOpen = false, onClose = () => {} }){
  const dark = useTheme((s) => s.dark)
  const toggle = useTheme((s) => s.toggle)

  return (
    <>
      {/* Overlay for mobile when sidebar open */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onClose} />}

      <aside className={`w-72 bg-gray-900/95 backdrop-blur border-r border-gray-800 p-4 min-h-screen fixed md:static left-0 top-0 bottom-0 z-50 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-10 h-10 rounded-lg flex items-center justify-center shadow">
              <span className="text-white font-bold">SD</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">Student Dropout</h3>
              <p className="text-gray-400 text-sm">Prediction System</p>
            </div>
          </div>
          <button className="md:hidden p-2 rounded bg-gray-800 text-gray-200" onClick={onClose}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input placeholder="Search..." className="w-full pl-10 pr-3 py-2 rounded bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none" />
          </div>
        </div>

        <nav className="space-y-1">
          {links.map(link => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'text-gray-300 hover:bg-gray-800/60'}`}
              >
                <Icon className="w-5 h-5 text-gray-300" />
                <span className="ml-1">{link.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {dark ? <SunIcon className="w-5 h-5 text-yellow-400"/> : <MoonIcon className="w-5 h-5 text-blue-400"/>}
              <div>
                <p className="text-sm font-medium text-gray-200">Appearance</p>
                <p className="text-xs text-gray-400">Toggle theme</p>
              </div>
            </div>
            <button onClick={toggle} className="px-3 py-1 rounded bg-gray-800 text-gray-200">
              {dark ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
