'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

export default function BookingPage({ params }) {
  const plumberId = parseInt(params.businessId);
  const [step, setStep] = useState(1); // 1: Select Date/Time, 2: Enter Details, 3: Success
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: '',
    description: ''
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample plumber data (in production, fetch from API)
  const plumbers = {
    1: {
      id: 1,
      name: "Mike Anderson",
      rating: 4.9,
      reviewCount: 127,
      specialties: ["Emergency Repairs", "Leak Detection", "Pipe Installation"],
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "Downtown, City Center",
      responseTime: "< 30 min",
      hourlyRate: "$85-120/hr"
    },
    2: {
      id: 2,
      name: "Sarah Thompson",
      rating: 4.8,
      reviewCount: 98,
      specialties: ["Bathroom Remodeling", "Water Heaters", "Fixtures"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "North District",
      responseTime: "< 1 hr",
      hourlyRate: "$95-140/hr"
    },
    3: {
      id: 3,
      name: "David Chen",
      rating: 5.0,
      reviewCount: 203,
      specialties: ["Commercial Plumbing", "Drain Cleaning", "Inspection"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "East Side",
      responseTime: "< 15 min",
      hourlyRate: "$80-110/hr"
    }
  };

  const plumber = plumbers[plumberId] || plumbers[1];

  // Sample booked times data (in production, fetch from API/database)
  // Format: { 'YYYY-MM-DD': ['8:00 AM', '9:30 AM', ...] }
  const bookedTimes = {
    // Today's bookings
    [new Date().toISOString().split('T')[0]]: ['9:00 AM', '2:00 PM', '4:30 PM'],
    // Tomorrow's bookings
    [new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]]: ['10:30 AM', '1:00 PM', '3:00 PM'],
    // Day after tomorrow
    [new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0]]: ['8:00 AM', '11:00 AM', '2:30 PM', '5:00 PM'],
  };

  // Helper function to check if a time slot is already booked
  const isTimeBooked = (date, time) => {
    if (!date) return false;
    const dateKey = date.toISOString().split('T')[0];
    return bookedTimes[dateKey]?.includes(time) || false;
  };

  // Generate calendar dates for current month
  const generateCalendarDates = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const dates = [];

    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      dates.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      // Only include dates from today onwards
      if (date >= new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        dates.push(date);
      } else {
        dates.push(null);
      }
    }

    return dates;
  };

  const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM'
  ];

  const serviceTypes = [
    'Emergency Repair',
    'Routine Maintenance',
    'Installation',
    'Inspection',
    'Drain Cleaning',
    'Water Heater Service',
    'Other'
  ];

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxImages = 5;

    if (uploadedImages.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert(`${file.name} is too large. Maximum file size is 5MB`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          preview: reader.result
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setStep(3);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const calendarDates = generateCalendarDates();
  const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Success Screen
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-2xl p-8 text-center space-y-6 animate-scale-in">
            <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-2">Booking Confirmed!</h2>
              <p className="text-lg text-slate-400">Thank you, {formData.name}!</p>
            </div>
            <div className="bg-blue-500/10 border-blue-500/20 rounded-lg p-4 space-y-2 text-left border">
              <div className="flex justify-between">
                <span className="text-slate-400">Plumber:</span>
                <span className="font-semibold text-slate-200">{plumber.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Service:</span>
                <span className="font-semibold text-slate-200">{formData.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date:</span>
                <span className="font-semibold text-slate-200">{formatDate(selectedDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Time:</span>
                <span className="font-semibold text-slate-200">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="font-semibold text-slate-200">{formData.phone}</span>
              </div>
              {uploadedImages.length > 0 && (
                <div className="pt-2">
                  <span className="text-slate-400 text-sm">Attached Photos:</span>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {uploadedImages.map((image) => (
                      <img
                        key={image.id}
                        src={image.preview}
                        alt={image.name}
                        className="w-full h-16 object-cover rounded border border-slate-700"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <p className="text-slate-400">
                We'll contact you at {formData.phone} to confirm your appointment.
              </p>
              <p className="text-sm text-slate-500">
                📱 You'll receive an SMS confirmation shortly.
              </p>
            </div>
            <button
              onClick={() => {
                setStep(1);
                setSelectedDate(null);
                setSelectedTime(null);
                setUploadedImages([]);
                setFormData({
                  name: '', phone: '', email: '', address: '',
                  serviceType: '', description: ''
                });
              }}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all font-semibold"
            >
              Book Another Appointment
            </button>
            <Link href="/" className="block text-sm text-slate-500 hover:text-blue-400 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* Plumber Info Banner */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Plumber Image */}
            <div className="relative flex-shrink-0">
              <img
                src={plumber.image}
                alt={plumber.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-slate-700"
              />
              {plumber.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1.5">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* Plumber Details */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-slate-100 mb-2">Book with {plumber.name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="font-bold text-slate-200">{plumber.rating}</span>
                  <span className="text-slate-400 text-sm">({plumber.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{plumber.location}</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                {plumber.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Response: {plumber.responseTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{plumber.hourlyRate}</span>
                </div>
              </div>
            </div>

            {/* View Profile Link */}
            <div className="flex-shrink-0">
              <Link
                href={`/plumber/${plumber.id}`}
                className="px-6 py-2 border-2 border-blue-600 text-blue-400 rounded-xl hover:bg-blue-500/10 transition-all font-semibold text-sm"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-400' : 'text-slate-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                {step > 1 ? '✓' : '1'}
              </div>
              <span className="font-semibold hidden sm:inline">Select Date & Time</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-700"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-400' : 'text-slate-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                2
              </div>
              <span className="font-semibold hidden sm:inline">Your Details</span>
            </div>
          </div>
        </div>

        {/* Step 1: Calendar & Time Selection */}
        {step === 1 && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Calendar */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-4">Select a Date</h3>
              <div className="mb-4">
                <p className="text-lg font-semibold text-center text-slate-200">{monthName}</p>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-slate-400 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar dates */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => date && handleDateSelect(date)}
                    disabled={!date}
                    className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                      !date
                        ? 'invisible'
                        : selectedDate && date.toDateString() === selectedDate.toDateString()
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:scale-105'
                    }`}
                  >
                    {date ? date.getDate() : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-4">
                {selectedDate ? formatDate(selectedDate) : 'Select a date first'}
              </h3>

              {selectedDate ? (
                <>
                  {/* Availability Legend */}
                  <div className="mb-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 bg-green-500/20 border border-green-500/40 rounded"></div>
                        <span className="text-slate-400">Available</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 bg-red-500/20 border border-red-500/40 rounded"></div>
                        <span className="text-slate-400">Booked</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 bg-blue-600 rounded"></div>
                        <span className="text-slate-400">Selected</span>
                      </div>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {timeSlots.map(time => {
                      const isBooked = isTimeBooked(selectedDate, time);
                      const isSelected = selectedTime === time;

                      return (
                        <button
                          key={time}
                          onClick={() => !isBooked && handleTimeSelect(time)}
                          disabled={isBooked}
                          className={`w-full py-3 px-4 rounded-lg font-medium transition-all relative group ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                              : isBooked
                              ? 'bg-red-500/10 text-red-400 border border-red-500/30 cursor-not-allowed opacity-60'
                              : 'bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 hover:scale-102'
                          }`}
                        >
                          <span className="flex items-center justify-between">
                            <span>{time}</span>
                            {isBooked && (
                              <span className="text-xs flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              </span>
                            )}
                            {!isBooked && !isSelected && (
                              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </span>
                            )}
                          </span>
                          {isBooked && (
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-red-400 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-red-500/30 pointer-events-none">
                              Already booked
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>Select a date to see available times</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {step === 1 && (
          <div className="mt-6 text-center">
            <button
              onClick={handleContinue}
              disabled={!selectedDate || !selectedTime}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Continue to Details →
            </button>
          </div>
        )}

        {/* Step 2: Contact Details Form */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-xl p-8 space-y-6 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-sm font-semibold mb-4">
                📅 {formatDate(selectedDate)} at {selectedTime}
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="block mx-auto text-sm text-blue-400 hover:underline"
              >
                Change date/time
              </button>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                placeholder="John Smith"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: formatPhoneNumber(e.target.value)})}
                required
                maxLength={14}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Email <span className="text-slate-500 text-xs">(Optional)</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                placeholder="john@email.com"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Service Address <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                placeholder="123 Main St, City, State"
              />
            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Service Type <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="">Select a service...</option>
                {serviceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Job Description <span className="text-slate-500 text-xs">(Optional)</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
                placeholder="Please describe the issue or service needed..."
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Upload Photos <span className="text-slate-500 text-xs">(Optional - Max 5 images, 5MB each)</span>
              </label>

              <div className="space-y-4">
                {/* Upload Button */}
                <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-slate-700 bg-slate-800/50 backdrop-blur-sm rounded-xl cursor-pointer hover:border-blue-500 hover:bg-slate-800 transition-all">
                  <svg className="w-12 h-12 text-slate-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-slate-400 font-medium">Click to upload images</span>
                  <span className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP up to 5MB</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {/* Image Previews */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.preview}
                          alt={image.name}
                          className="w-full h-32 object-cover rounded-lg border-2 border-slate-700"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate">
                          {image.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {uploadedImages.length > 0 && (
                  <p className="text-xs text-slate-500 text-center">
                    {uploadedImages.length} / 5 images uploaded
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/50 hover:scale-[1.02] transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Confirming Booking...
                </span>
              ) : (
                'Confirm Booking'
              )}
            </button>

            <p className="text-sm text-slate-500 text-center">
              📱 You'll receive an SMS confirmation after booking
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
