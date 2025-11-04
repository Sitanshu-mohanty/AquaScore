import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Droplets, Activity, Thermometer, TrendingUp, TrendingDown, AlertCircle, Award, BarChart3 } from 'lucide-react'

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
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            ...newReadings
          }
        ].slice(-20)
        return newHistory
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatus = (param, value) => {
    if (param === 'ph') {
      if (value >= 6.5 && value <= 8.5) return { 
        label: 'Optimal', 
        color: 'text-green-400', 
        bg: 'bg-green-500/10', 
        border: 'border-green-500/30',
        icon: TrendingUp
      }
      if (value >= 6.0 && value <= 9.0) return { 
        label: 'Acceptable', 
        color: 'text-yellow-400', 
        bg: 'bg-yellow-500/10', 
        border: 'border-yellow-500/30',
        icon: Activity
      }
      return { 
        label: 'Alert', 
        color: 'text-red-400', 
        bg: 'bg-red-500/10', 
        border: 'border-red-500/30',
        icon: AlertCircle
      }
    }
    if (param === 'turbidity') {
      if (value <= 5) return { 
        label: 'Clear', 
        color: 'text-green-400', 
        bg: 'bg-green-500/10', 
        border: 'border-green-500/30',
        icon: TrendingDown
      }
      if (value <= 10) return { 
        label: 'Moderate', 
        color: 'text-yellow-400', 
        bg: 'bg-yellow-500/10', 
        border: 'border-yellow-500/30',
        icon: Activity
      }
      return { 
        label: 'High', 
        color: 'text-red-400', 
        bg: 'bg-red-500/10', 
        border: 'border-red-500/30',
        icon: TrendingUp
      }
    }
    if (param === 'temperature') {
      if (value >= 18 && value <= 25) return { 
        label: 'Normal', 
        color: 'text-green-400', 
        bg: 'bg-green-500/10', 
        border: 'border-green-500/30',
        icon: Activity
      }
      if (value >= 15 && value <= 28) return { 
        label: 'Acceptable', 
        color: 'text-yellow-400', 
        bg: 'bg-yellow-500/10', 
        border: 'border-yellow-500/30',
        icon: Activity
      }
      return { 
        label: 'Warning', 
        color: 'text-red-400', 
        bg: 'bg-red-500/10', 
        border: 'border-red-500/30',
        icon: AlertCircle
      }
    }
  }

  const MetricCard = ({ icon: Icon, title, value, unit, status, trend, gradient }) => (
    <div className="metric-card group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className={`relative p-3 rounded-xl ${gradient} shadow-lg`}>
            <Icon className="w-6 h-6 text-white relative z-10" />
          </div>
          <div className="flex-1">
            <h3 className="text-xs sm:text-sm text-slate-400 font-medium mb-1">{title}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-white">{value}</span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">{unit}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
        <div className={`status-badge ${status.bg} border ${status.border}`}>
          <div className={`status-dot ${status.color.replace('text', 'bg')}`}></div>
          <span className={status.color}>{status.label}</span>
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            {trend.startsWith('+') ? (
              <TrendingUp className="w-3 h-3 text-green-400" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-400" />
            )}
            <span className={trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
              {trend}
            </span>
          </div>
        )}
      </div>
    </div>
  )

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass rounded-lg p-3 shadow-xl border border-slate-700/50">
          <p className="text-slate-400 text-xs mb-2 font-medium">{payload[0].payload.time}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <span className="text-xs text-slate-400">{entry.name}:</span>
                <span className="text-sm font-semibold" style={{ color: entry.color }}>
                  {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Info Banner */}
      <div className="glass-hover rounded-xl p-4 sm:p-5 border-l-4 border-blue-500">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-blue-400 mb-1">Real-Time Environmental Monitoring</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Tracking water quality parameters for ESG compliance and environmental sustainability
            </p>
          </div>
          <div className="hidden sm:block text-xs text-slate-500 whitespace-nowrap">
            {timestamp.toLocaleString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              month: 'short',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <MetricCard
          icon={Activity}
          title="pH Level"
          value={readings.ph}
          unit="pH"
          status={getStatus('ph', readings.ph)}
          trend="+0.2"
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <MetricCard
          icon={Droplets}
          title="Turbidity"
          value={readings.turbidity}
          unit="NTU"
          status={getStatus('turbidity', readings.turbidity)}
          trend="-0.5"
          gradient="bg-gradient-to-br from-cyan-500 to-cyan-600"
        />
        <MetricCard
          icon={Thermometer}
          title="Temperature"
          value={readings.temperature}
          unit="°C"
          status={getStatus('temperature', readings.temperature)}
          trend="+1.2"
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      {/* Chart */}
      <div className="chart-container">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base sm:text-lg font-semibold text-white">Historical Trends</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">Live water quality measurements over time</p>
          </div>
        </div>
        
        <div className="w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height={300} minWidth={300}>
            <LineChart data={history} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" strokeOpacity={0.5} />
              <XAxis 
                dataKey="time" 
                stroke="#64748b" 
                style={{ fontSize: '11px' }}
                tick={{ fill: '#64748b' }}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#64748b" 
                style={{ fontSize: '11px' }}
                tick={{ fill: '#64748b' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="ph" 
                stroke="#3b82f6" 
                strokeWidth={2.5}
                dot={false}
                name="pH"
                activeDot={{ r: 6, fill: '#3b82f6' }}
              />
              <Line 
                type="monotone" 
                dataKey="turbidity" 
                stroke="#06b6d4" 
                strokeWidth={2.5}
                dot={false}
                name="Turbidity"
                activeDot={{ r: 6, fill: '#06b6d4' }}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#8b5cf6" 
                strokeWidth={2.5}
                dot={false}
                name="Temperature"
                activeDot={{ r: 6, fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ESG Score Card */}
      <div className="metric-card bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 border-green-500/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-green-400" />
              <h3 className="text-base sm:text-lg font-semibold text-green-400">Environmental Score</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mb-4">
              Overall water quality rating based on current metrics
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-bold text-white">92</span>
              <span className="text-xl sm:text-2xl text-green-400 font-semibold">/100</span>
            </div>
          </div>
          <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-2 w-full sm:w-auto">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 px-6 py-3 rounded-xl border border-green-500/30 flex-1 sm:flex-none text-center">
              <span className="text-3xl sm:text-4xl font-bold text-green-400">A+</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium flex-1 sm:flex-none text-center">
              Excellent Quality
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/50">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Compliance Progress</span>
            <span className="font-semibold text-green-400">92%</span>
          </div>
          <div className="w-full bg-slate-800/50 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: '92%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
