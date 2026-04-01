export interface CityInfo {
  name: string;
  slug: string;
  cities: string[];
  intro: string;
  closing: string;
}

export const CITY_PAGES: CityInfo[] = [
  {
    name: 'Orlando',
    slug: 'orlando',
    cities: ['Orlando', 'Winter Park', 'Apopka', 'Casselberry', 'Oviedo', 'Longwood', 'Lake Mary', 'Winter Garden', 'Championsgate', 'Davenport', 'Lake Buena Vista', 'Zellwood', 'Sorrento', 'Eustis', 'Mt Dora', 'DeLand'],
    intro: 'Orlando is home to one of Florida\'s most diverse collections of driving ranges, from high-tech simulator bays in the city\'s entertainment corridors to traditional outdoor grass ranges in the surrounding suburbs. With year-round warm weather and a massive tourism industry, the Orlando area draws golfers of every level — from first-timers looking for a casual session to serious players putting in regular practice time. Whether you\'re near Disney, downtown, or in one of the surrounding communities, you\'re never far from a quality place to hit balls.',
    closing: 'Whether you\'re looking for a quick warm-up session, a night out at a tech-powered range, or serious practice time on a traditional outdoor facility, Orlando\'s range scene has something for every golfer. Use the listings above to find the right fit for your game.',
  },
  {
    name: 'Naples',
    slug: 'naples',
    cities: ['Naples', 'Ave Maria', 'Marco Island', 'Goodland', 'Chokoloskee', 'Copeland'],
    intro: 'Naples is one of the most golf-dense cities in the United States, with more golf holes per capita than almost anywhere else in the country. The driving ranges here reflect that — well-maintained, professionally staffed, and equipped with premium amenities that match the expectations of the city\'s serious golf population. Public ranges in Naples offer grass tees, covered hitting areas, and in several cases TrackMan or Toptracer ball-tracking technology. Indoor simulator facilities have also grown in the area, giving golfers a climate-controlled option during Naples\' hot summer months. The area draws a large seasonal population from October through April, making it one of Florida\'s busiest golf markets during the winter. If you\'re visiting Naples or a local looking for a consistent place to practice, the options here are among the best in Southwest Florida.',
    closing: 'Naples driving ranges are held to a high standard by a golf-serious local community and a demanding seasonal population. Whether you\'re after a quick warm-up before a round, a structured practice session, or an indoor simulator experience, you\'ll find quality options here. For more ranges nearby, the Fort Myers area just north of Naples offers additional outdoor and entertainment-focused facilities. Browse the listings above to find the right fit for your game.',
  },
  {
    name: 'Jacksonville',
    slug: 'jacksonville',
    cities: ['Jacksonville', 'Jacksonville Beach', 'Ponte Vedra Beach', 'Fernandina Beach', 'Fleming Island', 'Green Cove Springs', 'St Johns', 'Palatka'],
    intro: 'Jacksonville\'s sprawling geography means its driving range scene is spread across a wide area, from the beaches to the city\'s western suburbs. The city has a strong golf culture backed by a large permanent population, and its ranges reflect that — offering everything from Topgolf-style entertainment venues to traditional practice facilities used by competitive players. Jacksonville is also home to the PGA Tour headquarters, which adds to the city\'s golf credibility and keeps standards high across its practice facilities.',
    closing: 'From the beaches to the suburbs, Jacksonville\'s driving ranges offer solid options for golfers at every level. Use the listings above to find the right facility for your practice needs.',
  },
  {
    name: 'Port St. Lucie',
    slug: 'port-st-lucie',
    cities: ['Port St. Lucie', 'Stuart', 'Palm City', 'Fort Pierce', 'Vero Beach'],
    intro: 'Port St. Lucie has grown rapidly into one of Florida\'s largest cities, and its golf infrastructure has kept pace with that growth. The Treasure Coast area offers a mix of public driving ranges and private club facilities, with options ranging from basic bucket-and-tee setups to technology-equipped practice bays. The city\'s central location on Florida\'s east coast makes it a practical destination for golfers travelling between Miami and Orlando.',
    closing: 'Port St. Lucie\'s growing golf scene means more options for local players than ever before. Check the listings above to find a driving range that suits your game.',
  },
  {
    name: 'Kissimmee',
    slug: 'kissimmee',
    cities: ['Kissimmee', 'St Cloud', 'Haines City'],
    intro: 'Kissimmee sits at the heart of Central Florida\'s tourism corridor, just south of Orlando, and its driving range scene reflects the area\'s mix of resort guests and local residents. Several major resort-adjacent golf facilities have established themselves here, offering high-quality practice amenities for visitors staying in the area\'s many hotels and vacation rentals. Kissimmee\'s ranges cater to a broad audience, from families looking for a casual introduction to the game to dedicated players seeking consistent practice time.',
    closing: 'Whether you\'re visiting Central Florida or a local looking for a reliable practice spot, Kissimmee\'s driving ranges offer convenient options close to the region\'s main attractions. Browse the listings above to find the right fit.',
  },
  {
    name: 'St. Augustine',
    slug: 'st-augustine',
    cities: ['St. Augustine', 'Palm Coast'],
    intro: 'St. Augustine is one of Florida\'s oldest and most storied cities, and its golf scene matches that heritage — offering a mix of historic course settings and well-established practice facilities. The area has become a significant golf destination in Northeast Florida, with a concentration of quality ranges catering to both residents and the city\'s strong tourism trade. The mild Northeast Florida climate and the area\'s natural beauty make practicing here a genuinely pleasant experience year-round.',
    closing: 'St. Augustine\'s golf scene combines history, natural beauty, and quality facilities in a way few Florida cities can match. Use the listings above to find a driving range in the area.',
  },
  {
    name: 'Fort Myers',
    slug: 'fort-myers',
    cities: ['Fort Myers', 'Lehigh Acres', 'Estero', 'Bonita Springs'],
    intro: 'Fort Myers and the surrounding Lee County area is a major golf destination in Southwest Florida, with facilities catering to both year-round residents and the large seasonal population that arrives each winter. The city\'s warm climate and flat terrain make it ideal for golf, and its driving ranges offer options from entertainment-focused venues to focused practice facilities used by serious players working on their games.',
    closing: 'Fort Myers is one of Southwest Florida\'s premier golf destinations, with driving ranges that match the area\'s reputation for quality. Check the listings above to find the right facility for your practice routine.',
  },
  {
    name: 'Tampa',
    slug: 'tampa',
    cities: ['Tampa', 'Lutz', "Land O' Lakes", 'New Port Richey', 'Odessa', 'Westchase', 'Apollo Beach', 'Riverview', 'Valrico', 'Sun City Center', 'Dover', 'Dade City'],
    intro: 'Tampa\'s driving range scene reflects the city\'s diversity — ranging from high-tech entertainment venues to local indoor simulator facilities and traditional outdoor ranges scattered across the greater Tampa Bay area. As one of Florida\'s largest cities, Tampa has the population base to support a wide variety of golf facilities, and new venues continue to open as the city grows. Tampa\'s central location on Florida\'s west coast also makes it a convenient base for golfers exploring the wider Gulf Coast region.',
    closing: 'Tampa\'s range scene has something for every type of golfer, from casual entertainment seekers to serious practitioners. Use the listings above to find the right option in the Tampa area.',
  },
  {
    name: 'Winter Haven',
    slug: 'winter-haven',
    cities: ['Winter Haven', 'Lakeland', 'Haines City'],
    intro: 'Winter Haven sits in the heart of Polk County, one of Central Florida\'s most golf-dense counties. The city\'s ridge lake landscape — dotted with more than 50 lakes — creates naturally beautiful settings for golf courses and practice facilities. Winter Haven\'s driving ranges serve a mix of local residents and visitors to Central Florida\'s Polk County attractions, offering a quieter, more relaxed alternative to the busier ranges found in nearby Orlando and Tampa.',
    closing: 'Winter Haven\'s lakeside setting and Central Florida location make it a pleasant spot to practice your game away from the crowds. Browse the listings above to find a driving range in the area.',
  },
  {
    name: 'Spring Hill',
    slug: 'spring-hill',
    cities: ['Spring Hill', 'Beverly Hills', 'Homosassa', 'Floral City', 'Inverness'],
    intro: 'Spring Hill is a large community in Hernando County, just north of Tampa, with a golf culture rooted in its large residential and retirement population. The area\'s driving ranges tend to be community-oriented facilities offering accessible, affordable practice options for local residents. Spring Hill\'s location between Tampa and the Nature Coast means its facilities draw golfers from across the region looking for a relaxed practice environment away from the larger nearby cities.',
    closing: 'Spring Hill\'s community-focused driving ranges offer a relaxed, accessible option for golfers in Hernando County and the broader Nature Coast region. Check the listings above to find a facility near you.',
  },
  {
    name: 'Miami',
    slug: 'miami',
    cities: ['Miami', 'Miami Gardens', 'Miami Shores', 'Coral Gables', 'Doral', 'Key Biscayne'],
    intro: 'Miami is one of Florida\'s most dynamic cities, and its golf scene reflects that energy — offering a mix of traditional public ranges and modern entertainment venues spread across the broader metro area. The city\'s warm year-round climate makes it a natural fit for golf, and its diverse population has driven demand for facilities that cater to every level of player, from beginners picking up a club for the first time to serious golfers keeping their games sharp. Miami\'s driving ranges are well-positioned across the city, making it easy to find a practice session wherever you are in the metro.',
    closing: 'Whether you\'re looking for a high-energy venue or a quiet spot to work on your swing, Miami\'s driving ranges offer solid options across the city. Browse the listings above to find the right fit for your game.',
  },
  {
    name: 'Fort Lauderdale',
    slug: 'fort-lauderdale',
    cities: ['Fort Lauderdale', 'Plantation', 'Deerfield Beach', 'Pompano Beach', 'Hallandale Beach', 'Hollywood', 'Coconut Creek', 'Margate', 'Weston', 'Pembroke Pines', 'Coral Springs'],
    intro: 'Fort Lauderdale\'s driving range scene punches above its weight, with a notable concentration of indoor simulator facilities alongside traditional outdoor options. The city\'s dense, urban layout has driven demand for indoor golf venues where players can practice regardless of Florida\'s afternoon rain showers, and several well-regarded simulator bars and boutique golf studios have established themselves here. Fort Lauderdale sits at the heart of Broward County\'s golf corridor, making it a convenient hub for golfers throughout South Florida.',
    closing: 'From indoor simulator bays to traditional outdoor ranges, Fort Lauderdale has a solid selection for golfers across South Florida. Use the listings above to find the right venue for your next practice session.',
  },
  {
    name: 'Sarasota',
    slug: 'sarasota',
    cities: ['Sarasota', 'Lakewood Ranch', 'Bradenton', 'Nokomis', 'Venice', 'Palmetto', 'Parrish', 'Port Charlotte', 'Punta Gorda'],
    intro: 'Sarasota is one of Florida\'s most affluent mid-sized cities and has the golf infrastructure to match. The area\'s large seasonal and retirement population sustains a strong demand for quality practice facilities, and its ranges tend to be well-maintained and uncrowded compared to the busier venues found further south. Sarasota\'s location on Florida\'s Gulf Coast gives it some of the best weather in the state, making outdoor practice comfortable for most of the year.',
    closing: 'Sarasota\'s golf scene is defined by quality and consistency — well-maintained facilities with a relaxed atmosphere that suits serious practice. Check the listings above to find the right range for your game.',
  },
  {
    name: 'West Palm Beach',
    slug: 'west-palm-beach',
    cities: ['West Palm Beach', 'Greenacres', 'Royal Palm Beach', 'Wellington', 'North Palm Beach', 'Jupiter', 'Lake Worth Beach'],
    intro: 'West Palm Beach anchors the northern end of South Florida\'s golf corridor and draws players from across Palm Beach County. The city and its surrounding communities have a deep golf culture, sustained in part by the region\'s large seasonal population and proximity to some of Florida\'s most prestigious courses. Its driving ranges offer convenient practice options for golfers who want to warm up before a round or maintain their game during extended stays in the area.',
    closing: 'West Palm Beach\'s golf scene is well-established and growing. Browse the listings above to find a driving range in the area that suits your schedule and practice goals.',
  },
  {
    name: 'Tallahassee',
    slug: 'tallahassee',
    cities: ['Tallahassee'],
    intro: 'Tallahassee is the state capital and home to Florida State University, giving it a consistent base of golfers ranging from college players to government workers and local residents. The city\'s driving ranges tend to be traditional, course-affiliated facilities that emphasise genuine practice over entertainment, reflecting the no-nonsense golf culture found in North Florida. Tallahassee\'s cooler winters compared to the rest of Florida can actually make it more comfortable for outdoor practice during the peak of the state\'s dry season.',
    closing: 'Tallahassee\'s driving ranges offer solid, unpretentious practice options in a city with a genuine appreciation for golf. Use the listings above to find a facility that fits your game.',
  },
  {
    name: 'Clearwater',
    slug: 'clearwater',
    cities: ['Clearwater', 'Dunedin', 'Tarpon Springs', 'Palm Harbor', 'Oldsmar'],
    intro: 'Clearwater sits on Florida\'s Gulf Coast just west of Tampa and is known as much for its beaches as its golf. The city\'s driving ranges serve a mix of local residents, seasonal visitors, and golfers making their way through the Tampa Bay area. Clearwater\'s compact layout means several well-regarded facilities are clustered close together, making it easy to find a range that fits your schedule and budget. The city also benefits from the broader Tampa Bay golf ecosystem, with facilities catering to every skill level.',
    closing: 'Clearwater\'s driving ranges offer convenient, quality practice options on Florida\'s Gulf Coast. Browse the listings above to find the right facility for your next session.',
  },
  {
    name: 'St. Petersburg',
    slug: 'st-petersburg',
    cities: ['St. Petersburg', 'Largo', 'Seminole'],
    intro: 'St. Petersburg has transformed in recent years into one of Florida\'s most vibrant cities, and its golf scene has evolved alongside it. The city now offers a mix of traditional municipal golf facilities and modern entertainment-focused venues — including a Topgolf location that has become a popular destination for both golfers and non-golfers alike. St. Pete\'s peninsular geography and waterfront setting give it a distinct character that sets it apart from the rest of the Tampa Bay market.',
    closing: 'From Topgolf to classic municipal ranges, St. Petersburg has a driving range option for every type of golfer. Check the listings above to find the right fit for your game.',
  },
  {
    name: 'Boca Raton',
    slug: 'boca-raton',
    cities: ['Boca Raton', 'Boynton Beach'],
    intro: 'Boca Raton is synonymous with upscale South Florida living, and its golf scene reflects that reputation. The city\'s driving ranges and practice facilities tend to be well-maintained and well-equipped, serving an affluent population with high expectations for quality. Several of Boca\'s ranges are affiliated with established golf courses, offering a seamless experience for players who want to practice on the same surfaces they\'ll be playing on. The city\'s location between Miami and Fort Lauderdale also makes it a convenient stop for golfers travelling through South Florida.',
    closing: 'Boca Raton\'s driving ranges deliver the quality and consistency you\'d expect from one of South Florida\'s premier golf communities. Use the listings above to find the right facility for your game.',
  },
  {
    name: 'Pensacola',
    slug: 'pensacola',
    cities: ['Pensacola', 'Cantonment', 'Pace', 'Navarre', 'Shalimar', 'Crestview', 'Freeport', 'Hurlburt Field', 'Miramar Beach', 'Santa Rosa Beach'],
    intro: 'Pensacola sits at the western tip of Florida\'s Panhandle and has a golf culture more closely tied to the Gulf Coast and Alabama than to the rest of Florida. The city\'s driving ranges are traditional facilities that serve a local population with a genuine passion for the game, offering accessible practice options without the tourist-oriented gloss found in some of the state\'s larger markets. Pensacola\'s mild Gulf Coast climate makes outdoor practice comfortable for the majority of the year, and the city\'s compact size keeps travel times between facilities short.',
    closing: 'Pensacola\'s driving ranges offer honest, no-frills practice facilities in a city that takes golf seriously. Browse the listings above to find a range that suits your game.',
  },
  {
    name: 'Lake Nona',
    slug: 'lake-nona',
    cities: ['Lake Nona'],
    intro: 'Lake Nona is one of Orlando\'s fastest-growing communities and has built a reputation as a hub for innovation, active living, and sport. The area\'s affluent, health-conscious population has driven demand for high-quality leisure facilities, and golf is no exception. Lake Nona\'s driving range options cater to residents who want convenient, technology-forward ways to practice the game close to home — without making the longer drive into central Orlando or its surrounding suburbs.',
    closing: 'Lake Nona\'s golf facilities reflect the area\'s modern, active character. Browse the listings above to find a driving range in the Lake Nona area.',
  },
  {
    name: 'Cape Coral',
    slug: 'cape-coral',
    cities: ['Cape Coral', 'North Fort Myers'],
    intro: 'Cape Coral is one of Florida\'s largest cities by area, a sprawling waterfront community on the Gulf Coast just across the Caloosahatchee River from Fort Myers. The city\'s large residential population and strong golf culture make it a natural home for quality practice facilities. Cape Coral\'s flat terrain, warm climate, and abundance of open space create ideal conditions for outdoor golf year-round, and its ranges serve a mix of committed local players and seasonal visitors who make Southwest Florida their winter base.',
    closing: 'Cape Coral\'s driving ranges offer solid practice options in one of Southwest Florida\'s largest and most golf-friendly communities. Browse the listings above to find the right facility for your game.',
  },
];

export function getCityBySlug(slug: string): CityInfo | undefined {
  return CITY_PAGES.find((c) => c.slug === slug);
}
