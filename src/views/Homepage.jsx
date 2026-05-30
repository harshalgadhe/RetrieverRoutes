import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin, ChevronRight, Star, Phone, Mail, CheckCircle, Compass, Shield, Heart, ChevronLeft, ChevronDown, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tripsData } from '../data/tripsData';

export default function Homepage({ setCurrentScreen, setSelectedTrip, setSearchQuery, setFilterCategory, onOpenInquiry }) {
  const [searchWhere, setSearchWhere] = useState('');
  const [searchDates, setSearchDates] = useState('');
  
  // Custom interactive travelers count state
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [showDatesDropdown, setShowDatesDropdown] = useState(false);
  
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Derived high-fidelity travelers label
  const searchGuests = `${adults} Adult${adults !== 1 ? 's' : ''}${childrenCount > 0 ? `, ${childrenCount} Child${childrenCount !== 1 ? 'ren' : ''}` : ''}`;

  // Newsletter subscription
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const popularDestinations = [
    { name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80', category: 'Beach' },
    { name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=500&q=80', category: 'Beach' },
    { name: 'Swiss Alps', country: 'Switzerland', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80', category: 'Mountains' },
    { name: 'Machu Picchu', country: 'Peru', image: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490?auto=format&fit=crop&w=500&q=80', category: 'Adventure' },
  ];

  const featuredTrips = tripsData.filter(t => t.categories.includes('Popular')).slice(0, 3);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchWhere) {
      setSearchQuery(searchWhere);
    }
    setCurrentScreen('explore');
  };

  const handleDestinationClick = (dest) => {
    setSearchQuery(dest.name);
    setFilterCategory(dest.category);
    setCurrentScreen('explore');
  };

  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    setCurrentScreen('details');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  // Custom Inline Instagram SVG
  const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );

  return (
    <div className="view-container">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        minHeight: '440px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px 30px',
        marginBottom: '40px',
        boxShadow: 'var(--shadow-lg)',
        backgroundImage: 'var(--color-hero-bg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: 'var(--color-hero-border)'
      }}>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: '640px' }}
        >
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '16px',
            color: 'var(--color-text-primary)',
            textShadow: 'var(--text-shadow-hero)'
          }}>
            Explore the World with{' '}
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--color-logo-retriever)', textShadow: 'var(--text-shadow-brand-green)' }}>Retriever</span>
              <span style={{ color: '#f29f05', textShadow: 'var(--text-shadow-brand-gold)' }}>Routes</span>
            </span>
          </h1>
          <p style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            marginBottom: '32px',
            fontWeight: '500',
            lineHeight: '1.6',
            textShadow: 'var(--text-shadow-sub)'
          }}>
            Find custom outdoor routes, unforgettable tours, and certified pet-friendly hiking trails.
          </p>
        </motion.div>

        {/* Quick Search Panel */}
        <motion.form 
          onSubmit={handleSearchSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-panel" 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(242, 159, 5, 0.25)',
            boxShadow: 'var(--shadow-md), var(--shadow-glow-gold)',
            alignItems: 'end',
            width: '100%',
            maxWidth: '900px'
          }}
        >
          <div>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} style={{ color: 'var(--color-accent)' }} />
              Where to?
            </label>
            <input 
              type="text" 
              placeholder="Country, region, trail..." 
              value={searchWhere}
              onChange={(e) => setSearchWhere(e.target.value)}
              className="form-input"
            />
          </div>

          <div style={{ position: 'relative' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} style={{ color: 'var(--color-accent)' }} />
              Check In
            </label>
            <div 
              onClick={() => {
                setShowDatesDropdown(!showDatesDropdown);
                setShowGuestsDropdown(false);
              }}
              className="form-input"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {searchDates || 'Select season...'}
              </span>
              <ChevronDown size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0, transform: showDatesDropdown ? 'rotate(180deg)' : 'none', transition: 'transform var(--transition-fast)' }} />
            </div>
            {showDatesDropdown && (
              <div className="dropdown-panel custom-scrollbar">
                {['Summer 2026 (Peak Hikes)', 'Autumn 2026 (Gold Foliage)', 'Winter 2027 (Alpine Snow)', 'Spring 2027 (Blooming Trails)'].map((s) => (
                  <div
                    key={s}
                    onClick={() => { setSearchDates(s); setShowDatesDropdown(false); }}
                    className="dropdown-item"
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ position: 'relative' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={14} style={{ color: 'var(--color-accent)' }} />
              Travelers
            </label>
            <div 
              onClick={() => {
                setShowGuestsDropdown(!showGuestsDropdown);
                setShowDatesDropdown(false);
              }}
              className="form-input"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {searchGuests}
              </span>
              <ChevronDown size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0, transform: showGuestsDropdown ? 'rotate(180deg)' : 'none', transition: 'transform var(--transition-fast)' }} />
            </div>
            {showGuestsDropdown && (
              <div className="dropdown-panel custom-scrollbar" style={{ minWidth: '240px', padding: '16px 16px 20px 16px' }}>
                {/* Adults Counter */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-primary)' }}>Adults</span>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Age 13 or above</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      style={{
                        width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--color-border-green)',
                        background: 'none', color: 'var(--color-text-primary)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                      className="icon-hover-btn"
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: '14px', fontWeight: '700', minWidth: '14px', textAlign: 'center' }}>{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      style={{
                        width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--color-border-green)',
                        background: 'none', color: 'var(--color-text-primary)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                      className="icon-hover-btn"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Children Counter */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-primary)' }}>Children</span>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Ages 2-12</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                      style={{
                        width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--color-border-green)',
                        background: 'none', color: 'var(--color-text-primary)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                      className="icon-hover-btn"
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: '14px', fontWeight: '700', minWidth: '14px', textAlign: 'center' }}>{childrenCount}</span>
                    <button
                      type="button"
                      onClick={() => setChildrenCount(childrenCount + 1)}
                      style={{
                        width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--color-border-green)',
                        background: 'none', color: 'var(--color-text-primary)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                      className="icon-hover-btn"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Done button to close */}
                <button
                  type="button"
                  onClick={() => setShowGuestsDropdown(false)}
                  className="glow-btn-gold"
                  style={{
                    width: '100%', padding: '8px 12px', border: 'none', borderRadius: 'var(--radius-sm)',
                    fontSize: '12px', fontWeight: '700', cursor: 'pointer'
                  }}
                >
                  Apply Selection
                </button>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="glow-btn-gold"
            style={{
              width: '100%', height: '46px', border: 'none', borderRadius: 'var(--radius-sm)',
              fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            <Search size={18} /> Explore Now
          </button>
        </motion.form>
      </section>

      {/* Popular Destinations */}
      <section style={{ marginBottom: '50px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Popular Destinations</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              Handpicked locales beloved by our community
            </p>
          </div>
          <button 
            onClick={() => { setSearchQuery(''); setFilterCategory('All'); setCurrentScreen('explore'); }}
            style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            className="text-link"
          >
            View all <ChevronRight size={16} />
          </button>
        </div>

        <div className="no-scrollbar" style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
          {popularDestinations.map((dest, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleDestinationClick(dest)}
              className="glass-card"
              style={{
                flex: '0 0 240px', height: '160px', position: 'relative',
                borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer'
              }}
            >
              <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-normal)' }} className="dest-card-img" />
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(transparent 30%, rgba(7, 14, 11, 0.9))',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>{dest.name}</h3>
                <p style={{ fontSize: '12px', color: '#a3c2b2', textShadow: '0 1px 2px rgba(0,0,0,0.4)', fontWeight: '600' }}>{dest.country}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Trips */}
      <section style={{ marginBottom: '50px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Featured Trips</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              Curated adventure tours with standard ratings
            </p>
          </div>
          <button 
            onClick={() => { setSearchQuery(''); setFilterCategory('All'); setCurrentScreen('explore'); }}
            style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            className="text-link"
          >
            Explore all <ChevronRight size={16} />
          </button>
        </div>

        {/* Dynamic stagger-loaded cards! */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}
        >
          {featuredTrips.map((trip) => (
            <motion.div
              key={trip.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => handleTripClick(trip)}
              className="glass-card"
              style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <div style={{ position: 'relative', height: '200px' }}>
                <img src={trip.image} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'rgba(7, 14, 11, 0.85)', backdropFilter: 'blur(8px)',
                  border: '1px solid var(--color-border)', color: '#f29f05',
                  padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: '13px', fontWeight: '700'
                }}>
                  From ₹{trip.price.toLocaleString('en-IN')}
                </div>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-accent)', backgroundColor: 'rgba(242, 159, 5, 0.12)', padding: '3px 8px', borderRadius: '4px' }}>
                    {trip.duration}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>•</span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{trip.difficulty}</span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>{trip.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>{trip.description}</p>

                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                    <span style={{ fontSize: '13px', fontWeight: '700' }}>{trip.rating}</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>({trip.reviewsCount} reviews)</span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-accent)' }}>
                    Inquire Details →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 🐾 The Retriever Standards */}
      <section style={{ marginBottom: '60px', marginTop: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '11px', color: 'var(--color-accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Brand Promise
          </span>
          <h2 style={{ fontSize: '28px', fontWeight: '800', fontFamily: "'Outfit', sans-serif", marginTop: '4px' }}>
            🐾 The Retriever Standards
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px', maxWidth: '500px', margin: '4px auto 0 auto', lineHeight: '1.5' }}>
            Our certified, hiker-tested safety guidelines and specialized pet accommodations keep our active packs happy and secure on the trail.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {/* Card 1 */}
          <div className="glass-card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '50%',
              backgroundColor: 'rgba(242, 159, 5, 0.12)',
              color: 'var(--color-accent)', display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              <Shield size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px' }}>Trail Paw & Safety Gear</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                Every trek includes customized canine first-aid kits, high-vis trail vest fitting, active hydration tracking, and eco-friendly protective booties for rough volcanic or glacial terrains.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '50%',
              backgroundColor: 'rgba(11, 102, 56, 0.15)',
              color: 'var(--color-primary-light)', display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              <Compass size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px' }}>Certified Leash-Free Cabins</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                We curate campgrounds and cabins with fenced, leash-free recreational yards, customized organic dog menus, elevated sleeping cots, and cozy trail blankets for chilly outdoor nights.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '50%',
              backgroundColor: 'rgba(242, 159, 5, 0.12)',
              color: 'var(--color-accent)', display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              <Users size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px' }}>Certified Canine Guides</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                Our professional mountain guides hold certifications in wilderness veterinary first-aid and canine behavioral psychology. They ensure healthy pack harmony and optimal trail speeds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 💬 Furry Companion Testimonials */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '11px', color: 'var(--color-accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Social Proof
          </span>
          <h2 style={{ fontSize: '28px', fontWeight: '800', fontFamily: "'Outfit', sans-serif", marginTop: '4px' }}>
            💬 Furry Companion Reviews
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            Read authentic stories from active dog owners who explored trails with our hiker pack.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="glass-panel" style={{
          maxWidth: '750px',
          margin: '0 auto',
          padding: '40px 32px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-green)',
          position: 'relative',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Active slide content */}
          <div style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="var(--color-accent)" color="var(--color-accent)" />
              ))}
            </div>

            <p style={{
              fontSize: '15px',
              fontStyle: 'italic',
              color: 'var(--color-text-primary)',
              lineHeight: '1.6',
              marginBottom: '24px',
              maxWidth: '580px'
            }}>
              "{[
                "The Valley of Flowers trek was Rusty's dream. RetrieverRoutes organized everything—from organic high-calorie trail kibble to customized paw protectors for active rocky climbs. Total peace of mind!",
                "Luna is an energetic Border Collie, and standard walks usually bore her. The Alpine Lake route was absolutely thrilling—safe, challenging, and our trek leader handled the pack interaction brilliantly.",
                "I was anxious about taking Simba on a high-altitude trek, but the guide's canine first-aid expertise, timely hydration intervals, and gentle paw rubs kept my retriever active and incredibly happy."
              ][activeTestimonial]}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)', color: 'var(--color-text-primary)',
                display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800',
                fontSize: '15px', border: '1px solid var(--color-border)'
              }}>
                {["R", "L", "S"][activeTestimonial]}
              </div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '14px', fontWeight: '800', display: 'block', color: 'var(--color-text-primary)' }}>
                  {[
                    "Rusty (Golden Retriever) & Harsh S.",
                    "Luna (Border Collie) & Sarah K.",
                    "Simba (Labrador) & Rahul A."
                  ][activeTestimonial]}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  {[
                    "Hiked Bali Adventure",
                    "Hiked Swiss Alps Trek",
                    "Hiked Machu Picchu Expedition"
                  ][activeTestimonial]}
                </span>
              </div>
            </div>
          </div>

          {/* Left/Right Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '28px'
          }}>
            <button
              onClick={() => setActiveTestimonial(prev => (prev === 0 ? 2 : prev - 1))}
              className="icon-hover-btn"
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                border: '1px solid var(--color-border-green)',
                background: 'rgba(0,0,0,0.2)', color: 'var(--color-text-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }}
            >
              <ChevronLeft size={16} />
            </button>
            
            {/* Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {[0, 1, 2].map((idx) => (
                <span
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    backgroundColor: activeTestimonial === idx ? 'var(--color-accent)' : 'rgba(255,255,255,0.2)',
                    cursor: 'pointer', display: 'inline-block', transition: 'background-color 0.2s'
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveTestimonial(prev => (prev === 2 ? 0 : prev + 1))}
              className="icon-hover-btn"
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                border: '1px solid var(--color-border-green)',
                background: 'rgba(0,0,0,0.2)', color: 'var(--color-text-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Community & Social Connect Grid */}
      <section style={{ marginBottom: '30px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '800', fontFamily: "'Outfit', sans-serif" }}>Connect with our Hiker Pack</h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            We're highly active! Reach out, subscribe for custom routes, or chat directly on WhatsApp.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {/* Box 1: WhatsApp hotline */}
          <div className="glass-panel" style={{
            padding: '28px 24px',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--color-comm-card-1)'
          }}>
            <div>
              <div style={{
                width: '42px', height: '42px', borderRadius: '50%',
                backgroundColor: 'rgba(6, 59, 33, 0.25)',
                color: 'var(--color-accent)', marginBottom: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center'
              }} className="animate-float">
                <Phone size={20} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>WhatsApp Guide Helpline</h3>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>
                Chat live with our hiking coordinator to customize dates, group slots, and dog policies.
              </p>
            </div>
            <button
              onClick={() => window.open('https://wa.me/1234567890?text=Hi! I am looking for custom trails on RetrieverRoutes.', '_blank')}
              className="glow-btn-gold"
              style={{
                width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
                border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-primary))', color: '#fff',
                boxShadow: '0 4px 14px rgba(6, 59, 33, 0.3)'
              }}
            >
              Chat With A Hiker
            </button>
          </div>

          {/* Box 2: Instagram community */}
          <div className="glass-panel" style={{
            padding: '28px 24px',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--color-comm-card-2)'
          }}>
            <div>
              <div style={{
                width: '42px', height: '42px', borderRadius: '50%',
                backgroundColor: 'rgba(242, 159, 5, 0.15)',
                color: 'var(--color-accent)', marginBottom: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center'
              }} className="animate-float">
                <InstagramIcon />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Follow @RetrieverRoutes</h3>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>
                Join our visual network of 14K outdoor wanderers. Tag us in your pet trail pics!
              </p>
            </div>
            <button
              onClick={() => window.open('https://instagram.com', '_blank')}
              className="glow-btn-gold"
              style={{
                width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
                border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              Follow Our Instagram
            </button>
          </div>

          {/* Box 3: Newsletter Sign-up */}
          <div className="glass-panel" style={{
            padding: '28px 24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-green)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'rgba(11, 21, 16, 0.4)'
          }}>
            <div>
              <div style={{
                width: '42px', height: '42px', borderRadius: '50%',
                backgroundColor: 'rgba(13, 95, 56, 0.25)',
                color: 'var(--color-primary-light)', marginBottom: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center'
              }} className="animate-float">
                <Mail size={20} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Join the Newsletter Pack</h3>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>
                Receive customized bi-weekly hike itineraries, trail guides, and seasonal group slots.
              </p>
            </div>

            {newsletterSubscribed ? (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center',
                padding: '12px', color: 'var(--color-accent)', fontSize: '13px', fontWeight: '700'
              }}>
                <CheckCircle size={18} /> Subscribed Successfully!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="Enter email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{ flexGrow: 1, padding: '10px', fontSize: '12px' }}
                  className="form-input"
                  required
                />
                <button
                  type="submit"
                  className="glow-btn-green"
                  style={{
                    padding: '0 16px', borderRadius: 'var(--radius-sm)',
                    border: 'none', fontSize: '12px', cursor: 'pointer'
                  }}
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .glass-card:hover .dest-card-img {
          transform: scale(1.08);
        }
        .dropdown-item:hover {
          background: rgba(242, 159, 5, 0.15) !important;
          color: var(--color-accent) !important;
        }
        .text-link:hover {
          color: var(--color-accent-light) !important;
        }
      `}</style>
    </div>
  );
}
