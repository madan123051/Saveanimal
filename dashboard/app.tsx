import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { VolunteerDashboard } from './components/VolunteerDashboard';
import { VisitorHome } from './components/VisitorHome';
import { ProfilePage } from './components/ProfilePage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import type { User, Volunteer, Activity } from './types';

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    initializeDemoData();
    restoreUserSession();
  }, []);

  const restoreUserSession = () => {
    try {
      const savedUser = localStorage.getItem('saveanimal_user') ||
                       localStorage.getItem('saveanimal_currentUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user && user.role) setCurrentUser(user);
      }
    } catch (e) {}
  };

  const initializeDemoData = () => {
    setVolunteers([
      { id: 'V001', name: 'Rahul Kumar', email: 'rahul@saveanimal.com', phone: '9876543210', skills: ['Animal Care', 'Education'], hours: 45, joinDate: '2024-01-15', status: 'Active', activities: 5 },
      { id: 'V002', name: 'Priya Singh', email: 'priya@saveanimal.com', phone: '9876543211', skills: ['Fundraising', 'Social Media'], hours: 32, joinDate: '2024-02-20', status: 'Active', activities: 3 },
      { id: 'V003', name: 'Amit Patel', email: 'amit@saveanimal.com', phone: '9876543212', skills: ['Veterinary', 'Animal Care'], hours: 68, joinDate: '2023-12-01', status: 'Active', activities: 8 }
    ]);
    setActivities([
      { id: 'A001', title: 'Animal Shelter Cleanup', date: '2024-06-10', volunteers: 12, status: 'Completed', description: 'Weekly cleaning and maintenance at shelter' },
      { id: 'A002', title: 'Veterinary Camp', date: '2024-06-15', volunteers: 8, status: 'Upcoming', description: 'Free health checkup for street animals' },
      { id: 'A003', title: 'Awareness Program', date: '2024-06-20', volunteers: 15, status: 'Upcoming', description: 'School program on animal welfare' }
    ]);
  };

  const handleLogin = (role: string, id: string) => {
    let userData: User;
    if (role === 'volunteer') {
      const vol = volunteers.find(v => v.id === id);
      userData = vol ? { ...vol, role: 'volunteer' as const } : { id, name: 'Volunteer User', role: 'volunteer' as const };
    } else if (role === 'admin') {
      userData = { id: 'ADMIN001', name: 'Admin User', email: 'admin@saveanimal.com', role: 'admin' as const };
    } else {
      userData = { id: 'GUEST001', name: 'Guest User', role: 'visitor' as const };
    }
    try {
      localStorage.setItem('saveanimal_user', JSON.stringify(userData));
      localStorage.setItem('saveanimal_currentUser', JSON.stringify(userData));
    } catch (e) {}
    setCurrentUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('saveanimal_user');
      localStorage.removeItem('saveanimal_currentUser');
    } catch (e) {}
    setCurrentUser(null);
    setCurrentPage('dashboard');
  };

  if (!currentUser) return <LoginPage volunteers={volunteers} onLogin={handleLogin} />;

  const renderContent = () => {
    if (currentPage === 'profile') return <ProfilePage user={currentUser} activities={activities} onNavigate={setCurrentPage} />;
    switch (currentUser.role) {
      case 'admin': return <AdminDashboard volunteers={volunteers} activities={activities} currentUser={currentUser} />;
      case 'volunteer': return <VolunteerDashboard user={currentUser} activities={activities} />;
      default: return <VisitorHome activities={activities} />;
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
