import React from 'react';
import { Menu, Bell } from 'lucide-react';
import type { User } from '../types';

interface HeaderProps {
  user: User;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onMenuClick }) => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return '👨‍💼 Admin';
      case 'volunteer':
        return '👤 Volunteer';
      case 'visitor':
        return '👁️ Visitor';
      default:
        return role;
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <h2 className="text-2xl font-bold">Welcome, {user.name}! 👋</h2>
      </div>
      <div className="header-right">
        <div className="badge badge-primary">
          {getRoleLabel(user.role)}
        </div>
        <Bell size={20} className="cursor-pointer hover:scale-110 transition" />
      </div>
    </header>
  );
};
