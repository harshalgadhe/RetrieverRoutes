import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Layout components
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import AIPlannerModal from './components/AIPlannerModal';
import InquiryModal from './components/InquiryModal';

// Screen views
import Homepage from './views/Homepage';
import ExploreTrips from './views/ExploreTrips';
import TripDetails from './views/TripDetails';
import ContactView from './views/ContactView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedTrip, setSelectedTrip] = useState(null);
  
  // Dynamic search catalog states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Theme Management
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('rr-theme') || 'dark';
  });

  // Modals Visibility
  const [isAIPlannerOpen, setIsAIPlannerOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryTrip, setInquiryTrip] = useState(null);

  // Synchronize theme with HTML document attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rr-theme', theme);
  }, [theme]);

  // Auto-scroll to top when screen changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleOpenInquiry = (trip) => {
    setInquiryTrip(trip);
    setIsInquiryOpen(true);
  };

  const handleBookCustomTrip = (customTrip) => {
    // Inject the generated AI tour into our active selection & redirect
    setSelectedTrip(customTrip);
    setCurrentScreen('details');
  };

  // Helper to render current active screen view
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <Homepage 
            setCurrentScreen={setCurrentScreen}
            setSelectedTrip={setSelectedTrip}
            setSearchQuery={setSearchQuery}
            setFilterCategory={setFilterCategory}
            onOpenInquiry={handleOpenInquiry}
          />
        );
      case 'explore':
        return (
          <ExploreTrips 
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            setSelectedTrip={setSelectedTrip}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
          />
        );
      case 'details':
        return (
          <TripDetails 
            trip={selectedTrip}
            setCurrentScreen={setCurrentScreen}
            onOpenInquiry={handleOpenInquiry}
          />
        );
      case 'contact':
        return <ContactView />;
      default:
        return <Homepage setCurrentScreen={setCurrentScreen} setSelectedTrip={setSelectedTrip} onOpenInquiry={handleOpenInquiry} />;
    }
  };

  // Screen transition settings using Framer Motion
  const slideVariants = {
    initial: { opacity: 0, x: 25 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.28, ease: 'easeOut' } },
    exit: { opacity: 0, x: -25, transition: { duration: 0.2, ease: 'easeIn' } }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-base)', position: 'relative' }}>
      {/* Global Navigation header */}
      <Navbar 
        currentScreen={currentScreen} 
        setCurrentScreen={setCurrentScreen} 
        onOpenInquiry={handleOpenInquiry}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Screen Views Wrapper with framer-motion animations */}
      <main style={{ minHeight: 'calc(100vh - 64px)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideVariants}
            style={{ width: '100%' }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Interactive Bottom navigation bar for mobile reachability */}
      <BottomNav 
        currentScreen={currentScreen} 
        setCurrentScreen={setCurrentScreen} 
      />

      {/* AI Trip Planner Modal */}
      <AIPlannerModal 
        isOpen={isAIPlannerOpen} 
        onClose={() => setIsAIPlannerOpen(false)} 
        onBookCustomTrip={handleBookCustomTrip}
      />

      {/* Quick Tour Lead Capture Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        trip={inquiryTrip}
      />
    </div>
  );
}
