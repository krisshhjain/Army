import React from 'react';

const TopNavbar = () => {
  return (
    <header className="futuristic-military-bg sticky top-0 z-50 backdrop-blur-sm">
      {/* Tech Grid Pattern */}
      <div className="tech-grid"></div>
      
      {/* Corner Military Accents */}
      <div className="corner-accent top-left"></div>
      <div className="corner-accent top-right"></div>
      <div className="corner-accent bottom-left"></div>
      <div className="corner-accent bottom-right"></div>
      
  <div className="flex items-center justify-between px-6 py-2 min-h-[56px] relative overflow-hidden">
        {/* Left Logo */}
        <div className="flex items-center text-primary-foreground ml-4">
          <img 
            src="/Carnatic-nobg.png" 
            alt="Carnatic Logo" 
            className="h-28 w-28 object-contain army-logo"
            style={{ maxWidth: 'none' }}
          />
        </div>

        {/* Center Title with Military Elements */}
  <div className="relative flex flex-col items-center justify-center flex-1 overflow-visible mt-1">
          {/* Military Decoration */}
          <div className="military-decoration"></div>

          {/* Center Title with Side Stars */}
          <div className="relative">
            {/* Left Stars */}
            <div className="military-stars">
              <span className="military-star">★</span>
              <span className="military-star">★</span>
              <span className="military-star">★</span>
            </div>

            {/* Center Title */}
            <h1 className="text-3xl font-bold text-primary-foreground military-title relative z-10">
              GOONDAS INFO CENTRE
            </h1>

            {/* Right Stars */}
            <div className="military-stars-right">
              <span className="military-star">★</span>
              <span className="military-star">★</span>
              <span className="military-star">★</span>
            </div>
          </div>          {/* Military Slogan */}
          <p className="military-slogan">
            "Veer Vel<span style={{ display: 'inline-block', width: '3em' }}></span>Vetri Vel"
          </p>

          {/* Rank Bars */}
          <div className="rank-bars">
            <div className="rank-bar"></div>
            <div className="rank-bar"></div>
            <div className="rank-bar"></div>
            <div className="rank-bar"></div>
            <div className="rank-bar"></div>
          </div>
        </div>

        {/* Madras Regiment Logo */}
        <div className="flex items-center text-primary-foreground mr-4">
          <img 
            src="/MadrasRegiment.png" 
            alt="Madras Regiment Logo" 
            className="h-28 w-28 object-contain regiment-logo"
          />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
