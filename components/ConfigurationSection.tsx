import React from 'react';

interface Props {
  industry: string;
  onIndustryChange: (value: string) => void;
}

interface BenchmarkData {
  avgROI: string;
  avgConversionRate: string;
  avgLTV: string;
  avgCostPerLead: string;
}

const industries = ["Technology", "Manufacturing", "Healthcare", "Retail", "Finance", "Education", "Entertainment", "Food Services", "Automotive", "Environmnetal", "Creative", "Military"];

const benchmarkData: Record<string, BenchmarkData> = {
  Technology: {
    avgROI: "185%",
    avgConversionRate: "12%",
    avgLTV: "$8,500",
    avgCostPerLead: "$125",
  },
  Healthcare: {
    avgROI: "220%",
    avgConversionRate: "15%",
    avgLTV: "$12,000",
    avgCostPerLead: "$200",
  },
  Retail: {
    avgROI: "150%",
    avgConversionRate: "8%",
    avgLTV: "$3,500",
    avgCostPerLead: "$75",
  },
  Finance: {
    avgROI: "195%",
    avgConversionRate: "11%",
    avgLTV: "$15,000",
    avgCostPerLead: "$250",
  },
  Education: {
    avgROI: "165%",
    avgConversionRate: "10%",
    avgLTV: "$5,500",
    avgCostPerLead: "$100",
  },
};

const ConfigurationSection: React.FC<Props> = ({ industry, onIndustryChange }) => {
  const benchmarks = industry ? benchmarkData[industry] : null;

  return (
    <div className="bg-brand-medium p-6 rounded-lg shadow-xl mb-6 text-white">
      <h2 className="text-2xl font-bold text-white border-b-2 border-brand-orange pb-2 mb-6">
        Configuration
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="industry" className="block text-sm font-medium mb-2">
            Industry
          </label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => onIndustryChange(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
          >
            <option value="">Select industry...</option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        {benchmarks && (
          <div className="mt-6 pt-4 border-t border-gray-600">
            <h3 className="text-lg font-semibold mb-4 text-brand-orange">
              Industry Benchmarks: {industry}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 p-3 rounded">
                <p className="text-sm text-gray-300 mb-1">Avg. ROI</p>
                <p className="text-xl font-bold text-brand-orange">{benchmarks.avgROI}</p>
              </div>
              <div className="bg-gray-700/50 p-3 rounded">
                <p className="text-sm text-gray-300 mb-1">Avg. Conversion Rate</p>
                <p className="text-xl font-bold text-brand-orange">{benchmarks.avgConversionRate}</p>
              </div>
              <div className="bg-gray-700/50 p-3 rounded">
                <p className="text-sm text-gray-300 mb-1">Avg. Customer LTV</p>
                <p className="text-xl font-bold text-brand-orange">{benchmarks.avgLTV}</p>
              </div>
              <div className="bg-gray-700/50 p-3 rounded">
                <p className="text-sm text-gray-300 mb-1">Avg. Cost Per Lead</p>
                <p className="text-xl font-bold text-brand-orange">{benchmarks.avgCostPerLead}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationSection;

