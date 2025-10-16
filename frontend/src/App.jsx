import { Link, Routes, Route } from 'react-router-dom'
import PredictForm from './components/PredictForm'
import Analytics from './components/Analytics'
import Header from './components/Header'
import { motion } from 'framer-motion'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6">
      <Header />

      <main className="max-w-4xl mx-auto mt-8">
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35 }}>
          <Routes>
            <Route path="/" element={<PredictForm />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </motion.div>
      </main>
    </div>
  )
}
