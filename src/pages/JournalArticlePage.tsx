import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Heart } from 'lucide-react';
import { useState } from 'react';
import { getArticleBySlug, getAllArticles } from '@/data/journal';
import { isSafeSlug, sanitizeRichText } from '@/lib/security';

export function JournalArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const safeSlug = slug && isSafeSlug(slug) ? slug : '';
  const article = getArticleBySlug(safeSlug);
  const allArticles = getAllArticles();
  const [isLiked, setIsLiked] = useState(false);
  const sanitizedContent = article ? sanitizeRichText(article.content) : '';

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] pt-32 text-center">
        <h1 className="text-3xl font-serif font-light text-[#1A1A1A]">Article not found</h1>
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
            <h1 className="text-3xl md:text-5xl font-serif font-light text-[#1A1A1A] mt-4 mb-6">
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
            <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center text-[#C9A962] font-serif font-light text-lg">
              {article.author.name[0]}
            </div>
            <div>
              <p className="text-[#1A1A1A] font-medium">{article.author.name}</p>
              <p className="text-sm text-[#9A9A9A]">{article.author.role}</p>
            </div>
          </motion.div>

          {/* Article Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none prose-headings:font-serif font-light prose-headings:font-light prose-headings:text-[#1A1A1A] prose-p:text-[#6B6B6B] prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* Tags */}
          {article.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-[#E5E0D8] text-xs text-[#6B6B6B] caption-uppercase"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Related */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 pt-8 border-t border-[#E5E0D8]"
          >
            <h3 className="text-xl font-serif font-light text-[#1A1A1A] mb-6">More from The Journal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allArticles.filter((a) => a.slug !== slug).slice(0, 2).map((related) => (
                <Link
                  key={related.slug}
                  to={`/journal/${related.slug}`}
                  className="group flex gap-4"
                >
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-24 h-24 object-cover flex-shrink-0"
                  />
                  <div>
                    <span className="caption-uppercase text-[#C9A962] block mb-1">{related.category}</span>
                    <h4 className="font-serif font-light text-[#1A1A1A] group-hover:text-[#C9A962] transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-xs text-[#9A9A9A] mt-1">{related.readTime}</p>
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
