import { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample activities data
const activities = [
  {
    id: 1,
    title: 'Visit Narikala Fortress',
    image: 'https://images.unsplash.com/photo-1563284223-333497692b71',
    category: 'Historical',
    location: 'Tbilisi',
    description: 'Explore this ancient fortress overlooking Tbilisi with stunning panoramic views of the city.',
    season: 'All Year'
  },
  {
    id: 2,
    title: 'Wine Tasting in Kakheti',
    image: 'https://images.unsplash.com/photo-1560840881-4bbcd415a9ab',
    category: 'Culinary',
    location: 'Kakheti',
    description: 'Sample Georgia\'s famous wines in the country\'s premier wine region using traditional methods.',
    season: 'All Year'
  },
  {
    id: 3,
    title: 'Hiking in Kazbegi',
    image: 'https://images.unsplash.com/photo-1543158266-0066955977ec',
    category: 'Adventure',
    location: 'Kazbegi',
    description: 'Trek through stunning mountain landscapes to the iconic Gergeti Trinity Church.',
    season: 'Spring,Summer,Autumn'
  },
  {
    id: 4,
    title: 'Batumi Beach Day',
    image: 'https://images.unsplash.com/photo-1597220869819-c3bf58060f0a',
    category: 'Relaxation',
    location: 'Batumi',
    description: 'Enjoy the Black Sea coast with swimming, sunbathing, and water sports.',
    season: 'Summer'
  },
  {
    id: 5,
    title: 'Tbilisi Sulfur Baths',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3',
    category: 'Wellness',
    location: 'Tbilisi',
    description: 'Relax in the famous sulfur baths that gave Tbilisi its name.',
    season: 'All Year'
  },
  {
    id: 6,
    title: 'Skiing in Gudauri',
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178',
    category: 'Adventure',
    location: 'Gudauri',
    description: 'Experience world-class skiing and snowboarding at Georgia\'s premier ski resort.',
    season: 'Winter'
  },
  {
    id: 7,
    title: 'Explore Vardzia Cave Monastery',
    image: 'https://images.unsplash.com/photo-1589482512262-8e3e0709a2c3',
    category: 'Historical',
    location: 'Samtskhe-Javakheti',
    description: 'Discover this impressive cave monastery complex carved into the side of a mountain.',
    season: 'All Year'
  },
  {
    id: 8,
    title: 'Rafting on Aragvi River',
    image: 'https://images.unsplash.com/photo-1559489104-9d8a0f03aaaa',
    category: 'Adventure',
    location: 'Mtskheta',
    description: 'Experience thrilling white water rafting through beautiful Georgian landscapes.',
    season: 'Spring,Summer'
  },
  {
    id: 9,
    title: 'Georgian Cooking Class',
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca',
    category: 'Culinary',
    location: 'Tbilisi',
    description: 'Learn to make traditional Georgian dishes like khachapuri and khinkali.',
    season: 'All Year'
  },
  {
    id: 10,
    title: 'Rtveli Wine Harvest Festival',
    image: 'https://images.unsplash.com/photo-1560840881-4bbcd415a9ab',
    category: 'Cultural',
    location: 'Kakheti',
    description: 'Participate in the traditional Georgian grape harvest and wine-making celebration.',
    season: 'Autumn'
  },
  {
    id: 11,
    title: 'Tbilisoba City Festival',
    image: 'https://images.unsplash.com/photo-1565008576549-57cf2b6e8a68',
    category: 'Cultural',
    location: 'Tbilisi',
    description: 'Join the annual celebration of Tbilisi\'s culture with music, food, and festivities.',
    season: 'Autumn'
  },
  {
    id: 12,
    title: 'Paragliding in Gudauri',
    image: 'https://images.unsplash.com/photo-1543158266-0066955977ec',
    category: 'Adventure',
    location: 'Gudauri',
    description: 'Soar above the stunning Caucasus mountains with tandem paragliding flights.',
    season: 'Summer,Autumn'
  }
];

// Categories
const categories = [
  'All',
  'Adventure',
  'Cultural',
  'Culinary',
  'Historical',
  'Relaxation',
  'Wellness'
];

// Locations
const locations = [
  'All',
  'Tbilisi',
  'Kakheti',
  'Kazbegi',
  'Batumi',
  'Gudauri',
  'Samtskhe-Javakheti',
  'Mtskheta'
];

// Seasons
const seasons = [
  'All Year',
  'Spring',
  'Summer',
  'Autumn',
  'Winter'
];

// Upcoming events data
const upcomingEvents = [
  {
    id: 1,
    title: 'Tbilisoba Festival',
    date: 'October 2025',
    location: 'Tbilisi',
    description: 'Annual celebration of Tbilisi\'s rich culture and history with music, food, and wine.'
  },
  {
    id: 2,
    title: 'Rtveli Wine Harvest',
    date: 'September 2025',
    location: 'Kakheti',
    description: 'Traditional grape harvest festival with wine-making demonstrations and tastings.'
  },
  {
    id: 3,
    title: 'Black Sea Jazz Festival',
    date: 'July 2025',
    location: 'Batumi',
    description: 'International jazz festival featuring renowned artists from around the world.'
  },
  {
    id: 4,
    title: 'Tushetoba Festival',
    date: 'August 2025',
    location: 'Tusheti',
    description: 'Traditional festival celebrating the unique culture of the Tusheti mountain region.'
  },
  {
    id: 5,
    title: 'New Wine Festival',
    date: 'May 2025',
    location: 'Tbilisi',
    description: 'Celebration of the season\'s new wines with tastings from producers across Georgia.'
  }
];

// Get current season
const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  if (month >= 8 && month <= 10) return 'Autumn';
  return 'Winter';
};

export default function ThingsToDo() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [seasonFilter, setSeasonFilter] = useState(getCurrentSeason());
  
  // Filter activities based on selected filters
  const filteredActivities = activities.filter(activity => {
    const matchesCategory = categoryFilter === 'All' || activity.category === categoryFilter;
    const matchesLocation = locationFilter === 'All' || activity.location === locationFilter;
    const matchesSeason = activity.season === 'All Year' || activity.season.includes(seasonFilter);
    
    return matchesCategory && matchesLocation && matchesSeason;
  });
  
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
      }}>Things To Do in Georgia</h2>
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#4b5563', 
        marginBottom: '2rem' 
      }}>Discover unforgettable experiences and activities</p>
      
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
        }}>Find Activities</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {/* Category Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '0.25rem'
            }}>Category</label>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                backgroundColor: 'white'
              }}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Location Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '0.25rem'
            }}>Location</label>
            <select 
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                backgroundColor: 'white'
              }}
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          {/* Season Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '0.25rem'
            }}>Season</label>
            <select 
              value={seasonFilter}
              onChange={(e) => setSeasonFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                backgroundColor: 'white'
              }}
            >
              {seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Activities Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        {filteredActivities.length > 0 ? (
          filteredActivities.map(activity => (
            <div key={activity.id} style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              overflow: 'hidden',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }} onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            }} onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}>
              <div className="h-48 overflow-hidden">
                <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-primary">{activity.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold">{activity.category}</span>
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">{activity.location}</span>
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                    {activity.season === 'All Year' ? 'Year-round' : activity.season.replace(/,/g, ', ')}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{activity.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">No activities match your filters. Try adjusting your criteria.</p>
          </div>
        )}
      </div>
      
      {/* Seasonal Events Calendar */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: '#111827'
        }}>Upcoming Events & Festivals</h2>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#e11d48'
            }}>Georgia's Cultural Calendar</h3>
            <p style={{
              color: '#4b5563'
            }}>Experience traditional celebrations and festivals throughout the year</p>
          </div>
          <div style={{
            borderTop: '1px solid #e5e7eb'
          }}>
            {upcomingEvents.map(event => (
              <div key={event.id} style={{
                padding: '1.5rem',
                transition: 'background-color 0.2s'
              }} onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }} onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-secondary dark:text-white">{event.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{event.description}</p>
                  </div>
                  <div className="md:text-right mt-2 md:mt-0">
                    <span className="text-primary font-semibold block">{event.date}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Local Recommendations */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: '#111827'
        }}>Local Recommendations</h2>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">Georgian Cuisine Must-Tries</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">•</span>
                  <div>
                    <span className="font-semibold text-secondary dark:text-white">Khachapuri</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Traditional Georgian cheese-filled bread, with regional variations.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">•</span>
                  <div>
                    <span className="font-semibold text-secondary dark:text-white">Khinkali</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Georgian dumplings filled with spiced meat, herbs, and broth.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">•</span>
                  <div>
                    <span className="font-semibold text-secondary dark:text-white">Churchkhela</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Traditional candle-shaped candy made from grape juice and nuts.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">Off the Beaten Path</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">•</span>
                  <div>
                    <span className="font-semibold text-secondary dark:text-white">Ushguli</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Europe's highest permanently inhabited settlement with ancient Svan towers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">•</span>
                  <div>
                    <span className="font-semibold text-secondary dark:text-white">David Gareja Monastery</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Rock-hewn monastery complex on the Azerbaijan border with ancient frescoes.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">•</span>
                  <div>
                    <span className="font-semibold text-secondary dark:text-white">Martvili Canyon</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Beautiful canyon with emerald waters perfect for boat trips and swimming.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div style={{
        backgroundColor: '#e11d48',
        color: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h2 className="text-3xl font-bold mb-4">Ready to Experience Georgia?</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">Browse our curated tours and let us help you create unforgettable memories in this beautiful country.</p>
        <Link to="/tours" className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition text-lg">View Tours</Link>
      </div>
    </main>
  );
}
