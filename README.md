# 📰 NewsHub - Personalized News Aggregator

A modern, full-stack news aggregation platform built with Next.js 14, designed specifically for tech enthusiasts, engineers, and UPSC/government job aspirants.

![NewsHub](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### Core Functionality
- 📱 **Multi-Category News**: Tech, AI/LLMs, Stock Market, Science, International Affairs, UPSC/Govt Jobs
- 🔄 **Real-time Updates**: Auto-refresh news every 5-15 minutes
- 🔍 **Smart Search**: Filter articles by keywords across all categories
- 🌤️ **Weather Widget**: Live weather updates for your location
- 📈 **Trending Topics**: Track what's hot in the news
- 🔖 **Bookmarks**: Save articles for later reading
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### Technical Features
- ⚡ **Server-Side Rendering**: Blazing fast page loads with Next.js 14
- 🎨 **Modern UI**: Custom-designed interface with Tailwind CSS
- 🌙 **Dark Theme**: Easy on the eyes for long reading sessions
- 🔄 **API Caching**: Smart caching reduces API calls and improves performance
- 🎯 **TypeScript**: Type-safe code for better development experience

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- API keys (free tier works great):
  - [NewsAPI](https://newsapi.org) - For news articles
  - [OpenWeather](https://openweathermap.org/api) - For weather data
  - [GNews](https://gnews.io) (optional) - Alternative news source

### Installation

1. **Clone or download the project**
```bash
cd news-aggregator
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Add your API keys to `.env.local`**
```env
NEWS_API_KEY=your_newsapi_key_here
WEATHER_API_KEY=your_openweather_key_here
GNEWS_API_KEY=your_gnews_key_here (optional)
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Get API Keys

### NewsAPI (Required)
1. Go to [newsapi.org](https://newsapi.org)
2. Click "Get API Key"
3. Sign up with your email
4. Copy your API key
5. Free tier: 100 requests/day, perfect for personal use

### OpenWeather API (Required for weather)
1. Go to [openweathermap.org](https://openweathermap.org/api)
2. Click "Sign Up"
3. Verify your email
4. Go to API Keys section
5. Copy your default API key
6. Free tier: 1000 calls/day

### GNews (Optional)
1. Go to [gnews.io](https://gnews.io)
2. Sign up for free account
3. Get your API key from dashboard
4. Free tier: 100 requests/day

## 📁 Project Structure

```
news-aggregator/
├── app/
│   ├── api/
│   │   ├── news/
│   │   │   └── route.ts        # News API endpoint
│   │   └── weather/
│   │       └── route.ts        # Weather API endpoint
│   ├── layout.tsx              # Root layout with fonts
│   ├── page.tsx                # Main homepage
│   └── globals.css             # Global styles
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── NewsCard.tsx            # Individual news card
│   ├── WeatherWidget.tsx       # Weather display
│   ├── TrendingTopics.tsx      # Trending section
│   └── LoadingSpinner.tsx      # Loading indicator
├── public/                     # Static assets
├── .env.example                # Environment template
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind configuration
└── package.json                # Dependencies
```

## 🎨 Customization

### Changing Categories
Edit the categories array in `components/Header.tsx`:
```typescript
const categories = [
  { id: 'technology', label: 'Tech & AI', icon: '🚀' },
  { id: 'business', label: 'Stock Market', icon: '📈' },
  // Add your own categories
];
```

### Changing Weather Location
Update the city parameter in `components/WeatherWidget.tsx`:
```typescript
const response = await fetch('/api/weather?city=YourCity');
```

### Styling
All colors and styles are defined in `tailwind.config.js` and can be easily customized:
```javascript
colors: {
  primary: '#0A0E27',      // Dark background
  accent: '#00D9FF',       // Cyan accent
  'accent-warm': '#FF6B35', // Orange accent
}
```

## 📊 API Endpoints

### GET /api/news
Fetches news articles
- **Query Params**: 
  - `category`: technology, business, science, general
  - `source`: newsapi, gnews
- **Response**: Array of article objects

### GET /api/weather
Fetches weather data
- **Query Params**: 
  - `city`: City name (default: Delhi)
- **Response**: Weather object with temperature, conditions, etc.

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Environment Variables on Vercel
Add these in Project Settings → Environment Variables:
- `NEWS_API_KEY`
- `WEATHER_API_KEY`
- `GNEWS_API_KEY` (optional)

## 🔧 Advanced Features to Add

### Phase 1 (Easy)
- [ ] Add more news categories
- [ ] Implement article bookmarking with localStorage
- [ ] Add dark/light theme toggle
- [ ] Email newsletter subscription

### Phase 2 (Intermediate)
- [ ] User authentication (NextAuth.js)
- [ ] Personal dashboard
- [ ] Save reading preferences
- [ ] Stock market widget with live prices

### Phase 3 (Advanced)
- [ ] AI-powered article summarization
- [ ] Sentiment analysis
- [ ] Personalized feed based on reading history
- [ ] Push notifications for breaking news
- [ ] Database integration (PostgreSQL/MongoDB)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom animations
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **HTTP Client**: Axios
- **Deployment**: Vercel (recommended)

## 📝 Notes for UPSC Aspirants

This platform is specifically designed with your needs in mind:
- **Current Affairs**: Stay updated with latest news
- **International Relations**: Track global events
- **Science & Tech**: Understand technological developments
- **Economy**: Follow market trends and policies
- **Government Jobs**: Get notifications about new opportunities

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

This project is open source and available for personal and educational use.

## 🙏 Credits

- News data: NewsAPI, GNews
- Weather data: OpenWeather
- Icons: Lucide React
- Built with Next.js and Tailwind CSS

## 📞 Support

If you encounter any issues:
1. Check that all API keys are correctly set
2. Ensure you're using Node.js 18+
3. Try clearing the `.next` folder and rebuilding
4. Check API rate limits (free tiers have daily limits)

---

**Made with ❤️ for engineers, tech enthusiasts, and UPSC aspirants**
