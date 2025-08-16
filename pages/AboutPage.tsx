import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { assetPaths } from '../assets';

const AboutPage: React.FC = () => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
    
    return (
        <div className="bg-mun-white text-mun-dark-text">
            {/* Header Section */}
            <section
                ref={ref}
                className={`bg-gray-50 border-b border-gray-200 py-24 sm:py-32 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="container mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-mun-dark-text tracking-tight">
                        About <span className="text-mun-green">DPSR MUN 2025</span>
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-600">
                        Crafting the next generation of global leaders through a dynamic fusion of diplomacy, intellect, and action.
                    </p>
                </div>
            </section>
            
            {/* Our Vision Section */}
            <section className="py-24 sm:py-32">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-mun-dark-text mb-6">
                                The Philosophy of <span className="text-mun-green">DDD</span>
                            </h2>
                            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                                <p><strong className="font-semibold text-mun-dark-text">Diplomacy:</strong> We move beyond mere simulation. We cultivate genuine diplomatic skill—the art of listening, the power of persuasion, and the courage to build bridges across divides.</p>
                                <p><strong className="font-semibold text-mun-dark-text">Dialogue:</strong> We believe that progress is born from robust, respectful dialogue. Our committees are arenas for ideas, where diverse perspectives clash and converge to create innovative solutions.</p>
                                <p><strong className="font-semibold text-mun-dark-text">Direction:</strong> We empower delegates not just to debate the world's problems, but to chart a course for its future. DPSR MUN is a launchpad for leaders who will provide clear, compassionate, and decisive direction.</p>
                            </div>
                        </div>
                        <div className="relative h-96 hidden lg:block">
                            <div className="absolute inset-0 bg-mun-soft-green rounded-full blur-3xl"></div>
                            <img src={assetPaths.aboutVision} alt="Delegates in discussion" className="relative ml-auto w-4/5 h-4/5 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 -rotate-3"/>
                            <img src={assetPaths.aboutFuture} alt="A globe representing international relations" className="absolute bottom-0 left-0 w-1/2 h-1/2 object-cover rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500 rotate-3"/>
                        </div>
                    </div>
                </div>
            </section>

             {/* Mission Statement Section */}
            <section className="py-24 sm:py-32 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 lg:px-8 text-center">
                     <h2 className="text-3xl md:text-4xl font-bold text-mun-dark-text mb-6">
                        Our Mission
                    </h2>
                    <p className="max-w-4xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
                        To be the premier platform for youth leadership development in the region, fostering an environment where innovative solutions meet international policy. We prepare delegates to tackle the world's most pressing challenges with <strong className="text-mun-dark-text">wisdom, integrity, and a forward-thinking perspective</strong>, ensuring they are not just participants in a global dialogue, but architects of a better future.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
