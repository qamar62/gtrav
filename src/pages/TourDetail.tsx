import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Note: For a production app, you would need to properly integrate Mapbox
// This is a simplified version that shows a static map image instead
// In a real implementation, you would use the proper Mapbox integration
import 'mapbox-gl/dist/mapbox-gl.css';

// Define interfaces for type safety
interface Activity {
  time: string;
  title: string;
  description: string;
  image?: string;
  location: {
    longitude: number;
    latitude: number;
  };
}

interface DayItinerary {
  day: number;
  title: string;
  description: string;
  activities: Activity[];
}

interface TourData {
  id: number;
  title: string;
  image: string;
  duration: string;
  price: number;
  rating: number;
  description: string;
  longDescription: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: DayItinerary[];
}

// Sample tour data with detailed itinerary
const tours = [
  {
    id: 1,
    title: 'Tbilisi City Tour',
    image: 'https://images.unsplash.com/photo-1565008576549-57cf2b6e8a68',
    duration: '1 Day',
    price: 59,
    rating: 4.8,
    description: 'Explore the charming capital city with its blend of modern and ancient architecture.',
    longDescription: 'Discover the vibrant capital of Georgia with its unique blend of ancient and modern architecture. This comprehensive tour takes you through the cobblestone streets of Old Tbilisi, the modern districts, and the most iconic landmarks of this fascinating city.',
    highlights: ['Old Tbilisi', 'Narikala Fortress', 'Sulfur Baths', 'Peace Bridge', 'Dry Bridge Market'],
    includes: ['Professional guide', 'Hotel pickup and drop-off', 'Lunch at a traditional restaurant', 'All entrance fees'],
    excludes: ['Personal expenses', 'Gratuities', 'Alcoholic beverages'],
    itinerary: [
      {
        day: 1,
        title: 'Old Tbilisi Exploration',
        description: 'Begin your journey in the historic heart of Tbilisi.',
        activities: [
          {
            time: '09:00',
            title: 'Hotel Pickup',
            description: 'Meet your guide at your hotel and start the tour.',
            location: { longitude: 44.7833, latitude: 41.7167 }
          },
          {
            time: '09:30',
            title: 'Metekhi Church',
            description: 'Visit the historic Metekhi Church perched on a cliff overlooking the Mtkvari River.',
            image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3',
            location: { longitude: 44.8097, latitude: 41.6883 }
          },
          {
            time: '11:00',
            title: 'Narikala Fortress',
            description: 'Take the cable car up to the ancient Narikala Fortress for panoramic views of the city.',
            image: 'https://images.unsplash.com/photo-1563284223-333497692b71',
            location: { longitude: 44.8075, latitude: 41.6883 }
          },
          {
            time: '13:00',
            title: 'Traditional Lunch',
            description: 'Enjoy a delicious Georgian lunch at a local restaurant.',
            image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca',
            location: { longitude: 44.8050, latitude: 41.6925 }
          },
          {
            time: '14:30',
            title: 'Sulfur Baths',
            description: 'Explore the famous sulfur baths in the Abanotubani district.',
            image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3',
            location: { longitude: 44.8083, latitude: 41.6889 }
          },
          {
            time: '16:00',
            title: 'Peace Bridge & Rike Park',
            description: 'Walk across the modern glass Peace Bridge and relax in Rike Park.',
            image: 'https://images.unsplash.com/photo-1565008576549-57cf2b6e8a68',
            location: { longitude: 44.8036, latitude: 41.6914 }
          },
          {
            time: '17:30',
            title: 'Dry Bridge Market',
            description: 'Browse the eclectic Dry Bridge Market for souvenirs and antiques.',
            image: 'https://images.unsplash.com/photo-1565008576549-57cf2b6e8a68',
            location: { longitude: 44.8000, latitude: 41.6950 }
          },
          {
            time: '19:00',
            title: 'Return to Hotel',
            description: 'End of the tour with drop-off at your hotel.',
            location: { longitude: 44.7833, latitude: 41.7167 }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Wine Tour in Kakheti',
    image: 'https://images.unsplash.com/photo-1560840881-4bbcd415a9ab',
    duration: '2 Days',
    price: 149,
    rating: 4.9,
    description: 'Discover Georgia\'s 8,000-year-old winemaking tradition in the beautiful Kakheti region.',
    longDescription: 'Immerse yourself in Georgia\'s renowned wine culture with this two-day tour of the Kakheti region. Visit traditional wineries, learn about the unique qvevri winemaking method, and taste a variety of local wines while enjoying the picturesque landscapes of Georgia\'s premier wine region.',
    highlights: ['Traditional wineries', 'Qvevri winemaking', 'Sighnaghi - "City of Love"', 'Bodbe Monastery', 'Wine tastings'],
    includes: ['Professional guide', 'Transportation', 'Accommodation', 'Breakfast', 'Wine tastings', 'Entrance fees'],
    excludes: ['Personal expenses', 'Additional meals', 'Gratuities'],
    itinerary: [
      {
        day: 1,
        title: 'Tbilisi to Sighnaghi',
        description: 'Journey from Tbilisi to the wine region of Kakheti.',
        activities: [
          {
            time: '09:00',
            title: 'Departure from Tbilisi',
            description: 'Meet your guide and depart for Kakheti region.',
            location: { longitude: 44.7833, latitude: 41.7167 }
          },
          {
            time: '11:00',
            title: 'Bodbe Monastery',
            description: 'Visit the Bodbe Monastery, a Georgian Orthodox monastic complex.',
            image: 'https://images.unsplash.com/photo-1560840881-4bbcd415a9ab',
            location: { longitude: 45.9167, latitude: 41.6167 }
          },
          {
            time: '13:00',
            title: 'Sighnaghi Town',
            description: 'Explore the charming town of Sighnaghi, known as the "City of Love".',
            image: 'https://images.unsplash.com/photo-1560840881-4bbcd415a9ab',
            location: { longitude: 45.9275, latitude: 41.6167 }
          },
          {
            time: '14:30',
            title: 'Traditional Lunch',
            description: 'Enjoy lunch at a local restaurant with wine tasting.',
            image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca',
            location: { longitude: 45.9250, latitude: 41.6150 }
          },
          {
            time: '16:00',
            title: 'First Winery Visit',
            description: 'Visit a family winery and learn about traditional qvevri winemaking.',
            image: 'https://images.unsplash.com/photo-1560840881-4bbcd415a9ab',
            location: { longitude: 45.9000, latitude: 41.6000 }
          },
          {
            time: '19:00',
            title: 'Dinner & Accommodation',
            description: 'Check into your guesthouse and enjoy a traditional dinner.',
            location: { longitude: 45.9275, latitude: 41.6167 }
          }
        ]
      },
      {
        day: 2,
        title: 'Kakheti Wine Tour',
        description: 'Full day exploring wineries and historical sites in Kakheti.',
        activities: [
          {
            time: '09:00',
            title: 'Breakfast',
            description: 'Enjoy breakfast at your guesthouse.',
            location: { longitude: 45.9275, latitude: 41.6167 }
          },
          {
            time: '10:00',
            title: 'Tsinandali Estate',
            description: 'Visit the Tsinandali Estate, once owned by the 19th-century aristocratic poet Alexander Chavchavadze.',
            image: 'https://images.unsplash.com/photo-1560840881-4bbcd415a9ab',
            location: { longitude: 45.5833, latitude: 41.8833 }
          },
          {
            time: '12:30',
            title: 'Telavi',
            description: 'Explore Telavi, the main city of the Kakheti region.',
            image: 'https://images.unsplash.com/photo-1560840881-4bbcd415a9ab',
            location: { longitude: 45.4667, latitude: 41.9167 }
          },
          {
            time: '14:00',
            title: 'Lunch & Wine Tasting',
            description: 'Enjoy lunch with wine tasting at a local winery.',
            image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca',
            location: { longitude: 45.4500, latitude: 41.9000 }
          },
          {
            time: '16:00',
            title: 'Gremi Complex',
            description: 'Visit the Gremi architectural complex, a 16th-century royal residence.',
            image: 'https://images.unsplash.com/photo-1560840881-4bbcd415a9ab',
            location: { longitude: 45.7500, latitude: 41.9833 }
          },
          {
            time: '18:00',
            title: 'Return to Tbilisi',
            description: 'Journey back to Tbilisi.',
            location: { longitude: 44.7833, latitude: 41.7167 }
          }
        ]
      }
    ]
  }
];

// Helper function to get a static map URL
const getStaticMapUrl = (activities: Activity[], width = 800, height = 600) => {
  if (!activities || activities.length === 0) return '';
  
  // Center the map on the first activity
  const centerLng = activities[0].location.longitude;
  const centerLat = activities[0].location.latitude;
  
  // Create a static map URL (this is just a placeholder - in a real app you'd use Mapbox properly)
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${centerLng},${centerLat},10,0/${width}x${height}?access_token=pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2xqN2lwdHRwMDI0MDNxcGM4Z3R2MWZvaSJ9.TaRSgGqrAeEuKsr-cTa7Pw`;
};

export default function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<TourData | null>(null);
  const [activeDay, setActiveDay] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  // We no longer need viewState with the static map approach
  
  // Find the tour based on the ID from URL
  useEffect(() => {
    if (id) {
      const foundTour = tours.find(t => t.id === parseInt(id));
      if (foundTour) {
        setTour(foundTour);
        // Set initial map view to first activity of first day
        if (foundTour.itinerary && foundTour.itinerary.length > 0 && 
            foundTour.itinerary[0].activities && foundTour.itinerary[0].activities.length > 0) {
          // With static map approach, we don't need to set view state
        }
      }
    }
  }, [id]);
  

  
  // Handle activity click
  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    // With static map approach, we don't need to set view state
  };
  
  if (!tour) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Tour Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300">The tour you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }
  
  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      {/* Tour Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">{tour.title}</h1>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
          <span>{tour.duration}</span>
          <span>•</span>
          <span className="flex items-center">
            {'★'.repeat(Math.floor(tour.rating))}
            {tour.rating % 1 !== 0 && '½'}
            <span className="ml-1">{tour.rating}</span>
          </span>
          <span>•</span>
          <span className="text-xl font-bold text-primary">${tour.price}</span>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">{tour.longDescription}</p>
      </div>
      
      {/* Visual Itinerary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Sidebar - Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 lg:col-span-1 h-[600px] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-secondary dark:text-white">Tour Itinerary</h2>
          <div className="space-y-6">
            {tour.itinerary.map((day: DayItinerary) => (
              <div key={day.day} className={`${activeDay === day.day ? 'border-l-4 border-primary pl-4' : 'border-l-4 border-gray-200 pl-4'}`}>
                <button 
                  className={`w-full text-left mb-2 ${activeDay === day.day ? 'text-primary font-bold' : 'text-gray-700 dark:text-gray-300'}`}
                  onClick={() => setActiveDay(day.day)}
                >
                  <h3 className="text-xl font-semibold">Day {day.day}: {day.title}</h3>
                </button>
                
                {activeDay === day.day && (
                  <div className="space-y-4 mt-4">
                    {day.activities.map((activity: Activity, index: number) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedActivity === activity ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        onClick={() => handleActivityClick(activity)}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-12 text-sm text-gray-500 dark:text-gray-400">{activity.time}</div>
                          <div>
                            <h4 className="font-medium text-secondary dark:text-white">{activity.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{activity.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Content - Map (Static Version) */}
        <div className="lg:col-span-2 h-[600px] rounded-xl overflow-hidden shadow-lg relative">
          {/* Static Map Image */}
          <img 
            src={getStaticMapUrl(tour.itinerary[activeDay - 1].activities)}
            alt="Tour Map"
            className="w-full h-full object-cover"
          />
          
          {/* Activity Markers Overlay */}
          <div className="absolute inset-0 p-4">
            <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-md">
              <h3 className="text-xl font-bold text-primary mb-2">Day {activeDay}: {tour.itinerary[activeDay - 1].title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{tour.itinerary[activeDay - 1].description}</p>
              
              {selectedActivity ? (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-secondary dark:text-white">{selectedActivity.title}</h4>
                    <span className="text-sm text-primary">{selectedActivity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 my-2">{selectedActivity.description}</p>
                  {selectedActivity.image && (
                    <img 
                      src={selectedActivity.image} 
                      alt={selectedActivity.title} 
                      className="w-full h-32 object-cover rounded-lg mt-2" 
                    />
                  )}
                  <button 
                    onClick={() => setSelectedActivity(null)}
                    className="mt-2 text-sm text-primary hover:underline"
                  >
                    Back to all activities
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2">
                  {tour.itinerary[activeDay - 1].activities.map((activity, index) => (
                    <div 
                      key={index}
                      className="flex items-start p-2 bg-white dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => handleActivityClick(activity)}
                    >
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-secondary dark:text-white">{activity.title}</h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{activity.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tour Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Highlights */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-secondary dark:text-white">Tour Highlights</h2>
          <ul className="space-y-2">
            {tour.highlights.map((highlight: string, index: number) => (
              <li key={index} className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Price Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-secondary dark:text-white">Price Details</h2>
          <div className="text-3xl font-bold text-primary mb-4">${tour.price} <span className="text-sm font-normal text-gray-500">per person</span></div>
          
          <div className="mb-4">
            <h3 className="font-bold text-secondary dark:text-white mb-2">Includes:</h3>
            <ul className="space-y-1">
              {tour.includes.map((item: string, index: number) => (
                <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-2">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-secondary dark:text-white mb-2">Excludes:</h3>
            <ul className="space-y-1">
              {tour.excludes.map((item: string, index: number) => (
                <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-red-500 mr-2">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <button className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition">
            Book This Tour
          </button>
        </div>
      </div>
      
      {/* Related Tours Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-secondary dark:text-white">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tours.filter(t => t.id !== tour.id).slice(0, 3).map(relatedTour => (
            <div key={relatedTour.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img src={relatedTour.image} alt={relatedTour.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-primary mb-2">{relatedTour.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">{relatedTour.duration}</span>
                  <span className="font-bold text-primary">${relatedTour.price}</span>
                </div>
                <a href={`/tours/${relatedTour.id}`} className="block text-center mt-4 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
