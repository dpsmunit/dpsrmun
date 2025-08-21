import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    {/* Adjusted width and height for a smaller container */}
    <div className="relative w-16 h-20 sm:w-24 sm:h-28 md:w-28 md:h-32 flex items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100"></div>
      {/* Reduced font size at all breakpoints */}
      <span className="relative text-4xl sm:text-6xl md:text-7xl font-bold text-mun-dark-text" style={{ letterSpacing: '0.05em' }}>
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <p className="mt-4 text-sm sm:text-base font-semibold text-gray-500 uppercase tracking-widest">{label}</p>
  </div>
);

const Countdown = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-10-26T09:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-50/50 py-24 sm:py-32 border-y border-gray-200/80">
      <div ref={ref} className={`container mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mun-dark-text">
            Conference <span className="text-mun-green">Countdown</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            The countdown to a new era of diplomacy has begun.
          </p>
        </div>
        <div className="flex justify-center items-center gap-4 sm:gap-8">
          <TimeBlock value={timeLeft.days} label="Days" />
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <TimeBlock value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
};

export default Countdown;
