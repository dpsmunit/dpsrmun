import type { TeamMember, FaqItem, WhyJoinPoint } from './types';
import { CalendarIcon, LocationIcon, CommitteeIcon, GlobeIcon, PublicSpeakingIcon, LeadershipIcon, DiplomacyIcon, NetworkingIcon, CriticalThinkingIcon, ProblemSolvingIcon } from './components/icons/Icons';
import React from 'react';
import { assetPaths } from './assets';

export const HIGHLIGHTS = [
  {
    icon: CalendarIcon,
    title: 'Dates',
    description: 'Oct 11-12 , 2025'
  },
  {
    icon: LocationIcon,
    title: 'Venue',
    description: 'DPS Ranipur Haridwar',
  },
  {
    icon: CommitteeIcon,
    title: '18 Committees',
    description: 'Diverse & Specialized',
  },
  {
    icon: GlobeIcon,
    title: 'X+ Delegates',
    description: 'Global Representation',
  },
];

export const WHY_JOIN_POINTS: WhyJoinPoint[] = [
  {
    name: 'Public Speaking',
    tagline: 'Master the art of persuasive and impactful communication in a global forum.',
    icon: PublicSpeakingIcon,
  },
  {
    name: 'Leadership',
    tagline: 'Inspire action, guide discussions, and build consensus among diverse groups.',
    icon: LeadershipIcon,
  },
  {
    name: 'Diplomacy',
    tagline: 'Navigate complex negotiations and forge alliances with tact and skill.',
    icon: DiplomacyIcon,
  },
  {
    name: 'Networking',
    tagline: 'Connect with hundreds of ambitious peers and build lifelong relationships.',
    icon: NetworkingIcon,
  },
  {
    name: 'Critical Thinking',
    tagline: 'Analyze intricate global issues and develop multifaceted solutions.',
    icon: CriticalThinkingIcon,
  },
  {
    name: 'Problem Solving',
    tagline: 'Tackle real-world challenges and craft innovative, actionable policies.',
    icon: ProblemSolvingIcon,
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: '<name>',
    role: 'Secretary-General',
    avatarUrl: assetPaths.x,
    bio: 'Guiding the conference with a vision for future diplomacy and impactful dialogue.'
  },
  {
    name: '<name>',
    role: 'Director-General',
    avatarUrl: assetPaths.priyaSingh,
    bio: 'Overseeing all operational aspects to ensure a seamless and enriching delegate experience.'
  },
  {
    name: '<name>',
    role: 'USG, Technology',
    avatarUrl: assetPaths.rohanMehta,
    bio: 'Integrating cutting-edge technology to create an immersive and futuristic MUN.'
  },
   {
    name: '<name>',
    role: 'USG, Delegate Affairs',
    avatarUrl: assetPaths.anikaReddy,
    bio: 'Dedicated to providing comprehensive support and guidance to all participating delegates.'
  },
  {
    name: '<name>',
    role: 'USG, Finance',
    avatarUrl: assetPaths.kavyaMenon,
    bio: 'Managing the financial framework to ensure a sustainable and high-quality conference.'
  },
  {
    name: '<name>',
    role: 'USG, Communications',
    avatarUrl: assetPaths.arjunDesai,
    bio: 'Leading our outreach and media strategy to connect with delegates globally.'
  },
  {
    name: '<name>',
    role: 'USG, Logistics',
    avatarUrl: assetPaths.saanviGupta,
    bio: 'Orchestrating the on-ground experience, from venues to delegate resources.'
  },
  {
    name: '<name>',
    role: 'USG, Social Events',
    avatarUrl: assetPaths.ishaanPatel,
    bio: 'Curating unforgettable social events that foster networking and camaraderie.'
  },
  {
    name: '<name>',
    role: 'USG, Design',
    avatarUrl: assetPaths.myraKumar,
    bio: 'Crafting the visual identity and aesthetic of the DPSR MUN 2025 conference.'
  },
  {
    name: '<name>',
    role: 'Chief of Staff',
    avatarUrl: assetPaths.vikramSingh,
    bio: 'Ensuring seamless coordination and synergy across all departments of the Secretariat.'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'What is the vision of DPSR MUN 2025?',
    answer: 'Our vision is to forge a new paradigm in Model UN, focusing on Diplomacy, Dialogue, and Direction. We aim to create a platform that not only simulates global committees but also inspires delegates to become future leaders and changemakers.',
  },
  {
    question: 'Are beginners welcome to participate?',
    answer: 'Absolutely. DPSR MUN 2025 is designed to be an inclusive event for delegates of all skill levels. We offer committees tailored for both novices and seasoned veterans, along with comprehensive support from our team.',
  },
  {
    question: 'What is the dress code for the conference?',
    answer: 'A formal business attire is mandatory for all delegates during committee sessions. This includes suits, blazers, and formal shoes. We believe this upholds the professional decorum of the United Nations.',
  },
  {
    question: 'How can I contact the organizing committee?',
    answer: React.createElement('p', null, 
      'For any inquiries, please feel free to reach out to us via email at ',
      React.createElement('a', { href: 'mailto:dpsmun.2025@gmail.com', className: 'text-mun-green font-semibold hover:underline' }, 'dpsmun.2025@gmail.com'),
      ' or connect with us on our social media platforms.'
    ),
  },
];
