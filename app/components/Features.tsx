'use client'

import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  BoltIcon,
  CodeBracketIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon,
  EyeIcon,
  ClockIcon,
  CpuChipIcon,
  LockClosedIcon,
  DocumentCheckIcon,
  SparklesIcon,
  CloudIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    category: 'Security Analysis',
    icon: ShieldCheckIcon,
    color: 'bg-red-50 text-red-600',
    items: [
      {
        title: 'Stop hackers before they find you',
        description: 'Catches the security holes AI tools love to create. One-click fixes for common vulnerabilities.',
        icon: LockClosedIcon
      },
      {
        title: 'Exposed API Keys Detection',
        description: 'Automatically finds hardcoded secrets, API keys, and sensitive data in your codebase.',
        icon: EyeIcon
      },
      {
        title: 'SQL Injection Prevention',
        description: 'Identifies potential SQL injection vulnerabilities and provides secure coding suggestions.',
        icon: ShieldCheckIcon
      }
    ]
  },
  {
    category: 'Performance Optimization',
    icon: BoltIcon,
    color: 'bg-yellow-50 text-yellow-600',
    items: [
      {
        title: 'Make your app actually fast',
        description: 'Find out why pages take 8 seconds to load. Auto-implement caching and other quick wins.',
        icon: BoltIcon
      },
      {
        title: 'Performance Bottlenecks',
        description: 'Identifies slow database queries, inefficient algorithms, and memory leaks.',
        icon: CpuChipIcon
      },
      {
        title: 'Optimization Suggestions',
        description: 'Get specific recommendations for improving load times and resource usage.',
        icon: SparklesIcon
      }
    ]
  },
  {
    category: 'Code Quality',
    icon: CodeBracketIcon,
    color: 'bg-blue-50 text-blue-600',
    items: [
      {
        title: 'Break out of AI debugging loops',
        description: 'Identifies duplicated code and structural issues that slow down AI coding sessions.',
        icon: CodeBracketIcon
      },
      {
        title: 'Clean Code Standards',
        description: 'Enforces best practices and coding standards for maintainable, readable code.',
        icon: DocumentCheckIcon
      },
      {
        title: 'Auto-fixes Common Problems',
        description: 'Automatically resolves common issues to create clean code that AI agents can work with easily.',
        icon: WrenchScrewdriverIcon
      }
    ]
  },
  {
    category: 'Launch Readiness',
    icon: CheckCircleIcon,
    color: 'bg-green-50 text-green-600',
    items: [
      {
        title: 'Ship like a pro',
        description: 'Checks for proper payment integrations, user analytics, rate limiting, and other essentials.',
        icon: CheckCircleIcon
      },
      {
        title: 'Production Checklist',
        description: 'Comprehensive checklist covering terms of service, privacy policy, and compliance requirements.',
        icon: ClockIcon
      },
      {
        title: 'Zero Setup Required',
        description: 'No terminal, no docker, no special tools or config files. Works instantly in your browser.',
        icon: CloudIcon
      }
    ]
  }
]

const stats = [
  { label: 'Security Vulnerabilities Detected', value: '10,000+' },
  { label: 'Performance Issues Fixed', value: '5,000+' },
  { label: 'Lines of Code Analyzed', value: '1M+' },
  { label: 'Happy Developers', value: '2,000+' }
]

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Comprehensive Code Analysis
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            A.I. Fixxer provides end-to-end analysis of your AI-generated code, 
            ensuring it's secure, fast, and production-ready.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="space-y-20">
          {features.map((category, categoryIndex) => {
            const CategoryIcon = category.icon
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className="text-center mb-12">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${category.color} mb-4`}>
                    <CategoryIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.category}</h3>
                </div>

                {/* Feature Items */}
                <div className="grid md:grid-cols-3 gap-8">
                  {category.items.map((item, itemIndex) => {
                    const ItemIcon = item.icon
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                        className="card-hover group"
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                            <ItemIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              {item.title}
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-200"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose A.I. Fixxer?
            </h3>
            <p className="text-lg text-gray-600">
              Built specifically for AI-generated code with unique challenges and requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">AI-First Approach</h4>
              <p className="text-gray-600 text-sm">
                Designed specifically for code generated by AI tools like Cursor, Claude, and GitHub Copilot
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <WrenchScrewdriverIcon className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">One-Click Fixes</h4>
              <p className="text-gray-600 text-sm">
                Automatically fix common issues with AI-generated prompts and code suggestions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CloudIcon className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Zero Setup</h4>
              <p className="text-gray-600 text-sm">
                No installation, configuration, or technical expertise required. Works in your browser
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <button 
            onClick={() => {
              const uploadSection = document.getElementById('upload')
              uploadSection?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Start Your Free Scan
          </button>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required • Instant results • 30-day money-back guarantee
          </p>
        </motion.div>
      </div>
    </section>
  )
}