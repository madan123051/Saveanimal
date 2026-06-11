import React from 'react';
import type { Activity } from '../types';

interface VisitorHomeProps {
  activities: Activity[];
}

export const VisitorHome: React.FC<VisitorHomeProps> = ({ activities }) => {
  return (
    <div className="dashboard-content">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-2">Welcome to SaveAnimal NGO</h2>
        <p className="text-lg text-base-content/60">Making a difference for animals, one action at a time 🐾</p>
      </div>

      <div className="card bg-base-200 mb-8">
        <div className="card-body">
          <h3 className="card-title">About Us</h3>
          <p className="text-base-content/80">
            We are dedicated to animal welfare and protection. Our volunteer community works tirelessly to rescue, 
            rehabilitate, and rehome animals in need.
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6">Our Activities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map(a => (
          <div key={a.id} className="card bg-base-200 shadow hover:shadow-lg transition">
            <div className="card-body">
              <div className="flex justify-between items-start mb-2">
                <h4 className="card-title text-lg">{a.title}</h4>
                <span className={`badge ${a.status === 'Completed' ? 'badge-success' : 'badge-info'}`}>
                  {a.status}
                </span>
              </div>
              <p className="text-sm text-base-content/60">📅 {a.date}</p>
              <p className="text-base-content/80 my-3">{a.description}</p>
              <p className="text-sm text-base-content/60">👥 {a.volunteers} Volunteers</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
