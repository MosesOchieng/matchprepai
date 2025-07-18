'use client'

import { useState, useEffect } from 'react'

interface TypewriterProps {
  texts: string[]
  className?: string
  speed?: number
  delay?: number
}

export function Typewriter({ texts, className = '', speed = 50, delay = 2000 }: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    const currentText = texts[currentTextIndex]

    if (isTyping) {
      if (currentCharIndex < currentText.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentText.slice(0, currentCharIndex + 1))
          setCurrentCharIndex(currentCharIndex + 1)
        }, speed)

        return () => clearTimeout(timer)
      } else {
        // Finished typing current text
        setTimeout(() => {
          setIsTyping(false)
        }, delay)
      }
    } else {
      // Deleting text
      if (currentCharIndex > 0) {
        const timer = setTimeout(() => {
          setDisplayText(currentText.slice(0, currentCharIndex - 1))
          setCurrentCharIndex(currentCharIndex - 1)
        }, speed / 2)

        return () => clearTimeout(timer)
      } else {
        // Move to next text (loop back to first when reaching the end)
        const nextIndex = (currentTextIndex + 1) % texts.length
        setCurrentTextIndex(nextIndex)
        setIsTyping(true)
      }
    }
  }, [currentTextIndex, currentCharIndex, isTyping, texts, speed, delay])

  return (
    <div className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </div>
  )
} 