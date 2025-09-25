export interface NewsletterItem {
  src: string;
  title: string;
  date: string;
  description: string;
  author?: string;
}

export const NEWSLETTER_DATA: NewsletterItem[] = [
  {
    src: '/newsletter/newsletter_1.jpg',  
    title: 'Dress Code & Diplomacy',
    date: 'October 2025 Edition',
    description: 'A deep dive into the importance of diplomatic attire and conduct at DPSR MUN 2.0.',
    author: 'Deepshikha'
  },
  {
    src: '/newsletter/newsletter_2.jpg', 
    title: 'The Power of MUNs',
    date: 'September 2025 Edition',
    description: 'Exploring how MUNs shape young voices into global changemakers and build essential life skills.',
    author: 'Anukriti'
  },
  {
    src: '/newsletter/newsletter_3.jpg',  
    title: 'Country Allotments Announced',
    date: 'September 2025 Edition',
    description: 'The moment delegates have been waiting for! Country allotments are officially released.',
    author: 'Daksh tyagi'
  },
];
