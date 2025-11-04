import React from 'react'
import Dashboard from './components/Dashboard'
import { Droplets, Waves } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col custom-scrollbar">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-400"></div>
      </div>

      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg blur opacity-75"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 p-2 sm:p-2.5 rounded-lg">
                  <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">
                  AquaScore
                </h1>
                <p className="text-xs text-slate-400 hidden sm:block">AI-Driven Water Quality Analytics</p>
              </div>
            </div>

            {/* Live Status Badge */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-sm">
              <div className="status-dot bg-green-500"></div>
              <span className="text-xs sm:text-sm text-green-400 font-semibold">Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <Dashboard />
      </main>

      {/* Footer */}
      <footer className="glass border-t border-slate-800/50 py-6 sm:py-8 mt-auto relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Creator Info */}
            <div className="text-center sm:text-left">
              <p className="text-slate-400 text-sm">
                Built by{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold">
                  Sitanshu Sekhar Mohanty
                </span>
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Environmental ESG Analytics Platform © 2024
              </p>
            </div>

            {/* Icon */}
            <div className="opacity-50">
              <Waves className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
