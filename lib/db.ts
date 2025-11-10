import type { Product, Tag, Order, OrderItem, Deal } from '@/types';

export async function getProducts(db: D1Database): Promise<Product[]> {
  const { results } = await db.prepare(
    'SELECT * FROM products ORDER BY created_at DESC'
  ).all();
  
  return ((results || []) as any[]).map((row: any) => ({
    ...row,
    images: row.images ? JSON.parse(row.images) : [],
    featured: Boolean(row.featured),
  })) as Product[];
}

export async function getProductById(db: D1Database, id: string): Promise<Product | null> {
  const result = await db.prepare(
    'SELECT * FROM products WHERE id = ?'
  ).bind(id).first();
  
  if (!result) return null;
  
  const product = {
    ...result,
    images: result.images ? JSON.parse(result.images as string) : [],
    featured: Boolean(result.featured),
  } as Product;
  
  // Get tags for the product
  const { results: tags } = await db.prepare(
    `SELECT t.* FROM tags t
     JOIN product_tags pt ON t.id = pt.tag_id
     WHERE pt.product_id = ?`
  ).bind(id).all();
  
  product.tags = (tags as unknown) as Tag[];
  
  return product;
}

export async function getFeaturedProducts(db: D1Database): Promise<Product[]> {
  const { results } = await db.prepare(
    'SELECT * FROM products WHERE featured = 1 ORDER BY created_at DESC LIMIT 8'
  ).all();
  
  return ((results || []) as any[]).map((row: any) => ({
    ...row,
    images: row.images ? JSON.parse(row.images) : [],
    featured: Boolean(row.featured),
  })) as Product[];
}

export async function searchProducts(db: D1Database, query: string): Promise<Product[]> {
  const { results } = await db.prepare(
    `SELECT DISTINCT p.* FROM products p
     LEFT JOIN product_tags pt ON p.id = pt.product_id
     LEFT JOIN tags t ON pt.tag_id = t.id
     WHERE p.name LIKE ? OR p.description LIKE ? OR t.name LIKE ?
     ORDER BY p.created_at DESC`
  ).bind(`%${query}%`, `%${query}%`, `%${query}%`).all();
  
  return ((results || []) as any[]).map((row: any) => ({
    ...row,
    images: row.images ? JSON.parse(row.images) : [],
    featured: Boolean(row.featured),
  })) as Product[];
}

export async function getProductsByTag(db: D1Database, tagSlug: string): Promise<Product[]> {
  const { results } = await db.prepare(
    `SELECT p.* FROM products p
     JOIN product_tags pt ON p.id = pt.product_id
     JOIN tags t ON pt.tag_id = t.id
     WHERE t.slug = ?
     ORDER BY p.created_at DESC`
  ).bind(tagSlug).all();
  
  return ((results || []) as any[]).map((row: any) => ({
    ...row,
    images: row.images ? JSON.parse(row.images) : [],
    featured: Boolean(row.featured),
  })) as Product[];
}

export async function getTags(db: D1Database): Promise<Tag[]> {
  const { results } = await db.prepare(
    'SELECT * FROM tags ORDER BY name ASC'
  ).all();
  
  return (results as unknown) as Tag[];
}

export async function createProduct(db: D1Database, product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
  const id = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const now = new Date().toISOString();
  
  await db.prepare(
    `INSERT INTO products (id, name, description, price, sale_price, stock_quantity, image_url, images, featured, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    product.name,
    product.description || null,
    product.price,
    product.sale_price || null,
    product.stock_quantity,
    product.image_url || null,
    product.images ? JSON.stringify(product.images) : null,
    product.featured ? 1 : 0,
    now,
    now
  ).run();
  
  return { ...product, id, created_at: now, updated_at: now };
}

export async function updateProduct(db: D1Database, id: string, updates: Partial<Product>): Promise<void> {
  const now = new Date().toISOString();
  
  await db.prepare(
    `UPDATE products 
     SET name = COALESCE(?, name),
         description = COALESCE(?, description),
         price = COALESCE(?, price),
         sale_price = ?,
         stock_quantity = COALESCE(?, stock_quantity),
         image_url = COALESCE(?, image_url),
         images = COALESCE(?, images),
         featured = COALESCE(?, featured),
         updated_at = ?
     WHERE id = ?`
  ).bind(
    updates.name || null,
    updates.description || null,
    updates.price || null,
    updates.sale_price !== undefined ? updates.sale_price : null,
    updates.stock_quantity !== undefined ? updates.stock_quantity : null,
    updates.image_url || null,
    updates.images ? JSON.stringify(updates.images) : null,
    updates.featured !== undefined ? (updates.featured ? 1 : 0) : null,
    now,
    id
  ).run();
}

export async function deleteProduct(db: D1Database, id: string): Promise<void> {
  await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
}

export async function decrementStock(db: D1Database, productId: string, quantity: number): Promise<void> {
  await db.prepare(
    'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?'
  ).bind(quantity, productId).run();
}

export async function createOrder(db: D1Database, order: Omit<Order, 'id' | 'created_at' | 'updated_at'>, items: Omit<OrderItem, 'id' | 'order_id'>[]): Promise<Order> {
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const now = new Date().toISOString();
  
  await db.prepare(
    `INSERT INTO orders (id, stripe_session_id, stripe_payment_intent, customer_email, customer_name, total, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    orderId,
    order.stripe_session_id || null,
    order.stripe_payment_intent || null,
    order.customer_email,
    order.customer_name || null,
    order.total,
    order.status,
    now,
    now
  ).run();
  
  // Insert order items
  for (const item of items) {
    const itemId = `item_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    await db.prepare(
      `INSERT INTO order_items (id, order_id, product_id, product_name, quantity, price)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(itemId, orderId, item.product_id, item.product_name, item.quantity, item.price).run();
  }
  
  return { ...order, id: orderId, created_at: now, updated_at: now };
}

export async function updateOrderStatus(db: D1Database, orderId: string, status: string): Promise<void> {
  const now = new Date().toISOString();
  await db.prepare(
    'UPDATE orders SET status = ?, updated_at = ? WHERE id = ?'
  ).bind(status, now, orderId).run();
}
