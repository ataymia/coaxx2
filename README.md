# Coaxx - Static E-Commerce Website

A fully static e-commerce website for premium lingerie and intimate apparel. No build process, no server required - just open `index.html` in your browser!

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
├── index.html          # Homepage
├── shop.html           # All products page
├── deals.html          # Special deals and discounts
├── collections.html    # Product collections
├── search.html         # Search results page
├── product.html        # Product detail page
├── cart.html           # Shopping cart
├── checkout.html       # Checkout page
├── success.html        # Order confirmation
├── about.html          # About us
├── contact.html        # Contact page
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── shipping.html       # Shipping information
├── styles.css          # All styles (Tailwind-inspired utilities)
├── main.js             # All JavaScript functionality
└── assets/             # Static assets (images, icons, etc.)
```

## ✨ Features

### Storefront
- **Homepage** - Hero section with featured content
- **Product Catalog** - Browse all products with filtering
- **Search** - Full-text search across products
- **Collections** - Browse by categories
- **Deals** - Special offers and discounted products
- **Product Details** - Comprehensive product pages
- **Shopping Cart** - Persistent cart using localStorage
- **Responsive Design** - Mobile-first, works on all devices

### Interactive Features
- **Age Gate** - Age verification modal (required for adult content)
- **Hot Items Ticker** - Animated banner showing deals
- **Cart Management** - Add, remove, update quantities
- **Toast Notifications** - User feedback for actions
- **Search Functionality** - Real-time product search
- **Mobile Menu** - Collapsible navigation for mobile

### Design & UX
- **Color Scheme** - Red (#dc2626), Gold/Amber (#d97706), Gray (#6b7280)
- **Responsive** - Optimized for desktop, tablet, and mobile
- **Accessible** - Semantic HTML, keyboard navigation
- **Fast Loading** - Pure HTML/CSS/JS, no framework overhead
- **Smooth Animations** - CSS transitions and keyframe animations

## 🛒 Shopping Flow

1. **Browse Products** - Start at homepage or go to shop page
2. **View Details** - Click on any product to see full details
3. **Add to Cart** - Use the cart button on product cards or detail page
4. **Review Cart** - Cart badge shows item count, click to review
5. **Checkout** - Proceed to checkout (demo only, no real payments)
6. **Success** - View order confirmation

## 💾 Data Storage

- **Cart**: Stored in `localStorage` as `coaxx-cart`
- **Age Verification**: Stored in `localStorage` as `coaxx_age_confirmed`
- **Products**: Static data in `main.js` (PRODUCTS array)

All data persists across browser sessions but stays local to the device.

## 🎨 Customization

### Adding Products
Edit the `PRODUCTS` array in `main.js`:

```javascript
const PRODUCTS = [
  {
    id: '1',
    name: 'Product Name',
    description: 'Product description',
    price: 99.99,
    sale_price: 79.99,  // Optional
    stock_quantity: 50,
    image_url: 'https://example.com/image.jpg',
    featured: true,  // Optional
  },
  // Add more products...
];
```

### Changing Colors
Edit CSS variables in `styles.css`:

```css
:root {
  --primary: #dc2626;     /* Red */
  --secondary: #d97706;   /* Gold/Amber */
  --accent: #6b7280;      /* Gray */
}
```

### Adding Pages
1. Copy an existing HTML file as template
2. Update the content between `<main>` tags
3. Keep header and footer consistent
4. Update navigation links if needed

## 🔒 Privacy & Security

- **Age Verification** - Modal gate requiring 18+ confirmation
- **Discreet Messaging** - Privacy-focused copy throughout
- **Local Storage Only** - No data sent to external servers
- **No Tracking** - No analytics or third-party scripts
- **Static Content** - No server-side processing or databases

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

## 📝 Notes

- This is a **demo/template** e-commerce site
- Checkout is for demonstration only (no real payment processing)
- Product images use Unsplash placeholder images
- All product data is static (no backend database)
- For production use, you'd need to integrate real payment processing and backend

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
