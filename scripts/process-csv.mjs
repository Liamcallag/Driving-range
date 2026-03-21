import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CSV_PATH = '/Users/liamcallaghan/Downloads/new - Sheet1 - with descriptions - new - Sheet1 - with descriptions.csv';
const OUTPUT_PATH = join(__dirname, '../data/ranges.json');

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractLatLng(locationLink) {
  if (!locationLink) return { lat: null, lng: null };
  const match = locationLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+),/);
  if (match) {
    return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
  }
  return { lat: null, lng: null };
}

function classifyTechLevel(row) {
  if (
    row['Trackman'] === 'Yes' ||
    row['Top tracer'] === 'Yes' ||
    row['Indoor'] === 'Yes'
  ) {
    return 'high';
  }
  return 'low';
}

function classifyCategory(row) {
  return row['Indoor'] === 'Yes' ? 'indoor' : 'outdoor';
}

const csvContent = readFileSync(CSV_PATH, 'utf-8');

const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
  relax_column_count: true,
  trim: true,
});

console.log(`Parsed ${records.length} records`);

const rawRanges = records.map((row) => {
  const { lat, lng } = extractLatLng(row['location_link']);

  return {
    slug: generateSlug(row['name']),
    name: row['name'] || '',
    trackman: row['Trackman'] || '',
    toptracer: row['Top tracer'] || '',
    indoor: row['Indoor'] || '',
    beginnerFriendly: row['beginner friendly'] || '',
    dresscode: row['dresscode'] || '',
    foodBar: row['food&bar'] || '',
    lighting: row['lighting'] || '',
    roof: row['roof'] || '',
    grass: row['Grass'] || '',
    phone: row['phone'] || '',
    website: row['website'] || '',
    address: row['address'] || '',
    street: row['street'] || '',
    city: row['city'] || '',
    county: row['county'] || '',
    state: row['state'] || '',
    postalCode: row['postal_code'] || '',
    rating: parseFloat(row['rating']) || 0,
    reviews: parseInt(row['reviews']) || 0,
    businessStatus: row['business_status'] || '',
    workingHours: row['working_hours'] || '',
    locationLink: row['location_link'] || '',
    description: row['Description'] || '',
    lat,
    lng,
    techLevel: classifyTechLevel(row),
    category: classifyCategory(row),
  };
});

// Deduplicate slugs: if multiple ranges share a slug, append city slug
const slugCounts = {};
rawRanges.forEach(r => { slugCounts[r.slug] = (slugCounts[r.slug] || 0) + 1; });

const ranges = rawRanges.map(r => {
  if (slugCounts[r.slug] > 1) {
    const citySlug = generateSlug(r.city);
    return { ...r, slug: `${r.slug}-${citySlug}` };
  }
  return r;
});

writeFileSync(OUTPUT_PATH, JSON.stringify(ranges, null, 2));
console.log(`Written ${ranges.length} ranges to ${OUTPUT_PATH}`);

// Stats
const indoor = ranges.filter(r => r.category === 'indoor').length;
const outdoor = ranges.filter(r => r.category === 'outdoor').length;
const highTech = ranges.filter(r => r.techLevel === 'high').length;
const withCoords = ranges.filter(r => r.lat !== null).length;
console.log(`Indoor: ${indoor}, Outdoor: ${outdoor}, High-Tech: ${highTech}, With coords: ${withCoords}`);
