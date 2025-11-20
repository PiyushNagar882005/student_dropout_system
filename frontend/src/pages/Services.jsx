import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChartBarIcon, LightBulbIcon, ShieldCheckIcon, BoltIcon, CogIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Services() {
  const [hoveredService, setHoveredService] = useState(null)

  const services = [
    {
      id: 1,
      name: 'Predictive Analytics',
      icon: ChartBarIcon,
      description: 'AI-powered student dropout prediction using machine learning models',
      features: ['98.5% accuracy', 'Real-time predictions', 'Multi-factor analysis'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 2,
      name: 'Risk Assessment',
      icon: ShieldCheckIcon,
      description: 'Comprehensive risk scoring with actionable intervention recommendations',
      features: ['Risk scoring', 'Trend analysis', 'Historical data'],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      id: 3,
      name: 'Counselor Connect',
      icon: LightBulbIcon,
      description: 'AI-assisted and human counselor support with instant messaging',
      features: ['24/7 availability', 'AI-powered responses', 'Expert counseling'],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      id: 4,
      name: 'Performance Monitoring',
      icon: BoltIcon,
      description: 'Real-time dashboard with student performance metrics and analytics',
      features: ['Live updates', 'Custom dashboards', 'Deep insights'],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      id: 5,
      name: 'Automated Alerts',
      icon: CogIcon,
      description: 'Intelligent notification system for at-risk student identification',
      features: ['Smart alerts', 'Custom thresholds', 'Multi-channel delivery'],
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      id: 6,
      name: 'Data Export & Reports',
      icon: CheckCircleIcon,
      description: 'Generate comprehensive reports and export data in multiple formats',
      features: ['PDF reports', 'Excel export', 'Scheduled reports'],
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 p-12 text-white"
      >
        <h1 className="text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-blue-100">Comprehensive suite of AI-powered tools for student success</p>
      </motion.div>

      {/* Services Grid */}
      <div className="p-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                whileHover={{ y: -8 }}
                className={`${service.bgColor} rounded-2xl p-8 border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all cursor-pointer group`}
              >
                {/* Icon Background */}
                <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Service Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">{service.description}</p>

                {/* Features List */}
                <div className={`space-y-2 overflow-hidden transition-all ${hoveredService === service.id ? 'max-h-40' : 'max-h-0'}`}>
                  {service.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: hoveredService === service.id ? 1 : 0, x: hoveredService === service.id ? 0 : -10 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                      {feature}
                    </motion.div>
                  ))}
                </div>

                {/* Learn More Link */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="mt-6 inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm group"
                >
                  Learn More
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </motion.button>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-12 text-white mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Institution?</h2>
          <p className="text-xl text-blue-100 mb-8">Get started with our comprehensive student success platform today</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Now
          </motion.button>
        </div>
      </div>
    </div>
  )
}
