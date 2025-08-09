import React, { useState } from 'react';
import { FAQS } from '../constants';
import type { FaqItem } from '../types';
import { ChevronDownIcon } from './icons/Icons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FaqAccordionItem = ({ item }: { item: FaqItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div ref={ref} className={`border-b border-gray-200 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-6 text-left"
      >
        <h3 className={`text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-mun-green' : 'text-mun-dark-text'}`}>{item.question}</h3>
        <ChevronDownIcon
          className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-mun-green' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
            <div className="pb-6 text-gray-600 leading-relaxed prose prose-p:text-gray-600 prose-strong:text-mun-dark-text">
            {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
            </div>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <section id="faq" className="py-24 sm:py-32 bg-gray-50 border-y border-gray-200">
      <div ref={ref} className={`container mx-auto max-w-4xl px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-mun-dark-text">
          The <span className="text-mun-green">Discourse</span>
        </h2>
        <div>
          {FAQS.map((faq) => (
            <FaqAccordionItem key={faq.question} item={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;