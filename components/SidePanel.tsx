'use client';

import { X, ExternalLink, Clock, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  source: string;
  category: string;
}

interface SidePanelProps {
  article: Article | null;
  onClose: () => void;
}

export default function SidePanel({ article, onClose }: SidePanelProps) {
  if (!article) return null;

  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-primary shadow-2xl border-l border-border-default overflow-y-auto"
      >
        <div className="flex flex-col min-h-full">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-primary/95 backdrop-blur-md border-b border-border-default">
            <h3 className="font-semibold text-text-primary">Article Preview</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-surface hover:bg-border-default transition-colors"
              aria-label="Close panel"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>

          {/* Expanded Image */}
          {article.image ? (
            <div className="w-full h-64 relative bg-surface shrink-0">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=News';
                }}
              />
            </div>
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-accent-light to-surface flex items-center justify-center shrink-0">
              <span className="text-6xl opacity-30">📰</span>
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="font-bold text-accent">{article.source}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-display text-text-primary leading-tight mb-4">
              {article.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-text-muted mb-8 pb-6 border-b border-border-default">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{timeAgo}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                <span className="uppercase tracking-wider font-semibold">{article.category}</span>
              </div>
            </div>

            <div className="prose prose-p:text-text-secondary prose-p:leading-relaxed mb-auto">
              <p className="text-lg">
                {article.description || 'No detailed description available for this article.'}
              </p>
            </div>

            {/* Action Area */}
            <div className="mt-12 pt-6">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full anthropic-btn-primary py-4 text-base"
                onClick={onClose}
              >
                <span>Read Full Article</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <p className="text-center text-xs text-text-muted mt-4">
                Opens in a new tab securely on {article.source}.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
