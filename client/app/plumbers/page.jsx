'use client';

import Link from "next/link";
import { useState } from "react";
import Header from '../components/Header';

export default function PlumbersBrowse() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Location states
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [maxDistance, setMaxDistance] = useState(50); // miles

  // Extended plumber data with GPS coordinates and services (from their dashboard)
  const allPlumbers = [
    {
      id: 1,
      name: "Mike Anderson",
      rating: 4.9,
      reviewCount: 127,
      specialties: ["Emergency Repairs", "Leak Detection", "Pipe Installation"],
      startingPrice: 59,
      responseTime: "< 30 min",
      yearsExperience: 15,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "Downtown, City Center",
      completedJobs: 450,
      category: "emergency",
      lat: 40.7589,
      lng: -73.9851
    },
    {
      id: 2,
      name: "Sarah Thompson",
      rating: 4.8,
      reviewCount: 98,
      specialties: ["Bathroom Remodeling", "Water Heaters", "Fixtures"],
      startingPrice: 89,
      responseTime: "< 1 hr",
      yearsExperience: 12,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "North District",
      completedJobs: 320,
      category: "remodeling",
      lat: 40.7889,
      lng: -73.9761
    },
    {
      id: 3,
      name: "David Chen",
      rating: 5.0,
      reviewCount: 203,
      specialties: ["Commercial Plumbing", "Drain Cleaning", "Inspection"],
      startingPrice: 69,
      responseTime: "< 15 min",
      yearsExperience: 20,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "East Side",
      completedJobs: 680,
      category: "commercial",
      lat: 40.7489,
      lng: -73.9681
    },
    {
      id: 4,
      name: "Jessica Martinez",
      rating: 4.7,
      reviewCount: 85,
      specialties: ["Residential Service", "Faucet Repair", "Toilet Installation"],
      startingPrice: 49,
      responseTime: "< 45 min",
      yearsExperience: 8,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "West End",
      completedJobs: 215,
      category: "residential",
      lat: 40.7289,
      lng: -74.0051
    },
    {
      id: 5,
      name: "Robert Williams",
      rating: 4.9,
      reviewCount: 156,
      specialties: ["Emergency 24/7", "Sewer Line", "Gas Line"],
      startingPrice: 129,
      responseTime: "< 20 min",
      yearsExperience: 18,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "South District",
      completedJobs: 520,
      category: "emergency",
      lat: 40.7089,
      lng: -73.9951
    },
    {
      id: 6,
      name: "Emily Davis",
      rating: 4.8,
      reviewCount: 112,
      specialties: ["Kitchen Plumbing", "Dishwasher Install", "Water Filtration"],
      startingPrice: 79,
      responseTime: "< 40 min",
      yearsExperience: 10,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "Central Area",
      completedJobs: 290,
      category: "residential",
      lat: 40.7489,
      lng: -73.9851
    },
    {
      id: 7,
      name: "Carlos Rodriguez",
      rating: 4.6,
      reviewCount: 73,
      specialties: ["Water Heater Replacement", "Tankless Systems", "Repairs"],
      startingPrice: 59,
      responseTime: "< 2 hrs",
      yearsExperience: 7,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "North District",
      completedJobs: 180,
      category: "residential",
      lat: 40.7789,
      lng: -73.9861
    },
    {
      id: 8,
      name: "Amanda Lee",
      rating: 4.9,
      reviewCount: 145,
      specialties: ["Luxury Bathroom Design", "Spa Installations", "High-End Fixtures"],
      startingPrice: 149,
      responseTime: "< 1 hr",
      yearsExperience: 14,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "Downtown",
      completedJobs: 410,
      category: "remodeling",
      lat: 40.7589,
      lng: -73.9751
    },
    {
      id: 9,
      name: "Thomas Baker",
      rating: 4.7,
      reviewCount: 92,
      specialties: ["Drain Snaking", "Video Inspection", "Hydro Jetting"],
      startingPrice: 79,
      responseTime: "< 30 min",
      yearsExperience: 11,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "East Side",
      completedJobs: 265,
      category: "maintenance",
      lat: 40.7389,
      lng: -73.9681
    }
  ];

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Round to 1 decimal
  };

  // Get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setLocationLoading(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationLoading(false);
        setSortBy('distance'); // Auto-sort by distance
      },
      (error) => {
        setLocationLoading(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location permission denied. Please enable location access.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out.');
            break;
          default:
            setLocationError('An unknown error occurred.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Add distance to plumbers if user location is available
  const plumbersWithDistance = allPlumbers.map(plumber => ({
    ...plumber,
    distance: userLocation ? calculateDistance(userLocation.lat, userLocation.lng, plumber.lat, plumber.lng) : null
  }));

  // Filter plumbers
  const filteredPlumbers = plumbersWithDistance.filter(plumber => {
    const matchesSearch = plumber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plumber.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || plumber.category === selectedCategory;

    const matchesRating = selectedRating === 'all' ||
                          (selectedRating === '4.5+' && plumber.rating >= 4.5) ||
                          (selectedRating === '4.8+' && plumber.rating >= 4.8);

    const matchesDistance = !userLocation || !plumber.distance || plumber.distance <= maxDistance;

    return matchesSearch && matchesCategory && matchesRating && matchesDistance;
  });

  // Sort plumbers
  const sortedPlumbers = [...filteredPlumbers].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        if (!userLocation) return 0;
        return (a.distance || 999) - (b.distance || 999);
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      case 'experience':
        return b.yearsExperience - a.yearsExperience;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-100 mb-4">Find Your Perfect Plumber</h1>
          <p className="text-xl text-slate-400">Browse {allPlumbers.length} verified plumbers in your area</p>
        </div>

        {/* Search Bar and Location Button */}
        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-slate-800 border-2 border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-lg shadow-lg shadow-blue-500/5"
            />
            <svg className="w-6 h-6 text-slate-500 absolute left-5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Use My Location Button */}
          <button
            onClick={getUserLocation}
            disabled={locationLoading}
            className={`w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
              userLocation
                ? 'bg-green-600 text-white shadow-lg shadow-green-500/50'
                : 'bg-blue-600 text-white hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105'
            } ${locationLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {locationLoading ? (
              <>
                <svg className="animate-spin w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Getting your location...
              </>
            ) : userLocation ? (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Location Detected • Showing Nearest Plumbers
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Use My Location to Find Nearest Plumbers
              </>
            )}
          </button>

          {/* Location Error */}
          {locationError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {locationError}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-lg shadow-blue-500/5 p-6 sticky top-24 space-y-6">
              <h2 className="text-xl font-bold text-slate-100 mb-4">Filters</h2>

              {/* Distance Filter */}
              {userLocation && (
                <div>
                  <h3 className="font-semibold text-slate-300 mb-3">
                    Distance: <span className="text-blue-400">{maxDistance} miles</span>
                  </h3>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>5 mi</span>
                    <span>50 mi</span>
                  </div>
                </div>
              )}

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-slate-300 mb-3">Category</h3>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All Services', icon: '🔧' },
                    { id: 'emergency', label: 'Emergency 24/7', icon: '🚨' },
                    { id: 'residential', label: 'Residential', icon: '🏠' },
                    { id: 'commercial', label: 'Commercial', icon: '🏢' },
                    { id: 'remodeling', label: 'Remodeling', icon: '🛠️' },
                    { id: 'maintenance', label: 'Maintenance', icon: '⚙️' }
                  ].map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing Info */}
              <div>
                <h3 className="font-semibold text-slate-300 mb-3">Pricing</h3>
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-400 font-semibold mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Fixed Per-Service
                  </div>
                  <p className="text-sm text-slate-400">All plumbers offer transparent, fixed pricing per service. No hourly surprises!</p>
                  <div className="mt-3 text-xs text-slate-500">
                    Starting from <span className="text-green-400 font-bold">$69</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-semibold text-slate-300 mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All Ratings' },
                    { id: '4.5+', label: '4.5+ Stars' },
                    { id: '4.8+', label: '4.8+ Stars' }
                  ].map(rating => (
                    <button
                      key={rating.id}
                      onClick={() => setSelectedRating(rating.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        selectedRating === rating.id
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {rating.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedRating('all');
                  setSearchQuery('');
                  setUserLocation(null);
                  setMaxDistance(50);
                }}
                className="w-full px-4 py-2 border-2 border-slate-700 text-slate-300 rounded-lg hover:border-red-500 hover:text-red-400 transition-all font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Plumbers Grid */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-400">
                Showing <span className="font-bold text-slate-100">{sortedPlumbers.length}</span> plumbers
              </p>
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-slate-300">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-slate-800 border-2 border-slate-700 text-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  {userLocation && <option value="distance">Nearest First</option>}
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="experience">Most Experience</option>
                </select>
              </div>
            </div>

            {/* Plumber Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {sortedPlumbers.map((plumber) => (
                <div
                  key={plumber.id}
                  className="bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/50 transition-all hover:-translate-y-1"
                >
                  {/* Header with Image and Basic Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={plumber.image}
                        alt={plumber.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-500/30"
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
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-bold text-slate-100 mb-1">{plumber.name}</h3>
                        {/* Near Me Badge */}
                        {plumber.distance !== null && plumber.distance <= 5 && (
                          <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full whitespace-nowrap shadow-lg shadow-green-500/50">
                            NEAR YOU
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          <span className="text-yellow-500 text-lg">★</span>
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
                        {/* Distance Badge */}
                        {plumber.distance !== null && (
                          <span className="ml-auto px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30">
                            {plumber.distance} mi away
                          </span>
                        )}
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
                      <div className="font-bold text-green-400">${plumber.startingPrice}</div>
                      <div className="text-xs text-slate-500">Starting</div>
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
                      className="block w-full text-center px-4 py-2 border-2 border-blue-600 text-blue-400 rounded-xl hover:bg-blue-500/10 transition-all font-semibold"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {sortedPlumbers.length === 0 && (
              <div className="text-center py-20 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">No plumbers found</h3>
                <p className="text-slate-400 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedRating('all');
                    setSearchQuery('');
                    setMaxDistance(50);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}
