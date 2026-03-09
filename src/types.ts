export interface Setting {
  id: number;
  key: string;
  value: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  sort_order: number;
}

export interface Fleet {
  id: number;
  name: string;
  type: string;
  price: string;
  price_numeric: number;
  capacity: number;
  description: string;
  image_url: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  image_url: string;
  author?: string;
  description?: string;
  created_at: string;
}

export interface Review {
  id: number;
  customer_name: string;
  review_text: string;
  rating: number;
  date: string;
  is_approved: number;
}

export interface Client {
  id: number;
  name: string;
  logo_url: string;
}

export interface About {
  id: number;
  title: string;
  content: string;
  image_url: string;
}

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'editor';
}

export interface Booking {
  id: number;
  name: string;
  phone: string;
  fleet_id: number;
  fleet_name: string;
  date: string;
  duration: number;
  destination: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  created_at: string;
}

export interface DashboardStats {
  total_bookings: { count: number };
  pending_bookings: { count: number };
  total_fleet: { count: number };
  total_articles: { count: number };
  recent_bookings: Booking[];
  bookings_by_status: { name: string; value: number }[];
  bookings_over_time: { date: string; count: number }[];
}

export interface PublicData {
  settings: Setting[];
  banners: Banner[];
  fleet: Fleet[];
  articles: Article[];
  clients: Client[];
  about: About;
  reviews: Review[];
}
