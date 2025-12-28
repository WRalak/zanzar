
import React from 'react';
import { User, Property } from '../types';
import PropertyCard from '../components/PropertyCard';

interface AgentPortfolioProps {
  agent: User;
  properties: Property[];
}

const AgentPortfolio: React.FC<AgentPortfolioProps> = ({ agent, properties }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-indigo-900 h-64 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Info */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <img src={agent.avatar} className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4" alt={agent.name} />
                  {agent.status === 'VERIFIED' && (
                    <div className="absolute bottom-6 right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-white text-[10px]">
                      <i className="fas fa-check"></i>
                    </div>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-slate-900">{agent.name}</h1>
                <p className="text-indigo-600 font-medium mb-2">{agent.agencyName}</p>
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                  <span className="text-slate-400 text-xs ml-1">(4.8/5)</span>
                </div>

                <div className="w-full space-y-3 mb-8">
                  <a href={`tel:${agent.phone}`} className="flex items-center gap-3 w-full bg-slate-50 p-3 rounded-xl hover:bg-indigo-50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white">
                      <i className="fas fa-phone"></i>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">Call Me</span>
                  </a>
                  <a href={`https://wa.me/${agent.whatsapp}`} className="flex items-center gap-3 w-full bg-slate-50 p-3 rounded-xl hover:bg-emerald-50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white">
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">WhatsApp</span>
                  </a>
                  <div className="flex items-center gap-3 w-full bg-slate-50 p-3 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm">
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] uppercase text-slate-400 font-bold tracking-tighter">Charges</p>
                      <p className="text-sm font-semibold text-slate-700">{agent.chargeRate}</p>
                    </div>
                  </div>
                </div>

                <div className="text-left w-full">
                  <h3 className="font-bold text-slate-800 mb-2">About Me</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{agent.bio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Listings */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Agent Listings ({properties.length})</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-bold text-slate-600">Active</button>
                  <button className="px-4 py-2 text-sm font-bold text-slate-400">Sold</button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map(p => (
                  <PropertyCard key={p.id} property={p} onClick={() => {}} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPortfolio;
