
import React, { useState, useEffect } from 'react';
import { Eye, Users, Globe } from 'lucide-react';

const BottomFooter = () => {
  const [visitorCount, setVisitorCount] = useState(1247);

  useEffect(() => {
    // Simulate visitor count updates
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-card border-t border-border py-4 px-6 military-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span className="text-sm">Total Visitors: </span>
            <span className="font-bold text-primary">{visitorCount.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-sm">Online: </span>
            <span className="font-bold text-military-green">12</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <Globe className="h-4 w-4" />
          <span className="text-sm">© 2024 GOONDAS INFO CENTRE | Indian Army</span>
        </div>
      </div>
    </footer>
  );
};

export default BottomFooter;
