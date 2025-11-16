// Coaxx Static Website - Main JavaScript

// ===== PRODUCT DATA =====
const PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    sale_price: 199.99,
    stock_quantity: 50,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
    ],
    featured: true,
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Latest smartwatch with health tracking and GPS',
    price: 399.99,
    stock_quantity: 30,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    featured: true,
  },
  {
    id: '3',
    name: 'Designer Sunglasses',
    description: 'Stylish sunglasses with UV protection',
    price: 159.99,
    sale_price: 99.99,
    stock_quantity: 100,
    image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
  },
  {
    id: '4',
    name: 'Leather Messenger Bag',
    description: 'Handcrafted genuine leather bag',
    price: 249.99,
    stock_quantity: 20,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
  },
  {
    id: '5',
    name: 'Wireless Keyboard',
    description: 'Mechanical keyboard with RGB lighting',
    price: 149.99,
    sale_price: 119.99,
    stock_quantity: 75,
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
  },
  {
    id: '6',
    name: 'Portable Speaker',
    description: 'Waterproof Bluetooth speaker',
    price: 89.99,
    stock_quantity: 120,
    image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
  },
];

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

function calculateDiscountPercent(originalPrice, salePrice) {
  if (originalPrice <= 0) return 0;
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return Math.round(discount);
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) {
    const newContainer = document.createElement('div');
    newContainer.id = 'toast-container';
    newContainer.className = 'toast-container';
    document.body.appendChild(newContainer);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✓' : '✕';
  toast.innerHTML = `
    <span style="font-size: 1.5rem;">${icon}</span>
    <span class="toast-message">${message}</span>
  `;
  
  document.getElementById('toast-container').appendChild(toast);
  
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
    const stored = localStorage.getItem('coaxx-cart');
    return stored ? JSON.parse(stored) : [];
  }

  saveCart() {
    localStorage.setItem('coaxx-cart', JSON.stringify(this.items));
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

  addItem(product) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    
    this.saveCart();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    
    const item = this.items.find(item => item.product.id === productId);
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
    return this.items.reduce((sum, item) => {
      const price = item.product.sale_price ?? item.product.price;
      return sum + price * item.quantity;
    }, 0);
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

// Global cart instance
const cart = new CartStore();

// ===== AGE GATE =====
function initAgeGate() {
  const ageConfirmed = localStorage.getItem('coaxx_age_confirmed');
  const ageGate = document.getElementById('age-gate');
  
  if (!ageConfirmed && ageGate) {
    ageGate.classList.add('show');
    
    document.getElementById('age-confirm').addEventListener('click', () => {
      localStorage.setItem('coaxx_age_confirmed', 'true');
      ageGate.classList.remove('show');
    });
    
    document.getElementById('age-decline').addEventListener('click', () => {
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
        ? '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
        : '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
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
  const count = cart.getItemCount();
  
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
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const displayPrice = product.sale_price ?? product.price;
  const discountPercent = hasDiscount 
    ? calculateDiscountPercent(product.price, product.sale_price)
    : 0;
  
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 10;
  const isSoldOut = product.stock_quantity <= 0;

  let badges = '';
  if (hasDiscount) {
    badges += `<span class="badge badge-deal">${discountPercent}% OFF</span>`;
  }
  if (isLowStock && !isSoldOut) {
    badges += `<span class="badge badge-low-stock">LOW STOCK</span>`;
  }

  const soldOutOverlay = isSoldOut 
    ? `<div style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;">
         <span class="badge badge-sold-out" style="font-size: 1rem; padding: 0.5rem 1rem;">SOLD OUT</span>
       </div>`
    : '';

  return `
    <a href="product.html?id=${product.id}" class="product-card">
      <div class="product-image-container">
        <img src="${product.image_url || ''}" alt="${product.name}" class="product-image" loading="lazy" />
        ${badges ? `<div class="product-badges">${badges}</div>` : ''}
        ${soldOutOverlay}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
        <div class="product-footer">
          <div class="product-prices">
            ${hasDiscount ? `<span class="price-original">${formatPrice(product.price)}</span>` : ''}
            <span class="price-current ${hasDiscount ? 'price-sale' : ''}">${formatPrice(displayPrice)}</span>
          </div>
          <button 
            class="add-to-cart-btn" 
            data-product-id="${product.id}"
            ${isSoldOut ? 'disabled' : ''}
            onclick="event.preventDefault(); event.stopPropagation(); handleQuickAdd('${product.id}');"
            aria-label="Quick add to cart"
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
  
  if (product.stock_quantity <= 0) {
    showToast('Product is out of stock', 'error');
    return;
  }
  
  cart.addItem(product);
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

// ===== GET PRODUCT BY ID =====
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initAgeGate();
  initMobileMenu();
  initSearch();
  updateCartBadge();
  
  // Subscribe to cart changes
  cart.subscribe(() => {
    updateCartBadge();
  });
  
  // Initialize page-specific functionality
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1);
  
  // Shop page
  if (filename === 'shop.html' || filename === '') {
    renderProductGrid(PRODUCTS, 'product-grid');
  }
  
  // Deals page
  if (filename === 'deals.html') {
    const dealsProducts = PRODUCTS.filter(p => p.sale_price && p.sale_price < p.price);
    renderProductGrid(dealsProducts, 'product-grid');
  }
  
  // Collections page
  if (filename === 'collections.html') {
    renderProductGrid(PRODUCTS, 'product-grid');
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
        (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
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

// ===== PRODUCT PAGE INITIALIZATION =====
function initProductPage(productId) {
  const product = getProductById(productId);
  
  if (!product) {
    document.getElementById('product-container').innerHTML = '<p class="text-center" style="padding: 3rem;">Product not found.</p>';
    return;
  }
  
  // Update page title
  document.title = `${product.name} - Coaxx`;
  
  // Set product details
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-description').textContent = product.description || '';
  
  // Set prices
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const displayPrice = product.sale_price ?? product.price;
  
  if (hasDiscount) {
    document.getElementById('product-original-price').textContent = formatPrice(product.price);
    document.getElementById('product-original-price').style.display = 'inline';
    document.getElementById('product-price').classList.add('price-sale');
  }
  document.getElementById('product-price').textContent = formatPrice(displayPrice);
  
  // Set stock status
  const stockBadge = document.getElementById('stock-badge');
  if (product.stock_quantity > 0) {
    stockBadge.textContent = `In Stock (${product.stock_quantity} available)`;
    stockBadge.className = 'badge';
    stockBadge.style.background = '#dcfce7';
    stockBadge.style.color = '#166534';
  } else {
    stockBadge.textContent = 'Out of Stock';
    stockBadge.className = 'badge';
    stockBadge.style.background = '#fee2e2';
    stockBadge.style.color = '#991b1b';
  }
  
  // Set main image
  const mainImage = document.getElementById('product-main-image');
  mainImage.src = product.image_url || '';
  mainImage.alt = product.name;
  
  // Discount badge
  if (hasDiscount) {
    const discountPercent = calculateDiscountPercent(product.price, product.sale_price);
    const discountBadge = document.getElementById('product-discount-badge');
    if (discountBadge) {
      discountBadge.textContent = `${discountPercent}% OFF`;
      discountBadge.style.display = 'block';
    }
  }
  
  // Initialize quantity selector
  let quantity = 1;
  const quantityDisplay = document.getElementById('quantity-display');
  const decreaseBtn = document.getElementById('decrease-quantity');
  const increaseBtn = document.getElementById('increase-quantity');
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  
  function updateQuantity() {
    quantityDisplay.textContent = quantity;
    decreaseBtn.disabled = quantity <= 1;
    increaseBtn.disabled = quantity >= product.stock_quantity;
  }
  
  decreaseBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      updateQuantity();
    }
  });
  
  increaseBtn.addEventListener('click', () => {
    if (quantity < product.stock_quantity) {
      quantity++;
      updateQuantity();
    }
  });
  
  updateQuantity();
  
  // Add to cart handler
  addToCartBtn.addEventListener('click', () => {
    if (product.stock_quantity <= 0) {
      showToast('Product is out of stock', 'error');
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      cart.addItem(product);
    }
    showToast(`Added ${quantity} item(s) to cart!`, 'success');
  });
  
  addToCartBtn.disabled = product.stock_quantity <= 0;
}

// ===== CART PAGE INITIALIZATION =====
function initCartPage() {
  function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');
    
    if (cart.items.length === 0) {
      if (emptyCart) emptyCart.style.display = 'block';
      if (cartContent) cartContent.style.display = 'none';
      return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartContent) cartContent.style.display = 'block';
    
    cartContainer.innerHTML = cart.items.map(item => {
      const displayPrice = item.product.sale_price ?? item.product.price;
      const itemTotal = displayPrice * item.quantity;
      const hasDiscount = item.product.sale_price && item.product.sale_price < item.product.price;
      
      return `
        <div class="cart-item" style="padding: 1.5rem; border-bottom: 1px solid #e5e7eb; display: flex; gap: 1.5rem;">
          <div style="width: 96px; height: 96px; background: #f3f4f6; border-radius: 0.5rem; overflow: hidden; flex-shrink: 0;">
            <img src="${item.product.image_url || ''}" alt="${item.product.name}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div style="flex: 1;">
            <a href="product.html?id=${item.product.id}" style="font-size: 1.125rem; font-weight: 600; color: #111827; text-decoration: none;">
              ${item.product.name}
            </a>
            <div style="margin-top: 0.5rem; display: flex; align-items: center; gap: 0.75rem;">
              ${hasDiscount ? `<span style="color: #6b7280; text-decoration: line-through; font-size: 0.875rem;">${formatPrice(item.product.price)}</span>` : ''}
              <span style="font-size: 1.125rem; font-weight: bold; color: #111827;">${formatPrice(displayPrice)}</span>
            </div>
            <div style="margin-top: 1rem; display: flex; align-items: center; gap: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <button onclick="updateCartQuantity('${item.product.id}', ${item.quantity - 1})" style="padding: 0.25rem; border: 1px solid #d1d5db; border-radius: 0.25rem; background: white;" ${item.quantity <= 1 ? 'disabled' : ''}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
                </button>
                <span style="width: 3rem; text-align: center; font-weight: 500;">${item.quantity}</span>
                <button onclick="updateCartQuantity('${item.product.id}', ${item.quantity + 1})" style="padding: 0.25rem; border: 1px solid #d1d5db; border-radius: 0.25rem; background: white;" ${item.quantity >= item.product.stock_quantity ? 'disabled' : ''}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </button>
              </div>
              <button onclick="removeFromCart('${item.product.id}')" style="color: #dc2626; display: flex; align-items: center; gap: 0.25rem; font-size: 0.875rem; background: none; border: none; cursor: pointer;">
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
    
    // Update summary
    const subtotal = cart.getTotal();
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    document.getElementById('cart-subtotal').textContent = formatPrice(subtotal);
    document.getElementById('cart-shipping').textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    document.getElementById('cart-tax').textContent = formatPrice(tax);
    document.getElementById('cart-total').textContent = formatPrice(total);
    
    // Free shipping message
    const freeShippingMsg = document.getElementById('free-shipping-msg');
    if (freeShippingMsg) {
      if (subtotal < 100 && shipping > 0) {
        freeShippingMsg.textContent = `💡 Add ${formatPrice(100 - subtotal)} more for free shipping!`;
        freeShippingMsg.style.display = 'block';
      } else {
        freeShippingMsg.style.display = 'none';
      }
    }
  }
  
  // Initial render
  renderCart();
  
  // Subscribe to cart changes
  cart.subscribe(renderCart);
  
  // Make functions globally available
  window.updateCartQuantity = (productId, quantity) => {
    cart.updateQuantity(productId, quantity);
  };
  
  window.removeFromCart = (productId) => {
    cart.removeItem(productId);
    showToast('Item removed from cart', 'success');
  };
}

// Export for use in other pages
window.cart = cart;
window.PRODUCTS = PRODUCTS;
window.formatPrice = formatPrice;
window.showToast = showToast;
