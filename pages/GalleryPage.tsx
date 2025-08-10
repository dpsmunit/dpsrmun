import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon, ExpandIcon } from '../components/icons/Icons';
import useWindowSize from '../hooks/useWindowSize';

interface GalleryImage {
    src: string;
    caption: string;
    tags: string[];
}

const GALLERY_IMAGES: GalleryImage[] = [
    { src: 'https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg', caption: 'Opening ceremony setting the stage for days of intense debate.', tags: ['Ceremony'] },
    { src: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg', caption: 'Delegates collaborating during an unmoderated caucus to draft resolutions.', tags: ['Session'] },
    { src: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg', caption: 'A passionate delegate delivering a speech during the General Speakers List.', tags: ['Session'] },
    { src: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg', caption: 'Moments of camaraderie and networking between sessions.', tags: ['Social'] },
    { src: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg', caption: 'Recognizing excellence and diplomacy during the awards ceremony.', tags: ['Ceremony'] },
    { src: 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg', caption: 'The Executive Board guiding the committee proceedings.', tags: ['Session'] },
    { src: 'https://images.pexels.com/photos/355321/pexels-photo-355321.jpeg', caption: 'A wide view of a committee in full session.', tags: ['Session'] },
    { src: 'https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg', caption: 'The delegate placard, a symbol of representation and voice.', tags: ['Session'] },
    { src: 'https://images.pexels.com/photos/5676744/pexels-photo-5676744.jpeg', caption: 'A crucial vote that could change the course of the debate.', tags: ['Session'] },
    { src: 'https://images.pexels.com/photos/1526813/pexels-photo-1526813.jpeg', caption: 'An inspiring keynote address from a distinguished guest.', tags: ['Ceremony'] },
];


const allTags = ['All', ...Array.from(new Set(GALLERY_IMAGES.flatMap(img => img.tags)))];


const GalleryCard: React.FC<{
    image: GalleryImage;
    onClick: () => void;
}> = ({ image, onClick }) => {
    
    return (
        <div
            className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-mun-green/30 cursor-pointer group relative transition-all duration-300 ease-out will-change-transform"
            onClick={onClick}
        >
            <img
                src={image.src}
                alt={image.caption}
                loading="lazy"
                className="w-full h-auto object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                {image.tags && image.tags.length > 0 &&
                    <span className="inline-block bg-mun-green text-white text-xs font-bold uppercase px-2 py-1 rounded mb-2">{image.tags[0]}</span>
                }
                <p className="font-semibold text-base text-white drop-shadow-md truncate">{image.caption}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-black/40">
                <ExpandIcon className="w-12 h-12 text-white/90 drop-shadow-lg" />
            </div>
        </div>
    );
};

const Lightbox: React.FC<{
    images: GalleryImage[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    isMobile: boolean;
}> = ({ images, currentIndex, onClose, onNext, onPrev, isMobile }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        setIsImageLoading(true);
    }, [currentIndex]);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(onClose, 300);
    }, [onClose]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleClose, onNext, onPrev]);

    if (currentIndex < 0 || currentIndex >= images.length) {
        handleClose();
        return null;
    }
    
    const currentImage = images[currentIndex];

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleClose}
        >
             <style>{`
                @keyframes lightbox-enter {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-lightbox-enter { animation: lightbox-enter 0.3s ease-out forwards; }
                
                @keyframes aurora-flow {
                    0% { transform: translate(-20%, -20%) rotate(0deg); }
                    100% { transform: translate(20%, 20%) rotate(360deg); }
                }
                .aurora-1, .aurora-2 {
                    position: absolute;
                    width: 150vw;
                    height: 150vh;
                    mix-blend-mode: screen;
                    filter: blur(100px);
                    will-change: transform;
                }
                .aurora-1 {
                    top: -50%; left: -50%;
                    background: radial-gradient(circle, rgba(29, 185, 84, 0.25), transparent 60%);
                    animation: aurora-flow 30s infinite linear alternate;
                }
                .aurora-2 {
                    bottom: -50%; right: -50%;
                    background: radial-gradient(circle, rgba(16, 185, 129, 0.2), transparent 60%);
                    animation: aurora-flow 40s infinite linear alternate-reverse;
                }
            `}</style>
            
            <div className="absolute inset-0 bg-black/80 backdrop-blur-lg overflow-hidden -z-10">
                <div className="aurora-1" />
                <div className="aurora-2" />
            </div>

            <button
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white/70 hover:text-white transition-all duration-300 hover:scale-110 z-50"
                onClick={handleClose}
                aria-label="Close"
            >
                <CloseIcon className="w-8 h-8" />
            </button>

            {!isMobile && (
                <>
                    <button
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white/80 hover:text-white transition-all duration-300 transform hover:scale-105 z-50"
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        aria-label="Previous image"
                    >
                        <ChevronLeftIcon className="w-8 h-8" />
                    </button>
                    <button
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white/80 hover:text-white transition-all duration-300 transform hover:scale-105 z-50"
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        aria-label="Next image"
                    >
                        <ChevronRightIcon className="w-8 h-8" />
                    </button>
                </>
            )}
            
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-16" onClick={(e) => e.stopPropagation()}>
                <div className="relative animate-lightbox-enter flex-grow flex items-center justify-center w-full">
                    {isImageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                        </div>
                    )}
                    <img
                        key={currentIndex}
                        src={currentImage.src}
                        alt={currentImage.caption}
                        onLoad={() => setIsImageLoading(false)}
                        className={`max-w-full max-h-[75vh] md:max-h-[80vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                    />
                </div>
                <div className={`w-full p-4 transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="bg-black/20 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg max-w-2xl mx-auto">
                        <p className="text-base md:text-lg font-medium text-white text-center drop-shadow-md">{currentImage.caption}</p>
                    </div>
                    {isMobile && (
                        <div className="flex justify-center items-center gap-8 mt-4">
                            <button
                                className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white/80 hover:text-white transition-all duration-300 transform hover:scale-105 z-50"
                                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                                aria-label="Previous image"
                            >
                                <ChevronLeftIcon className="w-8 h-8" />
                            </button>
                            <button
                                className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white/80 hover:text-white transition-all duration-300 transform hover:scale-105 z-50"
                                onClick={(e) => { e.stopPropagation(); onNext(); }}
                                aria-label="Next image"
                            >
                                <ChevronRightIcon className="w-8 h-8" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const GalleryPage: React.FC = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState('All');
    const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(GALLERY_IMAGES);
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
    const { width } = useWindowSize();
    const isMobile = width < 768;

    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredImages(GALLERY_IMAGES);
        } else {
            setFilteredImages(GALLERY_IMAGES.filter(img => img.tags.includes(activeFilter)));
        }
    }, [activeFilter]);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    }, []);

    const nextImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
    }, [filteredImages.length]);

    const prevImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    }, [filteredImages.length]);

    return (
        <>
            <div className="relative bg-gray-50 py-24 sm:py-32 border-b border-gray-200 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#1DB954 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
                <div ref={ref} className={`relative z-10 container mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-mun-dark-text">
                            Moments from <span className="text-mun-green">MUN 2024</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Relive the energy, debate, and diplomacy of our previous conference.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveFilter(tag)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 border ${
                                    activeFilter === tag 
                                    ? 'bg-mun-green text-white border-mun-green shadow-md' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
                        {filteredImages.map((image, index) => (
                            <GalleryCard
                                key={image.src}
                                image={image}
                                onClick={() => openLightbox(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {lightboxOpen && (
                <Lightbox
                    images={filteredImages}
                    currentIndex={currentImageIndex}
                    onClose={closeLightbox}
                    onNext={nextImage}
                    onPrev={prevImage}
                    isMobile={isMobile}
                />
            )}
        </>
    );
};

export default GalleryPage;