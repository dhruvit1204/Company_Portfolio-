import React, { useState } from 'react';
import { Hero } from '../sections/Hero';
import { ProjectExplorer } from '../sections/ProjectExplorer';
import { Services } from '../sections/Services';
import { ProcessTimeline } from '../sections/ProcessTimeline';
import { TechStack } from '../sections/TechStack';
import { AboutWork } from '../sections/AboutWork';
import { ContactModal } from '../components/ContactModal';
import { useSmoothScroll } from '../context/SmoothScrollContext';

export const HomePage: React.FC = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactService, setContactService] = useState<string | undefined>(undefined);
  const { stop, start } = useSmoothScroll();

  const handleOpenContact = (service?: string) => {
    setContactService(service);
    setContactModalOpen(true);
    stop();
  };

  const handleCloseContact = () => {
    setContactModalOpen(false);
    start();
  };

  return (
    <main>
      <Hero onOpenContact={() => handleOpenContact()} />
      <ProjectExplorer />
      <Services onOpenContact={service => handleOpenContact(service)} />
      <ProcessTimeline />
      <TechStack />
      <AboutWork onOpenContact={() => handleOpenContact()} />

      {/* Contact Proposal Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={handleCloseContact}
        preselectedService={contactService}
      />
    </main>
  );
};
