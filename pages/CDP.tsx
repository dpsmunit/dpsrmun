
import React, { useMemo, useState, useRef } from 'react';
import { getCommitteeDetailsById } from '../data/committeeData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ChevronLeftIcon, LinkIcon, BulletIcon, ChevronRightIcon } from '../components/icons/Icons';
import type { CommitteeResource } from '../types';

const ResourceCard = ({ resource, index }: { resource: CommitteeResource, index: number }) => {
    const { ref, isVisible } = useScrollAnimation<HTMLAnchorElement>();
    return (
        <a
            ref={ref}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block group bg-white rounded-2xl p-6 border border-gray-200/80
                        transition-all duration-500 will-change-transform 
                        hover:shadow-lg hover:border-mun-green/50 hover:-translate-y-1.5
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-mun-white focus:ring-mun-green
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="flex items-start gap-4">
                 <div className="flex-shrink-0 bg-mun-soft-green p-3 rounded-lg transition-colors duration-300 group-hover:bg-mun-green">
                    <LinkIcon className="w-6 h-6 text-mun-green transition-colors duration-300 group-hover:text-white" />
                </div>
                <div>
                    <h4 className="font-bold text-lg text-mun-dark-text transition-colors duration-300 group-hover:text-mun-green">{resource.title}</h4>
                    <p className="text-gray-500 text-sm mt-1">{resource.description}</p>
                </div>
            </div>
        </a>
    );
};

const AnimatedSection: React.FC<{ children: React.ReactNode, delay?: number, id?: string }> = ({ children, delay = 0, id }) => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
    return (
        <div ref={ref} id={id} style={{transitionDelay: `${delay}ms`}} className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {children}
        </div>
    );
};


const CommitteeDetailsPage = ({ committeeId }: { committeeId: string }) => {
    const committee = useMemo(() => getCommitteeDetailsById(committeeId), [committeeId]);
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

    const [currentPage, setCurrentPage] = useState(1);
    const [showAllResources, setShowAllResources] = useState(false);
    const resourcesContainerRef = useRef<HTMLDivElement>(null);
    const membersPerPage = 10;
    const resourcesLimit = 4;

    if (!committee) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20">
                <h1 className="text-4xl font-bold text-mun-dark-text">Committee Not Found</h1>
                <p className="mt-4 text-lg text-gray-600">The committee you are looking for does not exist or has been moved.</p>
                <a href="#committees" className="mt-8 px-6 py-3 bg-mun-green text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all duration-300">
                    Back to Committees
                </a>
            </div>
        );
    }

    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = committee.members.slice(indexOfFirstMember, indexOfLastMember);
    const totalPages = Math.ceil(committee.members.length / membersPerPage);

    const paginate = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
        const element = document.getElementById('committee-allocations');
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }

    const handleShowLessClick = () => {
        setShowAllResources(false);
        setTimeout(() => {
            resourcesContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const shouldShowResourceButton = committee.resources && committee.resources.length > resourcesLimit;

    return (
        <div className="bg-mun-white text-mun-dark-text">
            {/* Header */}
            <header ref={ref} className={`relative bg-gray-50 border-b border-gray-200 pt-24 pb-16 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                 <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#1DB954 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                     <a href="#committees" className="inline-flex items-center gap-2 text-gray-500 font-semibold mb-8 hover:text-mun-green transition-colors">
                        <ChevronLeftIcon className="w-5 h-5"/>
                        All Committees
                    </a>
                    <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
                         {committee.iconUrl && (
                            <img src={committee.iconUrl} alt={`${committee.name} icon`} className="w-24 h-24 object-contain flex-shrink-0" />
                         )}
                         <div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-mun-green tracking-tight">{committee.name}</h1>
                            <p className="mt-2 text-lg md:text-xl text-gray-500 italic max-w-2xl">{committee.tagline}</p>
                         </div>
                    </div>
                </div>
            </header>
            
            <div className="container mx-auto max-w-5xl px-6 lg:px-8 py-16 sm:py-24 space-y-20">
                <AnimatedSection>
                    <h2 className="text-3xl font-bold text-mun-dark-text mb-6">About this Committee</h2>
                    <div className="prose lg:prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>{committee.about}</p>
                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200/80">
                            <p className="text-sm uppercase font-semibold text-mun-green tracking-wider">Primary Agenda</p>
                            <p className="mt-2 text-lg font-semibold text-mun-dark-text">{committee.topic}</p>
                        </div>
                    </div>
                </AnimatedSection>

                {committee.agendaPoints && committee.agendaPoints.length > 0 && (
                    <AnimatedSection delay={100}>
                        <h2 className="text-3xl font-bold text-mun-dark-text mb-8">Key Discussion Points</h2>
                        <ul className="space-y-4">
                            {committee.agendaPoints.map((point, index) => (
                               <li key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                                    <div className="mt-1 flex-shrink-0 text-mun-green">
                                        <BulletIcon className="w-6 h-6" />
                                    </div>
                                    <p className="text-gray-700 text-lg">{point}</p>
                               </li>
                            ))}
                        </ul>
                    </AnimatedSection>
                )}
                
                {committee.resources && committee.resources.length > 0 && (
                    <AnimatedSection delay={200}>
                        <div ref={resourcesContainerRef} className="scroll-mt-24">
                            <h2 className="text-3xl font-bold text-mun-dark-text mb-8">Delegate Resources</h2>
                            <div className="relative">
                                <div
                                    className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden transition-all duration-700 ease-in-out py-2"
                                    style={{ maxHeight: showAllResources ? '2000px' : '330px' }}
                                >
                                    {committee.resources.map((resource, index) => (
                                        <ResourceCard resource={resource} index={index} key={index} />
                                    ))}
                                </div>
                                {shouldShowResourceButton && !showAllResources && (
                                    <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-mun-white via-mun-white/90 to-transparent flex items-end justify-center pb-4 pointer-events-none">
                                        <button
                                            onClick={() => setShowAllResources(true)}
                                            className="pointer-events-auto px-6 py-3 bg-white border-2 border-mun-green text-mun-green font-semibold rounded-full hover:bg-mun-green hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mun-white focus:ring-mun-green shadow-lg"
                                        >
                                            Show All {committee.resources.length} Resources
                                        </button>
                                    </div>
                                )}
                            </div>
                            {shouldShowResourceButton && showAllResources && (
                                <div className="mt-8 text-center">
                                    <button
                                        onClick={handleShowLessClick}
                                        className="px-6 py-3 bg-transparent border-2 border-mun-green text-mun-green font-semibold rounded-full hover:bg-mun-green hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mun-white focus:ring-mun-green"
                                    >
                                        Show Less
                                    </button>
                                </div>
                            )}
                        </div>
                    </AnimatedSection>
                )}

                {committee.members && committee.members.length > 0 && (
                     <AnimatedSection delay={300} id="committee-allocations">
                        <h2 className="text-3xl font-bold text-mun-dark-text mb-8">Committee Allocations</h2>
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
                            <div className="hidden md:grid grid-cols-3 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h4 className="font-semibold text-gray-600 uppercase text-sm tracking-wider">Name</h4>
                                <h4 className="font-semibold text-gray-600 uppercase text-sm tracking-wider">Roll Number</h4>
                                <h4 className="font-semibold text-gray-600 uppercase text-sm tracking-wider">Assigned Role</h4>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {currentMembers.map((member, index) => (
                                    <div key={index} className="grid md:grid-cols-3 gap-x-4 gap-y-2 px-6 py-4 hover:bg-mun-soft-green/30 transition-colors duration-200">
                                        <div className="flex items-center">
                                            <span className="md:hidden font-semibold text-gray-500 w-28 text-sm">Name:</span>
                                            <span className="text-mun-dark-text">{member.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="md:hidden font-semibold text-gray-500 w-28 text-sm">Roll No:</span>
                                            <span className="text-gray-600">{member.rollNumber}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="md:hidden font-semibold text-gray-500 w-28 text-sm">Role:</span>
                                            <span className="font-semibold text-mun-green">{member.role}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-8 flex justify-between items-center">
                                <button 
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeftIcon className="w-5 h-5" />
                                    Previous
                                </button>
                                <span className="text-sm text-gray-700">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button 
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                    <ChevronRightIcon className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </AnimatedSection>
                )}
            </div>
        </div>
    );
};

export default CommitteeDetailsPage;
