
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CommitteesPage from './pages/CommitteesPage';
import SecretariatPage from './pages/SecretariatPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import GalleryPage from './pages/GalleryPage';

const routes: { [key: string]: React.ComponentType } = {
  '': HomePage,
  '#home': HomePage,
  '#about': AboutPage,
  '#committees': CommitteesPage,
  '#secretariat': SecretariatPage,
   '#gallery': GalleryPage,
  '#contact': ContactPage,
};

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#home');
    };

    window.addEventListener('hashchange', handleHashChange);
    
    if (window.location.hash === '') {
      window.location.hash = '#home';
    } else {
      setCurrentPath(window.location.hash);
    }
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    // Only scroll to top if the path corresponds to a page route.
    // This differentiates from in-page anchors like #sg-note.
    if (routes[currentPath]) {
        window.scrollTo(0, 0);
    }
  }, [currentPath]);

  const Page = routes[currentPath] || HomePage;

  return (
    <div className="min-h-screen w-full bg-mun-white text-mun-dark-text">
      <Navbar currentPath={currentPath} />
      <main>
        <Page />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;