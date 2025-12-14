import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Search } from 'lucide-react';

interface HeaderProps {
  currentPage?: string;
  onNavigate: (page: string) => void;
  user?: any;
}

const Header: React.FC<HeaderProps> = ({ currentPage = 'home', onNavigate, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'threeDEarth', label: '3D Earth' }, // ✅ fixed id to match App.tsx
    { id: 'packages', label: 'Tour Packages' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'agents', label: 'Travel Agents' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'natpac', label: 'NATPAC Study' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>+91-6395220727</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>Harsh@tourconnect.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={14} />
              <span>Uttar Pradesh, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white p-2 rounded-lg mr-3">
              <Search size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">TourConnect</h1>
              <p className="text-sm text-gray-600">Connecting Dreams to Destinations</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-medium transition-colors duration-200 hover:text-blue-600 ${
                  currentPage === item.id ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white pb-4">
            <nav className="flex flex-col space-y-3 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left font-medium transition-colors duration-200 hover:text-blue-600 py-2 ${
                    currentPage === item.id ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
