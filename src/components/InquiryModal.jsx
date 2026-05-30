import React, { useState } from 'react';
import { X, MessageSquare, Send, Check, Phone, ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react';

export default function InquiryModal({ isOpen, onClose, trip }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [datePreference, setDatePreference] = useState('');
  const [message, setMessage] = useState('');
  
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success'

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  const handleWhatsAppRedirect = () => {
    // Open a mock WhatsApp chat in a new tab
    window.open(`https://wa.me/1234567890?text=Hi! I am interested in booking the ${trip ? trip.title : 'custom route'} tour with RetrieverRoutes.`, '_blank');
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setDatePreference('');
    setMessage('');
    setStatus('idle');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(7, 14, 11, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 2500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '500px',
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
            <MessageSquare size={20} color="var(--color-accent)" />
            <h2 style={{ fontSize: '18px', fontWeight: '800', fontFamily: "'Outfit', sans-serif" }}>
              {trip ? `Inquire: ${trip.title}` : 'Plan Custom Trip'}
            </h2>
          </div>
          <button 
            onClick={() => { onClose(); resetForm(); }}
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

        {/* Content */}
        <div className="custom-scrollbar" style={{
          padding: '24px',
          overflowY: 'auto',
          flexGrow: 1
        }}>
          {status === 'idle' && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '4px' }}>
                Fill out this quick form. Our expert guides will message you on WhatsApp or Email within 2 hours to finalize your itinerary!
              </p>

              {/* Name */}
              <div>
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Harsh Sharma" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="form-input" 
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  placeholder="e.g. harsh@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="form-input" 
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="form-label">Phone Number (WhatsApp Preferred)</label>
                <input 
                  type="tel" 
                  placeholder="e.g. +91 98765 43210" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  className="form-input" 
                  required
                />
              </div>

              {/* Date preference */}
              <div>
                <label className="form-label">Preferred Travel Window</label>
                <div style={{ position: 'relative' }}>
                  <select 
                    value={datePreference} 
                    onChange={(e) => setDatePreference(e.target.value)} 
                    className="form-input"
                    style={{ cursor: 'pointer', appearance: 'none', background: 'rgba(0, 0, 0, 0.4)', paddingRight: '40px' }}
                  >
                    <option value="" disabled>Select Month / Season</option>
                    <option value="June - August 2026">June - August 2026 (Summer Peak)</option>
                    <option value="September - November 2026">September - November 2026 (Autumn Trails)</option>
                    <option value="December - February 2027">December - February 2027 (Winter Treks)</option>
                    <option value="Spring 2027">Spring 2027</option>
                  </select>
                  <ChevronDown 
                    size={16} 
                    style={{ 
                      position: 'absolute', 
                      right: '16px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: 'var(--color-text-muted)', 
                      pointerEvents: 'none' 
                    }} 
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="form-label">Custom Requirements / Notes</label>
                <textarea 
                  placeholder="Tell us what kind of hikes you like, dog policies, or standard fitness limits..." 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  className="form-input" 
                  rows="3"
                  style={{ resize: 'none', fontFamily: 'inherit' }}
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
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
                  gap: '8px',
                  marginTop: '10px'
                }}
              >
                <Send size={15} />
                Send Trip Inquiry
              </button>
            </form>
          )}

          {status === 'submitting' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 0', gap: '20px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                border: '3px solid rgba(242, 159, 5, 0.15)',
                borderTopColor: 'var(--color-accent)',
                animation: 'spin 1s linear infinite',
                boxShadow: 'var(--shadow-glow-gold)'
              }} className="pulse-glow" />
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Sending Inquiry...</h3>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>Drafting customized tour details for our hiking guides.</p>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center', padding: '10px 0' }}>
              
              {/* Success Badge */}
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '2px solid #10b981',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto', color: '#10b981'
              }} className="animate-float">
                <Check size={36} />
              </div>

              <div>
                <h3 style={{ fontSize: '22px', fontWeight: '800', fontFamily: "'Outfit', sans-serif" }}>Inquiry Dispatched!</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginTop: '8px' }}>
                  Thank you, <strong style={{ color: 'var(--color-text-primary)' }}>{name}</strong>! We have registered your preference for {trip ? trip.title : 'your custom route'}.
                </p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px', lineHeight: '1.5' }}>
                  A hiking specialist will contact you on WhatsApp or Email soon.
                </p>
              </div>

              {/* Instant WhatsApp Connect block */}
              <div 
                className="glass-card-gold" 
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  marginTop: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--color-accent)' }} />
                  <span style={{ fontSize: '13px', fontWeight: '700' }}>Want instant responses?</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', maxWidth: '280px' }}>
                  Skip the queue! Connect directly with our lead hiking guide right now on WhatsApp.
                </p>
                
                <button
                  onClick={handleWhatsAppRedirect}
                  className="glow-btn-gold"
                  style={{
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: 'var(--shadow-glow-gold)'
                  }}
                >
                  <Phone size={14} /> Chat on WhatsApp Now
                </button>
              </div>

              {/* Close trigger */}
              <button 
                onClick={() => { onClose(); resetForm(); }}
                className="icon-hover-btn"
                style={{
                  margin: '10px auto 0 auto',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border-green)',
                  background: 'none',
                  color: 'var(--color-text-primary)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: 'fit-content'
                }}
              >
                Close Window
              </button>
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
