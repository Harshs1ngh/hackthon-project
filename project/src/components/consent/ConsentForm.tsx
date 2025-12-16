import React, { useState } from 'react';
import { Shield, MapPin, Database, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import { UserConsent } from '../../types';

interface ConsentFormProps {
  onConsentSubmit: (consent: UserConsent) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ConsentForm: React.FC<ConsentFormProps> = ({ onConsentSubmit, isOpen, onClose }) => {
  const [dataUsageAgreed, setDataUsageAgreed] = useState(false);
  const [locationTrackingAgreed, setLocationTrackingAgreed] = useState(false);
  const [researchPurposeAgreed, setResearchPurposeAgreed] = useState(false);
  const [anonymousDataAgreed, setAnonymousDataAgreed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dataUsageAgreed || !locationTrackingAgreed || !researchPurposeAgreed || !anonymousDataAgreed) {
      alert('Please agree to all terms to continue using the NATPAC Trip Logger.');
      return;
    }

    const consent: UserConsent = {
      userId: crypto.randomUUID(), // In real app, this would be the actual user ID
      consentGiven: true,
      consentDate: new Date(),
      dataUsageAgreed,
      locationTrackingAgreed
    };

    onConsentSubmit(consent);
    onClose();
  };

  const allAgreed = dataUsageAgreed && locationTrackingAgreed && researchPurposeAgreed && anonymousDataAgreed;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Shield className="text-blue-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Privacy & Consent</h2>
                <p className="text-sm text-gray-600">NATPAC Transportation Study</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Introduction */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="text-blue-600 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">About This Study</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  NATPAC (National Transportation Planning and Research Centre) is conducting this study to improve 
                  transportation planning and infrastructure development. Your travel data will help create better 
                  transportation systems for everyone.
                </p>
              </div>
            </div>
          </div>

          {/* Data Collection Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">What data we collect:</h3>
            
            <div className="grid gap-4">
              <div className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                <MapPin className="text-green-600 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-gray-900">Location Data</h4>
                  <p className="text-sm text-gray-600">
                    Origin and destination coordinates, routes taken, and timing information
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                <Users className="text-blue-600 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-gray-900">Travel Patterns</h4>
                  <p className="text-sm text-gray-600">
                    Transportation modes, trip purposes, travel companions, and frequency
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                <Database className="text-purple-600 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-gray-900">Aggregated Analytics</h4>
                  <p className="text-sm text-gray-600">
                    Anonymous statistical analysis for transportation planning research
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Consent Checkboxes */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-semibold text-gray-900">Your Consent:</h3>
            
            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dataUsageAgreed}
                  onChange={(e) => setDataUsageAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="text-sm">
                  <span className="text-gray-900">
                    I agree to share my travel data with NATPAC for transportation planning research.
                  </span>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={locationTrackingAgreed}
                  onChange={(e) => setLocationTrackingAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="text-sm">
                  <span className="text-gray-900">
                    I allow location tracking during my trips to capture accurate travel patterns.
                  </span>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={researchPurposeAgreed}
                  onChange={(e) => setResearchPurposeAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="text-sm">
                  <span className="text-gray-900">
                    I understand this data will be used solely for transportation research and planning purposes.
                  </span>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={anonymousDataAgreed}
                  onChange={(e) => setAnonymousDataAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="text-sm">
                  <span className="text-gray-900">
                    I understand my data will be anonymized and used in aggregate form for analysis.
                  </span>
                </div>
              </label>
            </div>

            {/* Data Rights */}
            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <h4 className="font-medium text-gray-900 mb-2">Your Rights:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• You can withdraw consent at any time</li>
                <li>• You can request deletion of your data</li>
                <li>• You can view what data has been collected</li>
                <li>• Your data is encrypted and securely stored</li>
                <li>• No personal identification will be shared publicly</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={!allAgreed}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                  allAgreed
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle size={20} />
                <span>I Agree - Start Logging Trips</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Contact Information */}
          <div className="text-xs text-gray-500 border-t pt-4">
            <p>
              For questions about data usage or privacy, contact NATPAC Research Team at{' '}
              <a href="mailto:research@natpac.gov.in" className="text-blue-600 hover:underline">
                research@natpac.gov.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentForm;
