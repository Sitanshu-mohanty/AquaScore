import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Droplets, Activity, Thermometer, TrendingUp, AlertCircle } from 'lucide-react'

const Dashboard = () => {
  const [readings, setReadings] = useState({
    ph: 7.2,
    turbidity: 3.5,
    temperature: 22.8
  })

  const [history, setHistory] = useState([])
  const [timestamp, setTimestamp] = useState(new Date())

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newReadings = {
        ph: parseFloat((7.0 + Math.random() * 0.8).toFixed(2)),
        turbidity: parseFloat((2.0 + Math.random() * 3.0).toFixed(2)),
        temperature: parseFloat((20.0 + Math.random() * 5.0).toFixed(2))
      }
      
      setReadings(newReadings)
      setTimestamp(new Date())
      
      setHistory(prev => {
        const newHistory = [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            ...newReadings
          }
        ].slice(-20) // Keep last 20 readings
        return newHistory
      })
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatus = (param, value) => {
    if (param === 'ph') {
      if (value >= 6.5 && value <= 8.5) return { label: 'Optimal', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' }
      if (value >= 6.0 && value <= 9.0) return { label: 'Acceptable', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' }
      return { label: 'Alert', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' }
    }
    if (param === 'turbidity') {
      if (value <= 5) return { label: 'Clear', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' }
      if (value <= 10) return { label: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' }
      return { label: 'High', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' }
    }
    if (param === 'temperature') {
      if (value >= 18 && value <= 25) return { label: 'Normal', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' }
      if (value >= 15 && value <= 28) return { label: 'Acceptable', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' }
      return { label: 'Warning', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' }
    }
  }

  const MetricCard = ({ icon: Icon, title, value, unit, status, trend }) => (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm text-slate-400 font-medium">{title}</h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-white">{value}</span>
              <span className="text-sm text-slate-500">{unit}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.bg} border ${status.border}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${status.color.replace('text', 'bg')} animate-pulse-slow`}></div>
          <span className={`text-xs font-semibold ${status.color}`}>{status.label}</span>
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <TrendingUp className="w-3 h-3" />
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  )

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-xl">
          <p className="text-slate-400 text-xs mb-2">{payload[0].payload.time}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Info Banner */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-blue-400 mb-1">Real-Time Environmental Monitoring</h3>
          <p className="text-xs text-slate-400">
            Tracking water quality parameters for ESG compliance and environmental sustainability
          </p>
        </div>
        <div className="ml-auto text-xs text-slate-500 whitespace-nowrap">
          {timestamp.toLocaleString()}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          icon={Activity}
          title="pH Level"
          value={readings.ph}
          unit="pH"
          status={getStatus('ph', readings.ph)}
          trend="+0.2"
        />
        <MetricCard
          icon={Droplets}
          title="Turbidity"
          value={readings.turbidity}
          unit="NTU"
          status={getStatus('turbidity', readings.turbidity)}
          trend="-0.5"
        />
        <MetricCard
          icon={Thermometer}
          title="Temperature"
          value={readings.temperature}
          unit="°C"
          status={getStatus('temperature', readings.temperature)}
          trend="+1.2"
        />
      </div>

      {/* Chart */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-1">Historical Trends</h3>
          <p className="text-sm text-slate-400">Live water quality measurements over time</p>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              style={{ fontSize: '12px' }}
              tick={{ fill: '#64748b' }}
            />
            <YAxis 
              stroke="#64748b" 
              style={{ fontSize: '12px' }}
              tick={{ fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="ph" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
              name="pH"
            />
            <Line 
              type="monotone" 
              dataKey="turbidity" 
              stroke="#06b6d4" 
              strokeWidth={2}
              dot={false}
              name="Turbidity"
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              dot={false}
              name="Temperature"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ESG Score Card */}
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">Environmental Score</h3>
            <p className="text-sm text-slate-400 mb-4">Overall water quality rating based on current metrics</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-white">92</span>
              <span className="text-xl text-green-400">/100</span>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-green-500/20 px-4 py-2 rounded-lg mb-2">
              <span className="text-2xl font-bold text-green-400">A+</span>
            </div>
            <p className="text-xs text-slate-400">Excellent Quality</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
