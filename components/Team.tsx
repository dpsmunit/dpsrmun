import React from 'react';
import { TEAM_MEMBERS } from '../constants';
import type { TeamMember } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const TeamCard = ({ member, delay }: { member: TeamMember, delay: string }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  
  return (
    <div
      ref={ref}
      className={`relative group overflow-hidden bg-white rounded-2xl transition-all duration-700 aspect-[4/5] shadow-lg hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: delay }}
    >
      <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 w-full transition-all duration-500 group-hover:bottom-[-100%]">
        <h3 className="text-xl font-bold text-white">{member.name}</h3>
        <p className="text-mun-soft-green">{member.role}</p>
      </div>
      <div className="absolute inset-0 p-6 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h3 className="text-xl font-bold text-mun-dark-text">{member.name}</h3>
        <p className="text-mun-green font-semibold mb-4">{member.role}</p>
        <p className="text-gray-600">{member.bio}</p>
      </div>
    </div>
  );
};


const Team = () => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-24 sm:py-32 bg-mun-white">
      <div ref={ref} className={`container mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-mun-dark-text">
          Meet the <span className="text-mun-green">Secretariat</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <React.Fragment key={member.name}>
              <TeamCard member={member} delay={`${index * 100}ms`} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;