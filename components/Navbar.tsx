
import React, { useState, useEffect, useRef } from 'react';
import { assetPaths } from '../assets';
import { MenuIcon, CloseIcon } from './icons/Icons';

const MobileNavLink = ({ href, children, isActive, onClick }: { href: string; children: React.ReactNode; isActive: boolean; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => (
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

const Navbar = ({ activePath, onNavigate }: { activePath: string; onNavigate: (path: string) => void; }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navContainerRef = useRef<HTMLElement>(null);
    const [underlineStyle, setUnderlineStyle] = useState<{left?: string, width?: string, opacity?: number}>({ opacity: 0 });

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

    const handleDesktopLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        onNavigate(href);
    }
    
    const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMenuOpen(false);
        // Wait for menu to close before navigating
        setTimeout(() => {
            onNavigate(href);
        }, 300);
    }

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#committees', label: 'Committees' },
    //{ href: '#secretariat', label: 'Secretariat' },
    { href: '#gallery', label: 'Gallery' },
   // { href: '#updates', label: 'Updates' },
    { href: '#contact', label: 'Contact' },
  ];
  
  const isLinkActive = (href: string) => {
      // Special case for committees page and its subpages
      if (href === '#committees') {
          return activePath.startsWith('#committees');
      }
      if (href === '#updates') {
          return activePath.startsWith('#updates');
      }
      return activePath === href || (activePath === '' && href === '#home');
  }

  useEffect(() => {
    const timer = setTimeout(() => {
        if (navContainerRef.current) {
            const activeLinkElement = navContainerRef.current.querySelector('.active-nav-link') as HTMLElement;
            if (activeLinkElement) {
                setUnderlineStyle({
                    left: `${activeLinkElement.offsetLeft}px`,
                    width: `${activeLinkElement.offsetWidth}px`,
                    opacity: 1
                });
            } else {
                 setUnderlineStyle(prev => ({ ...prev, opacity: 0 }));
            }
        }
    }, 50);
    return () => clearTimeout(timer);
  }, [activePath]);

  return (
    <>
    <header className="sticky top-0 z-30 w-full bg-mun-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3" onClick={(e) => handleDesktopLinkClick(e, '#home')}>
          <img src={assetPaths.dpsrmunLogo} alt="DPSR MUN Logo" className="w-12 h-12 rounded-full" />
          <span className="text-xl font-bold text-mun-dark-text hidden sm:inline">DPSR MUN</span>
        </a>
        <nav ref={navContainerRef} className="hidden md:flex items-center gap-4 relative">
          {navLinks.map((link) => (
            <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleDesktopLinkClick(e, link.href)}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isLinkActive(link.href) ? 'text-mun-green font-semibold active-nav-link' : 'text-gray-500 hover:text-mun-green'
                }`}
            >
              {link.label}
            </a>
          ))}
          <div
            className="absolute h-[2px] bg-mun-green rounded-full -bottom-px transition-all duration-300 ease-in-out"
            style={underlineStyle}
          />
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
            <MobileNavLink
                key={link.href}
                href={link.href}
                isActive={isLinkActive(link.href)}
                onClick={(e) => handleMobileLinkClick(e, link.href)}
                >
              {link.label}
            </MobileNavLink>
          ))}
        </nav>
    </div>
    </>
  );
};

export default Navbar;
