import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid'

const schema = yup.object({
  name: yup.string().required('Name is required').min(2),
  email: yup.string().required('Email is required').email('Invalid email'),
  phone: yup.string().required('Phone is required').min(10),
  subject: yup.string().required('Subject is required'),
  category: yup.string().required('Category is required'),
  message: yup.string().required('Message is required').min(10)
}).required()

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: '', email: '', phone: '', subject: '', category: 'general', message: '' }
  })

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Contact form submitted:', data)
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 2000)
    } catch (err) {
      console.error(err)
      toast.error('Failed to send message. Please try again.')
    }
  }

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568'],
      description: 'Available Monday to Friday, 9 AM - 6 PM'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      details: ['support@studentdropout.com', 'counseling@studentdropout.com'],
      description: 'We respond within 24 hours'
    },
    {
      icon: MapPinIcon,
      title: 'Visit Us',
      details: ['123 Education Street', 'University Campus, City 12345'],
      description: 'Student Services Building, Room 201'
    }
  ]

  const categories = [
    'General Inquiry',
    'Academic Support',
    'Mental Health',
    'Financial Aid',
    'Technical Issue',
    'Feedback'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white"
      >
        <div className="flex items-center gap-3 mb-2">
          <EnvelopeIcon className="w-8 h-8" />
          <h1 className="text-4xl font-bold">Contact Us</h1>
        </div>
        <p className="text-gray-100">Get in touch with our team for support and inquiries</p>
      </motion.div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Contact Information Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-green-500/50 transition-colors shadow-lg text-center"
            >
              <div className="inline-block p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-4">
                <info.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{info.title}</h3>
              <div className="space-y-1 mb-4">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-green-400 font-semibold">{detail}</p>
                ))}
              </div>
              <p className="text-gray-400 text-sm">{info.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Form Section */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-8">Send us a Message</h2>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6 text-green-300 text-center"
              >
                ✅ Thank you for your message!
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Full Name</label>
                  <input
                    {...register('name')}
                    placeholder="John Doe"
                    className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Email Address</label>
                  <input
                    {...register('email')}
                    placeholder="john@example.com"
                    type="email"
                    className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Phone and Category Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Phone Number</label>
                  <input
                    {...register('phone')}
                    placeholder="(555) 123-4567"
                    className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Category</label>
                  <select
                    {...register('category')}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Subject</label>
                <input
                  {...register('subject')}
                  placeholder="How can we help?"
                  className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                />
                {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Message</label>
                <textarea
                  {...register('message')}
                  placeholder="Please share your inquiry or feedback..."
                  rows={5}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 transition-colors resize-none"
                ></textarea>
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : '📨 Send Message'}
              </motion.button>
            </form>
          </div>

          {/* Information Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Links */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {['FAQ', 'Documentation', 'Bug Report', 'Feature Request', 'Feedback'].map((link, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ x: 10 }}
                    className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span className="text-green-500">→</span> {link}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Office Hours */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Office Hours</h3>
              <div className="space-y-3 text-gray-300">
                <p><span className="font-semibold text-green-400">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                <p><span className="font-semibold text-green-400">Saturday:</span> 10:00 AM - 4:00 PM</p>
                <p><span className="font-semibold text-green-400">Sunday:</span> Closed</p>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Expected Response Time</h3>
              <p className="text-gray-300 mb-4">
                We pride ourselves on quick response times:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li><span className="text-green-400 font-semibold">General Inquiries:</span> 24 hours</li>
                <li><span className="text-green-400 font-semibold">Urgent Issues:</span> 2 hours</li>
                <li><span className="text-green-400 font-semibold">During Business Hours:</span> 1 hour</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
