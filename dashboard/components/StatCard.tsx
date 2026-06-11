import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  const colorClass = {
    primary: 'border-l-primary',
    secondary: 'border-l-secondary',
    accent: 'border-l-accent',
    info: 'border-l-info',
    success: 'border-l-success',
    warning: 'border-l-warning',
    error: 'border-l-error'
  }[color];

  return (
    <div className={`card bg-base-100 border-l-4 ${colorClass} shadow-sm hover:shadow-md transition`}>
      <div className="card-body p-4 flex flex-row items-center gap-4">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <p className="text-sm text-base-content/60 font-semibold uppercase">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};
