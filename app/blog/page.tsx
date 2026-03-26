import Link from 'next/link';
import { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | Florida Driving Ranges',
  description: 'Tips, guides, and local knowledge for golfers in Florida. Read about the best driving ranges, practice techniques, and golf technology.',
  openGraph: {
    title: 'Blog | Florida Driving Ranges',
    description: 'Tips, guides, and local knowledge for golfers in Florida.',
    url: 'https://floridadrivingranges.com/blog',
    siteName: 'Florida Driving Ranges',
    type: 'website',
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Locations: 'bg-green-50 text-green-700 border-green-200',
  Tips: 'bg-blue-50 text-blue-700 border-blue-200',
  Technology: 'bg-purple-50 text-purple-700 border-purple-200',
  Guides: 'bg-orange-50 text-orange-700 border-orange-200',
};

export default function BlogIndexPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="min-h-screen bg-slate-50">
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Blog</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Tips, guides, and local knowledge for golfers in Florida.
          </p>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="block bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-300 transition-all mb-10 overflow-hidden group"
        >
          {/* Image placeholder */}
          <div className="w-full h-56 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-green-400 text-5xl">
            ⛳
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[featured.category]}`}>
                {featured.category}
              </span>
              <span className="text-xs text-slate-400">{featured.readTime} min read</span>
              <span className="text-xs text-slate-400">{new Date(featured.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-green-700 transition-colors">
              {featured.title}
            </h2>
            <p className="text-slate-600 leading-relaxed">{featured.description}</p>
            <span className="inline-block mt-4 text-sm font-medium text-green-700 group-hover:text-green-800">
              Read article →
            </span>
          </div>
        </Link>

        {/* Rest of posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-300 transition-all overflow-hidden group"
            >
              {/* Image placeholder */}
              <div className="w-full h-36 bg-gradient-to-br from-green-50 to-slate-100 flex items-center justify-center text-green-300 text-4xl">
                ⛳
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[post.category]}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400">{post.readTime} min read</span>
                </div>
                <h2 className="font-bold text-slate-900 mb-1.5 group-hover:text-green-700 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>

      </main>

      <footer className="border-t border-slate-200 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-400">
          <p>Florida Driving Ranges Directory</p>
          <p className="mt-1">Data accurate as of 2026 · Hours subject to change</p>
        </div>
      </footer>
    </div>
  );
}
