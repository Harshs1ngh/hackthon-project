import { TourPackage, Destination, TravelAgent, Hotel, Testimonial } from '../types';

export const mockPackages: TourPackage[] = [
  {
    id: '1',
    title: 'Goa Beach Paradise',
    duration: '3D/2N',
    cities: ['Goa', 'Calangute', 'Baga'],
    price: '₹7,999',
    originalPrice: '₹9,999',
    image: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Experience the beautiful beaches of Goa with luxury accommodations and guided tours.',
    highlights: ['Beach activities', 'Local cuisine', 'Water sports', 'Sunset cruise'],
    agentId: '1',
    category: 'beach',
    rating: 4.5,
    reviews: 124,
    featured: true
  },
  {
    id: '3',
    title: 'Kerala Backwaters Cruise',
    duration: '5D/4N',
    cities: ['Kochi', 'Alleppey', 'Kumarakom'],
    price: '₹12,999',
    originalPrice: '₹15,999',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Serene backwater experience with traditional houseboats and local culture.',
    highlights: ['Houseboat stay', 'Traditional meals', 'Village tours', 'Ayurvedic spa'],
    agentId: '1',
    category: 'heritage',
    rating: 4.6,
    reviews: 156,
    featured: true
  },
  {
    id: '4',
    title: 'Bali Adventure Explorer',
    duration: '6D/5N',
    cities: ['Ubud', 'Seminyak', 'Nusa Dua'],
    price: '₹32,999',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Discover the magic of Bali with temple visits, rice terraces, and beach relaxation.',
    highlights: ['Temple tours', 'Rice terrace trek', 'Beach clubs', 'Balinese cooking class'],
    agentId: '3',
    category: 'adventure',
    rating: 4.7,
    reviews: 203,
    featured: true
  },
  {
    id: '5',
    title: 'Dubai Luxury Escape',
    duration: '5D/4N',
    cities: ['Dubai', 'Abu Dhabi'],
    price: '₹45,999',
   image: 'https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg?auto=compress&cs=tinysrgb&w=800',
   description: 'Experience the futuristic city with desert safari, Burj Khalifa, and shopping festivals.',
    highlights: ['Burj Khalifa visit', 'Desert safari', 'Luxury hotels', 'Dhow cruise'],
    agentId: '3',
    category: 'honeymoon',
    rating: 4.9,
    reviews: 320,
    featured: true
  },
  {
    id: '6',
    title: 'Swiss Alps Getaway',
    duration: '7D/6N',
    cities: ['Zurich', 'Interlaken', 'Lucerne'],
    price: '₹89,999',
    image: 'https://images.pexels.com/photos/356004/pexels-photo-356004.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Snow-capped mountains, scenic train rides, and alpine villages.',
    highlights: ['Mount Titlis', 'Scenic train rides', 'Swiss chocolates', 'Lake Lucerne'],
    agentId: '1',
    category: 'honeymoon',
    rating: 4.9,
    reviews: 210,
    featured: true
  },
  {
    id: '7',
    title: 'Paris Romantic Escape',
    duration: '5D/4N',
    cities: ['Paris', 'Versailles'],
    price: '₹75,000',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fall in love with the City of Lights – Eiffel Tower, Seine cruise, and art museums.',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise', 'Versailles Palace'],
    agentId: '1',
    category: 'honeymoon',
    rating: 4.7,
    reviews: 400,
    featured: false
  },
  {
    id: '8',
    title: 'Maldives Overwater Retreat',
    duration: '4D/3N',
    cities: ['Male', 'Maafushi'],
    price: '₹68,999',
    image: 'https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Crystal-clear waters, luxury water villas, and private beaches.',
    highlights: ['Overwater villas', 'Snorkeling', 'Private beach', 'Romantic dinners'],
    agentId: '3',
    category: 'beach',
    rating: 4.8,
    reviews: 178,
    featured: true
  },
  {
    id: '9',
    title: 'Kashmir Heaven on Earth',
    duration: '6D/5N',
    cities: ['Srinagar', 'Gulmarg', 'Pahalgam'],
    price: '₹22,999',
    image: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Snowy landscapes, shikara rides, and breathtaking valleys.',
    highlights: ['Shikara ride', 'Gulmarg ski slopes', 'Mughal gardens', 'Houseboat stay'],
    agentId: '2',
    category: 'heritage',
    rating: 4.6,
    reviews: 143,
    featured: false
  },
  {
    id: '10',
    title: 'Rajasthan Desert Safari',
    duration: '5D/4N',
    cities: ['Jaipur', 'Jodhpur', 'Jaisalmer'],
    price: '₹18,999',
    image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Royal palaces, desert safaris, and cultural evenings.',
    highlights: ['Camel safari', 'Palace stays', 'Folk dances', 'Desert camping'],
    agentId: '1',
    category: 'heritage',
    rating: 4.5,
    reviews: 132,
    featured: true
  },
  {
    id: '11',
    title: 'Singapore Family Fun',
    duration: '5D/4N',
    cities: ['Singapore'],
    price: '₹55,000',
    image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Universal Studios, Gardens by the Bay, and Night Safari.',
    highlights: ['Universal Studios', 'Night Safari', 'Sentosa Island', 'Marina Bay Sands'],
    agentId: '3',
    category: 'adventure',
    rating: 4.6,
    reviews: 210,
    featured: false
  },
  {
    id: '12',
    title: 'Thailand Island Hopper',
    duration: '7D/6N',
    cities: ['Phuket', 'Krabi', 'Bangkok'],
    price: '₹40,999',
    image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Island hopping, nightlife, and exotic beaches.',
    highlights: ['Phi Phi Islands', 'Floating markets', 'Nightlife', 'Thai massage'],
    agentId: '1',
    category: 'beach',
    rating: 4.4,
    reviews: 175,
    featured: false
  },
  {
    id: '13',
    title: 'Turkey Heritage Explorer',
    duration: '8D/7N',
    cities: ['Istanbul', 'Cappadocia', 'Pamukkale'],
    price: '₹65,999',
    image: 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Mosques, bazaars, hot-air balloon rides, and unique landscapes.',
    highlights: ['Blue Mosque', 'Grand Bazaar', 'Hot air balloon', 'Pamukkale pools'],
    agentId: '2',
    category: 'heritage',
    rating: 4.7,
    reviews: 260,
    featured: true
  },
  {
    id: '14',
    title: 'Mauritius Beach Bliss',
    duration: '6D/5N',
    cities: ['Port Louis', 'Grand Baie'],
    price: '₹58,999',
    image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Tropical paradise with white sandy beaches and lagoons.',
    highlights: ['Water sports', 'Lagoon cruise', 'Local seafood', 'Luxury resorts'],
    agentId: '3',
    category: 'beach',
    rating: 4.5,
    reviews: 142,
    featured: false
  },
  {
    id: '15',
    title: 'Nepal Himalayan Trek',
    duration: '10D/9N',
    cities: ['Kathmandu', 'Pokhara', 'Annapurna'],
    price: '₹30,000',
    image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Trekking through the Annapurna ranges and Himalayan villages.',
    highlights: ['Trekking', 'Mountain views', 'Local culture', 'Adventure sports'],
    agentId: '2',
    category: 'adventure',
    rating: 4.8,
    reviews: 110,
    featured: false
  }
];

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Goa',
    country: 'India',
    image: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Paradise of beaches, Portuguese heritage, and vibrant nightlife',
    packages: 24,
    category: 'beach',
    popular: true
  },
  {
    id: '2',
    name: 'Kerala',
    country: 'India',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'God\'s own country with backwaters, hill stations, and spice plantations',
    packages: 18,
    category: 'heritage',
    popular: true
  },
  {
    id: '3',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Tropical paradise with temples, rice terraces, and stunning beaches',
    packages: 31,
    category: 'adventure',
    popular: true
  },
  {
    id: '4',
    name: 'Rajasthan',
    country: 'India',
    image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Land of maharajas with magnificent forts, palaces, and desert landscapes',
    packages: 27,
    category: 'heritage',
    popular: true
  }
];

export const mockAgents: TravelAgent[] = [
  {
    id: '1',
    name: 'Wanderlust Travel Co.',
    logo: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=200',
    description: 'Premier travel agency specializing in beach destinations and cultural tours',
    services: ['Tour Packages', 'Hotel Booking', 'Flight Booking', 'Visa Assistance'],
    contact: {
      email: 'info@wanderlust.com',
      phone: '+91-9876543210',
      address: 'Mumbai, Maharashtra'
    },
    rating: 4.5,
    reviews: 234,
    packagesCount: 42,
    verified: true,
    membership: 'premium',
    specializations: ['Beach Tours', 'Cultural Heritage', 'Honeymoon Packages']
  },
  {
    id: '2',
    name: 'Sacred Journey Tours',
    logo: 'https://images.pexels.com/photos/631414/pexels-photo-631414.jpeg?auto=compress&cs=tinysrgb&w=200',
    description: 'Trusted partner for spiritual journeys and religious pilgrimages',
    services: ['Umrah Packages', 'Hajj Tours', 'Religious Tours', 'Group Bookings'],
    contact: {
      email: 'booking@sacredjourney.com',
      phone: '+91-9123456789',
      address: 'Hyderabad, Telangana'
    },
    rating: 4.8,
    reviews: 156,
    packagesCount: 23,
    verified: true,
    membership: 'premium',
    specializations: ['Umrah Tours', 'Hajj Packages', 'Religious Tourism']
  },
  {
    id: '3',
    name: 'Adventure Seekers',
    logo: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=200',
    description: 'Experts in adventure travel and international destinations',
    services: ['Adventure Tours', 'International Packages', 'Trekking', 'Wildlife Safari'],
    contact: {
      email: 'adventures@seekers.com',
      phone: '+91-9876012345',
      address: 'Bangalore, Karnataka'
    },
    rating: 4.6,
    reviews: 189,
    packagesCount: 38,
    verified: true,
    membership: 'free',
    specializations: ['Adventure Sports', 'International Tours', 'Wildlife Photography']
  }
];

export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Taj Exotica Resort & Spa',
    location: 'Goa, India',
    rating: 5,
    price: '₹8,500/night',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600',
    amenities: ['Pool', 'Spa', 'Beach Access', 'Restaurant', 'WiFi', 'Gym']
  },
  {
    id: '2',
    name: 'Backwater Ripples',
    location: 'Alleppey, Kerala',
    rating: 4,
    price: '₹4,200/night',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=600',
    amenities: ['Houseboat', 'Traditional Meals', 'Fishing', 'WiFi']
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    comment: 'Amazing Goa trip! The beach resort was fantastic and the itinerary was perfect. Highly recommend Wanderlust Travel Co.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    packageTitle: 'Goa Beach Paradise'
  },
  {
    id: '2',
    name: 'Mohammed Ahmed',
    location: 'Delhi',
    rating: 5,
    comment: 'Sacred Journey Tours made our Umrah pilgrimage seamless and spiritual. Excellent service and guidance throughout.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    packageTitle: 'Umrah Spiritual Journey'
  },
  {
    id: '3',
    name: 'Rajesh & Kavya',
    location: 'Bangalore',
    rating: 5,
    comment: 'Our Kerala honeymoon was magical! The houseboat experience and backwater cruise exceeded expectations.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
    packageTitle: 'Kerala Backwaters Cruise'
  }
];

export default mockPackages;
