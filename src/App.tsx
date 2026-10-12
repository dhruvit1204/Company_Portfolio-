import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ContactModal } from './components/ContactModal';

import { SmoothScrollProvider, useSmoothScroll } from './context/SmoothScrollContext';
import { SectionTransitionProvider, useSectionTransition } from './context/SectionTransitionContext';
import { SectionTransitionOverlay } from './components/SectionTransitionOverlay';
import { CustomCursor } from './components/CustomCursor';
import { IntroLogoPreloader } from './components/IntroLogoPreloader';

// Scroll restoration component: only resets to top when navigating to a new route pathname (e.g. /projects/slug)
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const [globalContactOpen, setGlobalContactOpen] = useState(false);
  const [globalPreselectedService, setGlobalPreselectedService] = useState<string | undefined>(undefined);
  const { stop, start } = useSmoothScroll();

  const handleOpenContact = (service?: string) => {
    setGlobalPreselectedService(service);
    setGlobalContactOpen(true);
    stop();
  };

  const handleCloseContact = () => {
    setGlobalContactOpen(false);
    start();
  };

  return (
    <div className="min-h-screen flex flex-col bg-sand text-ink selection:bg-cyprus selection:text-sand">
      <IntroLogoPreloader />
      <ScrollToTop />
      <Navbar onOpenContact={handleOpenContact} />
      
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer onOpenContact={() => handleOpenContact()} />

      {/* Global Inbound Contact Consultation Modal */}
      <ContactModal
        isOpen={globalContactOpen}
        onClose={handleCloseContact}
        preselectedService={globalPreselectedService}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <SectionTransitionProvider>
          <CustomCursor />
          <AppContent />
          <SectionTransitionOverlay />
        </SectionTransitionProvider>
      </SmoothScrollProvider>
    </BrowserRouter>
  );
};

export default App;
