import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CalculatedMetrics } from '../types';
import DollarSignIcon from './icons/DollarSignIcon';
import UsersIcon from './icons/UsersIcon';
import TrendingUpIcon from './icons/TrendingUpIcon';

interface ResultsDisplayProps {
  metrics: CalculatedMetrics;
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-brand-light p-4 rounded-lg flex items-center">
    <div className="p-3 rounded-full bg-brand-orange/20 text-brand-orange mr-4">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ metrics }) => {
  const { totalInvestment, totalLeadValue, netProfit, roi, newCustomers, costPerLead } = metrics;

  const chartData = [
    { name: 'Metrics', Investment: totalInvestment, Revenue: totalLeadValue, Profit: netProfit < 0 ? 0 : netProfit },
  ];
  
  const formattedROI = isFinite(roi) ? roi.toFixed(1) : '0.0';

  return (
    <div className="bg-brand-medium p-6 rounded-lg shadow-xl sticky top-8">
      <h2 className="text-2xl font-bold text-white border-b-2 border-brand-orange pb-2 mb-6">
        Results
      </h2>
      
      <div className="text-center bg-brand-light rounded-lg p-6 mb-6">
        <p className="text-lg text-gray-300">Potential Return on Investment (ROI)</p>
        <p className={`text-7xl font-bold my-2 ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {formattedROI}%
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <StatCard 
          title="Total Investment" 
          value={`$${totalInvestment.toLocaleString()}`} 
          icon={<DollarSignIcon />} 
        />
        <StatCard 
          title="Total Lead Value" 
          value={`$${totalLeadValue.toLocaleString()}`}
          icon={<TrendingUpIcon />} 
        />
        <StatCard 
          title="Net Profit" 
          value={`${netProfit < 0 ? '-' : ''}$${Math.abs(netProfit).toLocaleString()}`} 
          icon={<DollarSignIcon />} 
        />
        <StatCard 
          title="New Customers" 
          value={newCustomers.toFixed(1)} 
          icon={<UsersIcon />} 
        />
        <StatCard 
          title="Cost Per Lead" 
          value={`$${costPerLead.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<DollarSignIcon />} 
        />
      </div>

      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" tick={{ fill: '#D1D5DB' }} />
            <YAxis tickFormatter={(value) => `$${Number(value).toLocaleString()}`} tick={{ fill: '#D1D5DB' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                borderColor: '#374151',
                color: '#E5E7EB'
              }}
              formatter={(value) => `$${Number(value).toLocaleString()}`}
            />
            <Legend wrapperStyle={{ color: '#E5E7EB' }} />
            <Bar dataKey="Investment" fill="#EF4444" />
            <Bar dataKey="Revenue" fill="#22C55E" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultsDisplay;
