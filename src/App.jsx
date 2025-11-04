import React from 'react'
import Dashboard from './components/Dashboard'
import { Droplets } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AquaScore
              </h1>
              <p className="text-xs text-slate-400">AI-Driven Water Quality Analytics</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
            <span className="text-sm text-green-400 font-medium">Live Monitoring</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Dashboard />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/30 backdrop-blur-sm border-t border-slate-800 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            Built by{' '}
            <span className="text-cyan-400 font-semibold">Sitanshu Sekhar Mohanty</span>
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Environmental ESG Analytics Platform © 2024
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
