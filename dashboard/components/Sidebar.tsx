import React from 'react';
import { X, LogOut, Home, Users, BarChart3, Target, Clock, User as UserIcon, Heart } from 'lucide-react';
import type { User } from '../types';

interface SidebarProps {
  user: User;
  sidebarOpen: boolean;
  currentPage: string;
  onPageChange: (page: string) => void;
  onToggle: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  sidebarOpen,
  currentPage,
  onPageChange,
  onToggle,
  onLogout
}) => {
  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <Heart className="logo-icon" size={32} fill="currentColor" />
          <span>SaveAnimal</span>
        </div>
        <button className="sidebar-toggle" onClick={onToggle}>
          <X size={24} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {user.role === 'admin' && (
          <>
            <NavItem
              icon={<Home size={20} />}
              label="Dashboard"
              onClick={() => onPageChange('dashboard')}
              active={currentPage === 'dashboard'}
            />
            <NavItem
              icon={<Users size={20} />}
              label="Volunteers"
              onClick={() => onPageChange('volunteers')}
              active={currentPage === 'volunteers'}
            />
            <NavItem
              icon={<Target size={20} />}
              label="Activities"
              onClick={() => onPageChange('activities')}
              active={currentPage === 'activities'}
            />
            <NavItem
              icon={<BarChart3 size={20} />}
              label="Reports"
              onClick={() => onPageChange('reports')}
              active={currentPage === 'reports'}
            />
          </>
        )}

        {user.role === 'volunteer' && (
          <>
            <NavItem
              icon={<Home size={20} />}
              label="Dashboard"
              onClick={() => onPageChange('dashboard')}
              active={currentPage === 'dashboard'}
            />
            <NavItem
              icon={<UserIcon size={20} />}
              label="My Profile"
              onClick={() => onPageChange('profile')}
              active={currentPage === 'profile'}
            />
            <NavItem
              icon={<Clock size={20} />}
              label="My Hours"
              onClick={() => onPageChange('hours')}
              active={currentPage === 'hours'}
            />
            <NavItem
              icon={<Target size={20} />}
              label="Activities"
              onClick={() => onPageChange('activities')}
              active={currentPage === 'activities'}
            />
          </>
        )}

        {user.role === 'visitor' && (
          <>
            <NavItem
              icon={<Home size={20} />}
              label="Home"
              onClick={() => onPageChange('dashboard')}
              active={currentPage === 'dashboard'}
            />
            <NavItem
              icon={<Target size={20} />}
              label="Events"
              onClick={() => onPageChange('activities')}
              active={currentPage === 'activities'}
            />
            <NavItem
              icon={<Users size={20} />}
              label="About Us"
              onClick={() => onPageChange('about')}
              active={currentPage === 'about'}
            />
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <button className="btn btn-error btn-outline w-full btn-sm" onClick={onLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, onClick, active }) => {
  return (
    <button
      className={`nav-item ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
