import React from 'react';
import { Briefcase, MapPin, Calendar, Award, Trash2, ArrowRight, UserPlus } from 'lucide-react';

export default function ProfileBookingsView({ activeBookings, onCancelBooking, setCurrentScreen }) {
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: "'Outfit', sans-serif" }}>My Travel Hub</h1>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
          Manage your scheduled expeditions, custom AI routes, and loyalty rewards.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 2fr',
        gap: '30px'
      }} className="desktop-profile-grid">
        
        {/* Left Column: Loyalty Card Profile details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Profile Card */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-green)',
            textAlign: 'center'
          }}>
            {/* Avatar */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-accent), #fbb021)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              color: '#070e0b',
              fontSize: '28px',
              margin: '0 auto 16px auto',
              boxShadow: 'var(--shadow-glow-gold)'
            }}>
              J
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-text-primary)' }}>John Doe</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>john.doe@gmail.com</p>

            {/* Loyalty Badge */}
            <div className="glass-card-gold" style={{
              marginTop: '20px',
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textAlign: 'left'
            }}>
              <Award size={24} style={{ color: 'var(--color-accent)' }} />
              <div>
                <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                  Hiker Status
                </span>
                <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--color-text-primary)', display: 'block' }}>
                  Active Golden Setter
                </span>
              </div>
            </div>
          </div>

          {/* Quick specs / credits */}
          <div className="glass-panel" style={{
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-green)',
            fontSize: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Loyalty Points:</span>
              <span style={{ fontWeight: '700', color: 'var(--color-accent)' }}>1,420 pts</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Tours Hiked:</span>
              <span style={{ fontWeight: '700' }}>4 Completed</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Account Created:</span>
              <span style={{ fontWeight: '700' }}>May 2026</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bookings list */}
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={20} style={{ color: 'var(--color-accent)' }} /> Scheduled Expeditions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activeBookings.length > 0 ? (
              activeBookings.map((bk, idx) => (
                <div 
                  key={idx} 
                  className="glass-card" 
                  style={{
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Glowing background stripe */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '4px',
                    backgroundColor: 'var(--color-accent)'
                  }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: '8px' }}>
                    <div>
                      <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Confirmed Booking
                      </span>
                      <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '2px' }}>
                        {bk.tripTitle}
                      </h3>
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#10b981',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      padding: '4px 10px',
                      borderRadius: '4px'
                    }}>
                      ● ACTIVE
                    </span>
                  </div>

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
                    gap: '12px',
                    paddingLeft: '8px',
                    fontSize: '13px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={16} style={{ color: 'var(--color-text-muted)' }} />
                      <div>
                        <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '9px', textTransform: 'uppercase' }}>Dates</span>
                        <span style={{ fontWeight: '600' }}>
                          {formatDate(bk.startDate)} - {formatDate(bk.endDate)}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={16} style={{ color: 'var(--color-text-muted)' }} />
                      <div>
                        <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '9px', textTransform: 'uppercase' }}>Scope</span>
                        <span style={{ fontWeight: '600' }}>{bk.durationDays} Days Duration</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons for active booking */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '16px',
                    paddingLeft: '8px'
                  }}>
                    <div style={{ fontSize: '13px' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>Settled Cost: </span>
                      <span style={{ fontWeight: '800', color: 'var(--color-text-gold)' }}>${bk.totalCost}</span>
                    </div>

                    <button
                      onClick={() => onCancelBooking(idx)}
                      className="icon-hover-btn"
                      style={{
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        background: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      <Trash2 size={14} /> Cancel Tour
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-panel" style={{
                padding: '40px 20px',
                textAlign: 'center',
                borderRadius: 'var(--radius-md)',
                border: '1px dashed var(--color-border-green)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <Briefcase size={36} color="var(--color-text-muted)" />
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800' }}>No Upcoming Expeditions</h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px', maxWidth: '280px', marginInline: 'auto' }}>
                    You haven't scheduled any routes yet. Explore our custom catalog to start booking.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentScreen('explore')}
                  className="glow-btn-gold"
                  style={{
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Explore Trips <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-profile-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
