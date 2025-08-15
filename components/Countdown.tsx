import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AnimatedDigit = ({ digit, index }: { digit: string; index: number }) => {
    return (
        <span className="relative inline-block h-14 w-8 sm:h-20 sm:w-12 overflow-hidden align-middle">
            <span
                key={`${digit}-${index}`}
                className="absolute inset-0 flex items-center justify-center animate-slide-up text-3xl sm:text-5xl font-mono font-extrabold text-white"
                style={{ animationDelay: `${index * 0.1}s` }}
            >
                {digit}
            </span>
            <style>{`
                @keyframes slide-up {
                    0% { transform: translateY(100%); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up {
                    animation: slide-up 0.6s ease-out forwards;
                }
                @keyframes pulse-glow {
                    0% { box-shadow: 0 0 5px rgba(29, 185, 84, 0.4); }
                    50% { box-shadow: 0 0 20px rgba(29, 185, 84, 0.8); }
                    100% { box-shadow: 0 0 5px rgba(29, 185, 84, 0.4); }
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
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/30 p-4 sm:p-6 mb-4 animate-[pulse-glow_2s_ease-in-out_infinite]">
                <div className="flex text-white space-x-2">
                    <AnimatedDigit digit={digit1} index={0} />
                    <AnimatedDigit digit={digit2} index={1} />
                </div>
            </div>
            <span className="text-sm sm:text-base font-medium uppercase tracking-widest text-gray-200">
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
            className={`pt-20 sm:pt-32 pb-0 bg-gray-900 text-white relative overflow-hidden transition-all duration-1000 ease-in-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 sm:mb-24">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white">
                        The Journey <span className="text-green-500">Begins</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-xl sm:max-w-2xl mx-auto">
                        The countdown to an unparalleled diplomatic experience has started. Mark your calendars for DPSR MUN 2025.
                    </p>
                </div>
                <div className="flex justify-center items-center gap-6 sm:gap-12 lg:gap-16 mb-20 sm:mb-24">
                    <TimeUnit value={timeLeft.months} label="Months" />
                    <div className="text-3xl sm:text-5xl text-white/60 font-light flex items-center h-14 sm:h-20">:</div>
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <div className="text-3xl sm:text-5xl text-white/60 font-light flex items-center h-14 sm:h-20">:</div>
                    <TimeUnit value={timeLeft.hours} label="Hours" />
                    <div className="text-3xl sm:text-5xl text-white/60 font-light flex items-center h-14 sm:h-20">:</div>
                    <TimeUnit value={timeLeft.seconds} label="Seconds" />
                </div>
            </div>
            <div className="w-full h-1 bg-green-500 shadow-[0_0_15px_rgba(29,185,84,0.7)]"></div>
        </section>
    );
};

export default Countdown;
