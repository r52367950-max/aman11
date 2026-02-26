import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Heart } from 'lucide-react';
import { useState } from 'react';

const articles = [
  {
    slug: 'art-of-slow-travel',
    title: 'The Art of Slow Travel',
    content: `
      <p>In a world that moves at an ever-increasing pace, there is something profoundly luxurious about slowing down. At Aman, we believe that the journey is just as important as the destination, and that true travel should be savored, not rushed.</p>
      
      <h2>The Philosophy of Slow Travel</h2>
      <p>Slow travel is not about moving at a snail's pace. Rather, it's about taking the time to truly experience a place - its culture, its people, its rhythms. It's about allowing yourself to be present, to notice the details that might otherwise pass you by.</p>
      
      <p>When you travel slowly, you give yourself permission to:</p>
      <ul>
        <li>Stay longer in each destination</li>
        <li>Connect with local communities</li>
        <li>Experience the changing seasons and daily rhythms</li>
        <li>Discover hidden corners and unexpected moments</li>
      </ul>
      
      <h2>The Aman Approach</h2>
      <p>Every Aman property is designed to facilitate this kind of immersive, unhurried experience. From the moment you arrive, you are encouraged to let go of your schedule and simply be.</p>
      
      <p>Our properties are not just places to sleep - they are destinations in themselves, where you can spend days exploring the grounds, enjoying spa treatments, learning local crafts, or simply sitting by the pool with a good book.</p>
      
      <h2>Practical Tips for Slow Travel</h2>
      <p>Here are some ways to embrace slow travel on your next journey:</p>
      <ol>
        <li><strong>Stay longer.</strong> Instead of trying to see five cities in a week, choose one or two and really get to know them.</li>
        <li><strong>Walk.</strong> There's no better way to experience a place than on foot. Take the time to wander without a destination.</li>
        <li><strong>Eat local.</strong> Seek out neighborhood restaurants and markets. Food is one of the best windows into a culture.</li>
        <li><strong>Talk to people.</strong> Strike up conversations with locals. You never know what you might learn.</li>
        <li><strong>Put down your phone.</strong> Resist the urge to document everything. Some moments are meant just for you.</li>
      </ol>
      
      <h2>The Rewards of Taking Your Time</h2>
      <p>When you travel slowly, you return home not just with photos, but with memories that have depth and meaning. You carry with you a true understanding of the places you've visited, and often, lasting connections with the people you've met.</p>
      
      <p>In the end, slow travel is about quality over quantity. It's about choosing to have fewer experiences, but making each one count. And at Aman, that's exactly what we strive to provide.</p>
    `,
    image: '/images/experiences/to-the-wilds.jpg',
    category: 'Travel',
    date: 'Jan 15, 2025',
    readTime: '5 min read',
    author: 'Sarah Mitchell',
    authorRole: 'Travel Editor',
  },
];

export function JournalArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);
  const [isLiked, setIsLiked] = useState(false);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] pt-32 text-center">
        <h1 className="text-3xl font-serif text-[#1A1A1A]">Article not found</h1>
        <Link to="/journal" className="text-[#C9A962] mt-4 inline-block">
          Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Header Image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-6 left-6">
          <Link
            to="/journal"
            className="flex items-center gap-2 text-white hover:text-[#C9A962] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Journal</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container-aman py-12">
        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="caption-uppercase text-[#C9A962]">{article.category}</span>
            <h1 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mt-4 mb-6">
              {article.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-[#9A9A9A]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="w-10 h-10 border border-[#E5E0D8] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button className="w-10 h-10 border border-[#E5E0D8] flex items-center justify-center hover:border-[#1A1A1A] transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 py-6 border-y border-[#E5E0D8] mb-8"
          >
            <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center text-[#C9A962] font-serif">
              {article.author[0]}
            </div>
            <div>
              <p className="text-[#1A1A1A] font-medium">{article.author}</p>
              <p className="text-sm text-[#9A9A9A]">{article.authorRole}</p>
            </div>
          </motion.div>

          {/* Article Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Related */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 pt-8 border-t border-[#E5E0D8]"
          >
            <h3 className="text-xl font-serif text-[#1A1A1A] mb-6">More from The Journal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.filter((a) => a.slug !== slug).slice(0, 2).map((related) => (
                <Link
                  key={related.slug}
                  to={`/journal/${related.slug}`}
                  className="group flex gap-4"
                >
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-24 h-24 object-cover"
                  />
                  <div>
                    <span className="text-xs text-[#C9A962]">{related.category}</span>
                    <h4 className="font-serif text-[#1A1A1A] group-hover:text-[#C9A962] transition-colors">
                      {related.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
