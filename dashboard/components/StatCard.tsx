import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  const colorClass = { primary: 'border-l-4 border-blue-500', secondary: 'border-l-4 border-purple-500', accent: 'border-l-4 border-pink-500', info: 'border-l-4 border-cyan-500', success: 'border-l-4 border-green-500', warning: 'border-l-4 border-yellow-500', error: 'border-l-4 border-red-500' }[color];
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 flex flex-row items-center gap-4 ${colorClass} hover:shadow-md transition`}>
      <div className="text-4xl">{icon}</div>
      <div className="flex-1"><p className="text-sm text-gray-500 font-semibold uppercase">{title}</p><p className="text-3xl font-bold text-gray-800">{value}</p></div>
    </div>
  );
}