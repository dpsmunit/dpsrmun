import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon, ExpandIcon, PlayIcon, CameraIcon } from '../components/icons/Icons';
import useWindowSize from '../hooks/useWindowSize';

/**
 * Generates a thumbnail from a video source.
 * @param videoSrc The source URL of the video. Note: This works best for locally hosted videos due to browser CORS policies.
 * @returns A promise that resolves with a base64 Data URL of the thumbnail.
 */
const generateVideoThumbnail = (videoSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.crossOrigin = "anonymous";
        video.preload = 'metadata';
        
        // Hide the video element
        video.style.position = 'fixed';
        video.style.opacity = '0';
        video.style.pointerEvents = 'none';

        video.onloadeddata = () => {
            // Seek to a specific time (e.g., 1 second) to get a representative frame.
            video.currentTime = 1; 
        };
        
        video.onseeked = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                document.body.removeChild(video);
                return reject(new Error('Could not get canvas context.'));
            }

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            document.body.removeChild(video); // Clean up
            resolve(dataUrl);
        };

        video.onerror = (e) => {
            document.body.removeChild(video); // Clean up on error
            reject(new Error(`Video error for source ${videoSrc}: ${e}`));
        };
        
        document.body.appendChild(video);
        video.src = videoSrc;
    });
};


interface GalleryItem {
    type: 'image' | 'video';
    src: string;
    thumbnailSrc?: string;
    caption: string;
    tags: string[];
    credit?: string;
}

const GALLERY_ITEMS = [


  // Images from the 'images' directory
  //{ type: 'image', src: './images/photos/img4.avif', thumbnailSrc: '', caption: 'Delegates doing ', tags: ['Image'] },

  //{ type: 'image', src: './images/photos/img5.jpg', thumbnailSrc: '', caption: 'Event Photo', tags: ['Image'] },
    { type: 'image', src: './images/photos/Loksabha-img-5.avif', thumbnailSrc: '', caption: 'Loksabha', tags: ['Image'] },
    { type: 'image', src: './images/photos/AIPPM-img-1.avif', thumbnailSrc: '', caption: 'AIPPM', tags: ['Image'] },
    { type: 'image', src: './images/photos/AIPPM-img-2.avif', thumbnailSrc: '', caption: 'AIPPM', tags: ['Image'] },
    { type: 'image', src: './images/photos/CCC-img-1.avif', thumbnailSrc: '', caption: 'CCC', tags: ['Image'] },
    { type: 'image', src: './images/photos/CCC-img-2.avif', thumbnailSrc: '', caption: 'CCC', tags: ['Image'] },
    { type: 'image', src: './images/photos/CCC-img-3.avif', thumbnailSrc: '', caption: 'CCC', tags: ['Image'] },
    { type: 'image', src: './images/photos/FIFA-img-1.avif', thumbnailSrc: '', caption: 'FIFA', tags: ['Image'] },
    { type: 'image', src: './images/photos/FIFA-img-2.avif', thumbnailSrc: '', caption: 'FIFA', tags: ['Image'] },
    { type: 'image', src: './images/photos/HP-img-1.avif', thumbnailSrc: '', caption: 'Harry Potter', tags: ['Image'] },
    { type: 'image', src: './images/photos/UNGA-img-1.avif', thumbnailSrc: '', caption: 'UNGA', tags: ['Image'] },
    { type: 'image', src: './images/photos/UNSCW-img-1.avif', thumbnailSrc: '', caption: 'UNCSW', tags: ['Image'] },
    { type: 'image', src: './images/photos/Loksabha-img-1.avif', thumbnailSrc: '', caption: 'Loksabha', tags: ['Image'] },
    { type: 'image', src: './images/photos/Loksabha-img-2.avif', thumbnailSrc: '', caption: 'Loksabha', tags: ['Image'] },
    { type: 'image', src: './images/photos/Loksabha-img-3.avif', thumbnailSrc: '', caption: 'Loksabha', tags: ['Image'] },
    { type: 'image', src: './images/photos/Loksabha-img-4.avif', thumbnailSrc: '', caption: 'Loksabha', tags: ['Image'] },
];







const allTags = ['All', ...Array.from(new Set(GALLERY_ITEMS.flatMap(img => img.tags)))];


const GalleryCard: React.FC<{
    item: GalleryItem;
    onClick: () => void;
}> = ({ item, onClick }) => {
    const [dynamicThumbnail, setDynamicThumbnail] = useState(item.thumbnailSrc);

    useEffect(() => {
        const isLocalVideo = item.type === 'video' && !item.src.startsWith('http');
        if (isLocalVideo && !item.thumbnailSrc) {
            generateVideoThumbnail(item.src)
                .then(setDynamicThumbnail)
                .catch(err => {
                    console.error(`Failed to generate thumbnail for ${item.src}:`, err);
                    // You could set a fallback image here if you want
                    // setDynamicThumbnail('/path/to/fallback-video-icon.png');
                });
        } else {
            setDynamicThumbnail(item.thumbnailSrc);
        }
    }, [item.src, item.type, item.thumbnailSrc]);

    return (
        <div
            className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-mun-green/30 cursor-pointer group relative transition-all duration-300 ease-out will-change-transform"
            onClick={onClick}
        >
            <img
                src={dynamicThumbnail || item.src}
                alt={item.caption}
                loading="lazy"
                className="w-full h-auto object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                {item.tags && item.tags.length > 0 &&
                    <span className="inline-block bg-mun-green text-white text-xs font-bold uppercase px-2 py-1 rounded mb-2">{item.tags[0]}</span>
                }
                <p className="font-semibold text-base text-white drop-shadow-md truncate">{item.caption}</p>
                 {item.credit && (
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-200 opacity-90">
                        <CameraIcon className="w-3.5 h-3.5" />
                        <span>{item.credit}</span>
                    </div>
                )}
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-black/40">
                 {item.type === 'image' 
                    ? <ExpandIcon className="w-12 h-12 text-white/90 drop-shadow-lg" />
                    : <PlayIcon className="w-16 h-16 text-white/90 drop-shadow-lg" />
                }
            </div>
        </div>
    );
};

const Lightbox: React.FC<{
    items: GalleryItem[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    isMobile: boolean;
}> = ({ items, currentIndex, onClose, onNext, onPrev, isMobile }) => {
    const [isMediaLoading, setIsMediaLoading] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        setIsMediaLoading(true);
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

    if (currentIndex < 0 || currentIndex >= items.length) {
        handleClose();
        return null;
    }
    
    const currentItem = items[currentIndex];

    const getGoogleDriveEmbedUrl = (url: string): string | null => {
        const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            return `https://drive.google.com/file/d/${match[1]}/preview`;
        }
        return null;
    };

    const googleDriveEmbedUrl = getGoogleDriveEmbedUrl(currentItem.src);
    const isGoogleDriveVideo = currentItem.type === 'video' && googleDriveEmbedUrl;

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
                    {isMediaLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                        </div>
                    )}
                    {currentItem.type === 'image' ? (
                        <img
                            key={currentIndex}
                            src={currentItem.src}
                            alt={currentItem.caption}
                            onLoad={() => setIsMediaLoading(false)}
                            className={`max-w-full max-h-[75vh] md:max-h-[80vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${isMediaLoading ? 'opacity-0' : 'opacity-100'}`}
                        />
                    ) : isGoogleDriveVideo ? (
                        <iframe
                            key={currentIndex}
                            src={googleDriveEmbedUrl!}
                            title={currentItem.caption}
                            onLoad={() => setIsMediaLoading(false)}
                            className={`w-full max-w-5xl aspect-video bg-black border-none rounded-lg shadow-2xl transition-opacity duration-300 ${isMediaLoading ? 'opacity-0' : 'opacity-100'}`}
                            allow="autoplay"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <video
                            key={currentIndex}
                            src={currentItem.src}
                            controls
                            autoPlay
                            muted
                            onLoadedData={() => setIsMediaLoading(false)}
                            className={`max-w-full max-h-[75vh] md:max-h-[80vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${isMediaLoading ? 'opacity-0' : 'opacity-100'}`}
                        >
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
                <div className={`w-full p-4 transition-opacity duration-300 ${isMediaLoading ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="bg-black/20 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg max-w-2xl mx-auto text-center">
                        <p className="text-base md:text-lg font-medium text-white drop-shadow-md">{currentItem.caption}</p>
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
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState('All');
    const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
    const { width } = useWindowSize();
    const isMobile = width < 768;

    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredItems(GALLERY_ITEMS);
        } else {
            setFilteredItems(GALLERY_ITEMS.filter(item => item.tags.includes(activeFilter)));
        }
    }, [activeFilter]);

    const openLightbox = (index: number) => {
        setCurrentItemIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    }, []);

    const nextItem = useCallback(() => {
        setCurrentItemIndex((prev) => (prev + 1) % filteredItems.length);
    }, [filteredItems.length]);

    const prevItem = useCallback(() => {
        setCurrentItemIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    }, [filteredItems.length]);

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
                        {filteredItems.map((item, index) => (
                            <GalleryCard
                                key={`${item.src}-${index}`}
                                item={item}
                                onClick={() => openLightbox(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {lightboxOpen && (
                <Lightbox
                    items={filteredItems}
                    currentIndex={currentItemIndex}
                    onClose={closeLightbox}
                    onNext={nextItem}
                    onPrev={prevItem}
                    isMobile={isMobile}
                />
            )}
        </>
    );
};

export default GalleryPage;
