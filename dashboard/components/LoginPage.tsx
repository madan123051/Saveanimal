import React, { useEffect } from 'react';

/**
 * LoginPage redirects to the Firebase Auth login page (/login.html).
 * Clears any stale session data so users start fresh.
 */
export const LoginPage: React.FC<{ onLogin?: (role: string, id: string) => void; volunteers?: unknown[] }> = () => {
  useEffect(() => {
    localStorage.removeItem('saveanimal_user');
    localStorage.removeItem('saveanimal_currentUser');
    window.location.replace('/login.html');
  }, []);

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
                  background:'linear-gradient(135deg,#0f4c1f,#1a6b3a)', fontFamily:'Inter,sans-serif' }}>
      <div style={{ textAlign:'center', color:'white' }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🐾</div>
        <p style={{ fontSize:16, opacity:0.9 }}>Redirecting to login…</p>
      </div>
    </div>
  );
};
