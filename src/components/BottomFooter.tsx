
import React from 'react';
import { Globe } from 'lucide-react';

const BottomFooter = () => {
  return (
    <footer className="bg-card border-t border-border py-4 px-6 military-shadow">
      <div className="flex items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Globe className="h-4 w-4" />
          <span className="text-sm">© 2024 GOONDAS INFO CENTRE | Indian Army</span>
        </div>
      </div>
    </footer>
  );
};

export default BottomFooter;
