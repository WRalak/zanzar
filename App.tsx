
import React, { useState } from 'react';
import { User, UserRole, VerificationStatus } from './types';
import { MOCK_AGENTS, MOCK_PROPERTIES } from './constants';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AgentPortfolio from './pages/AgentPortfolio';
import Dashboard from './pages/Dashboard';
import PropertyDetail from './pages/PropertyDetail';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>({
    id: 'u1',
    name: 'Kevin Otieno',
    email: 'kevin@example.com',
    phone: '+254 700 000 000',
    role: UserRole.TENANT,
    avatar: 'https://i.pravatar.cc/150?u=kevin',
    status: VerificationStatus.VERIFIED
  });

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedPropertyId(null);
    window.scrollTo(0, 0);
  };

  const handlePropertyClick = (id: string) => {
    setSelectedPropertyId(id);
    setCurrentPage('property-detail');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (currentPage === 'property-detail' && selectedPropertyId) {
      const property = MOCK_PROPERTIES.find(p => p.id === selectedPropertyId);
      if (property) {
        return (
          <PropertyDetail 
            property={property} 
            onBack={() => handleNavigate('home')} 
            onAgentClick={(id) => handleNavigate(`agent-${id}`)}
          />
        );
      }
    }

    switch (currentPage) {
      case 'home':
        return <Home onPropertyClick={handlePropertyClick} />;
      case 'agents':
        return (
          <div className="max-w-7xl mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-12">Our Verified Agents</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_AGENTS.map(agent => (
                <div key={agent.id} onClick={() => { handleNavigate(`agent-${agent.id}`) }} className="cursor-pointer group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img src={agent.avatar} className="w-full h-full rounded-full border-4 border-indigo-50" alt={agent.name} />
                    {agent.status === VerificationStatus.VERIFIED && (
                      <div className="absolute -right-1 -bottom-1 bg-white p-1 rounded-full shadow-md">
                        <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px]">
                          <i className="fas fa-check"></i>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold group-hover:text-indigo-600 transition-colors">
                        {agent.name}
                      </h3>
                      {agent.status === VerificationStatus.VERIFIED && (
                        <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tight" title="Verified Agent">
                          <i className="fas fa-certificate text-[10px]"></i>
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-center text-sm mb-4">{agent.agencyName}</p>
                    
                    <div className="flex justify-center gap-1 text-amber-400 text-xs mb-6">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    
                    <button className="w-full py-2.5 rounded-xl border border-indigo-100 text-indigo-600 font-bold hover:bg-indigo-600 hover:text-white transition-all">
                      View Portfolio
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'dashboard':
        return user ? <Dashboard user={user} /> : <Home onPropertyClick={handlePropertyClick} />;
      default:
        if (currentPage.startsWith('agent-')) {
          const agentId = currentPage.split('-')[1];
          const agent = MOCK_AGENTS.find(a => a.id === agentId);
          if (agent) {
            return <AgentPortfolio agent={agent} properties={MOCK_PROPERTIES.filter(p => p.ownerId === agentId)} />;
          }
        }
        return <Home onPropertyClick={handlePropertyClick} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar user={user} onNavigate={handleNavigate} onLogout={() => setUser(null)} />
      {renderPage()}
      <ChatBot />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-home-alt text-white"></i>
              </div>
              <span className="text-2xl font-bold">Zanzara</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Zanzara Estate is the leading AI-powered real estate platform in East Africa, connecting millions of property seekers with verified owners and agents.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><button onClick={() => handleNavigate('home')} className="hover:text-white transition-colors">Find a Home</button></li>
              <li><button onClick={() => handleNavigate('dashboard')} className="hover:text-white transition-colors">List Your Property</button></li>
              <li><button className="hover:text-white transition-colors">Agent Verification</button></li>
              <li><button className="hover:text-white transition-colors">Legal Resources</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Major Cities</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><button className="hover:text-white transition-colors">Nairobi</button></li>
              <li><button className="hover:text-white transition-colors">Dar es Salaam</button></li>
              <li><button className="hover:text-white transition-colors">Addis Ababa</button></li>
              <li><button className="hover:text-white transition-colors">Kampala</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">Stay updated with the latest listings and market trends.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-slate-800 border-none rounded-lg px-4 py-2 flex-1 text-sm focus:ring-indigo-500" />
              <button className="bg-indigo-600 p-2 rounded-lg"><i className="fas fa-arrow-right"></i></button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-12 mt-12 border-t border-slate-800 text-center text-slate-500 text-sm">
          &copy; 2024 Zanzara Estate Ltd. All rights reserved. Built for 1M+ East Africans.
        </div>
      </footer>
    </div>
  );
};

export default App;
