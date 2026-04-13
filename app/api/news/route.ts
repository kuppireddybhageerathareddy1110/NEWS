import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// API Configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY || 'YOUR_NEWS_API_KEY';
const GNEWS_API_KEY = process.env.GNEWS_API_KEY || 'YOUR_GNEWS_API_KEY';

// Categories that map to NewsAPI top-headlines categories
const HEADLINE_CATEGORIES: Record<string, string> = {
  business: 'business',
  science: 'science',
  sports: 'sports',
  general: 'general',
  technology: 'technology',
};

// Categories that need search queries via the 'everything' endpoint
const SEARCH_CATEGORIES: Record<string, string> = {
  ai: 'artificial intelligence OR machine learning OR deep learning OR neural network',
  llm: 'LLM OR "large language model" OR "generative AI" OR "agentic AI" OR GPT OR Claude OR "NLP model" OR "foundation model"',
  cyber: 'cybersecurity OR "data breach" OR hacking OR "zero day" OR infosec OR ransomware',
  webdev: '"web development" OR React OR "Next.js" OR Vue OR Angular OR "frontend development" OR JavaScript OR TypeScript',
  devops: 'DevOps OR Kubernetes OR Docker OR CI/CD OR "cloud infrastructure" OR terraform OR AWS OR Azure',
  repos: 'GitHub OR "open source" OR "trending repository" OR "developer tools" OR "code release"',
  companies: '"tech company" OR startup OR "series funding" OR acquisition OR IPO OR "tech industry"',
  jobs: '"job openings" OR "hiring" OR "tech jobs" OR "remote work" OR "career opportunities" OR recruitment',
  research: '"research paper" OR arXiv OR "scientific study" OR "peer reviewed" OR "breakthrough discovery"',
  movies: 'movie OR film OR "box office" OR Hollywood OR Bollywood OR "movie review" OR cinema',
  series: '"TV series" OR "streaming show" OR Netflix OR "HBO" OR "Disney Plus" OR "new season" OR "TV show"',
  anime: 'anime OR manga OR "Crunchyroll" OR "anime season" OR "Japanese animation" OR otaku',
  comics: 'comics OR "Marvel" OR "DC Comics" OR "graphic novel" OR superhero OR "comic book"',
  music: 'music OR "new album" OR "music release" OR concert OR "music industry" OR Spotify OR "Grammy"',
  racing: '"Formula 1" OR F1 OR NASCAR OR "MotoGP" OR "racing" OR "Grand Prix" OR motorsport',
  upsc: 'UPSC OR "civil services" OR "Indian government" OR "India policy" OR "IAS exam"',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'ai';
  const source = searchParams.get('source') || 'newsapi';
  const q = searchParams.get('q');
  const location = searchParams.get('location') || 'global';

  // Map locations to NewsAPI country codes for top-headlines
  const locationCodeMap: Record<string, string> = {
    in: 'in', usa: 'us', uk: 'gb', au: 'au', ca: 'ca'
  };
  const locationNameMap: Record<string, string> = {
    in: 'India', usa: 'United States', uk: 'United Kingdom', au: 'Australia', ca: 'Canada'
  };

  const isoCode = locationCodeMap[location];
  const querySuffix = location !== 'global' ? ` AND ${locationNameMap[location]}` : '';

  try {
    let data;

    if (source === 'newsapi') {
      let apiUrl: string;

      if (q) {
        // Use everything endpoint for direct search queries
        apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q + querySuffix)}&language=en&sortBy=publishedAt&pageSize=100&apiKey=${NEWS_API_KEY}`;
      } else if (HEADLINE_CATEGORIES[category]) {
        // Use top-headlines for standard categories
        const countryParam = isoCode ? `&country=${isoCode}` : '&country=us';
        apiUrl = `https://newsapi.org/v2/top-headlines?category=${HEADLINE_CATEGORIES[category]}${countryParam}&pageSize=100&apiKey=${NEWS_API_KEY}`;
      } else if (SEARCH_CATEGORIES[category]) {
        // Use everything endpoint for custom categories
        apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(SEARCH_CATEGORIES[category] + querySuffix)}&language=en&sortBy=publishedAt&pageSize=100&apiKey=${NEWS_API_KEY}`;
      } else {
        // Fallback: search by category name
        apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(category + querySuffix)}&language=en&sortBy=publishedAt&pageSize=100&apiKey=${NEWS_API_KEY}`;
      }

      const response = await fetch(apiUrl, { next: { revalidate: 300 } });
      data = await response.json();

      if (data.status === 'ok' && data.articles?.length > 0) {
        return NextResponse.json({
          success: true,
          articles: data.articles
            .filter((article: any) => article.title && article.title !== '[Removed]')
            .map((article: any) => ({
              id: article.url,
              title: article.title,
              description: article.description || '',
              url: article.url,
              image: article.urlToImage,
              publishedAt: article.publishedAt,
              source: article.source.name,
              category: category,
            })),
        });
      }
    } else if (source === 'gnews') {
      const gNewsCategory = HEADLINE_CATEGORIES[category] || 'general';
      const countryParam = isoCode ? `&country=${isoCode}` : '&country=us';
      const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?category=${gNewsCategory}${countryParam}&lang=en&max=100&apikey=${GNEWS_API_KEY}`,
        { next: { revalidate: 300 } }
      );
      data = await response.json();

      if (data.articles) {
        return NextResponse.json({
          success: true,
          articles: data.articles.map((article: any) => ({
            id: article.url,
            title: article.title,
            description: article.description || '',
            url: article.url,
            image: article.image,
            publishedAt: article.publishedAt,
            source: article.source.name,
            category: category,
          })),
        });
      }
    }

    // Fallback mock data
    return NextResponse.json({
      success: true,
      articles: getMockArticles(category),
    });

  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json({
      success: true,
      articles: getMockArticles(category),
    });
  }
}

// Mock data for development/fallback
function getMockArticles(category: string) {
  const baseMock = [
    {
      id: `${category}-1`,
      title: `Latest ${category.toUpperCase()} News: Breaking developments today`,
      description: `Stay updated with the latest happenings in the ${category} world. Major announcements and trends covered.`,
      url: '#',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      publishedAt: new Date().toISOString(),
      source: 'NewsHub',
      category,
    },
    {
      id: `${category}-2`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Industry Update: Key trends to watch`,
      description: `An in-depth look at the evolving landscape and what experts predict for the future.`,
      url: '#',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: 'TechWire',
      category,
    },
    {
      id: `${category}-3`,
      title: `Top Stories in ${category.charAt(0).toUpperCase() + category.slice(1)} This Week`,
      description: `A curated roundup of the most impactful stories and developments from the past week.`,
      url: '#',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: 'Daily Digest',
      category,
    },
  ];

  return baseMock;
}
