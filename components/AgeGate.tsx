'use client';

import { useState, useEffect } from 'react';

export default function AgeGate() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if user has already confirmed age - defer to avoid cascading renders
    const timer = setTimeout(() => {
      const ageConfirmed = localStorage.getItem('coaxx_age_confirmed');
      if (!ageConfirmed) {
        setShowModal(true);
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('coaxx_age_confirmed', 'true');
    setShowModal(false);
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative">
        <div className="text-center">
          {/* Logo */}
          <div className="text-4xl font-bold mb-6">
            <span className="text-red-600">Co</span>
            <span className="text-amber-600">ax</span>
            <span className="text-gray-700">x</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Age Verification Required
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            You must be 18 years or older to enter this website. 
            Please confirm your age to continue.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleConfirm}
              className="w-full px-6 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              I am 18 or older - Enter Site
            </button>
            <button
              onClick={handleDecline}
              className="w-full px-6 py-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
            >
              I am under 18 - Exit
            </button>
          </div>

          {/* Legal note */}
          <p className="text-xs text-gray-500 mt-6">
            By entering this site, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
