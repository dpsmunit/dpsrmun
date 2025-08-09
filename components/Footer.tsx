import React from 'react';
import { assetPaths } from '../assets';

const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-mun-green transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
        {children}
    </a>
);

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.796 0 1.441-.645 1.441-1.44s-.645-1.44-1.441-1.44z"/>
    </svg>
);

const GmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
    </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

const Footer = () => {
  return (
    <footer className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-mun-green">DPSR MUN 2025</h3>
                    <p className="text-gray-600">The Future of Global Discourse</p>
                </div>
                <div className="flex gap-6">
                    <SocialIcon href="https://www.instagram.com/dpsmun.haridwar/">
                        <InstagramIcon />
                    </SocialIcon>
                    <SocialIcon href="mailto:dpsrmun2024@gmail.com">
                        <GmailIcon />
                    </SocialIcon>
                  
                   
                </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
                <div className="flex justify-center items-center gap-4 mb-6">
                    <p className="text-sm font-semibold">In association with</p>
                    <img src={assetPaths.piccoloLogo} alt="Piccolo Events" className="h-10" />
                </div>
                <p>&copy; {new Date().getFullYear()} DPSR MUN. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;