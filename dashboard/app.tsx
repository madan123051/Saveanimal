import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { VolunteerDashboard } from './components/VolunteerDashboard';
import { VisitorHome } from './components/VisitorHome';
import { ProfilePage } from './components/ProfilePage';
import { AdminReports } from './components/AdminReports';
import { AdminActivities } from './components/AdminActivities';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import type { User, UserRole, Volunteer, Activity } from './types';

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen]  = useState(true);
  const [currentPage, setCurrentPage]  = useState('dashboard');
  const [volunteers, setVolunteers]    = useState<Volunteer[]>([]);
  const [activities, setActivities]    = useState<Activity[]>([]);

  useEffect(() => {
    initializeDemoData();
    restoreUserSession();
  }, []);

  const restoreUserSession = () => {
    try {
      const saved = localStorage.getItem('saveanimal_user') ||
                    localStorage.getItem('saveanimal_currentUser');
      if (saved) {
        const u = JSON.parse(saved) as User;
        const validRoles: UserRole[] = ['admin', 'volunteer', 'visitor', 'user'];
        if (u && u.id) {
          u.role = validRoles.includes(u.role) ? u.role : 'user';
          const verifiedMap = JSON.parse(localStorage.getItem('saveanimal_verified_users') || '{}');
          u.verified = u.role === 'admin' || !!u.verified || !!verifiedMap[u.email || ''] || !!verifiedMap[u.id];
          setCurrentUser(u);
        }
      }
    } catch (_) {}
    setSessionChecked(true);
  };

  const initializeDemoData = () => {
    setVolunteers([
      { id:'V001', name:'Rahul Kumar',  email:'rahul@saveanimal.com',  phone:'9876543210', skills:['Animal Care','Education'],    hours:45, joinDate:'2024-01-15', status:'Active', activities:5 },
      { id:'V002', name:'Priya Singh',  email:'priya@saveanimal.com',  phone:'9876543211', skills:['Fundraising','Social Media'], hours:32, joinDate:'2024-02-20', status:'Active', activities:3 },
      { id:'V003', name:'Amit Patel',   email:'amit@saveanimal.com',   phone:'9876543212', skills:['Veterinary','Animal Care'],   hours:68, joinDate:'2023-12-01', status:'Active', activities:8 },
    ]);
    setActivities([
      { id:'A001', title:'Animal Shelter Cleanup', date:'2024-06-10', volunteers:12, status:'Completed', description:'Weekly cleaning and maintenance at shelter' },
      { id:'A002', title:'Veterinary Camp',        date:'2024-06-15', volunteers:8,  status:'Upcoming',  description:'Free health checkup for street animals' },
      { id:'A003', title:'Awareness Program',      date:'2024-06-20', volunteers:15, status:'Upcoming',  description:'School program on animal welfare' },
    ]);
  };

  const handleLogin = (role: string, id: string) => {
    const validRoles: UserRole[] = ['admin','volunteer','visitor','user'];
    const safeRole: UserRole = validRoles.includes(role as UserRole) ? role as UserRole : 'user';
    let userData: User;
    if (safeRole === 'volunteer') {
      const vol = volunteers.find(v => v.id === id);
      userData = vol ? { ...vol, role:'volunteer' } : { id, name:'Volunteer', role:'volunteer' };
    } else if (safeRole === 'admin') {
      userData = { id:'ADMIN001', name:'Admin User', email:'admin@saveanimal.com', role:'admin' };
    } else {
      userData = { id: id || 'GUEST001', name:'Guest User', role: safeRole };
    }
    try {
      localStorage.setItem('saveanimal_user',        JSON.stringify(userData));
      localStorage.setItem('saveanimal_currentUser', JSON.stringify(userData));
    } catch (_) {}
    setCurrentUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('saveanimal_user');
      localStorage.removeItem('saveanimal_currentUser');
    } catch (_) {}
    setCurrentUser(null);
    setCurrentPage('dashboard');
    window.location.replace('/login.html');
  };

  // Show a brief loading screen while we read the saved session from localStorage.
  // This prevents LoginPage from clearing the session before we can restore it.
  if (!sessionChecked) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
                    background:'linear-gradient(135deg,#0f4c1f,#1a6b3a)', fontFamily:'Inter,sans-serif' }}>
        <div style={{ textAlign:'center', color:'white' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🐾</div>
          <p style={{ fontSize:16, opacity:0.9 }}>Loading…</p>
        </div>
      </div>
    );
  }
  if (!currentUser) {
    // No session found after check — redirect to login page cleanly (don't clear localStorage here)
    window.location.replace('/login.html');
    return null;
  }

  const renderContent = () => {
    if (currentPage === 'profile')
      return <ProfilePage user={currentUser} activities={activities} onNavigate={setCurrentPage} onUserUpdate={setCurrentUser} />;
    if (currentUser.role === 'admin') {
      if (currentPage === 'reports') return <AdminReports />;
      if (currentPage === 'activities') return <AdminActivities activities={activities} volunteers={volunteers} />;
      if (currentPage === 'volunteers') return <AdminActivities activities={activities} volunteers={volunteers} />;
      return <AdminDashboard volunteers={volunteers} activities={activities} currentUser={currentUser} />;
    }
    switch (currentUser.role) {
      case 'volunteer': return <VolunteerDashboard user={currentUser} activities={activities} />;
      case 'visitor':
      case 'user':
      default:          return <VisitorHome activities={activities} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header user={currentUser} onLogout={handleLogout} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} currentPage={currentPage} onPageChange={setCurrentPage} userRole={currentUser.role} onLogout={handleLogout} />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<App />);
