import type { UpdateItem } from '../types';
import { assetPaths } from '../assets';

// Utility function to generate a slug from a string
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '')     // Remove leading/trailing hyphens
    .replace(/--+/g, '-')        // Replace multiple hyphens with a single hyphen
    || 'unnamed';                // Fallback for empty strings
};

export const UPDATES_DATA: UpdateItem[] = [
  {
    id: slugify('Registrations Now Open for DPSR MUN '),
    title: 'Registrations Now Open for DPSR MUN ',
    date: 'September 1, 2025',
    summary: 'The moment you\'ve been waiting for is here! Registrations for the most anticipated diplomatic event of the year are officially open. Secure your spot and be part of the future of global discourse.',
    
    tags: ['Registration'],
    content: `
## Your Journey Starts Now!

We are thrilled to announce that delegate and delegation registrations for the DPSR Model United Nations 2025 conference are officially open! This is your opportunity to join over 800 ambitious students in a dynamic environment of debate, diplomacy, and direction.

### Why Register Early?
*   **Preferred Committee Allotments:** Early registrants have a higher chance of being assigned their preferred committees.
*   **Ample Preparation Time:** Get a head start on your research and position paper.
*   **Exclusive Updates:** Be the first to receive updates on guest speakers, social events, and more.

Don't miss out on this unparalleled opportunity to enhance your skills, expand your network, and make your voice heard on the global stage.

[**Click here to register now!**](https://docs.google.com/forms/d/e/1FAIpQLSfF3DXAaMn6BHoBQ2oJzXiQXDdcXOXj1I_JXrTgai6mbyPvlw/viewform)
`
  },
  {
    id: slugify('Committee Agendas Revealed'),
    title: 'Committee Agendas Revealed!',
    date: 'August 20, 2025',
    summary: 'The wait is over! We have officially released the full list of committees and their challenging agendas for DPSR MUN 2025. From the UNSC to the Marvel Committee, there\'s an arena for every delegate.',
    tags: ['Committees'],
    content: `
## Prepare for Debate

The academic core of DPSR MUN 2025 has been unveiled. Our Secretariat has meticulously crafted a diverse and challenging set of agendas designed to push your diplomatic and critical thinking skills to their limits.

### Highlights Include:
*   **UNSC:** Addressing the threats of AI-enhanced military drones.
*   **Lok Sabha:** Deliberating upon electoral reforms with an emphasis on "one nation, one election".
*   **Marvel Committee:** Debating the cosmic ethics of Thanos' snap.
*   **And 15 more engaging committees!**

We encourage all prospective delegates to visit the [Committees Page](#committees) to explore the full list and find the topic that ignites your passion. The background guides will be released shortly to help you begin your research.
`
  },
  {
    id: slugify('Keynote Speaker Announcement Ambassador Priya Sharma'),
    title: 'Keynote Speaker: Ambassador Priya Sharma',
    date: 'August 15, 2025',
    summary: 'We are honored to announce that Ambassador Priya Sharma, a renowned diplomat and expert in international relations, will be delivering the keynote address at our opening ceremony. Prepare to be inspired!',
    
    tags: ['Speaker'],
    // No 'content' property, so no "Read More" button will be shown for this item.
  },
];

export const getUpdateDetailsById = (id: string): UpdateItem | undefined => {
  return UPDATES_DATA.find(update => update.id === id);
};
