import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface DashboardCardProps {
  title: string
  value: string
  change: string
  icon: React.ComponentType<{ className?: string }>
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red'
  href: string
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    hover: 'hover:bg-blue-100',
    border: 'border-blue-200'
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    hover: 'hover:bg-green-100',
    border: 'border-green-200'
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    hover: 'hover:bg-purple-100',
    border: 'border-purple-200'
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'text-orange-600',
    hover: 'hover:bg-orange-100',
    border: 'border-orange-200'
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    hover: 'hover:bg-red-100',
    border: 'border-red-200'
  }
}

export function DashboardCard({ title, value, change, icon: Icon, color, href }: DashboardCardProps) {
  const colors = colorClasses[color]

  return (
    <Link href={href}>
      <motion.div
        className={`p-6 rounded-lg border ${colors.bg} ${colors.border} ${colors.hover} transition-all duration-200 cursor-pointer group`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{change}</p>
          </div>
          <div className={`p-3 rounded-lg bg-white ${colors.border} group-hover:shadow-md transition-shadow`}>
            <Icon className={`h-6 w-6 ${colors.icon}`} />
          </div>
        </div>
      </motion.div>
    </Link>
  )
} 