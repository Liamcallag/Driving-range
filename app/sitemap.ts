import { MetadataRoute } from 'next';
import rangesData from '@/data/ranges.json';
import { Range } from '@/lib/types';
import { CITY_PAGES } from '@/lib/cities';

const ranges = rangesData as Range[];

export default function sitemap(): MetadataRoute.Sitemap {
  const rangeUrls = ranges.map((range) => ({
    url: `https://floridadrivingranges.com/ranges/${range.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const cityUrls = CITY_PAGES.map((city) => ({
    url: `https://floridadrivingranges.com/cities/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://floridadrivingranges.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://floridadrivingranges.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://floridadrivingranges.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...cityUrls,
    ...rangeUrls,
  ];
}
