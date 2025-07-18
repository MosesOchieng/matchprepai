'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    quote: "It caught tactical breakdowns I never even saw.",
    coach: "Sarah Martinez",
    role: "Head Coach, FC Barcelona Women",
    image: "/images/coaches/coach1.jpg"
  },
  {
    id: 2,
    quote: "It's like having a full analysis team in my pocket.",
    coach: "Marcus Johnson",
    role: "Technical Director, Manchester United Academy",
    image: "/images/coaches/coach2.jpg"
  },
  {
    id: 3,
    quote: "This isn't just for pros — it helped my youth team win the league.",
    coach: "David Chen",
    role: "Youth Coach, Local Academy",
    image: "/images/coaches/coach3.jpg"
  },
  {
    id: 4,
    quote: "The AI insights are game-changing. We're winning more matches.",
    coach: "Elena Rodriguez",
    role: "Assistant Coach, Real Madrid",
    image: "/images/coaches/coach4.jpg"
  }
]

const stats = [
  { label: "Tactical Clarity", value: "+22%" },
  { label: "Win Ratio Increase", value: "+16%" },
  { label: "Coach Satisfaction", value: "100%" }
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative">
      {/* Testimonials */}
      <div className="relative h-64 mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center max-w-4xl mx-auto px-6">
              <blockquote className="text-2xl md:text-3xl font-light text-white mb-6 leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {testimonials[currentIndex].coach.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">{testimonials[currentIndex].coach}</p>
                  <p className="text-gray-400 text-sm">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center space-x-2 mb-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-gradient-to-r from-blue-500 to-green-500' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 