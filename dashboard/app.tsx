import React, { useEffect, useState } from 'react';
import { UserRole } from './types';
import LoginPage from './components/LoginPage';

interface User {
  uid: string;
  email: string;
  displayName?: string;
}

interface AuthState {
  user: User | null;
  role: UserRole;
  loading: boolean;
  error: string | null;
}

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    role: 'visitor',
    loading: true,
    error: null
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      setAuthState(prev => ({ ...prev, loading: false }));
      return;
    }

    // Fetch user role from API
    fetchUserRole(token);
  }, []);

  const fetchUserRole = async (token: string) => {
    try {
      const response = await fetch('/api/user/role', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        localStorage.removeItem('authToken');
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: 'Session expired. Please log in again.'
        }));
        return;
      }

      const { userId, role, email } = await response.json();
      setAuthState({
        user: { uid: userId, email },
        role: role as UserRole,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Failed to fetch user role:', error);
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load user data'
      }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthState({
      user: null,
      role: 'visitor',
      loading: false,
      error: null
    });
  };

  if (authState.loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🐾</div>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>Loading SaveAnimal Nepal...</p>
          <div style={{
            width: '30px',
            height: '30px',
            border: '3px solid rgba(16, 185, 129, 0.3)',
            borderTopColor: '#10b981',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto'
          }} />
        </div>
      </div>
    );
  }

  if (!authState.user) {
    return <LoginPage />;
  }

  // Render appropriate dashboard based on role
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    }}>
      <nav style={{
        background: 'white',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
            🐾 SaveAnimal Nepal
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: '#6b7280', marginBottom: '8px' }}>
              Welcome, {authState.user.displayName || authState.user.email}
            </p>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {authState.role === 'admin' && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '20px',
            marginBottom: '20px'
          }}>
            <h1 style={{ color: '#10b981', marginBottom: '15px' }}>👨‍💼 Admin Dashboard</h1>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              You have admin access. Manage users, roles, and system settings.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                background: '#f0fdf4',
                padding: '20px',
                borderRadius: '10px',
                borderLeft: '4px solid #10b981'
              }}>
                <h3 style={{ color: '#166534', marginBottom: '10px' }}>Manage Users</h3>
                <p style={{ color: '#4b5563', fontSize: '14px' }}>View and manage all users in the system</p>
              </div>
              <div style={{
                background: '#f0fdf4',
                padding: '20px',
                borderRadius: '10px',
                borderLeft: '4px solid #10b981'
              }}>
                <h3 style={{ color: '#166534', marginBottom: '10px' }}>Assign Roles</h3>
                <p style={{ color: '#4b5563', fontSize: '14px' }}>Assign admin, volunteer, or user roles</p>
              </div>
              <div style={{
                background: '#f0fdf4',
                padding: '20px',
                borderRadius: '10px',
                borderLeft: '4px solid #10b981'
              }}>
                <h3 style={{ color: '#166534', marginBottom: '10px' }}>System Settings</h3>
                <p style={{ color: '#4b5563', fontSize: '14px' }}>Configure system-wide settings</p>
              </div>
            </div>
          </div>
        )}

        {authState.role === 'volunteer' && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '20px',
            marginBottom: '20px'
          }}>
            <h1 style={{ color: '#10b981', marginBottom: '15px' }}>🤝 Volunteer Dashboard</h1>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              Thank you for volunteering with SaveAnimal Nepal. Here you can participate in conservation efforts.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                background: '#fef3c7',
                padding: '20px',
                borderRadius: '10px',
                borderLeft: '4px solid #f59e0b'
              }}>
                <h3 style={{ color: '#92400e', marginBottom: '10px' }}>Upcoming Activities</h3>
                <p style={{ color: '#78350f', fontSize: '14px' }}>View volunteer opportunities</p>
              </div>
              <div style={{
                background: '#fef3c7',
                padding: '20px',
                borderRadius: '10px',
                borderLeft: '4px solid #f59e0b'
              }}>
                <h3 style={{ color: '#92400e', marginBottom: '10px' }}>My Contributions</h3>
                <p style={{ color: '#78350f', fontSize: '14px' }}>Track your volunteer hours</p>
              </div>
            </div>
          </div>
        )}

        {authState.role === 'user' && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '20px',
            marginBottom: '20px'
          }}>
            <h1 style={{ color: '#10b981', marginBottom: '15px' }}>👤 User Dashboard</h1>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              Welcome to SaveAnimal Nepal. Explore wildlife conservation efforts and learn how you can help.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                background: '#dbeafe',
                padding: '20px',
                borderRadius: '10px',
                borderLeft: '4px solid #3b82f6'
              }}>
                <h3 style={{ color: '#1e40af', marginBottom: '10px' }}>Learn About Wildlife</h3>
                <p style={{ color: '#1e3a8a', fontSize: '14px' }}>Discover conservation stories</p>
              </div>
              <div style={{
                background: '#dbeafe',
                padding: '20px',
                borderRadius: '10px',
                borderLeft: '4px solid #3b82f6'
              }}>
                <h3 style={{ color: '#1e40af', marginBottom: '10px' }}>Donate & Support</h3>
                <p style={{ color: '#1e3a8a', fontSize: '14px' }}>Help fund conservation projects</p>
              </div>
              <div style={{
                background: '#dbeafe',
                padding: '20px',
                borderRadius: '10px',
                borderLeft: '4px solid #3b82f6'
              }}>
                <h3 style={{ color: '#1e40af', marginBottom: '10px' }}>Get Involved</h3>
                <p style={{ color: '#1e3a8a', fontSize: '14px' }}>Join upcoming community events</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;