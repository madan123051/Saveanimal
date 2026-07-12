import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  const colorClass = { primary: 'bg-[#eef8fc] text-[#407b9b]', secondary: 'bg-[#f1effb] text-[#676caa]', accent: 'bg-[#fff1ed] text-[#d94f45]', info: 'bg-[#eef8fc] text-[#407b9b]', success: 'bg-[#dff3e7] text-[#174f3f]', warning: 'bg-[#fff8e8] text-[#8a5d0b]', error: 'bg-[#fde5e2] text-[#8d2b25]' }[color];
  return (
    <div className="bg-[#fffdf8] rounded-lg shadow-sm p-5 flex flex-row items-center gap-4 border border-[#dfe8e1] hover:shadow-md transition">
      <div className={`w-12 h-12 rounded-lg grid place-items-center text-xl font-black ${colorClass}`}>{icon}</div>
      <div className="flex-1"><p className="text-xs text-[#6b756f] font-black uppercase tracking-[0.12em]">{title}</p><p className="text-3xl font-black text-[#17211d] leading-tight">{value}</p></div>
    </div>
  );
}
