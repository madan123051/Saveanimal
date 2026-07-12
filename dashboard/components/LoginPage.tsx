import React, { useEffect } from 'react';

/**
 * LoginPage redirects to the Firebase Auth login page (/login.html).
 * Clears any stale session data so users start fresh.
 */
export const LoginPage: React.FC<{ onLogin?: (role: string, id: string) => void; volunteers?: unknown[] }> = () => {
  useEffect(() => {
    localStorage.removeItem('saveanimal_user');
    localStorage.removeItem('saveanimal_currentUser');
    const timer = window.setTimeout(() => window.location.replace('/login.html'), 800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
                  background:'linear-gradient(135deg,#eef7ef,#f9fbf2)', fontFamily:'Inter,sans-serif', padding:24 }}>
      <div style={{ textAlign:'center', color:'#17211d', background:'#fffdf8', border:'1px solid #dfe8e1',
                    borderRadius:8, padding:28, boxShadow:'0 22px 70px rgba(23,79,63,.16)' }}>
        <div style={{ width:48, height:48, borderRadius:8, background:'#174f3f', color:'#fff', display:'grid',
                      placeItems:'center', fontWeight:900, margin:'0 auto 16px' }}>SA</div>
        <p style={{ fontSize:16, fontWeight:800, margin:0 }}>Opening login page...</p>
        <p style={{ fontSize:13, opacity:0.7, margin:'6px 0 0' }}>Use Demo Admin to check the dashboard.</p>
      </div>
    </div>
  );
};
