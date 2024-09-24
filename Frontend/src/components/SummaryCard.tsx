import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: React.ReactNode;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, subtext, icon }) => (
  <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-base md:text-lg font-semibold text-purple-300">{title}</h3>
      {icon}
    </div>
    <p className="text-2xl md:text-3xl font-bold text-gray-100">{value}</p>
    {subtext && <p className="text-xs md:text-sm text-gray-400 mt-1">{subtext}</p>}
  </div>
);