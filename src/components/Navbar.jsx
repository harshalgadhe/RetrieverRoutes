import React from 'react';
import { Compass, MessageSquare, PhoneCall, Sun, Moon } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Navbar({ currentScreen, setCurrentScreen, onOpenInquiry, theme, toggleTheme }) {
  return (
    <header className="glass-panel" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      height: '64px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      borderBottom: '1px solid rgba(13, 95, 56, 0.15)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Brand Logo & Name */}
      <div 
        onClick={() => setCurrentScreen('home')} 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <img 
          src={logoImg} 
          alt="RetrieverRoutes Logo" 
          style={{ 
            height: '42px', 
            width: 'auto', 
            objectFit: 'contain',
            borderRadius: '4px' // Subtle curve for modern look
          }}
        />
        <span 
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '20px',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            display: 'none'
          }}
          className="desktop-logo-text"
        >
          <span style={{ color: 'var(--color-logo-retriever)', textShadow: 'var(--text-shadow-brand-green)' }}>Retriever</span>
          <span style={{ color: '#f29f05', textShadow: 'var(--text-shadow-brand-gold)' }}>Routes</span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav 
        className="desktop-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px'
        }}
      >
        <span 
          onClick={() => setCurrentScreen('home')}
          style={{
            color: currentScreen === 'home' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
            fontWeight: currentScreen === 'home' ? '700' : '500',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'color var(--transition-fast)'
          }}
          className="nav-link"
        >
          Home
        </span>
        <span 
          onClick={() => setCurrentScreen('explore')}
          style={{
            color: currentScreen === 'explore' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
            fontWeight: currentScreen === 'explore' ? '700' : '500',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'color var(--transition-fast)'
          }}
          className="nav-link"
        >
          Explore Trips
        </span>
        <span 
          onClick={() => setCurrentScreen('contact')}
          style={{
            color: currentScreen === 'contact' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
            fontWeight: currentScreen === 'contact' ? '700' : '500',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'color var(--transition-fast)'
          }}
          className="nav-link"
        >
          Community Connect
        </span>
      </nav>

      {/* Right Action Call Triggers (Inquire + Theme Switcher) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Modern Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button 
          className="glow-btn-gold"
          onClick={() => onOpenInquiry(null)}
          style={{
            padding: '8px 18px',
            borderRadius: 'var(--radius-full)',
            fontSize: '13px',
            cursor: 'pointer',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <PhoneCall size={14} />
          Inquire Now
        </button>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .desktop-logo-text { display: block !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
        .nav-link:hover {
          color: var(--color-accent) !important;
        }
        .icon-hover-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--color-accent) !important;
        }
      `}</style>
    </header>
  );
}
