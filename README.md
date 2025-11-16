# Coaxx - Boutique Intimacy Shop

A fully static e-commerce website for Coaxx, a modern boutique intimacy store featuring curated products, collections, and discreet shopping experience. No build process, no server required - pure HTML, CSS, and vanilla JavaScript!

## 🚀 Quick Start

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/ataymia/coaxx.git
   cd coaxx
   ```

2. **Open in browser**
   - Simply open `index.html` in any modern web browser
   - Or use a local server for best experience:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (if you have http-server installed)
     npx http-server -p 8000
     ```
   - Visit `http://localhost:8000` in your browser

3. **That's it!** No installation, no dependencies, no build process needed.

## 📁 Structure

```
coaxx/
├── index.html          # Homepage with hero, collections, featured products
├── shop.html           # Product catalog with filters
├── product.html        # Product detail page
├── cart.html           # Shopping cart
├── checkout.html       # Checkout page
├── collections.html    # Featured collections page
├── deals.html          # Sale items
├── search.html         # Search results
├── about.html          # About Coaxx
├── admin.html          # Admin dashboard (password protected)
├── styles.css          # All styles with Coaxx branding
├── app.js              # Storefront logic (cart, products, filters)
├── admin.js            # Admin dashboard logic
├── products.json       # Product catalog (21 products across all categories)
└── [other pages]       # Additional content pages
```

## ✨ Features

### Brand & Positioning
- **Coaxx Brand** - Modern, sultry boutique intimacy shop
- **Woman-centered** - Inclusive to all genders and orientations
- **Privacy-first** - Discreet shipping, billing, and packaging
- **Body-safe** - Only premium, safe materials
- **Curated Collections** - Four signature collections for different comfort levels

### Storefront Features
- **Homepage** - Hero section, trust strip, featured collections, featured products
- **Product Catalog** - 21 curated intimacy products across 6 categories
- **Smart Filtering** - Filter by category, collection, experience level
- **Sale Pricing** - Automatic discount calculation and display
- **Collections** - Barely Proper, Pretty Ruthless, Femme Obscura, Noir Siren
- **Shopping Cart** - Persistent cart using localStorage as `coaxxCart`
- **External Checkout** - Support for Stripe Payment Links, PayPal, Cash App
- **Age Verification** - Age gate modal for adult content compliance

### Admin Dashboard (admin.html)
- **Password Protected** - Simple password gate (default: `coaxx2025`)
- **Product Management** - Add, edit, delete products with full form
- **Category & Collection Management** - Organize products
- **Draft System** - Save changes to localStorage before committing
- **JSON Export** - Download updated products.json for manual commit
- **Filters** - Search and filter products in admin view
- **No Backend Required** - Everything runs client-side

### Product Features
- **Experience Levels** - Beginner, Intermediate, Advanced tags
- **Material Safety** - Body-safe materials listed for each product
- **Care Instructions** - Proper care and maintenance notes
- **Size Options** - Inclusive sizing for lingerie
- **Subscription Products** - Monthly and quarterly subscription boxes
- **Bundle Products** - Curated kits and collections

### Design & UX
- **Color Palette** - Deep red (#dc2626), luminous gold (#d97706), charcoal (#374151)
- **Sultry Aesthetic** - Gradient backgrounds, elegant typography
- **Fully Responsive** - Mobile-first design
- **No Explicit Language** - Classy, sophisticated product descriptions
- **Toast Notifications** - User feedback for all actions

## 🛒 Shopping Flow

1. **Browse Products** - Start at homepage or go to shop page
2. **View Details** - Click on any product to see full details
3. **Add to Cart** - Use the cart button on product cards or detail page
4. **Review Cart** - Cart badge shows item count, click to review
5. **Checkout** - Proceed to checkout (demo only, no real payments)
6. **Success** - View order confirmation

## 💾 Data Storage

- **Cart**: Stored in `localStorage` as `coaxxCart`
- **Age Verification**: Stored in `localStorage` as `coaxx_age_confirmed`
- **Admin Login**: Stored in `localStorage` as `coaxxAdminLoggedIn`
- **Product Draft**: Stored in `localStorage` as `coaxxProductsDraft` (admin only)
- **Products**: Loaded from `products.json` file

All data persists across browser sessions but stays local to the device. No external database or backend required.

## 🎨 Customization

### Managing Products

#### Via Admin Dashboard (Recommended)
1. Navigate to `/admin.html` in your browser
2. Enter the admin password (default: `coaxx2025`)
3. Use the UI to add, edit, or delete products
4. Click "Save Draft" to save changes locally
5. Click "Download JSON" to download the updated `products.json`
6. Replace the `products.json` file in your repository
7. Commit and push the changes

#### Manually Editing products.json
Edit the `products.json` file directly:

```json
{
  "id": "unique-product-id",
  "name": "Product Name",
  "slug": "product-name",
  "category": "toys",
  "collections": ["Barely Proper", "Noir Siren"],
  "price": 79.00,
  "originalPrice": 99.00,
  "currency": "USD",
  "shortDescription": "Brief product description",
  "description": "Detailed product description",
  "experienceLevel": "Beginner",
  "intensityLevel": 2,
  "materials": ["Body-safe silicone", "ABS"],
  "features": ["Rechargeable", "Water-resistant"],
  "colors": ["Black", "Wine Red"],
  "sizesAvailable": [],
  "images": ["https://example.com/image.jpg"],
  "isFeatured": true,
  "isNew": true,
  "inStock": true,
  "tags": ["wand", "body-safe", "quiet"],
  "paymentLink": "https://buy.stripe.com/...",
  "subscription": false,
  "bundleItems": [],
  "careNotes": "Care instructions here"
}
```

### Changing Admin Password
Edit the password in `admin.js`:

```javascript
const ADMIN_PASSWORD = 'your-secure-password-here';
```

**Important**: Change this before deploying to production!

### Changing Brand Colors
Edit CSS variables in `styles.css`:

```css
:root {
  --primary: #dc2626;     /* Deep Red */
  --secondary: #d97706;   /* Luminous Gold */
  --accent: #374151;      /* Charcoal Grey */
}
```

### Changing Collections
The four collections are:
- **Barely Proper** - Softer, beginner-friendly
- **Pretty Ruthless** - Spicier, more bold
- **Femme Obscura** - Darker, luxe, advanced
- **Noir Siren** - Black-and-gold, sultry

Update collection names in:
1. Product data (collections array)
2. Collection filters in shop.html
3. Collection descriptions in app.js (`renderFeaturedCollections` function)

## 🔒 Privacy & Security

- **Age Verification** - Modal gate requiring 18+ confirmation
- **Discreet Packaging** - Plain packaging messaging throughout
- **Local Storage Only** - No data sent to external servers (except chosen payment processor)
- **No Tracking** - No analytics or third-party scripts by default
- **Static Content** - No server-side processing or databases
- **Password-Protected Admin** - Simple but effective admin authentication
- **No API Keys in Frontend** - Use external payment links (Stripe Payment Links, PayPal, etc.)

### Important Security Notes
1. **Change the admin password** in `admin.js` before deploying
2. **Never commit** real payment credentials to the repository
3. **Use HTTPS** when deploying (required for secure checkout)
4. **External payment links** keep your site secure - no sensitive data in frontend

## 🌐 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select branch (usually `main`)
4. Select root folder `/`
5. Save - your site will be live at `https://username.github.io/repo-name`

### Netlify
1. Drag and drop the folder to Netlify
2. Or connect your Git repository
3. No build command needed
4. Publish directory: `/` (root)

### Cloudflare Pages
1. Connect your Git repository
2. Build command: (leave empty)
3. Build output directory: `/`
4. Deploy

### Any Static Host
Simply upload all files to any static web hosting service:
- AWS S3 + CloudFront
- Vercel
- Surge
- Firebase Hosting
- Any traditional web hosting (upload via FTP)

## 📝 Important Notes

### About This Site
- **Adult Content**: This is an intimacy/adult products store. Age verification is required.
- **Static Architecture**: Everything runs client-side - no backend or database needed
- **Product Catalog**: 21 curated products included in `products.json`
- **Images**: Currently using Unsplash placeholder images - replace with actual product photos
- **Payment Processing**: Uses external payment links (Stripe Payment Links, PayPal, Cash App)
- **Admin Dashboard**: Client-side only - changes must be manually committed to git

### For Production Use
1. **Replace placeholder images** with actual product photography
2. **Update product data** with real inventory, descriptions, and pricing
3. **Set up payment links** in your Stripe/PayPal/Cash App account
4. **Change admin password** in `admin.js`
5. **Add real contact information** in contact.html
6. **Review and customize** privacy policy, terms of service, and shipping information
7. **Test checkout flow** thoroughly before going live
8. **Consider adding** email notifications via a service like Formspree for contact forms
9. **Set up SSL/HTTPS** (required for secure checkout)
10. **Consider age verification compliance** based on your jurisdiction

### Content Guidelines
- Product descriptions are **classy and informative**, never explicit
- Focus on **body safety**, materials, and experience level
- Emphasize **privacy and discretion** throughout
- Use **inclusive language** welcoming to all bodies and identities

## 🎯 Use Cases

- **Template** - Use as starting point for static e-commerce sites
- **Prototype** - Quick mockup for e-commerce concepts
- **Portfolio** - Showcase web development skills
- **Learning** - Study vanilla JavaScript, HTML, CSS
- **Demo** - Present e-commerce UI/UX concepts

## 📄 License

MIT License - feel free to use this for your own projects!

## 🤝 Contributing

This is a static template. Feel free to fork and customize for your needs.

## 💡 Tips

- Use browser DevTools to inspect and modify styles
- Check `main.js` for all interactive functionality
- All pages share the same header/footer HTML (manually maintained)
- Cart state persists in localStorage
- Mobile-first responsive design

---

**Enjoy your static e-commerce site! 🛍️**
