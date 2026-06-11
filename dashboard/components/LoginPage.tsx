import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import type { Volunteer } from '../types';

interface LoginPageProps {
  onLogin: (role: string, id: string) => void;
  volunteers: Volunteer[];
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, volunteers }) => {
  const [selectedRole, setSelectedRole] = useState('volunteer');
  const [selectedId, setSelectedId] = useState('V001');

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Heart size={48} fill="currentColor" className="text-error" />
          <h1>SaveAnimal NGO</h1>
          <p>Unified Login Portal</p>
        </div>

        <div className="login-form">
          <div className="role-selector">
            <label className="block text-sm font-semibold mb-3">Login As:</label>
            <div className="grid grid-cols-1 gap-2">
              <button
                className={`btn btn-sm ${selectedRole === 'volunteer' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => {
                  setSelectedRole('volunteer');
                  setSelectedId('V001');
                }}
              >
                👤 Volunteer
              </button>
              <button
                className={`btn btn-sm ${selectedRole === 'admin' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedRole('admin')}
              >
                👨‍💼 Admin
              </button>
              <button
                className={`btn btn-sm ${selectedRole === 'visitor' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedRole('visitor')}
              >
                👁️ Visitor
              </button>
            </div>
          </div>

          {selectedRole === 'volunteer' && (
            <div className="volunteer-select">
              <label className="block text-sm font-semibold mb-2">Select Volunteer:</label>
              <select 
                className="select select-bordered w-full" 
                value={selectedId} 
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {volunteers.map(v => (
                  <option key={v.id} value={v.id}>{v.name} ({v.id})</option>
                ))}
              </select>
            </div>
          )}

          <button
            className="btn btn-primary w-full"
            onClick={() => onLogin(selectedRole, selectedId)}
          >
            Login to Dashboard
          </button>
        </div>

        <div className="alert alert-info mt-6">
          <span className="text-sm">🔒 This is a demo interface.</span>
        </div>
      </div>
    </div>
  );
};
