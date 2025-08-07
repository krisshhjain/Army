import React from 'react';

const TopNavbar = () => {
  return (
    <header className="bg-primary border-b border-border/30 military-shadow sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4 min-h-[72px]">
        {/* Indian Army Logo */}
        <div className="flex items-center text-primary-foreground">
          <img 
            src="/Army_Logo.png" 
            alt="Indian Army Logo" 
            className="h-20 w-20 object-contain army-logo"
          />
        </div>

        {/* Center Title */}
        <h1 className="text-3xl font-bold text-primary-foreground">
          GOONDAS INFO CENTRE
        </h1>

        {/* Madras Regiment Logo */}
        <div className="flex items-center text-primary-foreground">
          <img 
            src="/MadrasRegiment.png" 
            alt="Madras Regiment Logo" 
            className="h-20 w-20 object-contain regiment-logo"
          />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
