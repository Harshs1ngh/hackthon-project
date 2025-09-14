import React, { useState, useMemo } from 'react';
import { Grid, List, Search, SlidersHorizontal } from 'lucide-react';
import PackageCard from '../components/packages/PackageCard';
import { mockPackages } from '../data/mockData';

interface PackagesPageProps {
  onNavigate: (page: string, data?: any) => void;
  onShowInquiryForm: (packageTitle?: string) => void;
  searchData?: any;
}

const PackagesPage: React.FC<PackagesPageProps> = ({ onNavigate, onShowInquiryForm, searchData }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchData?.destination || '');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    duration: '',
    rating: '',
    sortBy: 'featured'
  });

  const categories = ['adventure', 'heritage', 'beach', 'spiritual', 'wildlife', 'honeymoon'];
  const priceRanges = [
    { label: 'Under ₹10,000', value: 'under-10k' },
    { label: '₹10,000 - ₹25,000', value: '10k-25k' },
    { label: '₹25,000 - ₹50,000', value: '25k-50k' },
    { label: 'Above ₹50,000', value: 'above-50k' }
  ];
  const durations = ['1-3 Days', '4-7 Days', '8-14 Days', '15+ Days'];
  const ratings = [4.5, 4.0, 3.5, 3.0];

  const filteredPackages = useMemo(() => {
    const addedPackages = JSON.parse(localStorage.getItem('addedPackages') || '[]');
    let filtered = [...mockPackages, ...addedPackages];

    if (searchTerm) {
      filtered = filtered.filter(pkg =>
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.cities.some((city: string) => city.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(pkg => pkg.category === filters.category);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(pkg => {
        if (pkg.price === 'On Request') return true;
        const price = parseInt(pkg.price.replace(/[₹,]/g, ''));
        switch (filters.priceRange) {
          case 'under-10k': return price < 10000;
          case '10k-25k': return price >= 10000 && price <= 25000;
          case '25k-50k': return price >= 25000 && price <= 50000;
          case 'above-50k': return price > 50000;
          default: return true;
        }
      });
    }

    if (filters.duration) {
      filtered = filtered.filter(pkg => {
        const duration = pkg.duration;
        switch (filters.duration) {
          case '1-3 Days': return /(1D|2D|3D)/.test(duration);
          case '4-7 Days': return /(4D|5D|6D|7D)/.test(duration);
          case '8-14 Days': return /(8D|9D|10D|11D|12D|13D|14D)/.test(duration);
          case '15+ Days': return parseInt(duration) >= 15;
          default: return true;
        }
      });
    }

    if (filters.rating) {
      filtered = filtered.filter(pkg => pkg.rating >= parseFloat(filters.rating));
    }

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, '')));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, '')));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered.slice(0, 15); // limit to 15 packages for display
  }, [searchTerm, filters]);

  const clearFilters = () => {
    setFilters({ category: '', priceRange: '', duration: '', rating: '', sortBy: 'featured' });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">🌍 Tour Packages</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover breathtaking destinations with handpicked travel packages designed for every type of explorer.
          </p>
        </div>

        {/* Search + Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition ${viewMode === 'grid' ? 'bg-white shadow-md text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition ${viewMode === 'list' ? 'bg-white shadow-md text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  <List size={18} />
                </button>
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
              >
                <SlidersHorizontal size={18} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>{filteredPackages.length} packages found</span>
            <button onClick={clearFilters} className="text-blue-600 hover:text-blue-800 underline">
              Clear all filters
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="lg:w-80">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Options</h3>
                {/* Category */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Prices</option>
                    {priceRanges.map(range => (
                      <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <select
                    value={filters.duration}
                    onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Durations</option>
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any Rating</option>
                    {ratings.map(rating => (
                      <option key={rating} value={rating.toString()}>{rating}+ Stars</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviewed</option>
                  </select>
                </div>
              </div>
            </aside>
          )}

          {/* Packages */}
          <main>
            {filteredPackages.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'
                    : 'grid-cols-1'
                }`}
              >
                {filteredPackages.map(pkg => (
                  <div
                    key={pkg.id}
                    className="transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
                  >
                    <PackageCard
                      package={pkg}
                      onBookNow={() => onShowInquiryForm(pkg.title)}
                      onViewDetails={(packageId: any) => onNavigate('package-details', { packageId })}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl text-gray-300 mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No packages found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
