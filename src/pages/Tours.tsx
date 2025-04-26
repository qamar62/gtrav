import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Note: For a production app, you would need to properly integrate Mapbox
// This is a simplified version that shows a static map image instead
import 'mapbox-gl/dist/mapbox-gl.css';

// Define tour type for better type safety
interface Tour {
  id: number;
  title: string;
  image: string;
  duration: string;
  price: number;
  rating: number;
  difficulty: string;
  region: string;
  theme: string;
  description: string;
  location: {
    longitude: number;
    latitude: number;
  };
}

// Sample tour data
const tours = [
  {
    id: 1,
    title: 'Tbilisi City Tour',
    image: 'https://images.unsplash.com/photo-1565008576549-57cf2b6e8a68',
    duration: '1 Day',
    price: 59,
    rating: 4.8,
    difficulty: 'Easy',
    region: 'Tbilisi',
    theme: 'Cultural',
    description: 'Explore the charming capital city with its blend of modern and ancient architecture.',
    location: { longitude: 44.7833, latitude: 41.7167 }
  },
  {
    id: 2,
    title: 'Wine Tour in Kakheti',
    image: 'https://images.unsplash.com/photo-1560840881-4bbcd415a9ab',
    duration: '2 Days',
    price: 149,
    rating: 4.9,
    difficulty: 'Easy',
    region: 'Kakheti',
    theme: 'Food & Wine',
    description: 'Discover Georgia\'s 8,000-year-old winemaking tradition in the beautiful Kakheti region.',
    location: { longitude: 45.7500, latitude: 41.6500 }
  },
  {
    id: 3,
    title: 'Kazbegi Mountain Adventure',
    image: 'https://images.unsplash.com/photo-1563284223-333497692b71',
    duration: '3 Days',
    price: 249,
    rating: 4.7,
    difficulty: 'Moderate',
    region: 'Kazbegi',
    theme: 'Adventure',
    description: 'Journey through the stunning Caucasus mountains and visit the iconic Gergeti Trinity Church.',
    location: { longitude: 44.6400, latitude: 42.6600 }
  },
  {
    id: 4,
    title: 'Black Sea Batumi Getaway',
    image: 'https://images.unsplash.com/photo-1597220869819-c3bf58060f0a',
    duration: '4 Days',
    price: 329,
    rating: 4.6,
    difficulty: 'Easy',
    region: 'Adjara',
    theme: 'Beach',
    description: 'Relax on the beaches of Georgia\'s premier coastal city and enjoy its vibrant nightlife.',
    location: { longitude: 41.6333, latitude: 41.6333 }
  },
  {
    id: 5,
    title: 'Svaneti Trekking Expedition',
    image: 'https://images.unsplash.com/photo-1543158266-0066955977ec',
    duration: '5 Days',
    price: 399,
    rating: 4.9,
    difficulty: 'Hard',
    region: 'Svaneti',
    theme: 'Adventure',
    description: 'Trek through the remote Svaneti region with its medieval tower houses and glacial valleys.',
    location: { longitude: 42.9000, latitude: 43.0000 }
  },
  {
    id: 6,
    title: 'Borjomi & Vardzia Cave Tour',
    image: 'https://images.unsplash.com/photo-1589482512262-8e3e0709a2c3',
    duration: '2 Days',
    price: 179,
    rating: 4.7,
    difficulty: 'Moderate',
    region: 'Samtskhe-Javakheti',
    theme: 'Historical',
    description: 'Visit the famous mineral water town of Borjomi and the ancient cave monastery of Vardzia.',
    location: { longitude: 43.4000, latitude: 41.8500 }
  },
  {
    id: 7,
    title: 'Georgian Military Highway',
    image: 'https://images.unsplash.com/photo-1559489104-9d8a0f03aaaa',
    duration: '3 Days',
    price: 269,
    rating: 4.8,
    difficulty: 'Moderate',
    region: 'Mtskheta-Mtianeti',
    theme: 'Scenic Drive',
    description: 'Drive along the historic Georgian Military Highway with breathtaking mountain views.',
    location: { longitude: 44.7000, latitude: 42.3000 }
  },
  {
    id: 8,
    title: 'Culinary Tour of Georgia',
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca',
    duration: '7 Days',
    price: 599,
    rating: 4.9,
    difficulty: 'Easy',
    region: 'Multiple',
    theme: 'Food & Wine',
    description: 'A gastronomic journey through Georgia\'s diverse culinary traditions and wine regions.',
    location: { longitude: 44.7833, latitude: 41.7167 }
  }
];

// Filter options
const regions = ['All', 'Tbilisi', 'Kakheti', 'Kazbegi', 'Adjara', 'Svaneti', 'Samtskhe-Javakheti', 'Mtskheta-Mtianeti', 'Multiple'];
const themes = ['All', 'Cultural', 'Food & Wine', 'Adventure', 'Beach', 'Historical', 'Scenic Drive'];
const difficulties = ['All', 'Easy', 'Moderate', 'Hard'];
const durations = ['All', '1 Day', '2-3 Days', '4+ Days'];
const priceRanges = ['All', 'Under $100', '$100-$200', '$200-$300', '$300+'];

export default function Tours() {
  const [filteredTours, setFilteredTours] = useState(tours);
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [popupInfo, setPopupInfo] = useState<Tour | null>(null);
  
  // Filter states
  const [regionFilter, setRegionFilter] = useState('All');
  const [themeFilter, setThemeFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [durationFilter, setDurationFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  
  // Apply filters
  useEffect(() => {
    let result = tours;
    
    if (regionFilter !== 'All') {
      result = result.filter(tour => tour.region === regionFilter);
    }
    
    if (themeFilter !== 'All') {
      result = result.filter(tour => tour.theme === themeFilter);
    }
    
    if (difficultyFilter !== 'All') {
      result = result.filter(tour => tour.difficulty === difficultyFilter);
    }
    
    if (durationFilter !== 'All') {
      if (durationFilter === '1 Day') {
        result = result.filter(tour => tour.duration === '1 Day');
      } else if (durationFilter === '2-3 Days') {
        result = result.filter(tour => tour.duration === '2 Days' || tour.duration === '3 Days');
      } else if (durationFilter === '4+ Days') {
        result = result.filter(tour => {
          const days = parseInt(tour.duration.split(' ')[0]);
          return days >= 4;
        });
      }
    }
    
    if (priceFilter !== 'All') {
      if (priceFilter === 'Under $100') {
        result = result.filter(tour => tour.price < 100);
      } else if (priceFilter === '$100-$200') {
        result = result.filter(tour => tour.price >= 100 && tour.price <= 200);
      } else if (priceFilter === '$200-$300') {
        result = result.filter(tour => tour.price > 200 && tour.price <= 300);
      } else if (priceFilter === '$300+') {
        result = result.filter(tour => tour.price > 300);
      }
    }
    
    setFilteredTours(result);
  }, [regionFilter, themeFilter, difficultyFilter, durationFilter, priceFilter]);

  return (
    <main style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '4rem 1rem',
    }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        marginBottom: '0.5rem', 
        color: '#e11d48'
      }}>Explore Tours</h2>
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#4b5563', 
        marginBottom: '2rem' 
      }}>Find your perfect Georgian adventure</p>
      
      {/* Map View (Static Version) */}
      <div style={{
        marginBottom: '2rem',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        height: '400px',
        position: 'relative'
      }}>
        {/* Static Map Image */}
        <img 
          src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/43.5,42.0,5.5,0/800x400?access_token=pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2xqN2lwdHRwMDI0MDNxcGM4Z3R2MWZvaSJ9.TaRSgGqrAeEuKsr-cTa7Pw`}
          alt="Georgia Map"
          className="w-full h-full object-cover"
        />
        
        {/* Map Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            {/* Tour Markers */}
            {tours.map(tour => {
              // Convert geo coordinates to approximate pixel positions (this is simplified)
              const left = ((tour.location.longitude - 41.0) / 5) * 100;
              const top = (100 - ((tour.location.latitude - 41.0) / 3) * 100);
              
              return (
                <div 
                  key={tour.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  style={{ left: `${left}%`, top: `${top}%` }}
                  onClick={() => setPopupInfo(tour)}
                >
                  <div className={`w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer ${selectedTour === tour.id ? 'ring-4 ring-primary-light' : ''}`}>
                    {tour.id}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Popup */}
        {popupInfo && (
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg max-w-[250px]">
            <button 
              onClick={() => setPopupInfo(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="font-bold text-primary mb-1">{popupInfo.title}</h3>
            <p className="text-xs text-gray-600 mb-2">{popupInfo.region} | {popupInfo.duration}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{popupInfo.description}</p>
            <Link 
              to={`/tours/${popupInfo.id}`}
              className="text-sm text-primary hover:underline"
            >
              View Details
            </Link>
          </div>
        )}
      </div>
      
      {/* Filters */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#111827'
        }}>Filter Tours</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {/* Region Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '0.25rem'
            }}>Region</label>
            <select 
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                backgroundColor: 'white'
              }}
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          {/* Theme Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '0.25rem'
            }}>Theme</label>
            <select 
              value={themeFilter}
              onChange={(e) => setThemeFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                backgroundColor: 'white'
              }}
            >
              {themes.map(theme => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>
          
          {/* Difficulty Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '0.25rem'
            }}>Difficulty</label>
            <select 
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                backgroundColor: 'white'
              }}
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
          
          {/* Duration Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '0.25rem'
            }}>Duration</label>
            <select 
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                backgroundColor: 'white'
              }}
            >
              {durations.map(duration => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>
          </div>
          
          {/* Price Range Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '0.25rem'
            }}>Price Range</label>
            <select 
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                backgroundColor: 'white'
              }}
            >
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Tour Results */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {filteredTours.length > 0 ? (
          filteredTours.map(tour => (
            <div 
              key={tour.id} 
              style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: selectedTour === tour.id ? '2px solid #e11d48' : 'none'
              }}
              onMouseEnter={() => {
                setSelectedTour(tour.id);
              }}
              onMouseLeave={() => {
                setSelectedTour(null);
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
            >
              <div style={{
                height: '12rem',
                overflow: 'hidden'
              }}>
                <img src={tour.image} alt={tour.title} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} />
              </div>
              <div style={{
                padding: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#e11d48'
                  }}>{tour.title}</h3>
                  <span style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#e11d48'
                  }}>${tour.price}</span>
                </div>
                <p style={{
                  color: '#4b5563',
                  marginBottom: '1rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>{tour.description}</p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    backgroundColor: '#f3f4f6',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem'
                  }}>{tour.region}</span>
                  <span style={{
                    backgroundColor: '#f3f4f6',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem'
                  }}>{tour.theme}</span>
                  <span style={{
                    backgroundColor: '#f3f4f6',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem'
                  }}>{tour.difficulty}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{
                      color: '#6b7280',
                      fontSize: '0.875rem'
                    }}>{tour.duration}</span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '0.25rem',
                      color: '#f59e0b'
                    }}>
                      {'★'.repeat(Math.floor(tour.rating))}
                      {tour.rating % 1 !== 0 && '½'}
                      <span style={{
                        marginLeft: '0.25rem',
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>{tour.rating}</span>
                    </div>
                  </div>
                  <Link to={`/tours/${tour.id}`} style={{
                    backgroundColor: '#e11d48',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    transition: 'background-color 0.2s'
                  }} onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#be123c';
                  }} onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#e11d48';
                  }}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">No tours match your filters. Try adjusting your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}
