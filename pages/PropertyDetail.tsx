
import React, { useEffect, useState } from 'react';
import { Property, User } from '../types';
import { MOCK_AGENTS } from '../constants';
import { analyzeProperty } from '../services/geminiService';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
  onAgentClick: (agentId: string) => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onBack, onAgentClick }) => {
  const [sellingPoints, setSellingPoints] = useState<string[]>([]);
  const [loadingAI, setLoadingAI] = useState(true);
  const agent = MOCK_AGENTS.find(a => a.id === property.ownerId);

  useEffect(() => {
    const fetchAIAnalysis = async () => {
      setLoadingAI(true);
      const analysis = await analyzeProperty(property.description);
      setSellingPoints(analysis.sellingPoints);
      setLoadingAI(false);
    };
    fetchAIAnalysis();
  }, [property]);

  // Generate a Google Maps Embed URL using coordinates or address
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.API_KEY || ''}&q=${property.location.coordinates.lat},${property.location.coordinates.lng}`;
  // Fallback for demo purposes if API_KEY is not configured for maps
  const fallbackMapUrl = `https://maps.google.com/maps?q=${property.location.coordinates.lat},${property.location.coordinates.lng}&z=15&output=embed`;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 font-semibold"
        >
          <i className="fas fa-arrow-left"></i> Back to Search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[500px]">
              <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                <img src={property.images[0]} className="w-full h-full object-cover" alt={property.title} />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                <img src={property.images[1] || property.images[0]} className="w-full h-full object-cover" alt="Property view" />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-white relative">
                <img src={property.images[2] || property.images[0]} className="w-full h-full object-cover opacity-60" alt="Property view" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white/90 px-4 py-2 rounded-full font-bold text-slate-800 text-sm shadow-sm">
                    +12 More
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{property.title}</h1>
                  <p className="text-slate-500 flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-indigo-500"></i>
                    {property.location.address}, {property.location.city}, {property.location.country}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-indigo-600">
                    {property.price.toLocaleString()} <span className="text-lg font-normal text-slate-400">{property.currency}</span>
                  </p>
                  <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {property.type}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 py-6 border-y border-slate-50 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600">
                    <i className="fas fa-bed text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Bedrooms</p>
                    <p className="font-bold text-slate-800">4 Beds</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600">
                    <i className="fas fa-bath text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Bathrooms</p>
                    <p className="font-bold text-slate-800">3 Baths</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600">
                    <i className="fas fa-expand-arrows-alt text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Square Feet</p>
                    <p className="font-bold text-slate-800">3,200 sqft</p>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Description</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>

              {/* AI Analysis Section */}
              <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-6 mb-10 border border-indigo-100">
                <div className="flex items-center gap-2 mb-4">
                  <i className="fas fa-sparkles text-indigo-600"></i>
                  <h3 className="text-lg font-bold text-indigo-900">AI Key Insights</h3>
                </div>
                {loadingAI ? (
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce delay-200"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sellingPoints.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-indigo-800 text-sm">
                        <i className="fas fa-check-circle text-indigo-400"></i>
                        {point}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Map Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">Location Map</h3>
                <div className="h-[400px] w-full rounded-3xl overflow-hidden border-4 border-slate-50 shadow-inner">
                  <iframe 
                    src={fallbackMapUrl} 
                    className="w-full h-full border-0" 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Listed By</h3>
              {agent ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onAgentClick(agent.id)}>
                    <img src={agent.avatar} className="w-16 h-16 rounded-full border-2 border-indigo-50 group-hover:border-indigo-600 transition-all" alt={agent.name} />
                    <div>
                      <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 flex items-center gap-1">
                        {agent.name}
                        <i className="fas fa-certificate text-blue-500 text-[10px]"></i>
                      </h4>
                      <p className="text-xs text-slate-400">{agent.agencyName}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                      Request Viewing
                    </button>
                    <a 
                      href={`tel:${agent.phone}`} 
                      className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all border border-slate-100"
                    >
                      <i className="fas fa-phone-alt"></i> Call Agent
                    </a>
                    <a 
                      href={`https://wa.me/${agent.whatsapp}`} 
                      className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold hover:bg-emerald-100 transition-all border border-emerald-100"
                    >
                      <i className="fab fa-whatsapp"></i> WhatsApp
                    </a>
                  </div>

                  <div className="pt-6 border-t border-slate-50">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Service Fee</p>
                    <p className="text-sm font-semibold text-slate-700">{agent.chargeRate}</p>
                  </div>
                </div>
              ) : (
                <p className="text-slate-400 text-sm">Agent information unavailable.</p>
              )}
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
              <h4 className="font-bold mb-4">Safety First</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Always meet agents in public places and never send money before a physical verification of the premises and documentation. Zanzara protects your interests with verified legal terms.
              </p>
              <button className="text-xs font-bold text-indigo-400 hover:underline">Read Safety Guide & Terms</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
