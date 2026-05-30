import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle, MapPin, Compass } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  // Custom Inline Instagram SVG
  const InstagramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );

  // Custom Inline Facebook SVG
  const FacebookIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );

  return (
    <div className="view-container">
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: "'Outfit', sans-serif" }}>Community Hub</h1>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
          Connect with our outdoor hiker guides and follow our visual trail networks.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 2fr',
        gap: '30px'
      }} className="desktop-contact-grid">
        
        {/* Left Column: Social channels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* WhatsApp Card */}
          <div className="glass-card-gold" style={{
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(7, 14, 11, 0.4))'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '8px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={18} /> WhatsApp Support
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
              Chat directly with our route managers for immediate answers on trails and customized tours.
            </p>
            <button
              onClick={() => window.open('https://wa.me/1234567890?text=Hi! I am looking for custom trails on RetrieverRoutes.', '_blank')}
              style={{
                width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: 'none',
                backgroundColor: '#10b981', color: '#fff', fontWeight: '700', cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Start WhatsApp Chat
            </button>
          </div>

          {/* Social icons list */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-green)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800' }}>Follow Our Walks</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div 
                onClick={() => window.open('https://instagram.com', '_blank')}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                className="social-row"
              >
                <InstagramIcon />
                <span>Instagram (@RetrieverRoutes)</span>
              </div>
              <div 
                onClick={() => window.open('https://facebook.com', '_blank')}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                className="social-row"
              >
                <FacebookIcon />
                <span>Facebook Page</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} style={{ color: 'var(--color-text-muted)' }} />
                <span>Based in Rishikesh, Uttarakhand</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact message form */}
        <div className="glass-panel" style={{
          padding: '28px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-green)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px' }}>Send a Trail Message</h2>
          
          {submitted ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '40px 0', gap: '16px', color: '#10b981'
            }}>
              <CheckCircle size={48} className="animate-float" />
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Message Dispatched!</h3>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  Thank you! Our hiking guides will write back to you within 24 hours.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="form-input" 
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid-2">
                <div>
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="form-input" 
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Phone Number (Optional)</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="form-input" 
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Subject</label>
                <input 
                  type="text" 
                  placeholder="e.g. Inquiring about custom high-altitude hiking..." 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div>
                <label className="form-label">Message Details</label>
                <textarea 
                  placeholder="Write details about what trails you're interested in..." 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  className="form-input" 
                  rows="4"
                  style={{ resize: 'none', fontFamily: 'inherit' }}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="glow-btn-gold"
                style={{
                  padding: '14px', borderRadius: 'var(--radius-sm)', border: 'none',
                  fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  marginTop: '10px'
                }}
              >
                <Send size={15} /> Send Trail Message
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ❓ Frequently Asked Questions */}
      <section style={{ marginTop: '60px', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '11px', color: 'var(--color-accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Got Questions?
          </span>
          <h2 style={{ fontSize: '26px', fontWeight: '800', fontFamily: "'Outfit', sans-serif", marginTop: '4px' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            Find immediate answers regarding dog safety, trail difficulty, and equipment policies.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '800px', margin: '0 auto' }}>
          {[
            {
              q: "Can I bring any dog breed on the hikes?",
              a: "Yes! We welcome all dog breeds. However, for group walks, pets must be socially comfortable around other dogs and humans. For highly reactive or anxious companions, we recommend planning a Private Custom Route to ensure they have an amazing, stress-free time."
            },
            {
              q: "What fitness level is required for my dog?",
              a: "We offer routes for all staminas! 'Easy' hikes feature flat terrain and plenty of lake swim breaks. 'Hard' hikes feature high-altitude climbs and loose rocks. We suggest starting with an 'Easy' or 'Moderate' route to gauge your dog's trail stamina before attempting rugged mountain treks."
            },
            {
              q: "How do you handle veterinary emergencies on remote trails?",
              a: "Safety is our absolute #1 priority. Every single trek leader is certified in wilderness canine first-aid and pet CPR. We carry dedicated dog trauma kits (including bandage wraps, paw antiseptic, and tick removers) and map emergency exit points with 4x4 vehicle rescue support on every route."
            },
            {
              q: "Are specialized food and sleeping gear provided for pets?",
              a: "Absolutely! For all our curated multi-day cabin or campsite routes, we provide warm elevated canine sleeping cots, thick fleece thermal blankets, and high-protein organic dog kibble. We also pack extra fresh spring water and lightweight collapsible trail bowls."
            }
          ].map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: 'var(--radius-sm)',
                  border: isOpen ? '1px solid rgba(242, 159, 5, 0.3)' : '1px solid var(--color-border-green)',
                  overflow: 'hidden',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {/* FAQ Header Question Trigger */}
                <div
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                  className="faq-header"
                >
                  <span style={{ fontSize: '15px', fontWeight: '700', color: isOpen ? 'var(--color-accent)' : 'var(--color-text-primary)', transition: 'color 0.2s' }}>
                    {faq.q}
                  </span>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    color: isOpen ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'all var(--transition-fast)'
                  }}>
                    +
                  </span>
                </div>

                {/* FAQ Body Answer */}
                {isOpen && (
                  <div style={{
                    padding: '0 24px 20px 24px',
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.6',
                    borderTop: '1px solid rgba(255,255,255,0.03)',
                    paddingTop: '14px',
                    animation: 'fadeIn 0.25s ease-out'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .desktop-contact-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .form-grid-2 {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        .social-row:hover {
          color: var(--color-accent) !important;
        }
      `}</style>
    </div>
  );
}
