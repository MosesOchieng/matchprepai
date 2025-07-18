'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function FloatingTablet() {
  const [hoveredInsight, setHoveredInsight] = useState<string | null>(null)

  return (
    <div className="relative flex justify-center items-center min-h-[150px]">
      {/* 3D Tablet */}
      <motion.div
        className="relative w-64 h-36 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-600"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
        animate={{
          rotateY: [0, 5, 0, -5, 0],
          rotateX: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Screen */}
        <div className="absolute inset-2 bg-black rounded-xl overflow-hidden">
          {/* Field View */}
          <div className="relative w-full h-full bg-gradient-to-b from-green-800 to-green-900">
            {/* Field Lines */}
            <div className="absolute inset-4 border-2 border-white/30 rounded-lg">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 transform -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30 transform -translate-x-1/2" />
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-white/20 rounded-full" />
            </div>

            {/* Players */}
            {[
              { x: 20, y: 30, team: 'home', number: '10' },
              { x: 40, y: 50, team: 'home', number: '7' },
              { x: 60, y: 40, team: 'home', number: '9' },
              { x: 80, y: 30, team: 'away', number: '11' },
              { x: 70, y: 60, team: 'away', number: '8' },
              { x: 50, y: 70, team: 'away', number: '6' }
            ].map((player, index) => (
              <motion.div
                key={index}
                className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  player.team === 'home' ? 'bg-blue-500' : 'bg-red-500'
                }`}
                style={{
                  left: `${player.x}%`,
                  top: `${player.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                {player.number}
              </motion.div>
            ))}

            {/* Ball */}
            <motion.div
              className="absolute w-3 h-3 bg-white rounded-full"
              style={{
                left: '45%',
                top: '55%'
              }}
              animate={{
                x: [0, 10, -5, 0],
                y: [0, -5, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Match Clock */}
            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              67:23
            </div>

            {/* Score */}
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              2 - 1
            </div>

            {/* Fatigue Indicators */}
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
              {[1, 2, 3, 4, 5].map((player) => (
                <div
                  key={player}
                  className={`w-2 h-2 rounded-full mb-1 ${
                    player <= 2 ? 'bg-green-400' : 
                    player <= 4 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tablet Bezel */}
        <div className="absolute inset-0 rounded-2xl border-4 border-gray-700 pointer-events-none" />
        
        {/* Home Button */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full" />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-4 -left-4 w-8 h-8 border border-blue-400/30 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute -bottom-4 -right-4 w-6 h-6 border border-green-400/30 rounded-full"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
} 