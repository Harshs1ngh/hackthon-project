export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  cities: string[];
  price: string;
  originalPrice?: string;
  image: string;
  description: string;
  highlights: string[];
  agentId: string;
  category: 'adventure' | 'heritage' | 'beach' | 'spiritual' | 'wildlife' | 'honeymoon';
  rating: number;
  reviews: number;
  featured?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  packages: number;
  category: 'adventure' | 'heritage' | 'beach' | 'cultural' | 'wildlife';
  popular?: boolean;
}

export interface TravelAgent {
  id: string;
  name: string;
  logo: string;
  description: string;
  services: string[];
  contact: {
    email: string;
    phone: string;
    address?: string;
  };
  rating: number;
  reviews: number;
  packagesCount: number;
  verified: boolean;
  membership: 'free' | 'premium';
  specializations: string[];
}

export interface Inquiry {
  id: string;
  destination: string;
  adults: number;
  children: number;
  travelDate: string;
  budget: string;
  email: string;
  phone: string;
  name: string;
  message?: string;
  verified: boolean;
  createdAt: string;
  agentId?: string;
  status: 'pending' | 'responded' | 'closed';
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'traveler' | 'agent';
  profileId?: string;
  createdAt: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: string;
  image: string;
  amenities: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image?: string;
  packageTitle?: string;
}