'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EyeIcon, EyeSlashIcon, ArrowRightIcon, CpuChipIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const eliteTeams = [
  { id: 1, name: 'Real Madrid', logo: '/logos/real-madrid.png', x: 15, y: 25 },
  { id: 2, name: 'Barcelona', logo: '/logos/barcelona.png', x: 35, y: 20 },
  { id: 3, name: 'Manchester City', logo: '/logos/man-city.png', x: 55, y: 30 },
  { id: 4, name: 'Bayern Munich', logo: '/logos/bayern.png', x: 75, y: 25 },
  { id: 5, name: 'PSG', logo: '/logos/psg.png', x: 25, y: 70 },
  { id: 6, name: 'Liverpool', logo: '/logos/liverpool.png', x: 45, y: 65 },
  { id: 7, name: 'Chelsea', logo: '/logos/chelsea.png', x: 65, y: 70 }
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTeam, setActiveTeam] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  // Animate data flow between teams
  useEffect(() => {
    const interval = setInterval(() => {
      const randomTeam = Math.floor(Math.random() * eliteTeams.length) + 1
      setActiveTeam(randomTeam)
      
      setTimeout(() => {
        setActiveTeam(null)
      }, 1500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Handle login logic here
      console.log('Login data:', formData)
      // TODO: Implement actual login with API service
      // await apiService.login({
      //   username: formData.email,
      //   password: formData.password
      // })
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Stadium Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Data Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* Team Network */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {eliteTeams.map((team, index) => {
            const nextTeam = eliteTeams[(index + 1) % eliteTeams.length]
            return (
              <motion.line
                key={`line-${team.id}`}
                x1={`${team.x}%`}
                y1={`${team.y}%`}
                x2={`${nextTeam.x}%`}
                y2={`${nextTeam.y}%`}
                stroke="url(#dataGradient)"
                strokeWidth="1"
                strokeDasharray="3,3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0.2, 0.6, 0.2],
                  strokeDashoffset: [0, -6]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.3
                }}
              />
            )
          })}
          
          <defs>
            <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Team Nodes */}
        {eliteTeams.map((team) => (
          <motion.div
            key={team.id}
            className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center overflow-hidden"
            style={{
              left: `${team.x}%`,
              top: `${team.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 2
            }}
            animate={{
              scale: activeTeam === team.id ? [1, 1.4, 1] : 1,
              boxShadow: activeTeam === team.id 
                ? "0 0 30px #3b82f6, 0 0 60px #3b82f6" 
                : "0 0 0px rgba(0,0,0,0)"
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
          >
            <img 
              src={team.logo} 
              alt={`${team.name} logo`}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                // Fallback to initial if logo fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.parentElement?.querySelector('.fallback') as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="fallback w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ display: 'none' }}>
              {team.name.split(' ')[0][0]}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Match Prep AI Logo" 
                  className="h-12 w-auto"
                />
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-white font-bold text-2xl">Match Prep AI</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome Back, Coach
            </h1>
            <p className="text-blue-200">
              Access your tactical intelligence dashboard
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CpuChipIcon className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 transition-all duration-300"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-slate-300">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <span className="flex items-center justify-center">
                  Access Dashboard
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-slate-600"></div>
              <span className="px-4 text-sm text-slate-400">or</span>
              <div className="flex-1 border-t border-slate-600"></div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-slate-300 text-sm">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Sign up now
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          >
            <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>AI systems online • Secure connection established</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 