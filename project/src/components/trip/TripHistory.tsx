import React, { useState } from 'react';
import { Clock, MapPin, Users, Calendar, Filter, Download, BarChart3 } from 'lucide-react';
import { Trip, TransportMode, TripPurpose } from '../../types';

interface TripHistoryProps {
  trips: Trip[];
  onExportData: () => void;
}

const TripHistory: React.FC<TripHistoryProps> = ({ trips, onExportData }) => {
  const [filter, setFilter] = useState<'all' | TransportMode | TripPurpose>('all');
  const [dateFilter, setDateFilter] = useState<'week' | 'month' | 'all'>('all');

  const formatDuration = (startTime: Date, endTime?: Date) => {
    if (!endTime) return 'Ongoing';
    const duration = endTime.getTime() - startTime.getTime();
    const minutes = Math.floor(duration / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const getModeIcon = (mode: TransportMode) => {
    const icons = {
      walking: '🚶',
      bicycle: '🚲',
      motorcycle: '🏍️',
      car: '🚗',
      bus: '🚌',
      train: '🚆',
      metro: '🚇',
      auto_rickshaw: '🛺',
      taxi: '🚕',
      flight: '✈️',
      boat: '🚤',
      other: '🚐'
    };
    return icons[mode] || '🚐';
  };

  const getPurposeColor = (purpose: TripPurpose) => {
    const colors = {
      work: 'bg-blue-100 text-blue-800',
      education: 'bg-green-100 text-green-800',
      shopping: 'bg-purple-100 text-purple-800',
      healthcare: 'bg-red-100 text-red-800',
      entertainment: 'bg-yellow-100 text-yellow-800',
      social: 'bg-pink-100 text-pink-800',
      business: 'bg-indigo-100 text-indigo-800',
      tourism: 'bg-orange-100 text-orange-800',
      religious: 'bg-teal-100 text-teal-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[purpose] || 'bg-gray-100 text-gray-800';
  };

  const filteredTrips = trips.filter(trip => {
    if (filter !== 'all' && trip.mode !== filter && trip.purpose !== filter) return false;
    
    if (dateFilter !== 'all') {
      const now = new Date();
      const tripDate = new Date(trip.startTime);
      const daysAgo = (now.getTime() - tripDate.getTime()) / (1000 * 60 * 60 * 24);
      
      if (dateFilter === 'week' && daysAgo > 7) return false;
      if (dateFilter === 'month' && daysAgo > 30) return false;
    }
    
    return true;
  });

  // Calculate statistics
  const stats = {
    totalTrips: filteredTrips.length,
    totalDistance: filteredTrips.reduce((sum, trip) => sum + (trip.legs.reduce((legSum, leg) => legSum + (leg.distance || 0), 0)), 0),
    averageDuration: filteredTrips.length > 0 
      ? filteredTrips.reduce((sum, trip) => {
          const duration = trip.endTime ? trip.endTime.getTime() - trip.startTime.getTime() : 0;
          return sum + duration;
        }, 0) / filteredTrips.length / 60000 // in minutes
      : 0,
    modeDistribution: filteredTrips.reduce((acc, trip) => {
      acc[trip.mode] = (acc[trip.mode] || 0) + 1;
      return acc;
    }, {} as Record<TransportMode, number>)
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <BarChart3 className="mr-3 text-blue-600" />
              Trip Analytics Dashboard
            </h2>
            <p className="text-gray-600 mt-1">
              Transportation data collected for NATPAC research
            </p>
          </div>
          <button
            onClick={onExportData}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.totalTrips}</div>
            <div className="text-sm text-blue-800">Total Trips</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {(stats.totalDistance / 1000).toFixed(1)} km
            </div>
            <div className="text-sm text-green-800">Total Distance</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(stats.averageDuration)} min
            </div>
            <div className="text-sm text-purple-800">Avg Duration</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {Object.keys(stats.modeDistribution).length}
            </div>
            <div className="text-sm text-orange-800">Transport Modes</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Trips</option>
            <optgroup label="Transport Mode">
              <option value="car">Car</option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="walking">Walking</option>
              <option value="bicycle">Bicycle</option>
            </optgroup>
            <optgroup label="Purpose">
              <option value="work">Work</option>
              <option value="education">Education</option>
              <option value="shopping">Shopping</option>
              <option value="healthcare">Healthcare</option>
            </optgroup>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
      </div>

      {/* Trip List */}
      <div className="p-6">
        {filteredTrips.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BarChart3 size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No trips found</h3>
            <p className="text-gray-500">Start logging your trips to see analytics here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTrips.map((trip) => (
              <div key={trip.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getModeIcon(trip.mode)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{trip.tripNumber}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPurposeColor(trip.purpose)}`}>
                          {trip.purpose}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trip.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : trip.status === 'active'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {trip.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin size={14} className="mr-2" />
                          <span className="font-medium">From:</span>
                          <span className="ml-2">{trip.origin.address}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin size={14} className="mr-2" />
                          <span className="font-medium">To:</span>
                          <span className="ml-2">{trip.destination.address}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-2" />
                            {new Date(trip.startTime).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-2" />
                            {new Date(trip.startTime).toLocaleTimeString()} - {trip.endTime ? new Date(trip.endTime).toLocaleTimeString() : 'Ongoing'}
                          </div>
                          <div className="flex items-center">
                            <Users size={14} className="mr-2" />
                            {trip.companions.length + 1} travelers
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="font-medium">{formatDuration(new Date(trip.startTime), trip.endTime ? new Date(trip.endTime) : undefined)}</div>
                    {trip.legs.length > 1 && (
                      <div className="text-xs">Multi-leg trip</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripHistory;
