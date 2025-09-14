import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white p-2 rounded-lg mr-3">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold">TourConnect</h3>
                <p className="text-gray-400 text-sm">Connecting Dreams to Destinations</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for discovering amazing destinations and creating unforgettable travel experiences.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['home', 'packages', 'destinations', 'agents', 'hotels'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-gray-400 hover:text-white transition-colors capitalize"
                  >
                    {page === 'home' ? 'Home' : 
                     page === 'packages' ? 'Tour Packages' :
                     page === 'agents' ? 'Travel Agents' :
                     page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>• Tour Package Booking</li>
              <li>• Hotel Reservations</li>
              <li>• Flight Bookings</li>
              <li>• Visa Assistance</li>
              <li>• Travel Insurance</li>
              <li>• 24/7 Customer Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={16} />
                <span>+91-9876543210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={16} />
                <span>info@tourconnect.com</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin size={16} className="mt-1" />
                <span>
                  123 Travel Street<br />
                  Mumbai, Maharashtra 400001<br />
                  India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 TourConnect. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button
                onClick={() => onNavigate('privacy')}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onNavigate('terms')}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => onNavigate('faqs')}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                FAQs
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;