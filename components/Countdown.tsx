import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// No changes are needed for the AnimatedDigit component.
const AnimatedDigit = ({ digit }: { digit: string }) => {
    return (
        // The container defines the "window" for the sliding digit
        <span className="relative inline-block h-12 w-8 sm:h-16 sm:w-10 overflow-hidden align-middle">
            <span
                key={digit}
                className="absolute inset-0 flex items-center justify-center animate-slide-in text-4xl sm:text-5xl font-mono font-bold text-white tracking-wider"
            >
                {digit}
            </span>
            <style>{`
                @keyframes slide-in {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-in {
                    animation: slide-in 0.5s ease-out forwards;
                }
            `}</style>
        </span>
    );
};

// The TimeUnit component is completely redesigned for the new look.
const TimeUnit = ({ value, label }: { value: number; label: string }) => {
    const formattedValue = value.toString().padStart(2, '0');

    return (
        // Main circular container for each time unit
        <div className="relative flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gray-800/40 border border-mun-green/30 backdrop-blur-md shadow-lg shadow-mun-green/10">
            {/* Flex container for the two digits */}
            <div className="flex">
                <AnimatedDigit digit={formattedValue[0]} />
                <AnimatedDigit digit={formattedValue[1]} />
            </div>
            {/* The label is now positioned inside the circle */}
            <span className="absolute bottom-6 sm:bottom-8 text-xs sm:text-sm font-light uppercase tracking-widest text-mun-green">
                {label}
            </span>
        </div>
    );
};


const Countdown = () => {
    const targetDate = useMemo(() => new Date('2025-10-11T00:00:00'), []);
    const { ref: scrollRef, isVisible } = useScrollAnimation<HTMLElement>();

    // Using the more accurate and standard countdown logic
    const calculateTimeLeft = useCallback(() => {
        const difference = +targetDate - +new Date();
        let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, total: difference };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                total: difference
            };
        }
        return timeLeft;
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    if (timeLeft.total <= 0) {
        return null;
    }

    return (
        <section
            id="countdown"
            ref={scrollRef}
            className={`pt-16 sm:pt-24 pb-0 bg-gray-900 text-white relative overflow-hidden transition-all duration-1000 ease-in-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                        The Journey <span className="text-mun-green">Begins</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 max-w-xl sm:max-w-2xl mx-auto">
                        The countdown to an unparalleled diplomatic experience has started. Mark your calendars for DPSR MUN 2025.
                    </p>
                </div>

                {/* Redesigned Countdown Grid - No more colon separators needed */}
                <div className="flex justify-center items-center flex-wrap gap-4 sm:gap-8 lg:gap-10 mb-16 sm:mb-20">
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <TimeUnit value={timeLeft.hours} label="Hours" />
                    <TimeUnit value={timeLeft.minutes} label="Minutes" />
                    <TimeUnit value={timeLeft.seconds} label="Seconds" />
                </div>
            </div>

            <div className="w-full h-0.5 bg-mun-green shadow-[0_0_10px_rgba(29,185,84,0.5)]"></div>
        </section>
    );
};

export default Countdown;
