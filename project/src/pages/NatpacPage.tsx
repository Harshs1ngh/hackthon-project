import React, { useState, useEffect } from 'react';
import { BarChart3, MapPin, Clock, Users, Shield } from 'lucide-react';
import TripLogger from '../components/trip/TripLogger';
import TripHistory from '../components/trip/TripHistory';
import ConsentForm from '../components/consent/ConsentForm';
import { Trip, UserConsent } from '../types';

interface NatpacPageProps {
  onNavigate: (page: string, data?: any) => void;
}

const NatpacPage: React.FC<NatpacPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'logger' | 'history'>('logger');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [userConsent, setUserConsent] = useState<UserConsent | null>(null);
  const [showConsentForm, setShowConsentForm] = useState(false);

  useEffect(() => {
    // Check for existing consent in localStorage
    const savedConsent = localStorage.getItem('natpac-consent');
    const savedTrips = localStorage.getItem('natpac-trips');
    
    if (savedConsent) {
      setUserConsent(JSON.parse(savedConsent));
    } else {
      setShowConsentForm(true);
    }
    
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    }
  }, []);

  const handleConsentSubmit = (consent: UserConsent) => {
    setUserConsent(consent);
    localStorage.setItem('natpac-consent', JSON.stringify(consent));
    setShowConsentForm(false);
  };

  const handleSaveTrip = (tripData: Partial<Trip>) => {
    const newTrip: Trip = {
      id: crypto.randomUUID(),
      userId: userConsent?.userId || 'anonymous',
      tripNumber: tripData.tripNumber || `TRIP-${Date.now()}`,
      startTime: tripData.startTime || new Date(),
      endTime: tripData.endTime,
      origin: tripData.origin || {
        id: '',
        latitude: 0,
        longitude: 0,
        address: '',
        detectedAutomatically: false
      },
      destination: tripData.destination || {
        id: '',
        latitude: 0,
        longitude: 0,
        address: '',
        detectedAutomatically: false
      },
      mode: tripData.mode || 'car',
      purpose: tripData.purpose || 'work',
      companions: tripData.companions || [],
      legs: tripData.legs || [],
      status: tripData.status || 'completed',
      createdAt: tripData.createdAt || new Date()
    };

    const updatedTrips = [newTrip, ...trips];
    setTrips(updatedTrips);
    localStorage.setItem('natpac-trips', JSON.stringify(updatedTrips));
    
    // In a real application, this would send data to NATPAC's server
    console.log('Trip saved for NATPAC analysis:', newTrip);
  };

  const handleExportData = () => {
    const exportData = {
      userConsent,
      trips,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `natpac-transportation-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  if (!userConsent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ConsentForm
          isOpen={showConsentForm}
          onConsentSubmit={handleConsentSubmit}
          onClose={() => {
            setShowConsentForm(false);
            onNavigate('home');
          }}
        />
        
        {/* Landing content while consent is being processed */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="mb-8">
              <div className="bg-blue-100 p-4 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                <BarChart3 className="text-blue-600" size={48} />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              NATPAC Transportation Study
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Help improve transportation planning by sharing your travel patterns
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <MapPin className="text-green-600 mb-4" size={32} />
                <h3 className="font-semibold text-gray-800 mb-2">Location Data</h3>
                <p className="text-gray-600 text-sm">
                  Collect origin-destination patterns to understand travel flows
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Clock className="text-blue-600 mb-4" size={32} />
                <h3 className="font-semibold text-gray-800 mb-2">Trip Timing</h3>
                <p className="text-gray-600 text-sm">
                  Analyze travel times and peak hour patterns
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Users className="text-purple-600 mb-4" size={32} />
                <h3 className="font-semibold text-gray-800 mb-2">Travel Behavior</h3>
                <p className="text-gray-600 text-sm">
                  Understand mode choices and travel purposes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BarChart3 className="text-blue-600" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    NATPAC Transportation Data Collection
                  </h1>
                  <p className="text-gray-600">
                    Contributing to better transportation planning
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <Shield size={16} />
                <span>Data Protected & Anonymous</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('logger')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'logger'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Trip Logger
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Trip History ({trips.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'logger' ? (
          <TripLogger
            onSaveTrip={handleSaveTrip}
            currentTrip={trips.find(trip => trip.status === 'active')}
          />
        ) : (
          <TripHistory
            trips={trips}
            onExportData={handleExportData}
          />
        )}
      </div>

      {/* Footer Info */}
      <div className="bg-blue-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-blue-900 mb-3">About NATPAC</h3>
              <p className="text-blue-800 text-sm">
                National Transportation Planning and Research Centre is India's premier 
                institution for transportation research and policy development.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-3">Data Usage</h3>
              <p className="text-blue-800 text-sm">
                Your travel data helps researchers understand mobility patterns and 
                develop better transportation infrastructure.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-3">Privacy</h3>
              <p className="text-blue-800 text-sm">
                All data is anonymized and used only for research purposes. 
                You can withdraw consent at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NatpacPage;
