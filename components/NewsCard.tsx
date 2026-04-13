'use client';

import { Clock, ExternalLink, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface NewsCardProps {
  article: {
    id: string;
    title: string;
    description: string;
    url: string;
    image?: string;
    publishedAt: string;
    source: string;
    category: string;
  };
  onClick?: () => void;
}

export default function NewsCard({ article, onClick }: NewsCardProps) {
  const [imageError, setImageError] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });

  const categoryStyles: Record<string, string> = {
    ai: 'bg-blue-50 text-blue-700 border-blue-200',
    llm: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    cyber: 'bg-red-50 text-red-700 border-red-200',
    webdev: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    devops: 'bg-slate-50 text-slate-700 border-slate-200',
    repos: 'bg-gray-50 text-gray-700 border-gray-200',
    companies: 'bg-teal-50 text-teal-700 border-teal-200',
    business: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    jobs: 'bg-lime-50 text-lime-700 border-lime-200',
    research: 'bg-violet-50 text-violet-700 border-violet-200',
    science: 'bg-purple-50 text-purple-700 border-purple-200',
    movies: 'bg-pink-50 text-pink-700 border-pink-200',
    series: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
    anime: 'bg-rose-50 text-rose-700 border-rose-200',
    comics: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    music: 'bg-orange-50 text-orange-700 border-orange-200',
    sports: 'bg-green-50 text-green-700 border-green-200',
    racing: 'bg-red-50 text-red-700 border-red-200',
    general: 'bg-amber-50 text-amber-700 border-amber-200',
    upsc: 'bg-sky-50 text-sky-700 border-sky-200',
    technology: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={onClick}
      className={`group anthropic-card overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-surface">
        {article.image && !imageError ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-light to-surface">
            <span className="text-5xl opacity-40">📰</span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border backdrop-blur-sm ${
              categoryStyles[article.category] || categoryStyles.general
            }`}
          >
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setBookmarked(!bookmarked);
          }}
          className="absolute top-3 right-3 p-2 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all shadow-sm"
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Bookmark
            className={`w-4 h-4 transition-colors ${
              bookmarked ? 'fill-accent text-accent' : 'text-text-muted'
            }`}
          />
        </button>

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Source & Time */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-accent">{article.source}</span>
          <div className="flex items-center space-x-1 text-text-muted">
            <Clock className="w-3.5 h-3.5" />
            <span>{timeAgo}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg leading-snug text-text-primary group-hover:text-accent transition-colors duration-400 line-clamp-2">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
          {article.description}
        </p>

        {/* Read More */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors group/link pt-1"
        >
          <span>Read article</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
        </a>
      </div>
    </motion.article>
  );
}
