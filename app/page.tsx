'use client'

import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import UploadSection from './components/UploadSection'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home')
  const [scanResults, setScanResults] = useState(null)

  const handleScanComplete = (results: any) => {
    setScanResults(results)
    setCurrentView('dashboard')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setScanResults(null)
  }

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onBackToHome={handleBackToHome} />
        <Dashboard scanResults={scanResults} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section id="home">
        <Hero />
      </section>
      <section id="upload">
        <UploadSection onScanComplete={handleScanComplete} />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <Footer />
    </div>
  )
}