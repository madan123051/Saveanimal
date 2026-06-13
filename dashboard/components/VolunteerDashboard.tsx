import React from 'react';
import type { User, Activity } from '../types';
import { StatCard } from './StatCard';

interface VolunteerDashboardProps { user: User; activities: Activity[]; }

export const VolunteerDashboard: React.FC<VolunteerDashboardProps> = ({ user, activities }) => {
  return (
    <div className="p-6"><h3 className="text-2xl font-bold text-gray-800 mb-6">Your Dashboard</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Volunteer Hours" value={user.hours || 0} icon="⏱️" color="success" />
        <StatCard title="Activities Joined" value={user.activities || 0} icon="🎯" color="info" />
        <StatCard title="Member Since" value={user.joinDate ? user.joinDate.split('-')[0] : '2024'} icon="📅" color="primary" />
        <StatCard title="Skills" value={user.skills?.length || 0} icon="⭐" color="warning" />
      </div>
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h4 className="font-bold text-gray-700 text-lg mb-4">Upcoming Activities</h4>
        <div className="space-y-3">
          {activities.filter(a => a.status === 'Upcoming').map(a => (
            <div key={a.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex-1"><p className="font-semibold text-gray-800">{a.title}</p><p className="text-sm text-gray-500">{a.date} · {a.volunteers} volunteers needed</p><p className="text-sm text-gray-600 mt-1">{a.description}</p></div>
              <button className="ml-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition">Join</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};