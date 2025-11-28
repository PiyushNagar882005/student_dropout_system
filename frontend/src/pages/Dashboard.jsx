// Dashboard.jsx
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bar, Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement)

/* Reusable ChartCard */
function ChartCard({ title, children, actions, ariaLabel, className = '' }) {
  return (
    <div
      className={`bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col ${className}`}
      role="region"
      aria-label={ariaLabel || title}
    >
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {actions ? <div className="ml-4">{actions}</div> : null}
      </div>

      <div className="flex-1 w-full flex items-center justify-center">{children}</div>
    </div>
  )
}

export default function Dashboard() {
  const [filter, setFilter] = useState('all')
  const [liveStats, setLiveStats] = useState(null)
  const pieRef = useRef(null)
  const lineRef = useRef(null)
  const barRef = useRef(null)

  // Simulated fetch — replace with your API if available
  useEffect(() => {
    let mounted = true
    async function fetchData() {
      await new Promise((r) => setTimeout(r, 200))
      if (!mounted) return
      setLiveStats({
        totalStudents: 1245,
        atRisk: 147,
        predictedDropouts: 89,
        successRate: 92.8,
        distribution: [1098, 147, 89],
        trends: { labels: ['Week 1','Week 2','Week 3','Week 4','Week 5','Week 6'], atRisk: [120,132,128,145,150,147], interventions: [50,65,70,85,92,110] },
        departments: { labels: ['Engineering','Commerce','Science','Arts','Medicine'], values: [15,12,8,10,5] }
      })
    }
    fetchData()
    return () => { mounted = false }
  }, [])

  const stats = useMemo(() => {
    const base = liveStats || { totalStudents: '1,245', atRisk: 147, predictedDropouts: 89, successRate: '92.8%' }
    return [
      { title: 'Total Students', value: base.totalStudents, change: '+12%', icon: '👥', color: 'from-blue-500 to-blue-600' },
      { title: 'At Risk', value: base.atRisk, change: '-8%', icon: '⚠️', color: 'from-orange-500 to-orange-600' },
      { title: 'Predicted Dropouts', value: base.predictedDropouts, change: '+5%', icon: '📉', color: 'from-red-500 to-red-600' },
      { title: 'Success Rate', value: base.successRate, change: '+3%', icon: '✅', color: 'from-green-500 to-green-600' }
    ]
  }, [liveStats])

  const studentDistributionData = useMemo(() => ({
    labels: ['Safe', 'At Risk', 'Critical'],
    datasets: [{
      label: 'Student Distribution',
      data: (liveStats && liveStats.distribution) || [1098,147,89],
      backgroundColor: ['rgba(34,197,94,0.6)','rgba(245,158,11,0.6)','rgba(239,68,68,0.6)'],
      borderColor: ['rgb(34,197,94)','rgb(245,158,11)','rgb(239,68,68)'],
      borderWidth: 2
    }]
  }), [liveStats])

  const trendsData = useMemo(() => ({
    labels: (liveStats && liveStats.trends?.labels) || ['Week 1','Week 2','Week 3','Week 4','Week 5','Week 6'],
    datasets: [
      {
        label: 'At Risk Students',
        data: (liveStats && liveStats.trends?.atRisk) || [120,132,128,145,150,147],
        borderColor: 'rgba(239,68,68,1)',
        backgroundColor: 'rgba(239,68,68,0.1)',
        tension: 0.4
      },
      {
        label: 'Interventions Done',
        data: (liveStats && liveStats.trends?.interventions) || [50,65,70,85,92,110],
        borderColor: 'rgba(34,197,94,1)',
        backgroundColor: 'rgba(34,197,94,0.1)',
        tension: 0.4
      }
    ]
  }), [liveStats])

  const departmentData = useMemo(() => ({
    labels: (liveStats && liveStats.departments?.labels) || ['Engineering','Commerce','Science','Arts','Medicine'],
    datasets: [{
      label: 'Dropout Rate %',
      data: (liveStats && liveStats.departments?.values) || [15,12,8,10,5],
      backgroundColor: [
        'rgba(99,102,241,0.6)',
        'rgba(168,85,247,0.6)',
        'rgba(236,72,153,0.6)',
        'rgba(59,130,246,0.6)',
        'rgba(34,197,94,0.6)'
      ],
      borderRadius: 8
    }]
  }), [liveStats])

  const commonOptions = useMemo(() => ({
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#f3f4f6' } }, tooltip: { mode: 'index', intersect: false } },
    scales: { x: { ticks: { color: '#f3f4f6' }, grid: { color: '#374151' } }, y: { ticks: { color: '#f3f4f6' }, grid: { color: '#374151' } } }
  }), [])

  function downloadChart(ref, filename = 'chart.png') {
    try {
      const chartObj = ref?.current
      const canvas = chartObj?.canvas || (chartObj && chartObj)
      const chartCanvas = canvas?.canvas || canvas
      if (!chartCanvas) return
      const url = chartCanvas.toDataURL('image/png')
      const a = document.createElement('a'); a.href = url; a.download = filename; a.click()
    } catch (err) {
      console.error('Export failed', err)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-blue-100">Real-time student dropout prediction analytics</p>
      </motion.div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} whileHover={{ y: -4 }} className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-lg backdrop-blur`} role="group" aria-label={`${stat.title}: ${stat.value}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-100 font-semibold">{stat.title}</h3>
                <span className="text-3xl" aria-hidden>{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className="text-green-200">{stat.change} from last month</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ROW 1: Pie + Line side-by-side (larger) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartCard title="Student Distribution" ariaLabel="Student distribution chart" className="h-[30rem]">
            <div className="w-full h-full p-4">
              <Pie ref={pieRef} data={studentDistributionData} options={{ maintainAspectRatio: false, plugins: { legend: { labels: { color: '#f3f4f6' } } } }} />
            </div>
            <div className="mt-2 flex gap-2 justify-end w-full">
              <button onClick={() => downloadChart(pieRef, 'student-distribution.png')} className="text-sm px-3 py-2 bg-slate-700 rounded-md text-white">Export PNG</button>
            </div>
          </ChartCard>

          <ChartCard title="Trends" ariaLabel="Trends chart" className="h-[30rem]">
            <div className="w-full h-full p-4">
              <Line ref={lineRef} data={trendsData} options={{ ...commonOptions, plugins: { legend: { labels: { color: '#f3f4f6' } } } }} />
            </div>
            <div className="mt-2 flex gap-2 justify-end w-full">
              <button onClick={() => downloadChart(lineRef, 'trends.png')} className="text-sm px-3 py-2 bg-slate-700 rounded-md text-white">Export PNG</button>
            </div>
          </ChartCard>
        </div>

        {/* ROW 2: Bar full-width */}
        <div className="mb-8">
          <ChartCard title="Dropout Rate by Department" ariaLabel="Dropout by department chart" className="h-[34rem] w-full">
            <div className="w-full h-full p-4">
              <Bar ref={barRef} data={departmentData} options={{
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: { legend: { labels: { color: '#f3f4f6' } } },
                scales: { x: { ticks: { color: '#f3f4f6' }, grid: { color: '#374151' } }, y: { ticks: { color: '#f3f4f6' }, grid: { color: '#374151' } } }
              }} />
            </div>
            <div className="mt-2 flex gap-2 justify-end w-full">
              <button onClick={() => downloadChart(barRef, 'dropout-by-department.png')} className="text-sm px-3 py-2 bg-slate-700 rounded-md text-white">Export PNG</button>
            </div>
          </ChartCard>
        </div>

        {/* Loading state */}
        {!liveStats && <div className="text-center text-sm text-gray-500">Loading data...</div>}
      </div>
    </div>
  )
}
