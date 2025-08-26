import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { UPDATES_DATA } from '../data/updatesData';
import type { UpdateItem } from '../types';
import { ChevronRightIcon } from '../components/icons/Icons';

const UpdateCard = ({ update, index }: { update: UpdateItem, index: number }) => {
    const { ref, isVisible } = useScrollAnimation<HTMLElement>();

    const linkProps = update.content ? { href: `#updates/${update.id}` } : {};
    const Component = update.content ? 'a' : 'div';

    return (
        <Component
            ref={ref as any}
            {...linkProps}
            className={`group flex flex-col bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 sm:p-8 text-left min-h-[380px]
                       transition-all duration-300 ease-out will-change-transform
                       ${update.content ? 'hover:shadow-[0_8px_30px_rgba(29,185,84,0.15)] hover:border-mun-green/30 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mun-white focus:ring-mun-green' : 'cursor-default'}
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div>
                <p className="text-sm font-semibold text-gray-500 mb-2">{update.date}</p>
                <h3 className={`text-2xl font-bold text-mun-dark-text mb-4 transition-colors duration-300 ${update.content ? 'group-hover:text-mun-green' : ''}`}>{update.title}</h3>
            </div>
            
            <div className="flex-grow">
                <p className="text-gray-600 leading-relaxed text-base">{update.summary}</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200/80">
                <div className="flex justify-between items-end">
                     <div className="flex flex-wrap gap-2">
                        {update.tags.map(tag => (
                            <span key={tag} className="text-xs font-bold text-green-800 uppercase bg-green-100 px-3 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                    {update.content && (
                         <div className="inline-flex items-center gap-1.5 font-semibold text-mun-green flex-shrink-0">
                            <span>Read More</span>
                            <ChevronRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    )}
                </div>
            </div>
        </Component>
    );
};

const UpdatesPage: React.FC = () => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  
    return (
      <div className="relative bg-mun-white py-24 sm:py-32 border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#1DB954 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>

        <div className="relative z-10 container mx-auto px-6 lg:px-8">
            <div ref={ref} className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-4xl md:text-5xl font-bold text-mun-dark-text">
                    Latest <span className="text-mun-green">Updates</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Stay informed with the latest news, announcements, and developments for DPSR MUN 2025.
                </p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {UPDATES_DATA.map((update, index) => (
                    <UpdateCard key={update.id} update={update} index={index} />
                ))}
            </div>
        </div>
      </div>
    );
  };

export default UpdatesPage;
