import React from 'react';
import { HIGHLIGHTS } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const HighlightCard = ({ icon: Icon, title, description, index }: { icon: React.FC<{className?: string}>, title: string, description: string, index: number }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms`}}
    >
      <div className="p-4 bg-mun-soft-green rounded-full mb-4">
        <Icon className="w-12 h-12 text-mun-green" />
      </div>
      <h3 className="text-2xl font-bold text-mun-dark-text">{title}</h3>
      <p className="text-md text-gray-500">{description}</p>
    </div>
  );
};

const Highlights = () => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="highlights" className="bg-mun-white py-24 sm:py-32">
        <div ref={ref} className={`container mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-bold text-mun-dark-text">
                    Event <span className="text-mun-green">Blueprint</span>
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    A glimpse into the scale and scope of DPSR MUN 2025.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {HIGHLIGHTS.map((highlight, index) => (
                    <div key={highlight.title}>
                        <HighlightCard
                            icon={highlight.icon}
                            title={highlight.title}
                            description={highlight.description}
                            index={index}
                        />
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Highlights;