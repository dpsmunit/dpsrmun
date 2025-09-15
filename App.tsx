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
import CommitteeDetailsPage from './pages/CDP';
import EbookPage from './pages/EbookPage';
import UpdatesPage from './pages/UpdatesPage';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const routes: { [key: string]: React.ComponentType } = {
  '': HomePage,
  '#home': HomePage,
  '#about': AboutPage,
  '#committees': CommitteesPage,
  '#secretariat': SecretariatPage,
  '#updates': UpdatesPage,
  '#gallery': GalleryPage,
  '#ebook': EbookPage,
  '#contact': ContactPage,
};

const App: React.FC = () => {
  const getPathFromHash = () => window.location.hash || '#home';

  const [visualPath, setVisualPath] = useState(getPathFromHash());
  const [pagePath, setPagePath] = useState(getPathFromHash());
  const [isPageVisible, setIsPageVisible] = useState(true);

  const handleNavigate = (newPath: string) => {
    if (visualPath === newPath) return;

    // 1. Instantly update visual path to start navbar animation
    setVisualPath(newPath);

    // 2. Fade out current page
    setIsPageVisible(false);

    // 3. After fade-out, switch page component and fade it back in
    setTimeout(() => {
      setPagePath(newPath);
      window.location.hash = newPath;
      setIsPageVisible(true);
    }, 250); // This duration should be slightly less than the navbar animation for overlap
  };

  useEffect(() => {
    // Handles browser back/forward button navigation
    const handleHashChange = () => {
      const newPath = getPathFromHash();
      // For browser history navigation, transition instantly without the orchestrated delay
      setIsPageVisible(false);
      setTimeout(() => {
        setVisualPath(newPath);
        setPagePath(newPath);
        setIsPageVisible(true);
      }, 250);
    };

    window.addEventListener('hashchange', handleHashChange);

    // Set initial state from URL
    const initialPath = getPathFromHash();
    if (window.location.hash === '') {
      window.history.replaceState(null, '', '#home');
    }
    setVisualPath(initialPath);
    setPagePath(initialPath);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    // On page change, scroll to top after the new page has faded in.
    if (isPageVisible) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pagePath, isPageVisible]);

  const renderPage = () => {
    if (pagePath.startsWith('#committees/')) {
      const committeeId = pagePath.split('/')[1];
      return <CommitteeDetailsPage committeeId={committeeId} />;
    }
    const Page = routes[pagePath] || HomePage;
    return <Page />;
  };

  return (
    <div className="min-h-screen w-full bg-mun-white text-mun-dark-text">
      <Navbar activePath={visualPath} onNavigate={handleNavigate} />
      <main className={`transition-opacity duration-200 ${isPageVisible ? 'opacity-100' : 'opacity-0'}`}>
        {renderPage()}
      </main>
      <Footer />
      <Chatbot />
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
