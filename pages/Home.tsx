
import React, { useState } from 'react';
import { MOCK_PROPERTIES, EAST_AFRICA_CITIES } from '../constants';
import PropertyCard from '../components/PropertyCard';

interface HomeProps {
  onPropertyClick: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ onPropertyClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');

  const filteredProperties = MOCK_PROPERTIES.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'All Cities' || p.location.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <img 
          src="https://picsum.photos/seed/africa/1920/1080" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="East Africa Skyline"
        />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-xl">
            Find Your Dream Home in <span className="text-indigo-400">East Africa</span>
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl">
            Verified listings, professional agents, and AI-powered insights across Nairobi, Dar es Salaam, Addis Ababa, and beyond.
          </p>

          <div className="w-full max-w-4xl bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 py-3 bg-slate-50 rounded-xl">
              <i className="fas fa-search text-slate-400 mr-3"></i>
              <input 
                type="text" 
                placeholder="Search location, house type..."
                className="bg-transparent border-none focus:ring-0 w-full text-slate-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-3 bg-slate-50 rounded-xl">
              <i className="fas fa-map-marker-alt text-slate-400 mr-3"></i>
              <select 
                className="bg-transparent border-none focus:ring-0 w-full text-slate-700 appearance-none"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option>All Cities</option>
                {EAST_AFRICA_CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <button className="bg-indigo-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
              Search Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Featured Properties</h2>
            <p className="text-slate-500">Hand-picked premium listings in your region.</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-slate-200 hover:bg-white hover:shadow transition-all"><i className="fas fa-chevron-left"></i></button>
            <button className="p-2 rounded-lg border border-slate-200 hover:bg-white hover:shadow transition-all"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onClick={() => onPropertyClick(property.id)}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="text-6xl text-slate-200 mb-4"><i className="fas fa-search"></i></div>
              <h3 className="text-xl font-bold text-slate-400">No properties found matching your search.</h3>
            </div>
          )}
        </div>

        {/* Map Preview Placeholder */}
        <div className="mt-24 bg-slate-100 rounded-3xl h-[400px] flex items-center justify-center border-4 border-white shadow-xl overflow-hidden relative group">
          <img src="https://picsum.photos/seed/map/1200/400" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Map" />
          <div className="relative z-10 text-center p-8 glass-effect rounded-2xl max-w-md">
            <h3 className="text-2xl font-bold text-indigo-900 mb-3">Explore Properties on Map</h3>
            <p className="text-indigo-800/80 mb-6">Visualise properties exactly where you want to live across East African cities.</p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold">Open Interactive Map</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
