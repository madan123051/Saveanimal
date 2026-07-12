import React from 'react';
import type { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onToggleSidebar }) => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'volunteer': return 'Volunteer';
      case 'visitor': return 'Visitor';
      default: return role;
    }
  };

  return (
    <header className="bg-[#fffdf8]/95 backdrop-blur border-b border-[#dfe8e1] px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3 min-w-0">
        <button className="p-2 rounded-lg hover:bg-[#f4f8f2] transition border border-[#dfe8e1]" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.14em] font-black text-[#2f8f63]">SaveAnimal Command Center</p>
          <h2 className="text-lg md:text-xl font-black text-[#17211d] truncate">Welcome, {user.name}</h2>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => window.location.href = '/'} className="hidden sm:inline-flex px-3 py-2 rounded-lg text-sm font-black bg-[#fff] text-[#174f3f] border border-[#dfe8e1] hover:bg-[#dff3e7] transition">Open Site</button>
        <span className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-sm font-black bg-[#dff3e7] text-[#174f3f] border border-[#bfe6cd]">{getRoleLabel(user.role)}</span>
        <button onClick={onLogout} className="px-3 py-2 rounded-lg text-sm text-[#8d2b25] hover:bg-[#fde5e2] transition font-black">Logout</button>
      </div>
    </header>
  );
}
