import React from 'react';

const Hero = () => {
  return (
    <section
      id="home"
      className="h-screen w-full flex flex-col items-center justify-center relative text-center px-4 bg-mun-white overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bgmun.avif"
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 animate-fade-in-up">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-mun-dark-text via-green-800 to-mun-green">
          DPSR Model United Nations
        </h1>
        <p
          className="mt-6 text-2xl md:text-4xl text-mun-green font-bold tracking-wider animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          2025
        </p>
        <p
          className="mt-8 text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          Forging the next generation of global leaders through diplomacy,
          dialogue, and direction.
        </p>
        <div
          className="mt-12 flex justify-center animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          <a
            href="#committees"
            className="px-8 py-3 bg-mun-green text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
          >
            Explore Committees
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#sg-note"
          aria-label="Scroll to about section"
          className="flex flex-col items-center text-gray-500 hover:text-mun-dark-text transition-colors duration-300 animate-fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          <span className="text-sm font-semibold tracking-widest uppercase">
            Scroll
          </span>
          <svg
            className="w-6 h-6 mt-1 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </a>
      </div>

      {/* Fade-in Animation */}
      <style>
        {`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
