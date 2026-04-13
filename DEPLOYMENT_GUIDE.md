# 🌐 Deployment Guide

## Deploy to Vercel (Free - Recommended)

Vercel is the best platform for Next.js apps and offers generous free tier.

### Prerequisites
- GitHub account
- Your project pushed to GitHub
- API keys ready

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - NewsHub aggregator"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/news-aggregator.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and use your GitHub account
3. Click "New Project"
4. Import your `news-aggregator` repository
5. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 3: Add Environment Variables

In Vercel dashboard, before deploying:

1. Click "Environment Variables"
2. Add each variable:
   - Name: `NEWS_API_KEY`, Value: your NewsAPI key
   - Name: `WEATHER_API_KEY`, Value: your OpenWeather key
   - Name: `GNEWS_API_KEY`, Value: your GNews key (optional)

### Step 4: Deploy!

Click "Deploy" and wait 2-3 minutes.

Your site will be live at: `https://your-project-name.vercel.app`

### Automatic Deployments

Every time you push to GitHub, Vercel automatically deploys the changes!

---

## Deploy to Netlify (Alternative)

### Step 1: Build Settings

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

### Step 2: Environment Variables

1. Go to Site Settings → Environment Variables
2. Add your API keys

### Step 3: Deploy

Click "Deploy site"

---

## Self-Hosting (VPS/Linux Server)

### Requirements
- Ubuntu/Debian server
- Node.js 18+ installed
- Domain name (optional)

### Setup

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/news-aggregator.git
cd news-aggregator

# Install dependencies
npm install

# Create environment file
nano .env.local
# Add your API keys and save

# Build the project
npm run build

# Install PM2 for process management
npm install -g pm2

# Start the application
pm2 start npm --name "newshub" -- start

# Make it start on boot
pm2 startup
pm2 save
```

### Nginx Configuration (Optional - for domain)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Custom Domain Setup

### On Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records at your domain registrar:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

### SSL Certificate

Vercel automatically provides free SSL certificates!

---

## Performance Tips

1. **Enable Caching**
   - Already configured in API routes
   - News: 5 minutes cache
   - Weather: 30 minutes cache

2. **Image Optimization**
   - Next.js automatically optimizes images
   - Uses WebP format when supported

3. **Edge Functions**
   - Vercel deploys globally
   - Users get served from nearest location

---

## Monitoring

### Vercel Analytics

1. Go to your project
2. Click "Analytics" tab
3. View real-time traffic, performance

### Set Up Alerts

1. Project Settings → Notifications
2. Enable deployment notifications
3. Get email when deploys succeed/fail

---

## Updating Your Site

### Local Changes

```bash
# Make your changes
git add .
git commit -m "Update: description of changes"
git push origin main
```

Vercel automatically deploys the update!

### Manual Redeploy

In Vercel dashboard:
1. Go to Deployments
2. Click ⋯ on latest deployment
3. Click "Redeploy"

---

## Cost Breakdown

### Free Tier (Perfect for personal use)

**Vercel Free**
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Global CDN
- Analytics

**API Costs (All FREE)**
- NewsAPI: 100 requests/day
- OpenWeather: 1000 calls/day
- GNews: 100 requests/day

### Paid Options (If you scale)

**Vercel Pro** ($20/month)
- 1 TB bandwidth
- Advanced analytics
- Password protection

**API Upgrades**
- NewsAPI Business: $449/month (50,000 req/day)
- OpenWeather Startup: $40/month (60 calls/min)

---

## Troubleshooting Deployment

### Build Fails

1. Check build logs in Vercel
2. Verify all dependencies in package.json
3. Test build locally: `npm run build`

### Environment Variables Not Working

1. Make sure variable names match exactly
2. Redeploy after adding variables
3. Check they're set for "Production" environment

### 404 Errors

1. Verify file structure matches Next.js 14 app directory
2. Check that app/page.tsx exists
3. Clear Vercel cache and redeploy

---

## Security Best Practices

1. **Never commit .env files**
   - Already in .gitignore
   - Use Vercel environment variables

2. **API Key Rotation**
   - Regenerate keys every 3-6 months
   - Update in Vercel dashboard

3. **Rate Limiting**
   - Already implemented in API routes
   - Prevents abuse of your API keys

---

## Next Steps After Deployment

1. ✅ Share your site URL
2. ✅ Set up Google Analytics (optional)
3. ✅ Add to home screen on mobile
4. ✅ Monitor usage in Vercel dashboard
5. ✅ Collect user feedback

---

**Your news aggregator is now live! 🎉**
