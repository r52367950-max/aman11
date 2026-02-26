export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  description: string;
  image: string;
  gallery: string[];
  highlights: string[];
  bestTimeToVisit: string;
  climate: string;
  language: string;
  currency: string;
  timezone: string;
  gettingThere: string;
  localAttractions: {
    name: string;
    description: string;
    distance: string;
  }[];
  experiences: {
    title: string;
    description: string;
    duration: string;
    price: string;
  }[];
}

export const destinations: Destination[] = [
  {
    id: 'thailand',
    name: 'Thailand',
    country: 'Thailand',
    region: 'Asia & Pacific',
    description: 'The Land of Smiles offers a captivating blend of ancient traditions, vibrant culture, and pristine natural beauty. From the bustling streets of Bangkok to the serene beaches of Phuket, Thailand is a destination that enchants every visitor.',
    image: '/images/hotels/amanpuri.jpg',
    gallery: [
      '/images/hotels/amanpuri.jpg',
      '/images/experiences/winter-sun.jpg',
      '/images/experiences/alpine-awakening.jpg',
    ],
    highlights: [
      'Ancient temples and Buddhist heritage',
      'World-renowned Thai cuisine',
      'Pristine beaches and crystal-clear waters',
      'Lush tropical jungles',
      'Warm hospitality and rich culture',
    ],
    bestTimeToVisit: 'November to March',
    climate: 'Tropical with three seasons: hot, rainy, and cool',
    language: 'Thai (English widely spoken in tourist areas)',
    currency: 'Thai Baht (THB)',
    timezone: 'GMT+7',
    gettingThere: 'International flights to Bangkok Suvarnabhumi Airport, followed by domestic flights or private transfers to your destination.',
    localAttractions: [
      {
        name: 'Grand Palace & Wat Phra Kaew',
        description: 'Bangkok\'s most famous landmark, featuring the Temple of the Emerald Buddha.',
        distance: '45 minutes from Amanpuri',
      },
      {
        name: 'Phi Phi Islands',
        description: 'Stunning limestone islands with crystal-clear waters perfect for snorkeling.',
        distance: '2 hours by boat',
      },
      {
        name: 'Ayutthaya Historical Park',
        description: 'UNESCO World Heritage site with ancient temple ruins.',
        distance: '2 hours by car',
      },
    ],
    experiences: [
      {
        title: 'Thai Cooking Class',
        description: 'Learn the secrets of authentic Thai cuisine from our master chefs.',
        duration: '3 hours',
        price: '$150 per person',
      },
      {
        title: 'Temple Blessing Ceremony',
        description: 'Participate in a traditional Buddhist blessing at a local temple.',
        duration: '2 hours',
        price: '$200 per person',
      },
      {
        title: 'Island Hopping',
        description: 'Explore hidden coves and pristine beaches by private longtail boat.',
        duration: 'Full day',
        price: '$800 per boat',
      },
    ],
  },
  {
    id: 'japan',
    name: 'Japan',
    country: 'Japan',
    region: 'Asia & Pacific',
    description: 'A land of contrasts where ancient traditions coexist with cutting-edge technology. From the neon-lit streets of Tokyo to the serene temples of Kyoto, Japan offers an unforgettable journey through time and culture.',
    image: '/images/hotels/aman-tokyo.jpg',
    gallery: [
      '/images/hotels/aman-tokyo.jpg',
      '/images/hotels/aman-kyoto.jpg',
      '/images/experiences/alpine-awakening.jpg',
    ],
    highlights: [
      'Ancient temples and shrines',
      'World-class cuisine including sushi and kaiseki',
      'Breathtaking natural landscapes',
      'Unique cultural experiences',
      'Impeccable service and hospitality',
    ],
    bestTimeToVisit: 'March-May (cherry blossom) or October-November (autumn colors)',
    climate: 'Four distinct seasons with hot summers and cold winters',
    language: 'Japanese (English increasingly common)',
    currency: 'Japanese Yen (JPY)',
    timezone: 'GMT+9',
    gettingThere: 'Direct international flights to Tokyo Narita/Haneda or Osaka Kansai airports.',
    localAttractions: [
      {
        name: 'Senso-ji Temple',
        description: 'Tokyo\'s oldest temple in the historic Asakusa district.',
        distance: '30 minutes from Aman Tokyo',
      },
      {
        name: 'Fushimi Inari Shrine',
        description: 'Famous for its thousands of vermillion torii gates.',
        distance: '20 minutes from Aman Kyoto',
      },
      {
        name: 'Mount Fuji',
        description: 'Japan\'s iconic sacred mountain.',
        distance: '2 hours from Tokyo',
      },
    ],
    experiences: [
      {
        title: 'Tea Ceremony',
        description: 'Experience the meditative art of traditional Japanese tea preparation.',
        duration: '1.5 hours',
        price: '$120 per person',
      },
      {
        title: 'Samurai Experience',
        description: 'Learn about samurai history and try your hand at sword techniques.',
        duration: '2 hours',
        price: '$250 per person',
      },
      {
        title: 'Private Geisha Dinner',
        description: 'Exclusive kaiseki dinner with geisha entertainment in Kyoto.',
        duration: '3 hours',
        price: '$1,500 for two',
      },
    ],
  },
  {
    id: 'italy',
    name: 'Italy',
    country: 'Italy',
    region: 'Europe',
    description: 'The birthplace of the Renaissance, Italy captivates with its art, architecture, cuisine, and la dolce vita lifestyle. From the romantic canals of Venice to the sun-drenched Amalfi Coast, every region offers its own unique charm.',
    image: '/images/hotels/aman-venice.jpg',
    gallery: [
      '/images/hotels/aman-venice.jpg',
      '/images/experiences/alpine-awakening.jpg',
      '/images/hotels/aman-new-york.jpg',
    ],
    highlights: [
      'UNESCO World Heritage sites',
      'World-renowned art and architecture',
      'Exceptional food and wine',
      'Rich history spanning millennia',
      'Diverse landscapes from mountains to coast',
    ],
    bestTimeToVisit: 'April-June or September-October',
    climate: 'Mediterranean with hot summers and mild winters',
    language: 'Italian (English common in tourist areas)',
    currency: 'Euro (EUR)',
    timezone: 'GMT+1 (GMT+2 in summer)',
    gettingThere: 'International flights to Rome, Milan, or Venice airports.',
    localAttractions: [
      {
        name: 'St. Mark\'s Basilica',
        description: 'Venice\'s iconic cathedral with stunning Byzantine mosaics.',
        distance: '15 minutes from Aman Venice',
      },
      {
        name: 'Doge\'s Palace',
        description: 'Gothic masterpiece and former residence of Venetian rulers.',
        distance: '10 minutes from Aman Venice',
      },
      {
        name: 'Murano Island',
        description: 'Famous for its centuries-old glass-making tradition.',
        distance: '30 minutes by boat',
      },
    ],
    experiences: [
      {
        title: 'Private Gondola Tour',
        description: 'Explore Venice\'s hidden canals with your own gondolier.',
        duration: '1 hour',
        price: '$400',
      },
      {
        title: 'Wine Tasting in Valpolicella',
        description: 'Sample Amarone and other regional wines at historic vineyards.',
        duration: 'Half day',
        price: '$600 per person',
      },
      {
        title: 'Cooking Class with Nonna',
        description: 'Learn traditional Venetian recipes from a local grandmother.',
        duration: '4 hours',
        price: '$350 per person',
      },
    ],
  },
  {
    id: 'usa',
    name: 'United States',
    country: 'United States',
    region: 'Americas',
    description: 'From the dramatic desert landscapes of Utah to the urban sophistication of New York City, the United States offers incredible diversity. Experience the raw beauty of the American West or the cultural richness of the East Coast.',
    image: '/images/hotels/amangiri.jpg',
    gallery: [
      '/images/hotels/amangiri.jpg',
      '/images/hotels/aman-new-york.jpg',
      '/images/hotels/amangani.jpg',
    ],
    highlights: [
      'Spectacular natural wonders',
      'Vibrant cities and cultural attractions',
      'World-class dining and entertainment',
      'Diverse landscapes and climates',
      'Iconic road trip routes',
    ],
    bestTimeToVisit: 'Varies by region - spring and fall generally ideal',
    climate: 'Extremely diverse - from desert to alpine to tropical',
    language: 'English',
    currency: 'US Dollar (USD)',
    timezone: 'Multiple time zones from GMT-5 to GMT-10',
    gettingThere: 'Major international airports in New York, Los Angeles, Las Vegas, and others.',
    localAttractions: [
      {
        name: 'Central Park',
        description: 'Iconic urban park in the heart of Manhattan.',
        distance: '5 minutes from Aman New York',
      },
      {
        name: 'Horseshoe Bend',
        description: 'Dramatic meander of the Colorado River.',
        distance: '15 minutes from Amangiri',
      },
      {
        name: 'Grand Teton National Park',
        description: 'Stunning mountain scenery and wildlife.',
        distance: '1 hour from Amangani',
      },
    ],
    experiences: [
      {
        title: 'Private Broadway Show',
        description: 'Behind-the-scenes access and premium seats to a hit musical.',
        duration: '3 hours',
        price: '$500 per person',
      },
      {
        title: 'Hot Air Balloon over Utah',
        description: 'Sunrise balloon ride over the dramatic desert landscape.',
        duration: '3 hours',
        price: '$450 per person',
      },
      {
        title: 'Wildlife Safari in Yellowstone',
        description: 'Private guided tour to spot bears, wolves, and bison.',
        duration: 'Full day',
        price: '$1,200 for two',
      },
    ],
  },
  {
    id: 'france',
    name: 'France',
    country: 'France',
    region: 'Europe',
    description: 'Synonymous with elegance, culture, and gastronomy, France offers everything from the glamour of the French Riviera to the rustic charm of Provence. Experience world-class art, wine, and cuisine in one of the world\'s most beloved destinations.',
    image: '/images/hotels/aman-le-melezin.jpg',
    gallery: [
      '/images/hotels/aman-le-melezin.jpg',
      '/images/experiences/alpine-awakening.jpg',
      '/images/hotels/aman-venice.jpg',
    ],
    highlights: [
      'World-class art and museums',
      'Exceptional wine and cuisine',
      'Stunning Alpine scenery',
      'Rich history and architecture',
      'Fashion and luxury shopping',
    ],
    bestTimeToVisit: 'April-June or September-November',
    climate: 'Temperate with four distinct seasons',
    language: 'French (English common in tourist areas)',
    currency: 'Euro (EUR)',
    timezone: 'GMT+1 (GMT+2 in summer)',
    gettingThere: 'International flights to Paris Charles de Gaulle or Nice airports.',
    localAttractions: [
      {
        name: 'Courchevel 1850',
        description: 'World-renowned ski resort in the French Alps.',
        distance: 'Direct access from Aman Le Mélézin',
      },
      {
        name: 'Vanoise National Park',
        description: 'France\'s first national park with stunning Alpine scenery.',
        distance: '30 minutes',
      },
      {
        name: 'Meribel',
        description: 'Charming Alpine village with excellent skiing.',
        distance: '15 minutes by car',
      },
    ],
    experiences: [
      {
        title: 'Champagne Tasting',
        description: 'Private tour and tasting at a prestigious champagne house.',
        duration: 'Half day',
        price: '$800 per person',
      },
      {
        title: 'Private Ski Lesson',
        description: 'One-on-one instruction with a professional ski instructor.',
        duration: '3 hours',
        price: '$500',
      },
      {
        title: 'Alpine Helicopter Tour',
        description: 'Breathtaking aerial views of Mont Blanc and the Alps.',
        duration: '1 hour',
        price: '$2,500',
      },
    ],
  },
  {
    id: 'morocco',
    name: 'Morocco',
    country: 'Morocco',
    region: 'Middle East & Africa',
    description: 'A gateway between Europe and Africa, Morocco enchants with its vibrant souks, stunning riads, and dramatic desert landscapes. From the bustling medinas of Marrakech to the serene Sahara, it\'s a feast for the senses.',
    image: '/images/hotels/amanjena.jpg',
    gallery: [
      '/images/hotels/amanjena.jpg',
      '/images/experiences/to-the-wilds.jpg',
      '/images/experiences/winter-sun.jpg',
    ],
    highlights: [
      'Rich Berber and Arab heritage',
      'Stunning desert and mountain landscapes',
      'Exquisite traditional crafts',
      'Unique architecture and design',
      'Warm hospitality',
    ],
    bestTimeToVisit: 'March-May or September-November',
    climate: 'Mediterranean with hot summers and mild winters',
    language: 'Arabic and Berber (French widely spoken)',
    currency: 'Moroccan Dirham (MAD)',
    timezone: 'GMT+1',
    gettingThere: 'International flights to Marrakech Menara Airport.',
    localAttractions: [
      {
        name: 'Jemaa el-Fnaa',
        description: 'Marrakech\'s famous main square with performers and food stalls.',
        distance: '20 minutes from Amanjena',
      },
      {
        name: 'Majorelle Garden',
        description: 'Beautiful botanical garden once owned by Yves Saint Laurent.',
        distance: '15 minutes',
      },
      {
        name: 'Atlas Mountains',
        description: 'Dramatic mountain range with traditional Berber villages.',
        distance: '1 hour by car',
      },
    ],
    experiences: [
      {
        title: 'Sunset Camel Trek',
        description: 'Ride through the Palmeraie as the sun sets over Marrakech.',
        duration: '2 hours',
        price: '$200 per person',
      },
      {
        title: 'Traditional Hammam',
        description: 'Authentic Moroccan spa experience with black soap and argan oil.',
        duration: '2 hours',
        price: '$180',
      },
      {
        title: 'Atlas Mountains Hike',
        description: 'Guided trek through Berber villages with lunch in a local home.',
        duration: 'Full day',
        price: '$400 per person',
      },
    ],
  },
];

export function getAllDestinations(): Destination[] {
  return destinations;
}

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find((dest) => dest.id === id);
}

export function getDestinationsByRegion(region: string): Destination[] {
  if (region === 'All') return destinations;
  return destinations.filter((dest) => dest.region === region);
}

export const regions = ['All', 'Asia & Pacific', 'Europe', 'Americas', 'Middle East & Africa'];
