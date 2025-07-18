'use client'

import { motion } from 'framer-motion'

const techStack = [
  {
    name: "GPT-4o",
    logo: "🤖",
    description: "Advanced AI reasoning"
  },
  {
    name: "OpenCV",
    logo: "👁️",
    description: "Computer vision"
  },
  {
    name: "LangChain",
    logo: "🔗",
    description: "AI orchestration"
  },
  {
    name: "PyTorch",
    logo: "🔥",
    description: "Deep learning"
  },
  {
    name: "AWS",
    logo: "☁️",
    description: "Cloud infrastructure"
  }
]

const partnerships = [
  {
    name: "UEFA",
    logo: "🏆",
    description: "European football"
  },
  {
    name: "CAF",
    logo: "🌍",
    description: "African football"
  }
]

export function TechStack() {
  return (
    <div className="space-y-12">
      {/* AI Technologies */}
      <div>
        <h3 className="text-2xl font-bold text-white text-center mb-8">
          Powered by World-Class AI
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300">
                <div className="text-4xl mb-3">{tech.logo}</div>
                <h4 className="text-white font-semibold mb-2">{tech.name}</h4>
                <p className="text-gray-400 text-sm">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Partnerships */}
      <div>
        <h3 className="text-2xl font-bold text-white text-center mb-8">
          Trusted by Football's Elite
        </h3>
        <div className="flex justify-center space-x-12">
          {partnerships.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-lg p-8 hover:border-green-500/50 transition-all duration-300">
                <div className="text-5xl mb-4">{partner.logo}</div>
                <h4 className="text-white font-bold text-xl mb-2">{partner.name}</h4>
                <p className="text-gray-400">{partner.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-lg p-6">
          <p className="text-white text-lg font-semibold">
            Built by coaches, for coaches, with world-class AI
          </p>
          <p className="text-gray-400 mt-2">
            Trusted by professional teams and academies worldwide
          </p>
        </div>
      </motion.div>
    </div>
  )
} 