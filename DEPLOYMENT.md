# Coaxx Store - Deployment Guide

## Overview
This deployment guide covers the setup and deployment of the revamped Coaxx store to Cloudflare Pages with D1 database and R2 storage.

## Prerequisites
- Node.js 18+
- Cloudflare account with Pages, Workers, D1, and R2 access
- Stripe account for payment processing

## Initial Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file for local development:
```bash
cp .env.example .env.local
```

Update with your credentials:
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLIC_KEY`: Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
- `ADMIN_PASSWORD_HASH`: Bcrypt hash of admin password
- `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN`: (Optional) Analytics token

### 3. Cloudflare D1 Database Setup

Create the D1 database:
```bash
npx wrangler d1 create coaxx-db
```

Update `wrangler.toml` with your database ID:
```toml
[[d1_databases]]
binding = "DB"
database_name = "coaxx-db"
database_id = "YOUR_DATABASE_ID_HERE"
```

Run the schema:
```bash
npx wrangler d1 execute coaxx-db --file=./schema.sql
```

Seed with demo data (optional):
```bash
npx wrangler d1 execute coaxx-db --file=./scripts/seed.sql
```

### 4. Cloudflare R2 Bucket Setup

Create the R2 bucket for images:
```bash
npx wrangler r2 bucket create coaxx-images
```

Make it publicly accessible (for product images):
```bash
npx wrangler r2 bucket public coaxx-images
```

### 5. Local Development

Run the development server:
```bash
npm run dev
```

Visit http://localhost:3000

## Deployment to Cloudflare Pages

### 1. Build for Production
```bash
npm run pages:build
```

### 2. Deploy
```bash
npm run pages:deploy
```

Or connect your GitHub repository to Cloudflare Pages for automatic deployments.

### 3. Set Environment Secrets

In Cloudflare Pages dashboard or via CLI:
```bash
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put ADMIN_PASSWORD_HASH
```

### 4. Configure Stripe Webhooks

1. In Stripe Dashboard, create a webhook endpoint pointing to:
   `https://your-site.pages.dev/api/webhook`

2. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`

3. Copy the webhook secret and add to your environment

## Post-Deployment Configuration

### Age Gate
The site includes an 18+ age gate that uses localStorage. First-time visitors must confirm they are 18+ to enter.

### Analytics
If using Cloudflare Web Analytics, add your token to the environment variables and it will be automatically integrated.

### Admin Access
Access the admin dashboard at `/admin`. Default demo credentials:
- Username: `admin`
- Password: `admin123` (⚠️ Change this immediately!)

To create a new admin password hash:
```bash
node -e "console.log(require('bcrypt').hashSync('your-password', 10))"
```

## Brand Customization

### Collections
The store features two main collections:
- **Barely Proper**: Delicate, subtle designs
- **Pretty Ruthless**: Bold, confident pieces

Update collection data in the database or seed script as needed.

### Hot Items Ticker
Edit `/components/HotItemsTicker.tsx` to customize featured hot items that scroll at the top of every page.

### Color Scheme
The brand uses:
- Primary: Red (#dc2626)
- Secondary: Gold/Amber (#d97706)
- Accent: Gray (#6b7280)

Customize in `/app/globals.css` if needed.

## Features Overview

### Customer-Facing
- ✅ Hot Items ticker (sitewide)
- ✅ Age gate modal (18+ verification)
- ✅ Product badges (New, Deal, Low Stock, Sold Out)
- ✅ Collections (Barely Proper, Pretty Ruthless, etc.)
- ✅ Enhanced product pages with specs/care/sizing
- ✅ Discreet shipping notifications
- ✅ Shopping cart with estimates
- ✅ Stripe checkout integration
- ✅ Order success with cross-sell
- ✅ Static pages (About, Contact, Privacy, Terms, Shipping)
- ✅ SEO optimization (Schema.org, breadcrumbs, meta tags)
- ✅ Mobile-first responsive design

### Admin Features
- Product CRUD operations
- Order management
- Basic authentication
- (Note: Collection management UI to be added)

### Technical
- Next.js 15 with App Router
- Cloudflare Pages + Workers
- D1 SQLite database
- R2 object storage
- Stripe payment processing
- TypeScript throughout
- Tailwind CSS for styling

## Monitoring

### Logs
View logs in Cloudflare Dashboard > Workers & Pages > Your Site > Logs

### Analytics
Enable Cloudflare Web Analytics for visitor tracking without cookies.

### Error Tracking
Consider integrating Sentry or similar for production error tracking.

## Security Notes

1. **Admin Password**: Change default admin password immediately
2. **Environment Variables**: Never commit .env files
3. **Stripe Keys**: Use test keys in development, live keys only in production
4. **HTTPS**: Cloudflare Pages provides automatic SSL
5. **Age Gate**: Required for adult-oriented content
6. **Data Privacy**: Privacy policy and terms are included

## Maintenance

### Updating Products
Use the admin dashboard at `/admin` or update directly in D1 database.

### Schema Migrations
If you modify `schema.sql`, apply changes:
```bash
npx wrangler d1 execute coaxx-db --file=./schema.sql
```

### Image Management
Upload images to R2 bucket and reference in product `image_url` field.

## Support

For issues or questions:
- Review the main README.md
- Check Cloudflare documentation
- Consult Next.js docs for framework questions
- Review Stripe integration docs for payment issues

## License
MIT License - see LICENSE file for details
