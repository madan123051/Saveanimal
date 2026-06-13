import React, { useState } from 'react';
import type { Volunteer } from '../types';

interface LoginPageProps { onLogin: (role: string, id: string) => void; volunteers: Volunteer[]; }

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, volunteers }) => {
  const [selectedRole, setSelectedRole] = useState('volunteer');
  const [selectedId, setSelectedId] = useState('V001');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-8"><div className="text-6xl mb-3">🐾</div><h1 className="text-2xl font-bold text-gray-800">SaveAnimal NGO</h1><p className="text-gray-500 mt-1">Unified Login Portal</p></div>
        <div className="mb-6"><label className="block text-sm font-semibold text-gray-700 mb-3">Login As:</label><div className="grid grid-cols-1 gap-2">
          {[{ role: 'volunteer', label: '🤝 Volunteer', id: 'V001' }, { role: 'admin', label: '👨‍💼 Admin', id: 'ADMIN001' }, { role: 'visitor', label: '👁️ Visitor', id: 'GUEST001' }].map(({ role, label, id }) => (
            <button key={role} className={`py-2 px-4 rounded-lg border-2 text-sm font-medium transition ${selectedRole === role ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`} onClick={() => { setSelectedRole(role); setSelectedId(id); }}>{label}</button>
          ))}
        </div></div>
        {selectedRole === 'volunteer' && (
          <div className="mb-6"><label className="block text-sm font-semibold text-gray-700 mb-2">Select Volunteer:</label><select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {volunteers.map(v => (<option key={v.id} value={v.id}>{v.name} ({v.id})</option>))}
          </select></div>
        )}
        <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition" onClick={() => onLogin(selectedRole, selectedId)}>Login to Dashboard →</button>
        <p className="text-center text-xs text-gray-400 mt-4">🔒 Demo interface</p>
      </div>
    </div>
  );
};