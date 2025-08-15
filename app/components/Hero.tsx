'use client'

import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon, 
  BoltIcon, 
  CodeBracketIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const aiTools = [
  'Cursor', 'Claude', 'OpenAI', 'Lovable', 'Bolt.new', 
  'Replit', 'GitHub Copilot', 'Windsurf', 'Cline', 'v0'
]

const benefits = [
  'Stop hackers before they find you',
  'Break out of AI debugging loops', 
  'Make your app actually fast',
  'Ship like a pro'
]

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
                <SparklesIcon className="h-4 w-4" />
                <span>🚀 Product Hunt Launch Special - 30% Off!</span>
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl"
            >
              Ship AI Code with{' '}
              <span className="text-gradient">A.I. Fixxer</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl"
            >
              Upload your code. Find all the problems. Fix issues with one click.
              <br className="hidden sm:block" />
              A.I. Fixxer spots issues like a pro and explains them like a friend - no terminal required.
            </motion.p>

            {/* Current Reality vs Fix */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-12 max-w-4xl"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-4">Current Reality:</h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• AI wrote your code, but you don't know what could break</li>
                    <li>• Every code change feels like Russian roulette</li>
                    <li>• You need a developer to tell you if it's production-ready</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">The Fix:</h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Comprehensive security & performance analysis</li>
                    <li>• One-click fixes for common vulnerabilities</li>
                    <li>• Production readiness checklist</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto mt-12 max-w-4xl"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={benefit} className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-900">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button 
                onClick={() => {
                  const uploadSection = document.getElementById('upload')
                  uploadSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <BoltIcon className="h-5 w-5 mr-2" />
                Start Scanning Now
              </button>
              <button 
                onClick={() => {
                  alert('Demo: This would show a sample code analysis with mock vulnerabilities and performance issues. Upload your own files to see real results!')
                }}
                className="btn-secondary text-lg px-8 py-4"
              >
                <CodeBracketIcon className="h-5 w-5 mr-2" />
                View Demo
              </button>
            </motion.div>

            {/* AI Tools Integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16"
            >
              <p className="text-sm font-medium text-gray-500 mb-6">Works with code generated by:</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {aiTools.map((tool, index) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200"
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-6 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>
              <blockquote className="text-gray-700 italic">
                "A.I. Fixxer found a key that I didn't know that cursor copied into a tmp/validation file. 
                If A.I. Fixxer didn't find that, it would've been disastrous for my project. This is an awesome product 💯"
              </blockquote>
              <p className="mt-3 text-sm font-medium text-gray-600">— Sam ✓ VERIFIED PURCHASE</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}