// Coaxx Storefront - Main Application Logic

// ===== GLOBAL STATE =====
let PRODUCTS = [];
let cart = null;

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

function calculateDiscountPercent(originalPrice, salePrice) {
  if (!originalPrice || originalPrice <= 0) return 0;
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return Math.round(discount);
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✓' : '✕';
  toast.innerHTML = `
    <span style="font-size: 1.5rem;">${icon}</span>
    <span class="toast-message">${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ===== CART MANAGEMENT =====
class CartStore {
  constructor() {
    this.items = this.loadCart();
    this.listeners = [];
  }

  loadCart() {
    const stored = localStorage.getItem('coaxxCart');
    return stored ? JSON.parse(stored) : [];
  }

  saveCart() {
    localStorage.setItem('coaxxCart', JSON.stringify(this.items));
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.items));
  }

  addItem(product, quantity = 1, variant = null) {
    const existingItem = this.items.find(item => 
      item.productId === product.id && 
      JSON.stringify(item.selectedVariant) === JSON.stringify(variant)
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ 
        productId: product.id,
        name: product.name,
        price: product.originalPrice && product.originalPrice > product.price ? product.price : product.price,
        quantity: quantity,
        selectedVariant: variant,
        image: product.images && product.images.length > 0 ? product.images[0] : null,
        collections: product.collections || []
      });
    }
    
    this.saveCart();
  }

  removeItem(productId, variant = null) {
    this.items = this.items.filter(item => 
      !(item.productId === productId && 
        JSON.stringify(item.selectedVariant) === JSON.stringify(variant))
    );
    this.saveCart();
  }

  updateQuantity(productId, quantity, variant = null) {
    if (quantity <= 0) {
      this.removeItem(productId, variant);
      return;
    }
    
    const item = this.items.find(item => 
      item.productId === productId && 
      JSON.stringify(item.selectedVariant) === JSON.stringify(variant)
    );
    if (item) {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

// ===== FETCH PRODUCTS =====
async function loadProducts() {
  try {
    const response = await fetch('products.json');
    if (!response.ok) throw new Error('Failed to load products');
    PRODUCTS = await response.json();
    return PRODUCTS;
  } catch (error) {
    console.error('Error loading products:', error);
    showToast('Failed to load products. Please refresh the page.', 'error');
    return [];
  }
}

// ===== AGE GATE =====
function initAgeGate() {
  const ageConfirmed = localStorage.getItem('coaxx_age_confirmed');
  const ageGate = document.getElementById('age-gate');
  
  if (!ageConfirmed && ageGate) {
    ageGate.classList.add('show');
    
    document.getElementById('age-confirm')?.addEventListener('click', () => {
      localStorage.setItem('coaxx_age_confirmed', 'true');
      ageGate.classList.remove('show');
    });
    
    document.getElementById('age-decline')?.addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      menuButton.innerHTML = isOpen 
        ? '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
        : '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
    });
  }
}

// ===== SEARCH =====
function initSearch() {
  const searchForms = document.querySelectorAll('.search-form');
  
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.search-input');
      const query = input.value.trim();
      
      if (query) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
      }
    });
  });
}

// ===== UPDATE CART BADGE =====
function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = cart ? cart.getItemCount() : 0;
  
  badges.forEach(badge => {
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  });
}

// ===== RENDER PRODUCT CARD =====
function renderProductCard(product) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const displayPrice = product.price;
  const discountPercent = hasDiscount 
    ? calculateDiscountPercent(product.originalPrice, product.price)
    : 0;
  
  const isLowStock = !product.subscription && product.inStock && product.stock_quantity && product.stock_quantity <= 10;
  const isSoldOut = !product.subscription && (!product.inStock || (product.stock_quantity !== undefined && product.stock_quantity <= 0));

  let badges = '';
  if (hasDiscount) {
    badges += `<span class="badge badge-deal">${discountPercent}% OFF</span>`;
  }
  if (product.isNew) {
    badges += `<span class="badge badge-new">NEW</span>`;
  }
  if (isLowStock && !isSoldOut) {
    badges += `<span class="badge badge-low-stock">LOW STOCK</span>`;
  }
  if (product.subscription) {
    badges += `<span class="badge badge-new">SUBSCRIPTION</span>`;
  }

  const soldOutOverlay = isSoldOut 
    ? `<div style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;">
         <span class="badge badge-sold-out" style="font-size: 1rem; padding: 0.5rem 1rem;">SOLD OUT</span>
       </div>`
    : '';
  
  // Collection chips
  const collectionChips = product.collections && product.collections.length > 0
    ? `<div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-bottom: 0.5rem;">
        ${product.collections.map(col => 
          `<span style="font-size: 0.65rem; padding: 0.125rem 0.375rem; background: #f3f4f6; color: #6b7280; border-radius: 0.25rem; text-transform: uppercase; font-weight: 600;">${col}</span>`
        ).join('')}
       </div>`
    : '';
  
  // Experience level tag
  const experienceTag = product.experienceLevel
    ? `<span style="font-size: 0.75rem; color: #6b7280; font-weight: 500;">${product.experienceLevel}</span>`
    : '';

  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : '';

  return `
    <a href="product.html?id=${product.id}" class="product-card">
      <div class="product-image-container">
        <img src="${imageUrl}" alt="${product.name}" class="product-image" loading="lazy" />
        ${badges ? `<div class="product-badges">${badges}</div>` : ''}
        ${soldOutOverlay}
      </div>
      <div class="product-info">
        ${collectionChips}
        <h3 class="product-name">${product.name}</h3>
        ${product.shortDescription ? `<p class="product-description">${product.shortDescription}</p>` : ''}
        ${experienceTag ? `<div style="margin-bottom: 0.5rem;">${experienceTag}</div>` : ''}
        <div class="product-footer">
          <div class="product-prices">
            ${hasDiscount ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
            <span class="price-current ${hasDiscount ? 'price-sale' : ''}">${formatPrice(displayPrice)}</span>
          </div>
          <button 
            class="add-to-cart-btn" 
            data-product-id="${product.id}"
            ${isSoldOut ? 'disabled' : ''}
            onclick="event.preventDefault(); event.stopPropagation(); handleQuickAdd('${product.id}');"
            aria-label="Quick add to cart"
            title="Quick add to cart"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>
    </a>
  `;
}

// ===== QUICK ADD TO CART =====
function handleQuickAdd(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  
  if (!product) {
    showToast('Product not found', 'error');
    return;
  }
  
  if (!product.subscription && (!product.inStock || (product.stock_quantity !== undefined && product.stock_quantity <= 0))) {
    showToast('Product is out of stock', 'error');
    return;
  }
  
  cart.addItem(product, 1);
  showToast('Added to cart!', 'success');
}

// Make handleQuickAdd globally available
window.handleQuickAdd = handleQuickAdd;

// ===== RENDER PRODUCT GRID =====
function renderProductGrid(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (products.length === 0) {
    container.innerHTML = '<p class="text-center" style="grid-column: 1/-1; padding: 3rem; color: #6b7280;">No products found.</p>';
    return;
  }
  
  container.innerHTML = products.map(renderProductCard).join('');
}

// ===== FILTER PRODUCTS =====
function filterProducts(category = null, collection = null, experienceLevel = null) {
  let filtered = [...PRODUCTS];
  
  if (category && category !== 'all') {
    if (category === 'sale') {
      filtered = filtered.filter(p => p.originalPrice && p.originalPrice > p.price);
    } else {
      filtered = filtered.filter(p => p.category === category);
    }
  }
  
  if (collection && collection !== 'all') {
    filtered = filtered.filter(p => p.collections && p.collections.includes(collection));
  }
  
  if (experienceLevel && experienceLevel !== 'all') {
    filtered = filtered.filter(p => p.experienceLevel === experienceLevel);
  }
  
  return filtered;
}

// ===== GET PRODUCT BY ID =====
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

// ===== RENDER FEATURED COLLECTIONS =====
function renderFeaturedCollections() {
  const container = document.getElementById('featured-collections');
  if (!container) return;
  
  const collections = [
    {
      name: 'Barely Proper',
      description: 'Softer, flirty vibes for beginners. Pretty, playful, and approachable.',
      image: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&h=600&fit=crop',
      color: '#fce7f3'
    },
    {
      name: 'Pretty Ruthless',
      description: 'Spicier and bolder. For those ready to explore with confidence.',
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&h=600&fit=crop',
      color: '#fee2e2'
    },
    {
      name: 'Femme Obscura',
      description: 'Darker, luxe, and sophisticated. For the experienced connoisseur.',
      image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800&h=600&fit=crop',
      color: '#f3f4f6'
    },
    {
      name: 'Noir Siren',
      description: 'Black-and-gold seduction. Sultry, polished, unforgettable.',
      image: 'https://images.unsplash.com/photo-1564281658-f1a1832ae53e?w=800&h=600&fit=crop',
      color: '#fef3c7'
    }
  ];
  
  container.innerHTML = collections.map(col => `
    <div class="collection-card" style="background: ${col.color}; padding: 2rem; border-radius: 0.5rem; cursor: pointer; transition: transform 0.2s;" onclick="window.location.href='shop.html?collection=${encodeURIComponent(col.name)}'">
      <div style="aspect-ratio: 4/3; border-radius: 0.5rem; overflow: hidden; margin-bottom: 1rem;">
        <img src="${col.image}" alt="${col.name}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">${col.name}</h3>
      <p style="color: #374151; font-size: 0.875rem; line-height: 1.5; margin-bottom: 1rem;">${col.description}</p>
      <button class="btn btn-outline" style="width: 100%;">View Collection</button>
    </div>
  `).join('');
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize cart
  cart = new CartStore();
  
  // Initialize components
  initAgeGate();
  initMobileMenu();
  initSearch();
  updateCartBadge();
  
  // Subscribe to cart changes
  cart.subscribe(() => {
    updateCartBadge();
  });
  
  // Load products
  await loadProducts();
  
  // Initialize page-specific functionality
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1);
  
  // Homepage
  if (filename === 'index.html' || filename === '') {
    // Render featured collections
    renderFeaturedCollections();
    
    // Render featured/new products
    const featuredProducts = PRODUCTS.filter(p => p.isFeatured || p.isNew).slice(0, 8);
    renderProductGrid(featuredProducts, 'featured-products');
  }
  
  // Shop page
  if (filename === 'shop.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    const collection = urlParams.get('collection') || null;
    const experienceLevel = urlParams.get('experience') || null;
    
    const filtered = filterProducts(category, collection, experienceLevel);
    renderProductGrid(filtered, 'product-grid');
    
    // Setup filters if they exist
    setupShopFilters();
  }
  
  // Collections page
  if (filename === 'collections.html') {
    renderFeaturedCollections();
  }
  
  // Deals page
  if (filename === 'deals.html') {
    const dealsProducts = PRODUCTS.filter(p => p.originalPrice && p.originalPrice > p.price);
    renderProductGrid(dealsProducts, 'product-grid');
  }
  
  // Search page
  if (filename === 'search.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';
    const searchInput = document.getElementById('search-query');
    
    if (searchInput) {
      searchInput.value = query;
    }
    
    if (query) {
      const results = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(query.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(query.toLowerCase())) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
      );
      
      const resultCount = document.getElementById('search-result-count');
      if (resultCount) {
        resultCount.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`;
      }
      
      renderProductGrid(results, 'product-grid');
    }
  }
  
  // Product detail page
  if (filename === 'product.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
      initProductPage(productId);
    }
  }
  
  // Cart page
  if (filename === 'cart.html') {
    initCartPage();
  }
});

// ===== SHOP FILTERS =====
function setupShopFilters() {
  const categoryButtons = document.querySelectorAll('[data-category]');
  const collectionSelect = document.getElementById('collection-filter');
  const experienceSelect = document.getElementById('experience-filter');
  
  if (categoryButtons.length > 0) {
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        const urlParams = new URLSearchParams(window.location.search);
        if (category === 'all') {
          urlParams.delete('category');
        } else {
          urlParams.set('category', category);
        }
        window.location.search = urlParams.toString();
      });
    });
  }
  
  if (collectionSelect) {
    collectionSelect.addEventListener('change', (e) => {
      const collection = e.target.value;
      const urlParams = new URLSearchParams(window.location.search);
      if (collection === 'all') {
        urlParams.delete('collection');
      } else {
        urlParams.set('collection', collection);
      }
      window.location.search = urlParams.toString();
    });
  }
  
  if (experienceSelect) {
    experienceSelect.addEventListener('change', (e) => {
      const experience = e.target.value;
      const urlParams = new URLSearchParams(window.location.search);
      if (experience === 'all') {
        urlParams.delete('experience');
      } else {
        urlParams.set('experience', experience);
      }
      window.location.search = urlParams.toString();
    });
  }
}

// ===== PRODUCT PAGE INITIALIZATION =====
function initProductPage(productId) {
  const product = getProductById(productId);
  
  if (!product) {
    const container = document.getElementById('product-container');
    if (container) {
      container.innerHTML = '<p class="text-center" style="padding: 3rem;">Product not found.</p>';
    }
    return;
  }
  
  // Update page title
  document.title = `${product.name} - Coaxx`;
  
  // Set product details
  const nameEl = document.getElementById('product-name');
  const descEl = document.getElementById('product-description');
  const shortDescEl = document.getElementById('product-short-description');
  
  if (nameEl) nameEl.textContent = product.name;
  if (shortDescEl) shortDescEl.textContent = product.shortDescription || '';
  if (descEl) descEl.textContent = product.description || '';
  
  // Set collections
  const collectionsContainer = document.getElementById('product-collections');
  if (collectionsContainer && product.collections && product.collections.length > 0) {
    collectionsContainer.innerHTML = product.collections.map(col => 
      `<span style="font-size: 0.75rem; padding: 0.25rem 0.75rem; background: linear-gradient(135deg, #dc2626, #d97706); color: white; border-radius: 9999px; text-transform: uppercase; font-weight: 600;">${col}</span>`
    ).join('');
  }
  
  // Set prices
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const displayPrice = product.price;
  
  const priceEl = document.getElementById('product-price');
  const originalPriceEl = document.getElementById('product-original-price');
  const discountBadge = document.getElementById('product-discount-badge');
  
  if (priceEl) {
    priceEl.textContent = formatPrice(displayPrice);
    if (hasDiscount) priceEl.classList.add('price-sale');
  }
  
  if (originalPriceEl && hasDiscount) {
    originalPriceEl.textContent = formatPrice(product.originalPrice);
    originalPriceEl.style.display = 'inline';
  }
  
  if (discountBadge && hasDiscount) {
    const discountPercent = calculateDiscountPercent(product.originalPrice, product.price);
    discountBadge.textContent = `${discountPercent}% OFF`;
    discountBadge.style.display = 'block';
  }
  
  // Set experience level
  const experienceContainer = document.getElementById('experience-level-container');
  if (experienceContainer && product.experienceLevel) {
    experienceContainer.innerHTML = `
      <div style="background: #f3f4f6; padding: 0.75rem 1rem; border-radius: 0.5rem; display: inline-block;">
        <span style="font-weight: 600; color: #374151;">Experience Level:</span>
        <span style="color: #111827; font-weight: 600; margin-left: 0.5rem;">${product.experienceLevel}</span>
      </div>
    `;
  }
  
  // Set materials
  const materialsContainer = document.getElementById('materials-container');
  if (materialsContainer && product.materials && product.materials.length > 0) {
    materialsContainer.innerHTML = `
      <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;">Materials</h3>
      <p style="color: #374151;">${product.materials.join(', ')}</p>
    `;
  }
  
  // Set features
  const featuresContainer = document.getElementById('features-container');
  if (featuresContainer && product.features && product.features.length > 0) {
    featuresContainer.innerHTML = `
      <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;">Features</h3>
      <ul style="display: flex; flex-direction: column; gap: 0.5rem; color: #374151;">
        ${product.features.map(feat => `<li style="display: flex; align-items: center; gap: 0.5rem;"><span style="color: #dc2626;">✓</span> ${feat}</li>`).join('')}
      </ul>
    `;
  }
  
  // Set colors/sizes
  const variantsContainer = document.getElementById('variants-container');
  if (variantsContainer) {
    let variantsHTML = '';
    
    if (product.colors && product.colors.length > 0) {
      variantsHTML += `
        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Colors Available:</label>
          <p style="color: #111827;">${product.colors.join(', ')}</p>
        </div>
      `;
    }
    
    if (product.sizesAvailable && product.sizesAvailable.length > 0) {
      variantsHTML += `
        <div>
          <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Sizes Available:</label>
          <p style="color: #111827;">${product.sizesAvailable.join(', ')}</p>
        </div>
      `;
    }
    
    variantsContainer.innerHTML = variantsHTML;
  }
  
  // Set care notes
  const careContainer = document.getElementById('care-notes-container');
  if (careContainer && product.careNotes) {
    careContainer.innerHTML = `
      <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;">Care & Maintenance</h3>
      <p style="color: #374151; line-height: 1.75;">${product.careNotes}</p>
    `;
  }
  
  // Set main image
  const mainImage = document.getElementById('product-main-image');
  if (mainImage && product.images && product.images.length > 0) {
    mainImage.src = product.images[0];
    mainImage.alt = product.name;
  }
  
  // Add to cart handler
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    const isSoldOut = !product.subscription && (!product.inStock || (product.stock_quantity !== undefined && product.stock_quantity <= 0));
    
    addToCartBtn.disabled = isSoldOut;
    addToCartBtn.addEventListener('click', () => {
      if (isSoldOut) {
        showToast('Product is out of stock', 'error');
        return;
      }
      
      cart.addItem(product, 1);
      showToast('Added to cart!', 'success');
    });
  }
  
  // Handle payment link
  const checkoutBtn = document.getElementById('direct-checkout-btn');
  if (checkoutBtn && product.paymentLink) {
    checkoutBtn.style.display = 'inline-flex';
    checkoutBtn.addEventListener('click', () => {
      window.open(product.paymentLink, '_blank');
    });
  }
}

// ===== CART PAGE INITIALIZATION =====
function initCartPage() {
  function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');
    
    if (!cart || cart.items.length === 0) {
      if (emptyCart) emptyCart.style.display = 'block';
      if (cartContent) cartContent.style.display = 'none';
      return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartContent) cartContent.style.display = 'block';
    
    if (cartContainer) {
      cartContainer.innerHTML = cart.items.map(item => {
        const product = getProductById(item.productId);
        const itemTotal = item.price * item.quantity;
        
        // Collection chips
        const collectionChips = item.collections && item.collections.length > 0
          ? `<div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.25rem;">
              ${item.collections.map(col => 
                `<span style="font-size: 0.65rem; padding: 0.125rem 0.375rem; background: #f3f4f6; color: #6b7280; border-radius: 0.25rem;">${col}</span>`
              ).join('')}
             </div>`
          : '';
        
        return `
          <div class="cart-item" style="padding: 1.5rem; border-bottom: 1px solid #e5e7eb; display: flex; gap: 1.5rem;">
            <div style="width: 96px; height: 96px; background: #f3f4f6; border-radius: 0.5rem; overflow: hidden; flex-shrink: 0;">
              ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" />` : ''}
            </div>
            <div style="flex: 1;">
              <a href="product.html?id=${item.productId}" style="font-size: 1.125rem; font-weight: 600; color: #111827; text-decoration: none;">
                ${item.name}
              </a>
              ${collectionChips}
              <div style="margin-top: 0.5rem;">
                <span style="font-size: 1.125rem; font-weight: bold; color: #111827;">${formatPrice(item.price)}</span>
              </div>
              <div style="margin-top: 1rem; display: flex; align-items: center; gap: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <button onclick="updateCartQuantity('${item.productId}', ${item.quantity - 1})" style="padding: 0.25rem; border: 1px solid #d1d5db; border-radius: 0.25rem; background: white;" ${item.quantity <= 1 ? 'disabled' : ''}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
                  </button>
                  <span style="width: 3rem; text-align: center; font-weight: 500;">${item.quantity}</span>
                  <button onclick="updateCartQuantity('${item.productId}', ${item.quantity + 1})" style="padding: 0.25rem; border: 1px solid #d1d5db; border-radius: 0.25rem; background: white;" ${product && product.stock_quantity && item.quantity >= product.stock_quantity ? 'disabled' : ''}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  </button>
                </div>
                <button onclick="removeFromCart('${item.productId}')" style="color: #dc2626; display: flex; align-items: center; gap: 0.25rem; font-size: 0.875rem; background: none; border: none; cursor: pointer;">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  Remove
                </button>
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 1.25rem; font-weight: bold; color: #111827;">
                ${formatPrice(itemTotal)}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
    
    // Update summary
    const subtotal = cart.getTotal();
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingEl = document.getElementById('cart-shipping');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    if (taxEl) taxEl.textContent = formatPrice(tax);
    if (totalEl) totalEl.textContent = formatPrice(total);
  }
  
  // Initial render
  renderCart();
  
  // Subscribe to cart changes
  if (cart) {
    cart.subscribe(renderCart);
  }
  
  // Make functions globally available
  window.updateCartQuantity = (productId, quantity) => {
    if (cart) cart.updateQuantity(productId, quantity);
  };
  
  window.removeFromCart = (productId) => {
    if (cart) {
      cart.removeItem(productId);
      showToast('Item removed from cart', 'success');
    }
  };
}

// Export for use in other pages
window.cart = cart;
window.PRODUCTS = PRODUCTS;
window.formatPrice = formatPrice;
window.showToast = showToast;
window.getProductById = getProductById;
