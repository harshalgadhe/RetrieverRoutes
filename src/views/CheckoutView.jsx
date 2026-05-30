import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, CreditCard, Calendar, ShieldCheck, Lock, RefreshCw } from 'lucide-react';

export default function CheckoutView({ bookingDraft, setCurrentScreen, onCompleteBooking }) {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@gmail.com');
  const [phone, setPhone] = useState('+1 123 456 7890');
  
  // Payment card inputs
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('123');
  const [cardName, setCardName] = useState('JOHN DOE');
  
  const [isProcessing, setIsProcessing] = useState(false);

  if (!bookingDraft) return null;

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !cardNumber || !expiry || !cvv || !cardName) return;

    setIsProcessing(true);

    // Simulate payment transaction
    setTimeout(() => {
      setIsProcessing(false);
      onCompleteBooking({
        travelerName: name,
        travelerEmail: email,
        travelerPhone: phone,
        cardLastFour: cardNumber.slice(-4)
      });
    }, 2000);
  };

  return (
    <div className="view-container" style={{ paddingBottom: '100px' }}>
      {/* Back button */}
      <button
        onClick={() => setCurrentScreen('select-dates')}
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
        <ArrowLeft size={16} /> Back to Date Selection
      </button>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: "'Outfit', sans-serif" }}>Secure Checkout</h1>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
          Complete traveler information and process secure payment.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '30px'
      }} className="desktop-checkout-grid">

        {/* Left column: Traveler details & Payments Form */}
        <form onSubmit={handlePay} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Section: Traveler Details */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-green)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} style={{ color: 'var(--color-accent)' }} /> Traveler Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Full Name */}
              <div>
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="form-input" 
                  required
                />
              </div>

              {/* Email & Phone grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid-2">
                <div>
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="form-input" 
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="form-input" 
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Payment Method */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-green)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={18} style={{ color: 'var(--color-accent)' }} /> Payment Details
            </h3>

            {/* Simulated Live Credit Card! (Gorgeous premium design) */}
            <div 
              className="glass-card-gold animate-float"
              style={{
                height: '180px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '24px',
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(6, 59, 33, 0.9), rgba(242, 159, 5, 0.2))',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-lg), var(--shadow-glow-gold)',
                color: 'var(--color-text-primary)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '0.05em' }}>RetrieverRoutes VIP</span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-gold)', fontWeight: '700' }}>SECURE PAY</span>
              </div>

              <div>
                {/* Chip illustration */}
                <div style={{
                  width: '32px',
                  height: '24px',
                  backgroundColor: '#ecc94b',
                  borderRadius: '4px',
                  marginBottom: '10px',
                  boxShadow: 'inset 0 0 4px rgba(0,0,0,0.5)'
                }} />
                
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  letterSpacing: '0.15em',
                  fontFamily: 'monospace',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                  {cardNumber || '•••• •••• •••• ••••'}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '11px' }}>
                <div>
                  <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '8px', textTransform: 'uppercase' }}>Cardholder</span>
                  <span style={{ fontWeight: '700', letterSpacing: '0.05em' }}>{cardName || 'JOHN DOE'}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '8px', textTransform: 'uppercase' }}>Expires</span>
                  <span style={{ fontWeight: '700' }}>{expiry || 'MM/YY'}</span>
                </div>
              </div>
            </div>

            {/* Payment Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Card Number</label>
                <input 
                  type="text" 
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber} 
                  onChange={(e) => setCardNumber(e.target.value)} 
                  className="form-input" 
                  maxLength="19"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid-2">
                <div>
                  <label className="form-label">Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    value={expiry} 
                    onChange={(e) => setExpiry(e.target.value)} 
                    className="form-input" 
                    maxLength="5"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">CVV</label>
                  <input 
                    type="password" 
                    placeholder="123"
                    value={cvv} 
                    onChange={(e) => setCvv(e.target.value)} 
                    className="form-input" 
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Cardholder Name</label>
                <input 
                  type="text" 
                  placeholder="JOHN DOE"
                  value={cardName} 
                  onChange={(e) => setCardName(e.target.value.toUpperCase())} 
                  className="form-input" 
                  required
                />
              </div>
            </div>
          </div>
        </form>

        {/* Right column: Trip order details summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Order Summary box */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-green)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
              Order Summary
            </h3>

            {/* Trip brief */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
              <img 
                src={bookingDraft.tripImage} 
                alt={bookingDraft.tripTitle} 
                style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '700' }}>{bookingDraft.tripTitle}</h4>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  {formatDate(bookingDraft.startDate)} - {formatDate(bookingDraft.endDate)}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  {bookingDraft.durationDays} Days • {bookingDraft.travelers.adults + bookingDraft.travelers.children} Travelers
                </div>
              </div>
            </div>

            {/* Price lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Standard Fare:</span>
                <span>${bookingDraft.tripPrice} / traveler</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Travelers Count:</span>
                <span>{bookingDraft.travelers.adults + bookingDraft.travelers.children}x</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed rgba(255,255,255,0.05)', paddingTop: '10px', marginTop: '4px' }}>
                <span style={{ fontWeight: '700', fontSize: '14px' }}>Total Amount:</span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-text-gold)' }}>
                  ${bookingDraft.totalCost}
                </span>
              </div>
            </div>
          </div>

          {/* Secure lock disclaimer badge */}
          <div className="glass-card" style={{
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border-green)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: 'none'
          }}>
            <Lock size={24} style={{ color: 'var(--color-accent)' }} />
            <div>
              <h4 style={{ fontSize: '12px', fontWeight: '700' }}>Secure Encryption</h4>
              <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                All transaction details are protected by standard mock SSL secure shields.
              </p>
            </div>
          </div>

          <button 
            type="submit" 
            onClick={handlePay}
            disabled={isProcessing}
            className="glow-btn-gold"
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '16px',
              fontWeight: '700',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '100%',
              boxShadow: 'var(--shadow-glow-gold)'
            }}
          >
            {isProcessing ? (
              <>
                <RefreshCw size={16} className="spin-animation" style={{ animation: 'spin 1.2s linear infinite' }} />
                Authorizing Transaction...
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                Pay Now (${bookingDraft.totalCost})
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .desktop-checkout-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .form-grid-2 {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
