import React from 'react';

interface BenchmarkData {
  roi: number;
  roiBenchmark: number;
  newCustomers: number;
  newCustomersBenchmark: number;
  costPerLead: number;
  costPerLeadBenchmark: number;
}

interface Props {
  data: BenchmarkData;
  industry?: string;
}

const BenchmarkComparison: React.FC<Props> = ({ data, industry }) => {
  // Determine if actual value is better than benchmark
  // For ROI and New Customers: higher is better
  // For Cost Per Lead: lower is better
  const roiIsBetter = data.roi >= data.roiBenchmark;
  const newCustomersIsBetter = data.newCustomers >= data.newCustomersBenchmark;
  const costPerLeadIsBetter = data.costPerLead <= data.costPerLeadBenchmark;

  const getColorClass = (isBetter: boolean) => {
    return isBetter ? 'text-green-400' : 'text-red-400';
  };

  const getIndicatorIcon = (isBetter: boolean) => {
    return isBetter ? (
      <span className="text-green-400 ml-2">↑</span>
    ) : (
      <span className="text-red-400 ml-2">↓</span>
    );
  };

  return (
    <div className="bg-brand-medium p-6 rounded-lg shadow-xl mb-6 text-white">
      <h2 className="text-2xl font-bold text-white border-b-2 border-brand-orange pb-2 mb-6">
        Benchmark Comparison{industry ? ` (${industry})` : ''}
      </h2>

      <div className="space-y-4">
        {/* ROI Comparison */}
        <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-brand-orange">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">ROI</span>
            <div className="flex items-center">
              <span className={`text-xl font-bold ${getColorClass(roiIsBetter)}`}>
                {data.roi.toFixed(1)}%
              </span>
              {getIndicatorIcon(roiIsBetter)}
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-600">
            <span className="text-sm text-gray-400">Industry Benchmark</span>
            <span className="text-gray-300">{data.roiBenchmark.toFixed(1)}%</span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {roiIsBetter 
              ? `✓ ${((data.roi / data.roiBenchmark - 1) * 100).toFixed(1)}% above benchmark`
              : `⚠ ${((1 - data.roi / data.roiBenchmark) * 100).toFixed(1)}% below benchmark`}
          </div>
        </div>

        {/* New Customers Comparison */}
        <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-brand-orange">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">New Customers</span>
            <div className="flex items-center">
              <span className={`text-xl font-bold ${getColorClass(newCustomersIsBetter)}`}>
                {data.newCustomers.toFixed(1)}
              </span>
              {getIndicatorIcon(newCustomersIsBetter)}
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-600">
            <span className="text-sm text-gray-400">Industry Benchmark</span>
            <span className="text-gray-300">{data.newCustomersBenchmark.toFixed(1)}</span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {newCustomersIsBetter
              ? `✓ ${((data.newCustomers / data.newCustomersBenchmark - 1) * 100).toFixed(1)}% above benchmark`
              : `⚠ ${((1 - data.newCustomers / data.newCustomersBenchmark) * 100).toFixed(1)}% below benchmark`}
          </div>
        </div>

        {/* Cost Per Lead Comparison */}
        <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-brand-orange">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">Cost Per Lead</span>
            <div className="flex items-center">
              <span className={`text-xl font-bold ${getColorClass(costPerLeadIsBetter)}`}>
                ${data.costPerLead.toFixed(2)}
              </span>
              {getIndicatorIcon(costPerLeadIsBetter)}
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-600">
            <span className="text-sm text-gray-400">Industry Benchmark</span>
            <span className="text-gray-300">${data.costPerLeadBenchmark.toFixed(2)}</span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {costPerLeadIsBetter
              ? `✓ ${((1 - data.costPerLead / data.costPerLeadBenchmark) * 100).toFixed(1)}% below benchmark`
              : `⚠ ${((data.costPerLead / data.costPerLeadBenchmark - 1) * 100).toFixed(1)}% above benchmark`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkComparison;
export type { BenchmarkData };

