import React from 'react';
import type { Activity } from '../types';

interface VisitorHomeProps { activities: Activity[]; }

export const VisitorHome: React.FC<VisitorHomeProps> = ({ activities }) => {
  return (
    <div className="p-6">
      <div className="mb-8"><h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to SaveAnimal NGO 🐾</h2><p className="text-gray-500">Making a difference for animals, one action at a time</p></div>
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8"><h3 className="font-bold text-green-800 text-lg mb-2">About Us</h3><p className="text-green-700">We are dedicated to animal welfare and protection. Our volunteer community works tirelessly to rescue, rehabilitate, and rehome animals in need.</p></div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Our Activities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map(a => (
          <div key={a.id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-gray-800">{a.title}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${a.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{a.status}</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">📅 {a.date}</p>
            <p className="text-sm text-gray-600 mb-3">{a.description}</p>
            <p className="text-sm text-gray-500">👥 {a.volunteers} Volunteers</p>
          </div>
        ))}
      </div>
    </div>
  );
};