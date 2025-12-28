
import React from 'react';
import { User, UserRole, Property } from '../types';
import { MOCK_PROPERTIES } from '../constants';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const isAgentOrLandlord = user.role === UserRole.AGENT || user.role === UserRole.LANDLORD;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.name}</h1>
          <p className="text-slate-500">Managing your {user.role.toLowerCase()} account.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase mb-2">Total Views</p>
            <p className="text-3xl font-bold text-slate-800">12,405</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase mb-2">Requests</p>
            <p className="text-3xl font-bold text-indigo-600">42</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase mb-2">Messages</p>
            <p className="text-3xl font-bold text-emerald-600">8</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase mb-2">Avg. Rating</p>
            <p className="text-3xl font-bold text-amber-500">4.9</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                  {isAgentOrLandlord ? 'Your Properties' : 'Recently Viewed'}
                </h2>
                {isAgentOrLandlord && (
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                    <i className="fas fa-plus"></i> Post Property
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {MOCK_PROPERTIES.slice(0, 3).map(p => (
                  <div key={p.id} className="flex items-center gap-4 p-4 border border-slate-50 rounded-2xl hover:bg-slate-50 transition-colors">
                    <img src={p.images[0]} className="w-20 h-20 rounded-xl object-cover" alt="" />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">{p.title}</h4>
                      <p className="text-xs text-slate-400">{p.location.address}, {p.location.city}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-indigo-600">{p.price.toLocaleString()} {p.currency}</p>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                    <button className="text-slate-300 hover:text-slate-600"><i className="fas fa-ellipsis-v"></i></button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h2>
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                      <i className="fas fa-eye"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Property Viewed</p>
                      <p className="text-xs text-slate-500">Someone from Nairobi viewed your villa.</p>
                      <p className="text-[10px] text-slate-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-red-50 rounded-3xl p-8 border border-red-100">
              <h2 className="text-xl font-bold text-red-800 mb-2">Danger Zone</h2>
              <p className="text-red-600/80 text-sm mb-6">These actions cannot be undone. Please be careful.</p>
              <button className="w-full py-3 border-2 border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all">
                Delete My Account
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
