export type UserRole = 'Citizen' | 'Agent' | 'Admin';

export type TicketStatus = 'pending' | 'in_progress' | 'resolved' | 'canceled';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photo_url?: string;
  role: UserRole;
  address?: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  color: string;
  icon: string;
}

export interface Agency {
  id: string;
  name: string;
  acronym: string;
  email: string;
  phone: string;
  region: string;
  active: boolean;
}

export interface Ticket {
  id: string;
  user_id: string;
  category_id: string;
  agency_id?: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority?: number;
  lat: number;
  lng: number;
  address: string;
  district: string;
  city: string;
  state: string;
  zip?: string;
  origin: 'web' | 'app';
  visibility: 'public' | 'private';
  sla_due_at?: string;
  created_at: string;
  user?: User;
  category?: Category;
  agency?: Agency;
  attachments?: Attachment[];
  comments_count?: number;
}

export interface Attachment {
  id: string;
  ticket_id: string;
  type: 'photo' | 'video';
  url: string;
  thumb_url?: string;
  size_bytes: number;
}

export interface Comment {
  id: string;
  ticket_id: string;
  author_id: string;
  content: string;
  visibility: 'public' | 'internal';
  created_at: string;
  author?: User;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  ref_type?: string;
  ref_id?: string;
  created_at: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  category_id?: string;
  region?: string;
  start_at: string;
  end_at: string;
  image_url?: string;
  active: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface TicketFormData {
  category_id: string;
  title: string;
  description: string;
  lat: number;
  lng: number;
  address: string;
  district: string;
  city: string;
  state: string;
  attachments: File[];
}