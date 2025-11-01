export interface Investment {
  boothDesign: number;
  showServices: number;
  spaceRental: number;
  travel: number;
  staffing: number;
  promotions: number;
  marketing: number;
}

export interface Returns {
  leadsGenerated: number;
  conversionRate: number; // as a percentage
  ltv: number;
}

export interface CalculatedMetrics {
  totalInvestment: number;
  newCustomers: number;
  totalLeadValue: number;
  netProfit: number;
  roi: number;
  costPerLead: number;
}
