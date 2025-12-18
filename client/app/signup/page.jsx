'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Account created successfully! Welcome to PlumberBook.');

    // Redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Flowing Pipes Network */}
        <svg className="absolute top-20 left-5 w-40 h-40 text-blue-500/10 animate-float" style={{animationDelay: '0s', animationDuration: '7s'}} viewBox="0 0 100 100">
          <path d="M10,50 L40,50 L40,20 M40,50 L70,50 M70,50 L70,80 L90,80" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="10" cy="50" r="5" fill="currentColor"/>
          <circle cx="40" cy="20" r="5" fill="currentColor"/>
          <circle cx="90" cy="80" r="5" fill="currentColor"/>
        </svg>

        <svg className="absolute top-60 right-10 w-36 h-36 text-indigo-500/10 animate-float" style={{animationDelay: '3s', animationDuration: '9s'}} viewBox="0 0 100 100">
          <path d="M20,30 L50,30 M50,30 L50,70 L80,70" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="20" cy="30" r="5" fill="currentColor"/>
          <circle cx="80" cy="70" r="5" fill="currentColor"/>
        </svg>

        {/* Animated Water Droplets */}
        <svg className="absolute top-32 right-1/4 w-14 h-14 text-blue-400/25 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '2.5s'}} viewBox="0 0 100 100">
          <path d="M50,10 Q65,35 50,55 Q35,35 50,10 Q50,55 50,75 Q30,75 30,57.5 Q30,40 50,20 Q70,40 70,57.5 Q70,75 50,75" fill="currentColor"/>
        </svg>

        <svg className="absolute bottom-40 left-1/3 w-16 h-16 text-cyan-400/25 animate-bounce" style={{animationDelay: '1.5s', animationDuration: '3s'}} viewBox="0 0 100 100">
          <path d="M50,10 Q65,35 50,55 Q35,35 50,10 Q50,55 50,75 Q30,75 30,57.5 Q30,40 50,20 Q70,40 70,57.5 Q70,75 50,75" fill="currentColor"/>
        </svg>

        <svg className="absolute top-1/2 left-10 w-12 h-12 text-blue-300/20 animate-bounce" style={{animationDelay: '2s', animationDuration: '2.8s'}} viewBox="0 0 100 100">
          <path d="M50,10 Q65,35 50,55 Q35,35 50,10 Q50,55 50,75 Q30,75 30,57.5 Q30,40 50,20 Q70,40 70,57.5 Q70,75 50,75" fill="currentColor"/>
        </svg>

        {/* Tool Icons */}
        <svg className="absolute bottom-32 right-20 w-32 h-32 text-slate-700/20 animate-pulse" style={{animationDuration: '5s'}} viewBox="0 0 100 100">
          <path d="M25,75 L45,55 M45,55 Q47,53 50,53 Q55,53 58,56 Q61,59 61,64 Q61,67 59,69 L72,82 L67,87 L54,74 Q52,76 49,76 Q44,76 41,73 Q38,70 38,65 Q38,62 40,60 L25,45 L30,40 L45,55" fill="currentColor"/>
        </svg>

        <svg className="absolute top-1/3 right-1/3 w-24 h-24 text-slate-600/15 animate-pulse" style={{animationDelay: '2s', animationDuration: '6s'}} viewBox="0 0 100 100">
          <rect x="20" y="35" width="60" height="30" rx="5" fill="none" stroke="currentColor" strokeWidth="5"/>
          <circle cx="35" cy="50" r="8" fill="currentColor"/>
          <circle cx="65" cy="50" r="8" fill="currentColor"/>
          <rect x="45" y="20" width="10" height="60" fill="currentColor" rx="3"/>
        </svg>

        {/* Rotating Valves/Gears */}
        <svg className="absolute top-1/4 left-1/4 w-24 h-24 text-blue-500/10 animate-spin-slow" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="7"/>
          <circle cx="50" cy="50" r="10" fill="currentColor"/>
          <rect x="47" y="18" width="6" height="18" fill="currentColor" rx="2"/>
          <rect x="47" y="64" width="6" height="18" fill="currentColor" rx="2"/>
          <rect x="18" y="47" width="18" height="6" fill="currentColor" rx="2"/>
          <rect x="64" y="47" width="18" height="6" fill="currentColor" rx="2"/>
        </svg>

        <svg className="absolute bottom-1/4 left-1/2 w-20 h-20 text-indigo-500/10 animate-spin-slow" style={{animationDelay: '5s'}} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="6"/>
          <circle cx="50" cy="50" r="8" fill="currentColor"/>
          <rect x="48" y="22" width="4" height="14" fill="currentColor" rx="2"/>
          <rect x="48" y="64" width="4" height="14" fill="currentColor" rx="2"/>
          <rect x="22" y="48" width="14" height="4" fill="currentColor" rx="2"/>
          <rect x="64" y="48" width="14" height="4" fill="currentColor" rx="2"/>
        </svg>

        {/* Gradient Ambient Orbs */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: '10s'}}></div>
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s', animationDuration: '12s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-600/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s', animationDuration: '15s'}}></div>
      </div>

      <div className="w-full max-w-2xl mx-auto relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">P</span>
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            PlumberBook
          </span>
        </Link>

        {/* Signup Card */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 shadow-2xl shadow-blue-500/10 rounded-2xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Create Your Account</h1>
            <p className="text-slate-400">Start managing bookings in minutes</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Business Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                placeholder="Joe's Plumbing Services"
              />
            </div>

            {/* Email and Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  placeholder="joe@plumbing.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: formatPhoneNumber(e.target.value)})}
                  required
                  maxLength={14}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  placeholder="(555) 999-8888"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Business Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                placeholder="123 Main Street, City, State"
              />
            </div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  placeholder="••••••••"
                />
                <p className="text-xs text-slate-400">Minimum 8 characters</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 mt-1 text-blue-600 border-slate-700 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-slate-400">
                I agree to the <Link href="/terms" className="text-blue-400 hover:text-blue-300 font-medium">Terms of Service</Link> and <Link href="/privacy" className="text-blue-400 hover:text-blue-300 font-medium">Privacy Policy</Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/50 hover:scale-[1.02] transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-900/50 text-slate-400">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            href="/login"
            className="block w-full py-3 text-center bg-slate-800 border border-slate-700 text-slate-200 rounded-xl hover:bg-slate-700 transition-all font-semibold"
          >
            Sign In
          </Link>
        </div>

        {/* Back to Home */}
        {/* <div className="text-center mt-6">
          <Link href="/" className="text-sm text-slate-300 hover:text-blue-400 transition-colors">
            ← Back to Home
          </Link>
        </div> */}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(3deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-float {
          animation: float 7s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
