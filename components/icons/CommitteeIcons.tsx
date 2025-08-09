import React from 'react';

// A generic UN icon
export const UNIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

// India - Ashoka Chakra inspired
export const IndiaIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l0 18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l18 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.343 6.343l11.314 11.314" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 6.343l-11.314 11.314" />
    </svg>
);

// Gavel for legal committees
export const GavelIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.412 15.655 5.957 21.11m5.455-5.455 5.455-5.455M11.412 15.655 5.957 10.2m5.455 5.455 5.455 5.455M2.889 8.705l5.454-5.454a2.946 2.946 0 0 1 4.168 0l2.33 2.33a2.946 2.946 0 0 1 0 4.168l-5.454 5.454a2.946 2.946 0 0 1-4.168 0l-2.33-2.33a2.946 2.946 0 0 1 0-4.168Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.25 10.5 5.642-5.642a2.125 2.125 0 0 0-3-3L11.25 7.5" />
    </svg>
);

// Crisis / alert icon
export const CrisisIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

// Sports - trophy icon
export const SportsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9 9 0 0 1 0-18h9a9 9 0 0 1 0 18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 5.25v13.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12c-2.222-2.222-2.222-5.556 0-7.778" />
    </svg>
);

// Creative - sparkle icon
export const CreativeIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456zM16.898 20.573L16.5 21.75l-.398-1.177a3.375 3.375 0 0 0-2.455-2.455L12.75 18l1.177-.398a3.375 3.375 0 0 0 2.455-2.455L16.5 14.25l.398 1.177a3.375 3.375 0 0 0 2.455 2.455l1.177.398-1.177.398a3.375 3.375 0 0 0-2.455 2.455z" />
    </svg>
);

// Press - newspaper icon
export const PressIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
    </svg>
);

export const HealthIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

export const EconomyIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.75A.75.75 0 0 1 3 4.5h.75m0 0H21m-9 12.75h9m-9 3.75h9M3.75 4.5c0-1.036.84-1.875 1.875-1.875h13.5c1.036 0 1.875.84 1.875 1.875v13.5c0 1.036-.84 1.875-1.875-1.875h-13.5A1.875 1.875 0 0 1 3.75 18v-13.5z" />
    </svg>
);

export const GenderIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.43 2.43c-1.105 0-2.135-.84-2.43-1.95a2.25 2.25 0 0 1 .328-2.257M10.875 6.125a3 3 0 0 1 5.78-1.128 2.25 2.25 0 0 0 2.43-2.43c1.105 0 2.135.84 2.43 1.95a2.25 2.25 0 0 0-.328 2.257M9 12.75a3 3 0 0 0-3-3m3 3a3 3 0 0 1-3-3m3 3v3.75m-3-3.75H6m9 3.75a3 3 0 0 0 3-3m-3 3a3 3 0 0 1 3-3m-3 3V9m3 3.75h3.75m-3.75-3.75V9m0-3.75h3.75M9 12.75a3 3 0 0 1-3-3m3 3h3.75m-3.75-3.75a3 3 0 0 0-3-3m3 3V9" />
    </svg>
);

export const EnvironmentIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path d="M11.9994 13.0734C10.2364 12.8344 8.8114 11.2914 8.8114 9.42337C8.8114 7.29437 10.5984 5.50637 12.7284 5.50637C14.1524 5.50637 15.3994 6.26237 16.1014 7.33337" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5.53125 10.219C3.96325 11.393 2.99925 13.21 2.99925 15.263C2.99925 18.99 5.95925 22 9.68725 22C11.5543 22 13.2353 21.196 14.4233 19.912" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.4688 13.781C20.0368 12.607 21.0008 10.79 21.0008 8.737C21.0008 5.01 18.0408 2 14.3128 2C12.4457 2 10.7647 2.804 9.57675 4.088" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
);

export const ChildrenIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9 10.5h.008v.008H9v-.008Zm6 0h.008v.008H15v-.008Z" />
    </svg>
);
