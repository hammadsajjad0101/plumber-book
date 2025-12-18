'use client';

import Link from 'next/link';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 4200, bookings: 28 },
    { month: 'Feb', revenue: 3800, bookings: 24 },
    { month: 'Mar', revenue: 5200, bookings: 35 },
    { month: 'Apr', revenue: 6100, bookings: 42 },
    { month: 'May', revenue: 7400, bookings: 51 },
    { month: 'Jun', revenue: 6800, bookings: 47 },
  ];

  const serviceData = [
    { name: 'Emergency Repairs', value: 35, color: '#ef4444' },
    { name: 'Installations', value: 25, color: '#3b82f6' },
    { name: 'Maintenance', value: 20, color: '#10b981' },
    { name: 'Inspections', value: 12, color: '#f59e0b' },
    { name: 'Other', value: 8, color: '#8b5cf6' },
  ];

  const performanceData = [
    { metric: 'Response Time', value: 22, target: 30, unit: 'min' },
    { metric: 'Completion Rate', value: 96, target: 90, unit: '%' },
    { metric: 'Customer Rating', value: 4.9, target: 4.5, unit: '/5' },
    { metric: 'Repeat Customers', value: 68, target: 60, unit: '%' },
  ];

  const weeklyBookings = [
    { day: 'Mon', bookings: 8 },
    { day: 'Tue', bookings: 12 },
    { day: 'Wed', bookings: 10 },
    { day: 'Thu', bookings: 15 },
    { day: 'Fri', bookings: 14 },
    { day: 'Sat', bookings: 11 },
    { day: 'Sun', bookings: 6 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-[1600px] mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">P</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              PlumberBook
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="px-4 py-2 text-slate-300 hover:text-blue-400 transition-colors font-medium">
              ← Back to Dashboard
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-100 mb-4">Analytics & Insights</h1>
          <p className="text-xl text-slate-400">Track your business performance and growth</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Revenue', value: '$34,500', change: '+12.5%', positive: true },
            { label: 'Total Bookings', value: '227', change: '+18.2%', positive: true },
            { label: 'Avg Response Time', value: '22 min', change: '-8.3%', positive: true },
            { label: 'Customer Rating', value: '4.9/5', change: '+2.1%', positive: true },
          ].map((metric, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all"
            >
              <p className="text-sm text-slate-400 mb-2">{metric.label}</p>
              <p className="text-3xl font-bold text-slate-100 mb-2">{metric.value}</p>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.change}
                </span>
                <span className="text-xs text-slate-500">vs last period</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Revenue & Bookings Chart */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">Revenue & Bookings Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis yAxisId="left" stroke="#94a3b8" />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
                <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Service Distribution */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">Service Distribution</h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Weekly Bookings & Performance */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Weekly Bookings Chart */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">Weekly Bookings</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyBookings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="bookings" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Metrics */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">Performance Metrics</h2>
            <div className="space-y-6">
              {performanceData.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 font-medium">{item.metric}</span>
                    <span className="text-slate-100 font-bold">
                      {item.value}{item.unit}
                      <span className="text-sm text-slate-500 ml-2">/ {item.target}{item.unit}</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        item.value >= item.target ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      }`}
                      style={{ width: `${Math.min((item.value / item.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">Key Insights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="text-xl font-bold mb-2">Peak Performance</h3>
              <p className="text-white/90">Thursdays have the highest booking rate. Consider allocating more resources.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast Response</h3>
              <p className="text-white/90">Your 22-min average response time is 27% faster than industry average!</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2">Growing Revenue</h3>
              <p className="text-white/90">Revenue increased 45% over the past 6 months. Keep up the great work!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
