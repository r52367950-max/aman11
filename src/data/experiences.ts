export interface ExperienceDetail {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  duration: string;
  price: string;
  location: string;
  highlights: string[];
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  requirements: string[];
  bestTime: string;
  groupSize: string;
  difficulty: string;
  relatedExperiences: string[];
  reviews: Review[];
  slug: string;
}

export interface ItineraryItem {
  time: string;
  activity: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const experiencesData: ExperienceDetail[] = [
  {
    id: '1',
    name: 'Alpine Awakening',
    category: 'In the Mountains',
    shortDescription: 'Ski adventures in France and Italy',
    fullDescription: `Experience the magic of the European Alps with Aman's exclusive winter program. From the glamour of Courchevel to the Italian charm of the Dolomites, discover pristine slopes, Michelin-starred mountain cuisine, and après-ski relaxation at its finest.

Our Alpine Awakening experience includes private ski instructors, helicopter transfers to remote powder fields, and exclusive access to mountain refuges. After a day on the slopes, unwind in world-class spas featuring alpine-inspired treatments using local herbs and mineral-rich thermal waters.

Whether you're a beginner seeking gentle slopes or an expert looking for challenging off-piste terrain, our team will curate the perfect alpine adventure for you.`,
    image: '/images/experiences/alpine-awakening.jpg',
    gallery: [
      '/images/experiences/alpine-awakening.jpg',
      '/images/hotels/amanzoe.jpg',
      '/images/experiences/winter-sun.jpg',
    ],
    duration: '5-7 Days',
    price: 'From €12,500 per person',
    location: 'French Alps & Italian Dolomites',
    highlights: [
      'Private ski instruction with Olympic-level coaches',
      'Helicopter transfers to exclusive powder fields',
      'Michelin-starred mountain dining experiences',
      'Alpine spa treatments with thermal waters',
      'Exclusive access to private mountain refuges',
      'Après-ski cocktails at altitude lounges',
    ],
    itinerary: [
      { time: 'Day 1', activity: 'Arrival & Welcome', description: 'Private transfer from airport to your alpine retreat. Welcome dinner featuring local specialties.' },
      { time: 'Day 2', activity: 'First Tracks', description: 'Early morning first tracks experience with private guide. Afternoon spa treatment.' },
      { time: 'Day 3', activity: 'Heli-Skiing', description: 'Full day heli-skiing adventure accessing remote powder fields. Mountain lunch in a private refuge.' },
      { time: 'Day 4', activity: 'Cross-Border Skiing', description: 'Ski from France to Italy, experiencing two cultures in one day. Dinner at altitude restaurant.' },
      { time: 'Day 5', activity: 'Spa & Wellness', description: 'Full day of alpine spa treatments, thermal baths, and relaxation.' },
      { time: 'Day 6', activity: 'Off-Piste Adventure', description: 'Advanced off-piste skiing with avalanche safety training. Farewell dinner.' },
      { time: 'Day 7', activity: 'Departure', description: 'Leisurely breakfast and private transfer to airport.' },
    ],
    inclusions: [
      'Luxury accommodation in Aman properties',
      'All meals including Michelin-starred dining',
      'Private ski instruction',
      'Helicopter transfers',
      'Lift passes',
      'Equipment rental',
      'Spa treatments',
      '24-hour concierge',
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Gratuities',
    ],
    requirements: [
      'Intermediate skiing ability minimum',
      'Travel insurance with winter sports coverage',
      'Valid passport',
    ],
    bestTime: 'December to April',
    groupSize: '2-8 guests',
    difficulty: 'Intermediate to Advanced',
    relatedExperiences: ['2', '3', '4'],
    reviews: [
      { id: 'r1', author: 'Pierre L.', rating: 5, date: '2024-12-20', comment: 'The heli-skiing was the highlight of my life. Incredible!', verified: true },
      { id: 'r2', author: 'Sarah M.', rating: 5, date: '2024-12-15', comment: 'First tracks at sunrise is magical. Highly recommend.', verified: true },
    ],
    slug: 'alpine-awakening',
  },
  {
    id: '2',
    name: 'Chasing Sunlight',
    category: 'Winter Sun',
    shortDescription: 'Curated winter sun retreats',
    fullDescription: `Escape the winter chill and discover Aman's collection of sun-drenched destinations. From the pristine beaches of the Caribbean to the tropical paradise of Southeast Asia, our winter sun retreats offer the perfect blend of relaxation and adventure.

Each destination has been carefully selected for its exceptional climate during the winter months, ensuring warm temperatures and plenty of sunshine. Enjoy private beach access, water sports, spa treatments, and world-class dining in stunning tropical settings.

Whether you prefer the laid-back luxury of the Caribbean or the exotic allure of the Indian Ocean, our winter sun collection promises unforgettable experiences in paradise.`,
    image: '/images/experiences/winter-sun.jpg',
    gallery: [
      '/images/experiences/winter-sun.jpg',
      '/images/hotels/amanpuri.jpg',
      '/images/misc/aman-at-sea.jpg',
    ],
    duration: '7-10 Days',
    price: 'From $8,500 per person',
    location: 'Caribbean, Indian Ocean & Southeast Asia',
    highlights: [
      'Private beach access at exclusive resorts',
      'Sunset yacht cruises with champagne',
      'Water sports including diving and snorkeling',
      'Tropical spa treatments using local ingredients',
      'Private island picnics',
      'Local cultural experiences and cooking classes',
    ],
    itinerary: [
      { time: 'Day 1', activity: 'Arrival in Paradise', description: 'Welcome to your tropical retreat. Sunset cocktail reception.' },
      { time: 'Day 2', activity: 'Beach Relaxation', description: 'Full day of beach relaxation with private cabana and butler service.' },
      { time: 'Day 3', activity: 'Water Adventures', description: 'Snorkeling or diving excursion to nearby reefs. Beach barbecue dinner.' },
      { time: 'Day 4', activity: 'Island Exploration', description: 'Private boat tour of nearby islands. Lunch on a secluded beach.' },
      { time: 'Day 5', activity: 'Spa Day', description: 'Full day of tropical spa treatments and wellness activities.' },
      { time: 'Day 6', activity: 'Cultural Immersion', description: 'Local village visit and traditional cooking class.' },
      { time: 'Day 7', activity: 'Sunset Cruise', description: 'Private yacht cruise with champagne and canapés.' },
      { time: 'Day 8', activity: 'Departure', description: 'Final morning swim and departure transfer.' },
    ],
    inclusions: [
      'Luxury accommodation',
      'All meals and beverages',
      'Airport transfers',
      'Water sports equipment',
      'Spa treatments',
      'Excursions as per itinerary',
      '24-hour concierge',
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Gratuities',
    ],
    requirements: [
      'Valid passport',
      'Travel insurance',
      'Any required visas',
    ],
    bestTime: 'November to April',
    groupSize: '2-6 guests',
    difficulty: 'Easy',
    relatedExperiences: ['1', '3', '4'],
    reviews: [
      { id: 'r1', author: 'Emma W.', rating: 5, date: '2024-12-18', comment: 'The perfect escape from winter. The beaches are pristine.', verified: true },
      { id: 'r2', author: 'James K.', rating: 5, date: '2024-12-10', comment: 'Sunset cruise was unforgettable. Highly recommend.', verified: true },
    ],
    slug: 'chasing-sunlight',
  },
  {
    id: '3',
    name: 'Urban Discovery',
    category: 'City Escapes',
    shortDescription: 'Cultural discovery in world cities',
    fullDescription: `Immerse yourself in the world's most vibrant cities with Aman's curated urban experiences. From the neon-lit streets of Tokyo to the historic boulevards of Paris, discover the cultural treasures, culinary delights, and hidden gems that make each city unique.

Our city escapes go beyond typical tourist experiences, offering exclusive access to private collections, after-hours museum visits, and meetings with local artists and chefs. Stay in Aman's urban sanctuaries, where tranquility awaits above the bustling city streets.

Each itinerary is customized to your interests, whether you're passionate about art, food, architecture, or fashion. Let us show you the city through the eyes of a local.`,
    image: '/images/experiences/city-escape.jpg',
    gallery: [
      '/images/experiences/city-escape.jpg',
      '/images/hotels/aman-tokyo.jpg',
      '/images/hotels/aman-new-york.jpg',
    ],
    duration: '4-6 Days',
    price: 'From $6,500 per person',
    location: 'Tokyo, New York, Venice, Paris',
    highlights: [
      'After-hours private museum tours',
      'Meetings with local artists and designers',
      'Exclusive restaurant reservations',
      'Private shopping experiences',
      'Architectural walking tours',
      'Cultural performances and shows',
    ],
    itinerary: [
      { time: 'Day 1', activity: 'Arrival & City Introduction', description: 'Private transfer to your Aman sanctuary. Evening neighborhood exploration.' },
      { time: 'Day 2', activity: 'Art & Culture', description: 'Private museum tour with curator. Lunch at acclaimed restaurant. Gallery visits.' },
      { time: 'Day 3', activity: 'Culinary Journey', description: 'Market tour with chef. Cooking class. Dinner at Michelin-starred restaurant.' },
      { time: 'Day 4', activity: 'Architecture & Design', description: 'Walking tour of architectural highlights. Meeting with local designer.' },
      { time: 'Day 5', activity: 'Hidden Gems', description: 'Exploration of off-the-beaten-path neighborhoods. Local artisan visits.' },
      { time: 'Day 6', activity: 'Departure', description: 'Final city views and departure transfer.' },
    ],
    inclusions: [
      'Aman hotel accommodation',
      'Daily breakfast',
      'Private guided tours',
      'Museum entrance fees',
      'Restaurant reservations',
      'Transportation within city',
      '24-hour concierge',
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Gratuities',
    ],
    requirements: [
      'Valid passport',
      'Travel insurance',
      'Any required visas',
    ],
    bestTime: 'Year-round',
    groupSize: '2-4 guests',
    difficulty: 'Easy',
    relatedExperiences: ['1', '2', '4'],
    reviews: [
      { id: 'r1', author: 'Alex T.', rating: 5, date: '2024-12-22', comment: 'The private museum tour was incredible. Saw things no one else gets to see.', verified: true },
      { id: 'r2', author: 'Maria G.', rating: 5, date: '2024-12-05', comment: 'Discovered parts of the city I never knew existed.', verified: true },
    ],
    slug: 'urban-discovery',
  },
  {
    id: '4',
    name: 'To the Wilds',
    category: 'Nature',
    shortDescription: 'Remote camp and safari settings',
    fullDescription: `Venture into the wild with Aman's collection of remote safari camps and wilderness lodges. From the golden savannas of Africa to the rugged landscapes of the American West, experience nature at its most awe-inspiring.

Our wilderness properties offer the perfect blend of adventure and luxury, with expert guides leading game drives, walking safaris, and conservation experiences. Return each evening to your private tent or lodge, where comfort and fine dining await.

Each destination supports local conservation efforts, ensuring that your visit contributes to the protection of these precious ecosystems and their wildlife.`,
    image: '/images/experiences/to-the-wilds.jpg',
    gallery: [
      '/images/experiences/to-the-wilds.jpg',
      '/images/hotels/amangiri.jpg',
      '/images/journeys/bhutan-tigers-nest.webp',
    ],
    duration: '5-7 Days',
    price: 'From $9,500 per person',
    location: 'Africa, Utah, Bhutan',
    highlights: [
      'Daily game drives with expert guides',
      'Walking safaris and bush walks',
      'Conservation experiences',
      'Stargazing in pristine dark skies',
      'Bush dinners under the stars',
      'Wildlife photography workshops',
    ],
    itinerary: [
      { time: 'Day 1', activity: 'Arrival in the Wild', description: 'Transfer to your wilderness camp. Sunset game drive.' },
      { time: 'Day 2', activity: 'Full Day Safari', description: 'Morning and afternoon game drives. Bush breakfast.' },
      { time: 'Day 3', activity: 'Walking Safari', description: 'Guided walking safari learning tracking skills. Conservation talk.' },
      { time: 'Day 4', activity: 'Cultural Visit', description: 'Visit to local community. Traditional dinner.' },
      { time: 'Day 5', activity: 'Photography Focus', description: 'Wildlife photography workshop with professional guide.' },
      { time: 'Day 6', activity: 'Final Game Drive', description: 'Last chance to spot wildlife. Farewell bush dinner.' },
      { time: 'Day 7', activity: 'Departure', description: 'Final morning activity and departure transfer.' },
    ],
    inclusions: [
      'Luxury tented accommodation',
      'All meals and beverages',
      'Daily game drives',
      'Guided walks',
      'Park entrance fees',
      'Conservation levies',
      'Laundry service',
      '24-hour camp staff',
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Gratuities',
    ],
    requirements: [
      'Valid passport',
      'Travel insurance',
      'Any required visas',
      'Vaccination certificates if required',
    ],
    bestTime: 'Year-round (varies by destination)',
    groupSize: '2-6 guests',
    difficulty: 'Moderate',
    relatedExperiences: ['1', '2', '3'],
    reviews: [
      { id: 'r1', author: 'David R.', rating: 5, date: '2024-12-15', comment: 'Saw the Big Five in one day! The guides are incredible.', verified: true },
      { id: 'r2', author: 'Lisa P.', rating: 5, date: '2024-12-01', comment: 'Sleeping under the stars in luxury. Unforgettable experience.', verified: true },
    ],
    slug: 'to-the-wilds',
  },
];

export const getExperienceBySlug = (slug: string): ExperienceDetail | undefined => {
  return experiencesData.find((exp) => exp.slug === slug);
};

export const getAllExperiences = (): ExperienceDetail[] => {
  return experiencesData;
};
