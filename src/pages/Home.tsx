import { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample data for featured tours
const featuredTours = [
  {
    id: 1,
    title: 'Tbilisi City Tour',
    image: 'https://images.unsplash.com/photo-1565008576549-57cf2b6e8a68',
    duration: '1 Day',
    price: 59,
    rating: 4.8,
    description: 'Explore the charming capital city with its blend of modern and ancient architecture.'
  },
  {
    id: 2,
    title: 'Wine Tour in Kakheti',
    image: 'https://images.unsplash.com/photo-1560840881-4bbcd415a9ab',
    duration: '2 Days',
    price: 149,
    rating: 4.9,
    description: 'Discover Georgia\'s 8,000-year-old winemaking tradition in the beautiful Kakheti region.'
  },
  {
    id: 3,
    title: 'Kazbegi Mountain Adventure',
    image: 'https://images.unsplash.com/photo-1563284223-333497692b71',
    duration: '3 Days',
    price: 249,
    rating: 4.7,
    description: 'Journey through the stunning Caucasus mountains and visit the iconic Gergeti Trinity Church.'
  },
  {
    id: 4,
    title: 'Black Sea Batumi Getaway',
    image: 'https://images.unsplash.com/photo-1597220869819-c3bf58060f0a',
    duration: '4 Days',
    price: 329,
    rating: 4.6,
    description: 'Relax on the beaches of Georgia\'s premier coastal city and enjoy its vibrant nightlife.'
  }
];

// Sample testimonials
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    tour: 'Wine Tour in Kakheti',
    rating: 5,
    text: 'The wine tour was absolutely incredible! Our guide was knowledgeable and passionate about Georgian wine. The tastings were generous and the scenery was breathtaking.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    tour: 'Kazbegi Mountain Adventure',
    rating: 5,
    text: 'The mountains of Georgia are truly spectacular. This tour was well-organized and our guide made sure we had the best experience possible.'
  },
  {
    id: 3,
    name: 'Elena Petrova',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    tour: 'Tbilisi City Tour',
    rating: 4,
    text: 'Tbilisi is such a charming city with so much history. I loved exploring the old town and the sulfur baths were a unique experience!'
  }
];

// Georgia highlights
const highlights = [
  {
    title: 'Rich Culture',
    icon: '🏛️',
    description: 'Experience one of the world\'s oldest and most vibrant cultures with unique traditions.'
  },
  {
    title: 'Exquisite Cuisine',
    icon: '🍷',
    description: 'Savor khachapuri, khinkali, and wines from the world\'s oldest winemaking tradition.'
  },
  {
    title: 'Stunning Nature',
    icon: '🏔️',
    description: 'From the Caucasus mountains to Black Sea beaches, Georgia\'s landscapes will amaze you.'
  },
  {
    title: 'Ancient History',
    icon: '⛪',
    description: 'Discover UNESCO World Heritage sites and architecture spanning thousands of years.'
  }
];

// Get current season for recommendations
const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
};

export default function Home() {
  const season = getCurrentSeason();
  const [email, setEmail] = useState('');
  
  // Seasonal recommendations
  const seasonalRecommendations = {
    spring: {
      title: 'Spring in Georgia',
      description: 'Experience blooming landscapes and mild weather perfect for hiking and wine tours.',
      tours: [2, 3] // IDs from featuredTours
    },
    summer: {
      title: 'Summer Adventures',
      description: 'Enjoy beach getaways in Batumi and refreshing mountain escapes in Kazbegi.',
      tours: [3, 4]
    },
    autumn: {
      title: 'Autumn Harvest',
      description: 'The perfect time for wine tours during rtveli (grape harvest) and colorful mountain hikes.',
      tours: [2, 1]
    },
    winter: {
      title: 'Winter Wonderland',
      description: 'Discover Georgia\'s emerging ski resorts and cozy up with traditional cuisine.',
      tours: [1, 3]
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}! You'll receive our latest Georgian travel updates.`);
    setEmail('');
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'black',
        overflow: 'hidden'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1565008576549-57cf2b6e8a68?q=80&w=1920" 
          alt="Georgia landscape" 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.7,
            zIndex: 0
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(233, 30, 99, 0.4), rgba(194, 24, 91, 0.8))',
          zIndex: 1
        }}></div>
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '800px',
          padding: '2rem'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>Discover Georgia</h1>
          <p style={{
            fontSize: '1.5rem',
            marginBottom: '2rem',
            maxWidth: '36rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            opacity: 0.9
          }}>Unforgettable tours, stunning landscapes, rich culture. Plan your adventure with us!</p>
          <Link to="/tours" style={{
            display: 'inline-block',
            backgroundColor: 'white',
            color: '#e91e63',
            fontWeight: 'bold',
            padding: '0.75rem 2rem',
            borderRadius: '9999px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            fontSize: '1.125rem'
          }}>Browse Tours</Link>
        </div>
      </section>

      {/* Featured Tours */}
      <section style={{
        padding: '4rem 1rem',
        maxWidth: '1280px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          textAlign: 'center',
          color: '#222'
        }}>Featured Tours</h2>
        <p style={{
          fontSize: '1.25rem',
          color: '#666',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>Explore our most popular Georgian adventures</p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {featuredTours.map(tour => (
            <div key={tour.id} style={{
              borderRadius: '0.75rem',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'white',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ height: '12rem', overflow: 'hidden' }}>
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.7s ease'
                  }}
                />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#e91e63' }}>
                  {tour.title}
                </h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>{tour.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ color: '#777', fontSize: '0.875rem' }}>{tour.duration}</span>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.25rem', color: '#f59e0b' }}>
                      {'★'.repeat(Math.floor(tour.rating))}
                      {tour.rating % 1 !== 0 && '½'}
                      <span style={{ marginLeft: '0.25rem', fontSize: '0.875rem', color: '#777' }}>{tour.rating}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#e91e63' }}>${tour.price}</div>
                </div>
                <Link 
                  to={`/tours/${tour.id}`} 
                  style={{
                    marginTop: '1rem',
                    display: 'block',
                    textAlign: 'center',
                    backgroundColor: '#e91e63',
                    color: 'white',
                    padding: '0.5rem 0',
                    borderRadius: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Georgia Highlights */}
      <section style={{
        padding: '4rem 1rem',
        backgroundColor: '#f7f7f7'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            textAlign: 'center',
            color: '#222'
          }}>Georgia Travel Highlights</h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#666',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>Discover what makes Georgia a unique destination</p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {highlights.map((highlight, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{highlight.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#e91e63' }}>{highlight.title}</h3>
                <p style={{ color: '#666' }}>{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Recommendations */}
      <section style={{
        padding: '4rem 1rem',
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          textAlign: 'center',
          color: '#222'
        }}>
          {seasonalRecommendations[season as keyof typeof seasonalRecommendations].title}
        </h2>
        <p style={{
          fontSize: '1.25rem',
          color: '#666',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          {seasonalRecommendations[season as keyof typeof seasonalRecommendations].description}
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '2rem'
        }}>
          {seasonalRecommendations[season as keyof typeof seasonalRecommendations].tours.map(tourId => {
            const tour = featuredTours.find(t => t.id === tourId);
            if (!tour) return null;
            
            return (
              <div key={tour.id} style={{
                display: 'flex',
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
              }}>
                <div style={{ width: '33.333%', overflow: 'hidden' }}>
                  <img 
                    src={tour.image} 
                    alt={tour.title} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{ width: '66.666%', padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#e91e63' }}>{tour.title}</h3>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>{tour.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#777' }}>{tour.duration}</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#e91e63' }}>${tour.price}</span>
                  </div>
                  <Link 
                    to={`/tours/${tour.id}`} 
                    style={{
                      marginTop: '1rem',
                      display: 'block',
                      textAlign: 'center',
                      backgroundColor: '#e91e63',
                      color: 'white',
                      padding: '0.5rem 0',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      transition: 'background-color 0.3s ease'
                    }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{
        padding: '4rem 1rem',
        backgroundColor: '#f7f7f7'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            textAlign: 'center',
            color: '#222'
          }}>What Our Travelers Say</h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#666',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>Read about experiences from our satisfied customers</p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {testimonials.map(testimonial => (
              <div key={testimonial.id} style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '9999px',
                      marginRight: '1rem'
                    }}
                  />
                  <div>
                    <h3 style={{ fontWeight: 'bold', color: '#222' }}>{testimonial.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#777' }}>{testimonial.tour}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', marginBottom: '1rem', color: '#f59e0b' }}>
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p style={{ color: '#666', fontStyle: 'italic' }}>"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section style={{
        background: 'linear-gradient(135deg, #f9f7fe 0%, #f6e7f0 100%)',
        padding: '5rem 2rem',
        marginTop: '4rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          width: '8rem',
          height: '8rem',
          borderRadius: '50%',
          background: 'rgba(255, 207, 219, 0.2)',
          zIndex: 0
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '3rem',
          right: '5rem',
          width: '12rem',
          height: '12rem',
          borderRadius: '50%',
          background: 'rgba(255, 207, 219, 0.1)',
          zIndex: 0
        }}></div>
        
        <div style={{
          maxWidth: '48rem',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255, 207, 219, 0.3)',
              color: '#FFCFDB',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>JOIN OUR COMMUNITY</span>
            
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#111827'
            }}>Subscribe to Our Newsletter</h2>
            
            <p style={{ 
              marginBottom: '2rem', 
              fontSize: '1.125rem',
              color: '#4b5563',
              maxWidth: '36rem',
              margin: '0 auto 2rem'
            }}>
              Sign up today and receive our exclusive Georgian cuisine guide with authentic recipes and travel tips delivered straight to your inbox!
            </p>
          </div>
          
          <form 
            onSubmit={handleSubscribe} 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: '32rem',
              margin: '0 auto',
              position: 'relative',
              backgroundColor: 'white',
              padding: '0.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
            className="sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '0.5rem',
                color: '#333',
                width: '100%',
                flexGrow: 1,
                border: 'none',
                outline: 'none',
                fontSize: '1rem'
              }}
              required
            />
            <button 
              type="submit" 
              style={{
                backgroundColor: '#FFCFDB',
                color: '#222222',
                fontWeight: '600',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 207, 219, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 207, 219, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 207, 219, 0.5)';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 16.5v-9Z"></path>
                <path d="m8 11 4 4 4-4"></path>
                <path d="M8 8h8"></path>
              </svg>
              Subscribe
            </button>
          </form>
          
          <p style={{ 
            marginTop: '1.5rem', 
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
