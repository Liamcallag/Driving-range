export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: 'Locations' | 'Tips' | 'Technology' | 'Guides';
  readTime: number;
  image?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'best-driving-ranges-florida',
    title: 'Best Driving Ranges in Florida',
    description: 'A guide to the best driving ranges across Florida — from high-tech TrackMan facilities to classic outdoor grass ranges. Find your perfect practice spot.',
    date: '2026-03-26',
    category: 'Locations',
    readTime: 7,
    image: '/images/blog/best-ranges-florida.jpg',
  },
  {
    slug: 'best-driving-ranges-orlando',
    title: 'Best Driving Ranges in Orlando, FL',
    description: 'Orlando has one of the most diverse driving range scenes in Florida. Here are the top spots to practice your game in and around the city.',
    date: '2026-03-26',
    category: 'Locations',
    readTime: 6,
    image: '/images/blog/best-ranges-orlando.jpg',
  },
  {
    slug: 'best-driving-ranges-naples',
    title: 'Best Driving Ranges in Naples, FL',
    description: 'Naples is one of Florida\'s premier golf destinations. Here are the best driving ranges in Naples for golfers of every level.',
    date: '2026-03-26',
    category: 'Locations',
    readTime: 5,
    image: '/images/blog/best-ranges-naples.jpg',
  },
  {
    slug: 'trackman-vs-toptracer',
    title: 'TrackMan vs TopTracer: What\'s the Difference?',
    description: 'TrackMan and TopTracer are the two most common ball-tracking technologies at driving ranges. Here\'s how they differ and which one is right for you.',
    date: '2026-03-26',
    category: 'Technology',
    readTime: 6,
    image: '/images/blog/trackman-toptracer.png',
  },
  {
    slug: 'how-to-practice-at-a-driving-range',
    title: 'How to Practice at a Driving Range (And Actually Improve)',
    description: 'Most golfers waste their time at the driving range. Here\'s how to structure your practice sessions to see real improvement in your game.',
    date: '2026-03-26',
    category: 'Tips',
    readTime: 7,
    image: '/images/blog/how-to-practice.jpg',
  },
  {
    slug: 'grass-tees-vs-mats',
    title: 'Grass Tees vs Mats: Which is Better for Your Golf Game?',
    description: 'Should you practice on grass tees or mats? We break down the pros and cons of each surface and which is better for your swing development.',
    date: '2026-03-26',
    category: 'Tips',
    readTime: 5,
    image: '/images/blog/grass-tees.jpg',
  },
  {
    slug: 'golf-simulators-florida',
    title: 'Golf Simulators in Florida: Everything You Need to Know',
    description: 'Indoor golf simulators are becoming increasingly popular across Florida. Here\'s what to expect, how much they cost, and where to find the best ones.',
    date: '2026-03-26',
    category: 'Guides',
    readTime: 6,
    image: '/images/blog/golf-simulator.png',
  },
  {
    slug: 'best-indoor-driving-ranges-florida',
    title: 'Best Indoor Driving Ranges in Florida (2026)',
    description: 'The best indoor driving ranges and golf simulator facilities in Florida — from TrackMan bays and upscale sim lounges to casual bar-and-golf venues across the state.',
    date: '2026-03-30',
    category: 'Guides',
    readTime: 8,
    image: '/images/blog/best-indoor-ranges-florida.png',
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
