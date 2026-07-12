import React, { useMemo, useState } from 'react';

type RescueReport = {
  id?: string;
  name?: string;
  phone?: string;
  location?: string;
  condition?: string;
  timestamp?: string;
  status?: string;
};

const fallbackReports: RescueReport[] = [
  { id:'R001', name:'Community caller', phone:'Pending', location:'Kathmandu Durbar Marg', condition:'Injured street dog needs pickup', timestamp:new Date().toISOString(), status:'Pending' },
  { id:'R002', name:'Volunteer tip', phone:'Pending', location:'27.671000, 85.429800', condition:'Weak calf near roadside', timestamp:new Date(Date.now() - 3600000).toISOString(), status:'Assigned' }
];

export const AdminReports: React.FC = () => {
  const [reports, setReports] = useState<RescueReport[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('rescueReports') || '[]');
      if (Array.isArray(saved) && saved.length) return saved;
    } catch (_) {}
    return fallbackReports;
  });

  const counts = useMemo(() => ({
    total: reports.length,
    pending: reports.filter((r) => (r.status || 'Pending') === 'Pending').length,
    assigned: reports.filter((r) => (r.status || '') === 'Assigned').length,
    resolved: reports.filter((r) => (r.status || '') === 'Resolved').length
  }), [reports]);

  const updateStatus = (reportId: string | undefined, status: string) => {
    const next = reports.map((report, index) => {
      const id = report.id || String(index);
      return id === (reportId || '') ? { ...report, status } : report;
    });
    setReports(next);
    localStorage.setItem('rescueReports', JSON.stringify(next));
  };

  return (
    <div className="p-4 md:p-6 bg-[#f4f8f2] min-h-full">
      <div className="mb-6 rounded-lg bg-[#174f3f] text-white p-6 md:p-8 border border-white/10 shadow-lg">
        <p className="text-xs uppercase tracking-[0.16em] font-black text-[#f5b041]">Reports</p>
        <h3 className="text-3xl md:text-4xl font-black mt-2">Rescue complaint board</h3>
        <p className="text-white/70 mt-2 max-w-2xl">Review submitted rescue reports, assign action, and jump back to the live satellite board.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          ['Total Reports', counts.total],
          ['Pending', counts.pending],
          ['Assigned', counts.assigned],
          ['Resolved', counts.resolved]
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-[#dfe8e1] bg-[#fffdf8] p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[.14em] font-black text-[#6b756f]">{label}</p>
            <strong className="mt-2 block text-3xl text-[#17211d]">{value}</strong>
          </div>
        ))}
      </div>

      <section className="rounded-lg border border-[#dfe8e1] bg-[#fffdf8] p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-xl font-black text-[#17211d]">Latest rescue reports</h4>
            <p className="text-[#6b756f]">Reports submitted from the public site appear here on this device.</p>
          </div>
          <button onClick={() => window.location.href = '/#home'} className="rounded-lg bg-[#174f3f] px-4 py-2 font-black text-white">Open live board</button>
        </div>
        <div className="grid gap-3">
          {reports.map((report, index) => {
            const id = report.id || String(index);
            const status = report.status || 'Pending';
            return (
              <article key={id} className="rounded-lg border border-[#dfe8e1] bg-[#f4f8f2] p-4">
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <p className="font-black text-[#17211d]">{report.location || 'Unknown location'}</p>
                    <p className="mt-1 text-sm text-[#6b756f]">{report.condition || 'Condition not provided'}</p>
                    <p className="mt-2 text-xs font-bold text-[#6b756f]">{report.name || 'Reporter'} · {report.phone || 'No phone'} · {report.timestamp ? new Date(report.timestamp).toLocaleString() : 'New report'}</p>
                  </div>
                  <span className={`h-fit rounded-lg px-3 py-1 text-xs font-black ${status === 'Resolved' ? 'bg-[#dff3e7] text-[#174f3f]' : status === 'Assigned' ? 'bg-[#eef8fc] text-[#286c90]' : 'bg-[#fff4da] text-[#8a5b00]'}`}>{status}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => updateStatus(id, 'Assigned')} className="rounded-lg border border-[#dfe8e1] bg-white px-3 py-2 text-sm font-black text-[#174f3f]">Assign</button>
                  <button onClick={() => updateStatus(id, 'Resolved')} className="rounded-lg border border-[#bfe6cd] bg-[#dff3e7] px-3 py-2 text-sm font-black text-[#174f3f]">Resolve</button>
                  <button onClick={() => updateStatus(id, 'Pending')} className="rounded-lg border border-[#dfe8e1] bg-white px-3 py-2 text-sm font-black text-[#6b756f]">Reopen</button>
                  <button onClick={() => window.location.href = '/#home'} className="rounded-lg bg-[#174f3f] px-3 py-2 text-sm font-black text-white">View on map</button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
