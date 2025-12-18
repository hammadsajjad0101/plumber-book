'use client';

import Link from 'next/link';
import { useState } from 'react';
import { blogPostsData, blogCategories } from './blogData';
import Header from '../components/Header';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Convert blogPostsData object to array with slug added
  const blogPosts = Object.entries(blogPostsData).map(([slug, post]) => ({
    ...post,
    slug
  }));

  // Filter posts by category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured posts (first 2)
  const featuredPosts = blogPosts.slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent"></div>
        <div className="max-w-[1600px] mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-100 mb-6 text-center">
            Plumbing Insights & <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Expert Tips</span>
          </h1>
          <p className="text-xl text-slate-300 text-center max-w-3xl mx-auto mb-12">
            Stay informed with the latest plumbing trends, DIY guides, and professional advice to keep your home running smoothly.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-[1600px] mx-auto px-6 pb-12">
        <h2 className="text-3xl font-bold text-slate-100 mb-8">Featured Articles</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all hover:-translate-y-2"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </span>
                    <span className="text-slate-300 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-300 line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-4">
          {blogCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-100">
            {selectedCategory === 'all' ? 'All Articles' : blogCategories.find(c => c.id === selectedCategory)?.label}
          </h2>
          <p className="text-slate-400">{filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}</p>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-slate-400 mb-4">No articles found</p>
            <p className="text-slate-500">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <span className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="w-10 h-10 rounded-full border-2 border-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-200 truncate">{post.author}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-semibold group-hover:underline">Read More →</span>
                    <svg className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Never Miss an Update</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest plumbing tips, industry insights, and exclusive guides delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-xl hover:shadow-white/50 hover:scale-105 transition-all font-bold">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800">
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
                <li><Link href="/#features" className="hover:text-blue-400 transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
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
