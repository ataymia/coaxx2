# Coaxx - Premium Ecommerce Platform

A modern, sleek ecommerce site built with Next.js, deployed on Cloudflare Pages + Workers, featuring D1 database, R2 storage, and Stripe integration.

## Features

### Storefront
- 🏠 **Homepage** - Hero section with featured products and call-to-actions
- 🛍️ **Shop** - Product grid with filtering and search capabilities
- 🔍 **Search** - Full-text search across products
- 🏷️ **Collections** - Browse products by categories/tags
- 💰 **Deals** - Special offers and discounted products
- 📦 **Product Detail** - Comprehensive product pages with image galleries
- 🛒 **Shopping Cart** - Persistent cart with quantity management
- 💳 **Checkout** - Secure checkout with Stripe integration
- ✅ **Success Page** - Order confirmation with product recommendations

### Design & UX
- 🎨 **Coaxx Theme** - Red, gold, and gray color scheme
- 📱 **Mobile-First** - Responsive design optimized for all devices
- ♿ **Accessible** - WCAG compliance with semantic HTML
- ⚡ **Fast** - Optimized performance with Next.js
- 🔍 **SEO-Friendly** - Meta tags and structured data ready

### Admin Dashboard
- 📊 **Dashboard** - Overview of products, orders, and revenue
- 📦 **Product Management** - CRUD operations for products
- 🏷️ **Tag Management** - Create and manage product categories
- 📋 **Order Management** - View and manage customer orders
- 🔐 **Admin Authentication** - Secure admin access

### Technical Features
- ⚙️ **D1 Database** - SQL database for products, orders, and more
- 🖼️ **R2 Storage** - Image hosting with Cloudflare R2
- 💳 **Stripe Integration** - Secure payment processing
- 🪝 **Webhooks** - Automated stock management and email receipts
- 🔒 **Security** - Environment variables for sensitive data

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Cloudflare Pages + Workers
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2
- **Payments**: Stripe
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Cloudflare account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ataymia/coaxx2.git
   cd coaxx2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   ```

4. **Set up Cloudflare D1 Database**
   ```bash
   # Create D1 database
   npx wrangler d1 create coaxx-db
   
   # Update wrangler.toml with database ID
   # Run migrations
   npx wrangler d1 execute coaxx-db --file=./schema.sql
   ```

5. **Set up Cloudflare R2 Bucket**
   ```bash
   npx wrangler r2 bucket create coaxx-images
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

7. **Open browser**
   Navigate to http://localhost:3000

## Deployment

### Deploy to Cloudflare Pages

1. **Build for production**
   ```bash
   npm run pages:build
   ```

2. **Deploy to Cloudflare Pages**
   ```bash
   npm run pages:deploy
   ```

3. **Set environment secrets**
   ```bash
   npx wrangler secret put STRIPE_SECRET_KEY
   npx wrangler secret put ADMIN_PASSWORD_HASH
   ```

## Project Structure

```
coaxx2/
├── app/                    # Next.js app directory
│   ├── shop/              # Storefront pages
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities and helpers
├── types/                 # TypeScript types
├── schema.sql            # Database schema
└── wrangler.toml         # Cloudflare configuration
```

## Key Features

### Price Display
- Original prices shown with strikethrough
- Sale prices displayed in red
- Automatic discount percentage calculation

### Shopping Cart
- Persistent cart using Zustand + localStorage
- Quantity management
- Real-time total calculation

### Checkout Flow
1. Cart → Checkout form
2. Stripe payment session
3. Webhook processes payment
4. Stock decremented
5. Success page with recommendations

## License

MIT License
