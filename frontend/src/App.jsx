import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import SmokeyCursor from './components/SmokeyCursor'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AtRisk from './pages/AtRisk'
import CounselorConnect from './pages/CounselorConnect'
import Contact from './pages/Contact'
import StudentPredict from './pages/StudentPredict'
import Analytics from './pages/Analytics'
import Services from './pages/Services'

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 text-gray-900 dark:text-gray-50">
      <SmokeyCursor />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          <div className="p-6">
            <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
          </div>

          <main className="flex-1 px-6 pb-6">
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/predict" element={<StudentPredict />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/services" element={<Services />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/at-risk" element={<AtRisk />} />
                <Route path="/counselor" element={<CounselorConnect />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}
