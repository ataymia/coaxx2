export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  sale_price?: number | null;
  stock_quantity: number;
  image_url?: string;
  images?: string[];
  featured?: boolean;
  tags?: Tag[];
  created_at?: string;
  updated_at?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface Order {
  id: string;
  stripe_session_id?: string;
  stripe_payment_intent?: string;
  customer_email: string;
  customer_name?: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  items?: OrderItem[];
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export interface Deal {
  id: string;
  title: string;
  description?: string;
  discount_percent?: number;
  discount_amount?: number;
  code?: string;
  active: boolean;
  start_date?: string;
  end_date?: string;
  created_at?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CloudflareEnv {
  DB: D1Database;
  IMAGES: R2Bucket;
  STRIPE_SECRET_KEY: string;
  STRIPE_PUBLIC_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  ADMIN_PASSWORD_HASH?: string;
}
