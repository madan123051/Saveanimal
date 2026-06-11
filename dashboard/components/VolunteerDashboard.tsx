import React from 'react';
import type { User, Activity } from '../types';
import { StatCard } from './StatCard';

interface VolunteerDashboardProps {
  user: User;
  activities: Activity[];
}

export const VolunteerDashboard: React.FC<VolunteerDashboardProps> = ({ user, activities }) => {
  return (
    <div className="dashboard-content">
      <h3 className="text-3xl font-bold mb-8">Your Dashboard</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Volunteer Hours"
          value={user.hours || 0}
          icon="⏱️"
          color="success"
        />
        <StatCard
          title="Activities Joined"
          value={user.activities || 0}
          icon="🎯"
          color="info"
        />
        <StatCard
          title="Member Since"
          value={user.joinDate ? user.joinDate.split('-')[0] : '2024'}
          icon="📅"
          color="primary"
        />
        <StatCard
          title="Skills"
          value={user.skills?.length || 0}
          icon="⭐"
          color="warning"
        />
      </div>

      <div className="card bg-base-200">
        <div className="card-body">
          <h4 className="card-title text-lg mb-4">Upcoming Activities</h4>
          <div className="space-y-3">
            {activities.filter(a => a.status === 'Upcoming').map(a => (
              <div key={a.id} className="flex justify-between items-center p-4 bg-base-100 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold">{a.title}</p>
                  <p className="text-sm text-base-content/60">{a.date} • {a.volunteers} volunteers</p>
                </div>
                <button className="btn btn-primary btn-sm">Join</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
