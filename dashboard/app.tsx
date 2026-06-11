import React, { useState, useEffect, createRoot } from 'react';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { VolunteerDashboard } from './components/VolunteerDashboard';
import { VisitorHome } from './components/VisitorHome';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import './styles.css';
import type { User, Volunteer, Activity } from './types';

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Initialize demo data and restore session
  useEffect(() => {
    initializeDemoData();
    restoreUserSession();
  }, []);

  // Auto-close sidebar on scroll
  useEffect(() => {
    let scrollTimeout: number;
    const handleScroll = () => {
      if (sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    
    const scrollListener = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(handleScroll, 100);
    };
    
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
      clearTimeout(scrollTimeout);
    };
  }, [sidebarOpen]);

  const restoreUserSession = () => {
    try {
      const savedUser = localStorage.getItem('saveanimal_currentUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setCurrentPage('dashboard');
      }
    } catch (error) {
      console.error('Failed to restore user session:', error);
    }
  };

  const initializeDemoData = () => {
    const demoVolunteers: Volunteer[] = [
      {
        id: 'V001',
        name: 'Rahul Kumar',
        email: 'rahul@saveanimal.com',
        phone: '9876543210',
        skills: ['Animal Care', 'Education'],
        hours: 45,
        joinDate: '2024-01-15',
        status: 'Active',
        activities: 5
      },
      {
        id: 'V002',
        name: 'Priya Singh',
        email: 'priya@saveanimal.com',
        phone: '9876543211',
        skills: ['Fundraising', 'Social Media'],
        hours: 32,
        joinDate: '2024-02-20',
        status: 'Active',
        activities: 3
      },
      {
        id: 'V003',
        name: 'Amit Patel',
        email: 'amit@saveanimal.com',
        phone: '9876543212',
        skills: ['Veterinary', 'Animal Care'],
        hours: 68,
        joinDate: '2023-12-01',
        status: 'Active',
        activities: 8
      }
    ];

    const demoActivities: Activity[] = [
      {
        id: 'A001',
        title: 'Animal Shelter Cleanup',
        date: '2024-06-10',
        volunteers: 12,
        status: 'Completed',
        description: 'Weekly cleaning and maintenance at shelter'
      },
      {
        id: 'A002',
        title: 'Veterinary Camp',
        date: '2024-06-15',
        volunteers: 8,
        status: 'Upcoming',
        description: 'Free health checkup for street animals'
      },
      {
        id: 'A003',
        title: 'Awareness Program',
        date: '2024-06-20',
        volunteers: 15,
        status: 'Upcoming',
        description: 'School program on animal welfare'
      }
    ];

    setVolunteers(demoVolunteers);
    setActivities(demoActivities);
  };

  const handleLogin = (role: string, id: string) => {
    let userData: User;
    
    if (role === 'volunteer') {
      const volunteer = volunteers.find(v => v.id === id);
      userData = volunteer ? { ...volunteer, role: 'volunteer' as const } : {
        id,
        name: 'Volunteer User',
        role: 'volunteer' as const
      };
    } else if (role === 'admin') {
      userData = {
        id: 'ADMIN001',
        name: 'Admin User',
        email: 'admin@saveanimal.com',
        role: 'admin' as const
      };
    } else {
      userData = {
        id: 'GUEST001',
        name: 'Guest User',
        role: 'visitor' as const
      };
    }
    
    // Save user session to localStorage
    try {
      localStorage.setItem('saveanimal_currentUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user session:', error);
    }
    
    setCurrentUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    // Clear user session from localStorage
    try {
      localStorage.removeItem('saveanimal_currentUser');
    } catch (error) {
      console.error('Failed to clear user session:', error);
    }
    
    setCurrentUser(null);
    setCurrentPage('login');
    setSidebarOpen(true);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} volunteers={volunteers} />;
  }

  return (
    <div className="app-container">
      <Sidebar
        user={currentUser}
        sidebarOpen={sidebarOpen}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          setSidebarOpen(false);
        }}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onLogout={handleLogout}
      />

      <main className="main-content">
        <Header user={currentUser} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="content-area">
          {currentUser.role === 'admin' && (
            <>
              {currentPage === 'dashboard' && <AdminDashboard volunteers={volunteers} activities={activities} />}
            </>
          )}

          {currentUser.role === 'volunteer' && (
            <>
              {currentPage === 'dashboard' && <VolunteerDashboard user={currentUser} activities={activities} />}
            </>
          )}

          {currentUser.role === 'visitor' && (
            <>
              {currentPage === 'dashboard' && <VisitorHome activities={activities} />}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
