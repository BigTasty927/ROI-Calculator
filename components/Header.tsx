import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-medium shadow-lg">
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Exhibitor <span className="text-brand-orange">ROI</span> Calculator
        </h1>
        <p className="mt-2 text-lg text-gray-300">
          Estimate the return on your trade show investment.
        </p>
      </div>
    </header>
  );
};

export default Header;
