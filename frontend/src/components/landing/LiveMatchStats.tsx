'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChartBarIcon, UserGroupIcon, ClockIcon, FireIcon } from '@heroicons/react/24/outline'

interface Player {
  id: number
  name: string
  number: number
  position: string
  stamina: number
  performance: number
  status: 'active' | 'warning' | 'critical'
}

interface MatchData {
  possession: number
  shots: number
  shotsOnTarget: number
  passes: number
  passAccuracy: number
  tackles: number
  fouls: number
  corners: number
}

export function LiveMatchStats() {
  const [currentMinute, setCurrentMinute] = useState(67)
  const [matchData, setMatchData] = useState<MatchData>({
    possession: 58,
    shots: 12,
    shotsOnTarget: 5,
    passes: 423,
    passAccuracy: 87,
    tackles: 18,
    fouls: 8,
    corners: 6
  })
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Martinez", number: 1, position: "GK", stamina: 85, performance: 92, status: 'active' },
    { id: 2, name: "Walker", number: 2, position: "RB", stamina: 78, performance: 88, status: 'active' },
    { id: 3, name: "Dias", number: 3, position: "CB", stamina: 82, performance: 91, status: 'active' },
    { id: 4, name: "Stones", number: 5, position: "CB", stamina: 89, performance: 87, status: 'active' },
    { id: 5, name: "Cancelo", number: 7, position: "LB", stamina: 76, performance: 85, status: 'warning' },
    { id: 6, name: "Rodri", number: 16, position: "CDM", stamina: 71, performance: 89, status: 'warning' },
    { id: 7, name: "De Bruyne", number: 17, position: "CM", stamina: 68, performance: 94, status: 'critical' },
    { id: 8, name: "Silva", number: 20, position: "CM", stamina: 83, performance: 86, status: 'active' },
    { id: 9, name: "Mahrez", number: 26, position: "RW", stamina: 79, performance: 82, status: 'active' },
    { id: 10, name: "Haaland", number: 9, position: "ST", stamina: 87, performance: 90, status: 'active' },
    { id: 11, name: "Foden", number: 47, position: "LW", stamina: 74, performance: 84, status: 'warning' }
  ])

  // Update match time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMinute(prev => {
        if (prev >= 90) return 90
        return prev + 1
      })
    }, 5000) // Every 5 seconds = 1 minute

    return () => clearInterval(timer)
  }, [])

  // Simulate live data updates
  useEffect(() => {
    const dataTimer = setInterval(() => {
      setMatchData(prev => ({
        ...prev,
        possession: Math.max(40, Math.min(70, prev.possession + (Math.random() - 0.5) * 2)),
        shots: prev.shots + (Math.random() > 0.7 ? 1 : 0),
        shotsOnTarget: prev.shotsOnTarget + (Math.random() > 0.8 ? 1 : 0),
        passes: prev.passes + Math.floor(Math.random() * 3) + 1,
        passAccuracy: Math.max(75, Math.min(95, prev.passAccuracy + (Math.random() - 0.5) * 2)),
        tackles: prev.tackles + (Math.random() > 0.6 ? 1 : 0),
        fouls: prev.fouls + (Math.random() > 0.9 ? 1 : 0),
        corners: prev.corners + (Math.random() > 0.85 ? 1 : 0)
      }))
    }, 3000)

    return () => clearInterval(dataTimer)
  }, [])

  // Update player stamina
  useEffect(() => {
    const playerTimer = setInterval(() => {
      setPlayers(prev => prev.map(player => ({
        ...player,
        stamina: Math.max(50, player.stamina - Math.random() * 2),
        performance: Math.max(70, player.performance + (Math.random() - 0.5) * 3),
        status: player.stamina < 60 ? 'critical' : player.stamina < 75 ? 'warning' : 'active'
      })))
    }, 4000)

    return () => clearInterval(playerTimer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'critical': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400'
      case 'warning': return 'bg-yellow-400'
      case 'critical': return 'bg-red-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="space-y-4">
      {/* Match Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center space-x-2">
            <ChartBarIcon className="w-5 h-5" />
            <span>Live Match Statistics</span>
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <ClockIcon className="w-4 h-4" />
            <span>{currentMinute}'</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm truncate mr-2">Possession</span>
              <span className="text-white font-semibold flex-shrink-0">{Math.round(matchData.possession)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm truncate mr-2">Shots</span>
              <span className="text-white font-semibold flex-shrink-0">{matchData.shots}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm truncate mr-2">Shots on Target</span>
              <span className="text-white font-semibold flex-shrink-0">{matchData.shotsOnTarget}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm truncate mr-2">Passes</span>
              <span className="text-white font-semibold flex-shrink-0">{matchData.passes}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm truncate mr-2">Pass Accuracy</span>
              <span className="text-white font-semibold flex-shrink-0">{Math.round(matchData.passAccuracy)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm truncate mr-2">Tackles</span>
              <span className="text-white font-semibold flex-shrink-0">{matchData.tackles}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm truncate mr-2">Fouls</span>
              <span className="text-white font-semibold flex-shrink-0">{matchData.fouls}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm truncate mr-2">Corners</span>
              <span className="text-white font-semibold flex-shrink-0">{matchData.corners}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Player Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-black/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center space-x-2">
            <UserGroupIcon className="w-5 h-5" />
            <span>Player Performance</span>
          </h3>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <FireIcon className="w-3 h-3" />
            <span>Live Tracking</span>
          </div>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {players.map((player) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-2 rounded bg-gray-800/50 min-h-[3rem]"
            >
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusBg(player.status)}`}></div>
                <div className="min-w-0 flex-1">
                  <div className="text-white text-sm font-medium truncate">
                    #{player.number} {player.name}
                  </div>
                  <div className="text-gray-400 text-xs">{player.position}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs flex-shrink-0 ml-2">
                <div className="text-right">
                  <div className="text-white whitespace-nowrap">Stamina: {Math.round(player.stamina)}%</div>
                  <div className="text-gray-400 whitespace-nowrap">Perf: {Math.round(player.performance)}%</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs whitespace-nowrap ${getStatusColor(player.status)} bg-gray-700`}>
                  {player.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 