import React from 'react';
import { CommitteeIcon } from '../components/icons/Icons';

const AllocationsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4 py-24 sm:py-32 min-h-[70vh] flex flex-col justify-center items-center text-center">
        <div className="p-6 bg-mun-soft-green rounded-full mb-6 animate-pulse">
          <CommitteeIcon className="w-16 h-16 text-mun-green" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-mun-dark-text">Country & Portfolio Allocations</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-lg">
          Allocations will be released to registered delegates shortly. Please check your registered email for updates. We are excited to see which nations and roles you will represent!
        </p>
      </div>
    </div>
  );
};

export default AllocationsPage;
