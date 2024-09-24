import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface ThreatLevelChartProps {
  data: Record<string, number>;
}

const COLORS = ['#4CAF50', '#FFC107', '#FF5722', '#F44336'];

export const ThreatLevelChart: React.FC<ThreatLevelChartProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};