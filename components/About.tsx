import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { InfoIcon } from './icons/Icons';

const About = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="about" className="py-24 sm:py-32 bg-gray-50 border-y border-gray-200">
      <div
        ref={ref}
        className={`container mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <InfoIcon className="w-8 h-8 text-mun-green" />
                <h2 className="text-3xl md:text-4xl font-bold text-mun-dark-text">
                    Our Vision
                </h2>
              </div>
               <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              DPSR MUN 2025 transcends the traditional conference. We are crafting an ecosystem for tomorrow's leaders to engage in profound <strong className="text-mun-dark-text">dialogue</strong>, master the art of <strong className="text-mun-dark-text">diplomacy</strong>, and chart a definitive <strong className="text-mun-dark-text">direction</strong> for our collective future.
            </p>
          </div>
          <div className="md:col-span-3 text-2xl md:text-3xl text-gray-500 font-light leading-relaxed">
             Our mission is to foster an environment where innovative solutions meet international policy, preparing delegates to tackle the world's most pressing challenges with wisdom, integrity, and a forward-thinking perspective.
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;