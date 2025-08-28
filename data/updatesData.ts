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
    id: slugify('IP - Now Open For All!'),
    title: 'IP - Now Open For All!',
    date: 'August 26, 2025',
    summary: 'The International Press (IP) is officially open to everyone this year. No interviews required — just step in and be part of the team. Grab this chance to showcase your creative skills!',
    tags: ['COMMITTEES'], 
  },
 // {
 //   id: slugify('Time for an Arcade!'),
 //   title: 'Time for an Arcade!',
 //   date: 'August 26, 2025',
 //   summary: 'An arcade zone by Time Zone is coming to this year’s MUN! Enjoy new games and arcades during breaks and the social night. Relax, recharge, and have fun with friends between sessions.',
 //   tags: ['ENTERTAINMENT'],
 //   content: `This year, we’re leveling up your MUN experience with an exclusive Time Zone arcade area. 
 //             From thrilling arcade machines to exciting games, it’s the perfect spot to unwind after intense committee sessions. 
 //             Whether you want to compete with friends, try something new, or simply recharge your energy, the arcade will be open during breaks and the social night. 
 //             Don’t miss out on the chance to make memories beyond debate and diplomacy—because MUN isn’t just about resolutions, it’s about the fun too!` 
 // },
  {
    id: slugify('Beginning of Training Sessions!'),
    title: 'Beginning of Training Sessions!',
    date: 'August 26, 2025',
    summary: 'Training sessions for all committees officially began on 26th August 2025. These sessions are designed to prepare delegates with essential insights and strategies. Set a reminder and make sure not to miss these fruitful learning opportunities!',
    tags: ['COMMITTEES'],
    content: `Our training sessions are tailored to help delegates gain a deeper understanding of their respective committees, agendas, and debating styles. 
              From mastering Rules of Procedure to enhancing research and public speaking, these sessions are your gateway to becoming a confident and well-prepared delegate. 
              Attending them will not only sharpen your skills but also give you an edge during committee proceedings. Make the most of these opportunities to learn, interact, and grow before the big conference begins!`
  },
  {
    id: slugify('HelpDesks!'),
    title: 'HelpDesks!',
    date: 'August 26, 2025',
    summary: 'MUN Helpdesks are now available in the school corridors of your wing. They’ll be open during lunch and 5th period to guide you. Reach out to OC members anytime — we’re here to help!',
    tags: ['FAQs'],
    content: `To make your MUN journey smoother, dedicated Helpdesks are being set up in the corridors of our wing. 
              Whether you’re confused about rules, procedures, agendas, or simply want clarity on how MUN works, our OC members will be available to guide you. 
              The helpdesks will be functional during lunch and 5th period, so feel free to stop by with your queries. 
              No question is too small — we’re here to ensure you feel confident, prepared, and ready for the conference ahead!` 
  },
  {
    id: slugify('Social Night Surprise Awaits!'),
    title: 'Social Night Surprise Awaits!',
    date: 'August 26, 2025',
    summary: 'Get ready — a world-class artist is coming to this year’s MUN Social Night! An exclusive performance awaits all delegates. Stay tuned as we reveal who’s taking the stage soon.',
    tags: ['SOCIALS'],
    content: `This year’s MUN Social Night promises to be bigger and better than ever. 
              We’re thrilled to announce that a world-class artist will be performing exclusively for our delegates in a special live show. 
              It’s more than just a performance — it’s an experience designed to make this MUN truly unforgettable. 
              Keep an eye out for upcoming updates, as we’ll soon unveil the name of the artist set to light up the stage. 
              Get ready to celebrate, dance, and create memories that last well beyond the conference!` 
  },
  {
    id: slugify('New Committees!'),
    title: 'New Committees!',
    date: 'August 26, 2025',
    summary: 'We’re thrilled to announce the addition of three exciting new committees! This year, we’re introducing unconventional and unique choices to broaden the MUN experience. The new committees are: NBA, Anime, and Formula 1.',
    tags: ['COMMITTEES'],
    content: `Get ready for a fresh wave of debate and creativity with our newly added committees!
              Explore unique agendas that break the conventional MUN mold.
                  **Formula 1 (F1)** – Assessing the sporting, political, and commercial ramifications of Lewis Hamilton’s departure from Mercedes.
                  **NBA** – Relocating Underperforming NBA Franchises to New Cities.
                  **Anime** – Deliberation on the eradication of non-sorcerers and the rise of sorcerer supremacy in Suguru Geto’s ideology.
              For detailed information, head to the [**Committees Page!**](https://dpsrmun.com/#committees) and refer to the info given.`
  },
//  {
//    id: slugify('#'),
//    title: '#',
//    date: 'August 26, 2025',
//    summary: '',
//    tags: [''],
//    content: `` 
//  },
];

export const getUpdateDetailsById = (id: string): UpdateItem | undefined => {
  return UPDATES_DATA.find(update => update.id === id);
};
