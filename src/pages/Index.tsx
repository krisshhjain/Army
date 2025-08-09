
import React, { useState } from 'react';
import TopNavbar from '@/components/TopNavbar';
import LeftSidebar from '@/components/LeftSidebar';
import MainContent from '@/components/MainContent';
import RightSidebar from '@/components/RightSidebar';
import BottomFooter from '@/components/BottomFooter';
import Chatbot from '@/components/Chatbot';
import PDFViewerDialog from '@/components/PDFViewerDialog';

const Index = () => {
  const [chatbotPDFDialog, setChatbotPDFDialog] = useState({
    isOpen: false,
    title: '',
    pdfPath: ''
  });

  const handleChatbotOpenPDF = (pdfPath: string, title: string) => {
    setChatbotPDFDialog({
      isOpen: true,
      title,
      pdfPath
    });
  };

  const closeChatbotPDFDialog = () => {
    setChatbotPDFDialog({
      isOpen: false,
      title: '',
      pdfPath: ''
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNavbar />
      
      <div className="flex flex-1">
        <LeftSidebar />
        <MainContent />
        <RightSidebar />
      </div>
      
      <BottomFooter />
      
      {/* Chatbot */}
      <Chatbot onOpenPDF={handleChatbotOpenPDF} />
      
      {/* Chatbot PDF Dialog */}
      <PDFViewerDialog
        isOpen={chatbotPDFDialog.isOpen}
        onClose={closeChatbotPDFDialog}
        title={chatbotPDFDialog.title}
        pdfPath={chatbotPDFDialog.pdfPath}
      />
    </div>
  );
};

export default Index;
