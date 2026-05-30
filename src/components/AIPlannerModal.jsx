import React, { useState } from 'react';
import { X, Sparkles, Footprints, Calendar, Compass, ArrowRight, Check } from 'lucide-react';

export default function AIPlannerModal({ isOpen, onClose, onBookCustomTrip }) {
  const [step, setStep] = useState(1); // 1 = forms, 2 = loading, 3 = result
  const [vibe, setVibe] = useState('Adventure');
  const [duration, setDuration] = useState('6 Days');
  const [pace, setPace] = useState('Active Setter');
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);

    // Simulate standard AI processing
    setTimeout(() => {
      const plans = {
        'Adventure': {
          title: 'Volcanoes & Sacred Waterfalls Trail',
          location: 'Bali Highlands & Northern Coast',
          price: 79000,
          days: [
            { day: 'Day 1', act: 'Arrive in Ubud, traditional organic welcome dinner' },
            { day: 'Day 2', act: 'Hike through scenic Tegallalang emerald rice terraces & jungle paths' },
            { day: 'Day 3', act: 'Sunrise trek up Mount Batur Volcano, followed by hot spring bathing' },
            { day: 'Day 4', act: 'Explore secret canyon waterfalls and swim in Sekumpul plunge pools' },
            { day: 'Day 5', act: 'Sea kayaking on the northern shore of Lovina' },
            { day: 'Day 6', act: 'Return to Ubud, traditional craft market walk and departure' }
          ]
        },
        'Beach': {
          title: 'Karst Cliffs & Coral Island Hopping',
          location: 'Phuket & Phi Phi Bays',
          price: 69000,
          days: [
            { day: 'Day 1', act: 'Arrive in Phuket, beachside seafood barbecue and briefing' },
            { day: 'Day 2', act: 'Private longtail boat tour of Phang Nga Bay cave shrines' },
            { day: 'Day 3', act: 'Snorkeling with sea turtles in Phi Phi coral reefs' },
            { day: 'Day 4', act: 'Coastal hiking route around Prompthep Cape viewpoint' },
            { day: 'Day 5', act: 'Paddleboarding & beach spa treatments' },
            { day: 'Day 6', act: 'Traditional Thai wellness class & departure' }
          ]
        },
        'Mountains': {
          title: 'Matterhorn Pass & Alpine Lake Wanderer',
          location: 'Zermatt, Swiss Alps',
          price: 135000,
          days: [
            { day: 'Day 1', act: 'Arrive in Zermatt alpine village, local cheese fondue evening' },
            { day: 'Day 2', act: 'Scenic cogwheel train ride & high-altitude trail hike' },
            { day: 'Day 3', act: 'Challenging glacier edge traverse with custom ice-spikes' },
            { day: 'Day 4', act: 'Visit five crystalline alpine lakes reflecting the Matterhorn' },
            { day: 'Day 5', act: 'Rest day in mountain lodges, wildlife photography walk' },
            { day: 'Day 6', act: 'Scenic cableway descent and departure' }
          ]
        }
      };

      setGeneratedItinerary(plans[vibe] || plans['Adventure']);
      setStep(3);
    }, 1800);
  };

  const handleBook = () => {
    if (generatedItinerary) {
      // Simulate booking pre-config
      onBookCustomTrip({
        id: `ai-custom-${vibe.toLowerCase()}`,
        title: `AI Custom: ${generatedItinerary.title}`,
        location: generatedItinerary.location,
        duration: duration,
        durationDays: parseInt(duration),
        groupSize: 'Private Group',
        difficulty: pace === 'Leisurely Retriever' ? 'Easy' : pace === 'Active Setter' ? 'Moderate' : 'Hard',
        price: generatedItinerary.price,
        rating: 5.0,
        reviewsCount: 1,
        image: vibe === 'Beach' 
          ? 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80'
          : vibe === 'Mountains'
            ? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
            : 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
        highlights: generatedItinerary.days.map(d => d.act),
        inclusions: { hotels: true, meals: true, transport: true, guide: true, activities: true }
      });
      onClose();
      resetModal();
    }
  };

  const resetModal = () => {
    setStep(1);
    setVibe('Adventure');
    setDuration('6 Days');
    setPace('Active Setter');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(7, 14, 11, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      {/* Modal Container */}
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '540px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow-gold)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={20} color="var(--color-accent)" className="animate-float" />
            <h2 style={{ fontSize: '20px', fontWeight: '800', fontFamily: "'Outfit', sans-serif" }}>
              AI Route Planner
            </h2>
          </div>
          <button 
            onClick={() => { onClose(); resetModal(); }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%'
            }}
            className="icon-hover-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="custom-scrollbar" style={{
          padding: '24px',
          overflowY: 'auto',
          flexGrow: 1
        }}>
          {step === 1 && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Provide your preferred travel traits, and our simulated AI engine will draft an authentic, hiker-approved wilderness route!
                </p>
              </div>

              {/* Vibe Preference */}
              <div>
                <label className="form-label">Route Vibe</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {['Beach', 'Adventure', 'Mountains'].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVibe(v)}
                      style={{
                        padding: '12px 6px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        border: vibe === v ? '1px solid var(--color-accent)' : '1px solid var(--color-border-green)',
                        background: vibe === v ? 'rgba(242, 159, 5, 0.12)' : 'rgba(0,0,0,0.2)',
                        color: vibe === v ? 'var(--color-accent)' : 'var(--color-text-secondary)'
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration selector */}
              <div>
                <label className="form-label">Duration</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {['4 Days', '6 Days', '8 Days'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      style={{
                        padding: '12px 6px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        border: duration === d ? '1px solid var(--color-accent)' : '1px solid var(--color-border-green)',
                        background: duration === d ? 'rgba(242, 159, 5, 0.12)' : 'rgba(0,0,0,0.2)',
                        color: duration === d ? 'var(--color-accent)' : 'var(--color-text-secondary)'
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Retriever Themed Pace */}
              <div>
                <label className="form-label">Trail Pace / Athletic Level</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { id: 'Leisurely Retriever', desc: 'Slow & scenic walks, plenty of swim & spa breaks' },
                    { id: 'Active Setter', desc: 'Steady hikes, cultural climbs, standard trails' },
                    { id: 'Energetic Collie', desc: 'High-altitude treks, rugged trails, mountain climbs' }
                  ].map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setPace(p.id)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        border: pace === p.id ? '1px solid var(--color-accent)' : '1px solid var(--color-border-green)',
                        background: pace === p.id ? 'rgba(242, 159, 5, 0.08)' : 'rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                      }}
                    >
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: pace === p.id ? 'var(--color-accent)' : 'var(--color-text-primary)'
                      }}>
                        {p.id}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                        {p.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                className="glow-btn-gold"
                style={{
                  marginTop: '10px',
                  width: '100%',
                  padding: '14px',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '15px'
                }}
              >
                <Sparkles size={16} />
                Generate Custom Route
              </button>
            </form>
          )}

          {step === 2 && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 0',
              gap: '20px'
            }}>
              {/* Spinner */}
              <div 
                className="pulse-glow"
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  border: '3px solid rgba(242, 159, 5, 0.15)',
                  borderTopColor: 'var(--color-accent)',
                  animation: 'spin 1s linear infinite',
                  boxShadow: 'var(--shadow-glow-gold)'
                }}
              />
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                  Analyzing Topography & Trails...
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                  Simulating retriever-smooth paths for {pace} standard.
                </p>
              </div>
            </div>
          )}

          {step === 3 && generatedItinerary && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Success Badge */}
              <div className="glass-card-gold" style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(242, 159, 5, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-accent)'
                }}>
                  <Check size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--color-accent)', fontWeight: '700', textTransform: 'uppercase' }}>
                    Route Designed
                  </span>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                    {generatedItinerary.title}
                  </h4>
                </div>
              </div>

              {/* Itinerary Daily timeline */}
              <div>
                <h4 className="form-label" style={{ marginBottom: '12px' }}>Simulated Itinerary</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', paddingLeft: '20px' }}>
                  {/* Vertical line indicator */}
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    bottom: '8px',
                    left: '5px',
                    width: '2px',
                    background: 'rgba(242, 159, 5, 0.15)'
                  }} />

                  {generatedItinerary.days.map((item, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      {/* Timeline dot */}
                      <div style={{
                        position: 'absolute',
                        top: '5px',
                        left: '-20px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#070e0b',
                        border: '2px solid var(--color-accent)',
                        zIndex: 2
                      }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-accent)' }}>
                          {item.day}
                        </span>
                        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                          {item.act}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book AI Option */}
              <div style={{
                marginTop: '10px',
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: '12px',
                alignItems: 'center',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Estimated Cost</span>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-text-gold)' }}>
                    ₹{generatedItinerary.price.toLocaleString('en-IN')}
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: '400' }}>/person</span>
                  </div>
                </div>
                <button
                  onClick={handleBook}
                  className="glow-btn-gold"
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  Book Route <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
