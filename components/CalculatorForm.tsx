import React from 'react';
import type { Investment, Returns } from '../types';
import InputSlider from './InputSlider';

interface CalculatorFormProps {
  investment: Investment;
  setInvestment: React.Dispatch<React.SetStateAction<Investment>>;
  returns: Returns;
  setReturns: React.Dispatch<React.SetStateAction<Returns>>;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  investment,
  setInvestment,
  returns,
  setReturns,
}) => {
  const handleInvestmentChange = (field: keyof Investment, value: number) => {
    setInvestment((prev) => ({ ...prev, [field]: value }));
  };

  const handleReturnChange = (field: keyof Returns, value: number) => {
    setReturns((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="bg-brand-medium p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-white border-b-2 border-brand-orange pb-2 mb-6">
          Investment Costs
        </h2>
        <div className="space-y-6">
          <InputSlider
            label="Booth Design & Build"
            value={investment.boothDesign}
            onChange={(e) => handleInvestmentChange('boothDesign', Number(e.target.value))}
            min={0}
            max={100000}
            step={1000}
            unit="$"
          />
          <InputSlider
            label="Show Services (Electricity, Rigging)"
            value={investment.showServices}
            onChange={(e) => handleInvestmentChange('showServices', Number(e.target.value))}
            min={0}
            max={20000}
            step={500}
            unit="$"
          />
          <InputSlider
            label="Space Rental"
            value={investment.spaceRental}
            onChange={(e) => handleInvestmentChange('spaceRental', Number(e.target.value))}
            min={0}
            max={50000}
            step={1000}
            unit="$"
          />
          <InputSlider
            label="Travel & Accommodation"
            value={investment.travel}
            onChange={(e) => handleInvestmentChange('travel', Number(e.target.value))}
            min={0}
            max={20000}
            step={500}
            unit="$"
          />
          <InputSlider
            label="Staffing"
            value={investment.staffing}
            onChange={(e) => handleInvestmentChange('staffing', Number(e.target.value))}
            min={0}
            max={30000}
            step={500}
            unit="$"
          />
          <InputSlider
            label="Promotions & Giveaways"
            value={investment.promotions}
            onChange={(e) => handleInvestmentChange('promotions', Number(e.target.value))}
            min={0}
            max={10000}
            step={250}
            unit="$"
          />
          <InputSlider
            label="Pre-show Marketing"
            value={investment.marketing}
            onChange={(e) => handleInvestmentChange('marketing', Number(e.target.value))}
            min={0}
            max={15000}
            step={500}
            unit="$"
          />
        </div>
      </div>

      <div className="bg-brand-medium p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-white border-b-2 border-brand-orange pb-2 mb-6">
          Projected Returns
        </h2>
        <div className="space-y-6">
          <InputSlider
            label="Leads Generated"
            value={returns.leadsGenerated}
            onChange={(e) => handleReturnChange('leadsGenerated', Number(e.target.value))}
            min={0}
            max={1000}
            step={10}
            unit=""
          />
          <InputSlider
            label="Lead Conversion Rate"
            value={returns.conversionRate}
            onChange={(e) => handleReturnChange('conversionRate', Number(e.target.value))}
            min={0}
            max={100}
            step={1}
            unit="%"
          />
          <InputSlider
            label="Avg. Customer Lifetime Value (LTV)"
            value={returns.ltv}
            onChange={(e) => handleReturnChange('ltv', Number(e.target.value))}
            min={0}
            max={50000}
            step={500}
            unit="$"
          />
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;
