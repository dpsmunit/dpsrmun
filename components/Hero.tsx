import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = heroRef.current;
      
      const x = (clientX / offsetWidth - 0.5) * 2; // -1 to 1
      const y = (clientY / offsetHeight - 0.5) * 2; // -1 to 1

      heroRef.current.style.setProperty('--mouse-x', `${x}`);
      heroRef.current.style.setProperty('--mouse-y', `${y}`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="h-screen w-full flex flex-col items-center justify-center relative text-center px-4 bg-mun-white overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <div className="aurora-layer" style={{ '--layer-speed-x': '20px', '--layer-speed-y': '20px' } as React.CSSProperties}></div>
        <div className="aurora-layer" style={{ '--layer-speed-x': '35px', '--layer-speed-y': '35px' } as React.CSSProperties}></div>
        <div className="aurora-layer" style={{ '--layer-speed-x': '50px', '--layer-speed-y': '50px' } as React.CSSProperties}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 animate-fade-in-up">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-mun-dark-text via-green-800 to-mun-green">
            DPSR Model United Nations
        </h1>
        <p className="mt-6 text-2xl md:text-4xl text-mun-green font-bold tracking-wider animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            2025
        </p>
        <p className="mt-8 text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Forging the next generation of global leaders through diplomacy, dialogue, and direction.
        </p>
        <div className="mt-12 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <a href="#committees" className="px-8 py-3 bg-mun-green text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
                Explore Committees
            </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-10">
        <a href="#sg-note" aria-label="Scroll to about section" className="flex flex-col items-center text-gray-500 hover:text-mun-dark-text transition-colors duration-300 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <span className="text-sm font-semibold tracking-widest uppercase">Scroll</span>
            <svg className="w-6 h-6 mt-1 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </a>
      </div>

       <style>{`
        #home {
          --mouse-x: 0;
          --mouse-y: 0;
        }

        .aurora-layer {
          position: absolute;
          inset: -200px;
          border-radius: 50%;
          opacity: 0.5;
          mix-blend-mode: screen;
          filter: blur(80px);
          transition: transform 0.3s ease-out;
          transform: translate(calc(var(--mouse-x) * var(--layer-speed-x)), calc(var(--mouse-y) * var(--layer-speed-y)));
        }

        .aurora-layer:nth-child(1) {
          background-image: radial-gradient(circle, #1DB954, transparent 60%);
          animation: aurora-flow 16s ease-in-out infinite alternate;
        }
        .aurora-layer:nth-child(2) {
          background-image: radial-gradient(circle, #C7F8CC, transparent 60%);
          animation: aurora-flow 18s ease-in-out infinite alternate-reverse;
          animation-delay: -3s;
        }
        .aurora-layer:nth-child(3) {
          background-image: radial-gradient(circle, #059669, transparent 60%);
          animation: aurora-flow 20s ease-in-out infinite alternate;
          animation-delay: -6s;
        }

        @keyframes aurora-flow {
          0% {
            transform: translate(calc(var(--mouse-x) * var(--layer-speed-x) - 50%), calc(var(--mouse-y) * var(--layer-speed-y) - 50%)) scale(1);
          }
          100% {
            transform: translate(calc(var(--mouse-x) * var(--layer-speed-x) + 50%), calc(var(--mouse-y) * var(--layer-speed-y) + 50%)) scale(1.5);
          }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;