import React, { useState, useMemo } from 'react';
import type { Investment, Returns, CalculatedMetrics } from './types';
import Header from './components/Header';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';

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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
