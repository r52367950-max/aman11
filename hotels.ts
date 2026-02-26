export interface HotelDetail {
  id: string;
  name: string;
  location: string;
  country: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  amenities: string[];
  rooms: Room[];
  dining: Dining[];
  spa: Spa;
  experiences: Experience[];
  locationDetails: LocationDetails;
  reviews: Review[];
  slug: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  size: string;
  image: string;
  price: string;
  features: string[];
}

export interface Dining {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  image: string;
  hours: string;
  dressCode: string;
}

export interface Spa {
  name: string;
  description: string;
  treatments: Treatment[];
  facilities: string[];
  image: string;
}

export interface Treatment {
  name: string;
  duration: string;
  price: string;
  description: string;
}

export interface Experience {
  id: string;
  name: string;
  description: string;
  image: string;
  duration: string;
  price: string;
}

export interface LocationDetails {
  address: string;
  coordinates: { lat: number; lng: number };
  airport: string;
  airportDistance: string;
  transferTime: string;
  climate: string;
  bestTimeToVisit: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const hotelsData: HotelDetail[] = [
  {
    id: '1',
    name: 'Aman New York',
    location: 'Manhattan',
    country: 'United States',
    description: "East meets West in Manhattan's landmark Crown Building",
    longDescription: `East meets West and old meets new. Manhattan's landmark Crown Building is reimagined as Aman New York, where the city's original architectural splendour and Aman's harmonious design language collide, reimagining the inimitable tranquillity of Aman in the heart of midtown.

The Manhattan hotel embraces a year-round Garden Terrace, flagship Aman Spa and spacious suites, among the largest in the city. Each of the 83 suites offers a functioning fireplace, an Aman first, while the 22nd floor is home to an 8,000-square-foot Aman Spa, the brand's flagship urban wellness centre.

The hotel's restaurants include Arva, Aman's Italian restaurant concept, as well as a Japanese restaurant by Nama, and the Wine Library. The Jazz Club, located in the building's historic double-height basement, offers an intimate venue for live performances.`,
    image: '/images/hotels/aman-new-york.jpg',
    gallery: [
      '/images/hotels/aman-new-york.jpg',
      '/images/experiences/city-escape.jpg',
      '/images/misc/aman-at-sea.jpg',
    ],
    amenities: [
      '83 Suites with Fireplaces',
      'Flagship Aman Spa',
      'Garden Terrace',
      'Jazz Club',
      'Arva Restaurant',
      'Nama Japanese Restaurant',
      'Wine Library',
      'Fitness Center',
      'Indoor Pool',
      'Private Dining',
      '24-hour Butler Service',
      'Valet Parking',
    ],
    rooms: [
      {
        id: 'r1',
        name: 'Superior Suite',
        description: 'Elegant suite with city views and a functioning fireplace',
        size: '72 sqm',
        image: '/images/hotels/aman-new-york.jpg',
        price: '$2,400',
        features: ['King Bed', 'Fireplace', 'City View', 'Marble Bathroom', 'Butler Service'],
      },
      {
        id: 'r2',
        name: 'Corner Suite',
        description: 'Spacious corner suite with panoramic Manhattan views',
        size: '108 sqm',
        image: '/images/hotels/aman-tokyo.jpg',
        price: '$3,800',
        features: ['King Bed', 'Fireplace', 'Panoramic View', 'Separate Living Room', 'Butler Service'],
      },
      {
        id: 'r3',
        name: 'Aman Suite',
        description: 'The signature suite with wraparound terrace',
        size: '185 sqm',
        image: '/images/hotels/aman-venice.jpg',
        price: '$8,500',
        features: ['King Bed', 'Fireplace', 'Private Terrace', 'Dining Room', 'Private Spa Access'],
      },
    ],
    dining: [
      {
        id: 'd1',
        name: 'Arva',
        cuisine: 'Italian',
        description: 'Aman\'s Italian restaurant concept showcasing seasonal ingredients',
        image: '/images/experiences/alpine-awakening.jpg',
        hours: 'Breakfast: 7am - 11am | Dinner: 6pm - 10:30pm',
        dressCode: 'Smart Casual',
      },
      {
        id: 'd2',
        name: 'Nama',
        cuisine: 'Japanese',
        description: 'Traditional Japanese washoku dining with a contemporary twist',
        image: '/images/hotels/aman-tokyo.jpg',
        hours: 'Dinner: 6pm - 10pm',
        dressCode: 'Smart Casual',
      },
      {
        id: 'd3',
        name: 'The Jazz Club',
        cuisine: 'Cocktails & Light Bites',
        description: 'Intimate basement venue featuring live jazz performances',
        image: '/images/misc/gift-card.jpg',
        hours: 'Tuesday - Saturday: 7pm - 2am',
        dressCode: 'Smart Elegant',
      },
    ],
    spa: {
      name: 'Aman Spa New York',
      description: 'The brand\'s flagship urban wellness centre spanning 8,000 square feet',
      image: '/images/misc/aman-essentials.jpg',
      treatments: [
        { name: 'Aman Signature Massage', duration: '90 min', price: '$450', description: 'A personalized full-body massage using custom-blended oils' },
        { name: 'Deep Tissue Therapy', duration: '60 min', price: '$320', description: 'Intensive massage targeting deep muscle layers' },
        { name: 'Oriental Harmony Ritual', duration: '120 min', price: '$580', description: 'Two-therapist synchronized massage experience' },
        { name: 'Radiance Facial', duration: '75 min', price: '$380', description: 'Revitalizing facial using Aman Skincare products' },
      ],
      facilities: [
        'Indoor Pool',
        'Steam Room',
        'Sauna',
        'Relaxation Lounges',
        'Private Treatment Suites',
        'Fitness Center',
        'Yoga Studio',
        'Meditation Room',
      ],
    },
    experiences: [
      {
        id: 'e1',
        name: 'Private Central Park Tour',
        description: 'Guided tour of Central Park with a historian',
        image: '/images/experiences/city-escape.jpg',
        duration: '3 hours',
        price: '$850',
      },
      {
        id: 'e2',
        name: 'Broadway Behind the Scenes',
        description: 'Exclusive backstage tour of a Broadway production',
        image: '/images/hotels/aman-new-york.jpg',
        duration: '4 hours',
        price: '$1,200',
      },
      {
        id: 'e3',
        name: 'Private Art Gallery Tour',
        description: 'After-hours access to Chelsea galleries with a curator',
        image: '/images/hotels/aman-venice.jpg',
        duration: '3 hours',
        price: '$950',
      },
    ],
    locationDetails: {
      address: '730 Fifth Avenue, New York, NY 10019',
      coordinates: { lat: 40.7614, lng: -73.9776 },
      airport: 'JFK International Airport',
      airportDistance: '26 km',
      transferTime: '45-60 minutes',
      climate: 'Four distinct seasons with hot summers and cold winters',
      bestTimeToVisit: 'April to June or September to November',
    },
    reviews: [
      { id: 'rev1', author: 'Sarah M.', rating: 5, date: '2024-12-15', comment: 'Absolutely transcendent experience. The spa is world-class.', verified: true },
      { id: 'rev2', author: 'James L.', rating: 5, date: '2024-11-28', comment: 'The suites are enormous by NYC standards. Fireplace was magical.', verified: true },
      { id: 'rev3', author: 'Emma K.', rating: 5, date: '2024-11-10', comment: 'Service is impeccable. The Jazz Club is a hidden gem.', verified: true },
    ],
    slug: 'aman-new-york',
  },
  {
    id: '2',
    name: 'Aman Tokyo',
    location: 'Otemachi',
    country: 'Japan',
    description: 'A peaceful sanctuary atop the Otemachi Tower',
    longDescription: `Rising 33 storeys above the financial district of Otemachi, Aman Tokyo is a sanctuary in the sky. The hotel occupies the top six floors of the Otemachi Tower, offering panoramic views of the Imperial Palace Gardens and Mount Fuji on clear days.

Designed by Kerry Hill, the hotel draws inspiration from traditional Japanese architecture while embracing contemporary design. The 84 rooms and suites feature washi paper screens, engawa-style alcoves, and ofuro soaking tubs made from hinoki cypress wood.

The 2,500-square-metre Aman Spa spans two floors and includes a 30-metre infinity pool with views of the Tokyo skyline. The restaurant serves both traditional Japanese kaiseki cuisine and Mediterranean-inspired dishes using the finest seasonal ingredients.`,
    image: '/images/hotels/aman-tokyo.jpg',
    gallery: [
      '/images/hotels/aman-tokyo.jpg',
      '/images/experiences/city-escape.jpg',
      '/images/experiences/alpine-awakening.jpg',
    ],
    amenities: [
      '84 Rooms & Suites',
      'Aman Spa',
      '30m Infinity Pool',
      'Fitness Center',
      'Japanese Restaurant',
      'Cafe',
      'Lounge',
      'Meeting Rooms',
      'Library',
      '24-hour Butler Service',
      'Concierge',
      'Valet Parking',
    ],
    rooms: [
      {
        id: 'r1',
        name: 'Deluxe Room',
        description: 'Elegant room with city views and traditional Japanese elements',
        size: '71 sqm',
        image: '/images/hotels/aman-tokyo.jpg',
        price: '¥180,000',
        features: ['King Bed', 'Hinoki Tub', 'City View', 'Washi Screens', 'Butler Service'],
      },
      {
        id: 'r2',
        name: 'Premier Room',
        description: 'Spacious room with Imperial Palace Garden views',
        size: '80 sqm',
        image: '/images/hotels/amanzoe.jpg',
        price: '¥220,000',
        features: ['King Bed', 'Hinoki Tub', 'Garden View', 'Separate Living Area', 'Butler Service'],
      },
      {
        id: 'r3',
        name: 'Aman Suite',
        description: 'The signature suite with panoramic views',
        size: '121 sqm',
        image: '/images/hotels/aman-venice.jpg',
        price: '¥450,000',
        features: ['King Bed', 'Hinoki Tub', 'Panoramic View', 'Dining Room', 'Private Spa Access'],
      },
    ],
    dining: [
      {
        id: 'd1',
        name: 'The Restaurant by Aman',
        cuisine: 'Japanese & Mediterranean',
        description: 'Seasonal cuisine blending Japanese and Mediterranean traditions',
        image: '/images/experiences/alpine-awakening.jpg',
        hours: 'Breakfast: 7am - 10:30am | Lunch: 12pm - 2:30pm | Dinner: 6pm - 10pm',
        dressCode: 'Smart Casual',
      },
      {
        id: 'd2',
        name: 'Lounge by Aman',
        cuisine: 'Afternoon Tea & Cocktails',
        description: 'Elegant lounge serving traditional afternoon tea and evening cocktails',
        image: '/images/misc/gift-card.jpg',
        hours: 'Tea: 12pm - 5pm | Bar: 5pm - 12am',
        dressCode: 'Casual Elegant',
      },
    ],
    spa: {
      name: 'Aman Spa Tokyo',
      description: 'A two-floor wellness sanctuary with panoramic city views',
      image: '/images/misc/aman-essentials.jpg',
      treatments: [
        { name: 'Japanese Healing Ritual', duration: '120 min', price: '¥55,000', description: 'Traditional Japanese healing using hot stones and shiatsu techniques' },
        { name: 'Aman Tokyo Massage', duration: '90 min', price: '¥42,000', description: 'Signature massage using custom-blended Japanese oils' },
        { name: 'Kampai Facial', duration: '75 min', price: '¥38,000', description: 'Rejuvenating facial using pearl and green tea extracts' },
        { name: 'Hinoki Forest Bath', duration: '60 min', price: '¥28,000', description: 'Therapeutic bath in aromatic hinoki cypress wood' },
      ],
      facilities: [
        '30m Infinity Pool',
        'Steam Room',
        'Sauna',
        'Japanese Onsen-style Baths',
        'Relaxation Lounges',
        'Private Treatment Suites',
        'Fitness Center',
        'Yoga & Pilates Studio',
      ],
    },
    experiences: [
      {
        id: 'e1',
        name: 'Private Tea Ceremony',
        description: 'Traditional tea ceremony with a tea master',
        image: '/images/experiences/alpine-awakening.jpg',
        duration: '2 hours',
        price: '¥35,000',
      },
      {
        id: 'e2',
        name: 'Tsukiji Market Tour',
        description: 'Early morning tour of the famous fish market with sushi breakfast',
        image: '/images/hotels/aman-tokyo.jpg',
        duration: '4 hours',
        price: '¥45,000',
      },
      {
        id: 'e3',
        name: 'Samurai Experience',
        description: 'Learn the way of the samurai with a master instructor',
        image: '/images/experiences/city-escape.jpg',
        duration: '3 hours',
        price: '¥55,000',
      },
    ],
    locationDetails: {
      address: '1-5-6 Otemachi, Chiyoda-ku, Tokyo 100-0004',
      coordinates: { lat: 35.6869, lng: 139.7670 },
      airport: 'Narita International Airport / Haneda Airport',
      airportDistance: '60 km / 20 km',
      transferTime: '60-90 minutes / 30-45 minutes',
      climate: 'Four seasons with hot humid summers and mild winters',
      bestTimeToVisit: 'March to May or October to November',
    },
    reviews: [
      { id: 'rev1', author: 'Yuki T.', rating: 5, date: '2024-12-20', comment: 'The infinity pool with Tokyo skyline views is unforgettable.', verified: true },
      { id: 'rev2', author: 'Michael R.', rating: 5, date: '2024-12-05', comment: 'Service is beyond exceptional. True Japanese hospitality.', verified: true },
      { id: 'rev3', author: 'Lisa H.', rating: 5, date: '2024-11-15', comment: 'The hinoki tub in the room is pure luxury.', verified: true },
    ],
    slug: 'aman-tokyo',
  },
  {
    id: '3',
    name: 'Amangiri',
    location: 'Canyon Point',
    country: 'United States',
    description: 'Sacred space in the Utah desert',
    longDescription: `Amangiri, which means "peaceful mountain," is located on 600 acres in Canyon Point, Southern Utah, close to the border with Arizona. The resort is tucked into a protected valley with sweeping views towards the Grand Staircase-Escalante National Monument.

Designed by Marwan Al-Sayed, Wendell Burnette and Rick Joy, the resort blends into its dramatic surroundings where deep canyons and towering plateaus create a landscape of immense power. The 34 suites offer uninterrupted views of the desert landscape, while the Aman Spa incorporates Navajo healing traditions.

The resort offers a range of adventures including slot canyon explorations, via ferrata climbing, hot air ballooning, and private tours of Lake Powell. The Dining Room serves cuisine inspired by the American Southwest using locally sourced ingredients.`,
    image: '/images/hotels/amangiri.jpg',
    gallery: [
      '/images/hotels/amangiri.jpg',
      '/images/experiences/to-the-wilds.jpg',
      '/images/journeys/sri-lanka-sigiriya.jpg',
    ],
    amenities: [
      '34 Suites',
      'Aman Spa',
      'Desert Lounge',
      'Dining Room',
      'Private Dining',
      'Swimming Pool',
      'Fitness Center',
      'Yoga Pavilion',
      'Library',
      'Adventure Center',
      'Helipad',
      'Stargazing Deck',
    ],
    rooms: [
      {
        id: 'r1',
        name: 'Desert Suite',
        description: 'Suite with panoramic desert views and private terrace',
        size: '93 sqm',
        image: '/images/hotels/amangiri.jpg',
        price: '$3,800',
        features: ['King Bed', 'Private Terrace', 'Desert View', 'Fireplace', 'Outdoor Shower'],
      },
      {
        id: 'r2',
        name: 'Mesa Suite',
        description: 'Suite with elevated views of the mesa',
        size: '111 sqm',
        image: '/images/experiences/to-the-wilds.jpg',
        price: '$4,500',
        features: ['King Bed', 'Private Terrace', 'Mesa View', 'Fireplace', 'Indoor-Outdoor Shower'],
      },
      {
        id: 'r3',
        name: 'Girijaala Suite',
        description: 'The signature suite with the best views',
        size: '167 sqm',
        image: '/images/journeys/sri-lanka-sigiriya.jpg',
        price: '$7,500',
        features: ['King Bed', 'Private Pool', 'Panoramic View', 'Fireplace', 'Private Dining Area'],
      },
    ],
    dining: [
      {
        id: 'd1',
        name: 'The Dining Room',
        cuisine: 'Southwestern',
        description: 'Cuisine inspired by the American Southwest using locally sourced ingredients',
        image: '/images/experiences/alpine-awakening.jpg',
        hours: 'Breakfast: 7am - 10:30am | Lunch: 12pm - 2:30pm | Dinner: 6pm - 9:30pm',
        dressCode: 'Resort Casual',
      },
      {
        id: 'd2',
        name: 'Desert Lounge',
        cuisine: 'Light Bites & Cocktails',
        description: 'Casual lounge with panoramic desert views',
        image: '/images/misc/gift-card.jpg',
        hours: '11am - 11pm',
        dressCode: 'Casual',
      },
    ],
    spa: {
      name: 'Aman Spa Amangiri',
      description: 'A desert wellness sanctuary incorporating Navajo healing traditions',
      image: '/images/misc/aman-essentials.jpg',
      treatments: [
        { name: 'Desert Sage Ritual', duration: '120 min', price: '$520', description: 'Full-body treatment using desert sage and native plants' },
        { name: 'Hopi Healing Massage', duration: '90 min', price: '$380', description: 'Traditional Native American massage technique' },
        { name: 'Red Rock Body Polish', duration: '60 min', price: '$280', description: 'Exfoliating treatment using local red sandstone' },
        { name: 'Stargazing Meditation', duration: '60 min', price: '$180', description: 'Guided meditation under the desert stars' },
      ],
      facilities: [
        'Water Pavilion',
        'Steam Room',
        'Sauna',
        'Cold Plunge Pool',
        'Relaxation Terraces',
        'Private Treatment Suites',
        'Fitness Center',
        'Yoga Pavilion',
        'Flotation Pavilion',
      ],
    },
    experiences: [
      {
        id: 'e1',
        name: 'Slot Canyon Exploration',
        description: 'Guided hike through nearby slot canyons',
        image: '/images/journeys/sri-lanka-sigiriya.jpg',
        duration: '4 hours',
        price: '$450',
      },
      {
        id: 'e2',
        name: 'Via Ferrata Climbing',
        description: 'Guided rock climbing adventure',
        image: '/images/experiences/to-the-wilds.jpg',
        duration: '6 hours',
        price: '$650',
      },
      {
        id: 'e3',
        name: 'Hot Air Balloon Flight',
        description: 'Sunrise balloon flight over the desert',
        image: '/images/hotels/amangiri.jpg',
        duration: '3 hours',
        price: '$850',
      },
    ],
    locationDetails: {
      address: '1 Kayenta Road, Canyon Point, UT 84741',
      coordinates: { lat: 37.0014, lng: -111.4924 },
      airport: 'Page Municipal Airport',
      airportDistance: '25 km',
      transferTime: '25 minutes',
      climate: 'Desert climate with hot summers and cool winters',
      bestTimeToVisit: 'March to May or September to November',
    },
    reviews: [
      { id: 'rev1', author: 'David K.', rating: 5, date: '2024-12-10', comment: 'The most incredible landscape I have ever experienced.', verified: true },
      { id: 'rev2', author: 'Jennifer M.', rating: 5, date: '2024-11-22', comment: 'Architecture that blends perfectly with nature. Surreal.', verified: true },
      { id: 'rev3', author: 'Robert P.', rating: 5, date: '2024-10-15', comment: 'The slot canyon tour was life-changing.', verified: true },
    ],
    slug: 'amangiri',
  },
  {
    id: '4',
    name: 'Amanpuri',
    location: 'Phuket',
    country: 'Thailand',
    description: "Place of peace on Phuket's west coast",
    longDescription: `Amanpuri, meaning "place of peace," was the first Aman resort, opening in 1988 on Phuket's west coast. Set on a private peninsula overlooking the azure Andaman Sea, the resort is surrounded by coconut palms and tropical gardens.

The 40 pavilions and 30 villas are designed in traditional Thai style with curved roofs, natural materials, and open-air living spaces. The Aman Spa offers traditional Thai therapies in a serene setting overlooking a lotus pond.

The resort features five restaurants serving Thai, Japanese, Italian, and Mediterranean cuisine. The Beach Club offers water sports and beachfront dining, while the Aman Yacht is available for private charters to explore the surrounding islands.`,
    image: '/images/hotels/amanpuri.jpg',
    gallery: [
      '/images/hotels/amanpuri.jpg',
      '/images/experiences/winter-sun.jpg',
      '/images/misc/aman-at-sea.jpg',
    ],
    amenities: [
      '40 Pavilions',
      '30 Villas',
      'Aman Spa',
      '5 Restaurants',
      'Beach Club',
      'Private Beach',
      'Swimming Pools',
      'Tennis Courts',
      'Fitness Center',
      'Yoga Sala',
      'Water Sports Center',
      'Aman Yacht',
    ],
    rooms: [
      {
        id: 'r1',
        name: 'Garden Pavilion',
        description: 'Pavilion overlooking tropical gardens',
        size: '115 sqm',
        image: '/images/hotels/amanpuri.jpg',
        price: '฿45,000',
        features: ['King Bed', 'Private Terrace', 'Garden View', 'Outdoor Sala', 'Butler Service'],
      },
      {
        id: 'r2',
        name: 'Ocean Pavilion',
        description: 'Pavilion with panoramic ocean views',
        size: '115 sqm',
        image: '/images/experiences/winter-sun.jpg',
        price: '฿55,000',
        features: ['King Bed', 'Private Terrace', 'Ocean View', 'Outdoor Sala', 'Butler Service'],
      },
      {
        id: 'r3',
        name: 'Ocean Villa',
        description: 'Two-bedroom villa with private pool',
        size: '700 sqm',
        image: '/images/misc/aman-at-sea.jpg',
        price: '฿180,000',
        features: ['2 Bedrooms', 'Private Pool', 'Ocean View', 'Kitchen', 'Private Chef'],
      },
    ],
    dining: [
      {
        id: 'd1',
        name: 'Arva',
        cuisine: 'Italian',
        description: 'Italian restaurant serving seasonal dishes',
        image: '/images/experiences/alpine-awakening.jpg',
        hours: 'Dinner: 6:30pm - 10:30pm',
        dressCode: 'Resort Casual',
      },
      {
        id: 'd2',
        name: 'Nama',
        cuisine: 'Japanese',
        description: 'Traditional Japanese washoku dining',
        image: '/images/hotels/aman-tokyo.jpg',
        hours: 'Dinner: 6pm - 10pm',
        dressCode: 'Smart Casual',
      },
      {
        id: 'd3',
        name: 'Buabok',
        cuisine: 'Thai',
        description: 'Authentic Thai cuisine in traditional setting',
        image: '/images/experiences/winter-sun.jpg',
        hours: 'Lunch: 12pm - 3pm | Dinner: 6pm - 10:30pm',
        dressCode: 'Resort Casual',
      },
    ],
    spa: {
      name: 'Aman Spa Amanpuri',
      description: 'Traditional Thai wellness sanctuary overlooking a lotus pond',
      image: '/images/misc/aman-essentials.jpg',
      treatments: [
        { name: 'Traditional Thai Massage', duration: '90 min', price: '฿6,500', description: 'Ancient Thai healing massage with stretching' },
        { name: 'Royal Thai Ritual', duration: '150 min', price: '฿12,000', description: 'Luxurious treatment inspired by Thai royalty' },
        { name: 'Coconut Body Glow', duration: '75 min', price: '฿5,500', description: 'Exfoliating treatment using fresh coconut' },
        { name: 'Herbal Compress Massage', duration: '90 min', price: '฿7,000', description: 'Massage with heated herbal compresses' },
      ],
      facilities: [
        'Treatment Suites',
        'Steam Room',
        'Sauna',
        'Hydrotherapy Pool',
        'Relaxation Sala',
        'Yoga Sala',
        'Fitness Center',
        'Muay Thai Ring',
      ],
    },
    experiences: [
      {
        id: 'e1',
        name: 'Island Hopping',
        description: 'Private yacht tour of the Phi Phi Islands',
        image: '/images/misc/aman-at-sea.jpg',
        duration: 'Full Day',
        price: '฿45,000',
      },
      {
        id: 'e2',
        name: 'Cooking Class',
        description: 'Learn Thai cuisine with the resort chef',
        image: '/images/experiences/winter-sun.jpg',
        duration: '3 hours',
        price: '฿8,500',
      },
      {
        id: 'e3',
        name: 'Sunset Cruise',
        description: 'Private sunset cruise with champagne',
        image: '/images/hotels/amanpuri.jpg',
        duration: '3 hours',
        price: '฿25,000',
      },
    ],
    locationDetails: {
      address: '118 Moo 6, Srisoonthorn Road, Cherngtalay, Thalang, Phuket 83110',
      coordinates: { lat: 7.9759, lng: 98.2807 },
      airport: 'Phuket International Airport',
      airportDistance: '20 km',
      transferTime: '30 minutes',
      climate: 'Tropical climate year-round',
      bestTimeToVisit: 'November to April',
    },
    reviews: [
      { id: 'rev1', author: 'Anna S.', rating: 5, date: '2024-12-18', comment: 'Paradise on earth. The villas are incredible.', verified: true },
      { id: 'rev2', author: 'Chris W.', rating: 5, date: '2024-12-01', comment: 'Best beach in Phuket. Service is unmatched.', verified: true },
      { id: 'rev3', author: 'Maria G.', rating: 5, date: '2024-11-20', comment: 'The Thai massage at the spa is world-class.', verified: true },
    ],
    slug: 'amanpuri',
  },
  {
    id: '5',
    name: 'Aman Venice',
    location: 'Venice',
    country: 'Italy',
    description: 'Palazzo magnificence on the Grand Canal',
    longDescription: `Aman Venice occupies the 16th-century Palazzo Papadopoli, one of the most prestigious palazzos on the Grand Canal. The hotel offers a rare glimpse into the private world of Venetian nobility, with original Tiepolo frescoes, gilded ceilings, and museum-quality antiques.

The 24 rooms and suites are individually designed, each offering a unique perspective on the palazzo's history. Many rooms feature original frescoes, while others overlook the private garden or the Grand Canal.

The hotel's restaurant, Arva, serves Italian cuisine with a focus on Veneto specialties. The private garden, rare in Venice, offers a tranquil oasis in the heart of the city. The Aman Venice Yacht is available for private tours of the lagoon.`,
    image: '/images/hotels/aman-venice.jpg',
    gallery: [
      '/images/hotels/aman-venice.jpg',
      '/images/experiences/alpine-awakening.jpg',
      '/images/misc/gift-card.jpg',
    ],
    amenities: [
      '24 Rooms & Suites',
      'Original Tiepolo Frescoes',
      'Private Garden',
      'Arva Restaurant',
      'Bar',
      'Library',
      'Aman Spa',
      'Private Pier',
      'Aman Venice Yacht',
      'Concierge',
      '24-hour Butler Service',
      'Valet Parking',
    ],
    rooms: [
      {
        id: 'r1',
        name: 'Palazzo Chamber',
        description: 'Elegant room overlooking the garden or canal',
        size: '45 sqm',
        image: '/images/hotels/aman-venice.jpg',
        price: '€1,800',
        features: ['King Bed', 'Canal or Garden View', 'Marble Bathroom', 'Antique Furnishings', 'Butler Service'],
      },
      {
        id: 'r2',
        name: 'Palazzo Stanza',
        description: 'Spacious room with Grand Canal views',
        size: '55 sqm',
        image: '/images/experiences/alpine-awakening.jpg',
        price: '€2,400',
        features: ['King Bed', 'Grand Canal View', 'Marble Bathroom', 'Sitting Area', 'Butler Service'],
      },
      {
        id: 'r3',
        name: 'Alcova Tiepolo Suite',
        description: 'Suite with original Tiepolo frescoes',
        size: '75 sqm',
        image: '/images/misc/gift-card.jpg',
        price: '€4,500',
        features: ['King Bed', 'Tiepolo Frescoes', 'Grand Canal View', 'Separate Living Room', 'Butler Service'],
      },
    ],
    dining: [
      {
        id: 'd1',
        name: 'Arva',
        cuisine: 'Italian',
        description: 'Italian cuisine with focus on Veneto specialties',
        image: '/images/experiences/alpine-awakening.jpg',
        hours: 'Breakfast: 7am - 11am | Lunch: 12:30pm - 2:30pm | Dinner: 7pm - 10:30pm',
        dressCode: 'Smart Casual',
      },
      {
        id: 'd2',
        name: 'The Bar',
        cuisine: 'Cocktails & Light Bites',
        description: 'Elegant bar overlooking the Grand Canal',
        image: '/images/misc/gift-card.jpg',
        hours: '11am - 12am',
        dressCode: 'Smart Casual',
      },
    ],
    spa: {
      name: 'Aman Spa Venice',
      description: 'Intimate spa in the historic palazzo cellars',
      image: '/images/misc/aman-essentials.jpg',
      treatments: [
        { name: 'Venetian Rose Ritual', duration: '90 min', price: '€320', description: 'Luxurious treatment using Venetian rose oil' },
        { name: 'Murano Glass Massage', duration: '75 min', price: '€280', description: 'Massage using smooth heated glass stones' },
        { name: 'Lagoon Algae Wrap', duration: '60 min', price: '€220', description: 'Detoxifying wrap using algae from the Venetian Lagoon' },
        { name: 'Venetian Mask Facial', duration: '75 min', price: '€260', description: 'Rejuvenating facial inspired by Venetian beauty traditions' },
      ],
      facilities: [
        'Treatment Suites',
        'Steam Room',
        'Relaxation Area',
        'Fitness Center',
      ],
    },
    experiences: [
      {
        id: 'e1',
        name: 'Private Gondola Tour',
        description: 'Romantic gondola ride through hidden canals',
        image: '/images/hotels/aman-venice.jpg',
        duration: '1 hour',
        price: '€350',
      },
      {
        id: 'e2',
        name: 'Murano Glass Workshop',
        description: 'Private glass-blowing demonstration on Murano Island',
        image: '/images/experiences/alpine-awakening.jpg',
        duration: '4 hours',
        price: '€450',
      },
      {
        id: 'e3',
        name: 'St. Mark\'s After Hours',
        description: 'Private evening visit to St. Mark\'s Basilica',
        image: '/images/misc/gift-card.jpg',
        duration: '2 hours',
        price: '€650',
      },
    ],
    locationDetails: {
      address: 'Palazzo Papadopoli, Calle Tiepolo 1364, 30125 Venice',
      coordinates: { lat: 45.4356, lng: 12.3356 },
      airport: 'Marco Polo Airport',
      airportDistance: '13 km',
      transferTime: '30 minutes by water taxi',
      climate: 'Mediterranean climate with hot summers and cool winters',
      bestTimeToVisit: 'April to June or September to October',
    },
    reviews: [
      { id: 'rev1', author: 'Giulia R.', rating: 5, date: '2024-12-22', comment: 'Living in a museum. The frescoes are breathtaking.', verified: true },
      { id: 'rev2', author: 'Thomas B.', rating: 5, date: '2024-12-08', comment: 'The most romantic hotel in Venice.', verified: true },
      { id: 'rev3', author: 'Sophie L.', rating: 5, date: '2024-11-25', comment: 'Service is impeccable. The private garden is magical.', verified: true },
    ],
    slug: 'aman-venice',
  },
  {
    id: '6',
    name: 'Amanzoe',
    location: 'Porto Heli',
    country: 'Greece',
    description: 'Ancient hilltop heritage in the Peloponnese',
    longDescription: `Amanzoe is set on a hilltop overlooking the Aegean Sea on the east coast of Greece's Peloponnese region. Designed by Ed Tuttle, the resort draws inspiration from ancient Greek architecture, with classical columns, marble floors, and reflecting pools.

The 38 pavilions and villas offer panoramic views of the surrounding olive groves and the turquoise sea. Each pavilion features a private terrace and plunge pool, while the larger villas offer multiple bedrooms and private chefs.

The Aman Spa offers treatments using Greek herbs and olive oil. The Beach Club, located a short drive away, offers water sports and beachfront dining. The resort is ideally located for exploring the ancient sites of Epidaurus and Mycenae.`,
    image: '/images/hotels/amanzoe.jpg',
    gallery: [
      '/images/hotels/amanzoe.jpg',
      '/images/experiences/winter-sun.jpg',
      '/images/misc/aman-at-sea.jpg',
    ],
    amenities: [
      '38 Pavilions & Villas',
      'Aman Spa',
      'Main Pool',
      'Restaurant',
      'Bar',
      'Library',
      'Beach Club',
      'Private Beach',
      'Water Sports',
      'Tennis Courts',
      'Fitness Center',
      'Yoga Pavilion',
    ],
    rooms: [
      {
        id: 'r1',
        name: 'Pool Pavilion',
        description: 'Pavilion with private pool and sea views',
        size: '210 sqm',
        image: '/images/hotels/amanzoe.jpg',
        price: '€2,200',
        features: ['King Bed', 'Private Pool', 'Sea View', 'Terrace', 'Butler Service'],
      },
      {
        id: 'r2',
        name: 'Deluxe Pool Pavilion',
        description: 'Larger pavilion with expanded terrace',
        size: '300 sqm',
        image: '/images/experiences/winter-sun.jpg',
        price: '€2,800',
        features: ['King Bed', 'Private Pool', 'Panoramic Sea View', 'Expanded Terrace', 'Butler Service'],
      },
      {
        id: 'r3',
        name: 'Villa',
        description: 'Two-bedroom villa with private chef',
        size: '600 sqm',
        image: '/images/misc/aman-at-sea.jpg',
        price: '€8,500',
        features: ['2 Bedrooms', 'Private Pool', 'Panoramic View', 'Kitchen', 'Private Chef'],
      },
    ],
    dining: [
      {
        id: 'd1',
        name: 'Restaurant',
        cuisine: 'Mediterranean',
        description: 'Mediterranean cuisine using local ingredients',
        image: '/images/experiences/alpine-awakening.jpg',
        hours: 'Breakfast: 7am - 11am | Lunch: 12:30pm - 3pm | Dinner: 7:30pm - 10:30pm',
        dressCode: 'Resort Casual',
      },
      {
        id: 'd2',
        name: 'Beach Club Restaurant',
        cuisine: 'Mediterranean & Seafood',
        description: 'Casual beachfront dining',
        image: '/images/experiences/winter-sun.jpg',
        hours: 'Lunch: 12pm - 5pm',
        dressCode: 'Beach Casual',
      },
    ],
    spa: {
      name: 'Aman Spa Amanzoe',
      description: 'Hilltop wellness sanctuary using Greek herbs and olive oil',
      image: '/images/misc/aman-essentials.jpg',
      treatments: [
        { name: 'Olive Oil Ritual', duration: '120 min', price: '€380', description: 'Nourishing treatment using cold-pressed Greek olive oil' },
        { name: 'Aegean Sea Salt Scrub', duration: '60 min', price: '€180', description: 'Exfoliating treatment using sea salt from the Aegean' },
        { name: 'Greek Herb Massage', duration: '90 min', price: '€280', description: 'Massage using locally sourced herbs' },
        { name: 'Olive Leaf Facial', duration: '75 min', price: '€240', description: 'Antioxidant facial using olive leaf extract' },
      ],
      facilities: [
        'Treatment Suites',
        'Steam Room',
        'Sauna',
        'Relaxation Terrace',
        'Fitness Center',
        'Yoga Pavilion',
      ],
    },
    experiences: [
      {
        id: 'e1',
        name: 'Ancient Epidaurus',
        description: 'Private tour of the ancient theatre and sanctuary',
        image: '/images/journeys/sri-lanka-sigiriya.jpg',
        duration: 'Half Day',
        price: '€450',
      },
      {
        id: 'e2',
        name: 'Private Yacht Charter',
        description: 'Day trip to Hydra and Spetses islands',
        image: '/images/misc/aman-at-sea.jpg',
        duration: 'Full Day',
        price: '€2,500',
      },
      {
        id: 'e3',
        name: 'Olive Harvest',
        description: 'Participate in traditional olive harvesting',
        image: '/images/hotels/amanzoe.jpg',
        duration: '4 hours',
        price: '€350',
      },
    ],
    locationDetails: {
      address: 'Agios Panteleimonas, Kranidi, Argolida 213 00',
      coordinates: { lat: 37.3167, lng: 23.1333 },
      airport: 'Athens International Airport',
      airportDistance: '170 km',
      transferTime: '2.5 hours by car or 25 minutes by helicopter',
      climate: 'Mediterranean climate with hot dry summers and mild winters',
      bestTimeToVisit: 'May to October',
    },
    reviews: [
      { id: 'rev1', author: 'Elena P.', rating: 5, date: '2024-12-25', comment: 'Greek paradise. The views are spectacular.', verified: true },
      { id: 'rev2', author: 'Mark D.', rating: 5, date: '2024-12-12', comment: 'Architecture is stunning. Feels like ancient Greece.', verified: true },
      { id: 'rev3', author: 'Helena K.', rating: 5, date: '2024-11-30', comment: 'The olive oil treatment at the spa is divine.', verified: true },
    ],
    slug: 'amanzoe',
  },
];

export const getHotelBySlug = (slug: string): HotelDetail | undefined => {
  return hotelsData.find((hotel) => hotel.slug === slug);
};

export const getAllHotels = (): HotelDetail[] => {
  return hotelsData;
};
