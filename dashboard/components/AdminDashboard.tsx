import React, { useMemo, useState } from 'react';
import type { Volunteer, Activity, User } from '../types';
import { StatCard } from './StatCard';

interface AdminDashboardProps { volunteers: Volunteer[]; activities: Activity[]; currentUser: User; }

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ volunteers, activities, currentUser }) => {
  const [activeModule, setActiveModule] = useState<'overview' | 'users' | 'content' | 'finance'>('overview');
  const [users, setUsers] = useState([
    { id:'U001', name:'Madan Admin', email:'madan123050@gmail.com', role:'Admin', status:'Active', joined:'2026-07-12', verified:true },
    { id:'DEMO-VOLUNTEER', name:'Rescue Volunteer', email:'volunteer@saveanimal.local', role:'Volunteer', status:'Active', joined:'2026-07-10', verified:false },
    { id:'DEMO-VISITOR', name:'Public Supporter', email:'visitor@saveanimal.local', role:'Visitor', status:'Pending', joined:'2026-07-08', verified:false },
  ]);
  const [contentItems, setContentItems] = useState([
    { id:'P001', type:'Rescue Blog', title:'Monsoon rescue preparation', media:'Photo', status:'Published', date:'2026-07-11' },
    { id:'P002', type:'Meeting', title:'Volunteer feeding route planning', media:'Video', status:'Draft', date:'2026-07-13' },
    { id:'P003', type:'Rescue Update', title:'Patan injured dog treatment update', media:'Photo', status:'Published', date:'2026-07-12' },
  ]);
  const [ledger, setLedger] = useState([
    { id:'T001', type:'credit', title:'Khalti monthly donor', category:'Donation', amount:18000, date:'2026-07-12' },
    { id:'T002', type:'debit', title:'Clinic medicine invoice', category:'Medical', amount:7200, date:'2026-07-12' },
    { id:'T003', type:'debit', title:'Rescue van fuel', category:'Transport', amount:2800, date:'2026-07-11' },
    { id:'T004', type:'credit', title:'eSewa emergency fund', category:'Donation', amount:12500, date:'2026-07-10' },
  ]);
  const totalHours = volunteers.reduce((sum, v) => sum + v.hours, 0);
  const completedActivities = activities.filter(a => a.status === 'Completed').length;
  const totals = useMemo(() => {
    const credit = ledger.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
    const debit = ledger.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);
    return { credit, debit, balance: credit - debit };
  }, [ledger]);

  const moduleButton = (id: typeof activeModule, label: string, sub: string) => (
    <button onClick={() => setActiveModule(id)}
      className={`text-left p-4 rounded-lg border transition ${activeModule === id ? 'bg-[#174f3f] text-white border-[#174f3f]' : 'bg-[#fffdf8] border-[#dfe8e1] hover:border-[#2f8f63]'}`}>
      <span className="block font-black">{label}</span>
      <span className={`block text-xs mt-1 ${activeModule === id ? 'text-white/65' : 'text-[#6b756f]'}`}>{sub}</span>
    </button>
  );

  const addDemoPost = () => {
    setContentItems([{ id:`P${Date.now()}`, type:'Rescue Blog', title:'New rescue story draft', media:'Photo/Video', status:'Draft', date:new Date().toISOString().slice(0,10) }, ...contentItems]);
  };

  const addDemoExpense = () => {
    setLedger([{ id:`T${Date.now()}`, type:'debit', title:'New rescue expense', category:'Rescue', amount:1500, date:new Date().toISOString().slice(0,10) }, ...ledger]);
  };

  const toggleVerification = (userId: string) => {
    const nextUsers = users.map(u => u.id === userId ? { ...u, verified: !u.verified, status: !u.verified ? 'Verified' : 'Pending' } : u);
    setUsers(nextUsers);
    const changed = nextUsers.find(u => u.id === userId);
    if (changed) {
      const verifiedMap = JSON.parse(localStorage.getItem('saveanimal_verified_users') || '{}');
      verifiedMap[changed.id] = !!changed.verified;
      verifiedMap[changed.email] = !!changed.verified;
      localStorage.setItem('saveanimal_verified_users', JSON.stringify(verifiedMap));
      const saved = localStorage.getItem('saveanimal_user');
      if (saved) {
        const current = JSON.parse(saved);
        if (current.id === changed.id || current.email === changed.email) {
          current.verified = !!changed.verified;
          localStorage.setItem('saveanimal_user', JSON.stringify(current));
          localStorage.setItem('saveanimal_currentUser', JSON.stringify(current));
        }
      }
    }
  };

  return (
    <div className="p-4 md:p-6 bg-[#f4f8f2] min-h-full">
      <div className="mb-6 rounded-lg bg-[#174f3f] text-white p-6 md:p-8 border border-white/10 shadow-lg">
        <p className="text-xs uppercase tracking-[0.16em] font-black text-[#f5b041]">Admin Dashboard</p>
        <h3 className="text-3xl md:text-4xl font-black mt-2">Rescue operations overview</h3>
        <p className="text-white/70 mt-2 max-w-2xl">Manage volunteers, track activities, and keep SaveAnimal Nepal rescue work moving from one calm control room.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Volunteers" value={volunteers.length} icon="V" color="info" />
        <StatCard title="Total Hours" value={totalHours} icon="H" color="success" />
        <StatCard title="Donation In" value={`NPR ${totals.credit.toLocaleString()}`} icon="CR" color="warning" />
        <StatCard title="Balance" value={`NPR ${totals.balance.toLocaleString()}`} icon="BL" color="primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        {moduleButton('overview', 'Overview', 'Rescue status and tasks')}
        {moduleButton('users', 'User Management', 'Admin, volunteer, visitor roles')}
        {moduleButton('content', 'Posts & Media', 'Photos, videos, blogs, meetings')}
        {moduleButton('finance', 'Donation Ledger', 'Credit, debit, expenses')}
      </div>

      {activeModule === 'overview' && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#fffdf8] rounded-lg shadow-sm p-5 border border-[#dfe8e1]">
          <h4 className="font-black text-[#17211d] text-lg mb-4">Recent Volunteers</h4>
          <div className="space-y-3">
            {volunteers.slice(0, 3).map(v => (
              <div key={v.id} className="flex justify-between items-center p-4 bg-[#f4f8f2] rounded-lg border border-[#dfe8e1]">
                <div><p className="font-black text-[#17211d]">{v.name}</p><p className="text-sm text-[#6b756f]">{v.hours} hours · {v.activities} activities</p></div>
                <span className="px-2 py-1 bg-[#dff3e7] text-[#174f3f] rounded-lg text-xs font-black">{v.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#fffdf8] rounded-lg shadow-sm p-5 border border-[#dfe8e1]">
          <h4 className="font-black text-[#17211d] text-lg mb-4">Upcoming Activities</h4>
          <div className="space-y-3">
            {activities.filter(a => a.status === 'Upcoming').map(a => (
              <div key={a.id} className="flex justify-between items-center p-4 bg-[#f4f8f2] rounded-lg border border-[#dfe8e1]">
                <div><p className="font-black text-[#17211d]">{a.title}</p><p className="text-sm text-[#6b756f]">{a.date} · {a.volunteers} volunteers</p></div>
                <span className="px-2 py-1 bg-[#eef8fc] text-[#407b9b] rounded-lg text-xs font-black">{a.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#fffdf8] rounded-lg shadow-sm p-5 border border-[#dfe8e1]">
          <h4 className="font-black text-[#17211d] text-lg mb-4">Rescue Summary</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-[#f4f8f2] rounded-lg border border-[#dfe8e1]"><p className="text-xs font-black text-[#6b756f] uppercase">Completed</p><strong className="text-3xl">{completedActivities}</strong></div>
            <div className="p-4 bg-[#f4f8f2] rounded-lg border border-[#dfe8e1]"><p className="text-xs font-black text-[#6b756f] uppercase">Upcoming</p><strong className="text-3xl">{activities.filter(a => a.status === 'Upcoming').length}</strong></div>
            <div className="p-4 bg-[#f4f8f2] rounded-lg border border-[#dfe8e1]"><p className="text-xs font-black text-[#6b756f] uppercase">Posts</p><strong className="text-3xl">{contentItems.length}</strong></div>
            <div className="p-4 bg-[#f4f8f2] rounded-lg border border-[#dfe8e1]"><p className="text-xs font-black text-[#6b756f] uppercase">Users</p><strong className="text-3xl">{users.length}</strong></div>
          </div>
        </div>
      </div>}

      {activeModule === 'users' && <section className="bg-[#fffdf8] rounded-lg shadow-sm p-5 border border-[#dfe8e1]">
        <div className="flex flex-wrap justify-between gap-3 mb-4"><div><h4 className="font-black text-xl">User Management</h4><p className="text-[#6b756f]">Manage admins, volunteers, visitors, account status, and verification badge.</p></div><button className="px-4 py-2 bg-[#174f3f] text-white rounded-lg font-black" onClick={() => setUsers([{ id:`U${Date.now()}`, name:'New Volunteer', email:'new@saveanimal.local', role:'Volunteer', status:'Pending', joined:new Date().toISOString().slice(0,10), verified:false }, ...users])}>Add User</button></div>
        <div className="overflow-auto"><table className="w-full text-sm"><thead><tr className="text-left text-[#6b756f] border-b border-[#dfe8e1]"><th className="py-3">Name</th><th>Email</th><th>Role</th><th>Badge</th><th>Status</th><th>Joined</th><th>Action</th></tr></thead><tbody>{users.map(u => <tr key={u.id} className="border-b border-[#edf2ee]"><td className="py-3 font-black">{u.name}</td><td>{u.email}</td><td><span className="px-2 py-1 rounded bg-[#dff3e7] text-[#174f3f] font-black">{u.role}</span></td><td>{u.verified ? <span className="px-2 py-1 rounded bg-[#eef8fc] text-[#286c90] font-black">Verified</span> : <span className="text-[#6b756f]">No badge</span>}</td><td>{u.status}</td><td>{u.joined}</td><td><button onClick={() => toggleVerification(u.id)} className={`px-3 py-2 rounded-lg font-black text-xs ${u.verified ? 'bg-[#fde5e2] text-[#8d2b25]' : 'bg-[#174f3f] text-white'}`}>{u.verified ? 'Remove' : 'Verify'}</button></td></tr>)}</tbody></table></div>
      </section>}

      {activeModule === 'content' && <section className="bg-[#fffdf8] rounded-lg shadow-sm p-5 border border-[#dfe8e1]">
        <div className="flex flex-wrap justify-between gap-3 mb-4"><div><h4 className="font-black text-xl">Posts, Photos, Videos, Blogs & Meetings</h4><p className="text-[#6b756f]">Upload rescue updates, meeting notes, photos, videos, and blog drafts.</p></div><button className="px-4 py-2 bg-[#174f3f] text-white rounded-lg font-black" onClick={addDemoPost}>Create Post</button></div>
        <div className="grid grid-cols-1 lg:grid-cols-[.8fr_1.2fr] gap-5">
          <div className="p-4 bg-[#f4f8f2] rounded-lg border border-[#dfe8e1]">
            <h5 className="font-black mb-3">Upload New Content</h5>
            <div className="grid gap-3"><input className="border border-[#dfe8e1] rounded-lg p-3" placeholder="Post title" /><select className="border border-[#dfe8e1] rounded-lg p-3"><option>Rescue Blog</option><option>Meeting Update</option><option>Rescue Photo Story</option><option>Video Update</option></select><input type="file" accept="image/*,video/*" className="border border-[#dfe8e1] rounded-lg p-3 bg-white" /><textarea className="border border-[#dfe8e1] rounded-lg p-3" rows={4} placeholder="Write blog, rescue note, or meeting summary"></textarea><button onClick={addDemoPost} className="px-4 py-3 bg-[#2f8f63] text-white rounded-lg font-black">Save Draft</button></div>
          </div>
          <div className="grid gap-3">{contentItems.map(item => <div key={item.id} className="p-4 bg-[#f4f8f2] rounded-lg border border-[#dfe8e1] flex justify-between gap-3"><div><p className="font-black">{item.title}</p><p className="text-sm text-[#6b756f]">{item.type} · {item.media} · {item.date}</p></div><span className="h-fit px-2 py-1 rounded bg-white border border-[#dfe8e1] font-black text-xs">{item.status}</span></div>)}</div>
        </div>
      </section>}

      {activeModule === 'finance' && <section className="bg-[#fffdf8] rounded-lg shadow-sm p-5 border border-[#dfe8e1]">
        <div className="flex flex-wrap justify-between gap-3 mb-4"><div><h4 className="font-black text-xl">Donation Credit/Debit Dashboard</h4><p className="text-[#6b756f]">Track how much donation came in and how much was spent.</p></div><button className="px-4 py-2 bg-[#174f3f] text-white rounded-lg font-black" onClick={addDemoExpense}>Add Expense</button></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5"><div className="p-4 bg-[#dff3e7] rounded-lg"><p className="font-black text-sm">Total Donation</p><strong className="text-2xl">NPR {totals.credit.toLocaleString()}</strong></div><div className="p-4 bg-[#fde5e2] rounded-lg"><p className="font-black text-sm">Total Expense</p><strong className="text-2xl">NPR {totals.debit.toLocaleString()}</strong></div><div className="p-4 bg-[#eef8fc] rounded-lg"><p className="font-black text-sm">Current Balance</p><strong className="text-2xl">NPR {totals.balance.toLocaleString()}</strong></div></div>
        <div className="overflow-auto"><table className="w-full text-sm"><thead><tr className="text-left text-[#6b756f] border-b border-[#dfe8e1]"><th className="py-3">Date</th><th>Title</th><th>Category</th><th>Type</th><th>Amount</th></tr></thead><tbody>{ledger.map(t => <tr key={t.id} className="border-b border-[#edf2ee]"><td className="py-3">{t.date}</td><td className="font-black">{t.title}</td><td>{t.category}</td><td><span className={`px-2 py-1 rounded font-black ${t.type === 'credit' ? 'bg-[#dff3e7] text-[#174f3f]' : 'bg-[#fde5e2] text-[#8d2b25]'}`}>{t.type}</span></td><td className="font-black">NPR {t.amount.toLocaleString()}</td></tr>)}</tbody></table></div>
      </section>}
    </div>
  );
};
