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
      
  <div className="flex items-center justify-between px-6 py-3 min-h-[72px] relative overflow-hidden">
        {/* Left Logo */}
        <div className="flex items-center text-primary-foreground ml-4">
          <img 
            src="/Carnatic-nobg.png" 
            alt="Carnatic Logo" 
            className="h-32 w-32 object-contain army-logo"
            style={{ maxWidth: 'none' }}
          />
        </div>

        {/* Center Title with Military Elements */}
        <div className="relative flex flex-col items-center justify-center flex-1 overflow-visible -mt-2">
          {/* Military Decoration */}
          <div className="military-decoration"></div>

          {/* Entire content block with stars on left and right */}
          <div className="relative">
            {/* Left Stars - positioned for entire block */}
            <div className="absolute top-1/2 left-[-80px] transform -translate-y-1/2 flex flex-col gap-1 z-10">
              <span className="text-yellow-400 text-lg animate-pulse">★</span>
              <span className="text-yellow-400 text-lg animate-pulse" style={{animationDelay: '0.7s'}}>★</span>
              <span className="text-yellow-400 text-lg animate-pulse" style={{animationDelay: '1.4s'}}>★</span>
            </div>

            {/* Right Stars - positioned for entire block */}
            <div className="absolute top-1/2 right-[-80px] transform -translate-y-1/2 flex flex-col gap-1 z-10">
              <span className="text-yellow-400 text-lg animate-pulse" style={{animationDelay: '0.3s'}}>★</span>
              <span className="text-yellow-400 text-lg animate-pulse" style={{animationDelay: '1s'}}>★</span>
              <span className="text-yellow-400 text-lg animate-pulse" style={{animationDelay: '1.7s'}}>★</span>
            </div>

            {/* All content centered */}
            <div className="flex flex-col items-center">
              {/* Center Title */}
              <h1 className="text-3xl font-serif text-primary-foreground military-title relative z-10 mb-1" style={{letterSpacing: '0.5em'}}>
                P.R.A.G.A.T.I.
              </h1>
              
              {/* Professional Resources Subtitle */}
              <p className="text-base text-yellow-200 font-semibold tracking-wider mb-1 px-4 text-center leading-tight">
                Professional Resources & Guidance for GOONDA'S Training & Information
              </p>
              
              {/* Military Slogan */}
              <p className="military-slogan text-lg" style={{wordSpacing: '0.5em'}}>
                "Veer Vel Vetri Vel"
              </p>
            </div>
          </div>

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
        <div className="flex items-center text-primary-foreground mr-9">
          <img 
            src="/Mr.png" 
            alt="Madras Regiment Logo" 
            className="h-36 w-36 object-contain regiment-logo"
          />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
