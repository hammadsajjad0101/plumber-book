'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '../components/Logo';
import {
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Shield,
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  FileText,
  Bell,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Ban
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Generate sample data
  const generatePlumbers = () => {
    const names = ['John Smith Plumbing', 'ABC Plumbing Co.', 'Quick Fix Plumbers', 'Elite Drain Services',
                   'Reliable Plumbing LLC', 'Metro Plumbing', 'Premium Pipe Works', 'City Plumbers'];
    const statuses = ['active', 'pending', 'suspended'];
    const plumbers = [];

    for (let i = 1; i <= 15; i++) {
      plumbers.push({
        id: i,
        name: names[Math.floor(Math.random() * names.length)] + ` #${i}`,
        email: `plumber${i}@example.com`,
        phone: `(555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        rating: (4 + Math.random()).toFixed(1),
        totalJobs: Math.floor(Math.random() * 200) + 50,
        revenue: Math.floor(Math.random() * 50000) + 10000,
        joinedDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString()
      });
    }
    return plumbers;
  };

  const generateBookings = () => {
    const customers = ['Emily Wilson', 'Michael Brown', 'Lisa Anderson', 'Robert Davis', 'Sarah Johnson'];
    const services = ['Emergency Repair', 'Drain Cleaning', 'Water Heater', 'Leak Detection', 'Installation'];
    const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    const bookings = [];

    for (let i = 1; i <= 20; i++) {
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(Math.random() * 30) - 15);

      bookings.push({
        id: i,
        customer: customers[Math.floor(Math.random() * customers.length)],
        plumber: `Plumber #${Math.floor(Math.random() * 8) + 1}`,
        service: services[Math.floor(Math.random() * services.length)],
        date: date.toLocaleDateString(),
        time: `${Math.floor(Math.random() * 8) + 9}:00 AM`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        amount: Math.floor(Math.random() * 300) + 100
      });
    }
    return bookings;
  };

  const generateReviews = () => {
    const customers = ['Emily Wilson', 'Michael Brown', 'Lisa Anderson', 'Robert Davis', 'Sarah Johnson'];
    const plumbers = ['John Smith Plumbing', 'ABC Plumbing Co.', 'Quick Fix Plumbers'];
    const comments = [
      'Great service!', 'Very professional', 'Quick response time',
      'Highly recommend', 'Fixed the issue perfectly', 'Will use again'
    ];
    const reviews = [];

    for (let i = 1; i <= 12; i++) {
      reviews.push({
        id: i,
        customer: customers[Math.floor(Math.random() * customers.length)],
        plumber: plumbers[Math.floor(Math.random() * plumbers.length)],
        rating: Math.floor(Math.random() * 2) + 4,
        comment: comments[Math.floor(Math.random() * comments.length)],
        date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
        status: Math.random() > 0.8 ? 'flagged' : 'approved'
      });
    }
    return reviews;
  };

  const [plumbers, setPlumbers] = useState(generatePlumbers());
  const [bookings] = useState(generateBookings());
  const [reviews] = useState(generateReviews());

  // Function to update plumber status
  const updatePlumberStatus = (plumberId, newStatus) => {
    setPlumbers(prevPlumbers =>
      prevPlumbers.map(plumber =>
        plumber.id === plumberId ? { ...plumber, status: newStatus } : plumber
      )
    );
  };

  // Calculate stats
  const stats = {
    totalPlumbers: plumbers.length,
    activePlumbers: plumbers.filter(p => p.status === 'active').length,
    pendingPlumbers: plumbers.filter(p => p.status === 'pending').length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    completedBookings: bookings.filter(b => b.status === 'completed').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.amount, 0),
    averageRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    flaggedReviews: reviews.filter(r => r.status === 'flagged').length
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      suspended: 'bg-red-500/20 text-red-400 border-red-500/30',
      confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
      approved: 'bg-green-500/20 text-green-400 border-green-500/30',
      flagged: 'bg-red-500/20 text-red-400 border-red-500/30'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" />, badge: null },
    { id: 'plumbers', label: 'Plumbers', icon: <Users className="w-5 h-5" />, badge: stats.pendingPlumbers },
    { id: 'bookings', label: 'Bookings', icon: <Calendar className="w-5 h-5" />, badge: stats.pendingBookings },
    { id: 'reviews', label: 'Reviews', icon: <Star className="w-5 h-5" />, badge: stats.flaggedReviews },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" />, badge: null },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" />, badge: null }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex overflow-x-hidden">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        w-72 lg:${sidebarCollapsed ? 'w-20' : 'w-72'}
        lg:min-w-[80px] lg:max-w-[288px]
        bg-slate-900/50 backdrop-blur-sm border-r border-slate-800
        transition-all duration-300 flex flex-col fixed h-screen z-50 overflow-hidden
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            {/* Full Logo - Show on mobile always, on desktop when not collapsed */}
            <div className={`flex-1 ${sidebarCollapsed ? 'hidden lg:hidden' : ''}`}>
              <Link href="/">
                <Logo size="default" showText={true} />
              </Link>
              <p className="text-xs text-slate-500 mt-2 ml-1">Admin Panel</p>
            </div>
            {/* Icon Only - Show on desktop when collapsed */}
            {sidebarCollapsed && (
              <Link href="/" className="hidden lg:flex mx-auto">
                <Logo size="default" showText={false} />
              </Link>
            )}
            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group relative ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {/* Active indicator */}
              {activeSection === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
              )}

              <div className={`${sidebarCollapsed ? 'lg:mx-auto' : ''}`}>
                {item.icon}
              </div>

              {/* Always show labels on mobile, conditional on desktop */}
              <span className={`flex-1 text-left ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                {item.label}
              </span>
              {item.badge !== null && item.badge > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${sidebarCollapsed ? 'lg:hidden' : ''} ${
                  activeSection === item.id
                    ? 'bg-white text-purple-600'
                    : 'bg-purple-500/20 text-purple-400'
                }`}>
                  {item.badge}
                </span>
              )}

              {/* Tooltip for collapsed sidebar - Desktop only */}
              {sidebarCollapsed && (
                <div className="hidden lg:block absolute left-full ml-2 px-3 py-2 bg-slate-800 text-slate-200 text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-slate-700">
                  {item.label}
                  {item.badge !== null && item.badge > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full text-xs font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>  
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          {/* Quick Actions */}
          <div className="space-y-2">
            <Link
              href="/"
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-all"
            >
              <span>🏠</span>
              <span>View Site</span>
            </Link>
            <Link
              href="/dashboard"
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-all"
            >
              <span>👤</span>
              <span>Plumber View</span>
            </Link>
            <Link
              href="/login"
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800/50 rounded-lg transition-all"
            >
              <span>🚪</span>
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 overflow-x-hidden ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        {/* Top Header */}
        <header className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-100">
                  {sidebarItems.find(item => item.id === activeSection)?.label || 'Overview'}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  {activeSection === 'overview' && 'Welcome back! Here\'s your platform overview.'}
                  {activeSection === 'plumbers' && 'Manage all plumbers on your platform'}
                  {activeSection === 'bookings' && 'Monitor and manage all bookings'}
                  {activeSection === 'reviews' && 'Moderate customer reviews and ratings'}
                  {activeSection === 'analytics' && 'Platform analytics and insights'}
                  {activeSection === 'settings' && 'Configure platform settings'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-slate-200">Admin User</p>
                  <p className="text-xs text-slate-500">admin@plumberbook.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Plumbers */}
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    12%
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-1">Total Plumbers</p>
                <p className="text-3xl font-bold text-slate-100">{stats.totalPlumbers}</p>
                <p className="text-xs text-slate-500 mt-2">{stats.activePlumbers} active, {stats.pendingPlumbers} pending</p>
              </div>

              {/* Total Bookings */}
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    8%
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-slate-100">{stats.totalBookings}</p>
                <p className="text-xs text-slate-500 mt-2">{stats.completedBookings} completed, {stats.pendingBookings} pending</p>
              </div>

              {/* Total Revenue */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    15%
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-1">Platform Revenue</p>
                <p className="text-3xl font-bold text-slate-100">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-2">This month</p>
              </div>

              {/* Average Rating */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-yellow-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    0.3
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-1">Avg Rating</p>
                <p className="text-3xl font-bold text-slate-100">{stats.averageRating} ⭐</p>
                <p className="text-xs text-slate-500 mt-2">{reviews.length} reviews, {stats.flaggedReviews} flagged</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Pending Approvals */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-100">Pending Approvals</h3>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
                    {stats.pendingPlumbers}
                  </span>
                </div>
                <div className="space-y-3">
                  {plumbers.filter(p => p.status === 'pending').length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                      <p className="text-slate-400">No pending approvals</p>
                      <p className="text-sm text-slate-500 mt-1">All plumbers have been reviewed</p>
                    </div>
                  ) : (
                    plumbers.filter(p => p.status === 'pending').slice(0, 5).map(plumber => (
                      <div key={plumber.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                        <div>
                          <p className="font-semibold text-slate-200">{plumber.name}</p>
                          <p className="text-sm text-slate-400">{plumber.email}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updatePlumberStatus(plumber.id, 'active')}
                            className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                            title="Approve & Activate"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </button>
                          <button
                            onClick={() => updatePlumberStatus(plumber.id, 'suspended')}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                            title="Reject & Suspend"
                          >
                            <XCircle className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-100">Recent Bookings</h3>
                  <Link href="#" className="text-sm text-purple-400 hover:text-purple-300">View all</Link>
                </div>
                <div className="space-y-3">
                  {bookings.slice(0, 5).map(booking => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-200">{booking.customer}</p>
                        <p className="text-sm text-slate-400">{booking.service} - {booking.date}</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(booking.status)}
                        <p className="text-sm font-semibold text-slate-300 mt-1">${booking.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plumbers Section */}
        {activeSection === 'plumbers' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search plumbers by name, email, or phone..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                  />
                </div>
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter
                </button>
              </div>
            </div>

            {/* Plumbers Table */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/50 border-b border-slate-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Plumber</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Rating</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Total Jobs</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Revenue</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Joined</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {plumbers.map(plumber => (
                      <tr
                        key={plumber.id}
                        className={`hover:bg-slate-900/30 transition-colors ${
                          plumber.status === 'pending' ? 'bg-yellow-500/5 border-l-4 border-yellow-500' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-200">{plumber.name}</p>
                          <p className="text-sm text-slate-400">ID: #{plumber.id}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-300">{plumber.email}</p>
                          <p className="text-sm text-slate-400">{plumber.phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(plumber.status)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-semibold text-slate-200">{plumber.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{plumber.totalJobs}</td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-green-400">${plumber.revenue.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-sm">{plumber.joinedDate}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {/* Approve button - only show for pending plumbers */}
                            {plumber.status === 'pending' && (
                              <button
                                onClick={() => updatePlumberStatus(plumber.id, 'active')}
                                className="px-3 py-1.5 text-sm font-medium bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition-all flex items-center gap-1.5"
                                title="Approve & Activate"
                              >
                                <UserCheck className="w-4 h-4" />
                                <span className="hidden lg:inline">Approve</span>
                              </button>
                            )}

                            {/* Suspend button - only show for active plumbers */}
                            {plumber.status === 'active' && (
                              <button
                                onClick={() => updatePlumberStatus(plumber.id, 'suspended')}
                                className="px-3 py-1.5 text-sm font-medium bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 rounded-lg transition-all flex items-center gap-1.5"
                                title="Suspend"
                              >
                                <Ban className="w-4 h-4" />
                                <span className="hidden lg:inline">Suspend</span>
                              </button>
                            )}

                            {/* Activate button - only show for suspended plumbers */}
                            {plumber.status === 'suspended' && (
                              <button
                                onClick={() => updatePlumberStatus(plumber.id, 'active')}
                                className="px-3 py-1.5 text-sm font-medium bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition-all flex items-center gap-1.5"
                                title="Activate"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span className="hidden lg:inline">Activate</span>
                              </button>
                            )}

                            <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors" title="View Details">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:bg-slate-700 rounded-lg transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Section */}
        {activeSection === 'bookings' && (
          <div className="space-y-6">
            {/* Bookings Table */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-700">
                <h3 className="text-xl font-bold text-slate-100">All Bookings</h3>
                <p className="text-sm text-slate-400 mt-1">Manage and monitor all platform bookings</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/50 border-b border-slate-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Plumber</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Service</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date & Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {bookings.map(booking => (
                      <tr key={booking.id} className="hover:bg-slate-900/30 transition-colors">
                        <td className="px-6 py-4 text-slate-300 font-mono">#{booking.id}</td>
                        <td className="px-6 py-4 text-slate-200">{booking.customer}</td>
                        <td className="px-6 py-4 text-slate-300">{booking.plumber}</td>
                        <td className="px-6 py-4 text-slate-200">{booking.service}</td>
                        <td className="px-6 py-4">
                          <p className="text-slate-300">{booking.date}</p>
                          <p className="text-sm text-slate-400">{booking.time}</p>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(booking.status)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-green-400">${booking.amount}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:bg-slate-700 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Section */}
        {activeSection === 'reviews' && (
          <div className="space-y-6">
            {/* Reviews Grid */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-100">Review Moderation</h3>
                  <p className="text-sm text-slate-400 mt-1">{stats.flaggedReviews} reviews need attention</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                {reviews.map(review => (
                  <div key={review.id} className={`p-5 rounded-xl border transition-all ${
                    review.status === 'flagged'
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-slate-900/50 border-slate-700'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-semibold text-slate-200">{review.customer}</p>
                          {getStatusBadge(review.status)}
                        </div>
                        <p className="text-sm text-slate-400">For: {review.plumber}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-300 mb-3">{review.comment}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{review.date}</span>
                      <div className="flex gap-2">
                        {review.status === 'flagged' && (
                          <>
                            <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                              Approve
                            </button>
                            <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Section */}
        {activeSection === 'analytics' && (
          <div className="space-y-6">
            {/* Coming Soon Card */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-purple-500/20 text-center">
              <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-100 mb-2">Analytics Dashboard</h3>
              <p className="text-slate-400 max-w-md mx-auto">
                Advanced analytics and insights are coming soon! Track revenue trends, user growth, booking patterns, and more.
              </p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                  <p className="text-xs text-slate-500">Coming in</p>
                  <p className="text-lg font-bold text-purple-400">Q2 2025</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-slate-100 mb-6">Platform Settings</h3>

              <div className="space-y-6">
                {/* General Settings */}
                <div className="border-b border-slate-700 pb-6">
                  <h4 className="text-lg font-semibold text-slate-200 mb-4">General</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-200">Maintenance Mode</p>
                        <p className="text-sm text-slate-400">Disable public access temporarily</p>
                      </div>
                      <button className="relative w-14 h-8 bg-slate-700 rounded-full transition-colors">
                        <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-200">Auto-approve Plumbers</p>
                        <p className="text-sm text-slate-400">Automatically approve new plumber registrations</p>
                      </div>
                      <button className="relative w-14 h-8 bg-slate-700 rounded-full transition-colors">
                        <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Commission Settings */}
                <div className="border-b border-slate-700 pb-6">
                  <h4 className="text-lg font-semibold text-slate-200 mb-4">Commission</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Platform Commission (%)</label>
                      <input
                        type="number"
                        defaultValue="15"
                        className="w-full max-w-xs px-4 py-3 bg-slate-900 border border-slate-700 text-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Settings */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-200 mb-4">Email Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-200">New Booking Notifications</p>
                        <p className="text-sm text-slate-400">Send emails for new bookings</p>
                      </div>
                      <button className="relative w-14 h-8 bg-purple-600 rounded-full transition-colors">
                        <div className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-200">Review Notifications</p>
                        <p className="text-sm text-slate-400">Notify plumbers of new reviews</p>
                      </div>
                      <button className="relative w-14 h-8 bg-purple-600 rounded-full transition-colors">
                        <div className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700">
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
