import React from 'react';
import { Menu, Bell } from 'lucide-react';
import type { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, sidebarOpen, onToggleSidebar }) => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return '\uD83D\uDC68\u200D\uD83D\uDCBC Admin';
      case 'volunteer': return '\uD83D\uDC64 Volunteer';
      case 'visitor': return '\uD83D\uDC41\uFE0F Visitor';
      default: return role;
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onToggleSidebar}>
          <Menu size={24} />
        </button>
        <h2 className="text-2xl font-bold">Welcome, {user.name}! \uD83D\uDC4B</h2>
      </div>
      <div className="header-right">
        <div className="badge badge-primary">
          {getRoleLabel(user.role)}
        </div>
        <Bell size={20} className="cursor-pointer hover:scale-110 transition" />
        <button className="btn btn-sm btn-error btn-outline ml-2" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
};
