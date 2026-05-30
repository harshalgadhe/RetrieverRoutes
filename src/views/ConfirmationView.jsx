import React, { useEffect, useState } from 'react';
import { Check, Calendar, Users, Bookmark, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ConfirmationView({ bookingDraft, activeBookings, setCurrentScreen }) {
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    // Generate an authentic random booking ID on mount
    const num = Math.floor(10000000 + Math.random() * 90000000);
    setBookingId(`RR${num}`);
  }, []);

  if (!bookingDraft) return null;

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const totalGuests = bookingDraft.travelers.adults + bookingDraft.travelers.children;

  return (
    <div className="view-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px' }}>
      
      {/* Visual Success Indicator (Suitcase / Particles Floating) */}
      <div style={{
        position: 'relative',
        width: '120px',
        height: '120px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Glowing background halo */}
        <div className="pulse-glow" style={{
          position: 'absolute',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'rgba(242, 159, 5, 0.15)',
          boxShadow: 'var(--shadow-glow-gold)'
        }} />

        {/* Floating Success Globe */}
        <div 
          className="animate-float"
          style={{
            position: 'relative',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {/* Paw / Success Check mark */}
          <Check size={42} color="#070e0b" strokeWidth={3} />
        </div>

        {/* Small floating sparklets */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-text-gold)'
        }} className="animate-float" />
        <div style={{
          position: 'absolute',
          bottom: '15px',
          left: '10px',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary-light)'
        }} className="animate-float" />
      </div>

      {/* Confirmation text */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', fontFamily: "'Outfit', sans-serif" }}>Booking Confirmed!</h1>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '8px', lineHeight: '1.5', maxWidth: '380px', marginInline: 'auto' }}>
          Your trip to {bookingDraft.tripTitle} is all set! We've dispatched your details and boarding pass to your email.
        </p>
      </div>

      {/* Boarding Pass Ticket receipt (High fidelity) */}
      <div className="ticket-container" style={{ width: '100%', marginBottom: '32px' }}>
        {/* Ticket Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, var(--color-primary), #0d5f38)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '9px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>boarding ticket</span>
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-primary)' }}>RetrieverRoutes</h4>
          </div>
          <ShieldCheck size={24} style={{ color: 'var(--color-accent)' }} />
        </div>

        {/* Main Boarding Ticket stats */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '8px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Destination Route</span>
              <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-primary)', display: 'block', marginTop: '2px' }}>
                {bookingDraft.tripTitle}
              </span>
            </div>
            <div>
              <span style={{ fontSize: '8px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Booking Number</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-gold)', display: 'block', marginTop: '2px', fontFamily: 'monospace' }}>
                {bookingId}
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '8px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Selected Dates</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)', display: 'block', marginTop: '2px' }}>
                {formatDate(bookingDraft.startDate)} - {formatDate(bookingDraft.endDate)}
              </span>
            </div>
            <div>
              <span style={{ fontSize: '8px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Travelers Party</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)', display: 'block', marginTop: '2px' }}>
                {totalGuests} Persons ({bookingDraft.travelers.adults} Ad, {bookingDraft.travelers.children} Ch)
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '8px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Duration Stay</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)', display: 'block', marginTop: '2px' }}>
                {bookingDraft.durationDays} Days / {bookingDraft.durationDays - 1} Nights
              </span>
            </div>
            <div>
              <span style={{ fontSize: '8px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Amount Settled</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-primary)', display: 'block', marginTop: '2px' }}>
                ${bookingDraft.totalCost} USD
              </span>
            </div>
          </div>

        </div>

        {/* Dashed divider */}
        <div className="ticket-divider" />

        {/* Ticket Footer (Simulated Barcode / QR Section) */}
        <div style={{
          padding: '16px 24px 24px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.01)'
        }}>
          <div>
            <span style={{ fontSize: '8px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              ● PAID & ACTIVE
            </span>
          </div>

          {/* Barcode SVG illustration */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '4px'
          }}>
            <div style={{
              display: 'flex',
              gap: '2px',
              height: '32px',
              background: '#fff',
              padding: '4px 8px',
              borderRadius: '2px'
            }}>
              {[1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3].map((w, idx) => (
                <div key={idx} style={{ width: `${w}px`, height: '100%', backgroundColor: '#000' }} />
              ))}
            </div>
            <span style={{ fontSize: '8px', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>RR-PASS-{bookingId}</span>
          </div>
        </div>
      </div>

      {/* Traversal buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
        <button
          onClick={() => setCurrentScreen('bookings')}
          className="glow-btn-gold"
          style={{
            padding: '14px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <FileText size={16} />
          View My Bookings
        </button>

        <button
          onClick={() => setCurrentScreen('home')}
          style={{
            padding: '14px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border-green)',
            background: 'none',
            color: 'var(--color-text-primary)',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'background var(--transition-fast)'
          }}
          className="icon-hover-btn"
        >
          Back to Homepage
        </button>
      </div>

    </div>
  );
}
