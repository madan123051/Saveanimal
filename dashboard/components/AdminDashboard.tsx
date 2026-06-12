import React from 'react';
import type { Volunteer, Activity, User } from '../types';
import { StatCard } from './StatCard';

interface AdminDashboardProps {
  volunteers: Volunteer[];
  activities: Activity[];
  currentUser?: User;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ volunteers, activities, currentUser }) => {
  const totalHours = volunteers.reduce((sum, v) => sum + v.hours, 0);
  const completedActivities = activities.filter(a => a.status === 'Completed').length;

  return (
    <div className="dashboard-content">
      <h3 className="text-3xl font-bold mb-8">Admin Dashboard</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Volunteers" value={volunteers.length} icon="\uD83D\uDC65" color="info" />
        <StatCard title="Total Hours" value={totalHours} icon="\u23F1\uFE0F" color="success" />
        <StatCard title="Completed Activities" value={completedActivities} icon="\u2705" color="warning" />
        <StatCard title="Upcoming Activities" value={activities.filter(a => a.status === 'Upcoming').length} icon="\uD83D\uDCC5" color="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-200">
          <div className="card-body">
            <h4 className="card-title text-lg">Recent Volunteers</h4>
            <div className="space-y-3">
              {volunteers.slice(0, 3).map(v => (
                <div key={v.id} className="flex justify-between items-center p-3 bg-base-100 rounded-lg">
                  <div>
                    <p className="font-semibold">{v.name}</p>
                    <p className="text-sm text-base-content/60">{v.hours} hours • {v.activities} activities</p>
                  </div>
                  <span className="badge badge-success">{v.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h4 className="card-title text-lg">Upcoming Activities</h4>
            <div className="space-y-3">
              {activities.filter(a => a.status === 'Upcoming').map(a => (
                <div key={a.id} className="flex justify-between items-center p-3 bg-base-100 rounded-lg">
                  <div>
                    <p className="font-semibold">{a.title}</p>
                    <p className="text-sm text-base-content/60">{a.date} • {a.volunteers} volunteers</p>
                  </div>
                  <span className="badge badge-info">{a.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
