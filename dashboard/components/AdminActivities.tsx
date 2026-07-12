import React from 'react';
import type { Activity, Volunteer } from '../types';

interface AdminActivitiesProps {
  activities: Activity[];
  volunteers: Volunteer[];
}

export const AdminActivities: React.FC<AdminActivitiesProps> = ({ activities, volunteers }) => {
  const upcoming = activities.filter((activity) => activity.status === 'Upcoming');
  const completed = activities.filter((activity) => activity.status === 'Completed');

  return (
    <div className="p-4 md:p-6 bg-[#f4f8f2] min-h-full">
      <div className="mb-6 rounded-lg bg-[#174f3f] text-white p-6 md:p-8 border border-white/10 shadow-lg">
        <p className="text-xs uppercase tracking-[0.16em] font-black text-[#f5b041]">Activities</p>
        <h3 className="text-3xl md:text-4xl font-black mt-2">Rescue activity planner</h3>
        <p className="text-white/70 mt-2 max-w-2xl">Track cleanups, veterinary camps, feeding routes, awareness programs, and meeting work.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg border border-[#dfe8e1] bg-[#fffdf8] p-5 shadow-sm"><p className="text-xs uppercase tracking-[.14em] font-black text-[#6b756f]">Upcoming</p><strong className="mt-2 block text-3xl">{upcoming.length}</strong></div>
        <div className="rounded-lg border border-[#dfe8e1] bg-[#fffdf8] p-5 shadow-sm"><p className="text-xs uppercase tracking-[.14em] font-black text-[#6b756f]">Completed</p><strong className="mt-2 block text-3xl">{completed.length}</strong></div>
        <div className="rounded-lg border border-[#dfe8e1] bg-[#fffdf8] p-5 shadow-sm"><p className="text-xs uppercase tracking-[.14em] font-black text-[#6b756f]">Volunteer Capacity</p><strong className="mt-2 block text-3xl">{volunteers.reduce((sum, v) => sum + v.activities, 0)}</strong></div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_.8fr] gap-5">
        <div className="rounded-lg border border-[#dfe8e1] bg-[#fffdf8] p-5 shadow-sm">
          <div className="mb-4 flex flex-wrap justify-between gap-3">
            <div>
              <h4 className="text-xl font-black">Activity schedule</h4>
              <p className="text-[#6b756f]">Current rescue and community activities.</p>
            </div>
            <button className="rounded-lg bg-[#174f3f] px-4 py-2 font-black text-white">Create Activity</button>
          </div>
          <div className="grid gap-3">
            {activities.map((activity) => (
              <article key={activity.id} className="rounded-lg border border-[#dfe8e1] bg-[#f4f8f2] p-4">
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <h5 className="font-black text-[#17211d]">{activity.title}</h5>
                    <p className="mt-1 text-sm text-[#6b756f]">{activity.description}</p>
                    <p className="mt-2 text-xs font-bold text-[#6b756f]">{activity.date} · {activity.volunteers} volunteers needed</p>
                  </div>
                  <span className={`h-fit rounded-lg px-3 py-1 text-xs font-black ${activity.status === 'Completed' ? 'bg-[#dff3e7] text-[#174f3f]' : 'bg-[#eef8fc] text-[#286c90]'}`}>{activity.status}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[#dfe8e1] bg-[#fffdf8] p-5 shadow-sm">
          <h4 className="text-xl font-black">Volunteer assignment</h4>
          <p className="mb-4 text-[#6b756f]">Active helpers ready for activity work.</p>
          <div className="grid gap-3">
            {volunteers.map((volunteer) => (
              <div key={volunteer.id} className="rounded-lg border border-[#dfe8e1] bg-[#f4f8f2] p-4">
                <p className="font-black">{volunteer.name}</p>
                <p className="text-sm text-[#6b756f]">{volunteer.skills.join(', ')}</p>
                <p className="mt-2 text-xs font-bold text-[#6b756f]">{volunteer.hours} hours · {volunteer.activities} activities</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
