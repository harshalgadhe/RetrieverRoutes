import React, { useState } from 'react';
import { ArrowLeft, Users, Calendar, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function SelectDatesView({ trip, setCurrentScreen, bookingDraft, setBookingDraft }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1)); // May 2026
  const [selectedStart, setSelectedStart] = useState(bookingDraft?.startDate || null);
  const [selectedEnd, setSelectedEnd] = useState(bookingDraft?.endDate || null);
  const [adults, setAdults] = useState(bookingDraft?.travelers?.adults || 2);
  const [childrenCount, setChildrenCount] = useState(bookingDraft?.travelers?.children || 0);

  if (!trip) return null;

  // Static structure for May 2026 (Starts on a Friday)
  const daysInMonth = 31;
  const startOffset = 5; // Friday offset
  const monthName = 'May 2026';

  const handleDayClick = (dayNum) => {
    const clickedDate = new Date(2026, 4, dayNum);

    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(clickedDate);
      setSelectedEnd(null);
    } else if (selectedStart && !selectedEnd) {
      if (clickedDate >= selectedStart) {
        setSelectedEnd(clickedDate);
      } else {
        setSelectedStart(clickedDate);
        setSelectedEnd(null);
      }
    }
  };

  const isSelected = (dayNum) => {
    const d = new Date(2026, 4, dayNum);
    return (selectedStart && d.getTime() === selectedStart.getTime()) ||
           (selectedEnd && d.getTime() === selectedEnd.getTime());
  };

  const isInRange = (dayNum) => {
    if (!selectedStart || !selectedEnd) return false;
    const d = new Date(2026, 4, dayNum);
    return d > selectedStart && d < selectedEnd;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDurationDays = () => {
    if (!selectedStart || !selectedEnd) return 0;
    const diffTime = Math.abs(selectedEnd - selectedStart);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const totalTravelers = adults + childrenCount;
  const totalCost = trip.price * totalTravelers;

  const handleContinue = () => {
    if (!selectedStart || !selectedEnd) return;
    
    setBookingDraft({
      tripId: trip.id,
      tripTitle: trip.title,
      tripPrice: trip.price,
      tripImage: trip.image,
      startDate: selectedStart,
      endDate: selectedEnd,
      durationDays: getDurationDays(),
      travelers: { adults, children: childrenCount },
      totalCost
    });

    setCurrentScreen('checkout');
  };

  // Calendar rendering helper
  const renderDays = () => {
    const days = [];
    
    // Empty cells for offset
    for (let i = 0; i < startOffset; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    // Days buttons
    for (let d = 1; d <= daysInMonth; d++) {
      const isSel = isSelected(d);
      const inRng = isInRange(d);
      const isStart = selectedStart && d === selectedStart.getDate();
      const isEnd = selectedEnd && d === selectedEnd.getDate();

      let btnClass = 'calendar-day-btn';
      if (isSel) btnClass += ' selected';
      if (inRng) btnClass += ' in-range';
      if (isStart) btnClass += ' range-start';
      if (isEnd) btnClass += ' range-end';

      days.push(
        <button
          key={`day-${d}`}
          onClick={() => handleDayClick(d)}
          className={btnClass}
          style={{
            color: isSel ? '#070e0b' : d < 10 ? 'var(--color-text-muted)' : 'var(--color-text-primary)', // Dim past dates
            opacity: d < 10 ? 0.4 : 1, // Simulate past days
            pointerEvents: d < 10 ? 'none' : 'auto'
          }}
        >
          {d}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="view-container" style={{ paddingBottom: '120px' }}>
      {/* Back to Details */}
      <button
        onClick={() => setCurrentScreen('details')}
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
        <ArrowLeft size={16} /> Back to Details
      </button>

      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: "'Outfit', sans-serif" }}>Select Dates & Party</h1>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
          Schedule your adventure on our interactive booking calendar.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '30px'
      }} className="desktop-calendar-grid">

        {/* Left Panel: Calendar Picker */}
        <div className="glass-panel" style={{
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-green)',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Calendar Header Month switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800' }}>{monthName}</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button disabled className="icon-hover-btn" style={{ padding: '6px', border: 'none', background: 'none', opacity: 0.3 }}>
                <ChevronLeft size={16} />
              </button>
              <button disabled className="icon-hover-btn" style={{ padding: '6px', border: 'none', background: 'none', opacity: 0.3 }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday labels */}
          <div className="calendar-grid" style={{ marginBottom: '8px' }}>
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((w) => (
              <span key={w} className="calendar-day-header">{w}</span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="calendar-grid">
            {renderDays()}
          </div>
        </div>

        {/* Right Panel: Guests & Cost Summaries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Travelers Adjustment */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-green)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} style={{ color: 'var(--color-accent)' }} /> Travelers Party
            </h3>

            {/* Adults adjustment */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '700', display: 'block' }}>Adults</span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Age 13 or above</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="icon-hover-btn"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-border-green)',
                    background: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ fontSize: '16px', fontWeight: '800', minWidth: '16px', textAlign: 'center' }}>
                  {adults}
                </span>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="icon-hover-btn"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-border-green)',
                    background: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Children Adjustment */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '700', display: 'block' }}>Children</span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Ages 2-12</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                  className="icon-hover-btn"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-border-green)',
                    background: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ fontSize: '16px', fontWeight: '800', minWidth: '16px', textAlign: 'center' }}>
                  {childrenCount}
                </span>
                <button
                  onClick={() => setChildrenCount(childrenCount + 1)}
                  className="icon-hover-btn"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-border-green)',
                    background: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Breakdowns */}
          <div className="glass-card-gold" style={{
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '16px', color: 'var(--color-text-gold)' }}>
              Selected Itinerary
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', borderBottom: '1px solid rgba(242,159,5,0.15)', paddingBottom: '14px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Selected Dates:</span>
                <span style={{ fontWeight: '700' }}>
                  {selectedStart ? (
                    `${formatDate(selectedStart)}${selectedEnd ? ` - ${formatDate(selectedEnd)}` : ''}`
                  ) : (
                    <span style={{ color: 'var(--color-text-muted)', fontWeight: '400' }}>Click dates on calendar</span>
                  )}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Total Duration:</span>
                <span style={{ fontWeight: '700' }}>
                  {selectedStart && selectedEnd ? `${getDurationDays()} Days` : 'N/A'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Travelers:</span>
                <span style={{ fontWeight: '700' }}>{totalTravelers} Persons</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Total (All Tax Included):</span>
              <span style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-text-gold)' }}>
                ${totalCost}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions Trigger */}
      <div 
        className="glass-panel"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
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
            Current total
          </span>
          <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-text-gold)' }}>
            ${totalCost}
          </div>
        </div>

        <button 
          onClick={handleContinue}
          disabled={!selectedStart || !selectedEnd}
          className="glow-btn-gold"
          style={{
            padding: '14px 28px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            fontSize: '15px',
            fontWeight: '700',
            cursor: !selectedStart || !selectedEnd ? 'not-allowed' : 'pointer',
            opacity: !selectedStart || !selectedEnd ? 0.4 : 1
          }}
        >
          Continue to Checkout
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-calendar-grid {
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
