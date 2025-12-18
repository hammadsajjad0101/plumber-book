'use client';

import Link from 'next/link';
import { useState } from 'react';
import Logo from './Logo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="px-6 py-4 border-b border-slate-800/50 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-slate-900/50">
      <nav className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <Logo size="default" showText={true} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/" className="relative px-4 py-2 text-slate-300 hover:text-white transition-all duration-300 font-medium group">
            <span className="relative z-10">Home</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-indigo-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-3/4 transition-all duration-300"></span>
          </Link>
          <Link href="/#browse-plumbers" className="relative px-4 py-2 text-slate-300 hover:text-white transition-all duration-300 font-medium group">
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
              href="/#browse-plumbers"
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
  );
}
