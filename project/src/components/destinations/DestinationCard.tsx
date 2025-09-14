import React from 'react';
import { MapPin, Package } from 'lucide-react';
import { Destination } from '../../types';

interface DestinationCardProps {
  destination: Destination;
  onExplore: (destinationId: string) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ 
  destination, 
  onExplore 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
         onClick={() => onExplore(destination.id)}>
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {destination.popular && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Popular
          </div>
        )}

        {/* Country flag or category */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-gray-800 capitalize">{destination.category}</span>
        </div>

        {/* Bottom content overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
          <div className="flex items-center space-x-2 text-white/90">
            <MapPin size={16} />
            <span className="text-sm">{destination.country}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {destination.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-600">
            <Package size={16} />
            <span className="text-sm font-semibold">{destination.packages} packages available</span>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExplore(destination.id);
            }}
            className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-orange-600 transition-all transform hover:scale-105"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;