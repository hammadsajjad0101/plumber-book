'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '../../components/Logo';
import { Upload, MapPin, Star, Camera, Clock, DollarSign, Award, Briefcase } from 'lucide-react';

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('basic');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [workPhotos, setWorkPhotos] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    bio: 'Experienced plumber with over 15 years in residential and commercial plumbing.',
    yearsExperience: '15',
    hourlyRate: '85',
    emergencyRate: '125',
    serviceRadius: '15',
    location: 'New York, NY',
    emergencyAvailable: true,
    certifications: ['Licensed Master Plumber', 'EPA Certified'],
  });

  const [selectedServices, setSelectedServices] = useState([
    'Emergency Repairs',
    'Leak Detection',
    'Drain Cleaning',
    'Water Heater Service'
  ]);

  const [customServices, setCustomServices] = useState([]);
  const [newServiceInput, setNewServiceInput] = useState('');

  const availableServices = [
    'Emergency Repairs',
    'Leak Detection',
    'Pipe Installation',
    'Drain Cleaning',
    'Water Heater Service',
    'Bathroom Remodeling',
    'Kitchen Plumbing',
    'Commercial Plumbing',
    'Sewer Line Repair',
    'Gas Line Work',
    'Fixture Installation',
    'Water Filtration',
    'Backflow Prevention',
    'Camera Inspection',
    'Hydro Jetting',
    'Septic Systems',
    'Water Line Replacement',
    'Garbage Disposal Service',
    'Toilet Repair',
    'Faucet Installation'
  ];

  // Combine default and custom services
  const allServices = [...availableServices, ...customServices];

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'business', label: 'Business Details', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Star className="w-4 h-4" /> },
    { id: 'location', label: 'Location & Radius', icon: <MapPin className="w-4 h-4" /> },
    { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" /> },
    { id: 'portfolio', label: 'Work Photos', icon: <Camera className="w-4 h-4" /> },
    { id: 'availability', label: 'Availability', icon: <Clock className="w-4 h-4" /> },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWorkPhotosUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWorkPhotos(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeWorkPhoto = (index) => {
    setWorkPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    const newCert = prompt('Enter certification name:');
    if (newCert) {
      handleInputChange('certifications', [...formData.certifications, newCert]);
    }
  };

  const removeCertification = (index) => {
    handleInputChange('certifications', formData.certifications.filter((_, i) => i !== index));
  };

  const addCustomService = () => {
    if (newServiceInput.trim() && !allServices.includes(newServiceInput.trim())) {
      setCustomServices(prev => [...prev, newServiceInput.trim()]);
      setSelectedServices(prev => [...prev, newServiceInput.trim()]);
      setNewServiceInput('');
    }
  };

  const removeCustomService = (service) => {
    setCustomServices(prev => prev.filter(s => s !== service));
    setSelectedServices(prev => prev.filter(s => s !== service));
  };

  const handleSave = () => {
    // TODO: Save to backend (Supabase/Firebase)
    console.log('Saving profile data:', { ...formData, selectedServices, profilePhoto, workPhotos });
    alert('Profile updated successfully! 🎉');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Dashboard Header */}
      <header className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Logo size="default" showText={true} />
            </Link>
            <div className="border-l border-slate-700 pl-4">
              <p className="text-sm text-slate-400">Profile Settings</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all font-medium"
            >
              ← Back to Dashboard
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

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Tabs Navigation */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-2 mb-8 flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'text-slate-400 hover:text-blue-400 hover:bg-slate-800/50'
              }`}
            >
              {tab.icon}
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-2xl shadow-blue-500/10 p-8">

          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Basic Information</h2>

              {/* Profile Photo */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-700 overflow-hidden flex items-center justify-center">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-12 h-12 text-slate-600" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/50">
                    <Upload className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePhotoUpload}
                    />
                  </label>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">Profile Photo</h3>
                  <p className="text-slate-400 text-sm">Upload a professional photo</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Business Details Tab */}
          {activeTab === 'business' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Business Details</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Years of Experience *</label>
                  <input
                    type="number"
                    value={formData.yearsExperience}
                    onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Hourly Rate ($) *</label>
                  <input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Emergency Rate ($) *</label>
                  <input
                    type="number"
                    value={formData.emergencyRate}
                    onChange={(e) => handleInputChange('emergencyRate', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Professional Bio *</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
                  placeholder="Tell customers about your experience, specialties, and what makes you stand out..."
                />
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Services Offered</h2>
                  <p className="text-slate-400 text-sm mt-1">Select all services you provide or add your own</p>
                </div>
                <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <span className="text-blue-400 font-semibold">{selectedServices.length} selected</span>
                </div>
              </div>

              {/* Add Custom Service Section */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Your Own Custom Service
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  Don't see the service you offer? Add it here!
                </p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newServiceInput}
                    onChange={(e) => setNewServiceInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomService()}
                    placeholder="e.g., Sump Pump Installation, Outdoor Plumbing..."
                    className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
                  />
                  <button
                    onClick={addCustomService}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Service
                  </button>
                </div>
              </div>

              {/* Custom Services List */}
              {customServices.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Your Custom Services ({customServices.length})
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {customServices.map(service => (
                      <div
                        key={service}
                        className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg shadow-green-500/30 border-2 border-green-500"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded bg-white border-2 border-white flex items-center justify-center">
                              <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="font-medium">{service}</span>
                          </div>
                          <button
                            onClick={() => removeCustomService(service)}
                            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                            title="Remove custom service"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Standard Services */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-100">Standard Services</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {availableServices.map(service => (
                    <button
                      key={service}
                      onClick={() => toggleService(service)}
                      className={`px-4 py-3 rounded-xl text-left transition-all ${
                        selectedServices.includes(service)
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 border-2 border-blue-500'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-2 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedServices.includes(service)
                            ? 'bg-white border-white'
                            : 'border-slate-600'
                        }`}>
                          {selectedServices.includes(service) && (
                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium">{service}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Location & Radius Tab */}
          {activeTab === 'location' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Location & Service Radius</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Location Input */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Business Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      placeholder="City, State"
                    />
                    <p className="text-xs text-slate-500 mt-2">Enter your business address or service area</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Street Address</label>
                    <input
                      type="text"
                      placeholder="123 Main Street"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none mb-3"
                    />
                    <input
                      type="text"
                      placeholder="Apartment, suite, etc. (optional)"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none mb-3"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        className="px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        className="px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Interactive Map */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">📍 Your Location on Map</label>
                  <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl overflow-hidden h-[400px]">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(formData.location || 'New York, NY')}&zoom=12`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Business Location Map"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    This map shows your approximate service location. Customers will see this on your profile.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-4">Service Radius: <span className="text-blue-400">{formData.serviceRadius} miles</span></label>

                {/* Radius Selector */}
                <div className="grid grid-cols-5 gap-3 mb-6">
                  {[5, 10, 15, 20, 25].map(radius => (
                    <button
                      key={radius}
                      onClick={() => handleInputChange('serviceRadius', radius.toString())}
                      className={`py-4 rounded-xl font-semibold transition-all ${
                        formData.serviceRadius === radius.toString()
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {radius}mi
                    </button>
                  ))}
                </div>

                {/* Visual Representation */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      {/* Concentric circles */}
                      <div className="w-64 h-64 rounded-full border-2 border-slate-600 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border-2 border-slate-600 flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full border-2 border-slate-600 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-blue-600 shadow-lg shadow-blue-500/50 flex items-center justify-center">
                              <MapPin className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Radius indicator */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <div
                          className="bg-blue-500/20 border-2 border-blue-500 rounded-full"
                          style={{
                            width: `${formData.serviceRadius * 10}px`,
                            height: `${formData.serviceRadius * 10}px`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-slate-400 mt-4">You'll receive booking requests within {formData.serviceRadius} miles of your location</p>
                </div>
              </div>
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-100">Certifications & Licenses</h2>
                <button
                  onClick={addCertification}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  Add Certification
                </button>
              </div>

              <div className="space-y-3">
                {formData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-blue-400" />
                      <span className="text-slate-200 font-medium">{cert}</span>
                    </div>
                    <button
                      onClick={() => removeCertification(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {formData.certifications.length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    No certifications added yet. Click "Add Certification" to get started.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Work Photos Tab */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Work Portfolio</h2>
                  <p className="text-slate-400 text-sm mt-1">Showcase your best work</p>
                </div>
                <label className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Upload Photos
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleWorkPhotosUpload}
                  />
                </label>
              </div>

              {workPhotos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {workPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Work ${index + 1}`}
                        className="w-full h-48 object-cover rounded-xl border-2 border-slate-700"
                      />
                      <button
                        onClick={() => removeWorkPhoto(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-700 rounded-xl p-12 text-center">
                  <Camera className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-2">No work photos uploaded yet</p>
                  <p className="text-slate-500 text-sm">Upload photos to showcase your completed projects</p>
                </div>
              )}
            </div>
          )}

          {/* Availability Tab */}
          {activeTab === 'availability' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Availability Settings</h2>

              {/* Emergency Availability Toggle */}
              <div className="flex items-center justify-between p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">24/7 Emergency Availability</h3>
                  <p className="text-slate-400 text-sm mt-1">Accept emergency calls outside regular hours</p>
                </div>
                <button
                  onClick={() => handleInputChange('emergencyAvailable', !formData.emergencyAvailable)}
                  className={`relative w-16 h-8 rounded-full transition-all ${
                    formData.emergencyAvailable ? 'bg-blue-600' : 'bg-slate-700'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    formData.emergencyAvailable ? 'transform translate-x-8' : ''
                  }`} />
                </button>
              </div>

              {/* Working Hours */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Regular Working Hours</h3>
                <div className="space-y-3">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-32">
                        <span className="text-slate-300 font-medium">{day}</span>
                      </div>
                      <input
                        type="time"
                        defaultValue="09:00"
                        className="px-3 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      />
                      <span className="text-slate-400">to</span>
                      <input
                        type="time"
                        defaultValue="17:00"
                        className="px-3 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      />
                      <button className="text-slate-400 hover:text-red-400 transition-colors">
                        Closed
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
