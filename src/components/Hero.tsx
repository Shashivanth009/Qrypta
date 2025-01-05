import React from 'react';
import { QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particles absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Secure Certificate Management with
            <span className="text-indigo-600 dark:text-indigo-400"> Qrypta</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in delay-100">
            Transform how you manage and verify digital certificates. Powered by blockchain
            technology and AI for maximum security and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-200">
            <button 
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              onClick={() => navigate('/register')}
            >
              Get Started
            </button>
            <a 
              href="/#how-it-works"
              className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 rounded-lg font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
            >
              How It Works
            </a>
          </div>
        </div>
        
        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-600 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <QrCode className="w-full h-64 text-indigo-600 dark:text-indigo-400" />
              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Scan to Verify
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Experience instant certificate verification
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
