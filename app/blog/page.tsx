import Link from 'next/link';
import Image from 'next/image';
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

const CATEGORY_ORDER = ['Locations', 'Guides', 'Technology', 'Tips'];

export default function BlogIndexPage() {
  const grouped = CATEGORY_ORDER.reduce<Record<string, typeof BLOG_POSTS>>((acc, cat) => {
    acc[cat] = BLOG_POSTS.filter((p) => p.category === cat);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="bg-green-900 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">Florida Driving Ranges</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">Blog</h1>
          <p className="text-lg text-green-100/80 leading-relaxed max-w-2xl mx-auto">
            Tips, guides, and local knowledge for golfers in Florida.
          </p>
        </div>
      </div>

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">


        {/* Grouped sections */}
        <div className="flex flex-col gap-14">
          {CATEGORY_ORDER.map((category) => {
            const posts = grouped[category];
            if (!posts || posts.length === 0) return null;

            return (
              <section key={category}>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl font-bold text-slate-900">{category}</h2>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[category]}`}>
                    {posts.length} {posts.length === 1 ? 'article' : 'articles'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-300 transition-all overflow-hidden group"
                    >
                      {post.image ? (
                        <div className="w-full h-36 relative">
                          <Image src={post.image} alt={post.title} fill className="object-cover object-center" />
                        </div>
                      ) : (
                        <div className="w-full h-36 bg-gradient-to-br from-green-50 to-slate-100 flex items-center justify-center text-green-300 text-4xl">
                          ⛳
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-slate-400">{post.readTime} min read</span>
                          <span className="text-xs text-slate-400">·</span>
                          <span className="text-xs text-slate-400">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-1.5 group-hover:text-green-700 transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{post.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

      </main>
    </div>
  );
}
