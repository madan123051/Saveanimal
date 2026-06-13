import React from 'react';
import type { User, Activity } from '../types';

interface ProfilePageProps { user: User; activities: Activity[]; onNavigate?: (page: string) => void; }

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, activities, onNavigate }) => {
  const isVolunteer = user.role === 'volunteer';
  const isAdmin = user.role === 'admin';

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">{user.name.charAt(0).toUpperCase()}</div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${isAdmin ? 'bg-blue-100 text-blue-700' : isVolunteer ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {isAdmin ? '👨‍💼 Admin' : isVolunteer ? '🤝 Volunteer' : '👁️ Visitor'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {user.email && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">📧</span>
                  <div><p className="text-xs text-gray-400">Email</p><p className="font-medium text-gray-700">{user.email}</p></div>
                </div>
              )}
              {user.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">📱</span>
                  <div><p className="text-xs text-gray-400">Phone</p><p className="font-medium text-gray-700">{user.phone}</p></div>
                </div>
              )}
              {user.joinDate && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">📅</span>
                  <div><p className="text-xs text-gray-400">Member Since</p><p className="font-medium text-gray-700">{new Date(user.joinDate).toLocaleDateString()}</p></div>
                </div>
              )}
              {user.status && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">🏅</span>
                  <div><p className="text-xs text-gray-400">Status</p><p className="font-medium text-green-600">{user.status}</p></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isVolunteer && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4 text-center"><p className="text-3xl font-bold text-green-600">{user.hours || 0}</p><p className="text-sm text-gray-500 mt-1">⏱️ Total Hours</p></div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center"><p className="text-3xl font-bold text-blue-600">{user.activities || 0}</p><p className="text-sm text-gray-500 mt-1">🎯 Activities</p></div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center"><p className="text-3xl font-bold text-yellow-600">{user.skills?.length || 0}</p><p className="text-sm text-gray-500 mt-1">⭐ Skills</p></div>
          </div>
          {user.skills && user.skills.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
              <h3 className="font-bold text-gray-700 mb-3">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">✓ {skill}</span>
                ))}
              </div>
            </div>
          )}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-gray-700 mb-4">Recent Activities</h3>
            {activities.length > 0 ? (
              <div className="space-y-3">
                {activities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800">{activity.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">📅 {activity.date}</p>
                    </div>
                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${activity.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{activity.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-6">No activities yet</p>
            )}
          </div>
        </>
      )}
      {isAdmin && (
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-gray-700 mb-4">Admin Information</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-400">Admin ID</p><p className="font-semibold text-gray-800">{user.id}</p></div>
            <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-400">Role</p><p className="font-semibold text-blue-600">System Administrator</p></div>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700">✓ Full access to all dashboard features and user management tools</div>
          </div>
        </div>
      )}
      {!isVolunteer && !isAdmin && (
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-gray-700 mb-3">Visitor Account</h3>
          <p className="text-gray-500 mb-4">You are browsing as a visitor. Join us as a volunteer to make a difference!</p>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition" onClick={() => window.location.href = '/'}>🐾 Become a Volunteer</button>
        </div>
      )}
    </div>
  );
}