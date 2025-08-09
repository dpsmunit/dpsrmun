
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { WHY_JOIN_POINTS } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { WhyJoinPoint } from '../types';

const SkillCard = ({ point, index }: { point: WhyJoinPoint, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [styles, setStyles] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Debounced movement handler for mouse and touch
  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!cardRef.current || prefersReducedMotion) return;
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      const x = ((clientX - left - width / 2) / width) * 15; // Reduced sensitivity for smoother tilt
      const y = ((clientY - top - height / 2) / height) * 15;

      setStyles({
        transform: `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(${isHovered ? 30 : 0}px)`,
        boxShadow: `0 12px 48px rgba(29, 185, 84, ${isHovered ? 0.36 : 0.18})`,
        background: isHovered ? 'rgba(29, 185, 84, 0.06)' : 'rgba(31, 41, 55, 0.5)', // Reduced neon background
        transition: prefersReducedMotion ? 'none' : 'transform 0.2s ease-out, box-shadow 0.3s ease-out, background 0.3s ease-out',
      } as React.CSSProperties);
    },
    [isHovered, prefersReducedMotion]
  );

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX, e.clientY);
    setIsHovered(true);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setStyles({
      transform: 'perspective(600px) rotateY(0) rotateX(0) translateZ(0)',
      boxShadow: '0 6px 24px rgba(29, 185, 84, 0.18)',
      background: 'rgba(31, 41, 55, 0.5)',
      transition: prefersReducedMotion ? 'none' : 'transform 0.3s ease-out, box-shadow 0.3s ease-out, background 0.3s ease-out',
    });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseLeave={onMouseLeave}
      onTouchEnd={onMouseLeave}
      className="group relative rounded-xl p-6 sm:p-8 border border-white/20 bg-gray-900/50 backdrop-blur-lg transition-all duration-300 will-change-transform hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-mun-green"
      style={styles}
      role="article"
      aria-labelledby={`skill-card-title-${index}`}
      tabIndex={0}
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 sm:mb-6 text-mun-green transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
          <point.icon className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true" />
        </div>
        <h3 id={`skill-card-title-${index}`} className="text-lg sm:text-xl font-bold text-white mb-2">
          {point.name}
        </h3>
        <p className="text-gray-200 text-sm sm:text-base leading-relaxed flex-grow max-w-xs">
          {point.tagline}
        </p>
      </div>
    </div>
  );
};

const WhyJoin = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref: scrollRef, isVisible } = useScrollAnimation<HTMLElement>();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Optimized movement handler
  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!sectionRef.current || prefersReducedMotion) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({ x: clientX - rect.left, y: clientY - rect.top });
    },
    [prefersReducedMotion]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMove]);

  return (
    <section
      id="whyjoin"
      ref={scrollRef}
      className={`py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden transition-all duration-1000 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Dynamic aurora background */}
        <div
          className="pointer-events-none absolute -inset-40 sm:-inset-60 lg:-inset-80 transition-all duration-500"
          style={{
            background: prefersReducedMotion
              ? 'none'
              : `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 185, 84, 0.2), transparent 60%)`,
          }}
        />
        {/* Subtle parallax layer */}
        <div
          className="pointer-events-none absolute -inset-20 sm:-inset-40 lg:-inset-60 opacity-10 transition-all duration-500"
          style={{
            background: prefersReducedMotion
              ? 'none'
              : `radial-gradient(800px circle at ${mousePosition.x + 100}px ${mousePosition.y + 100}px, rgba(29, 185, 84, 0.15), transparent 70%)`,
          }}
        />

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
            Become the <span className="text-mun-green bg-clip-text bg-gradient-to-r from-mun-green to-green-400">Catalyst</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-200 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Participation in DPSR MUN is more than an event—it's an investment in the skills that shape tomorrow's leaders.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 relative z-10" style={{ transformStyle: 'preserve-3d' }}>
          {WHY_JOIN_POINTS.map((point, index) => {
            // If point is a string, convert it to a WhyJoinPoint object here
            // Example: { name: point, icon: SomeIcon, tagline: "" }
            // Replace 'SomeIcon' and '' with appropriate values for your app
            const normalizedPoint: WhyJoinPoint = typeof point === 'string'
              ? { name: point, icon: () => null, tagline: '' }
              : point;
            return (
              <React.Fragment key={normalizedPoint.name}>
                <SkillCard point={normalizedPoint} index={index} />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;