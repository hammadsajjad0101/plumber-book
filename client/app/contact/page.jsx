'use client';

import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Header from '../components/Header';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast.success('Message sent successfully! We will get back to you soon.');

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      description: "Get a response within 24 hours",
      contact: "support@plumberbook.com",
      link: "mailto:support@plumberbook.com"
    },
    {
      icon: "📞",
      title: "Call Us",
      description: "Mon-Fri, 9 AM - 6 PM EST",
      contact: "(555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Chat with our team instantly",
      contact: "Start Chat",
      link: "#"
    },
    {
      icon: "📍",
      title: "Visit Us",
      description: "Portland, OR Office",
      contact: "123 Main Street, Suite 100",
      link: "https://maps.google.com"
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'feedback', label: 'Feedback' }
  ];

  const supportTeam = [
    {
      name: "Emma Wilson",
      role: "Customer Support Lead",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      bio: "Former plumber turned support specialist. Here to help you succeed!"
    },
    {
      name: "James Cooper",
      role: "Technical Support",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      bio: "Expert in troubleshooting and solving technical issues quickly."
    },
    {
      name: "Sofia Martinez",
      role: "Account Manager",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      bio: "Dedicated to helping you get the most out of PlumberBook."
    }
  ];

  const faqs = [
    {
      question: "How quickly will I get a response?",
      answer: "We aim to respond to all inquiries within 24 hours during business days. For urgent technical issues, our live chat provides instant support."
    },
    {
      question: "Do you offer phone support?",
      answer: "Yes! Our phone support is available Monday through Friday, 9 AM to 6 PM EST. Call us at (555) 123-4567."
    },
    {
      question: "Can I schedule a demo?",
      answer: "Absolutely! Use the contact form to request a demo, and we'll set up a personalized walkthrough of PlumberBook's features."
    },
    {
      question: "What if I need help outside business hours?",
      answer: "Our Help Center has extensive documentation and video tutorials available 24/7. You can also submit a support ticket anytime."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold border border-blue-500/20 mb-6 animate-fade-in">
            💬 Get in Touch
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-100 mb-6 animate-fade-in">
            We're Here to
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Help You Succeed
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Have questions? Need support? Want to learn more about PlumberBook? Our team is ready to assist you.
          </p>
        </div>

        {/* Hero Image - Plumber Team */}
        <div className="relative max-w-5xl mx-auto mb-20">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border-4 border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=600&fit=crop"
              alt="Support Team"
              className="w-full h-[400px] object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-3xl font-bold text-white mb-2">Real People, Real Support</h3>
              <p className="text-slate-200 text-lg">Our team includes former plumbers who understand your business inside and out.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-blue-500/10 transition-all hover:-translate-y-2 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{method.icon}</div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{method.title}</h3>
              <p className="text-slate-400 text-sm mb-3">{method.description}</p>
              <p className="text-blue-400 font-semibold">{method.contact}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Main Content - Form + Support Team */}
      <section className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-slate-100 mb-2">Send Us a Message</h2>
            <p className="text-slate-400 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
                <p className="text-slate-300">We've received your message and will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Inquiry Type *</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => handleChange('inquiryType', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Subject *</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="How can we help you?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Message *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
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
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Support Team */}
          <div>
            <h2 className="text-3xl font-bold text-slate-100 mb-2">Meet Our Support Team</h2>
            <p className="text-slate-400 mb-8">Real people who care about your success, not automated bots.</p>

            <div className="space-y-6 mb-12">
              {supportTeam.map((member, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-500/30"
                      />
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-4 border-slate-900 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-100">{member.name}</h3>
                      <p className="text-blue-400 font-semibold text-sm mb-2">{member.role}</p>
                      <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=500&fit=crop"
                alt="Team Collaboration"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-1">Always Available</h3>
                <p className="text-slate-200">Our team is committed to your success 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-100 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-slate-400">Quick answers to common questions</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors"
              >
                <h3 className="text-lg font-bold text-slate-100">{faq.question}</h3>
                <svg
                  className={`w-6 h-6 text-blue-400 flex-shrink-0 transition-transform duration-300 ${
                    openFaqIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Office Image Section */}
      <section className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=600&fit=crop"
            alt="Office Space"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-12">
              <h2 className="text-5xl font-bold text-white mb-4">Visit Our Portland Office</h2>
              <p className="text-slate-200 text-xl mb-6 leading-relaxed">
                Drop by for coffee and a chat about how PlumberBook can transform your business. We'd love to meet you in person!
              </p>
              <div className="flex items-center gap-2 text-slate-200 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-lg">123 Main Street, Suite 100, Portland, OR 97201</span>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-white text-slate-900 rounded-xl hover:shadow-xl hover:scale-105 transition-all font-bold text-lg"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl shadow-blue-500/20">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of plumbers who trust PlumberBook to manage their bookings and grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-xl hover:shadow-white/50 hover:scale-105 transition-all font-bold text-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/about"
              className="inline-block px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-bold text-lg"
            >
              Learn More
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
