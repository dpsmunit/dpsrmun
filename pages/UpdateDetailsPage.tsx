import React, { useMemo, useEffect } from 'react';
import { getUpdateDetailsById } from '../data/updatesData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ChevronLeftIcon } from '../components/icons/Icons';
import useWindowSize from '../hooks/useWindowSize';

const UpdateDetailsPage: React.FC<{ updateId: string }> = ({ updateId }) => {
    const update = useMemo(() => getUpdateDetailsById(updateId), [updateId]);
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
    const { width } = useWindowSize();

    useEffect(() => {
        if (typeof window === 'undefined' || !(window as any).marked) {
            console.warn('marked.js is not loaded.');
        }
    }, []);

    const renderMarkdown = (text: string) => {
        if (typeof window !== 'undefined' && (window as any).marked) {
            let rawMarkup = (window as any).marked.parse(text, { breaks: true, gfm: true });
            rawMarkup = rawMarkup.replace(/<a href/g, '<a target="_blank" rel="noopener noreferrer" href');
            return { __html: rawMarkup };
        }
        return { __html: text.replace(/\n/g, '<br />') };
    };

    // Process title to replace double line breaks with a single space
    const processedTitle = update?.title.replace(/\n{2,}/g, ' ');

    if (!update) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20">
                <h1 className="text-4xl font-bold text-mun-dark-text">Update Not Found</h1>
                <p className="mt-4 text-lg text-gray-600">The update you are looking for does not exist.</p>
                <a href="#updates" className="mt-8 px-6 py-3 bg-mun-green text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all duration-300">
                    Back to Updates
                </a>
            </div>
        );
    }

    return (
        <div ref={ref} className={`bg-mun-white text-mun-dark-text transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <header className="relative bg-mun-white border-b border-gray-200 pt-24 pb-16">
                <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#1DB954 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <a href="#updates" className="inline-flex items-center gap-2 text-gray-500 font-semibold mb-8 hover:text-mun-green transition-colors">
                        <ChevronLeftIcon className="w-5 h-5"/>
                        All Updates
                    </a>
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {update.tags.map(tag => (
                                <span key={tag} className="text-xs font-bold text-green-800 uppercase tracking-wider bg-green-100 px-3 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-mun-dark-text tracking-tight">{processedTitle}</h1>
                        <p className="mt-4 text-base font-semibold text-gray-500">{update.date}</p>
                    </div>
                </div>
            </header>
            
            <div className="container mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
                <div className="grid grid-cols-1">
                    <article>
                        {update.content ? (
                            <div 
                                className="prose lg:prose-xl max-w-none text-gray-700 leading-relaxed space-y-4 prose-h2:text-mun-dark-text prose-a:text-mun-green hover:prose-a:text-green-500 prose-strong:text-mun-dark-text"
                                dangerouslySetInnerHTML={renderMarkdown(update.content)}
                            />
                        ) : (
                            <p className="prose lg:prose-xl max-w-none text-gray-700 leading-relaxed">{update.summary}</p>
                        )}
                    </article>
                </div>
            </div>
        </div>
    );
};

export default UpdateDetailsPage;
