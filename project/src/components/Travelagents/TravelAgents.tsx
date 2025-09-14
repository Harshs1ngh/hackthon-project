import React, { useState } from 'react';

const TravelAgentsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    image: '',
    duration: '',
    price: '',
    rating: '',
    description: '',
    category: '',
    cities: '',
  });

  const [addedPackages, setAddedPackages] = useState<any[]>(
    JSON.parse(localStorage.getItem('addedPackages') || '[]')
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPackage = {
      ...formData,
      id: `pkg-${Date.now()}`, // Generate a unique ID
      price: `₹${formData.price}`,
      cities: formData.cities.split(',').map((city) => city.trim()),
    };

    const updatedPackages = [...addedPackages, newPackage];
    setAddedPackages(updatedPackages);
    localStorage.setItem('addedPackages', JSON.stringify(updatedPackages));

    setFormData({
      id: '',
      title: '',
      image: '',
      duration: '',
      price: '',
      rating: '',
      description: '',
      category: '',
      cities: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6"></h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Package</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Package Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter package title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 3D/2N"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., 25000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="e.g., 4.5"
                step="0.1"
                min="0"
                max="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cities</label>
              <input
                type="text"
                name="cities"
                value={formData.cities}
                onChange={handleInputChange}
                placeholder="e.g., Delhi, Agra, Jaipur"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default TravelAgentsPage;