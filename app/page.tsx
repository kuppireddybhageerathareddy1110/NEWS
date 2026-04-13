'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import NewsCard from '@/components/NewsCard';
import WeatherWidget from '@/components/WeatherWidget';
import TrendingTopics from '@/components/TrendingTopics';
import LoadingSpinner from '@/components/LoadingSpinner';
import SidePanel from '@/components/SidePanel';
import { RefreshCw, Search } from 'lucide-react';
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

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentCategory, setCurrentCategory] = useState('ai');
  const [currentLocation, setCurrentLocation] = useState('global');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSearchQuery('');
    fetchNews();
  }, [currentCategory, currentLocation]);

  const fetchNews = async (query = '') => {
    setLoading(true);
    setCurrentPage(1); // Reset to page 1 on new fetch
    try {
      const url = query 
        ? `/api/news?q=${encodeURIComponent(query)}&source=newsapi&location=${currentLocation}`
        : `/api/news?category=${currentCategory}&source=newsapi&location=${currentLocation}`;
        
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setArticles(data.articles);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchNews(searchQuery);
    }
  };

  const ITEMS_PER_PAGE = 20;
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="min-h-screen bg-primary">
        <Header
          currentCategory={currentCategory}
          onCategoryChange={setCurrentCategory}
        />

      <main className="container mx-auto px-4 lg:px-8 py-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-display text-text-primary mb-3 leading-tight">
            Discover the signal,{' '}
            <span className="gradient-text">filter the noise</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Your curated feed for Technology, AI, Markets, Science &amp; Global Affairs.
          </p>
        </motion.div>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 animate-fade-in animate-delay-100">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search globally..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="anthropic-input pl-11 w-full"
                id="search-input"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !searchQuery.trim()}
              className="anthropic-btn-primary disabled:opacity-50 disabled:cursor-not-allowed hidden sm:flex"
            >
              Search
            </button>
          </form>

          {/* Location Filter */}
          <div className="relative shrink-0">
            <select
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              className="anthropic-input appearance-none pr-10 cursor-pointer h-full min-h-[44px]"
              aria-label="Select location"
            >
              <option value="global">🌍 Global</option>
              <option value="usa">🇺🇸 United States</option>
              <option value="uk">🇬🇧 United Kingdom</option>
              <option value="in">🇮🇳 India</option>
              <option value="ca">🇨🇦 Canada</option>
              <option value="au">🇦🇺 Australia</option>
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => fetchNews(searchQuery)}
            disabled={loading}
            className="anthropic-btn-secondary disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            id="refresh-btn"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`}
            />
            Refresh
          </button>
        </div>

        {/* Last Updated */}
        <div className="mb-8 text-xs text-text-muted animate-fade-in animate-delay-200">
          {mounted && lastUpdated ? `Last updated: ${lastUpdated}` : '\u00A0'}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6 order-2 lg:order-1">
            <div className="animate-fade-in animate-delay-200">
              <WeatherWidget locationCode={currentLocation} />
            </div>
            <div className="animate-fade-in animate-delay-300">
              <TrendingTopics />
            </div>
          </aside>

          {/* News Feed */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {loading ? (
              <LoadingSpinner />
            ) : articles.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-text-muted" />
                </div>
                <h3 className="text-xl font-display text-text-primary mb-2">
                  No articles found
                </h3>
                <p className="text-text-secondary text-sm">
                  Try adjusting your search query or selecting a different domain.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-5 text-sm font-medium text-text-muted flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span>
                    {searchQuery ? `Search results for "${searchQuery}"` : `Latest in ${currentCategory}`}
                    {currentLocation !== 'global' && ` • Region Filter Active`}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="bg-surface px-2.5 py-1 rounded-md text-xs border border-border-default shadow-sm">
                      Total: {articles.length} articles
                    </span>
                    {totalPages > 1 && (
                      <span className="bg-accent-light text-accent px-2.5 py-1 rounded-md text-xs font-semibold">
                        Page {currentPage} of {totalPages}
                      </span>
                    )}
                  </div>
                </div>
                <motion.div 
                  className="news-grid"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedArticles.map((article) => (
                      <NewsCard 
                        key={article.id} 
                        article={article} 
                        onClick={() => setSelectedArticle(article)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap justify-center items-center gap-2 mt-12 animate-fade-in">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium rounded-xl border border-border-default hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-accent text-white shadow-sm'
                            : 'border border-border-default text-text-secondary hover:bg-surface'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium rounded-xl border border-border-default hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Side Panel Overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <SidePanel
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-border-default bg-secondary/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">
              Built with care for curious minds.
            </p>
            <div className="flex items-center space-x-3 text-xs text-text-muted">
              <span>NewsAPI</span>
              <span className="w-1 h-1 rounded-full bg-border-default" />
              <span>OpenWeather</span>
              <span className="w-1 h-1 rounded-full bg-border-default" />
              <span>Next.js 14</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
