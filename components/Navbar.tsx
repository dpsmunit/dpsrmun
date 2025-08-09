import React, { useState, useEffect } from 'react';
import { assetPaths } from '../assets';
import { MenuIcon, CloseIcon } from './icons/Icons';

const NavLink = ({ href, children, isActive, onClick }: { href: string; children: React.ReactNode; isActive: boolean; onClick?: () => void }) => (
  <a
    href={href}
    onClick={onClick}
    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-mun-dark-text' : 'text-gray-500 hover:text-mun-dark-text'
    } ${isActive ? 'active-nav' : ''}`}
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children, isActive, onClick }: { href: string; children: React.ReactNode; isActive: boolean; onClick?: () => void }) => (
    <a
      href={href}
      onClick={onClick}
      className={`text-3xl font-bold transition-colors duration-200 ${
        isActive ? 'text-mun-green' : 'text-mun-dark-text hover:text-mun-green'
      }`}
    >
      {children}
    </a>
  );

const Navbar = ({ currentPath }: { currentPath: string }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [isMenuOpen]);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    }

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#committees', label: 'Committees' },
    { href: '#secretariat', label: 'Secretariat' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
    <header className="sticky top-0 z-30 w-full bg-mun-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3" onClick={handleLinkClick}>
          <img src={assetPaths.dpsrmunLogo} alt="DPSR MUN Logo" className="w-12 h-12 rounded-full" />
          <span className="text-xl font-bold text-mun-dark-text hidden sm:inline">DPSR MUN</span>
        </a>
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <React.Fragment key={link.href}>
              <NavLink href={link.href} isActive={currentPath === link.href || (currentPath === '' && link.href === '#home')}>
                {link.label}
              </NavLink>
            </React.Fragment>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)} className="text-mun-dark-text p-2" aria-label="Open menu">
            <MenuIcon className="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Menu Overlay */}
    <div className={`fixed inset-0 z-50 bg-mun-white flex flex-col items-center justify-center transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-7 right-6 text-mun-dark-text p-2" aria-label="Close menu">
            <CloseIcon className="w-8 h-8"/>
        </button>
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <React.Fragment key={link.href}>
              <MobileNavLink
                  href={link.href}
                  isActive={currentPath === link.href || (currentPath === '' && link.href === '#home')}
                  onClick={handleLinkClick}
                  >
                {link.label}
              </MobileNavLink>
            </React.Fragment>
          ))}
        </nav>
    </div>
    </>
  );
};

export default Navbar;