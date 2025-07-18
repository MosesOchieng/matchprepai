'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  PlayIcon, 
  EyeIcon, 
  ChartBarIcon,
  CpuChipIcon,
  VideoCameraIcon,
  LightBulbIcon,
  TrophyIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { Typewriter } from '@/components/ui/Typewriter'
import { FloatingTablet } from '@/components/landing/FloatingTablet'
import { FeatureGrid } from '@/components/landing/FeatureGrid'
import { AIRecommendations } from '@/components/landing/AIRecommendations'
import { LiveMatchStats } from '@/components/landing/LiveMatchStats'


export default function LandingPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const heroTexts = [
    "Every coach deserves more than just instincts.",
    "They deserve insight — tactical, sharp, and always one step ahead.",
    "Football isn't just played on the pitch.",
    "It's won in preparation. It's shaped by decisions made in seconds.",
    "But until now, no assistant could see the game like a coach.",
    "No system could learn your opponent, simulate outcomes, and think tactically in real time.",
    "That's why we built Match Prep AI."
  ]

  const features = [
    {
      icon: CpuChipIcon,
      title: "PRE-MATCH PREPARATION",
      description: "Analyze opponents, generate match plans, simulate outcomes",
      video: "/videos/pre-match.mp4"
    },
    {
      icon: EyeIcon,
      title: "LIVE MATCH INTELLIGENCE", 
      description: "Monitor tactics live, track players, get real-time suggestions",
      video: "/videos/live-match.mp4"
    },
    {
      icon: ChartBarIcon,
      title: "POST-MATCH ANALYSIS",
      description: "Auto-tag footage, generate reports, build training sessions",
      video: "/videos/post-match.mp4"
    }
  ]

  const levels = [
    {
      icon: TrophyIcon,
      title: "Academies",
      description: "Build player IQ with AI insights",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: UserGroupIcon,
      title: "Semi-Pro Clubs", 
      description: "Get a strategic edge on match day",
      color: "from-green-500 to-blue-600"
    },
    {
      icon: GlobeAltIcon,
      title: "Elite Teams",
      description: "Augment your analyst team",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: TrophyIcon,
      title: "National Federations",
      description: "Monitor squads & train coaches nationwide",
      color: "from-orange-500 to-red-600"
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-green-900/20" />
          <div className="absolute inset-0 bg-[url('/images/stadium-bg.jpg')] bg-cover bg-center opacity-20" />
          
          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 border border-blue-400/30 rounded-full"
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
            className="absolute bottom-20 right-20 w-24 h-24 border border-green-400/30 rounded-full"
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

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center text-center">
            {/* Logo - Centered at Top */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-4">
                <img 
                  src="/logo.png" 
                  alt="Match Prep AI Logo" 
                  className="h-16 w-auto"
                />
                <span className="text-white font-bold text-3xl">Match Prep AI</span>
              </div>
            </motion.div>

            {/* Text Content - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8 max-w-4xl"
            >
              <Typewriter 
                texts={heroTexts}
                className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
              />
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 1 }}
                className="text-lg md:text-xl text-green-300 font-semibold"
              >
                Every coach deserves a tactical brain that never sleeps.
              </motion.p>
            </motion.div>

            {/* Match Video - Centered Below Text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="relative mb-8 max-w-2xl w-full"
            >
              <div className="relative">
                <video 
                  src="/match.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                {/* Overlay with stats */}
                <div className="absolute top-4 left-4 bg-black/80 text-white px-4 py-2 rounded-lg">
                  <div className="text-sm font-semibold">Live Analysis</div>
                  <div className="text-xs text-gray-300">Real-time insights</div>
                </div>
                <div className="absolute bottom-4 right-4 bg-green-500/90 text-white px-3 py-1 rounded-lg text-sm font-bold">
                  AI Active
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons - Centered at Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                <PlayIcon className="inline-block w-5 h-5 mr-2" />
                Try the Demo
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300">
                Request Early Access
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What It Does Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Genius Under the Hood
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              See how Match Prep AI transforms raw video into tactical intelligence
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/30 via-green-500/30 to-blue-500/30 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
              {[
                { 
                  icon: VideoCameraIcon, 
                  title: "Upload & Stream",
                  text: "Upload match video or stream live feed",
                  color: "from-blue-500 to-cyan-500",
                  step: "01"
                },
                { 
                  icon: EyeIcon, 
                  title: "AI Detection",
                  text: "AI detects players, shapes, ball, tempo",
                  color: "from-cyan-500 to-green-500",
                  step: "02"
                },
                { 
                  icon: CpuChipIcon, 
                  title: "Pattern Analysis",
                  text: "Match Prep AI analyzes data & patterns",
                  color: "from-green-500 to-emerald-500",
                  step: "03"
                },
                { 
                  icon: ChatBubbleLeftRightIcon, 
                  title: "Smart Suggestions",
                  text: "Assistant suggests changes, subs, formations",
                  color: "from-emerald-500 to-teal-500",
                  step: "04"
                },
                { 
                  icon: ChartBarIcon, 
                  title: "Auto Reports",
                  text: "Post-match reports + training plans auto-generated",
                  color: "from-teal-500 to-blue-500",
                  step: "05"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group relative"
                >
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 h-full relative overflow-hidden">
                    {/* Background glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {step.step}
                    </div>
                    
                    <div className="relative z-10 text-center">
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${step.color} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                        {step.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {step.text}
                      </p>
                      
                      {/* Hover effect indicator */}
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connection arrow for mobile */}
                  {index < 4 && (
                    <div className="md:hidden flex justify-center mt-4">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-green-500"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mt-12"
            >
              <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-3">
                  Ready to Experience the Magic?
                </h3>
                <p className="text-gray-300 mb-4">
                  See how Match Prep AI transforms your coaching in real-time
                </p>
                <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105">
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              See Match Prep AI In Action
            </h2>
            <p className="text-xl text-gray-300">
              Experience real-time tactical intelligence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Analysis Video */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-3 max-h-64 flex flex-col">
                <h3 className="text-white font-bold text-base mb-2 text-center">Opponent Analysis</h3>
                <div className="flex-1 mb-3 max-h-32">
                  <video 
                    src="/analysis.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-300 mb-1">
                    AI-powered scouting & pattern recognition
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-xs text-green-400">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Live insights</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tactics Video */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-3 max-h-64 flex flex-col">
                <h3 className="text-white font-bold text-base mb-2 text-center">Tactical Planning</h3>
                <div className="flex-1 mb-3 max-h-32">
                  <video 
                    src="/tactics.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-300 mb-1">
                    Dynamic formations & strategy optimization
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-xs text-blue-400">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>Smart recommendations</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Position Video */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-3 max-h-64 flex flex-col">
                <h3 className="text-white font-bold text-base mb-2 text-center">Player Positioning</h3>
                <div className="flex-1 mb-3 max-h-32">
                  <video 
                    src="/position.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-300 mb-1">
                    Individual tracking & positioning analysis
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-xs text-purple-400">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                    <span>Performance data</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Tablet - Keep existing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-3 max-h-64 flex flex-col">
                <h3 className="text-white font-bold text-base mb-2 text-center">Interactive Demo</h3>
                <div className="flex-1 mb-3 max-h-32">
                  <FloatingTablet />
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-300 mb-1">
                    Full Match Prep AI interface experience
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-xs text-orange-400">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
                    <span>Try it now</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Recommendations Section */}
      <section className="py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Live AI Recommendations
            </h3>
            <p className="text-gray-300 text-sm">
              Watch as Match Prep AI analyzes the match and provides real-time tactical insights
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="xl:col-span-2"
            >
              <AIRecommendations />
            </motion.div>

            {/* Live Match Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="xl:col-span-1"
            >
              <LiveMatchStats />
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Every Level Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              For Every Level of the Game
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {levels.map((level, index) => (
              <motion.div
                key={level.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${level.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <level.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{level.title}</h3>
                <p className="text-gray-300">{level.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Features That Change the Game
            </h2>
          </motion.div>

          <FeatureGrid />
        </div>
      </section>



      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Great coaching wins games. Genius coaching changes them.
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                Get Early Access
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300">
                Join Waitlist
              </button>
            </div>
            
            <p className="text-gray-300 text-lg">
              Get early access to the world's smartest football assistant.<br />
              Let your team play. Let your mind lead.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">YouTube</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-300">
              🧠⚽ Built for coaches. Powered by Match Prep AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 