import React, { useRef, useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { DownloadIcon } from '../components/icons/Icons';
import useWindowSize from '../hooks/useWindowSize';

const EbookPage: React.FC = () => {
    const { ref: headerRef, isVisible } = useScrollAnimation<HTMLDivElement>();
    const { height: windowHeight } = useWindowSize();
    const [viewerHeight, setViewerHeight] = useState<number | undefined>();
    const pdfPath = '/files/dpsr-mun-guide.pdf';

    useEffect(() => {
        const calculateHeight = () => {
            if (headerRef.current) {
                // Get the position of the bottom of the header relative to the viewport
                const headerBottomPosition = headerRef.current.getBoundingClientRect().bottom;
                
                // Define the padding/margins for the main content area
                const mainContentPaddingTop = 32; // Corresponds to pt-8 on <main>
                const pageBottomMargin = 64; // Corresponds to pb-16 on <main>

                // Calculate the available height for the PDF viewer
                const availableHeight = window.innerHeight - headerBottomPosition - mainContentPaddingTop - pageBottomMargin;
                
                // Set the height, ensuring it's not smaller than a reasonable minimum
                setViewerHeight(Math.max(600, availableHeight));
            }
        };
        
        // Run calculation after a short delay to ensure layout is stable, especially after animations
        const timer = setTimeout(calculateHeight, 50);
        return () => clearTimeout(timer);

    }, [windowHeight, isVisible, headerRef]);

    return (
        <div className="bg-mun-white">
            <header 
                ref={headerRef}
                className={`relative bg-mun-white border-b border-gray-200 pt-24 pb-16 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#1DB954 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
                <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-mun-dark-text">
                        The Official <span className="text-mun-green">Guidebook</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Your comprehensive guide to the DPSR MUN 2025 conference. All the rules, procedures, and tips you need to succeed are right here.
                    </p>
                    <a
                        href={pdfPath}
                        download="DPSR_MUN_2025_Guidebook.pdf"
                        className="mt-8 inline-flex items-center gap-3 px-8 py-3 bg-mun-green text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                    >
                        <DownloadIcon className="w-5 h-5" />
                        Download Guide
                    </a>
                </div>
            </header>

            <main className="pt-8 pb-16">
                <div className="container mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
                        <embed
                            src={pdfPath}
                            type="application/pdf"
                            className="w-full"
                            style={{ height: viewerHeight ? `${viewerHeight}px` : '80vh' }}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EbookPage;
