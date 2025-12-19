import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, Navigation, Plus, Save } from 'lucide-react';
import { Trip, Location, TransportMode, TripPurpose, Companion } from '../../types';

interface TripLoggerProps {
  onSaveTrip: (trip: Partial<Trip>) => void;
  currentTrip?: Trip | null;
}

const TripLogger: React.FC<TripLoggerProps> = ({ onSaveTrip, currentTrip }) => {
  const [isActive, setIsActive] = useState(false);
  const [startLocation, setStartLocation] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [mode, setMode] = useState<TransportMode>('car');
  const [purpose, setPurpose] = useState<TripPurpose>('work');
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const transportModes: { value: TransportMode; label: string; icon: string }[] = [
    { value: 'walking', label: 'Walking', icon: '🚶' },
    { value: 'bicycle', label: 'Bicycle', icon: '🚲' },
    { value: 'motorcycle', label: 'Motorcycle', icon: '🏍️' },
    { value: 'car', label: 'Car', icon: '🚗' },
    { value: 'bus', label: 'Bus', icon: '🚌' },
    { value: 'train', label: 'Train', icon: '🚆' },
    { value: 'metro', label: 'Metro', icon: '🚇' },
    { value: 'auto_rickshaw', label: 'Auto Rickshaw', icon: '🛺' },
    { value: 'taxi', label: 'Taxi', icon: '🚕' },
    { value: 'flight', label: 'Flight', icon: '✈️' },
    { value: 'boat', label: 'Boat', icon: '🚤' },
    { value: 'other', label: 'Other', icon: '🚐' }
  ];

  const tripPurposes: { value: TripPurpose; label: string }[] = [
    { value: 'work', label: 'Work/Office' },
    { value: 'education', label: 'Education/School' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'social', label: 'Social/Family' },
    { value: 'business', label: 'Business' },
    { value: 'tourism', label: 'Tourism' },
    { value: 'religious', label: 'Religious' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    // Request location permission and get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(position);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const startTrip = () => {
    setIsActive(true);
    setStartTime(new Date());
    
    // Auto-detect start location if available
    if (currentLocation) {
      setStartLocation(`${currentLocation.coords.latitude}, ${currentLocation.coords.longitude}`);
    }
  };

  const endTrip = () => {
    if (!startTime) return;

    const tripData: Partial<Trip> = {
      tripNumber: `TRIP-${Date.now()}`,
      startTime,
      endTime: new Date(),
      origin: {
        id: crypto.randomUUID(),
        latitude: currentLocation?.coords.latitude || 0,
        longitude: currentLocation?.coords.longitude || 0,
        address: startLocation,
        detectedAutomatically: !!currentLocation
      },
      destination: {
        id: crypto.randomUUID(),
        latitude: 0, // Would be detected at destination
        longitude: 0,
        address: destination,
        detectedAutomatically: false
      },
      mode,
      purpose,
      companions,
      status: 'completed' as const,
      createdAt: new Date(),
      legs: [] // Would be populated for multi-leg trips
    };

    onSaveTrip(tripData);
    resetForm();
  };

  const resetForm = () => {
    setIsActive(false);
    setStartLocation('');
    setDestination('');
    setMode('car');
    setPurpose('work');
    setCompanions([]);
    setStartTime(null);
  };

  const addCompanion = () => {
    const newCompanion: Companion = {
      id: crypto.randomUUID(),
      age: undefined,
      gender: undefined,
      relation: ''
    };
    setCompanions([...companions, newCompanion]);
  };

  const updateCompanion = (index: number, field: keyof Companion, value: any) => {
    const updated = companions.map((companion, i) => 
      i === index ? { ...companion, [field]: value } : companion
    );
    setCompanions(updated);
  };

  const removeCompanion = (index: number) => {
    setCompanions(companions.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Navigation className="mr-2 text-blue-600" />
          NATPAC Trip Logger
        </h2>
        <p className="text-gray-600">
          Help improve transportation planning by logging your travel patterns
        </p>
      </div>

      {!isActive ? (
        <div className="text-center">
          <button
            onClick={startTrip}
            className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors flex items-center mx-auto space-x-2"
          >
            <Navigation size={24} />
            <span>Start New Trip</span>
          </button>
          
          <div className="mt-4 text-sm text-gray-500">
            Current location: {currentLocation ? '📍 Location detected' : '❌ Location access needed'}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Trip Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-green-800">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Trip Active
              </div>
              <div className="text-green-700 font-mono">
                {startTime && (
                  <Clock size={16} className="inline mr-1" />
                )}
                {startTime?.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Origin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin size={16} className="inline mr-1" />
              Starting Location
            </label>
            <input
              type="text"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              placeholder="Enter starting location or address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin size={16} className="inline mr-1" />
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Transport Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Mode of Transport
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {transportModes.map((transportMode) => (
                <button
                  key={transportMode.value}
                  onClick={() => setMode(transportMode.value)}
                  className={`p-3 rounded-lg border-2 transition-colors text-sm ${
                    mode === transportMode.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg mb-1">{transportMode.icon}</div>
                  {transportMode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Trip Purpose */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Purpose
            </label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value as TripPurpose)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {tripPurposes.map((purposeOption) => (
                <option key={purposeOption.value} value={purposeOption.value}>
                  {purposeOption.label}
                </option>
              ))}
            </select>
          </div>

          {/* Companions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                <Users size={16} className="inline mr-1" />
                Accompanying Travelers ({companions.length})
              </label>
              <button
                onClick={addCompanion}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>

            {companions.map((companion, index) => (
              <div key={companion.id} className="border border-gray-200 rounded-lg p-4 mb-3">
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    placeholder="Age"
                    value={companion.age || ''}
                    onChange={(e) => updateCompanion(index, 'age', parseInt(e.target.value) || undefined)}
                    className="p-2 border border-gray-300 rounded text-sm"
                  />
                  <select
                    value={companion.gender || ''}
                    onChange={(e) => updateCompanion(index, 'gender', e.target.value)}
                    className="p-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Relation"
                    value={companion.relation || ''}
                    onChange={(e) => updateCompanion(index, 'relation', e.target.value)}
                    className="p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <button
                  onClick={() => removeCompanion(index)}
                  className="text-red-600 text-sm mt-2 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={endTrip}
              disabled={!destination.trim()}
              className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Save size={20} />
              <span>End & Save Trip</span>
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripLogger;
