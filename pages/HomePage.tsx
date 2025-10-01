
import React from 'react';
import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import WhyJoin from '../components/WhyJoin';
import Countdown from '../components/Countdown';
import Faq from '../components/Faq';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { assetPaths } from '../assets';

const SecretaryGeneralNote = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="sg-note" className="py-24 sm:py-32 bg-mun-white">
      <div
        ref={ref}
        className={`container mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-mun-dark-text">
              A Note from the <span className="text-mun-green">Secretary-General</span>
            </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 flex justify-center group">
            <div className="relative w-64 md:w-72">
                <div className="absolute -inset-2.5 bg-mun-soft-green rounded-xl transform -rotate-3 transition-transform duration-500 group-hover:rotate-2"></div>
                <div className="relative bg-white rounded-xl shadow-lg p-2">
                    <img
                      src={assetPaths.sgNote}
                      alt="Aradhya Chauhan, Secretary-General"
                      className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Esteemed Delegates, Advisors, and future leaders,
              </p>
              <p>
                It is with immense pride that I welcome you to DPSR MUN 2025. In a world of complexities, the need for articulate, informed, and compassionate leadership is critical. This conference is a crucible where the diplomats of tomorrow are born.
              </p>
              <p>
                 Our secretariat has curated a diverse array of committees to tackle vital global issues. Here, your voice matters, your research is vital, and your ability to collaborate will determine success. I urge you to step into your roles with conviction, debate with respect, and seek consensus with an open mind. Let DPSR MUN be where you discover your potential.
              </p>
            </div>
            <div className="mt-8">
                <p className="text-xl font-semibold font-sans text-mun-dark-text">Aradhya Chauhan</p>
                <p className="text-lg font-sans text-mun-green">Secretary-General</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DirectorGeneralNote = () => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  
    return (
      <section id="dg-note" className="pb-24 sm:pb-32 bg-mun-white">
        <div
          ref={ref}
          className={`container mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-mun-dark-text">
                A Note from the <span className="text-mun-green">Director-General</span>
              </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 lg:order-last">
              <div className="prose prose-lg max-w-none text-gray-600">
                <p>
                  Welcome Delegates,
                </p>
                <p>
                  At DPSR MUN 2025, our commitment extends beyond the debate floor. My team and I have meticulously organized every facet of this conference to ensure a seamless, enriching, and technologically advanced experience for all.
                </p>
                <p>
                  We have focused on creating an environment where your only concern is the quality of your diplomacy. From state-of-the-art facilities to responsive logistical support, every detail has been crafted to empower you. We look forward to hosting you for an unforgettable event of diplomacy and growth.
                </p>
              </div>
              <div className="mt-8">
                  <p className="text-xl font-semibold font-sans text-mun-dark-text">Suvigya Vishwakarma</p>
                  <p className="text-lg font-sans text-mun-green">Director-General</p>
              </div>
            </div>
            <div className="lg:col-span-2 lg:order-first flex justify-center group">
              <div className="relative w-64 md:w-72">
                  <div className="absolute -inset-2.5 bg-mun-soft-green rounded-xl transform rotate-3 transition-transform duration-500 group-hover:-rotate-2"></div>
                  <div className="relative bg-white rounded-xl shadow-lg p-2">
                      <img
                        src={assetPaths.dgNote}
                        alt="Suvigya Vishwakarma, Director-General"
                        className="w-full h-auto object-cover rounded-lg"
                      />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <SecretaryGeneralNote />
            <DirectorGeneralNote />
            <Highlights />
            <Countdown />
            <WhyJoin />
            <Faq />
        </>
    );
};

export default HomePage;
