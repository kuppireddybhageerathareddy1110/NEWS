'use client';

import { useEffect, useState } from 'react';
import { Cloud, Droplets, Wind, Sun } from 'lucide-react';

interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

interface WeatherWidgetProps {
  locationCode?: string;
}

export default function WeatherWidget({ locationCode = 'global' }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`/api/weather?locationCode=${locationCode}`);
        const data = await res.json();
        if (data.success) {
          setWeather(data.weather);
        }
      } catch (error) {
        console.error('Weather fetching error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [locationCode]);

  if (loading) {
    return (
      <div className="anthropic-card p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-surface rounded-lg w-20" />
          <div className="h-8 bg-surface rounded-lg w-24" />
          <div className="h-3 bg-surface rounded-lg w-32" />
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="anthropic-card p-6 bg-gradient-to-br from-accent-subtle via-white to-accent-light/30">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Sun className="w-4 h-4 text-accent" />
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Weather</h3>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-display text-text-primary">
              {weather.temperature}°C
            </p>
            <p className="text-sm font-medium text-text-secondary">{weather.city}</p>
            <p className="text-xs text-text-muted capitalize">
              {weather.description}
            </p>
          </div>
        </div>

        <div className="text-right space-y-3">
          <div className="text-xs text-text-muted">
            Feels{' '}
            <span className="text-text-primary font-semibold">
              {weather.feelsLike}°C
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-end space-x-1.5 text-xs">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-text-muted">{weather.humidity}%</span>
            </div>
            <div className="flex items-center justify-end space-x-1.5 text-xs">
              <Wind className="w-3.5 h-3.5 text-text-muted" />
              <span className="text-text-muted">{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
