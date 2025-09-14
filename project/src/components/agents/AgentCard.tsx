import React from 'react';
import { Star, Phone, Mail, MapPin, Shield, Crown } from 'lucide-react';
import { TravelAgent } from '../../types';

interface AgentCardProps {
  agent: TravelAgent;
  onContact: (agentId: string) => void;
  onViewProfile: (agentId: string) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ 
  agent, 
  onContact, 
  onViewProfile 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Agent Logo & Verification */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <img
            src={agent.logo}
            alt={agent.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          {agent.verified && (
            <div className="absolute -top-1 -right-1 bg-green-500 p-1 rounded-full">
              <Shield size={12} className="text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-bold text-gray-800">{agent.name}</h3>
            {agent.membership === 'premium' && (
              <Crown size={16} className="text-yellow-500" />
            )}
          </div>
          
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-yellow-500 fill-current" />
              <span className="font-semibold text-gray-800">{agent.rating}</span>
            </div>
            <span className="text-gray-500 text-sm">({agent.reviews} reviews)</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-2">{agent.description}</p>
        </div>
      </div>

      {/* Specializations */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Specializations:</p>
        <div className="flex flex-wrap gap-2">
          {agent.specializations.map((spec, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-medium"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Services:</p>
        <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
          {agent.services.map((service, index) => (
            <span key={index} className="flex items-center">
              • {service}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Phone size={14} />
          <span>{agent.contact.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail size={14} />
          <span className="truncate">{agent.contact.email}</span>
        </div>
        {agent.contact.address && (
          <div className="flex items-center space-x-2">
            <MapPin size={14} />
            <span>{agent.contact.address}</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{agent.packagesCount}</div>
          <div className="text-sm text-gray-600">Tour Packages</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button
          onClick={() => onViewProfile(agent.id)}
          className="flex-1 border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors text-sm"
        >
          View Profile
        </button>
        <button
          onClick={() => onContact(agent.id)}
          className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-orange-600 transition-all transform hover:scale-105 text-sm"
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default AgentCard;