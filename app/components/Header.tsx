'use client'

import { useState } from 'react'
import { Bars3Icon, XMarkIcon, ShieldCheckIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

interface HeaderProps {
  onBackToHome?: () => void
}

export default function Header({ onBackToHome }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Documentation', href: '#docs' },
    { name: 'Support', href: '#support' },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
            )}
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center">
                <img src="/images/logo.svg" alt="A.I. Fixxer Logo" className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">A.I. Fixxer</h1>
                <p className="text-xs text-gray-500">AI Code Analysis</p>
              </div>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  const element = document.querySelector(item.href)
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden sm:block text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
              Sign In
            </button>
            <button 
              onClick={() => {
                const uploadSection = document.getElementById('upload')
                uploadSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary text-sm"
            >
              Get Started
            </button>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                type="button"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    const element = document.querySelector(item.href)
                    element?.scrollIntoView({ behavior: 'smooth' })
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <a
                  href="#signin"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg"
                >
                  Sign In
                </a>
                <button 
                  onClick={() => {
                    const uploadSection = document.getElementById('upload')
                    uploadSection?.scrollIntoView({ behavior: 'smooth' })
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 mt-2 text-base font-medium bg-primary-600 text-white hover:bg-primary-700 rounded-lg"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}