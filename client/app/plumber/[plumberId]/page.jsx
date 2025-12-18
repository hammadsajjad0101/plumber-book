'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import Header from '../../components/Header';

export default function PlumberProfile() {
  const params = useParams();
  const plumberId = parseInt(params.plumberId);
  const [activeTab, setActiveTab] = useState('about');

  // Sample plumber data (in production, fetch from API)
  const plumbers = {
    1: {
      id: 1,
      name: "Mike Anderson",
      rating: 4.9,
      reviewCount: 127,
      specialties: ["Emergency Repairs", "Leak Detection", "Pipe Installation", "Water Heater Repair"],
      priceRange: "$$",
      responseTime: "< 30 min",
      yearsExperience: 15,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "Downtown, City Center",
      completedJobs: 450,
      bio: "Licensed and insured plumber with over 15 years of experience. Specialized in emergency repairs and leak detection. Available 24/7 for urgent issues.",
      certifications: ["Master Plumber License", "Gas Line Certified", "Backflow Prevention"],
      serviceArea: "Downtown, City Center, West End (10 mile radius)",
      hourlyRate: "$85-120/hr",
      emergencyRate: "$150/hr",
      photos: [
        "https://images.unsplash.com/photo-1621905252472-178fdd180f9f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop"
      ],
      reviews: [
        {
          id: 1,
          customerName: "John Smith",
          rating: 5,
          date: "2 days ago",
          comment: "Mike was fantastic! Fixed our leaking pipe quickly and professionally. Highly recommend!",
          service: "Leak Repair"
        },
        {
          id: 2,
          customerName: "Sarah Johnson",
          rating: 5,
          date: "1 week ago",
          comment: "Very professional and knowledgeable. Arrived on time and explained everything clearly.",
          service: "Water Heater Installation"
        },
        {
          id: 3,
          customerName: "David Lee",
          rating: 4,
          date: "2 weeks ago",
          comment: "Great service, fair pricing. Only minor issue was he arrived 15 minutes late but called ahead.",
          service: "Pipe Installation"
        },
        {
          id: 4,
          customerName: "Emily Chen",
          rating: 5,
          date: "3 weeks ago",
          comment: "Emergency call at 11 PM - Mike came within 30 minutes and fixed the issue. Lifesaver!",
          service: "Emergency Repair"
        },
        {
          id: 5,
          customerName: "Robert Williams",
          rating: 5,
          date: "1 month ago",
          comment: "Outstanding work on our bathroom renovation. Clean, efficient, and reasonably priced.",
          service: "Bathroom Plumbing"
        }
      ]
    },
    2: {
      id: 2,
      name: "Sarah Thompson",
      rating: 4.8,
      reviewCount: 98,
      specialties: ["Bathroom Remodeling", "Water Heaters", "Fixtures", "Kitchen Plumbing"],
      priceRange: "$$$",
      responseTime: "< 1 hr",
      yearsExperience: 12,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "North District",
      completedJobs: 320,
      bio: "Specialized in bathroom and kitchen remodeling. Known for high-quality work and attention to detail.",
      certifications: ["Licensed Plumber", "Bathroom Specialist", "Fixture Installation Expert"],
      serviceArea: "North District, East Side (15 mile radius)",
      hourlyRate: "$95-140/hr",
      emergencyRate: "$180/hr",
      photos: [
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop"
      ],
      reviews: [
        {
          id: 1,
          customerName: "Jennifer Brown",
          rating: 5,
          date: "3 days ago",
          comment: "Sarah did an amazing job on our bathroom remodel. Every detail was perfect!",
          service: "Bathroom Remodeling"
        },
        {
          id: 2,
          customerName: "Michael Davis",
          rating: 5,
          date: "1 week ago",
          comment: "Professional and creative. Helped us design the perfect layout for our new kitchen.",
          service: "Kitchen Plumbing"
        },
        {
          id: 3,
          customerName: "Lisa Anderson",
          rating: 4,
          date: "2 weeks ago",
          comment: "Great work overall. Price was a bit higher than expected but worth the quality.",
          service: "Fixture Installation"
        }
      ]
    },
    3: {
      id: 3,
      name: "David Chen",
      rating: 5.0,
      reviewCount: 203,
      specialties: ["Commercial Plumbing", "Drain Cleaning", "Inspection", "Sewer Line"],
      priceRange: "$$",
      responseTime: "< 15 min",
      yearsExperience: 20,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      verified: true,
      location: "East Side",
      completedJobs: 680,
      bio: "20 years of experience in both residential and commercial plumbing. Known for fast response times and thorough inspections.",
      certifications: ["Master Plumber", "Commercial Plumbing License", "Camera Inspection Certified"],
      serviceArea: "Entire City (commercial services available)",
      hourlyRate: "$80-110/hr",
      emergencyRate: "$140/hr",
      photos: [
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop"
      ],
      reviews: [
        {
          id: 1,
          customerName: "ABC Restaurant",
          rating: 5,
          date: "1 day ago",
          comment: "David saved our business! Fixed our drain issue in under an hour during lunch rush.",
          service: "Commercial Drain Cleaning"
        },
        {
          id: 2,
          customerName: "Tom Wilson",
          rating: 5,
          date: "5 days ago",
          comment: "Best plumber I've ever worked with. Thorough inspection and honest recommendations.",
          service: "Sewer Line Inspection"
        },
        {
          id: 3,
          customerName: "Maria Garcia",
          rating: 5,
          date: "1 week ago",
          comment: "Lightning fast response! Called at 8 AM and he was at my door by 8:15 AM.",
          service: "Emergency Service"
        }
      ]
    }
  };

  const plumber = plumbers[plumberId] || plumbers[1];

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xl ${star <= rating ? 'text-yellow-500' : 'text-slate-600'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-blue-500/10 border border-slate-800 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image and Quick Info */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={plumber.image}
                  alt={plumber.name}
                  className="w-48 h-48 rounded-2xl object-cover border-4 border-blue-500/30"
                />
                {plumber.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Name, Rating, and Details */}
            <div className="flex-1">
              <div className="mb-4">
                <h1 className="text-4xl font-bold text-slate-100 mb-2">{plumber.name}</h1>
                <div className="flex items-center gap-4 mb-3">
                  {renderStars(Math.floor(plumber.rating))}
                  <span className="text-2xl font-bold text-slate-200">{plumber.rating}</span>
                  <span className="text-slate-400">({plumber.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{plumber.location}</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-300 mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {plumber.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-800/30 border border-slate-700 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-slate-100">{plumber.yearsExperience}+</div>
                  <div className="text-sm text-slate-400">Years Experience</div>
                </div>
                <div className="bg-slate-800/30 border border-slate-700 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-slate-100">{plumber.completedJobs}+</div>
                  <div className="text-sm text-slate-400">Completed Jobs</div>
                </div>
                <div className="bg-slate-800/30 border border-slate-700 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-slate-100">{plumber.responseTime}</div>
                  <div className="text-sm text-slate-400">Response Time</div>
                </div>
                <div className="bg-slate-800/30 border border-slate-700 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-slate-100">{plumber.priceRange}</div>
                  <div className="text-sm text-slate-400">Price Range</div>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={`/book/${plumber.id}`}
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 transition-all font-bold text-lg"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 border-b border-slate-700">
            {[
              { id: 'about', label: 'About' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'photos', label: 'Work Photos' },
              { id: 'pricing', label: 'Pricing' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-400'
                    : 'text-slate-400 hover:text-blue-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-xl p-8">
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-4">About {plumber.name}</h2>
                <p className="text-slate-300 text-lg leading-relaxed">{plumber.bio}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-3">Certifications</h3>
                <ul className="space-y-2">
                  {plumber.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-3">Service Area</h3>
                <p className="text-slate-300">{plumber.serviceArea}</p>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Customer Reviews ({plumber.reviewCount})</h2>
              {plumber.reviews.map((review) => (
                <div key={review.id} className="border-b border-slate-700 pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-slate-100">{review.customerName}</div>
                      <div className="text-sm text-slate-500">{review.date}</div>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm border border-slate-700">
                      {review.service}
                    </span>
                  </div>
                  <p className="text-slate-300">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Work Photos</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plumber.photos.map((photo, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all border border-slate-700">
                    <img
                      src={photo}
                      alt={`Work sample ${idx + 1}`}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Pricing Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-slate-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-100 mb-2">Standard Rate</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{plumber.hourlyRate}</div>
                  <p className="text-slate-400">Regular business hours (Mon-Fri, 8 AM - 6 PM)</p>
                </div>
                <div className="border-2 border-red-500/30 rounded-xl p-6 bg-red-500/10">
                  <h3 className="text-xl font-bold text-slate-100 mb-2">Emergency Rate</h3>
                  <div className="text-3xl font-bold text-red-400 mb-2">{plumber.emergencyRate}</div>
                  <p className="text-slate-400">After hours, weekends, and emergencies</p>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <h3 className="font-bold text-blue-400 mb-2">Payment Methods Accepted</h3>
                <p className="text-slate-300">Cash, Credit Card, Debit Card, Venmo, Zelle</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
