import { motion } from 'framer-motion'

interface TeamLogoProps {
  team: {
    id: number
    name: string
    x: number
    y: number
  }
  isActive: boolean
}

const teamColors = {
  'Real Madrid': 'from-white to-gray-300',
  'Barcelona': 'from-blue-600 to-red-600',
  'Manchester City': 'from-blue-500 to-sky-400',
  'Liverpool': 'from-red-500 to-red-600',
  'Bayern Munich': 'from-red-500 to-blue-600',
  'PSG': 'from-blue-600 to-red-500',
  'Chelsea': 'from-blue-600 to-blue-700',
  'Arsenal': 'from-red-500 to-red-600',
  'Manchester United': 'from-red-600 to-red-700',
  'Juventus': 'from-black to-gray-800',
  'AC Milan': 'from-red-600 to-black',
  'Inter Milan': 'from-blue-600 to-black'
}

export function TeamLogo({ team, isActive }: TeamLogoProps) {
  const colors = teamColors[team.name as keyof typeof teamColors] || 'from-blue-500 to-purple-600'
  const initials = team.name.split(' ').map(word => word[0]).join('').slice(0, 2)

  return (
    <motion.div
      className={`absolute w-12 h-12 rounded-full bg-gradient-to-br ${colors} backdrop-blur-sm border-2 flex items-center justify-center shadow-lg`}
      style={{
        left: `${team.x}%`,
        top: `${team.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 2
      }}
      animate={{
        scale: isActive ? [1, 1.3, 1] : 1,
        boxShadow: isActive 
          ? "0 0 20px #00ff88, 0 0 40px #00ff88, 0 0 60px #00ff88" 
          : "0 4px 12px rgba(0,0,0,0.3)"
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
    >
      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold">
        {initials}
      </div>
    </motion.div>
  )
} 