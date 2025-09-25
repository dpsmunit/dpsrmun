import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { NEWSLETTER_DATA } from '../data/newsletterData';
import type { NewsletterItem } from '../data/newsletterData';
import ImageViewer from '../components/ImageViewer';
import { ExpandIcon } from '../components/icons/Icons';

// NewsletterCard Component
const NewsletterCard = ({
  item,
  index,
  onClick,
}: {
  item: NewsletterItem;
  index: number;
  onClick: () => void;
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`group perspective-1000 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View newsletter: ${item.title}`}
    >
      <div className="relative w-5/6 mx-auto aspect-[1/1.414] rounded-xl shadow-2xl shadow-black/20 transition-all duration-500 [transform-style:preserve-3d] group-hover:scale-105 group-hover:-rotate-y-4 group-hover:-rotate-x-2 group-hover:shadow-mun-green/40 cursor-pointer">
        {/* Main Image */}
        <img
          src={item.src}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          loading="lazy"
        />

        {/* Glare Effect */}
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/15 to-transparent opacity-0 -skew-x-12 -translate-x-full group-hover:opacity-100 group-hover:translate-x-[250%] transition-transform duration-700"></div>
        </div>

        {/* Content Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-xl" />

        {/* Text Content */}
        <div className="absolute bottom-0 left-0 p-5 w-full text-white [transform:translateZ(20px)]">
          <p className="text-xs font-bold uppercase tracking-widest text-mun-green">{item.date}</p>
          <h3 className="text-2xl font-bold mt-1 text-shadow">{item.title}</h3>
          {item.author && <p className="text-sm font-medium mt-2 opacity-90">By {item.author}</p>}
        </div>

        {/* Hover Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-xl">
          <ExpandIcon className="w-12 h-12 text-white/90 drop-shadow-lg [transform:translateZ(50px)]" />
        </div>
      </div>
    </div>
  );
};

// NewsletterSection Component
const NewsletterSection: React.FC<{ onSelectImage: (src: string) => void }> = ({ onSelectImage }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="relative bg-mun-white py-24 sm:py-32 border-b border-gray-200 overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: `radial-gradient(#1DB954 1px, transparent 1px)`, backgroundSize: '20px 20px' }}
      />
      <div
        ref={ref}
        className={`relative z-10 container mx-auto px-6 lg:px-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-mun-dark-text">
            The DPSR <span className="text-mun-green">Dispatch</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest updates, insights, and stories from the heart of DPSR MUN.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {NEWSLETTER_DATA.map((item, index) => (
            <NewsletterCard key={index} item={item} index={index} onClick={() => onSelectImage(item.src)} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Combined ResourcesPage Component: Newsletter only
const ResourcesPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <NewsletterSection onSelectImage={setSelectedImage} />
      {selectedImage && <ImageViewer src={selectedImage} onClose={() => setSelectedImage(null)} />}
    </>
  );
};

export default ResourcesPage;
