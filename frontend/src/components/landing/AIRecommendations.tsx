'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CpuChipIcon, LightBulbIcon, ExclamationTriangleIcon, CheckCircleIcon, ClockIcon, SignalIcon } from '@heroicons/react/24/outline'

interface Recommendation {
  id: number
  type: 'warning' | 'suggestion' | 'analysis' | 'plan' | 'processing'
  text: string
  color: string
  icon: any
  delay: number
  priority: 'high' | 'medium' | 'low'
  confidence: number
}

const recommendations: Recommendation[] = [
  {
    id: 1,
    type: 'warning',
    text: "#8 is isolated - opponent exploiting space behind midfield",
    color: 'text-red-400',
    icon: ExclamationTriangleIcon,
    delay: 0,
    priority: 'high',
    confidence: 94
  },
  {
    id: 2,
    type: 'analysis',
    text: "Opponent just changed formation to 4-2-3-1",
    color: 'text-yellow-400',
    icon: CpuChipIcon,
    delay: 2000,
    priority: 'medium',
    confidence: 87
  },
  {
    id: 3,
    type: 'warning',
    text: "Midfield block collapsing - need immediate adjustment",
    color: 'text-orange-400',
    icon: ExclamationTriangleIcon,
    delay: 4000,
    priority: 'high',
    confidence: 91
  },
  {
    id: 4,
    type: 'suggestion',
    text: "Switch to 4-3-2-1 now to counter their width",
    color: 'text-green-400',
    icon: LightBulbIcon,
    delay: 6000,
    priority: 'medium',
    confidence: 89
  },
  {
    id: 5,
    type: 'plan',
    text: "Sub #7 for #15 - fresh legs needed on the wing",
    color: 'text-blue-400',
    icon: CheckCircleIcon,
    delay: 8000,
    priority: 'low',
    confidence: 82
  }
]

export function AIRecommendations() {
  const [visibleRecommendations, setVisibleRecommendations] = useState<Recommendation[]>([])
  const [typingIndex, setTypingIndex] = useState<number | null>(null)
  const [displayedText, setDisplayedText] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [serverStatus, setServerStatus] = useState<'online' | 'processing' | 'analyzing'>('online')
  const [processingProgress, setProcessingProgress] = useState(0)

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    setCurrentTime(new Date())
  }, [])

  // Update time every second
  useEffect(() => {
    if (!isMounted) return
    
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [isMounted])

  // Simulate processing states
  useEffect(() => {
    const processingTimer = setInterval(() => {
      setIsProcessing(true)
      setServerStatus('processing')
      setProcessingProgress(0)
      
      const progressTimer = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer)
            setIsProcessing(false)
            setServerStatus('analyzing')
            return 0
          }
          return prev + Math.random() * 20
        })
      }, 200)
      
      setTimeout(() => {
        setIsProcessing(false)
        setServerStatus('online')
      }, 3000)
    }, 8000)

    return () => clearInterval(processingTimer)
  }, [])

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    recommendations.forEach((rec, index) => {
      // Show recommendation
      const showTimer = setTimeout(() => {
        setVisibleRecommendations(prev => [...prev, rec])
        setTypingIndex(rec.id)
        setDisplayedText('')
        
        // Type out the text
        let charIndex = 0
        const typeTimer = setInterval(() => {
          if (charIndex < rec.text.length) {
            setDisplayedText(rec.text.slice(0, charIndex + 1))
            charIndex++
          } else {
            clearInterval(typeTimer)
            setTypingIndex(null)
          }
        }, 30 + Math.random() * 20) // Variable typing speed
        
        timers.push(typeTimer)
      }, rec.delay)
      
      timers.push(showTimer)
    })

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  const getServerStatusColor = () => {
    switch (serverStatus) {
      case 'online': return 'text-green-400'
      case 'processing': return 'text-yellow-400'
      case 'analyzing': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-4">
      {/* Server Status Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${getServerStatusColor().replace('text-', 'bg-')} animate-pulse`}></div>
            <span className={`text-sm font-semibold ${getServerStatusColor()}`}>
              Match Prep AI Server
            </span>
            <span className="text-xs text-gray-400">
              {isMounted && currentTime ? currentTime.toLocaleTimeString() : '--:--:--'}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <SignalIcon className="w-4 h-4" />
            <span>Live Connection</span>
          </div>
        </div>

        {/* Processing Bar */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Processing match data...</span>
              <span>{Math.round(processingProgress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${processingProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* AI Recommendations */}
      <div className="space-y-3">
        <AnimatePresence>
          {visibleRecommendations.map((rec) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className={`bg-black/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4 ${rec.color}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <rec.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2 gap-3">
                    <div className="text-sm font-medium flex-1 min-w-0">
                      {typingIndex === rec.id ? (
                        <>
                          {displayedText}
                          <span className="animate-pulse">|</span>
                        </>
                      ) : (
                        <span className="break-words">{rec.text}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className={`text-xs px-2 py-1 rounded-full bg-gray-800 whitespace-nowrap ${getPriorityColor(rec.priority)}`}>
                        {rec.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {rec.confidence}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="truncate">AI Assistant • {isMounted && currentTime ? currentTime.toLocaleTimeString() : '--:--:--'}</span>
                    <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                      <ClockIcon className="w-3 h-3" />
                      <span>Real-time</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* AI Status Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-black/80 backdrop-blur-sm border border-gray-700 rounded-lg p-3"
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>AI analyzing match in real-time...</span>
          </div>
          <div className="flex items-center space-x-4 text-gray-500">
            <span>CPU: 87%</span>
            <span>Memory: 2.3GB</span>
            <span>Network: 45ms</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 