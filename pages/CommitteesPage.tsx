
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { COMMITTEE_DATA } from '../data/committeeData';
import type { CommitteeDetail } from '../types';
import { ChevronRightIcon } from '../components/icons/Icons';

const CommitteeCard = ({ committee, index }: { committee: CommitteeDetail, index: number }) => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className={`group bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 flex flex-col h-full
                        transition-all duration-300 ease-in-out hover:shadow-xl hover:border-mun-green/30 hover:-translate-y-1.5
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${index * 50}ms` }}
        >
            <div className="flex items-start justify-between">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-mun-soft-green p-2
                                transition-all duration-300 group-hover:bg-mun-green group-hover:scale-105 group-hover:rotate-[-6deg]">
                    <img src={committee.iconUrl} alt={`${committee.name} icon`} className="w-full h-full object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert" />
                </div>
                <span className="text-xs font-bold text-green-800 uppercase tracking-wider bg-green-100 px-3 py-1 rounded-full">
                    {committee.category}
                </span>
            </div>

            <div className="flex flex-col flex-grow mt-4">
                <h3 className="text-xl font-bold text-mun-dark-text mb-2 transition-colors duration-300 group-hover:text-mun-green">{committee.name}</h3>
                <p className="text-sm text-gray-500 italic">{committee.tagline}</p>
                
                <div className="border-t border-gray-100 pt-4 mt-auto">
                    <p className="text-xs text-gray-400 font-semibold uppercase mb-1">Agenda:</p>
                    <p className="text-sm text-gray-700 leading-snug">{committee.topic}</p>
                </div>
            </div>
             <div className="mt-6 pt-4 border-t border-gray-100/80">
                <a href={`#committees/${committee.id}`} className="group/link flex items-center justify-center gap-2 w-full text-center font-semibold text-mun-green hover:text-green-500 transition-colors duration-300">
                    <span>View Details</span>
                    <ChevronRightIcon className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
            </div>
        </div>
    );
}

const CommitteesPage: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="relative bg-gray-50 py-24 sm:py-32 border-y border-gray-200 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#1DB954 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-mun-dark-text">
                Explore the Arenas of <span className="text-mun-green">Debate</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                From global crisis to magical decrees, find the committee that challenges and excites you.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {COMMITTEE_DATA.map((committee, index) => (
                <React.Fragment key={committee.id}>
                    <CommitteeCard committee={committee} index={index} />
                </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommitteesPage;
