export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export const journalArticles: JournalArticle[] = [
  {
    id: '1',
    slug: 'art-of-slow-travel',
    title: 'The Art of Slow Travel',
    excerpt: 'Discover the joy of taking your time and truly experiencing each destination.',
    content: `
      <p>In a world that moves faster every day, there's something revolutionary about choosing to slow down. At Aman, we believe that the most meaningful travel experiences come not from checking items off a list, but from taking the time to truly connect with a place.</p>
      
      <h3>Embracing the Present Moment</h3>
      <p>When you arrive at an Aman property, we encourage you to leave your itinerary behind. Wake up naturally, without an alarm. Spend an hour watching the sunrise. Take a walk with no destination in mind. These simple acts of presence can transform a vacation into a journey of discovery.</p>
      
      <h3>Deepening Your Connection</h3>
      <p>Slow travel isn't about doing less—it's about experiencing more. When you stay in one place for longer, you begin to notice the rhythms of daily life. You recognize the staff who serve your breakfast. You learn the names of the local flowers. You discover the hidden corners that guidebooks miss.</p>
      
      <h3>The Aman Approach</h3>
      <p>Each of our properties is designed to facilitate this deeper connection. From the architecture that frames natural views to the staff who remember your preferences, every detail is crafted to help you settle in and truly arrive.</p>
      
      <p>Whether you're watching the mist rise over the temples of Angkor Wat from Amansara, or feeling the desert wind at Amangiri, we invite you to pause, breathe, and simply be present.</p>
    `,
    image: '/images/experiences/to-the-wilds.jpg',
    category: 'Travel',
    author: {
      name: 'Sarah Mitchell',
      role: 'Travel Editor',
      avatar: '/images/avatars/author-1.jpg',
    },
    date: 'January 15, 2025',
    readTime: '5 min read',
    tags: ['slow travel', 'mindfulness', 'experiences'],
    featured: true,
  },
  {
    id: '2',
    slug: 'meditation-practices',
    title: 'Meditation Practices from Around the World',
    excerpt: 'Explore ancient meditation techniques and find the practice that resonates with you.',
    content: `
      <p>Meditation is a universal practice, yet every culture has developed its own unique approach to quieting the mind and connecting with the present moment. At Aman Spa, we draw from these diverse traditions to offer a comprehensive wellness experience.</p>
      
      <h3>Vipassana from Burma</h3>
      <p>This ancient technique of insight meditation focuses on observing the breath and bodily sensations without judgment. Our practitioners guide you through this practice, helping you develop greater awareness and equanimity.</p>
      
      <h3>Zen from Japan</h3>
      <p>Zen meditation, or zazen, emphasizes seated meditation and the cultivation of a clear, stable mind. At Aman Kyoto, you can experience zazen in the serene setting of a traditional temple.</p>
      
      <h3>Yoga Nidra from India</h3>
      <p>Known as "yogic sleep," this practice guides you into a state of deep relaxation while maintaining awareness. It's particularly effective for stress relief and improving sleep quality.</p>
      
      <h3>Finding Your Practice</h3>
      <p>The best meditation practice is the one you'll actually do. Our wellness consultants can help you explore different techniques and develop a practice that fits your lifestyle and goals.</p>
    `,
    image: '/images/experiences/alpine-awakening.jpg',
    category: 'Wellness',
    author: {
      name: 'Dr. Emily Chen',
      role: 'Wellness Director',
      avatar: '/images/avatars/author-2.jpg',
    },
    date: 'January 10, 2025',
    readTime: '7 min read',
    tags: ['meditation', 'wellness', 'mindfulness'],
    featured: false,
  },
  {
    id: '3',
    slug: 'japanese-cuisine-secrets',
    title: 'The Secrets of Japanese Cuisine',
    excerpt: 'An inside look at the philosophy and techniques behind washoku.',
    content: `
      <p>Japanese cuisine, or washoku, is much more than sushi and ramen. It's a culinary tradition built on respect for ingredients, attention to seasonality, and the pursuit of balance in every dish.</p>
      
      <h3>The Philosophy of Dashi</h3>
      <p>At the heart of Japanese cooking is dashi, a simple stock made from kombu (kelp) and katsuobushi (dried bonito flakes). This umami-rich foundation elevates everything it touches, from miso soup to simmered vegetables.</p>
      
      <h3>Shun: The Seasonal Imperative</h3>
      <p>Japanese cuisine is deeply connected to the seasons. Each ingredient has its shun—the peak moment when it's at its most flavorful. Our chefs at Nama and Arva work closely with local producers to source ingredients at their absolute best.</p>
      
      <h3>The Art of Presentation</h3>
      <p>In washoku, how a dish looks is as important as how it tastes. The arrangement of food on the plate, the choice of dishware, even the angle of a garnish—all contribute to the overall experience.</p>
      
      <h3>Experience It Yourself</h3>
      <p>At Aman Tokyo and other properties, we offer cooking classes where you can learn these techniques from our master chefs. It's a chance to bring a piece of Japanese culinary wisdom home with you.</p>
    `,
    image: '/images/hotels/aman-tokyo.jpg',
    category: 'Dining',
    author: {
      name: 'Chef Kenji Nakamura',
      role: 'Executive Chef',
      avatar: '/images/avatars/author-3.jpg',
    },
    date: 'January 5, 2025',
    readTime: '6 min read',
    tags: ['japanese cuisine', 'cooking', 'dining'],
    featured: false,
  },
  {
    id: '4',
    slug: 'venice-beyond-tourist-trail',
    title: 'Venice: Beyond the Tourist Trail',
    excerpt: 'Discover hidden corners and local secrets in the floating city.',
    content: `
      <p>Venice is a city of contrasts—famous landmarks draw millions of visitors each year, yet just a few steps away from the crowds, you can find quiet canals and hidden squares where local life continues much as it has for centuries.</p>
      
      <h3>The Venice of the Venetians</h3>
      <p>From Aman Venice, located in the historic Palazzo Papadopoli, you have access to both worlds. Start your day with coffee at a local bacaro, browse the Rialto Market with our chef, or take a private boat to explore the lagoon islands.</p>
      
      <h3>Hidden Gems</h3>
      <p>Our concierge team can arrange visits to private palaces not open to the public, introduce you to master craftsmen keeping traditional arts alive, or book you a table at family-run trattorias where the recipes have been passed down for generations.</p>
      
      <h3>The Art of the Aperitivo</h3>
      <p>No visit to Venice is complete without experiencing the ritual of aperitivo. Join locals at sunset for a spritz and cicchetti (small bites), watching the light change over the canals.</p>
      
      <h3>A Different Pace</h3>
      <p>Venice rewards those who take their time. Lose yourself in the maze of streets. Stop for a gelato. Sit by a canal and watch the boats go by. This is the Venice that captured the hearts of Byron and Browning—and it can capture yours too.</p>
    `,
    image: '/images/hotels/aman-venice.jpg',
    category: 'Culture',
    author: {
      name: 'Marco Rossi',
      role: 'Resident Historian',
      avatar: '/images/avatars/author-4.jpg',
    },
    date: 'December 28, 2024',
    readTime: '8 min read',
    tags: ['venice', 'culture', 'travel tips'],
    featured: false,
  },
  {
    id: '5',
    slug: 'architecture-honors-nature',
    title: 'Architecture That Honors Nature',
    excerpt: 'How Aman properties are designed to blend seamlessly with their surroundings.',
    content: `
      <p>The architecture of Aman is guided by a simple principle: the built environment should enhance, not dominate, the natural world. Each property is designed to feel like a natural extension of its setting.</p>
      
      <h3>Listening to the Land</h3>
      <p>Before any design work begins, our architects spend time on site, observing how light falls, how wind moves, how the seasons change. This deep understanding informs every decision, from the orientation of buildings to the choice of materials.</p>
      
      <h3>Local Materials, Local Craft</h3>
      <p>We believe in using materials that come from the land itself. At Amangiri, the concrete walls echo the color of the surrounding sandstone. At Amanzoe, the marble is quarried from nearby mountains. This not only reduces environmental impact but also creates a sense of place.</p>
      
      <h3>Indoor-Outdoor Living</h3>
      <p>Our designs blur the boundaries between inside and outside. Floor-to-ceiling windows frame views like paintings. Outdoor spaces are designed as extensions of interior rooms. The goal is to make nature feel present, even when you're indoors.</p>
      
      <h3>A Sense of Timelessness</h3>
      <p>Aman architecture avoids trends in favor of timelessness. We want our properties to feel as though they belong to their setting, as if they've always been there. This creates a sense of permanence and peace that our guests can feel.</p>
    `,
    image: '/images/hotels/amangiri.jpg',
    category: 'Design',
    author: {
      name: 'Kerry Hill',
      role: 'Architect',
      avatar: '/images/avatars/author-5.jpg',
    },
    date: 'December 20, 2024',
    readTime: '5 min read',
    tags: ['architecture', 'design', 'sustainability'],
    featured: false,
  },
  {
    id: '6',
    slug: 'healing-power-of-water',
    title: 'The Healing Power of Water',
    excerpt: 'Exploring hydrotherapy and the therapeutic benefits of water.',
    content: `
      <p>Water has been used for healing since ancient times. From Roman baths to Japanese onsen, cultures around the world have recognized the therapeutic power of water. At Aman Spa, we draw on these traditions to create transformative wellness experiences.</p>
      
      <h3>Hydrotherapy: A Timeless Practice</h3>
      <p>The use of water at different temperatures to promote healing is the foundation of hydrotherapy. Cold water invigorates, improving circulation and reducing inflammation. Warm water relaxes, easing muscle tension and calming the mind.</p>
      
      <h3>The Aman Spa Experience</h3>
      <p>Many of our spas feature hydrotherapy facilities: steam rooms, saunas, plunge pools, and experience showers. Our therapists can guide you through a circuit designed to detoxify, relax, and rejuvenate.</p>
      
      <h3>Water and Mindfulness</h3>
      <p>There's something inherently meditative about water. The sound of waves, the feeling of floating, the rhythm of swimming—all can help quiet the mind and bring you into the present moment.</p>
      
      <h3>Bringing It Home</h3>
      <p>You don't need a spa to experience the benefits of water. A warm bath with Epsom salts, a cold shower to start your day, or simply listening to a water feature can all contribute to your wellbeing.</p>
    `,
    image: '/images/misc/aman-at-sea.jpg',
    category: 'Wellness',
    author: {
      name: 'Dr. Lisa Wong',
      role: 'Spa Director',
      avatar: '/images/avatars/author-6.jpg',
    },
    date: 'December 15, 2024',
    readTime: '4 min read',
    tags: ['hydrotherapy', 'spa', 'wellness'],
    featured: false,
  },
];

export function getAllArticles(): JournalArticle[] {
  return journalArticles;
}

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((article) => article.slug === slug);
}

export function getFeaturedArticle(): JournalArticle | undefined {
  return journalArticles.find((article) => article.featured);
}

export function getArticlesByCategory(category: string): JournalArticle[] {
  if (category === 'All') return journalArticles;
  return journalArticles.filter((article) => article.category === category);
}

export const journalCategories = [
  'All',
  'Travel',
  'Wellness',
  'Dining',
  'Culture',
  'Design',
];
