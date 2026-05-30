import React from 'react';
import { Search, Star, Sparkles, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { tripsData } from '../data/tripsData';

export default function ExploreTrips({ 
  currentScreen, 
  setCurrentScreen, 
  setSelectedTrip, 
  searchQuery, 
  setSearchQuery, 
  filterCategory, 
  setFilterCategory,
  onOpenAIPlanner
}) {
  const categories = ['All', 'Beach', 'Adventure', 'Mountains', 'City', 'Popular'];

  // Filter logic
  const filteredTrips = tripsData.filter((trip) => {
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          trip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trip.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'All' || trip.categories.includes(filterCategory);

    return matchesSearch && matchesCategory;
  });

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
    setCurrentScreen('details');
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: "'Outfit', sans-serif" }}>Explore Trips</h1>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
          Select custom outdoor routes with professional retriever standards.
        </p>
      </div>

      {/* Filter and Search Bar Row */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '30px'
      }}>
        {/* Search Input bar */}
        <div style={{
          position: 'relative',
          width: '100%'
        }}>
          <Search 
            size={18} 
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)'
            }} 
          />
          <input 
            type="text" 
            placeholder="Search destinations, terrains, highlights..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{
              paddingLeft: '48px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-green)'
            }}
          />
        </div>

        {/* Categories Chips */}
        <div 
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`category-chip ${filterCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trip Catalog grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {filteredTrips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => handleTripSelect(trip)}
            className="glass-card"
            style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              position: 'relative'
            }}
          >
            {/* Image section with price in INR */}
            <div style={{ position: 'relative', height: '170px' }}>
              <img 
                src={trip.image} 
                alt={trip.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(7, 14, 11, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--color-border)',
                color: '#f29f05',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                ₹{trip.price.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Content Details */}
            <div style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  color: 'var(--color-accent)',
                  backgroundColor: 'rgba(242, 159, 5, 0.12)',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {trip.duration}
                </span>
                <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>•</span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  {trip.difficulty}
                </span>
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                {trip.title}
              </h3>
              <p style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.4',
                marginBottom: '16px',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {trip.description}
              </p>

              {/* Rating and Button footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 'auto',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} fill="var(--color-accent)" color="var(--color-accent)" />
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                    {trip.rating}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    ({trip.reviewsCount})
                  </span>
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--color-accent)'
                }}>
                  Details →
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* AI Route Planner Teaser Card */}
        <div
          onClick={onOpenAIPlanner}
          className="glass-card-gold"
          style={{
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '260px',
            background: 'linear-gradient(135deg, rgba(6, 59, 33, 0.25), rgba(242, 159, 5, 0.05))',
            border: '1.5px dashed var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(242, 159, 5, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-accent)',
            marginBottom: '16px'
          }} className="animate-float">
            <Sparkles size={24} />
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
            Can't find what you're looking for?
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '20px', maxWidth: '220px' }}>
            Let our custom AI route planner craft the perfect hiking itinerary for you.
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenAIPlanner();
            }}
            className="glow-btn-gold"
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Plan My Trip
          </button>
        </div>
      </div>

      {filteredTrips.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <AlertCircle size={36} color="var(--color-text-muted)" />
          <h3 style={{ fontSize: '18px', fontWeight: '700' }}>No Trips Found</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', maxWidth: '300px' }}>
            We couldn't find matches for "{searchQuery}". Try selecting another category chip above.
          </p>
        </div>
      )}
    </div>
  );
}
