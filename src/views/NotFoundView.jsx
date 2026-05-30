import React from 'react';
import { Compass, Home, MapPin, Footprints } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFoundView({ setCurrentScreen }) {
  // Paw print stagger animation helper
  const pawVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: custom * 0.15, duration: 0.4, ease: 'easeOut' }
    })
  };

  return (
    <div className="view-container" style={{
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 20px'
    }}>
      {/* Dynamic Animated Compass Area */}
      <div style={{ position: 'relative', marginBottom: '32px' }}>
        {/* Outer pulse aura */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            top: '-20px', left: '-20px', right: '-20px', bottom: '-20px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-accent)',
            filter: 'blur(30px)',
            zIndex: 1
          }}
        />

        {/* Floating Compass Card */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="glass-panel animate-float"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '2px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-accent)',
            boxShadow: 'var(--shadow-lg), var(--shadow-glow-gold)',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Continuous spinning compass dial */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Compass size={60} style={{ filter: 'drop-shadow(0 0 8px rgba(242,159,5,0.4))' }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Title & Description with staggered fade-ins */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span style={{
          fontSize: 'clamp(3rem, 10vw, 5.5rem)',
          fontWeight: '900',
          fontFamily: "'Outfit', sans-serif",
          color: 'var(--color-accent)',
          lineHeight: '1',
          letterSpacing: '-0.04em',
          textShadow: 'var(--text-shadow-hero)',
          display: 'block',
          marginBottom: '8px'
        }}>
          404
        </span>

        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          fontWeight: '800',
          color: 'var(--color-text-primary)',
          fontFamily: "'Outfit', sans-serif",
          marginBottom: '16px'
        }}>
          Trail Lost! Route Not Found
        </h1>

        <p style={{
          fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
          color: 'var(--color-text-secondary)',
          maxWidth: '460px',
          margin: '0 auto 32px auto',
          lineHeight: '1.6'
        }}>
          Oops! It looks like you've wandered off the certified pet-friendly routes. Our retriever guides couldn't sniff out this path. Let's head back to safe grounds.
        </p>
      </motion.div>

      {/* Interactive Staggered Paw Prints */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={pawVariants}
            style={{ color: i === 2 ? 'var(--color-accent)' : 'var(--color-text-muted)' }}
          >
            <Footprints size={20} style={{ transform: 'rotate(25deg)' }} />
          </motion.div>
        ))}
      </div>

      {/* Base Camp Action Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setCurrentScreen('home')}
        className="glow-btn-gold"
        style={{
          padding: '14px 32px',
          borderRadius: 'var(--radius-full)',
          border: 'none',
          fontSize: '14px',
          fontWeight: '700',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: 'var(--shadow-glow-gold)'
        }}
      >
        <Home size={16} /> Return to Base Camp
      </motion.button>
    </div>
  );
}
