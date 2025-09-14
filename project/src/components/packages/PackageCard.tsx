import React from 'react';

interface PackageCardProps {
  package: {
    id: string;
    title: string;
    image: string;
    duration: string;
    price: string;
    rating: number;
    description: string;
    category: string;
    cities: string[];
    highlights?: string[];
    reviews?: number;
    featured?: boolean;
  };
  onBookNow: (packageId: string) => void;
  onViewDetails: (packageId: string) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, onBookNow, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={pkg.image} alt={pkg.title} className="w-full h-40 object-cover rounded-lg mb-4" />
      <h3 className="text-lg font-semibold">{pkg.title}</h3>
      <p className="text-sm text-gray-600">Duration: {pkg.duration}</p>
      <p className="text-sm text-gray-600">Price: {pkg.price}</p>
      <p className="text-sm text-gray-600">Rating: {pkg.rating} Stars</p>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onBookNow(pkg.id)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Book Now
        </button>
        <button
          onClick={() => onViewDetails(pkg.id)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PackageCard;