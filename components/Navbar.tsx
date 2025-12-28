
import React from 'react';
import { UserRole, User } from '../types';

interface NavbarProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-home-alt text-white text-xl"></i>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Zanzara
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('home')} className="text-slate-600 hover:text-indigo-600 font-medium">Properties</button>
            <button onClick={() => onNavigate('agents')} className="text-slate-600 hover:text-indigo-600 font-medium">Find Agents</button>
            <button onClick={() => onNavigate('about')} className="text-slate-600 hover:text-indigo-600 font-medium">Pricing</button>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-100 transition-colors"
                >
                  Dashboard
                </button>
                <div className="relative group">
                  <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm cursor-pointer" />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 invisible group-hover:visible border border-slate-100">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-bold truncate">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.role}</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Profile Settings</button>
                    <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={() => onNavigate('login')} className="text-slate-600 font-semibold px-4">Login</button>
                <button onClick={() => onNavigate('register')} className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                  Join Zanzara
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
