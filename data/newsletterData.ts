export interface NewsletterItem {
  src: string;
  title: string;
  date: string;
  description: string;
  author?: string;
}

export const NEWSLETTER_DATA: NewsletterItem[] = [
  {
    src: '/newsletter/newsletter_1.png',
    title: 'A Rookies Survival Guide',
    date: 'October 2025 Edition',
    description: 'Essential tips for mastering diplomatic attire and conduct at DPSR MUN 2.0.',
    author: 'Masoom Bagare'
  },
  {
    src: '/newsletter/newsletter_2.png',
    title: 'Introducing EB',
    date: 'September 2025 Edition',
    description: 'Meet the Executive Board shaping DPSR MUN into a platform for global voices.',
    author: 'Shristi Jainer'
  },
  {
    src: '/newsletter/newsletter_3.png',
    title: 'A Theme of Two Worlds',
    date: 'September 2025 Edition',
    description: 'Unveiling the exciting country allotments for DPSR MUN 2025.',
    author: 'Sarthak Dewan'
  },
  {
    src: '/newsletter/newsletter_4.jpg',
    title: 'Country Allotments Announcement',
    date: 'September 2025 Edition',
    description: 'Official country assignments revealed for DPSR MUN 2025 delegates.',
    author: 'Daksh Tyagi'
  },
  {
    src: '/newsletter/newsletter_5.jpg',
    title: 'Why MUNs Matter',
    date: 'September 2025 Edition',
    description: 'How MUNs empower young leaders with skills for global change.',
    author: 'Anukriti Chauhan'
  },
  {
    src: '/newsletter/newsletter_6.png',
    title: 'Dress Code',
    date: 'September 2025 Edition',
    description: 'Guide to formal attire for DPSR MUN’s international and Indian committees.',
    author: 'Deepshikha'
  },
  {
    src: '/newsletter/newsletter_7.png',
    title: 'Suguru Geto',
    date: 'September 2025 Edition',
    description: "Exploring Suguru Geto’s :A Sorcerer's Tragic Radical Fall .",
    author: 'Suvigya Vishwakarma'
  },
  {
    src: '/newsletter/newsletter_8.png',
    title: 'Research like a Diplomat',
    date: 'September 2025 Edition',
    description: 'Tips for effective research to excel at DPSR MUN 2025.',
  },
];
