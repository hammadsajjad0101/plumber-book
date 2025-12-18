'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { blogPostsData } from '../blogData';
import Header from '../../components/Header';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;
  const post = blogPostsData[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-blue-400 hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  // Get related posts (excluding current post)
  const relatedPosts = Object.entries(blogPostsData)
    .filter(([key]) => key !== slug)
    .slice(0, 3)
    .map(([key, value]) => ({ ...value, slug: key }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      {/* Hero Image with Title Overlay */}
      <div className="relative h-[600px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
              <span className="text-slate-300 text-sm">{post.readTime}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 text-sm">{post.date}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-slate-300">{post.excerpt}</p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Author Info */}
        <div className="flex items-center gap-4 mb-12 pb-8 border-b border-slate-800">
          <img
            src={post.authorImage}
            alt={post.author}
            className="w-20 h-20 rounded-full border-4 border-slate-800"
          />
          <div>
            <div className="text-2xl font-bold text-slate-100">{post.author}</div>
            <div className="text-slate-400">{post.authorBio}</div>
          </div>
        </div>

        {/* Article Body with Enhanced Styling */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-slate-100 prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-800
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
            prose-strong:text-blue-400 prose-strong:font-bold
            prose-ul:text-slate-300 prose-li:mb-2
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            article-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <style jsx global>{`
          .article-content .lead-paragraph {
            font-size: 1.35rem;
            line-height: 1.8;
            color: #cbd5e1;
            font-weight: 500;
            margin-bottom: 3rem;
            padding-left: 1.5rem;
            border-left: 4px solid #3b82f6;
            background: linear-gradient(90deg, rgba(59, 130, 246, 0.1), transparent);
            padding-top: 1rem;
            padding-bottom: 1rem;
            border-radius: 0 0.5rem 0.5rem 0;
          }

          .article-content .article-image {
            margin: 3rem 0;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(71, 85, 105, 0.3);
          }

          .article-content .article-image img {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.3s ease;
          }

          .article-content .article-image:hover img {
            transform: scale(1.02);
          }
        `}</style>

        {/* Social Share Section */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Share this article</h3>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Twitter
            </button>
            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
              Facebook
            </button>
            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
              LinkedIn
            </button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="max-w-[1600px] mx-auto px-6 py-20 border-t border-slate-800">
        <h2 className="text-4xl font-bold text-slate-100 mb-12 text-center">Continue Reading</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {relatedPosts.map((relatedPost) => (
            <Link
              key={relatedPost.slug}
              href={`/blog/${relatedPost.slug}`}
              className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <span className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
                  {relatedPost.category.charAt(0).toUpperCase() + relatedPost.category.slice(1)}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {relatedPost.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>{relatedPost.readTime}</span>
                  <svg className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1600px] mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
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
              href="/blog"
              className="inline-block px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-bold text-lg"
            >
              Read More Articles
            </Link>
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
                <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                <li><Link href="/#features" className="hover:text-blue-400 transition-colors">Features</Link></li>
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
