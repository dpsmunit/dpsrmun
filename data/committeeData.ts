import type { CommitteeDetail } from '../types';

const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')       // Replace spaces with -
        .replace(/[()]/g, '')       // Remove parentheses
        .replace(/[^\w-]+/g, '')    // Remove all non-word chars except -
        .replace(/--+/g, '-')       // Replace multiple - with single -
        .replace(/^-+/, '')         // Trim - from start of text
        .replace(/-+$/, '');        // Trim - from end of text
};

export const COMMITTEE_DATA: CommitteeDetail[] = [
    {
        id: slugify("United Nations General Assembly (UNGA)"),
        name: "United Nations General Assembly (UNGA)",
        tagline: "The Global Consensus Builder",
        topic: "Deliberation on the Global Governance of Artificial Intelligence and its Impact on Sovereignty and Human Rights.",
        iconUrl: '/images/un.png',
        category: 'UN General',
        about: "UNGA experience teaches you to build consensus among 193+ diverse nations, making it the ultimate training ground for international diplomacy. The AI governance topic positions you at the forefront of the most critical technology policy debates shaping our future.",
        agendaPoints: ["Defining digital sovereignty in the age of AI.", "Establishing ethical guidelines for AI development and deployment.", "Protecting human rights from algorithmic bias.", "Creating a framework for international data sharing and AI safety."],
        resources: [{ title: 'UN Charter', url: 'https://www.un.org/en/about-us/un-charter', description: 'Guiding principles for international peacekeeping'}],
        members: []
    },
    {
        id: slugify("United Nations Security Council (UNSC)"),
        name: "United Nations Security Council (UNSC)",
        tagline: "The Crisis Leadership Laboratory",
        topic: "Addressing the Threats to Global Peace Arising from AI-Enhanced Military Drones and Autonomous Weapons in Ongoing Conflicts.",
        iconUrl: '/images/idk.png',
        category: 'UN Security',
        about: "UNSC membership represents the pinnacle of MUN achievement. This committee simulates the highest level of international decision-making where delegates must make binding decisions affecting global peace and security under extreme time pressure.",
        agendaPoints: ["Analyzing the current deployment of AI-drones in conflict zones.", "Establishing a framework for the regulation of Lethal Autonomous Weapons Systems (LAWS).", "Debating the implications of AI on the future of warfare and international stability.", "Developing protocols for accountability for autonomous weapon actions."],
        resources: [{ title: 'UN Charter', url: 'https://www.un.org/en/about-us/un-charter', description: 'Guiding principles for international peacekeeping'}],
        members: []
    },
    
    {
        id: slugify("United Nations Human Rights Council (UNHRC)"),
        name: "United Nations Human Rights Council (UNHRC)",
        tagline: "The Justice and Accountability Specialist",
        topic: "Deliberation on Alleged Human Rights Violations Arising from the Iran-Israel Escalation, Including Civilian Targeting, Use of Proxy Forces, and Internet Blackouts.",
        iconUrl: '/images/unhc.png',
        category: 'Human Rights',
        about: "UNHRC provides intensive training in human rights law application within active conflict situations, representing some of the most complex moral and legal challenges in contemporary international relations.",
        agendaPoints: ["Investigating claims of civilian targeting and disproportionate use of force.", "Addressing the use of proxy forces and their impact on regional stability.", "Examining the effects of internet blackouts on freedom of expression.", "Proposing mechanisms for accountability and transitional justice."],
        resources: [{ title: 'UN Charter', url: 'https://www.un.org/en/about-us/un-charter', description: 'Guiding principles for international peacekeeping'}],
        members: []
    },
    {
        id: slugify("United Nations Commission on the Status of Women (UNCSW)"),
        name: "United Nations Commission on the Status of Women (UNCSW)",
        tagline: "The Digital Equity Pioneer",
        topic: "Bridging the Digital Gender Divide: Ensuring Equal Access to Technology and Online Safety for Women and Girls.",
        iconUrl: '/images/women.png',
        category: 'Social Justice',
        about: "UNCSW focuses on the fastest-growing equality challenge of the digital age, combining gender policy expertise with technology sector understanding that is increasingly crucial across all industries.",
        agendaPoints: ["Promoting digital literacy among women in developing nations.", "Combating gender-based online violence and harassment.", "Analyzing the role of technology in economic empowerment for women.", "Ensuring gender-responsive design in new technologies."],
        resources: [{ title: 'UN Charter', url: 'https://www.un.org/en/about-us/un-charter', description: 'Guiding principles for international peacekeeping'}],
        members: []
    },
    {
        id: slugify("United Nations International Children's Emergency Fund (UNICEF)"),
        name: "United Nations International Children's Emergency Fund (UNICEF)",
        tagline: "The Humanitarian Crisis Expert",
        topic: "Addressing the Escalating Humanitarian Crisis: Ensuring the Protection, Survival, and Rights of Children in the Gaza Strip.",
        iconUrl: '/images/uncef.png',
        category: 'Humanitarian',
        about: "UNICEF provides intensive training in humanitarian crisis management with focus on the most vulnerable populations, representing the highest stakes international emergency response work.",
        agendaPoints: ["Securing safe and unimpeded humanitarian access.", "Establishing child-friendly spaces and educational programs in crisis zones.", "Addressing acute malnutrition and urgent health needs.", "Implementing psycho-social support for children affected by conflict."],
        resources:[{ title: 'UN Charter', url: 'https://www.un.org/en/about-us/un-charter', description: 'Guiding principles for international peacekeeping'}],
        members: []
    },
    {
        id: slugify("United Nations Economic and Social Council (ECOSOC)"),
        name: "United Nations Economic and Social Council (ECOSOC)",
        tagline: "The Global Economy Architect",
        topic: "Reforming Global Debt Relief Mechanisms for Developing Nations in the Aftermath of the COVID-19 and Climate Crises.",
        iconUrl: '/images/idk.png',
        category: 'Economics',
        about: "ECOSOC addresses the fundamental economic challenges defining the post-pandemic global recovery, combining international economics expertise with sustainable development knowledge crucial for future career success.",
        agendaPoints: ["Analyzing the impact of sovereign debt on sustainable development goals.", "Proposing new frameworks for international debt restructuring.", "Discussing the role of climate finance in debt-for-nature swaps.", "Evaluating the performance of existing debt relief initiatives like the DSSI."],
        resources: [{ title: 'UN Charter', url: 'https://www.un.org/en/about-us/un-charter', description: 'Guiding principles for international peacekeeping'}],
        members: []
    },
    {
        id: slugify("United Nations Environment Programme (UNEP)"),
        name: "United Nations Environment Programme (UNEP)",
        tagline: "The Planetary Solutions Expert",
        topic: "Combating Plastic Pollution in Oceans through Binding Global Agreements.",
        iconUrl: '/images/ped.png',
        category: 'Environment',
        about: "UNEP addresses the planet's most urgent environmental crisis while teaching binding treaty negotiation skills that represent the highest level of international environmental diplomacy.",
        agendaPoints: ["Negotiating the terms of a legally binding international treaty on plastics.", "Establishing national targets for reducing plastic production and consumption.", "Promoting circular economy models for plastics.", "Addressing the full lifecycle of plastics, from production to disposal and remediation."],
        resources: [{ title: 'UN Charter', url: 'https://www.un.org/en/about-us/un-charter', description: 'Guiding principles for international peacekeeping'}],
        members: []
    },
    {
        id: slugify("World Health Organisation (WHO)"),
        name: "World Health Organisation (WHO)",
        tagline: "The Global Health Systems Expert",
        topic: "Addressing the Global Health Crisis: Mitigating Disease Outbreaks and Health System Vulnerabilities in the Face of Reduced WHO Funding.",
        iconUrl: '/images/who.png',
        category: 'Global Health',
        about: "WHO provides the most relevant post-COVID committee experience, combining pandemic preparedness expertise with health system management skills that are crucial for healthcare career advancement and global health security.",
        agendaPoints: ["Developing strategies for pandemic preparedness with limited resources.", "Strengthening primary healthcare systems in vulnerable nations.", "Exploring innovative financing models for global health security, like public-private partnerships.", "Prioritizing responses to potential future disease outbreaks (Disease X)."],
        resources: [{ title: 'UN Charter', url: 'https://www.un.org/en/about-us/un-charter', description: 'Guiding principles for international peacekeeping'}],
        members: []
    },
    {
        id: slugify("Lok Sabha"),
        name: "Lok Sabha",
        tagline: "The Democratic Governance Specialist",
        topic: "Deliberation upon electoral reforms with special emphasis to one nation one election.",
        iconUrl: '/images/loksabha.png',
        category: 'Indian Politics',
        about: "Lok Sabha provides intensive training in parliamentary procedure and democratic governance while addressing one of India's most significant constitutional reforms affecting the world's largest democracy.",
        agendaPoints: ["Analyzing the logistical and financial implications of simultaneous elections.", "Debating the constitutional amendments required for implementation.", "Assessing the potential impact on federalism and regional parties.", "Discussing voter behavior and governance stability under a new system."],
        resources: [{ title: 'The Constitution of India', url: 'https://www.india.gov.in/my-government/constitution-india', description: 'Foundation of rights, duties and governance structure'}],
        members: []
    },
    {
        id: slugify("All India Political Parties Meet (AIPPM)"),
        name: "All India Political Parties Meet (AIPPM)",
        tagline: "The Consensus Building Master",
        topic: "Deliberation upon secularism in India in light of recent events.",
        iconUrl: '/images/aippm.png',
        category: 'Indian Politics',
        about: "AIPPM simulates the most complex political negotiation in contemporary India, requiring advanced consensus building skills among diverse ideological perspectives on the most sensitive constitutional issue.",
        agendaPoints: ["Examining the Uttarakhand UCC Bill as a potential national model.", "Discussing the balance between uniform laws and the right to freedom of religion.", "Addressing the concerns and suggestions of various communities and stakeholders.", "Building a political consensus for a potential nationwide UCC."],
        resources: [{ title: 'Constituent Assembly Debates on UCC', url: 'https://www.constitutionofindia.net/constitution_assembly_debates', description: 'Assembly that shaped soverign Indian republic'}],
        members: []
    },
    {
        id: slugify("Continuous Crisis Committee (CCC)"),
        name: "Continuous Crisis Committee (CCC)",
        tagline: "The Ultimate Strategic Challenge",
        topic: "Classified (Real-time evolving crisis requiring adaptive response).",
        iconUrl: '/images/idk.png',
        category: 'Crisis',
        about: "CCC represents the ultimate test of MUN skills, simulating real-world crisis management where situations evolve rapidly and delegates must demonstrate leadership under extreme uncertainty and time pressure.",
        agendaPoints: ["Responding to real-time crisis updates.", "Managing resources and strategic assets through directives.", "Engaging in backroom diplomacy and high-stakes negotiations.", "Adapting national and coalition strategies as the situation evolves."],
        resources: [{ title: 'Crisis Case Studies', url: 'https://www.prio.org/research/topics/conflict-trends', description: 'Crisis Consensus Debate'}],
        members: []
    },
    {
        id: slugify("International Court of Justice (ICJ)"),
        name: "International Court of Justice (ICJ)",
        tagline: "The Legal Excellence Laboratory",
        topic: "Discussing Allegations of Violations of International Law in the context of Russia-Ukraine War.",
        iconUrl: '/images/int.png',
        category: "Int'l Law",
        about: "ICJ provides the highest level of legal training available in MUN, focusing on the world's most significant contemporary international law case with implications for global justice systems.",
        agendaPoints: ["Evaluating claims related to the violation of the Genocide Convention.", "Analyzing legal arguments concerning sovereignty, use of force, and territorial integrity.", "Assessing evidence presented by both parties to the court.", "Deliberating on potential reparations and legal remedies under international law."],
        resources: [{ title: 'ICJ Statute', url: 'https://www.icj-cij.org/statute', description: "Defines Internation Court of Justice's Jurisdiction"}],
        members: []
    },
    {
        id: slugify("Board of Control for Cricket in India (BCCI)"),
        name: "Board of Control for Cricket in India (BCCI)",
        tagline: "The Sports Governance Expert",
        topic: "Regulating the Growing Commercial Influence of the IPL on National Team Selections and Schedules.",
        iconUrl: '/images/bcci.png',
        category: 'Sports Governance',
        about: "BCCI provides unique training in sports administration combining commercial interests with sporting excellence while managing stakeholder relationships in India's most popular and economically significant sport.",
        agendaPoints: ["Balancing player workload between the IPL and international duties.", "Creating transparent policies for national team selection, free from commercial influence.", "Managing conflicts of interest for players, coaches, and officials involved in both formats.", "Ensuring the primacy of international cricket in the yearly calendar."],
        resources: [{ title: 'BCCI', url: 'https://www.bcci.tv', description: "India's premier cricket adminstrative governing body"}],
        members: []
    },
    
    {
        id: slugify("IPL Auction Committee"),
        name: "IPL Auction Committee",
        tagline: "The Strategic Resource Master",
        topic: "Bidding (Live player auction simulation requiring real-time strategic decision-making).",
        iconUrl: '/images/ipl.png',
        category: 'Sports Auction',
        about: "The IPL Auction provides the most interactive and high-pressure committee experience, teaching strategic resource allocation and competitive decision-making in dynamic, real-time environments.",
        agendaPoints: ["Developing a winning auction strategy based on team needs and player analysis.", "Managing a budget under intense competitive pressure.", "Valuating players based on performance, potential, and market dynamics.", "Adapting to real-time bidding wars and unexpected player acquisitions."],
        resources: [{ title: 'Player Auction Rules', url: 'https://www.iplt20.com/auction', description: 'Auction rules ensure fair team building'}, { title: 'Previous Auction Data', url: 'https://www.cricbuzz.com/cricket-series/ipl-2024/auction', description: 'Hightlights trends, bids, team spending patterns'}],
        members: []
    },
    
    {
        id: slugify("FIFA Committee"),
        name: "FIFA Committee",
        tagline: "Reforming Global Sports Governance",
        topic: "Addressing Corruption and Ensuring Fair Hosting Rights for Future FIFA World Cups.",
        iconUrl: 'https://static.thenounproject.com/png/world-cup-icon-1771335-512.png',
        category: 'Sports Governance',
        about: "The FIFA committee provides a critical platform to address systemic corruption in global sports, offering delegates the chance to design robust anti-corruption mechanisms and ensure transparency in one of the world's most influential organizations.",
        agendaPoints: ["Designing a transparent and accountable bidding process for host nations.", "Implementing stronger anti-corruption and ethics regulations within FIFA's structure.", "Addressing human rights and labor standards concerns in host countries.", "Ensuring the financial and environmental sustainability of future World Cups."],
        resources: [{ title: 'FIFA Governance Regulations', url: 'https://www.icsspe.org/system/files/FIFA%20Governance%20Regulations_0.pdf', description: 'Ensures transparency, integrity in football management'}],
        members: []
    },
    
    {
        id: slugify("International Press"),
        name: "International Press",
        tagline: "Shaping the Narrative of Global Events",
        topic: "Covering and Reporting on the Ongoing Global Crises with Special Focus on Media Ethics and Responsible Journalism.",
        iconUrl: '/images/it.png',
        category: 'Media',
        about: "The International Press is the nexus of information and diplomacy, offering delegates a unique role in observing, analyzing, and shaping the narrative of the entire conference, developing critical media literacy and ethical reporting skills.",
        agendaPoints: ["Maintaining journalistic objectivity while covering emotive and polarizing topics.", "Combating the spread of misinformation and disinformation within committee debates.", "Balancing the public's right to know with national security concerns.", "The ethics of reporting on crises and vulnerable populations without exploitation."],
        resources: [{ title: 'Introduction To IP', url: 'https://www.youtube.com/watch?v=1RUuVEKJ5u0', description: 'Journalism, Videography, Photography, Caricature'}],
        members: []
    },
    
    {
        id: slugify("Harry Potter Committee (Wizengamot)"),
        name: "Harry Potter Committee (Wizengamot)",
        tagline: "Governing the Magical World",
        topic: "Debating the Legitimacy of the Ministry's Emergency Decrees in Response to Rising Dark Magic Threats.",
        iconUrl: '/images/hat.png',
        category: 'Creative',
        about: "This creative committee uses the beloved world of Harry Potter to explore complex themes of governance, civil liberties, and security, making it an ideal entry point for beginners to learn MUN principles in a fun, imaginative setting.",
        agendaPoints: ["Assessing the balance between security and individual magical liberties.", "Reviewing the classification of 'Dark Magic' and its legal implications.", "Proposing oversight for the Department of Magical Law Enforcement.", "Addressing the rights of non-human magical beings (e.g., house-elves, goblins) during crises."],
        resources: [{ title: 'Hogwarts: A History', url: 'https://harrypotter.fandom.com/wiki/Hogwarts:_A_History', description: 'Historical context of magical governance.' }, { title: 'The International Statute of Secrecy', url: 'https://harrypotter.fandom.com/wiki/International_Statute_of_Wizarding_Secrecy', description: 'The fundamental law governing wizard-muggle relations.' }],
        members: []
    },
    {
        id: slugify("Marvel Committee"),
        name: "Marvel Committee",
        tagline: "Debating Cosmic Ethics",
        topic: "Was Thanos' Snap Justified in the Context of Overpopulation and Resource Scarcity?",
        iconUrl: '/images/marvel.png',
        category: 'Creative',
        about: "Using the dramatic backdrop of the Marvel Cinematic Universe, this committee tackles profound philosophical questions about utilitarianism, resource management, and ethics on a cosmic scale, challenging delegates to defend morally complex positions.",
        agendaPoints: ["Evaluating the ethical framework of utilitarianism versus deontology (individual rights).", "Analyzing the long-term ecological and societal impacts of halving the universe's population.", "Debating alternative solutions to cosmic resource scarcity that could have been implemented.", "Establishing a galactic precedent for handling existential threats without resorting to genocide."],        resources: [{ title: 'World Population Prospects 2024', url: 'https://population.un.org/wpp/', description: 'Global population trends and projections'}],
        members: []
    },
  //  {
  //      id: slugify("F1"),
    //    name: "Formula 1",
   //     tagline: "#",
  //      topic: "#",
   //     iconUrl: '#',
   //     category: 'Sports',
   //     about: "#",
    //    agendaPoints: ["#"],
    //    resources: [{ title: '#', url: '#', description: '#'}],
   //     members: []
  //  },
 //   {
 //       id: slugify("Anime"),
   //     name: "Anime",
    //    tagline: "#",
    //    topic: "#",
     //   iconUrl: '#',
     //   category: 'Media',
     //   about: "#",
    //    agendaPoints: ["#"],
   //     resources: [{ title: '#', url: '#', description: '#'}],
  //      members: []
 //   },
//    {
     //   id: slugify("NBA"),
    //    name: "NBA",
   //     tagline: "#",
   //     topic: "#",
  //      iconUrl: '#',
   //     category: 'Sports',
     //   about: "#",
      //  agendaPoints: ["#"],
     //   resources: [{ title: '#', url: '#', description: '#'}],
   //     members: []
 //   },
    
];

export const getCommitteeDetailsById = (id: string): CommitteeDetail | undefined => {
    return COMMITTEE_DATA.find(committee => committee.id === id);
}
