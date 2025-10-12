
import React from 'react';
import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import WhyJoin from '../components/WhyJoin';
import Countdown from '../components/Countdown';
import Faq from '../components/Faq';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { assetPaths } from '../assets';

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
    return (
        <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {children}
        </div>
    );
};

interface LeadershipNoteProps {
    imageSrc: string;
    imageAlt: string;
    titlePart1: string;
    titlePart2: string;
    greeting: string;
    paragraphs: string[];
    signatureName: string;
    signatureRole: string;
    imagePosition?: 'left' | 'right';
}

const LeadershipNote: React.FC<LeadershipNoteProps> = ({
    imageSrc, imageAlt, titlePart1, titlePart2, greeting, paragraphs, signatureName, signatureRole, imagePosition = 'right'
}) => {
    const containerClasses = imagePosition === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse';
    const imageRotation = imagePosition === 'right' ? 'group-hover:rotate-2' : 'group-hover:-rotate-2';
    const bgRotation = imagePosition === 'right' ? '-rotate-2 group-hover:rotate-0' : 'rotate-2 group-hover:rotate-0';

    return (
        <div className={`flex flex-col ${containerClasses} items-center gap-12 lg:gap-20`}>
            {/* Text Column */}
            <div className="w-full lg:w-3/5">
                <div className="relative mb-6">
                     <span className="absolute -top-8 -left-4 text-9xl font-serif text-mun-green/10 select-none z-0">
                        “
                    </span>
                    <h2 className="relative z-10 text-4xl md:text-5xl font-bold text-mun-dark-text leading-tight">
                        {titlePart1} <span className="text-mun-green">{titlePart2}</span>
                    </h2>
                </div>

                <div className="relative border-l-4 border-mun-green/70 pl-8 space-y-5 text-gray-700 text-lg leading-relaxed prose prose-lg max-w-none">
                    <p className="font-semibold text-mun-dark-text">{greeting}</p>
                    {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>

                <div className="mt-10 pl-8">
                    <p className="font-caveat text-5xl text-mun-dark-text -mb-2">
                        {signatureName}
                    </p>
                    <p className="text-md text-mun-green font-semibold tracking-wider">{signatureRole}</p>
                </div>
            </div>

            {/* Image Column */}
            <div className="w-full lg:w-2/5 flex items-center justify-center">
                <div className="relative group w-full max-w-xs sm:max-w-sm mx-auto">
                    <div className={`absolute -inset-2.5 bg-mun-soft-green rounded-xl transform transition-all duration-500 ${bgRotation}`}></div>
                    <div className={`relative z-10 bg-white rounded-xl shadow-lg p-2 transform transition-all duration-500 `}>
                        <div className="aspect-[4/5] overflow-hidden rounded-lg">
                             <img
                                src={imageSrc}
                                alt={imageAlt}
                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <AnimatedSection>
                <section id="sg-note" className="bg-mun-white py-24 sm:py-32">
                     <div className="container mx-auto px-6 lg:px-8 space-y-32">
                         <LeadershipNote
                            imageSrc={assetPaths.sgNote}
                            imageAlt="Aradhya Chauhan, Secretary-General"
                            imagePosition="right"
                            titlePart1="A Note from the"
                            titlePart2="Secretary-General"
                            greeting="With the success of the first edition of DPSRMUN driving us forward, it is with great pride and enthusiasm that I warmly welcome you all on behalf of the Organizing Committee."
                            paragraphs={[
                                "It fills me with immense joy to see my schoolmates step into the world of diplomacy. Over the years, I've learned the value of patience, open-mindedness, and respectful dialogue—qualities at the core of diplomacy, and I hope each of you embraces them through this platform.",
                                "DPSRMUN is an opportunity to discover the leaders and diplomats within you. Behind this event stands a tireless Organizing Committee. Balancing academics and responsibilities, our team—many of them first-timers—has shown resilience, passion, and unity across every domain, from registrations to logistics, sponsorships to hospitality, all with one goal: making DPSRMUN 2.0 truly unforgettable.",
                                "To all the delegates—whether it's your first conference or not—my message is simple: speak boldly, listen attentively, respect always, and stay proactive. With these values, there is no limit to what you can achieve. Know that I am here to support you throughout this journey.",
                                "I cannot wait to witness the energy, intellect, and enthusiasm you will bring. On behalf of the Organizing Committee, I extend a heartfelt welcome. Let's make history once again."
                            ]}
                            signatureName="Aradhya Chauhan"
                            signatureRole="Secretary-General, DPSR MUN 2025"
                        />
                        <LeadershipNote
                            imageSrc={assetPaths.directorGeneral}
                            imageAlt="Suvigya Vishwakarma, Director-General"
                            imagePosition="left"
                            titlePart1="A Note from the"
                            titlePart2="Director-General"
                            greeting="Respected Delegates, it is with immense honor and delight that I welcome you to the Second Edition of the Delhi Public School Ranipur Model United Nations Conference (2025)."
                            paragraphs={[
                                "After the resounding success of our inaugural edition, this year stands as a testament to our commitment to building a stronger and more impactful platform for dialogue, diplomacy, and leadership. As the sun rises on the 11th and 12th of October, these grounds shall once again transform into an arena of vibrant discussions, spirited negotiations, and the pursuit of solutions that carry the promise of a better tomorrow.",
                                "In the months of preparation that have led to this moment, I have been fortunate to witness the diligence, creativity, and unity of our Organizing Committee, whose ceaseless dedication has shaped every detail of this conference. From meticulously designed committees to carefully curated agendas, each element has been built to challenge your intellect, test your diplomacy, and nurture your potential as global citizens.",
                                "This conference is not merely an event; it is an experience: one that will leave behind memories of collaboration, perseverance, and growth. On behalf of the entire Secretariat, I extend my deepest gratitude to all delegates for bringing your passion and commitment to this platform.",
                                "May DPSRMUN 2025 serve as a journey of learning and leadership, fostering a spirit that resonates beyond these walls: a spirit that speaks in the world, by the world, and for the world."
                            ]}
                            signatureName="Suvigya Vishwakarma"
                            signatureRole="Director-General, DPSR MUN 2025"
                        />
                    </div>
                </section>
            </AnimatedSection>
            
            <AnimatedSection>
                <Highlights />
            </AnimatedSection>
        
            <AnimatedSection>
                <WhyJoin />
            </AnimatedSection>
            <AnimatedSection>
                <Faq />
            </AnimatedSection>
        </>
    );
};

export default HomePage;
