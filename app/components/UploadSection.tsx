'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CloudArrowUpIcon,
  DocumentIcon,
  FolderIcon,
  XMarkIcon,
  PlayIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface UploadSectionProps {
  onScanComplete: (results: any) => void
}

interface UploadedFile {
  file: File
  id: string
  status: 'pending' | 'scanning' | 'complete' | 'error'
}

export default function UploadSection({ onScanComplete }: UploadSectionProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending' as const
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/javascript': ['.js', '.jsx', '.ts', '.tsx'],
      'text/python': ['.py'],
      'text/java': ['.java'],
      'text/csharp': ['.cs'],
      'text/cpp': ['.cpp', '.c', '.h'],
      'text/php': ['.php'],
      'text/ruby': ['.rb'],
      'text/go': ['.go'],
      'text/rust': ['.rs'],
      'application/json': ['.json'],
      'text/yaml': ['.yml', '.yaml'],
      'text/xml': ['.xml'],
      'text/html': ['.html', '.htm'],
      'text/css': ['.css'],
      'text/plain': ['.txt', '.md', '.env']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true
  })

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id))
  }

  const startScan = async () => {
    if (uploadedFiles.length === 0) return

    setIsScanning(true)
    setScanProgress(0)

    // Simulate scanning process
    const totalFiles = uploadedFiles.length
    for (let i = 0; i < totalFiles; i++) {
      setUploadedFiles(prev => 
        prev.map((f, index) => 
          index === i ? { ...f, status: 'scanning' } : f
        )
      )
      
      // Simulate scan time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      
      setUploadedFiles(prev => 
        prev.map((f, index) => 
          index === i ? { ...f, status: 'complete' } : f
        )
      )
      
      setScanProgress(((i + 1) / totalFiles) * 100)
    }

    // Generate mock scan results
    const mockResults = {
      projectName: 'my-ai-app',
      lastScanned: new Date().toISOString(),
      overallScore: 89,
      scores: {
        security: 94,
        performance: 87,
        codeQuality: 91,
        launchChecklist: 70
      },
      issues: [
        {
          id: '1',
          type: 'security',
          severity: 'high',
          title: 'Exposed API Key',
          description: 'API key found in config.js line 23',
          file: 'config.js',
          line: 23,
          fixable: true
        },
        {
          id: '2',
          type: 'security',
          severity: 'medium',
          title: 'SQL Injection Risk',
          description: 'Potential SQL injection vulnerability in auth.js line 45',
          file: 'auth.js',
          line: 45,
          fixable: true
        },
        {
          id: '3',
          type: 'launch',
          severity: 'medium',
          title: 'Missing Rate Limiting',
          description: 'API endpoints lack rate limiting protection',
          file: 'api/routes.js',
          line: 12,
          fixable: false
        }
      ],
      checklist: {
        completed: ['Payment Integration', 'User Analytics'],
        pending: ['Rate Limiting', 'Terms of Service', 'Privacy Policy']
      }
    }

    setTimeout(() => {
      setIsScanning(false)
      onScanComplete(mockResults)
    }, 1000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <section id="upload" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Scan Your Code Now
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Upload your files and get instant security, performance, and quality analysis
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div
              {...getRootProps()}
              className={`
                relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200
                ${isDragActive 
                  ? 'border-primary-400 bg-primary-50' 
                  : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                }
              `}
            >
              <input {...getInputProps()} />
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {isDragActive ? 'Drop files here' : 'Upload your code files'}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop files here, or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Supports: JS, TS, Python, Java, C#, PHP, Go, Rust and more (Max 10MB per file)
              </p>
            </div>
          </motion.div>

          {/* Uploaded Files */}
          <AnimatePresence>
            {uploadedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Uploaded Files ({uploadedFiles.length})
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {uploadedFiles.map((uploadedFile) => (
                    <motion.div
                      key={uploadedFile.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex items-center space-x-3">
                        <DocumentIcon className="h-8 w-8 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {uploadedFile.file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(uploadedFile.file.size)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {uploadedFile.status === 'pending' && (
                          <span className="badge bg-gray-100 text-gray-800">Pending</span>
                        )}
                        {uploadedFile.status === 'scanning' && (
                          <span className="badge bg-blue-100 text-blue-800">Scanning...</span>
                        )}
                        {uploadedFile.status === 'complete' && (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        )}
                        {uploadedFile.status === 'error' && (
                          <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                        )}
                        {!isScanning && (
                          <button
                            onClick={() => removeFile(uploadedFile.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scan Progress */}
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Scanning your code...</h3>
                  <span className="text-sm text-gray-500">{Math.round(scanProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-primary-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Analyzing security vulnerabilities, performance issues, and code quality...
                </p>
              </div>
            </motion.div>
          )}

          {/* Scan Button */}
          {uploadedFiles.length > 0 && !isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <button
                onClick={startScan}
                className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <PlayIcon className="h-5 w-5 mr-2" />
                Start Security Scan
              </button>
              <p className="mt-3 text-sm text-gray-500">
                This will analyze your code for security vulnerabilities, performance issues, and quality problems
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}