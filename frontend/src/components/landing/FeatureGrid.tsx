'use client'

import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  CpuChipIcon,
  VideoCameraIcon,
  LightBulbIcon,
  ChartBarIcon,
  ClockIcon,
  PuzzlePieceIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: MagnifyingGlassIcon,
    title: "Smart Video Search",
    description: "Find any moment instantly with natural language queries",
    example: "Show all second-half turnovers"
  },
  {
    icon: CpuChipIcon,
    title: "Formation Simulator",
    description: "Test different formations and see predicted outcomes",
    example: "What if we switch to 4-3-2-1?"
  },
  {
    icon: VideoCameraIcon,
    title: "Auto-Cut Highlight Generator",
    description: "AI automatically creates highlight reels and analysis clips",
    example: "Generate goal-scoring opportunities"
  },
  {
    icon: LightBulbIcon,
    title: "Tactical Whiteboard Assistant",
    description: "Interactive tactical board with AI-powered suggestions",
    example: "Draw your formation, get AI insights"
  },
  {
    icon: ChartBarIcon,
    title: "Match Reports in One Click",
    description: "Comprehensive analysis reports generated automatically",
    example: "Complete post-match analysis"
  },
  {
    icon: ClockIcon,
    title: "Real-Time Tactical Alerts",
    description: "Live notifications about tactical changes and opportunities",
    example: "Opponent formation change detected"
  },
  {
    icon: PuzzlePieceIcon,
    title: "Opponent Predictor",
    description: "Predict opponent tactics and prepare counter-strategies",
    example: "What will they do next?"
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Natural Language Chat",
    description: "Ask any tactical question in plain English",
    example: "Why did we lose possession?"
  }
]

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ 
            scale: 1.05,
            y: -5
          }}
          className="group relative"
        >
          <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 h-full">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="bg-black/40 rounded-lg p-3 border border-gray-600/50">
                <p className="text-xs text-gray-400 mb-1">Example:</p>
                <p className="text-sm text-blue-300 font-mono">
                  "{feature.example}"
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 