import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChatBubbleLeftRightIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

export default function CounselorConnect() {
  const [selectedCounselor, setSelectedCounselor] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isSchedulingSession, setIsSchedulingSession] = useState(false)
  const [aiMode, setAiMode] = useState(false)

  const counselors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Academic Counseling',
      experience: '8 years',
      rating: 4.8,
      available: 'Today 2-4 PM',
      bio: 'Expert in academic planning and career guidance',
      status: 'online'
    },
    {
      id: 2,
      name: 'Mr. Robert Wilson',
      specialization: 'Mental Health',
      experience: '10 years',
      rating: 4.9,
      available: 'Tomorrow 10-12 PM',
      bio: 'Specialized in student wellness and stress management',
      status: 'online'
    },
    {
      id: 3,
      name: 'Ms. Emma Davis',
      specialization: 'Career Development',
      experience: '6 years',
      rating: 4.7,
      available: 'Today 3-5 PM',
      bio: 'Helps students with career planning and internship placement',
      status: 'offline'
    },
    {
      id: 4,
      name: 'Dr. Michael Brown',
      specialization: 'Financial Counseling',
      experience: '9 years',
      rating: 4.8,
      available: 'Tomorrow 2-4 PM',
      bio: 'Assists with financial aid and education funding',
      status: 'online'
    }
  ]

  function generateAiReply(text){
    const t = text.toLowerCase()
    if(t.includes('stress') || t.includes('anx')) return 'I\'m sorry you\'re feeling stressed. Try breaking tasks into smaller steps and consider scheduling a short counseling session.'
    if(t.includes('attendance') || t.includes('absent')) return 'Attendance issues can often be addressed by setting a small daily routine. Would you like resources on time management?'
    if(t.includes('grades') || t.includes('score')) return 'Consider forming a study group and reaching out to your instructors early. I can suggest study resources.'
    return 'Thanks for sharing. Can you provide more details so I can help better?'
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const newMessage = {
      id: messages.length + 1,
      sender: 'student',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')

    // AI mode response
    if(aiMode || (selectedCounselor && selectedCounselor.ai)){
      setTimeout(() => {
        const reply = generateAiReply(newMessage.text)
        setMessages(prev => [...prev, { id: prev.length + 1, sender: 'counselor', text: reply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
      }, 700)
      return
    }

    // Simulate human counselor response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'counselor',
        text: 'Thank you for reaching out. I understand your concern. Let\'s discuss this further.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    }, 1000)
  }

  const handleScheduleSession = () => {
    setIsSchedulingSession(true)
    setTimeout(() => {
      setIsSchedulingSession(false)
      toast.success('Session scheduled successfully!')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white"
      >
        <div className="flex items-center gap-3 mb-2 justify-between">
          <div className="flex items-center gap-3">
            <ChatBubbleLeftRightIcon className="w-8 h-8" />
            <div>
              <h1 className="text-4xl font-bold">Counselor Connect</h1>
              <p className="text-blue-100">Connect with professional counselors for guidance and support</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setAiMode(false)} className={`px-3 py-1 rounded-full font-medium ${!aiMode ? 'bg-white text-blue-700' : 'bg-white/10 text-white'}`}>Human</button>
            <button onClick={() => setAiMode(true)} className={`px-3 py-1 rounded-full font-medium ${aiMode ? 'bg-white text-blue-700' : 'bg-white/10 text-white'}`}>AI Counselor</button>
          </div>
        </div>
      </motion.div>

      <div className="p-8 max-w-7xl mx-auto">
        {!selectedCounselor ? (
          <>
            {/* Counselors Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {/* If AI mode show an AI card first */}
              {aiMode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 cursor-pointer border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-md flex flex-col justify-between"
                  onClick={() => setSelectedCounselor({ id: 'ai', name: 'AI Counselor', specialization: 'Virtual Assistant', status: 'online', ai: true })}
                >
                  <div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">AI</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">AI Counselor</h3>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold mb-3">Instant automated guidance</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-4">Get quick tips and resources from our AI assistant.</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1"><span>⭐</span><span className="text-gray-900 dark:text-white font-semibold">4.5</span></div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-colors">Start</button>
                  </div>
                </motion.div>
              )}
              {counselors.map((counselor, index) => (
                <motion.div
                  key={counselor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedCounselor(counselor)}
                  className="bg-gray-800 rounded-2xl p-6 cursor-pointer border border-gray-700 hover:border-cyan-500/50 transition-colors shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {counselor.name.charAt(0)}
                    </div>
                    <div className={`w-3 h-3 rounded-full ${counselor.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{counselor.name}</h3>
                  <p className="text-cyan-400 text-sm font-semibold mb-3">{counselor.specialization}</p>
                  <p className="text-gray-400 text-xs mb-4">{counselor.bio}</p>

                  <div className="space-y-2 mb-4 text-sm text-gray-300">
                    <p><span className="font-semibold">Experience:</span> {counselor.experience}</p>
                    <p><span className="font-semibold">Available:</span> {counselor.available}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-white font-semibold">{counselor.rating}</span>
                    </div>
                    <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-colors">
                      Connect
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: '🔒',
                  title: 'Confidential',
                  description: 'All conversations are completely private and secure'
                },
                {
                  icon: '⏰',
                  title: '24/7 Support',
                  description: 'Access counseling services anytime you need help'
                },
                {
                  icon: '👥',
                  title: 'Expert Team',
                  description: 'Trained professionals with years of experience'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-6 text-center"
                >
                  <span className="text-4xl block mb-3">{feature.icon}</span>
                  <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          /* Chat Interface */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl flex flex-col h-[600px]"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedCounselor(null)}
                  className="text-white hover:bg-white/20 px-3 py-1 rounded-lg transition"
                >
                  ← Back
                </button>
                <div>
                  <h2 className="text-xl font-bold">{selectedCounselor.name}</h2>
                  <p className="text-cyan-100 text-sm">{selectedCounselor.specialization}</p>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${selectedCounselor.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-600 mb-4" />
                  <p className="text-gray-400">Start your conversation with {selectedCounselor.name}</p>
                </div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'student'
                        ? 'bg-cyan-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}>
                      <p>{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-700 p-4 space-y-4">
              {messages.length === 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleScheduleSession}
                  disabled={isSchedulingSession}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
                >
                  {isSchedulingSession ? 'Scheduling...' : '📅 Schedule Session'}
                </motion.button>
              )}

              <form onSubmit={handleSendMessage} className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-cyan-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Send
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
