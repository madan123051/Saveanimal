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
  <aside className={`bg-[#13231e] text-white flex flex-col transition-all duration-300 border-r border-white/10 ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}
         style={{ minHeight:'calc(100vh - 56px)' }}>
    <div className="p-4 flex items-center gap-3 border-b border-white/10">
      <span className="w-10 h-10 rounded-lg bg-[#f5b041] text-[#13231e] grid place-items-center font-black text-sm">SA</span>
      <div><span className="font-black text-lg block leading-tight">SaveAnimal</span><span className="text-xs text-white/50 font-bold">Nepal Rescue</span></div>
    </div>
    <nav className="flex-1 p-3 space-y-2">
      {userRole === 'admin' && <>
        <NavItem icon="01" label="Dashboard"  active={currentPage==='dashboard'}  onClick={() => onPageChange('dashboard')} />
        <NavItem icon="02" label="My Profile" active={currentPage==='profile'}    onClick={() => onPageChange('profile')} />
        <NavItem icon="03" label="Volunteers" active={currentPage==='volunteers'} onClick={() => onPageChange('volunteers')} />
        <NavItem icon="04" label="Activities" active={currentPage==='activities'} onClick={() => onPageChange('activities')} />
        <NavItem icon="05" label="Reports"    active={currentPage==='reports'}    onClick={() => onPageChange('reports')} />
      </>}
      {userRole === 'volunteer' && <>
        <NavItem icon="01" label="Dashboard"  active={currentPage==='dashboard'}  onClick={() => onPageChange('dashboard')} />
        <NavItem icon="02" label="My Profile" active={currentPage==='profile'}    onClick={() => onPageChange('profile')} />
        <NavItem icon="03" label="My Hours"   active={currentPage==='hours'}      onClick={() => onPageChange('hours')} />
        <NavItem icon="04" label="Activities" active={currentPage==='activities'} onClick={() => onPageChange('activities')} />
      </>}
      {(userRole === 'visitor' || userRole === 'user') && <>
        <NavItem icon="01" label="Home"       active={currentPage==='dashboard'}  onClick={() => onPageChange('dashboard')} />
        <NavItem icon="02" label="My Profile" active={currentPage==='profile'}    onClick={() => onPageChange('profile')} />
        <NavItem icon="03" label="Events"     active={currentPage==='activities'} onClick={() => onPageChange('activities')} />
      </>}
    </nav>
    <div className="p-3 border-t border-white/10">
      <button onClick={onLogout} className="w-full py-2.5 px-3 rounded-lg text-sm text-[#ffb4ad] hover:bg-white/10 transition flex items-center gap-2 font-black">
        Logout
      </button>
    </div>
  </aside>
);

const NavItem: React.FC<{ icon:string; label:string; onClick:()=>void; active:boolean }> = ({ icon, label, onClick, active }) => (
  <button onClick={onClick}
    className={`w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 text-sm transition ${active ? 'bg-[#2f8f63] text-white font-black shadow-lg shadow-black/10' : 'text-white/70 hover:bg-white/10 hover:text-white font-bold'}`}>
    <span className="w-7 h-7 rounded-md grid place-items-center bg-white/10 text-[11px] font-black">{icon}</span><span>{label}</span>
  </button>
);
