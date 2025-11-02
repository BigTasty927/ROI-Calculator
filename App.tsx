import React, { useState, useMemo } from 'react';
import type { Investment, Returns, CalculatedMetrics } from './types';
import Header from './components/Header';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';
import ExhibitorInfoForm, { type ExhibitorInfo } from './components/ExhibitorInfoForm';
import ConfigurationSection from './components/ConfigurationSection';
import BenchmarkComparison, { type BenchmarkData } from './components/BenchmarkComparison';

const App: React.FC = () => {
  const [investment, setInvestment] = useState<Investment>({
    boothDesign: 25000,
    showServices: 5000,
    spaceRental: 10000,
    travel: 4000,
    staffing: 6000,
    promotions: 2000,
    marketing: 3000,
  });

  const [returns, setReturns] = useState<Returns>({
    leadsGenerated: 150,
    conversionRate: 10,
    ltv: 5000,
  });

  const [exhibitorInfo, setExhibitorInfo] = useState<ExhibitorInfo>({
    name: '',
    company: '',
    email: '',
    phone: '',
  });

  const [industry, setIndustry] = useState<string>('');

  // Benchmark data matching ConfigurationSection
  const benchmarkData: Record<string, { avgROI: string; avgConversionRate: string; avgLTV: string; avgCostPerLead: string }> = {
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

  const calculatedMetrics = useMemo<CalculatedMetrics>(() => {
    // FIX: Explicitly convert `val` to a number. `Object.values` can be inferred as returning `unknown[]`,
    // which causes cascading type errors in subsequent arithmetic operations.
    const totalInvestment = Object.values(investment).reduce((sum, val) => sum + Number(val), 0);
    const newCustomers = returns.leadsGenerated * (returns.conversionRate / 100);
    const totalLeadValue = newCustomers * returns.ltv;
    const netProfit = totalLeadValue - totalInvestment;
    const roi = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0;
    const costPerLead = returns.leadsGenerated > 0 ? totalInvestment / returns.leadsGenerated : 0;

    return {
      totalInvestment,
      newCustomers,
      totalLeadValue,
      netProfit,
      roi,
      costPerLead,
    };
  }, [investment, returns]);

  // Parse benchmark values and calculate comparison data
  const benchmarkComparison = useMemo<BenchmarkData | null>(() => {
    if (!industry || !benchmarkData[industry]) {
      return null;
    }

    const benchmarks = benchmarkData[industry];
    
    // Parse ROI: "185%" -> 185
    const roiBenchmark = parseFloat(benchmarks.avgROI.replace('%', ''));
    
    // Parse conversion rate: "12%" -> 12
    const conversionRateBenchmark = parseFloat(benchmarks.avgConversionRate.replace('%', ''));
    
    // Calculate new customers benchmark using current leads generated and benchmark conversion rate
    const newCustomersBenchmark = returns.leadsGenerated * (conversionRateBenchmark / 100);
    
    // Parse cost per lead: "$125" -> 125
    const costPerLeadBenchmark = parseFloat(benchmarks.avgCostPerLead.replace(/[$,]/g, ''));

    return {
      roi: calculatedMetrics.roi,
      roiBenchmark,
      newCustomers: calculatedMetrics.newCustomers,
      newCustomersBenchmark,
      costPerLead: calculatedMetrics.costPerLead,
      costPerLeadBenchmark,
    };
  }, [industry, returns.leadsGenerated, calculatedMetrics]);

  const downloadCSV = () => {
    const csvRows: string[] = [];
    
    // Header row
    csvRows.push('Category,Field,Value');
    
    // Investment Costs section
    csvRows.push(`Investment Costs,Booth Design & Build,${investment.boothDesign}`);
    csvRows.push(`Investment Costs,Show Services,${investment.showServices}`);
    csvRows.push(`Investment Costs,Space Rental,${investment.spaceRental}`);
    csvRows.push(`Investment Costs,Travel & Accommodation,${investment.travel}`);
    csvRows.push(`Investment Costs,Staffing,${investment.staffing}`);
    csvRows.push(`Investment Costs,Promotions & Giveaways,${investment.promotions}`);
    csvRows.push(`Investment Costs,Pre-show Marketing,${investment.marketing}`);
    csvRows.push(`Investment Costs,Total Investment,${calculatedMetrics.totalInvestment}`);
    
    // Returns section
    csvRows.push(`Projected Returns,Leads Generated,${returns.leadsGenerated}`);
    csvRows.push(`Projected Returns,Conversion Rate (%),${returns.conversionRate}`);
    csvRows.push(`Projected Returns,Customer Lifetime Value (LTV),${returns.ltv}`);
    
    // Calculated Metrics section
    csvRows.push(`Calculated Metrics,New Customers,${calculatedMetrics.newCustomers.toFixed(1)}`);
    csvRows.push(`Calculated Metrics,Total Lead Value,${calculatedMetrics.totalLeadValue.toFixed(2)}`);
    csvRows.push(`Calculated Metrics,Net Profit,${calculatedMetrics.netProfit.toFixed(2)}`);
    csvRows.push(`Calculated Metrics,ROI (%),${calculatedMetrics.roi.toFixed(2)}`);
    csvRows.push(`Calculated Metrics,Cost Per Lead,${calculatedMetrics.costPerLead.toFixed(2)}`);
    
    // Create CSV string
    const csvContent = csvRows.join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `roi-calculator-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-brand-dark font-sans text-brand-text">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ExhibitorInfoForm
          data={exhibitorInfo}
          onChange={setExhibitorInfo}
        />
        <ConfigurationSection
          industry={industry}
          onIndustryChange={setIndustry}
        />
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-1/2">
            <CalculatorForm
              investment={investment}
              setInvestment={setInvestment}
              returns={returns}
              setReturns={setReturns}
            />
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <ResultsDisplay 
              metrics={calculatedMetrics}
              onDownloadCSV={downloadCSV}
            />
            {benchmarkComparison && (
              <BenchmarkComparison
                data={benchmarkComparison}
                industry={industry}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
