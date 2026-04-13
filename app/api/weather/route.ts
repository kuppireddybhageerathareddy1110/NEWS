import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'YOUR_OPENWEATHER_API_KEY';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locationCode = searchParams.get('locationCode') || 'global';

  // Map region codes to major cities for the weather API
  const cityMap: Record<string, string> = {
    global: 'London',
    in: 'Delhi',
    usa: 'New York',
    uk: 'London',
    au: 'Sydney',
    ca: 'Toronto'
  };

  const city = cityMap[locationCode] || 'London';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`,
      { next: { revalidate: 1800 } }
    );

    if (!response.ok) {
      throw new Error('Weather API failed');
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      weather: {
        city: data.name,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      },
    });
  } catch (error) {
    // Return mock weather data
    return NextResponse.json({
      success: true,
      weather: {
        city: city,
        temperature: 28,
        feelsLike: 30,
        description: 'partly cloudy',
        icon: '02d',
        humidity: 65,
        windSpeed: 12,
      },
    });
  }
}
