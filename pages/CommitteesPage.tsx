import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Committee {
  name: string;
  tagline: string;
  topic: string;
  iconUrl: string;
  category: string;
}

const COMMITTEES_DATA: Committee[] = [
    {
        name: "United Nations General Assembly (UNGA)",
        tagline: "The Global Consensus Builder",
        topic: "Deliberation on the Global Governance of Artificial Intelligence and its Impact on Sovereignty and Human Rights.",
        iconUrl: 'https://static.thenounproject.com/png/united-nations-icon-3104698-512.png',
        category: 'UN General'
    },
    {
        name: "United Nations Security Council (UNSC)",
        tagline: "The Crisis Leadership Laboratory",
        topic: "Addressing the Threats to Global Peace Arising from AI-Enhanced Military Drones and Autonomous Weapons in Ongoing Conflicts.",
        iconUrl: 'https://i.ibb.co/TDX6v4sX/png-clipart-united-nations-security-council-resolution-flag-of-the-united-nations-model-united-natio.png',
        category: 'UN Security'
    },
    {
        name: "United Nations Human Rights Council (UNHRC)",
        tagline: "The Justice and Accountability Specialist",
        topic: "Deliberation on Alleged Human Rights Violations Arising from the Iran-Israel Escalation, Including Civilian Targeting, Use of Proxy Forces, and Internet Blackouts.",
        iconUrl: 'https://i.ibb.co/1G8vmkdt/UNHC.png',
        category: 'Human Rights'
    },
    {
        name: "United Nations Commission on the Status of Women (UNCSW)",
        tagline: "The Digital Equity Pioneer",
        topic: "Bridging the Digital Gender Divide: Ensuring Equal Access to Technology and Online Safety for Women and Girls.",
        iconUrl: 'https://i.ibb.co/Dfwj9Yw3/Women.png',
        category: 'Social Justice'
    },
    {
        name: "United Nations International Children's Emergency Fund (UNICEF)",
        tagline: "The Humanitarian Crisis Expert",
        topic: "Addressing the Escalating Humanitarian Crisis: Ensuring the Protection, Survival, and Rights of Children in the Gaza Strip.",
        iconUrl: 'https://i.ibb.co/svsBX4bB/unicef-13867-content-portrait-mobile-tiny-removebg-preview.png',
        category: 'Humanitarian'
    },
    {
        name: "United Nations Economic and Social Council (ECOSOC)",
        tagline: "The Global Economy Architect",
        topic: "Reforming Global Debt Relief Mechanisms for Developing Nations in the Aftermath of the COVID-19 and Climate Crises.",
        iconUrl: 'https://i.ibb.co/hFdtQJL0/images-removebg-preview.png" alt="images-removebg-preview',
        category: 'Economics'
    },
    {
        name: "United Nations Environment Programme (UNEP)",
        tagline: "The Planetary Solutions Expert",
        topic: "Combating Plastic Pollution in Oceans through Binding Global Agreements.",
        iconUrl: 'https://i.ibb.co/S4Jk5TP7/images-removebg-preview-1.png" alt="images-removebg-preview-1',
        category: 'Environment'
    },
    {
        name: "World Health Organisation (WHO)",
        tagline: "The Global Health Systems Expert",
        topic: "Addressing the Global Health Crisis: Mitigating Disease Outbreaks and Health System Vulnerabilities in the Face of Reduced WHO Funding.",
        iconUrl: 'https://i.ibb.co/Z6nQwnq6/WHO.png',
        category: 'Global Health'
    },
    {
        name: "Lok Sabha",
        tagline: "The Democratic Governance Specialist",
        topic: "Deliberation upon electoral reforms with special emphasis to one nation one election.",
        iconUrl: 'https://i.ibb.co/wNSBVvVc/LOKSABHA.png',
        category: 'Indian Politics'
    },
    {
        name: "All India Political Parties Meet (AIPPM)",
        tagline: "The Consensus Building Master",
        topic: "Deliberation upon Nationwide implementation of Uniform Civil Code with special emphasis on Uttarakhand Model of UCC.",
        iconUrl: 'https://i.ibb.co/DDnKG7Rc/AIPPM.png',
        category: 'Indian Politics'
    },
    {
        name: "Continuous Crisis Committee (CCC)",
        tagline: "The Ultimate Strategic Challenge",
        topic: "Classified (Real-time evolving crisis requiring adaptive response).",
        iconUrl: 'https://i.ibb.co/C5D9BHMW/colored-logo-removebg-preview.png',
        category: 'Crisis'
    },
    {
        name: "International Court of Justice (ICJ)",
        tagline: "The Legal Excellence Laboratory",
        topic: "Discussing Allegations of Violations of International Law in the context of Russia-Ukraine War.",
        iconUrl: 'https://i.ibb.co/7dcsh2z8/colored-logo-1.png',
        category: "Int'l Law"
    },
    {
        name: "Board of Control for Cricket in India (BCCI)",
        tagline: "The Sports Governance Expert",
        topic: "Regulating the Growing Commercial Influence of the IPL on National Team Selections and Schedules.",
        iconUrl: 'https://i.ibb.co/gbDx9NWy/image-removebg-preview.png',
        category: 'Sports Governance'
    },
    {
        name: "IPL Auction Committee",
        tagline: "The Strategic Resource Master",
        topic: "Bidding (Live player auction simulation requiring real-time strategic decision-making).",
        iconUrl: 'https://i.ibb.co/4ykPfkN/IPL.png',
        category: 'Sports Auction'
    },
    {
        name: "FIFA Committee",
        tagline: "Reforming Global Sports Governance",
        topic: "Addressing Corruption and Ensuring Fair Hosting Rights for Future FIFA World Cups.",
        iconUrl: 'https://static.thenounproject.com/png/world-cup-icon-1771335-512.png',
        category: 'Sports Governance'
    },
    {
        name: "International Press",
        tagline: "Shaping the Narrative of Global Events",
        topic: "Covering and Reporting on the Ongoing Global Crises with Special Focus on Media Ethics and Responsible Journalism.",
        iconUrl: 'https://i.ibb.co/Y4jcb1rR/IP.png" alt="colored-logo-3',
        category: 'Media'
    },
    {
        name: "Harry Potter Committee (Wizengamot)",
        tagline: "Governing the Magical World",
        topic: "Debating the Legitimacy of the Ministry's Emergency Decrees in Response to Rising Dark Magic Threats.",
        iconUrl: 'https://i.ibb.co/Kcw4R68L/hat.png',
        category: 'Creative'
    },
    {
        name: "Marvel Committee",
        tagline: "Debating Cosmic Ethics",
        topic: "Was Thanos' Snap Justified in the Context of Overpopulation and Resource Scarcity?",
        iconUrl: 'https://i.ibb.co/5WvZ8BcL/MARVEL.png',
        category: 'Creative'
    }
];


const CommitteeCard = ({ committee, index }: { committee: Committee, index: number }) => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
    const { iconUrl, category } = committee;

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
                    <img src={iconUrl} alt={`${committee.name} icon`} className="w-full h-full object-contain transition-all duration-300 group-hover:invert" />
                </div>
                <span className="text-xs font-bold text-green-800 uppercase tracking-wider bg-green-100 px-3 py-1 rounded-full">
                    {category}
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
                From global crises to magical decrees, find the committee that challenges and excites you.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {COMMITTEES_DATA.map((committee, index) => (
                <React.Fragment key={committee.name}>
                    <CommitteeCard committee={committee} index={index} />
                </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommitteesPage;