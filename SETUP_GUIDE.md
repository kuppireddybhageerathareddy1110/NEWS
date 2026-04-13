# 🚀 Quick Setup Guide

## Step-by-Step Instructions

### 1. Install Node.js (if not already installed)
- Download from: https://nodejs.org/
- Get the LTS version (Long Term Support)
- Verify installation: Open terminal and run `node --version`

### 2. Get Your Free API Keys

#### NewsAPI (5 minutes)
1. Visit: https://newsapi.org
2. Click "Get API Key"
3. Fill in:
   - First Name
   - Email
   - Password
4. Verify your email
5. Copy your API key from the dashboard

#### OpenWeather API (5 minutes)
1. Visit: https://openweathermap.org/api
2. Click "Sign Up"
3. Create account
4. Check your email and click verification link
5. Go to: https://home.openweathermap.org/api_keys
6. Copy the "Key" shown (it's auto-generated)

### 3. Set Up the Project

Open Terminal/Command Prompt and run:

```bash
# Navigate to the project folder
cd news-aggregator

# Install all dependencies (this takes 2-3 minutes)
npm install

# Create your environment file
cp .env.example .env.local
```

### 4. Add Your API Keys

Open the file `.env.local` (created in step 3) and replace with your actual keys:

```env
NEWS_API_KEY=paste_your_newsapi_key_here
WEATHER_API_KEY=paste_your_openweather_key_here
```

**Important**: Remove any quotes or extra spaces

### 5. Start the Application

```bash
npm run dev
```

Wait for the message: `Ready in X seconds` or `Local: http://localhost:3000`

### 6. Open in Browser

Go to: http://localhost:3000

You should see your news aggregator! 🎉

## Troubleshooting

### "Command not found: npm"
- Node.js is not installed. Go back to Step 1

### "Failed to fetch news"
- Check your NEWS_API_KEY in .env.local
- Make sure there are no spaces or quotes
- Verify the key works at: https://newsapi.org/account

### "Port 3000 already in use"
- Another app is using port 3000
- Either close that app, or run: `npm run dev -- -p 3001`
- Then visit: http://localhost:3001

### Weather not loading
- Check WEATHER_API_KEY in .env.local
- OpenWeather API takes 10-15 minutes to activate after signup
- Wait a bit and refresh

### Dependencies installation fails
- Delete `node_modules` folder
- Delete `package-lock.json` file
- Run `npm install` again

## Daily Usage

### Start the app:
```bash
npm run dev
```

### Stop the app:
Press `Ctrl + C` in the terminal

### Update news:
Click the "Refresh" button in the app

## Free Tier Limits

- **NewsAPI**: 100 requests/day (plenty for personal use)
- **OpenWeather**: 1000 calls/day
- **GNews** (optional): 100 requests/day

Each page load counts as 1-2 requests. The app caches data to minimize API calls.

## Next Steps

1. Customize categories in `components/Header.tsx`
2. Change weather city in `components/WeatherWidget.tsx`
3. Add your own styling in `tailwind.config.js`
4. Deploy to Vercel for free hosting (see README.md)

## Getting Help

- Check the full README.md for detailed documentation
- Verify all environment variables are set correctly
- Make sure you're using Node.js version 18 or higher
- Check that API keys are active (not expired)

---

Happy coding! 🚀
