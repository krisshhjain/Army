
import React from 'react';
import { Search, User, Target, TrendingUp, Users, Award, MapPin, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const kpaItems = [
  {
    title: 'Operational Readiness',
    status: 'Excellent',
    percentage: 95,
    icon: Target,
    color: 'text-military-green'
  },
  {
    title: 'Training Completion',
    status: 'On Track', 
    percentage: 88,
    icon: TrendingUp,
    color: 'text-steel-blue'
  },
  {
    title: 'Personnel Strength',
    status: 'Optimal',
    percentage: 92,
    icon: Users,
    color: 'text-primary'
  },
  {
    title: 'Equipment Status',
    status: 'Good',
    percentage: 85,
    icon: Award,
    color: 'text-command-gold'
  },
  {
    title: 'Mission Readiness',
    status: 'Ready',
    percentage: 98,
    icon: MapPin,
    color: 'text-military-green'
  },
  {
    title: 'Administrative Tasks',
    status: 'Current',
    percentage: 90,
    icon: Calendar,
    color: 'text-steel-blue'
  }
];

const MainContent = () => {
  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Search Bar */}
      <div className="dashboard-card p-4">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search personnel, documents, operations..."
              className="pl-10 bg-background border-border"
            />
          </div>
          <Button className="command-button">
            Search
          </Button>
        </div>
      </div>

      {/* CO Photo Section */}
      <div className="dashboard-card p-8">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="bg-muted rounded-full w-32 h-32 flex items-center justify-center border-4 border-primary/30 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <User className="h-16 w-16 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">Commanding Officer</h3>
            <p className="text-lg text-muted-foreground">Colonel [Name]</p>
            <span className="military-badge">Active Command</span>
          </div>
        </div>
      </div>

      {/* KPA's Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Key Performance Areas (KPA's)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpaItems.map((kpa, index) => {
            const IconComponent = kpa.icon;
            return (
              <div key={index} className="kpa-item animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`h-5 w-5 ${kpa.color}`} />
                    <span className="font-semibold text-sm">{kpa.title}</span>
                  </div>
                  <span className={`text-sm font-medium ${kpa.color}`}>
                    {kpa.percentage}%
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Status</span>
                    <span className={`text-xs font-medium ${kpa.color}`}>
                      {kpa.status}
                    </span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${kpa.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
