import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-medium mt-12 py-4">
      <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
        <p>
          Powered by expert insights. Ready to build an amazing booth? 
          <a 
            href="https://21stceg.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-brand-orange hover:underline ml-1"
          >
            Contact Sales at https://21stceg.net/pamela-alexander
          </a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
