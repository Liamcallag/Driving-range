# Florida Driving Ranges

A directory of driving ranges across Florida at [floridadrivingranges.com](https://floridadrivingranges.com).

Florida Driving Ranges is a complete guide to outdoor, indoor, and high-tech driving range facilities statewide. Users can search, filter, and view ranges on an interactive map.

## Features

- Interactive map with all driving ranges plotted (Leaflet)
- Search by name or location
- Filter by type (outdoor, indoor, TopGolf-style) and price range
- Individual range pages with details, hours, and contact info
- Mobile-optimised with collapsible filters and tap-to-activate map
- Side-drawer navigation on mobile
- Blog with golf and driving range content
- 280+ ranges in the database

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Map:** Leaflet / React Leaflet
- **Database:** Supabase
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `app/` — pages and routes (App Router)
- `components/` — React components including the map, directory, and navigation
- `public/` — images and static assets
