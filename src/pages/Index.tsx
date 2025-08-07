
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import LeftSidebar from '@/components/LeftSidebar';
import MainContent from '@/components/MainContent';
import RightSidebar from '@/components/RightSidebar';
import BottomFooter from '@/components/BottomFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNavbar />
      
      <div className="flex flex-1">
        <LeftSidebar />
        <MainContent />
        <RightSidebar />
      </div>
      
      <BottomFooter />
    </div>
  );
};

export default Index;
