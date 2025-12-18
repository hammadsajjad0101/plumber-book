'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '../components/Logo';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Star, Calendar, Clock, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  // Generate 50 sample bookings
  const generateBookings = () => {
    const names = ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Wilson', 'Robert Brown', 'Lisa Anderson',
                   'David Miller', 'Jessica Garcia', 'James Martinez', 'Mary Rodriguez', 'William Lee', 'Jennifer Taylor',
                   'Richard Thomas', 'Patricia Harris', 'Charles Clark', 'Linda Lewis', 'Michael Walker', 'Barbara Hall',
                   'Joseph Allen', 'Susan Young', 'Thomas King', 'Karen Wright', 'Christopher Lopez', 'Nancy Hill'];
    const services = ['Emergency Repair', 'Routine Maintenance', 'Installation', 'Drain Cleaning', 'Water Heater Service',
                     'Pipe Installation', 'Leak Detection', 'Bathroom Remodeling', 'Fixture Installation', 'Inspection'];
    const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    const streets = ['Main St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Maple Dr', 'Cedar Ln', 'Birch Way', 'Walnut Blvd'];

    const bookings = [];
    for (let i = 1; i <= 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(Math.random() * 30) - 15);
      const dateStr = date.toISOString().split('T')[0];

      bookings.push({
        id: i,
        customerName: names[Math.floor(Math.random() * names.length)],
        customerPhone: `(555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        customerEmail: `customer${i}@email.com`,
        customerAddress: `${Math.floor(Math.random() * 999) + 1} ${streets[Math.floor(Math.random() * streets.length)]}, City`,
        serviceType: services[Math.floor(Math.random() * services.length)],
        scheduledDate: dateStr,
        scheduledTime: `${Math.floor(Math.random() * 8) + 9}:${['00', '30'][Math.floor(Math.random() * 2)]} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        description: 'Service description here',
        status: statuses[Math.floor(Math.random() * statuses.length)],
        revenue: Math.floor(Math.random() * 800) + 100,
        createdAt: dateStr
      });
    }
    return bookings;
  };

  const [bookings, setBookings] = useState(generateBookings());
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileCompletionDismissed, setProfileCompletionDismissed] = useState(false);
  const itemsPerPage = 5;

  // Sample revenue data for the last 7 days
  const revenueData = [
    { day: 'Mon', revenue: 450, bookings: 3 },
    { day: 'Tue', revenue: 680, bookings: 5 },
    { day: 'Wed', revenue: 320, bookings: 2 },
    { day: 'Thu', revenue: 890, bookings: 6 },
    { day: 'Fri', revenue: 1200, bookings: 8 },
    { day: 'Sat', revenue: 1450, bookings: 10 },
    { day: 'Sun', revenue: 780, bookings: 5 }
  ];

  // Service type distribution
  const serviceDistribution = [
    { name: 'Emergency Repairs', value: 35, color: '#ef4444' },
    { name: 'Maintenance', value: 25, color: '#3b82f6' },
    { name: 'Installation', value: 20, color: '#8b5cf6' },
    { name: 'Drain Cleaning', value: 20, color: '#10b981' }
  ];

  // Customer reviews data - Generate comprehensive review list
  const generateReviews = () => {
    const names = ['Emily Wilson', 'Michael Brown', 'Lisa Anderson', 'Robert Davis', 'Sarah Johnson',
                   'James Martinez', 'Jennifer Taylor', 'David Miller', 'Mary Rodriguez', 'William Lee',
                   'Patricia Harris', 'Charles Clark', 'Linda Lewis', 'Thomas King', 'Karen Wright',
                   'John Smith', 'Nancy Hill', 'Richard Thomas', 'Barbara Hall', 'Christopher Lopez'];
    const services = ['Emergency Repair', 'Drain Cleaning', 'Water Heater Service', 'Leak Detection',
                     'Pipe Installation', 'Bathroom Remodeling', 'Fixture Installation', 'Routine Maintenance'];
    const comments = [
      'Excellent service! Very professional and quick.',
      'Best plumber in town. Highly recommend!',
      'Great work, arrived on time.',
      'Fixed my leak in under an hour. Amazing!',
      'Very knowledgeable and friendly. Will hire again.',
      'Quick response and fair pricing.',
      'Outstanding work quality. Exceeded expectations!',
      'Professional, clean, and efficient service.',
      'Solved a problem that others couldn\'t fix.',
      'Honest pricing and great communication.',
      'Went above and beyond to help me.',
      'Would definitely use again for future needs.',
      'Cleaned up nicely after the job was done.',
      'Explained everything clearly and patiently.',
      'Saved me from a potential disaster!',
      'Fast, reliable, and reasonably priced.',
      'Great attention to detail.',
      'Very respectful and courteous.',
      'Fixed the issue quickly without any mess.',
      'Excellent customer service from start to finish.'
    ];
    const dates = ['2 days ago', '5 days ago', '1 week ago', '2 weeks ago', '3 weeks ago', '1 month ago'];

    const reviewList = [];
    for (let i = 1; i <= 20; i++) {
      reviewList.push({
        id: i,
        name: names[Math.floor(Math.random() * names.length)],
        rating: Math.random() > 0.2 ? 5 : 4, // 80% 5-star, 20% 4-star
        comment: comments[Math.floor(Math.random() * comments.length)],
        service: services[Math.floor(Math.random() * services.length)],
        date: dates[Math.floor(Math.random() * dates.length)]
      });
    }
    return reviewList;
  };

  const [allReviews] = useState(generateReviews());
  const [showAllReviews, setShowAllReviews] = useState(false);

  const updateStatus = (id, newStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      confirmed: 'bg-green-500/10 text-green-400 border-green-500/20',
      completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      cancelled: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return colors[status] || colors.pending;
  };

  // Profile completion calculation
  const profileFields = {
    name: true,
    email: true,
    phone: true,
    bio: false, // Simulating incomplete
    photo: false,
    certifications: true,
    services: false,
    location: true,
    workPhotos: false
  };

  const completedFields = Object.values(profileFields).filter(Boolean).length;
  const totalFields = Object.keys(profileFields).length;
  const profileCompletion = Math.round((completedFields / totalFields) * 100);

  // Filter and search bookings
  const filteredBookings = bookings.filter(booking => {
    // Apply status filter
    let matchesFilter = true;
    if (filter === 'all') matchesFilter = true;
    else if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      matchesFilter = booking.scheduledDate === today;
    } else {
      matchesFilter = booking.status === filter;
    }

    // Apply search query
    const matchesSearch = searchQuery === '' ||
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerAddress.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length
  };

  // Calculate metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + b.revenue, 0);
  const completedRevenue = bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.revenue, 0);
  const averageRating = 4.8;
  const happyCustomers = bookings.filter(b => b.status === 'completed').length * 0.95; // 95% satisfaction

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Logo size="default" showText={true} />
            </Link>
            <div className="border-l border-slate-700 pl-4">
              <p className="text-sm text-slate-400">Plumber Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/profile"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all font-medium"
            >
              ⚙️ Edit Profile
            </Link>
            <Link
              href="/book/demo"
              className="px-4 py-2 text-sm text-slate-300 hover:text-blue-400 transition-colors font-medium"
            >
              📋 My Booking Page
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm border border-slate-700 rounded-lg hover:border-red-500 hover:text-red-600 transition-colors font-medium text-slate-300"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      {/* Profile Completion Modal */}
      {profileCompletion < 100 && !profileCompletionDismissed && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-yellow-500/30 rounded-2xl shadow-2xl max-w-2xl w-full relative animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setProfileCompletionDismissed(true)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-200 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/50">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-yellow-400">Complete Your Profile</h2>
                  </div>
                  <span className="inline-block px-4 py-1.5 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-sm font-bold text-yellow-300">
                    {profileCompletion}% Complete
                  </span>
                </div>
              </div>

              {/* Message */}
              <p className="text-slate-300 text-lg mb-6">
                Your profile is incomplete! A complete profile helps you get more bookings and appear higher in search results.
              </p>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-400">Profile Completion</span>
                  <span className="text-lg font-bold text-yellow-400">{profileCompletion}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-700 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500 rounded-full shadow-lg"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
              </div>

              {/* Missing Fields */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-400 mb-3">Missing Information:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {!profileFields.bio && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl">
                      <span className="text-2xl">📝</span>
                      <span className="text-slate-300 font-medium">Add Bio</span>
                    </div>
                  )}
                  {!profileFields.photo && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl">
                      <span className="text-2xl">📷</span>
                      <span className="text-slate-300 font-medium">Add Photo</span>
                    </div>
                  )}
                  {!profileFields.services && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl">
                      <span className="text-2xl">🔧</span>
                      <span className="text-slate-300 font-medium">Select Services</span>
                    </div>
                  )}
                  {!profileFields.workPhotos && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl">
                      <span className="text-2xl">🖼️</span>
                      <span className="text-slate-300 font-medium">Add Work Photos</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Link
                  href="/dashboard/profile"
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold text-lg text-center hover:shadow-xl hover:shadow-yellow-500/50 transition-all hover:scale-105"
                >
                  Complete Profile Now →
                </Link>
                <button
                  onClick={() => setProfileCompletionDismissed(true)}
                  className="px-6 py-4 border-2 border-slate-700 text-slate-400 rounded-xl hover:border-slate-600 hover:text-slate-300 transition-all font-semibold"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto px-6 py-8">

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-100 mb-2">Welcome back, Joe! 👋</h2>
          <p className="text-slate-400">Here's what's happening with your business today.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                12%
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-slate-100 mb-1">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-slate-500">This month</p>
          </div>

          {/* Happy Customers */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                8%
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">Happy Customers</p>
            <p className="text-3xl font-bold text-slate-100 mb-1">{Math.round(happyCustomers)}</p>
            <p className="text-xs text-slate-500">95% satisfaction rate</p>
          </div>

          {/* Average Rating */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-yellow-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                0.2
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">Average Rating</p>
            <p className="text-3xl font-bold text-slate-100 mb-1">{averageRating} ⭐</p>
            <p className="text-xs text-slate-500">From {allReviews.length} reviews</p>
          </div>

          {/* Completed Jobs */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                15%
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">Completed Jobs</p>
            <p className="text-3xl font-bold text-slate-100 mb-1">{stats.completed}</p>
            <p className="text-xs text-slate-500">This month</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-1">Revenue Overview</h3>
                <p className="text-sm text-slate-400">Last 7 days performance</p>
              </div>
              <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <span className="text-blue-400 font-semibold text-sm">This Week</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Service Distribution */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-slate-100 mb-4">Service Types</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {serviceDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-slate-400">{item.name}</span>
                  </div>
                  <span className="font-semibold text-slate-200">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-1">
                {showAllReviews ? 'All Customer Reviews' : 'Recent Reviews'}
              </h3>
              <p className="text-sm text-slate-400">
                {showAllReviews ? `${allReviews.length} total reviews` : 'What customers are saying'}
              </p>
            </div>
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center gap-2"
            >
              {showAllReviews ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Show less
                </>
              ) : (
                <>
                  View all ({allReviews.length})
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Rating Summary */}
          <div className="bg-slate-900/50 rounded-xl p-6 mb-6 border border-slate-700">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-slate-100 mb-2">{averageRating}</div>
                <div className="flex items-center gap-1 justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">★</span>
                  ))}
                </div>
                <p className="text-sm text-slate-400">{allReviews.length} reviews</p>
              </div>
              <div className="flex-1 w-full space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = allReviews.filter(r => r.rating === stars).length;
                  const percentage = (count / allReviews.length) * 100;
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm text-slate-400">{stars}</span>
                        <span className="text-yellow-400">★</span>
                      </div>
                      <div className="flex-1 bg-slate-800 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-400 w-12 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(showAllReviews ? allReviews : allReviews.slice(0, 6)).map((review) => (
              <div key={review.id} className="bg-slate-900/50 rounded-xl p-5 border border-slate-700 hover:border-slate-600 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="font-semibold text-slate-200 mb-1">{review.name}</div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-slate-600'}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{review.date}</span>
                </div>
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs border border-slate-700">
                    {review.service}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: stats.total, icon: '📊', color: 'from-blue-500 to-blue-600' },
            { label: 'Pending', value: stats.pending, icon: '⏳', color: 'from-yellow-500 to-yellow-600' },
            { label: 'Confirmed', value: stats.confirmed, icon: '✓', color: 'from-green-500 to-green-600' },
            { label: 'Completed', value: stats.completed, icon: '🎉', color: 'from-purple-500 to-purple-600' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-slate-700 hover:shadow-xl hover:shadow-blue-500/10 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-100">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6 border border-slate-800 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings by name, email, service, or address..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-6 py-3 pl-12 bg-slate-800 border-2 border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
            />
            <svg className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'All Bookings', value: 'all' },
              { label: 'Today', value: 'today' },
              { label: 'Pending', value: 'pending' },
              { label: 'Confirmed', value: 'confirmed' },
              { label: 'Completed', value: 'completed' }
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => handleFilterChange(item.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === item.value
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm">
            <p className="text-slate-400">
              Showing <span className="font-bold text-slate-200">{startIndex + 1}-{Math.min(endIndex, filteredBookings.length)}</span> of <span className="font-bold text-slate-200">{filteredBookings.length}</span> bookings
            </p>
            {searchQuery && (
              <p className="text-blue-400">
                Search: "{searchQuery}"
              </p>
            )}
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center border border-slate-800">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-slate-100 mb-2">No bookings found</h3>
              <p className="text-slate-400">Try changing your filters or search terms.</p>
            </div>
          ) : (
            paginatedBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-slate-700 hover:shadow-xl hover:shadow-blue-500/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Booking Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-100 mb-1">{booking.customerName}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                            {booking.status.toUpperCase()}
                          </span>
                          <span className="text-sm font-bold text-green-400">${booking.revenue}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">📞</span>
                        <a href={`tel:${booking.customerPhone}`} className="text-blue-400 hover:underline font-medium">
                          {booking.customerPhone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">📧</span>
                        <a href={`mailto:${booking.customerEmail}`} className="text-blue-400 hover:underline">
                          {booking.customerEmail}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">📍</span>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(booking.customerAddress)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {booking.customerAddress}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">🔧</span>
                        <span className="font-medium text-slate-300">{booking.serviceType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">📅</span>
                        <span className="font-medium text-slate-300">{booking.scheduledDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">⏰</span>
                        <span className="font-medium text-slate-300">{booking.scheduledTime}</span>
                      </div>
                    </div>

                    {booking.description && (
                      <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                        <p className="text-sm text-slate-300">
                          <span className="font-semibold">Notes:</span> {booking.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 min-w-[180px]">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(booking.id, 'confirmed')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                        >
                          ✓ Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, 'cancelled')}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                        >
                          ✕ Cancel
                        </button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <>
                        <button
                          onClick={() => updateStatus(booking.id, 'completed')}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                        >
                          ✓ Complete
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, 'cancelled')}
                          className="px-4 py-2 border border-slate-700 text-slate-300 rounded-lg hover:border-red-500 hover:text-red-600 transition-colors font-medium text-sm"
                        >
                          ✕ Cancel
                        </button>
                      </>
                    )}
                    {(booking.status === 'completed' || booking.status === 'cancelled') && (
                      <div className="px-4 py-2 bg-slate-900/50 text-slate-400 rounded-lg text-center font-medium text-sm border border-slate-700">
                        {booking.status === 'completed' ? '✓ Completed' : '✕ Cancelled'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {filteredBookings.length > itemsPerPage && (
          <div className="mt-8 bg-slate-900/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-slate-800">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-6 py-3 bg-slate-800 text-slate-300 rounded-xl font-semibold hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-12 h-12 rounded-xl font-semibold transition-all ${
                          currentPage === page
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="text-slate-500">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-6 py-3 bg-slate-800 text-slate-300 rounded-xl font-semibold hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 flex items-center gap-2"
              >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          
          </div>
        )}
      </div>
    </div>
  );
}
