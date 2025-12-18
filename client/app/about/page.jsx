'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story');

  const teamMembers = [
    {
      name: "Sarah Mitchell",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
      bio: "Former plumber with 15 years of experience who saw the need for better booking solutions in the trades industry."
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Tech entrepreneur passionate about building tools that empower small businesses to compete in the digital age."
    },
    {
      name: "Jessica Rodriguez",
      role: "Customer Success Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      bio: "Dedicated to helping plumbers maximize their bookings and grow their businesses through technology."
    },
    {
      name: "David Thompson",
      role: "Lead Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Building scalable, reliable infrastructure that plumbers can depend on 24/7 for their business operations."
    }
  ];

  const stats = [
    { number: "5,000+", label: "Active Plumbers", icon: "🔧" },
    { number: "50,000+", label: "Bookings Monthly", icon: "📅" },
    { number: "98%", label: "Customer Satisfaction", icon: "⭐" },
    { number: "24/7", label: "Support Available", icon: "💬" }
  ];

  const milestones = [
    {
      year: "2020",
      title: "The Problem",
      description: "Sarah, a working plumber, was frustrated with missed calls, double bookings, and lost business opportunities. She knew there had to be a better way."
    },
    {
      year: "2021",
      title: "First Prototype",
      description: "After hours of sketching and planning, the first version of PlumberBook was built. 50 local plumbers signed up within the first month."
    },
    {
      year: "2022",
      title: "Growing Fast",
      description: "Word spread quickly. PlumberBook expanded to 10 cities, helping over 1,000 plumbers manage their bookings efficiently."
    },
    {
      year: "2023",
      title: "Going National",
      description: "Launched in all 50 states with advanced features like SMS notifications, route optimization, and customer reviews."
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Became the #1 booking platform for plumbing professionals, processing over 50,000 bookings monthly and counting."
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Built for Plumbers",
      description: "Every feature is designed with real plumbers in mind. We're not a generic booking tool—we understand the unique challenges of the plumbing business."
    },
    {
      icon: "⚡",
      title: "Simple & Fast",
      description: "No complicated setup or training required. Get your booking page live in minutes and start accepting appointments immediately."
    },
    {
      icon: "🔒",
      title: "Reliable & Secure",
      description: "Your business data is protected with bank-level security. We guarantee 99.9% uptime so you never miss a booking opportunity."
    },
    {
      icon: "💰",
      title: "Fair Pricing",
      description: "No hidden fees, commissions, or long-term contracts. Pay a simple monthly fee and keep 100% of your earnings."
    },
    {
      icon: "🤝",
      title: "Real Support",
      description: "Talk to real humans who care about your success. Our support team includes former plumbers who understand your business."
    },
    {
      icon: "📈",
      title: "Grow Your Business",
      description: "Get discovered by thousands of customers searching for reliable plumbers. Our platform helps you build your reputation and grow."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="max-w-[1600px] mx-auto px-6 py-20 text-center">
        <div className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold border border-blue-500/20 mb-6 animate-fade-in">
          🚀 About PlumberBook
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold text-slate-100 mb-6 animate-fade-in">
          Built by Plumbers,
          <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            For Plumbers
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed animate-fade-in">
          We're on a mission to help plumbing professionals grow their businesses by making booking management simple,
          automated, and accessible to everyone—no matter the size of your operation.
        </p>
      </section>

      {/* Stats Section */}
      <section className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 text-center hover:shadow-xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs Section */}
      <section className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-2 mb-8 flex flex-wrap gap-2">
          {[
            { id: 'story', label: '📖 Our Story', icon: '📖' },
            { id: 'mission', label: '🎯 Mission & Values', icon: '🎯' },
            { id: 'team', label: '👥 Meet the Team', icon: '👥' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Story Tab */}
        {activeTab === 'story' && (
          <div className="space-y-12 animate-fade-in">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-slate-100 mb-6">How PlumberBook Started</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-slate-300 leading-relaxed mb-4">
                  In 2020, Sarah Mitchell was running a successful one-person plumbing business in Portland, Oregon.
                  Despite being fully booked most days, she was constantly stressed about managing her appointments.
                  She'd miss calls while on job sites, double-book herself by accident, and lose track of customer details scribbled on scraps of paper.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed mb-4">
                  One particularly frustrating day—after missing three calls and accidentally booking two jobs at the same time—she
                  realized there had to be a better way. She looked at existing booking software, but they were either too expensive,
                  too complicated, or designed for restaurants and salons, not plumbers.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed mb-4">
                  That night, Sarah sketched out what would become PlumberBook: a simple, affordable booking system built specifically
                  for plumbing professionals. She partnered with her tech-savvy friend Michael to bring the idea to life.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Today, PlumberBook helps over 5,000 plumbers manage their bookings, grow their businesses, and spend less time on
                  paperwork and more time doing what they love—fixing pipes and helping customers.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">Our Journey</h2>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/50">
                          {milestone.year}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-100 mb-2">{milestone.title}</h3>
                        <p className="text-slate-400 text-lg leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mission & Values Tab */}
        {activeTab === 'mission' && (
          <div className="space-y-12 animate-fade-in">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-slate-100 mb-4">Our Mission</h2>
              <p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
                "To empower every plumbing professional with the tools they need to run a successful,
                stress-free business—so they can focus on what matters most: serving their customers."
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">What We Stand For</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1"
                  >
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold text-slate-100 mb-3">{value.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why We're Different */}
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-slate-100 mb-6 text-center">Why PlumberBook is Different</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 mb-1">No Commission Fees</h4>
                      <p className="text-slate-400">Unlike other platforms, we don't take a cut of your earnings. You keep 100% of what you make.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 mb-1">Industry Specific</h4>
                      <p className="text-slate-400">Built specifically for plumbers, not adapted from other industries. Every feature solves real plumbing business problems.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 mb-1">Easy Setup</h4>
                      <p className="text-slate-400">Get started in under 10 minutes. No technical skills required—if you can use a smartphone, you can use PlumberBook.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 mb-1">Real Human Support</h4>
                      <p className="text-slate-400">Our support team includes former plumbers who understand your challenges. Get help from people who actually care.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 mb-1">Mobile First</h4>
                      <p className="text-slate-400">Manage everything from your phone while on the go. Designed for plumbers who are always on the move.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 mb-1">Transparent Pricing</h4>
                      <p className="text-slate-400">No surprises. Simple, flat monthly pricing with no hidden fees or long-term contracts required.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-100 mb-4">Meet Our Team</h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                We're a small but mighty team of builders, problem-solvers, and former plumbers who are passionate
                about helping trade professionals succeed.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-blue-500/10 transition-all hover:-translate-y-2"
                >
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500/30"
                    />
                    <div className="absolute bottom-0 right-1/2 translate-x-16 translate-y-2 w-8 h-8 bg-green-500 border-4 border-slate-900 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-semibold mb-3">{member.role}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>

            {/* Join Team CTA */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-slate-100 mb-4">Want to Join Our Team?</h2>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                We're always looking for talented, passionate people who want to make a difference in the trades industry.
              </p>
              <a
                href="mailto:careers@plumberbook.com"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 transition-all font-bold text-lg"
              >
                View Open Positions →
              </a>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl shadow-blue-500/20">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Plumbing Business?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of plumbers who have simplified their booking process and grown their businesses with PlumberBook.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-xl hover:shadow-white/50 hover:scale-105 transition-all font-bold text-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/"
              className="inline-block px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-bold text-lg"
            >
              Browse Plumbers
            </Link>
          </div>
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
                <li><Link href="/#browse-plumbers" className="hover:text-blue-400 transition-colors">Find Plumbers</Link></li>
                <li><Link href="/signup" className="hover:text-blue-400 transition-colors">Sign Up</Link></li>
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
    </div>
  );
}
