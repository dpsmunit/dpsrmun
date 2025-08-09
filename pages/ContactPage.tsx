import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { MailIcon, PhoneIcon } from '../components/icons/Icons';

const ContactInfo = ({ icon: Icon, title, children }: { icon: React.FC<{ className?: string }>, title: string, children: React.ReactNode }) => (
    <div className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
        <div className="w-16 h-16 bg-mun-soft-green rounded-full flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-mun-green" />
        </div>
        <h3 className="text-xl font-bold text-mun-dark-text">{title}</h3>
        <div className="mt-2 text-gray-600 space-y-1">
            {children}
        </div>
    </div>
);

const ContactPage: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div ref={ref} className={`py-24 sm:py-32 bg-gray-50 border-y border-gray-200 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
                <h1 className="text-4xl md:text-5xl font-bold text-mun-dark-text">Get In <span className="text-mun-green">Touch</span></h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">We're here to help with any questions. Reach out to us through any of the channels below.</p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <ContactInfo icon={MailIcon} title="Email Us">
                    <a href="mailto:dpsrmun2024@gmail.com" className="block hover:text-mun-green hover:underline transition-colors">dpsrmun2024@gmail.com</a>
                    <a href="mailto:piccoloeventsofficial@gmail.com" className="block hover:text-mun-green hover:underline transition-colors">piccoloeventsofficial@gmail.com</a>
                </ContactInfo>
                <ContactInfo icon={PhoneIcon} title="Call Us">
                    <a href="tel:+917087207070" className="block hover:text-mun-green hover:underline transition-colors">+91 70872-07070</a>
                    <a href="tel:+917347541031" className="block hover:text-mun-green hover:underline transition-colors">+91 73475-41031</a>
                    <a href="tel:+917456895635" className="block hover:text-mun-green hover:underline transition-colors">+91 74568-95635</a>
                </ContactInfo>
            </div>
        </div>
    </div>
  );
};
export default ContactPage;