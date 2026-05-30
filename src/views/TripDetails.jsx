import React, { useState } from 'react';
import { ArrowLeft, Heart, Star, Compass, Bed, Utensils, Car, Camera, PhoneCall } from 'lucide-react';

export default function TripDetails({ trip, setCurrentScreen, onOpenInquiry }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [mediaType, setMediaType] = useState('photos'); // 'photos' or 'video'

  if (!trip) return null;

  const highlights = trip.highlights || [];
  const inclusions = trip.inclusions || {};

  const handleWhatsAppChat = () => {
    window.open(`https://wa.me/1234567890?text=Hi! I am interested in booking the ${trip.title} tour. Please share available slots.`, '_blank');
  };

  return (
    <div className="view-container" style={{ paddingBottom: '120px' }}>
      {/* Back button */}
      <button
        onClick={() => setCurrentScreen('explore')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: 'var(--color-accent)',
          fontSize: '14px',
          fontWeight: '700',
          cursor: 'pointer',
          marginBottom: '20px',
          padding: '4px 0'
        }}
        className="text-link"
      >
        <ArrowLeft size={16} /> Back to Trips
      </button>

      {/* Interactive Media Banner */}
      <div style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        height: '320px',
        marginBottom: '30px',
        boxShadow: 'var(--shadow-md)'
      }}>
        {mediaType === 'photos' ? (
          <img 
            src={trip.image} 
            alt={trip.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#070e0b',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(rgba(7, 14, 11, 0.7), rgba(7, 14, 11, 0.9)), url("' + trip.image + '")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#070e0b',
              boxShadow: 'var(--shadow-glow-gold)'
            }}>
              <Compass size={24} className="animate-float" />
            </div>
            <span style={{ fontSize: '13px', color: 'var(--color-text-primary)', fontWeight: '600' }}>
              Simulated Tour Video Playing...
            </span>
          </div>
        )}

        {/* Favorite */}
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="glass-panel"
            style={{
              padding: '10px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isFavorite ? '#ef4444' : 'var(--color-text-primary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Heart size={18} fill={isFavorite ? '#ef4444' : 'none'} />
          </button>
        </div>

        {/* Photo/Video switch */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          zIndex: 10,
          display: 'flex',
          gap: '8px'
        }}>
          {['photos', 'video'].map((type) => (
            <button
              key={type}
              onClick={() => setMediaType(type)}
              className="glass-panel"
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                border: mediaType === type ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.05)',
                color: mediaType === type ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                background: mediaType === type ? 'rgba(7, 14, 11, 0.9)' : 'rgba(7, 14, 11, 0.6)'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main stats layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '30px' }} className="desktop-details-grid">
        
        <div>
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', fontFamily: "'Outfit', sans-serif" }}>
              {trip.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                <span style={{ fontSize: '14px', fontWeight: '700' }}>{trip.rating}</span>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>({trip.reviewsCount} reviews)</span>
              </div>
              <span style={{ color: 'var(--color-text-muted)' }}>•</span>
              <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
                {trip.location}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '32px' }}>
            {trip.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
            {[
              { label: 'Duration', val: trip.duration },
              { label: 'Group Size', val: trip.groupSize },
              { label: 'Difficulty', val: trip.difficulty }
            ].map((spec, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {spec.label}
                </span>
                <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
                  {spec.val}
                </span>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Trip Highlights</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
              {highlights.map((high, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', marginTop: '6px' }} />
                  <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                    {high}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-green)', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
              What's Included
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { name: 'Luxury Hotels', icon: Bed, active: inclusions.hotels },
                { name: 'Premium Meals', icon: Utensils, active: inclusions.meals },
                { name: 'Route Transport', icon: Car, active: inclusions.transport },
                { name: 'Mountain Guide', icon: Compass, active: inclusions.guide },
                { name: 'Daily Activities', icon: Camera, active: inclusions.activities }
              ].map((inc, i) => {
                const IncIcon = inc.icon;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: inc.active ? 1 : 0.4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <IncIcon size={18} style={{ color: inc.active ? 'var(--color-accent)' : 'var(--color-text-muted)' }} />
                      <span style={{ fontSize: '13px', fontWeight: '500' }}>{inc.name}</span>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: inc.active ? '#10b981' : 'var(--color-text-muted)' }}>
                      {inc.active ? '✓ YES' : '✗ NO'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking Bar (Inquiry Trigger and WhatsApp Hotlines!) */}
      <div 
        className="glass-panel"
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          height: '84px',
          zIndex: 90,
          borderTop: '1px solid rgba(242, 159, 5, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          boxShadow: '0 -8px 24px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
            Starting at
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-gold)' }}>
              ₹{trip.price.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>/ person</span>
          </div>
        </div>

        {/* Action triggers */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={handleWhatsAppChat}
            className="icon-hover-btn desktop-wa-btn"
            style={{
              padding: '14px 20px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #10b981',
              background: 'rgba(16, 185, 129, 0.05)',
              color: '#10b981',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'none'
            }}
          >
            Chat WhatsApp
          </button>

          <button 
            onClick={() => onOpenInquiry(trip)}
            className="glow-btn-gold"
            style={{
              padding: '14px 36px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-glow-gold)'
            }}
          >
            <PhoneCall size={16} /> Send Inquiry
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .desktop-wa-btn { display: block !important; }
        }
        @media (max-width: 768px) {
          .desktop-details-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .view-container {
            padding-bottom: 160px !important;
          }
          div[style*="position: fixed; bottom: 0"] {
            bottom: 68px !important;
          }
        }
      `}</style>
    </div>
  );
}
