'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Pipes */}
        <svg className="absolute top-10 left-10 w-32 h-32 text-blue-500/10 animate-float" style={{animationDelay: '0s', animationDuration: '6s'}} viewBox="0 0 100 100">
          <path d="M20,50 L80,50 M80,50 L80,80" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <circle cx="20" cy="50" r="6" fill="currentColor"/>
          <circle cx="80" cy="80" r="6" fill="currentColor"/>
        </svg>

        <svg className="absolute top-40 right-20 w-24 h-24 text-indigo-500/10 animate-float" style={{animationDelay: '2s', animationDuration: '8s'}} viewBox="0 0 100 100">
          <path d="M30,20 L30,80 M30,80 L70,80" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <circle cx="30" cy="20" r="6" fill="currentColor"/>
          <circle cx="70" cy="80" r="6" fill="currentColor"/>
        </svg>

        {/* Water Droplets */}
        <svg className="absolute bottom-20 left-1/4 w-16 h-16 text-blue-400/20 animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}} viewBox="0 0 100 100">
          <path d="M50,20 Q60,40 50,60 Q40,40 50,20 Q50,60 50,80 Q35,80 35,65 Q35,50 50,30 Q65,50 65,65 Q65,80 50,80" fill="currentColor"/>
        </svg>

        <svg className="absolute top-1/3 right-1/4 w-12 h-12 text-cyan-400/20 animate-bounce" style={{animationDelay: '2.5s', animationDuration: '2.5s'}} viewBox="0 0 100 100">
          <path d="M50,20 Q60,40 50,60 Q40,40 50,20 Q50,60 50,80 Q35,80 35,65 Q35,50 50,30 Q65,50 65,65 Q65,80 50,80" fill="currentColor"/>
        </svg>

        {/* Wrench Tools */}
        <svg className="absolute bottom-1/4 right-10 w-28 h-28 text-slate-700/20 animate-pulse" style={{animationDuration: '4s'}} viewBox="0 0 100 100">
          <path d="M30,70 L50,50 M50,50 Q52,48 55,48 Q60,48 63,51 Q66,54 66,59 Q66,62 64,64 L75,75 L70,80 L59,69 Q57,71 54,71 Q49,71 46,68 Q43,65 43,60 Q43,57 45,55 L30,40 L35,35 L50,50" fill="currentColor"/>
        </svg>

        {/* Gear/Valve Icons */}
        <svg className="absolute top-1/4 left-1/3 w-20 h-20 text-blue-500/10 animate-spin-slow" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="6"/>
          <circle cx="50" cy="50" r="8" fill="currentColor"/>
          <rect x="47" y="20" width="6" height="15" fill="currentColor" rx="2"/>
          <rect x="47" y="65" width="6" height="15" fill="currentColor" rx="2"/>
          <rect x="20" y="47" width="15" height="6" fill="currentColor" rx="2"/>
          <rect x="65" y="47" width="15" height="6" fill="currentColor" rx="2"/>
        </svg>

        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s', animationDuration: '10s'}}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">P</span>
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            PlumberBook
          </span>
        </Link>

        {/* Login Card */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 shadow-2xl shadow-blue-500/10 rounded-2xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Welcome Back</h1>
            <p className="text-slate-400">Sign in to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Email Address
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

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-slate-200">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-blue-600 border-slate-700 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-400">
                Remember me for 7 days
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
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-900/50 text-slate-400">Don't have an account?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link
            href="/signup"
            className="block w-full py-3 text-center bg-slate-800 border border-slate-700 text-slate-200 rounded-xl hover:bg-slate-700 transition-all font-semibold"
          >
            Create Account
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
            transform: translateY(-20px) rotate(5deg);
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
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
