import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import useAuth from './store/useAuth'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import SmokeyCursor from './components/SmokeyCursor'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Welcome from './pages/Welcome'
import AuthSuccess from './pages/AuthSuccess'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AtRisk from './pages/AtRisk'
import CounselorConnect from './pages/CounselorConnect'
import Contact from './pages/Contact'
import StudentPredict from './pages/StudentPredict'
import Analytics from './pages/Analytics'
import Services from './pages/Services'
import AdminDashboard from './pages/AdminDashboard'
import AdminSubmissions from './pages/AdminSubmissions'

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isAuthenticated = useAuth((state) => state.isAuthenticated)
  const userRole = useAuth((state) => state.role)

  // Render header/sidebar for both public and authenticated views so the
  // hamburger can toggle the sidebar on login/welcome pages too.
  // When unauthenticated we show only public routes inside the same layout.

  // Redirect login page if already authenticated
  if (isAuthenticated && (window.location.pathname === '/login' || window.location.pathname === '/signup' || window.location.pathname === '/welcome')) {
    return <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/'} replace />
  }

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
                {/* Root: show Welcome to guests, Home/Admin to authenticated users */}
                <Route path="/" element={isAuthenticated ? (userRole === 'admin' ? <AdminDashboard /> : <Home />) : <Welcome />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/auth/success" element={<AuthSuccess />} />

                {/* Admin Routes (authenticated) */}
                {isAuthenticated && userRole === 'admin' && (
                  <>
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/submissions" element={<AdminSubmissions />} />
                  </>
                )}

                {/* User Routes (authenticated) */}
                {isAuthenticated && userRole === 'user' && (
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="/predict" element={<StudentPredict />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/at-risk" element={<AtRisk />} />
                    <Route path="/counselor" element={<CounselorConnect />} />
                    <Route path="/contact" element={<Contact />} />
                  </>
                )}

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to={isAuthenticated ? (userRole === 'admin' ? '/admin-dashboard' : '/') : '/'} replace />} />
              </Routes>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}
