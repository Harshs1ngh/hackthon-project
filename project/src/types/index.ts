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
// NATPAC Transportation Data Types
export interface Trip {
  id: string;
  tripNumber: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  origin: Location;
  destination: Location;
  mode: TransportMode;
  purpose: TripPurpose;
  companions: Companion[];
  legs: TripLeg[];
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  landmark?: string;
  detectedAutomatically: boolean;
}

export interface TripLeg {
  id: string;
  sequence: number;
  startLocation: Location;
  endLocation: Location;
  mode: TransportMode;
  startTime: Date;
  endTime?: Date;
  distance?: number;
  duration?: number;
}

export interface Companion {
  id: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  relation?: string;
}

export interface UserConsent {
  userId: string;
  consentGiven: boolean;
  consentDate: Date;
  dataUsageAgreed: boolean;
  locationTrackingAgreed: boolean;
}

export type TransportMode = 
  | 'walking'
  | 'bicycle'
  | 'motorcycle'
  | 'car'
  | 'bus'
  | 'train'
  | 'metro'
  | 'auto_rickshaw'
  | 'taxi'
  | 'flight'
  | 'boat'
  | 'other';

export type TripPurpose = 
  | 'work'
  | 'education'
  | 'shopping'
  | 'healthcare'
  | 'entertainment'
  | 'social'
  | 'business'
  | 'tourism'
  | 'religious'
  | 'other';
