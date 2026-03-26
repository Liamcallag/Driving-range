export interface CityInfo {
  name: string;
  slug: string;
  intro: string;
  closing: string;
}

export const CITY_PAGES: CityInfo[] = [
  {
    name: 'Orlando',
    slug: 'orlando',
    intro: 'Orlando is home to one of Florida\'s most diverse collections of driving ranges, from high-tech simulator bays in the city\'s entertainment corridors to traditional outdoor grass ranges in the surrounding suburbs. With year-round warm weather and a massive tourism industry, the Orlando area draws golfers of every level — from first-timers looking for a casual session to serious players putting in regular practice time. Whether you\'re near Disney, downtown, or in one of the surrounding communities, you\'re never far from a quality place to hit balls.',
    closing: 'Whether you\'re looking for a quick warm-up session, a night out at a tech-powered range, or serious practice time on a traditional outdoor facility, Orlando\'s range scene has something for every golfer. Use the listings above to find the right fit for your game.',
  },
  {
    name: 'Naples',
    slug: 'naples',
    intro: 'Naples consistently ranks among Florida\'s top golf destinations, and its driving range offerings reflect the city\'s reputation for quality. From upscale country club practice facilities to accessible public ranges, Naples gives golfers a wide variety of options within a compact area. The region\'s mild winters make it particularly popular with seasonal visitors and snowbirds looking to keep their game sharp, and several facilities offer TrackMan and Toptracer technology alongside premium amenities.',
    closing: 'Naples offers some of the best practice conditions in Florida, with consistently well-maintained facilities and a golf culture that takes the game seriously. Browse the listings above to find a driving range that matches your game and your schedule.',
  },
  {
    name: 'Jacksonville',
    slug: 'jacksonville',
    intro: 'Jacksonville\'s sprawling geography means its driving range scene is spread across a wide area, from the beaches to the city\'s western suburbs. The city has a strong golf culture backed by a large permanent population, and its ranges reflect that — offering everything from Topgolf-style entertainment venues to traditional practice facilities used by competitive players. Jacksonville is also home to the PGA Tour headquarters, which adds to the city\'s golf credibility and keeps standards high across its practice facilities.',
    closing: 'From the beaches to the suburbs, Jacksonville\'s driving ranges offer solid options for golfers at every level. Use the listings above to find the right facility for your practice needs.',
  },
  {
    name: 'Port St. Lucie',
    slug: 'port-st-lucie',
    intro: 'Port St. Lucie has grown rapidly into one of Florida\'s largest cities, and its golf infrastructure has kept pace with that growth. The Treasure Coast area offers a mix of public driving ranges and private club facilities, with options ranging from basic bucket-and-tee setups to technology-equipped practice bays. The city\'s central location on Florida\'s east coast makes it a practical destination for golfers travelling between Miami and Orlando.',
    closing: 'Port St. Lucie\'s growing golf scene means more options for local players than ever before. Check the listings above to find a driving range that suits your game.',
  },
  {
    name: 'Kissimmee',
    slug: 'kissimmee',
    intro: 'Kissimmee sits at the heart of Central Florida\'s tourism corridor, just south of Orlando, and its driving range scene reflects the area\'s mix of resort guests and local residents. Several major resort-adjacent golf facilities have established themselves here, offering high-quality practice amenities for visitors staying in the area\'s many hotels and vacation rentals. Kissimmee\'s ranges cater to a broad audience, from families looking for a casual introduction to the game to dedicated players seeking consistent practice time.',
    closing: 'Whether you\'re visiting Central Florida or a local looking for a reliable practice spot, Kissimmee\'s driving ranges offer convenient options close to the region\'s main attractions. Browse the listings above to find the right fit.',
  },
  {
    name: 'St. Augustine',
    slug: 'st-augustine',
    intro: 'St. Augustine is one of Florida\'s oldest and most storied cities, and its golf scene matches that heritage — offering a mix of historic course settings and well-established practice facilities. The area has become a significant golf destination in Northeast Florida, with a concentration of quality ranges catering to both residents and the city\'s strong tourism trade. The mild Northeast Florida climate and the area\'s natural beauty make practicing here a genuinely pleasant experience year-round.',
    closing: 'St. Augustine\'s golf scene combines history, natural beauty, and quality facilities in a way few Florida cities can match. Use the listings above to find a driving range in the area.',
  },
  {
    name: 'Fort Myers',
    slug: 'fort-myers',
    intro: 'Fort Myers and the surrounding Lee County area is a major golf destination in Southwest Florida, with facilities catering to both year-round residents and the large seasonal population that arrives each winter. The city\'s warm climate and flat terrain make it ideal for golf, and its driving ranges offer options from entertainment-focused venues to focused practice facilities used by serious players working on their games.',
    closing: 'Fort Myers is one of Southwest Florida\'s premier golf destinations, with driving ranges that match the area\'s reputation for quality. Check the listings above to find the right facility for your practice routine.',
  },
  {
    name: 'Tampa',
    slug: 'tampa',
    intro: 'Tampa\'s driving range scene reflects the city\'s diversity — ranging from high-tech entertainment venues to local indoor simulator facilities and traditional outdoor ranges scattered across the greater Tampa Bay area. As one of Florida\'s largest cities, Tampa has the population base to support a wide variety of golf facilities, and new venues continue to open as the city grows. Tampa\'s central location on Florida\'s west coast also makes it a convenient base for golfers exploring the wider Gulf Coast region.',
    closing: 'Tampa\'s range scene has something for every type of golfer, from casual entertainment seekers to serious practitioners. Use the listings above to find the right option in the Tampa area.',
  },
  {
    name: 'Winter Haven',
    slug: 'winter-haven',
    intro: 'Winter Haven sits in the heart of Polk County, one of Central Florida\'s most golf-dense counties. The city\'s ridge lake landscape — dotted with more than 50 lakes — creates naturally beautiful settings for golf courses and practice facilities. Winter Haven\'s driving ranges serve a mix of local residents and visitors to Central Florida\'s Polk County attractions, offering a quieter, more relaxed alternative to the busier ranges found in nearby Orlando and Tampa.',
    closing: 'Winter Haven\'s lakeside setting and Central Florida location make it a pleasant spot to practice your game away from the crowds. Browse the listings above to find a driving range in the area.',
  },
  {
    name: 'Spring Hill',
    slug: 'spring-hill',
    intro: 'Spring Hill is a large community in Hernando County, just north of Tampa, with a golf culture rooted in its large residential and retirement population. The area\'s driving ranges tend to be community-oriented facilities offering accessible, affordable practice options for local residents. Spring Hill\'s location between Tampa and the Nature Coast means its facilities draw golfers from across the region looking for a relaxed practice environment away from the larger nearby cities.',
    closing: 'Spring Hill\'s community-focused driving ranges offer a relaxed, accessible option for golfers in Hernando County and the broader Nature Coast region. Check the listings above to find a facility near you.',
  },
];

export function getCityBySlug(slug: string): CityInfo | undefined {
  return CITY_PAGES.find((c) => c.slug === slug);
}
