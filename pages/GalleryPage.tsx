import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon, ExpandIcon } from '../components/icons/Icons';

type GalleryImage = {
  src: string;
  caption: string;
  tags: string[];
  date: string;
};

export const GALLERY_IMAGES = [
  {
    src: 'https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg',
    caption: 'Opening ceremony setting the stage for days of intense debate.',
    tags: ['Sessions'],
    date: '2025-08-06',
  },
  {
    src: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
    caption: 'Delegates collaborating during an unmoderated caucus to draft resolutions.',
    tags: ['Sessions'],
    date: '2025-08-06',
  },
  {
    src: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg',
    caption: 'A passionate delegate delivering a speech during the General Speakers List.',
    tags: ['Sessions'],
    date: '2025-08-07',
  },
  {
    src: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg',
    caption: 'Moments of camaraderie and networking between sessions.',
    tags: ['Social Events'],
    date: '2025-08-07',
  },
 
  {
    src: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg',
    caption: 'Recognizing excellence and diplomacy during the awards ceremony.',
    tags: ['Ceremony'],
    date: '2025-08-08',
  },
  {
    src: 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg',
    caption: 'The Executive Board guiding the committee proceedings.',
    tags: ['Sessions'],
    date: '2025-08-06',
  },
  {
    src: 'https://images.pexels.com/photos/355321/pexels-photo-355321.jpeg',
    caption: 'A wide view of a committee in full session.',
    tags: ['Sessions'],
    date: '2025-08-07',
  },

  {
    src: 'https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg',
    caption: 'The delegate placard, a symbol of representation and voice.',
    tags: ['Sessions'],
    date: '2025-08-06',
  },
  {
    src: 'https://images.pexels.com/photos/5676744/pexels-photo-5676744.jpeg',
    caption: 'A crucial vote that could change the course of the debate.',
    tags: ['Sessions'],
    date: '2025-08-08',
  },
  {
    src: 'https://images.pexels.com/photos/1526813/pexels-photo-1526813.jpeg',
    caption: 'An inspiring keynote address from a distinguished guest.',
    tags: ['Keynotes'],
    date: '2025-08-06',
  },
];

const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const GalleryCard: React.FC<{
  image: GalleryImage;
  onClick: () => void;
}> = ({ image, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = -1 * ((y / height - 0.5) * 12);
    const rotateY = (x / width - 0.5) * 12;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (isTouchDevice || !cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#1DB954]/30 cursor-pointer group relative transition-all duration-300 ease-out will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={image.src}
        alt={image.caption}
        loading="lazy"
        className="w-full h-auto object-cover transition-all duration-500 ease-in-out group-hover:brightness-[.85]"
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
        <div className="p-3 bg-black/30 backdrop-blur-sm rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300 border border-white/20">
          <ExpandIcon className="w-10 h-10 text-white/90 drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-4 w-full opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
        <p className="font-semibold text-xs sm:text-sm md:text-base text-white drop-shadow-md">
          {image.caption}
        </p>
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
  direction: 'next' | 'prev' | 'open';
}> = ({ images, currentIndex, onClose, onNext, onPrev, direction }) => {
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

  const animationClass = isClosing
    ? 'animate-lightbox-exit'
    : direction === 'open'
    ? 'animate-lightbox-enter'
    : direction === 'next'
    ? 'animate-slide-in-right'
    : 'animate-slide-in-left';

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <style>{`
        @keyframes lightbox-enter {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-lightbox-enter { animation: lightbox-enter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        @keyframes lightbox-exit {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95); }
        }
        .animate-lightbox-exit { animation: lightbox-exit 0.3s ease-out forwards; }

        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(80px) scale(0.95) rotate(3deg); }
          to { opacity: 1; transform: translateX(0) scale(1) rotate(0deg); }
        }
        .animate-slide-in-right { animation: slide-in-right 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-80px) scale(0.95) rotate(-3deg); }
          to { opacity: 1; transform: translateX(0) scale(1) rotate(0deg); }
        }
        .animate-slide-in-left { animation: slide-in-left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

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

        /* Responsive caption text size */
        @media (max-width: 640px) {
          .lightbox-caption {
            font-size: 0.875rem; /* 14px for small screens */
          }
        }
        @media (min-width: 641px) and (max-width: 768px) {
          .lightbox-caption {
            font-size: 1rem; /* 16px for medium screens */
          }
        }
        @media (min-width: 769px) {
          .lightbox-caption {
            font-size: 1.125rem; /* 18px for large screens */
          }
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

      <button
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white/80 hover:text-white transition-all duration-300 transform hover:scale-105 z-50"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="w-8 h-8" />
      </button>
      <button
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white/80 hover:text-white transition-all duration-300 transform hover:scale-105 z-50"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
      >
        <ChevronRightIcon className="w-8 h-8" />
      </button>

      <div
        className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 md:p-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div key={currentIndex} className={`relative ${animationClass}`}>
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].caption}
            onLoad={() => setIsImageLoading(false)}
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
            }}
            className={`max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
              isImageLoading ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <div
            className={`mt-4 transition-opacity duration-300 ${
              isImageLoading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="bg-black/20 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg max-w-2xl mx-auto">
              <p className="text-center text-white drop-shadow-md lightbox-caption">
                {images[currentIndex].caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GalleryPage: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | 'open'>('open');
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const allTags = ['All', ...new Set(GALLERY_IMAGES.flatMap((img) => img.tags))];
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(GALLERY_IMAGES);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (activeFilter === 'All') {
        setFilteredImages(GALLERY_IMAGES);
      } else {
        setFilteredImages(GALLERY_IMAGES.filter((image) => image.tags.includes(activeFilter)));
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [activeFilter]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setDirection('open');
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const nextImage = useCallback(() => {
    setDirection('next');
    setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  }, []);

  const prevImage = useCallback(() => {
    setDirection('prev');
    setCurrentImageIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, []);

  return (
    <>
      <div className="relative bg-gray-50 py-16 sm:py-24 md:py-32 border-b border-gray-200 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(#1DB954 1px, transparent 1px)`, backgroundSize: '20px 20px' }}
        ></div>
        <div
          ref={ref}
          className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Moments from <span className="text-[#1DB954]">Our Events</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Relive the energy, debate, and diplomacy of our previous conferences.
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base font-semibold rounded-full border transition-all duration-300 backdrop-blur-sm ${
                  activeFilter === tag
                    ? 'bg-[#1DB954] text-white border-[#1DB954] shadow-lg shadow-[#1DB954]/20'
                    : 'bg-white/40 text-gray-900 border-gray-200 hover:bg-white/80 hover:border-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
            {filteredImages.map((image) => (
              <GalleryCard
                key={image.src}
                image={image}
                onClick={() => openLightbox(GALLERY_IMAGES.findIndex((img) => img.src === image.src))}
              />
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={GALLERY_IMAGES}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
          direction={direction}
        />
      )}
    </>
  );
};

export default GalleryPage;