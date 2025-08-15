import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AnimatedDigit = ({ digit }: { digit: string }) => {
    return (
        <span className="relative inline-block h-12 w-8 sm:h-16 sm:w-10 overflow-hidden align-middle">
            <span
                key={digit}
                className="absolute inset-0 flex items-center justify-center animate-slide-in text-2xl sm:text-3xl font-mono font-bold"
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

const TimeUnit = ({ value, label }: { value: number; label: string }) => {
    const formattedValue = value.toString().padStart(2, '0');
    const digit1 = formattedValue[0];
    const digit2 = formattedValue[1];

    return (
        <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-3 sm:p-4 mb-3">
                <div className="flex text-white">
                    <AnimatedDigit digit={digit1} />
                    <AnimatedDigit digit={digit2} />
                </div>
            </div>
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-300">
                {label}
            </span>
        </div>
    );
};

const Countdown = () => {
    const targetDate = useMemo(() => new Date('2025-10-11T00:00:00'), []);
    const { ref: scrollRef, isVisible } = useScrollAnimation<HTMLElement>();

    const calculateTimeLeft = useCallback(() => {
        const difference = +targetDate - +new Date();
        let timeLeft = { months: 0, days: 0, hours: 0, seconds: 0, total: difference };
        
        if (difference > 0) {
            let now = new Date();
            let target = new Date(targetDate);

            let years = target.getFullYear() - now.getFullYear();
            let months = target.getMonth() - now.getMonth();
            let days = target.getDate() - now.getDate();
            let hours = target.getHours() - now.getHours();
            let minutes = target.getMinutes() - now.getMinutes();
            let seconds = target.getSeconds() - now.getSeconds();

            if (seconds < 0) { minutes--; seconds += 60; }
            if (minutes < 0) { hours--; minutes += 60; }
            if (hours < 0) { days--; hours += 24; }
            if (days < 0) {
                months--;
                const daysInPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
                days += daysInPreviousMonth;
            }
            if (months < 0) { years--; months += 12; }

            months += years * 12;
            
            timeLeft = {
                months: Math.max(0, months),
                days: Math.max(0, days),
                hours: Math.max(0, hours),
                seconds: Math.max(0, seconds),
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
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                        The Journey <span className="text-mun-green">Begins</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 max-w-xl sm:max-w-2xl mx-auto">
                        The countdown to an unparalleled diplomatic experience has started. Mark your calendars for DPSR MUN 2025.
                    </p>
                </div>

                {/* Countdown Grid */}
                <div className="flex justify-center items-center gap-4 sm:gap-8 lg:gap-12 mb-16 sm:mb-20">
                    <TimeUnit value={timeLeft.months} label="Months" />
                    <div className="text-2xl sm:text-3xl text-white/60 font-light">:</div>
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <div className="text-2xl sm:text-3xl text-white/60 font-light">:</div>
                    <TimeUnit value={timeLeft.hours} label="Hours" />
                    <div className="text-2xl sm:text-3xl text-white/60 font-light">:</div>
                    <TimeUnit value={timeLeft.seconds} label="Seconds" />
                </div>
            </div>

            {/* Full Width End-to-End MUN Green Line */}
            <div className="w-full h-0.5 bg-mun-green shadow-[0_0_10px_rgba(29,185,84,0.5)]"></div>
        </section>
    );
};

export default Countdown;
