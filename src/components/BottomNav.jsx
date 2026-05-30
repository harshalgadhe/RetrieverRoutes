import React from 'react';
import { Home, Search, MessageSquare } from 'lucide-react';

export default function BottomNav({ currentScreen, setCurrentScreen }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Search },
    { id: 'contact', label: 'Connect', icon: MessageSquare }
  ];

  return (
    <div className="mobile-bottom-nav" style={{ display: 'none' }}>
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = currentScreen === tab.id || 
                         (tab.id === 'explore' && currentScreen === 'details');

        return (
          <button
            key={tab.id}
            onClick={() => setCurrentScreen(tab.id)}
            className={`nav-item-btn ${isActive ? 'active' : ''}`}
            style={{ position: 'relative' }}
          >
            <IconComponent size={22} style={{ transition: 'transform var(--transition-fast)' }} />
            <span>{tab.label}</span>
            {isActive && (
              <span style={{
                position: 'absolute',
                bottom: '3px',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent)',
                boxShadow: '0 0 8px var(--color-accent)'
              }} />
            )}
          </button>
        );
      })}

      <style>{`
        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
