import React from 'react';
import { Edit2, Mail, Phone, Calendar, Award, Clock, Target } from 'lucide-react';
import type { User } from '../types';

interface ProfilePageProps {
  user: User;
  activities: any[];
  onNavigate?: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, activities, onNavigate }) => {
  const isVolunteer = user.role === 'volunteer';
  const isAdmin = user.role === 'admin';

  return (
    <div className="profile-page">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>

      {/* Profile Header Card */}
      <div className="card bg-base-200 shadow-lg mb-8">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Avatar */}
            <div className="avatar placeholder">
              <div className="bg-primary text-white rounded-full w-24 flex items-center justify-center">
                <span className="text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold">{user.name}</h2>
                  <p className="text-lg badge badge-lg mt-2" style={{
                    backgroundColor: isAdmin ? '#3b82f6' : isVolunteer ? '#10b981' : '#6366f1',
                    color: 'white'
                  }}>
                    {isAdmin ? '\u{1F468}\u200D\u{1F4BC} Admin' : isVolunteer ? '\uD83E\uDD1D Volunteer' : '\uD83D\uDC64 Visitor'}
                  </p>
                </div>
                <button className="btn btn-outline btn-sm gap-2">
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {'email' in user && user.email && (
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-primary" />
                    <div>
                      <p className="text-sm opacity-70">Email</p>
                      <p className="font-semibold">{user.email}</p>
                    </div>
                  </div>
                )}

                {'phone' in user && (user as any).phone && (
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-primary" />
                    <div>
                      <p className="text-sm opacity-70">Phone</p>
                      <p className="font-semibold">{(user as any).phone}</p>
                    </div>
                  </div>
                )}

                {'joinDate' in user && (user as any).joinDate && (
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-primary" />
                    <div>
                      <p className="text-sm opacity-70">Join Date</p>
                      <p className="font-semibold">{new Date((user as any).joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}

                {'status' in user && (user as any).status && (
                  <div className="flex items-center gap-3">
                    <Award size={18} className="text-primary" />
                    <div>
                      <p className="text-sm opacity-70">Status</p>
                      <p className="font-semibold text-success">{(user as any).status}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Volunteer-Specific Stats */}
      {isVolunteer && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card bg-base-200 shadow-md">
              <div className="card-body text-center">
                <Clock size={32} className="mx-auto mb-2 text-primary" />
                <p className="text-sm opacity-70">Total Hours</p>
                <p className="text-3xl font-bold text-primary">{'hours' in user ? (user as any).hours : 0}</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-md">
              <div className="card-body text-center">
                <Target size={32} className="mx-auto mb-2 text-success" />
                <p className="text-sm opacity-70">Activities</p>
                <p className="text-3xl font-bold text-success">{'activities' in user ? (user as any).activities : 0}</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-md">
              <div className="card-body text-center">
                <Award size={32} className="mx-auto mb-2 text-warning" />
                <p className="text-sm opacity-70">Skills</p>
                <p className="text-3xl font-bold text-warning">{'skills' in user ? ((user as any).skills as any[]).length : 0}</p>
              </div>
            </div>
          </div>

          {'skills' in user && ((user as any).skills as any[]).length > 0 && (
            <div className="card bg-base-200 shadow-lg mb-8">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {((user as any).skills as any[]).map((skill: string, idx: number) => (
                    <span key={idx} className="badge badge-lg badge-primary gap-2">
                      \u2713 {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-xl mb-4">Recent Activities</h3>
              {activities.length > 0 ? (
                <div className="space-y-3">
                  {activities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="p-4 bg-base-100 rounded-lg border border-base-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-lg">{activity.title}</h4>
                          <p className="text-sm opacity-70 mt-1">{activity.description}</p>
                          <p className="text-sm opacity-50 mt-2">\uD83D\uDCC5 {activity.date}</p>
                        </div>
                        <span className={`badge ${
                          activity.status === 'Completed' ? 'badge-success' :
                          activity.status === 'Upcoming' ? 'badge-info' : 'badge-warning'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center opacity-70 py-8">No activities yet</p>
              )}
            </div>
          </div>
        </>
      )}

      {isAdmin && (
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-xl mb-4">Admin Information</h3>
            <div className="space-y-4">
              <div className="p-4 bg-base-100 rounded-lg">
                <p className="text-sm opacity-70">Admin ID</p>
                <p className="text-lg font-semibold">{user.id}</p>
              </div>
              <div className="p-4 bg-base-100 rounded-lg">
                <p className="text-sm opacity-70">Role</p>
                <p className="text-lg font-semibold text-primary">System Administrator</p>
              </div>
              <div className="alert alert-info mt-4">
                <span>\u2713 You have full access to all dashboard features and user management tools</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
