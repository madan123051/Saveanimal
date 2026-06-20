import React from 'react';
import type { UserRole } from '../types';

interface SidebarProps {
  isOpen: boolean;
  currentPage: string;
  onPageChange: (page: string) => void;
  userRole: UserRole;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentPage, onPageChange, userRole, onLogout }) => (
  <aside className={`bg-gray-900 text-white flex flex-col transition-all duration-300 ${isOpen ? 'w-56' : 'w-0 overflow-hidden'}`}
         style={{ minHeight:'calc(100vh - 56px)' }}>
    <div className="p-4 flex items-center gap-2 border-b border-gray-700">
      <span className="text-2xl">🐾</span><span className="font-bold text-lg">SaveAnimal</span>
    </div>
    <nav className="flex-1 p-3 space-y-1">
      {userRole === 'admin' && <>
        <NavItem icon="🏠" label="Dashboard"  active={currentPage==='dashboard'}  onClick={() => onPageChange('dashboard')} />
        <NavItem icon="👤" label="My Profile" active={currentPage==='profile'}    onClick={() => onPageChange('profile')} />
        <NavItem icon="👥" label="Volunteers" active={currentPage==='volunteers'} onClick={() => onPageChange('volunteers')} />
        <NavItem icon="🎯" label="Activities" active={currentPage==='activities'} onClick={() => onPageChange('activities')} />
        <NavItem icon="📊" label="Reports"    active={currentPage==='reports'}    onClick={() => onPageChange('reports')} />
      </>}
      {userRole === 'volunteer' && <>
        <NavItem icon="🏠" label="Dashboard"  active={currentPage==='dashboard'}  onClick={() => onPageChange('dashboard')} />
        <NavItem icon="👤" label="My Profile" active={currentPage==='profile'}    onClick={() => onPageChange('profile')} />
        <NavItem icon="⏱️" label="My Hours"   active={currentPage==='hours'}      onClick={() => onPageChange('hours')} />
        <NavItem icon="🎯" label="Activities" active={currentPage==='activities'} onClick={() => onPageChange('activities')} />
      </>}
      {(userRole === 'visitor' || userRole === 'user') && <>
        <NavItem icon="🏠" label="Home"       active={currentPage==='dashboard'}  onClick={() => onPageChange('dashboard')} />
        <NavItem icon="👤" label="My Profile" active={currentPage==='profile'}    onClick={() => onPageChange('profile')} />
        <NavItem icon="🎯" label="Events"     active={currentPage==='activities'} onClick={() => onPageChange('activities')} />
      </>}
    </nav>
    <div className="p-3 border-t border-gray-700">
      <button onClick={onLogout} className="w-full py-2 px-3 rounded-lg text-sm text-red-400 hover:bg-red-900/30 transition flex items-center gap-2">
        🚪 Logout
      </button>
    </div>
  </aside>
);

const NavItem: React.FC<{ icon:string; label:string; onClick:()=>void; active:boolean }> = ({ icon, label, onClick, active }) => (
  <button onClick={onClick}
    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 text-sm transition ${active ? 'bg-green-600 text-white font-semibold' : 'text-gray-300 hover:bg-gray-700'}`}>
    <span>{icon}</span><span>{label}</span>
  </button>
);
