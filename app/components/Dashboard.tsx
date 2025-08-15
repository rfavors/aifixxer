'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  BoltIcon,
  CodeBracketIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  ChevronRightIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface DashboardProps {
  scanResults: any
}

const COLORS = {
  security: '#ef4444',
  performance: '#f59e0b',
  codeQuality: '#3b82f6',
  launchChecklist: '#8b5cf6'
}

const severityColors = {
  high: 'text-red-600 bg-red-50 border-red-200',
  medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  low: 'text-blue-600 bg-blue-50 border-blue-200'
}

export default function Dashboard({ scanResults }: DashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null)

  if (!scanResults) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="mt-4 text-gray-600">Loading scan results...</p>
        </div>
      </div>
    )
  }

  const { projectName, lastScanned, overallScore, scores, issues, checklist } = scanResults

  const chartData = [
    { name: 'Security', value: scores.security, color: COLORS.security },
    { name: 'Performance', value: scores.performance, color: COLORS.performance },
    { name: 'Code Quality', value: scores.codeQuality, color: COLORS.codeQuality },
    { name: 'Launch Ready', value: scores.launchChecklist, color: COLORS.launchChecklist }
  ]

  const issuesByType = {
    security: issues.filter((i: any) => i.type === 'security'),
    performance: issues.filter((i: any) => i.type === 'performance'),
    quality: issues.filter((i: any) => i.type === 'quality'),
    launch: issues.filter((i: any) => i.type === 'launch')
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ShieldCheckIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon, count: issuesByType.security.length },
    { id: 'performance', name: 'Performance', icon: BoltIcon, count: issuesByType.performance.length },
    { id: 'quality', name: 'Code Quality', icon: CodeBracketIcon, count: issuesByType.quality.length },
    { id: 'launch', name: 'Launch Checklist', icon: CheckCircleIcon, count: issuesByType.launch.length }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 70) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const fixIssue = async (issueId: string) => {
    // Simulate fixing an issue
    console.log('Fixing issue:', issueId)
    
    // Show a realistic fix simulation
    const issue = issues.find((i: any) => i.id === issueId)
    if (issue) {
      alert(`🔧 Applying fix for "${issue.title}"...\n\nThis would automatically:\n• Update ${issue.file} at line ${issue.line}\n• Apply security best practices\n• Generate a commit with the fix\n\nIn the full version, this fix would be applied instantly!`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{projectName}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Last scanned {new Date(lastScanned).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-600">A.I. Fixxer Verified</span>
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-green-600">{overallScore}/100</span>
                  <p className="text-sm text-gray-500">Production Ready</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            <nav className="flex space-x-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${selectedTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {selectedTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Score Cards */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {chartData.map((item) => (
                    <div key={item.name} className="card">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(item.value)} ${getScoreColor(item.value)}`}>
                          {item.value}/100
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${item.value}%`, 
                            backgroundColor: item.color 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Issues */}
                <div className="card">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Critical Issues</h3>
                  <div className="space-y-3">
                    {issues.slice(0, 3).map((issue: any) => (
                      <div key={issue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {issue.severity === 'high' && <XCircleIcon className="h-5 w-5 text-red-500" />}
                          {issue.severity === 'medium' && <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />}
                          {issue.severity === 'low' && <ExclamationTriangleIcon className="h-5 w-5 text-blue-500" />}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{issue.title}</p>
                            <p className="text-xs text-gray-500">{issue.file}:{issue.line}</p>
                          </div>
                        </div>
                        {issue.fixable && (
                          <button
                            onClick={() => fixIssue(issue.id)}
                            className="btn-primary text-xs px-3 py-1"
                          >
                            Fix
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chart and Checklist */}
              <div className="space-y-6">
                {/* Score Chart */}
                <div className="card">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Score Breakdown</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Launch Checklist */}
                <div className="card">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Launch Checklist</h3>
                  <div className="space-y-3">
                    {checklist.completed.map((item: string) => (
                      <div key={item} className="flex items-center space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-gray-900">{item}</span>
                      </div>
                    ))}
                    {checklist.pending.map((item: string) => (
                      <div key={item} className="flex items-center space-x-3">
                        <ClockIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-500">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {selectedTab === 'security' && (
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Security Issues</h2>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(scores.security)} ${getScoreColor(scores.security)}`}>
                    Score: {scores.security}/100
                  </div>
                </div>
                <div className="space-y-4">
                  {issuesByType.security.map((issue: any) => (
                    <div key={issue.id} className={`border rounded-lg p-4 ${severityColors[issue.severity as keyof typeof severityColors]}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            {expandedIssue === issue.id ? (
                              <ChevronDownIcon className="h-5 w-5" />
                            ) : (
                              <ChevronRightIcon className="h-5 w-5" />
                            )}
                          </button>
                          <div>
                            <h3 className="font-medium">{issue.title}</h3>
                            <p className="text-sm opacity-75">{issue.file}:{issue.line}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="badge">{issue.severity}</span>
                          {issue.fixable && (
                            <button
                              onClick={() => fixIssue(issue.id)}
                              className="btn-primary text-sm px-3 py-1"
                            >
                              <WrenchScrewdriverIcon className="h-4 w-4 mr-1" />
                              Fix
                            </button>
                          )}
                        </div>
                      </div>
                      {expandedIssue === issue.id && (
                        <div className="mt-4 pt-4 border-t border-current border-opacity-20">
                          <p className="text-sm">{issue.description}</p>
                          {issue.fixable && (
                            <div className="mt-3 p-3 bg-white bg-opacity-50 rounded">
                              <p className="text-sm font-medium">Suggested Fix:</p>
                              <p className="text-sm mt-1">Move API key to environment variables and use process.env.API_KEY</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other tabs would follow similar patterns */}
          {(selectedTab === 'performance' || selectedTab === 'quality' || selectedTab === 'launch') && (
            <div className="card text-center py-12">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Analysis
              </h3>
              <p className="text-gray-600">
                Detailed {selectedTab} analysis will be displayed here.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}