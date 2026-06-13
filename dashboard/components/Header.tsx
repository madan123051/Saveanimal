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
      case 'admin': return '👨‍💼 Admin';
      case 'volunteer': return '🤝 Volunteer';
      case 'visitor': return '👁️ Visitor';
      default: return role;
    }
  };

  return (
    <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition" onClick={onToggleSidebar}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800">Welcome, {user.name}! 👋</h2>
      </div>
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">{getRoleLabel(user.role)}</span>
        <button onClick={onLogout} className="px-3 py-1 rounded-lg text-sm text-red-600 hover:bg-red-50 transition font-medium">Logout</button>
      </div>
    </header>
  );
}