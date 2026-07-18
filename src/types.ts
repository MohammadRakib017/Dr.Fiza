export interface Service {
  name: string;
  category: 'Orthodontics' | 'Cosmetic Dentistry' | 'Comprehensive Care' | 'Emergency & Specialized';
  description: string;
  icon: string; // Lucide icon name
  duration: string;
  benefits: string[];
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  preferredContact: 'WhatsApp' | 'Phone' | 'Email';
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  date: string;
  text: string;
  serviceReceived: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
