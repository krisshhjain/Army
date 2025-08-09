
import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlertCircle, Target, Trophy, Users, Zap, Crosshair, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import PDFViewerDialog from './PDFViewerDialog';

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
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // PDF paths for each day - you can update these later
  const dayPDFs = {
    1: '/pdfs/APPF.pdf', // Day 1 PDF path
    2: '/pdfs/ECHS.pdf', // Day 2 PDF path  
    3: '/pdfs/Leave Policy.pdf', // Day 3 PDF path
    4: '/pdfs/Med cat.pdf' // Day 4 PDF path
  };

  // Slideshow images - you can add your images here later
  const slideshowImages = [
    '/placeholder.svg', // Placeholder image 1
    '/placeholder.svg', // Placeholder image 2
    '/placeholder.svg', // Placeholder image 3
    '/placeholder.svg', // Placeholder image 4
  ];

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedDay(null);
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  // Auto-advance slideshow every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <aside className="w-80 p-6 space-y-6">
      {/* 250 Days Image */}
      <div className="dashboard-card p-2 flex items-center justify-center">
        <img 
          src="/250.jpg" 
          alt="250 Days"
          className="w-full h-auto rounded-lg shadow-lg"
          style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '180px', objectFit: 'fill' }}
        />
      </div>

      {/* Schedule of Events */}
      <div className="dashboard-card p-4 mb-4">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Schedule of Events
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-2">
          {[1,2,3,4].map(day => (
            <button
              key={day}
              className="flex items-center justify-center p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group w-full"
              onClick={() => handleDayClick(day)}
            >
              <span className="text-sm font-medium">Day {day}</span>
            </button>
          ))}
        </div>
        {/* Leave code space for PDF paths to be added later */}
      </div>

      {/* Image Slideshow Section */}
      <div className="dashboard-card p-4">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          Gallery
        </h3>
        
        <div className="relative">
          <div className="relative overflow-hidden rounded-lg shadow-lg bg-muted/20">
            <img 
              src={slideshowImages[currentSlideIndex]} 
              alt={`Gallery image ${currentSlideIndex + 1}`}
              className="w-full h-48 object-cover transition-all duration-500"
            />
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          {/* Slide Indicators */}
          <div className="flex justify-center mt-3 space-x-2">
            {slideshowImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlideIndex === index ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

  {/* Unit Details Section */}
  <div className="dashboard-card p-5">
    <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2 border-b border-border pb-2">
      <AlertCircle className="h-5 w-5 text-primary" />
      Unit Details
    </h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
        <span className="font-semibold text-foreground">Ph no.:</span>
        <span className="text-primary font-medium">9911377908</span>
      </div>
      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
        <span className="font-semibold text-foreground">Email:</span>
        <span className="text-primary font-medium text-sm">Goondas1776@gmail.com</span>
      </div>
      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
        <span className="font-semibold text-foreground">Pincode:</span>
        <span className="text-primary font-medium">695012</span>
      </div>
      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
        <span className="font-semibold text-foreground">Exchange:</span>
        <span className="text-primary font-medium text-sm">Internal communication</span>
      </div>
      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
        <span className="font-semibold text-foreground">Imp no.:</span>
        <span className="text-primary font-medium">9541256129</span>
      </div>
    </div>
  </div>
    </aside>

    <PDFViewerDialog
      isOpen={isDialogOpen}
      onClose={closeDialog}
      title={selectedDay ? `Day ${selectedDay} Schedule` : ''}
      pdfPath={selectedDay ? dayPDFs[selectedDay as keyof typeof dayPDFs] : undefined}
    />
    </>
  );
};

export default RightSidebar;
