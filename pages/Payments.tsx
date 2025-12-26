import React from 'react';
import TiltCard from '../components/TiltCard';
import { PAYMENT_METHODS } from '../constants';

const Payments = () => {
  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 flex items-center min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
            <span className="text-cyber-green">./</span> Support & Transactions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg px-2">
            Secure payment gateways for freelance services and project support.
            Interact with the cards below to reveal payment details.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 px-2 sm:px-4">
          {PAYMENT_METHODS.map((method, idx) => (
            <div 
              key={method.id} 
              className="h-auto min-h-[480px] w-full animate-in fade-in zoom-in duration-700"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <TiltCard 
                title={method.name} 
                description={method.description}
                qrValue={method.qrValue}
                colorGradient={method.color}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;