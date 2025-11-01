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
            <ResultsDisplay metrics={calculatedMetrics} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
