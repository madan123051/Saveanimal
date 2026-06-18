import React from 'react';

function LoginPage() {
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
        <h1 style={{ color: '#10b981', marginBottom: '10px' }}>SaveAnimal Nepal</h1>
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>Redirecting to login page...</p>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(16, 185, 129, 0.3)',
          borderTopColor: '#10b981',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto'
        }} />
      </div>
      <script dangerouslySetInnerHTML={{
        __html: 'window.location.href = "/login.html";'
      }} />
    </div>
  );
}

export default LoginPage;