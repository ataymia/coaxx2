// Coaxx Admin Dashboard - Admin Logic

// ===== CONFIGURATION =====
const ADMIN_PASSWORD = 'coaxx2025'; // Change this to a secure password

// ===== GLOBAL STATE =====
let products = [];
let editingProductId = null;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  
  // Login form handler
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleLogin();
    });
  }
  
  // Admin button handlers
  document.getElementById('btn-add-product')?.addEventListener('click', () => openAddProduct());
  document.getElementById('btn-save-draft')?.addEventListener('click', () => saveDraft());
  document.getElementById('btn-download-json')?.addEventListener('click', () => downloadJSON());
  document.getElementById('btn-reset')?.addEventListener('click', () => resetToServer());
  document.getElementById('btn-logout')?.addEventListener('click', () => logout());
  
  // Filter handlers
  document.getElementById('filter-category')?.addEventListener('change', () => renderProducts());
  document.getElementById('filter-collection')?.addEventListener('change', () => renderProducts());
  document.getElementById('filter-search')?.addEventListener('input', () => renderProducts());
  
  // Subscription checkbox handler
  document.getElementById('product-subscription')?.addEventListener('change', (e) => {
    const subscriptionFields = document.getElementById('subscription-fields');
    if (subscriptionFields) {
      subscriptionFields.style.display = e.target.checked ? 'block' : 'none';
    }
  });
});

// ===== AUTHENTICATION =====
function checkAuth() {
  const isLoggedIn = localStorage.getItem('coaxxAdminLoggedIn') === 'true';
  
  if (isLoggedIn) {
    showDashboard();
  } else {
    showLogin();
  }
}

function handleLogin() {
  const passwordInput = document.getElementById('admin-password');
  const password = passwordInput?.value;
  const errorEl = document.getElementById('login-error');
  
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem('coaxxAdminLoggedIn', 'true');
    showDashboard();
  } else {
    if (errorEl) {
      errorEl.textContent = 'Incorrect password. Please try again.';
      errorEl.style.display = 'block';
    }
  }
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('coaxxAdminLoggedIn');
    showLogin();
  }
}

function showLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('admin-dashboard').style.display = 'none';
}

function showDashboard() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-dashboard').style.display = 'block';
  loadProducts();
}

// ===== DATA MANAGEMENT =====
async function loadProducts() {
  // Check for draft in localStorage
  const draft = localStorage.getItem('coaxxProductsDraft');
  
  if (draft) {
    try {
      products = JSON.parse(draft);
      document.getElementById('draft-indicator').style.display = 'block';
      renderProducts();
      showToast('Loaded draft version from browser storage', 'success');
      return;
    } catch (error) {
      console.error('Error loading draft:', error);
      showToast('Error loading draft, loading from server instead', 'error');
    }
  }
  
  // Load from server
  try {
    const response = await fetch('products.json');
    if (!response.ok) throw new Error('Failed to load products');
    products = await response.json();
    document.getElementById('draft-indicator').style.display = 'none';
    renderProducts();
  } catch (error) {
    console.error('Error loading products:', error);
    showToast('Failed to load products. Please refresh the page.', 'error');
  }
}

function saveDraft() {
  try {
    localStorage.setItem('coaxxProductsDraft', JSON.stringify(products));
    document.getElementById('draft-indicator').style.display = 'block';
    showToast('Draft saved to browser storage', 'success');
  } catch (error) {
    console.error('Error saving draft:', error);
    showToast('Failed to save draft. Storage may be full.', 'error');
  }
}

function downloadJSON() {
  try {
    const json = JSON.stringify(products, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Products JSON downloaded successfully', 'success');
  } catch (error) {
    console.error('Error downloading JSON:', error);
    showToast('Failed to download JSON', 'error');
  }
}

async function resetToServer() {
  if (!confirm('Are you sure you want to reset to the server version? Any unsaved changes will be lost.')) {
    return;
  }
  
  try {
    localStorage.removeItem('coaxxProductsDraft');
    const response = await fetch('products.json?t=' + Date.now());
    if (!response.ok) throw new Error('Failed to load products');
    products = await response.json();
    document.getElementById('draft-indicator').style.display = 'none';
    renderProducts();
    showToast('Reset to server version', 'success');
  } catch (error) {
    console.error('Error resetting:', error);
    showToast('Failed to reset to server version', 'error');
  }
}

// ===== PRODUCT RENDERING =====
function renderProducts() {
  const tbody = document.getElementById('products-table-body');
  if (!tbody) return;
  
  // Apply filters
  const categoryFilter = document.getElementById('filter-category')?.value || '';
  const collectionFilter = document.getElementById('filter-collection')?.value || '';
  const searchFilter = (document.getElementById('filter-search')?.value || '').toLowerCase();
  
  let filtered = [...products];
  
  if (categoryFilter) {
    filtered = filtered.filter(p => p.category === categoryFilter);
  }
  
  if (collectionFilter) {
    filtered = filtered.filter(p => p.collections && p.collections.includes(collectionFilter));
  }
  
  if (searchFilter) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchFilter) ||
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchFilter)))
    );
  }
  
  // Render table rows
  tbody.innerHTML = filtered.map(product => `
    <tr>
      <td style="font-weight: 600;">${product.name}</td>
      <td style="text-transform: capitalize;">${product.category.replace('-', ' ')}</td>
      <td>
        ${product.collections && product.collections.length > 0 
          ? product.collections.map(c => `<span style="font-size: 0.75rem; padding: 0.125rem 0.375rem; background: #f3f4f6; color: #6b7280; border-radius: 0.25rem; margin-right: 0.25rem;">${c}</span>`).join('')
          : '-'}
      </td>
      <td>${formatPrice(product.price)}${product.originalPrice ? ` <span style="text-decoration: line-through; color: #9ca3af; font-size: 0.75rem;">${formatPrice(product.originalPrice)}</span>` : ''}</td>
      <td>${product.experienceLevel || '-'}</td>
      <td>${product.inStock ? '✓' : '✗'}</td>
      <td>${product.subscription ? '✓' : '-'}</td>
      <td class="table-actions">
        <button class="btn-sm btn-edit" onclick="editProduct('${product.id}')">Edit</button>
        <button class="btn-sm btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
  
  // Update count
  const countEl = document.getElementById('product-count');
  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${products.length} products`;
  }
}

// ===== PRODUCT MODAL =====
function openAddProduct() {
  editingProductId = null;
  document.getElementById('modal-title').textContent = 'Add Product';
  resetProductForm();
  document.getElementById('product-modal').classList.add('show');
}

function editProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  editingProductId = productId;
  document.getElementById('modal-title').textContent = 'Edit Product';
  
  // Populate form
  document.getElementById('product-name').value = product.name || '';
  document.getElementById('product-slug').value = product.slug || '';
  document.getElementById('product-category').value = product.category || '';
  document.getElementById('product-collections').value = product.collections ? product.collections.join(', ') : '';
  document.getElementById('product-price').value = product.price || 0;
  document.getElementById('product-original-price').value = product.originalPrice || '';
  document.getElementById('product-currency').value = product.currency || 'USD';
  document.getElementById('product-short-desc').value = product.shortDescription || '';
  document.getElementById('product-desc').value = product.description || '';
  document.getElementById('product-experience').value = product.experienceLevel || 'Beginner';
  document.getElementById('product-intensity').value = product.intensityLevel || 1;
  document.getElementById('product-materials').value = product.materials ? product.materials.join(', ') : '';
  document.getElementById('product-features').value = product.features ? product.features.join(', ') : '';
  document.getElementById('product-colors').value = product.colors ? product.colors.join(', ') : '';
  document.getElementById('product-sizes').value = product.sizesAvailable ? product.sizesAvailable.join(', ') : '';
  document.getElementById('product-images').value = product.images ? product.images.join(', ') : '';
  document.getElementById('product-tags').value = product.tags ? product.tags.join(', ') : '';
  document.getElementById('product-payment-link').value = product.paymentLink || '';
  document.getElementById('product-care-notes').value = product.careNotes || '';
  document.getElementById('product-featured').checked = product.isFeatured || false;
  document.getElementById('product-new').checked = product.isNew || false;
  document.getElementById('product-in-stock').checked = product.inStock !== false;
  document.getElementById('product-subscription').checked = product.subscription || false;
  document.getElementById('product-billing-interval').value = product.billingInterval || '';
  document.getElementById('product-theme-notes').value = product.themeNotes || '';
  document.getElementById('product-bundle-items').value = product.bundleItems ? product.bundleItems.join(', ') : '';
  
  // Show/hide subscription fields
  const subscriptionFields = document.getElementById('subscription-fields');
  if (subscriptionFields) {
    subscriptionFields.style.display = product.subscription ? 'block' : 'none';
  }
  
  document.getElementById('product-modal').classList.add('show');
}

function closeProductModal() {
  document.getElementById('product-modal').classList.remove('show');
  editingProductId = null;
}

function resetProductForm() {
  document.getElementById('product-form').reset();
  document.getElementById('product-currency').value = 'USD';
  document.getElementById('product-experience').value = 'Beginner';
  document.getElementById('product-intensity').value = 1;
  document.getElementById('product-in-stock').checked = true;
  document.getElementById('subscription-fields').style.display = 'none';
}

function saveProduct() {
  const form = document.getElementById('product-form');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  // Gather form data
  const name = document.getElementById('product-name').value.trim();
  let slug = document.getElementById('product-slug').value.trim();
  
  // Auto-generate slug if empty
  if (!slug) {
    slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
  
  const productData = {
    id: editingProductId || slug + '-' + Date.now(),
    name: name,
    slug: slug,
    category: document.getElementById('product-category').value,
    collections: splitAndTrim(document.getElementById('product-collections').value),
    price: parseFloat(document.getElementById('product-price').value) || 0,
    originalPrice: parseFloat(document.getElementById('product-original-price').value) || null,
    currency: document.getElementById('product-currency').value || 'USD',
    shortDescription: document.getElementById('product-short-desc').value.trim(),
    description: document.getElementById('product-desc').value.trim(),
    experienceLevel: document.getElementById('product-experience').value,
    intensityLevel: parseInt(document.getElementById('product-intensity').value) || 0,
    materials: splitAndTrim(document.getElementById('product-materials').value),
    features: splitAndTrim(document.getElementById('product-features').value),
    colors: splitAndTrim(document.getElementById('product-colors').value),
    sizesAvailable: splitAndTrim(document.getElementById('product-sizes').value),
    images: splitAndTrim(document.getElementById('product-images').value),
    isFeatured: document.getElementById('product-featured').checked,
    isNew: document.getElementById('product-new').checked,
    inStock: document.getElementById('product-in-stock').checked,
    tags: splitAndTrim(document.getElementById('product-tags').value),
    paymentLink: document.getElementById('product-payment-link').value.trim(),
    subscription: document.getElementById('product-subscription').checked,
    bundleItems: splitAndTrim(document.getElementById('product-bundle-items').value),
    careNotes: document.getElementById('product-care-notes').value.trim()
  };
  
  // Add subscription-specific fields
  if (productData.subscription) {
    productData.billingInterval = document.getElementById('product-billing-interval').value.trim();
    productData.themeNotes = document.getElementById('product-theme-notes').value.trim();
  }
  
  // Remove null originalPrice if not set
  if (!productData.originalPrice) {
    delete productData.originalPrice;
  }
  
  // Save or update product
  if (editingProductId) {
    const index = products.findIndex(p => p.id === editingProductId);
    if (index !== -1) {
      products[index] = productData;
      showToast('Product updated successfully', 'success');
    }
  } else {
    products.push(productData);
    showToast('Product added successfully', 'success');
  }
  
  closeProductModal();
  renderProducts();
}

function deleteProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
    return;
  }
  
  products = products.filter(p => p.id !== productId);
  renderProducts();
  showToast('Product deleted successfully', 'success');
}

// ===== UTILITY FUNCTIONS =====
function splitAndTrim(str) {
  if (!str) return [];
  return str.split(',').map(s => s.trim()).filter(s => s.length > 0);
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
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

// Make functions globally available
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.saveProduct = saveProduct;
window.closeProductModal = closeProductModal;
