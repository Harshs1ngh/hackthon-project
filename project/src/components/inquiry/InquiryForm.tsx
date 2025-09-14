import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Mail, Phone, User, MessageSquare, X } from 'lucide-react';

interface InquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inquiryData: any) => void;
  packageTitle?: string;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  packageTitle 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: packageTitle || '',
    adults: 2,
    children: 0,
    travelDate: '',
    endDate: '',
    budget: '',
    message: ''
  });

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const budgetOptions = [
    '₹5,000 - ₹10,000',
    '₹10,000 - ₹25,000',
    '₹25,000 - ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000+'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsSubmitting(false);
      setShowOtpModal(true);
    }, 1000);
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      onSubmit({
        ...formData,
        otp,
        timestamp: new Date().toISOString()
      });
      setIsSubmitting(false);
      setShowOtpModal(false);
      onClose();
      alert('Inquiry submitted successfully! We will contact you shortly.');
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {!showOtpModal ? (
          // Main Form
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Get Your Dream Trip Quote</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <User size={16} className="mr-1 text-blue-600" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <Mail size={16} className="mr-1 text-blue-600" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <Phone size={16} className="mr-1 text-blue-600" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Trip Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <MapPin size={16} className="mr-1 text-orange-600" />
                      Destination *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      placeholder="Where do you want to go?"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <DollarSign size={16} className="mr-1 text-orange-600" />
                      Budget Range *
                    </label>
                    <select
                      required
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    >
                      <option value="">Select budget range</option>
                      {budgetOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <Calendar size={16} className="mr-1 text-orange-600" />
                      Travel Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.travelDate}
                      onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <Calendar size={16} className="mr-1 text-orange-600" />
                      Travel End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <Users size={16} className="mr-1 text-orange-600" />
                      Adults
                    </label>
                    <select
                      value={formData.adults}
                      onChange={(e) => setFormData({...formData, adults: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <Users size={16} className="mr-1 text-orange-600" />
                      Children
                    </label>
                    <select
                      value={formData.children}
                      onChange={(e) => setFormData({...formData, children: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    >
                      {[0,1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                  <MessageSquare size={16} className="mr-1 text-blue-600" />
                  Additional Requirements (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Any special requirements or preferences?"
                />
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-orange-600 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending OTP...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          // OTP Verification Modal
          <div className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Phone Number</h2>
              <p className="text-gray-600">
                We've sent a 6-digit OTP to {formData.phone}
              </p>
            </div>

            <form onSubmit={handleOtpVerification} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block text-center">
                  Enter OTP Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-center text-lg tracking-widest"
                  placeholder="000000"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || otp.length !== 6}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-orange-600 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Verifying...' : 'Verify & Submit'}
                </button>
              </div>

              <div className="text-center pt-4">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryForm;