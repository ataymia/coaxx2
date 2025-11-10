-- Seed script for Coaxx demo data
-- Run with: npx wrangler d1 execute coaxx-db --file=./scripts/seed.sql

-- Insert Collections
INSERT OR IGNORE INTO collections (id, name, slug, description, featured) VALUES
  ('coll-1', 'Barely Proper', 'barely-proper', 'Delicate pieces that walk the line between innocent and alluring. Soft fabrics, subtle details, and classic silhouettes.', 1),
  ('coll-2', 'Pretty Ruthless', 'pretty-ruthless', 'Bold, confident designs for those who know what they want. Statement pieces with daring cuts and luxurious finishes.', 1),
  ('coll-3', 'Essentials', 'essentials', 'Everyday comfort meets sophisticated style. Your go-to pieces for any occasion.', 0),
  ('coll-4', 'New Arrivals', 'new-arrivals', 'Fresh styles just added to our collection. Be the first to discover our latest designs.', 0);

-- Insert Tags
INSERT OR IGNORE INTO tags (id, name, slug) VALUES
  ('tag-1', 'Lace', 'lace'),
  ('tag-2', 'Satin', 'satin'),
  ('tag-3', 'Bralette', 'bralette'),
  ('tag-4', 'Bodysuit', 'bodysuit'),
  ('tag-5', 'Chemise', 'chemise'),
  ('tag-6', 'Robe', 'robe');

-- Insert Products
INSERT OR IGNORE INTO products (id, name, description, price, sale_price, stock_quantity, low_stock_threshold, image_url, featured, is_deal, is_new, sizes, care_instructions) VALUES
  (
    'prod-1',
    'Delicate Lace Bralette',
    'A stunning lace bralette featuring intricate floral patterns and adjustable straps. Designed for comfort and elegance, this piece is perfect for everyday wear or special occasions.',
    59.99,
    44.99,
    45,
    10,
    'https://images.unsplash.com/photo-1583225173950-c83b8aecb14a?w=800&h=800&fit=crop',
    1,
    1,
    0,
    '["XS", "S", "M", "L", "XL"]',
    'Hand wash cold. Lay flat to dry. Do not bleach or iron.'
  ),
  (
    'prod-2',
    'Silk Chemise - Midnight',
    'Luxurious silk chemise in deep midnight blue. Features delicate lace trim and adjustable spaghetti straps for the perfect fit.',
    89.99,
    NULL,
    30,
    10,
    'https://images.unsplash.com/photo-1611506152948-c29c0e4b2e87?w=800&h=800&fit=crop',
    1,
    0,
    1,
    '["XS", "S", "M", "L", "XL"]',
    'Hand wash cold with mild detergent. Do not wring. Hang to dry away from direct sunlight.'
  ),
  (
    'prod-3',
    'Satin Robe - Rose Gold',
    'Elegant satin robe with kimono-style sleeves. Features a matching belt and subtle lace accents at the cuffs.',
    79.99,
    59.99,
    8,
    10,
    'https://images.unsplash.com/photo-1583225177606-eb913480f3a1?w=800&h=800&fit=crop',
    0,
    1,
    0,
    '["S/M", "L/XL"]',
    'Machine wash cold on delicate cycle. Tumble dry low. Remove promptly.'
  ),
  (
    'prod-4',
    'Mesh Bodysuit',
    'Sultry mesh bodysuit with strategic lace placement. Snap closure at bottom for easy wear.',
    69.99,
    NULL,
    25,
    10,
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=800&fit=crop',
    0,
    0,
    1,
    '["XS", "S", "M", "L"]',
    'Hand wash cold. Do not bleach. Lay flat to dry.'
  ),
  (
    'prod-5',
    'Classic Teddy - Black',
    'Timeless black teddy with underwire support and adjustable straps. Flattering cut with high leg opening.',
    74.99,
    64.99,
    35,
    10,
    'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=800&fit=crop',
    1,
    1,
    0,
    '["XS", "S", "M", "L", "XL", "XXL"]',
    'Hand wash cold. Do not bleach. Lay flat to dry. Do not iron.'
  ),
  (
    'prod-6',
    'Sheer Robe Set',
    'Two-piece set featuring a sheer robe with lace trim and matching bralette. Perfect for layering.',
    99.99,
    79.99,
    5,
    10,
    'https://images.unsplash.com/photo-1583225173951-86099fafffe2?w=800&h=800&fit=crop',
    0,
    1,
    0,
    '["S", "M", "L"]',
    'Hand wash separately. Do not wring. Hang to dry.'
  );

-- Map Products to Collections
INSERT OR IGNORE INTO product_collections (product_id, collection_id) VALUES
  ('prod-1', 'coll-1'),
  ('prod-1', 'coll-4'),
  ('prod-2', 'coll-1'),
  ('prod-2', 'coll-4'),
  ('prod-3', 'coll-3'),
  ('prod-4', 'coll-2'),
  ('prod-4', 'coll-4'),
  ('prod-5', 'coll-3'),
  ('prod-6', 'coll-2');

-- Map Products to Tags
INSERT OR IGNORE INTO product_tags (product_id, tag_id) VALUES
  ('prod-1', 'tag-1'),
  ('prod-1', 'tag-3'),
  ('prod-2', 'tag-2'),
  ('prod-2', 'tag-5'),
  ('prod-3', 'tag-2'),
  ('prod-3', 'tag-6'),
  ('prod-4', 'tag-1'),
  ('prod-4', 'tag-4'),
  ('prod-5', 'tag-4'),
  ('prod-6', 'tag-1'),
  ('prod-6', 'tag-6');

-- Create admin user (password: admin123 - change this in production!)
-- Password hash for 'admin123' using bcrypt
INSERT OR IGNORE INTO admin_users (id, username, password_hash) VALUES
  ('admin-1', 'admin', '$2b$10$rqK5p8wXqXZYqXh.H8bZvOKhqJ5jPmZL.YqR7UqVxYZhqPMqJqYQO');
