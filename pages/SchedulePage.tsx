import React from 'react';
import { CalendarIcon } from '../components/icons/Icons';

const SchedulePage: React.FC = () => {
  return (
    <div className="bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4 py-24 sm:py-32 min-h-[70vh] flex flex-col justify-center items-center text-center">
        <div className="p-6 bg-mun-soft-green rounded-full mb-6 animate-pulse">
          <CalendarIcon className="w-16 h-16 text-mun-green" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-mun-dark-text">Conference Schedule</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-lg">
          The detailed schedule, including committee session timings, keynote speakers, and social events, will be unveiled here soon. Stay tuned for an unforgettable experience!
        </p>
      </div>
    </div>
  );
};

export default SchedulePage;
