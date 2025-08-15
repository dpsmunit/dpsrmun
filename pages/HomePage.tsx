
import React from 'react';
import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import WhyJoin from '../components/WhyJoin';
import Faq from '../components/Faq';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { assetPaths } from '../assets';
import Countdown from '../components/Countdown';

const SecretaryGeneralNote = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="sg-note" className="py-24 sm:py-32 bg-white">
      <div
        ref={ref}
        className={`container mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold text-mun-dark-text mb-6">
              A Note from the <span className="text-mun-green">Secretary-General</span>
            </h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                Esteemed Delegates, Advisors, and future leaders,
              </p>
              <p>
                It is with immense pride and great anticipation that I welcome you to the 2025 edition of the DPSR Model United Nations. In a world fraught with complexities and unprecedented challenges, the need for articulate, informed, and compassionate leadership has never been more critical. This conference is more than a simulation; it is a crucible where ideas are forged, perspectives are challenged, and the diplomats of tomorrow are born.
              </p>
              <p>
                Our secretariat has worked tirelessly to prepare a conference that is not only intellectually stimulating but also deeply engaging. We have curated a diverse array of committees to tackle issues ranging from global security to sustainable development and human rights. Here, your voice matters, your research is vital, and your ability to collaborate will determine your success.
              </p>
              <p>
                I urge you to step into your roles with conviction, to debate with respect, and to seek consensus with an open mind. Let DPSR MUN 2025 be the platform where you discover your potential and begin your journey as a global changemaker.
              </p>
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col items-center justify-center group">
            <div className="relative w-64 md:w-72">
                <div className="absolute -inset-2.5 bg-mun-soft-green rounded-xl transform -rotate-3 transition-transform duration-500 group-hover:rotate-2"></div>
                <div className="relative bg-white rounded-xl shadow-lg p-2">
                    <img
                      src={assetPaths.sgNote}
                      alt="Aradhya Chauhan, Secretary-General"
                      className="w-full h-auto object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/60 to-transparent w-full rounded-b-lg">
                        <h4 className="font-bold text-lg text-white">Aradhya Chauhan</h4>
                        <p className="text-sm text-mun-soft-green">Secretary-General</p>
                    </div>
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
            <Highlights />
            <Countdown />
            <WhyJoin />
            <Faq />
        </>
    );
};

export default HomePage;