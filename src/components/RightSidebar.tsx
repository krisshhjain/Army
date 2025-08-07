
import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlertCircle, Target, Trophy, Users, Zap, Crosshair } from 'lucide-react';

const upcomingEvents = [
  // Competitions - Div Level
  {
    category: 'Competitions - Div Level',
    events: [
      { name: 'Handball', date: 'Aug 25', icon: Users, type: 'Competition' },
      { name: 'Hockey', date: 'Sep 25 (47 Inf Bde)', icon: Target, type: 'Competition' },
      { name: 'Ex JALPRAHAR', date: '16 Sep to 25 Sep 25', icon: Zap, type: 'Exercise' },
      { name: 'Gtk Competition', date: 'Oct/Nov 25', icon: Trophy, type: 'Competition' },
      { name: 'Fd Fg Competition', date: 'Oct 2025', icon: Crosshair, type: 'Competition' },
      { name: 'Mor Competition', date: 'Oct 2025', icon: Target, type: 'Competition' },
      { name: 'MMG Fg Competition', date: 'Oct 2025', icon: Crosshair, type: 'Competition' },
      { name: 'Sniper Competition', date: 'Oct 25 (To be conducted by 2M)', icon: Target, type: 'Competition' },
      { name: 'SA Fg Competition', date: 'Dec 25', icon: Crosshair, type: 'Competition' }
    ]
  },
  // Sports Trials
  {
    category: 'Sports Trials',
    events: [
      { name: 'Boxing', date: 'Aug 25 (91 Inf Bde)', icon: Users, type: 'Sports' },
      { name: 'Athletics', date: 'Sep 25 (76 Inf Bde)', icon: Trophy, type: 'Sports' },
      { name: 'Golf', date: 'Dec 25 (7 Engr Regt)', icon: Target, type: 'Sports' }
    ]
  }
];

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'Competition': return 'text-military-red bg-red-50 border-red-200';
    case 'Exercise': return 'text-command-gold bg-yellow-50 border-yellow-200';
    case 'Sports': return 'text-military-green bg-green-50 border-green-200';
    default: return 'text-steel-blue bg-blue-50 border-blue-200';
  }
};

const RightSidebar = () => {


  return (
    <aside className="w-80 p-6 space-y-6">
      {/* Days Left Counter (Static) */}
      <div className="stats-card">
        <div className="flex items-center justify-center mb-3">
          <Clock className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">Days left for 250 : <span className="text-primary">127</span></h3>
      </div>

      {/* Upcoming Events */}
      <div className="dashboard-card p-4">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Forthcoming Imp Events
        </h3>
        
        <div className="space-y-4">
          {upcomingEvents.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-2">
              <h4 className="text-sm font-bold text-primary border-b border-border pb-1">
                {category.category}
              </h4>
              <div className="space-y-2">
                {category.events.map((event, eventIndex) => {
                  const IconComponent = event.icon;
                  const typeColorClass = getEventTypeColor(event.type);
                  return (
                    <div
                      key={eventIndex}
                      className="p-2 border border-border rounded-md hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <IconComponent className="h-3 w-3 mt-0.5 text-primary" />
                          <div>
                            <p className="font-medium text-xs text-foreground">{event.name}</p>
                            <p className="text-xs text-muted-foreground">{event.date}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded border ${typeColorClass}`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="stats-card">
          <div className="text-2xl font-bold text-primary">156</div>
          <div className="text-xs text-muted-foreground">Personnel</div>
        </div>
        <div className="stats-card">
          <div className="text-2xl font-bold text-military-green">98%</div>
          <div className="text-xs text-muted-foreground">Ready</div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
