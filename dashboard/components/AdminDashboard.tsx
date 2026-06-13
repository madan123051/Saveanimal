import React from 'react';
import type { Volunteer, Activity, User } from '../types';
import { StatCard } from './StatCard';

interface AdminDashboardProps { volunteers: Volunteer[]; activities: Activity[]; currentUser: User; }

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ volunteers, activities, currentUser }) => {
  const totalHours = volunteers.reduce((sum, v) => sum + v.hours, 0);
  const completedActivities = activities.filter(a => a.status === 'Completed').length;

  return (
    <div className="p-6"><h3 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Volunteers" value={volunteers.length} icon="👥" color="info" />
        <StatCard title="Total Hours" value={totalHours} icon="⏱️" color="success" />
        <StatCard title="Completed Activities" value={completedActivities} icon="✅" color="warning" />
        <StatCard title="Upcoming Activities" value={activities.filter(a => a.status === 'Upcoming').length} icon="📅" color="primary" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h4 className="font-bold text-gray-700 text-lg mb-4">Recent Volunteers</h4>
          <div className="space-y-3">
            {volunteers.slice(0, 3).map(v => (
              <div key={v.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div><p className="font-semibold text-gray-800">{v.name}</p><p className="text-sm text-gray-500">{v.hours} hours · {v.activities} activities</p></div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{v.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h4 className="font-bold text-gray-700 text-lg mb-4">Upcoming Activities</h4>
          <div className="space-y-3">
            {activities.filter(a => a.status === 'Upcoming').map(a => (
              <div key={a.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div><p className="font-semibold text-gray-800">{a.title}</p><p className="text-sm text-gray-500">{a.date} · {a.volunteers} volunteers</p></div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};