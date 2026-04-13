'use client';

import { TrendingUp } from 'lucide-react';

const trendingTopics = [
  { id: 1, topic: 'AI Revolution', count: '2.5k articles', trend: '+15%' },
  { id: 2, topic: 'UPSC 2026 Changes', count: '1.2k articles', trend: '+8%' },
  { id: 3, topic: 'Market Rally', count: '980 articles', trend: '+12%' },
  { id: 4, topic: 'Climate Summit', count: '750 articles', trend: '+5%' },
  { id: 5, topic: 'Tech Layoffs', count: '620 articles', trend: '-3%' },
];

export default function TrendingTopics() {
  return (
    <div className="anthropic-card p-6">
      <div className="flex items-center space-x-2 mb-5">
        <TrendingUp className="w-4 h-4 text-accent" />
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Trending Now
        </h2>
      </div>

      <div className="space-y-1">
        {trendingTopics.map((item, index) => (
          <div
            key={item.id}
            className="group flex items-center justify-between p-3 rounded-xl hover:bg-surface transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <span className="text-lg font-display text-text-muted/40 group-hover:text-accent/60 transition-colors w-6 text-center shrink-0">
                {index + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-medium text-sm text-text-primary group-hover:text-accent transition-colors truncate">
                  {item.topic}
                </h3>
                <p className="text-xs text-text-muted">{item.count}</p>
              </div>
            </div>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-md shrink-0 ${
                item.trend.startsWith('+')
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-red-600 bg-red-50'
              }`}
            >
              {item.trend}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
