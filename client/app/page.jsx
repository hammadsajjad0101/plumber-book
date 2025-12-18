'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import LiveActivityWidget from './components/LiveActivityWidget';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero slider images - Specific plumbing services
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1659353588842-891391e6fcd4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Drain Cleaning and Pipe Repair",
      badge: "Drain & Sewer Cleaning"
    },
    {
      url: "https://images.unsplash.com/photo-1659178264663-0b03273b69d4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Water Heater Installation and Repair",
      badge: "Water Heater Services"
    },
    {
      url: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop",
      alt: "Leak Detection and Pipe Repair",
      badge: "Leak Detection & Repair"
    },
    {
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Toilet and Fixture Installation",
      badge: "Toilet & Fixture Repair"
    }
  ];

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Sample plumber data
  const plumbers = [
    {
      id: 1,
      name: "Mike Anderson",
      rating: 4.9,
      reviewCount: 127,
      specialties: ["Emergency Repairs", "Leak Detection", "Pipe Installation"],
      priceRange: "$$",
      responseTime: "< 30 min",
      yearsExperience: 15,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "Downtown, City Center",
      completedJobs: 450
    },
    {
      id: 2,
      name: "Sarah Thompson",
      rating: 4.8,
      reviewCount: 98,
      specialties: ["Bathroom Remodeling", "Water Heaters", "Fixtures"],
      priceRange: "$$$",
      responseTime: "< 1 hr",
      yearsExperience: 12,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "North District",
      completedJobs: 320
    },
    {
      id: 3,
      name: "David Chen",
      rating: 5.0,
      reviewCount: 203,
      specialties: ["Commercial Plumbing", "Drain Cleaning", "Inspection"],
      priceRange: "$$",
      responseTime: "< 15 min",
      yearsExperience: 20,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "East Side",
      completedJobs: 680
    },
    {
      id: 4,
      name: "Jessica Martinez",
      rating: 4.7,
      reviewCount: 85,
      specialties: ["Residential Service", "Faucet Repair", "Toilet Installation"],
      priceRange: "$",
      responseTime: "< 45 min",
      yearsExperience: 8,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "West End",
      completedJobs: 215
    },
    {
      id: 5,
      name: "Robert Williams",
      rating: 4.9,
      reviewCount: 156,
      specialties: ["Emergency 24/7", "Sewer Line", "Gas Line"],
      priceRange: "$$$",
      responseTime: "< 20 min",
      yearsExperience: 18,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "South District",
      completedJobs: 520
    },
    {
      id: 6,
      name: "Emily Davis",
      rating: 4.8,
      reviewCount: 112,
      specialties: ["Kitchen Plumbing", "Dishwasher Install", "Water Filtration"],
      priceRange: "$$",
      responseTime: "< 40 min",
      yearsExperience: 10,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "Central Area",
      completedJobs: 290
    }
  ];

  const filteredPlumbers = plumbers.filter(plumber => {
    const matchesSearch = plumber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plumber.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'top-rated') return matchesSearch && plumber.rating >= 4.8;
    if (selectedFilter === 'emergency') return matchesSearch && plumber.specialties.some(s => s.toLowerCase().includes('emergency'));
    if (selectedFilter === 'budget') return matchesSearch && plumber.priceRange === '$';

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-800/50 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-slate-900/50">
        <nav className="max-w-[1600px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
              <span className="text-white text-xl font-bold">P</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-indigo-400 transition-all duration-300">
              PlumberBook
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/" className="relative px-4 py-2 text-slate-300 hover:text-white transition-all duration-300 font-medium group">
              <span className="relative z-10">Home</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-indigo-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link href="#browse-plumbers" className="relative px-4 py-2 text-slate-300 hover:text-white transition-all duration-300 font-medium group">
              <span className="relative z-10">Find Plumbers</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-indigo-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link href="/about" className="relative px-4 py-2 text-slate-300 hover:text-white transition-all duration-300 font-medium group">
              <span className="relative z-10">About</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-indigo-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link href="/contact" className="relative px-4 py-2 text-slate-300 hover:text-white transition-all duration-300 font-medium group">
              <span className="relative z-10">Contact</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-indigo-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="relative px-5 py-2.5 text-slate-300 hover:text-white font-medium overflow-hidden group"
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 border border-slate-700 rounded-lg group-hover:border-blue-500/50 transition-colors duration-300"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/10 group-hover:to-indigo-600/10 rounded-lg transition-all duration-300"></span>
            </Link>
            <Link
              href="/signup"
              className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium overflow-hidden group shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:shadow-xl transition-all duration-300"
            >
              <span className="relative z-10 group-hover:scale-105 inline-block transition-transform duration-300">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-all duration-300 hover:scale-110"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 shadow-2xl animate-fade-in">
            <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-all font-medium"
              >
                Home
              </Link>
              <Link
                href="#browse-plumbers"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-all font-medium"
              >
                Find Plumbers
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-all font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-all font-medium"
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-center text-slate-300 hover:text-blue-400 border border-slate-700 hover:border-blue-500 rounded-lg transition-all font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all font-medium"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="max-w-[1600px] mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold border border-blue-500/20">
              🚀 Modern Booking Solution
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-100">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Plumber Today
              </span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Browse top-rated local plumbers, compare reviews and ratings, and book your appointment instantly.
              All in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#browse-plumbers"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 transition-all font-semibold text-lg text-center"
              >
                Browse Plumbers
              </Link>
              <Link
                href="/signup"
                className="px-8 py-4 border-2 border-slate-700 text-slate-300 rounded-xl hover:border-blue-500 hover:text-blue-400 transition-all font-semibold text-lg text-center"
              >
                Join as Plumber
              </Link>
            </div>
          </div>

          <div className="relative">
            {/* Animated background blob */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>

            {/* Hero Image Slider */}
            <div className="relative space-y-4">
              {/* Main Hero Slider */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border-4 border-slate-800 animate-scale-in h-[500px]">
                {/* Slider Images */}
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

                    {/* Badge Overlay */}
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg transform transition-all duration-500">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-slate-800 font-bold text-sm">{image.badge}</p>
                          <p className="text-xs text-slate-600">Trusted by 10,000+ customers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Dot Indicators */}
                <div className="absolute bottom-6 right-6 flex gap-2 z-10">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentSlide
                          ? 'w-8 h-3 bg-white'
                          : 'w-3 h-3 bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating notification card - top right */}
              <div className="absolute -top-4 -right-4 bg-slate-800 rounded-xl shadow-xl shadow-blue-500/10 p-4 border border-slate-700 max-w-xs" style={{opacity: 0, animation: 'slideInRight 0.6s ease-out 0.3s forwards, floatHorizontal 3s ease-in-out 0.9s infinite'}}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                    <span className="text-xl text-green-400">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200 text-sm">New Booking!</p>
                    <p className="text-xs text-slate-400">John Smith • 2:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Floating stats card - bottom left */}
              <div className="absolute -bottom-4 -left-4 bg-slate-800 rounded-xl shadow-xl shadow-blue-500/10 p-4 border border-slate-700" style={{opacity: 0, animation: 'slideInLeft 0.6s ease-out 0.4s forwards, floatHorizontal 3s ease-in-out 1.2s infinite'}}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl font-bold">24</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">This Month</p>
                    <p className="font-bold text-slate-200">Bookings</p>
                  </div>
                </div>
              </div>

              {/* Small floating calendar icon - top left */}
              <div className="absolute top-8 -left-6 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/50 p-3 animate-float" style={{animationDelay: '0.5s', opacity: 0, animation: 'fadeIn 0.6s ease-out 0.5s forwards, float 3s ease-in-out 1s infinite'}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Plumbers Section */}
      <section id="browse-plumbers" className="max-w-[1600px] mx-auto px-6 py-20 bg-slate-900/50 backdrop-blur-sm rounded-3xl shadow-2xl shadow-blue-500/10 border border-slate-800 -mt-10">
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 text-slate-100">Browse Top-Rated Plumbers</h2>
            <p className="text-xl text-slate-400">Find the perfect plumber for your needs</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 bg-slate-800 border-2 border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-lg"
              />
              <svg className="w-6 h-6 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {[
              { id: 'all', label: 'All Plumbers', icon: '🔧' },
              { id: 'top-rated', label: 'Top Rated', icon: '⭐' },
              { id: 'emergency', label: 'Emergency 24/7', icon: '🚨' },
              { id: 'budget', label: 'Budget Friendly', icon: '💰' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plumber Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlumbers.map((plumber) => (
            <div
              key={plumber.id}
              className="bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/50 transition-all hover:-translate-y-1 group"
            >
              {/* Header with Image and Basic Info */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img
                    src={plumber.image}
                    alt={plumber.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                  />
                  {plumber.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-100 mb-1">{plumber.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="font-bold text-slate-200 ml-1">{plumber.rating}</span>
                    </div>
                    <span className="text-slate-400 text-sm">({plumber.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{plumber.location}</span>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {plumber.specialties.slice(0, 3).map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium border border-blue-500/20"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-b border-slate-700">
                <div className="text-center">
                  <div className="font-bold text-slate-200">{plumber.yearsExperience}+</div>
                  <div className="text-xs text-slate-500">Years</div>
                </div>
                <div className="text-center border-l border-r border-slate-700">
                  <div className="font-bold text-slate-200">{plumber.priceRange}</div>
                  <div className="text-xs text-slate-500">Price</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-200">{plumber.responseTime}</div>
                  <div className="text-xs text-slate-500">Response</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link
                  href={`/plumber/${plumber.id}`}
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all font-semibold"
                >
                  View Profile
                </Link>
                <Link
                  href={`/book/${plumber.id}`}
                  className="block w-full text-center px-4 py-2 border-2 border-blue-500 text-blue-400 rounded-xl hover:bg-blue-500/10 transition-all font-semibold"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredPlumbers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No plumbers found matching your criteria.</p>
          </div>
        )}

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/plumbers"
            className="inline-block px-8 py-4 border-2 border-slate-700 text-slate-300 rounded-xl hover:border-blue-500 hover:text-blue-400 transition-all font-semibold text-lg"
          >
            View All Plumbers
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-100">Everything You Need</h2>
          <p className="text-xl text-slate-400">Powerful features to grow your business</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "📅",
              title: "24/7 Online Booking",
              description: "Let customers book appointments anytime, anywhere with your custom booking page."
            },
            {
              icon: "📱",
              title: "SMS Notifications",
              description: "Get instant alerts for new bookings. Customers receive automatic confirmations."
            },
            {
              icon: "⚡",
              title: "Mobile Dashboard",
              description: "Manage all bookings from your phone. Tap to call, get directions, update status."
            },
            {
              icon: "🔒",
              title: "Secure & Private",
              description: "Bank-level security with Row Level Security. Your data is always protected."
            },
            {
              icon: "🎨",
              title: "Branded Experience",
              description: "Customize your booking page with your business name and information."
            },
            {
              icon: "📊",
              title: "Real-time Updates",
              description: "Dashboard syncs instantly. See new bookings appear in real-time."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1 border border-slate-700"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-slate-100">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-100">How It Works</h2>
          <p className="text-xl text-slate-400">Get started in 3 simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Create Account",
              description: "Sign up in seconds with your business information."
            },
            {
              step: "2",
              title: "Share Your Link",
              description: "Get your custom booking page URL to share with customers."
            },
            {
              step: "3",
              title: "Manage Bookings",
              description: "Accept bookings 24/7 and manage everything from your dashboard."
            }
          ].map((item, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-lg shadow-blue-500/50">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-slate-100">{item.title}</h3>
              <p className="text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-100">What Plumbers Say</h2>
          <p className="text-xl text-slate-400">Join hundreds of satisfied plumbers using PlumberBook</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Mike Johnson",
              business: "Johnson Plumbing Services",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
              rating: 5,
              text: "PlumberBook has transformed how I manage appointments. I used to miss calls all the time, now customers can book 24/7. My revenue is up 40%!",
              location: "Austin, TX"
            },
            {
              name: "Sarah Martinez",
              business: "Martinez Family Plumbing",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
              rating: 5,
              text: "The SMS notifications are a game changer. I get instant alerts for new bookings and can respond immediately. My customers love the professional experience.",
              location: "Denver, CO"
            },
            {
              name: "David Chen",
              business: "Chen's Emergency Plumbing",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
              rating: 5,
              text: "Best investment I've made for my business. The dashboard is clean, easy to use, and I can access it from anywhere. Highly recommend!",
              location: "Seattle, WA"
            }
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:shadow-xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
                <div>
                  <div className="font-bold text-slate-100 text-lg">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">{testimonial.business}</div>
                  <div className="text-xs text-slate-500">{testimonial.location}</div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              <p className="text-slate-300 leading-relaxed italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          {[
            { number: "500+", label: "Active Plumbers" },
            { number: "10k+", label: "Monthly Bookings" },
            { number: "4.9/5", label: "Average Rating" },
            { number: "99.9%", label: "Uptime" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl shadow-blue-500/20">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of plumbers managing their bookings with PlumberBook
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-xl hover:shadow-white/50 hover:scale-105 transition-all font-semibold text-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-20">
        <div className="max-w-[1600px] mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-xl font-bold text-slate-200">PlumberBook</span>
              </div>
              <p className="text-slate-400 text-sm">
                Modern booking management for plumbing businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-200">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                <li><Link href="/features" className="hover:text-blue-400 transition-colors">Features</Link></li>
                <li><Link href="/demo" className="hover:text-blue-400 transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-200">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-200">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>© 2025 PlumberBook. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes floatHorizontal {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-20px);
          }
        }
      `}</style>

      {/* Live Activity Widget */}
      <LiveActivityWidget />
    </div>
  );
}
