import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../constants';
import type { TeamMember } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const TeamCard = ({ member, delay }: { member: TeamMember, delay: string }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-xl bg-gray-200 shadow-md hover:shadow-lg
                  transition-all duration-500 ease-out will-change-transform
                  hover:-translate-y-1.5 hover:shadow-mun-green/20
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: delay }}
    >
      <div className="aspect-[4/5]">
        {!isImageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-300 rounded-xl"></div>
        )}
        <img
          src={member.avatarUrl}
          alt={member.name}
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
          decoding="async"
        />
      </div>

    
      <div
        className="absolute inset-x-0 bottom-0 text-white p-5 
                   transform-gpu translate-y-[calc(100%-6.5rem)] group-hover:translate-y-0
                   transition-transform duration-500 ease-in-out"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent transition-all duration-300 group-hover:from-black/90 group-hover:via-black/75 -z-10"></div>
        
        <div className="space-y-1">
          <h3 className="text-xl font-bold">{member.name}</h3>
          <p className="text-sm font-semibold text-mun-soft-green">{member.role}</p>
        </div>

        <p className="mt-4 pt-4 border-t border-white/20 text-sm leading-relaxed text-gray-200">
          {member.bio}
        </p>
      </div>

      <div className="absolute inset-0 rounded-xl ring-2 ring-inset ring-transparent group-hover:ring-mun-green/50 transition-all duration-300"></div>
    </div>
  );
};

const Team = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="secretariat" className="py-24 sm:py-32 bg-gray-50 border-y border-gray-200">
      <div
        ref={ref}
        className={`container mx-auto px-6 lg:px-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-mun-dark-text">
            Meet the <span className="text-mun-green">Team</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            The dedicated team orchestrating the DPSR MUN 2025 experience.
          </p>          
          <div className="flex justify-center">
            <img
              src="#"  
              alt="Secretariat Group"
              className="rounded-2xl shadow-lg w-full max-w-5xl"
            />
          </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mun-dark-text mb-6">
            Secretariat
          </h2>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Presenting the Secretariat behind DPSR MUN 2025.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <React.Fragment key={member.name}>
              <TeamCard member={member} delay={`${index * 60}ms`} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
