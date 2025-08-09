import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  Phone, 
  MapPin,
  Mail,
  Building2
} from 'lucide-react';
import PDFViewerDialog from './PDFViewerDialog';

interface CODocument {
  id: number;
  name: string;
  icon: React.ComponentType<any>;
  pdfPath?: string;
}

const coDocuments: CODocument[] = [
  { id: 1, name: 'KRAs', icon: User, pdfPath: '/pdfs/KRA.pdf' },
  { id: 2, name: 'Unit History', icon: FileText, pdfPath: '/pdfs/Med cat.pdf' },
  { id: 3, name: 'Posted Officers', icon: FileText, pdfPath: '' },
  { id: 4, name: 'Unit Officers & Postings', icon: FileText, pdfPath: '/pdfs/Promotion .pdf' },
  { id: 5, name: 'Awards & Citation', icon: FileText, pdfPath: '/pdfs/Leave Policy.pdf' },
];

const LeftSidebar = () => {
  const [selectedDocument, setSelectedDocument] = useState<CODocument | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDocumentClick = (document: CODocument) => {
    setSelectedDocument(document);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedDocument(null);
  };

  return (
    <>
      <aside className="bg-sidebar border-r border-sidebar-border w-80 min-h-screen">
        <div className="p-6">
          {/* CO Details Section */}
          <div className="mb-8">

            
            {/* CO Photo and Basic Info */}
            <div className="mb-8">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="rounded-lg w-36 h-44 overflow-hidden border-2 border-primary/30 shadow-lg bg-white mb-4">
                  <img 
                    src="/Colonel-Avinash-Kumar-Singh.jpg" 
                    alt="Colonel Avinash Kumar Singh"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-sidebar-foreground">Colonel Avinash Kumar Singh</h3>
                  <p className="text-sm font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded inline-block">Commanding Officer</p>
                </div>
              </div>
            </div>

            {/* CO Documents */}
            <div className="space-y-2">
              {coDocuments.map((document) => {
                const IconComponent = document.icon;
                return (
                  <div
                    key={document.id}
                    className="cursor-pointer group p-3 rounded-md hover:bg-sidebar-accent transition-colors border border-sidebar-border"
                    onClick={() => handleDocumentClick(document)}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-4 w-4 text-sidebar-foreground group-hover:text-sidebar-primary transition-colors flex-shrink-0" />
                      <span className="text-sidebar-foreground group-hover:text-sidebar-accent-foreground font-medium text-sm leading-tight">
                        {document.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-sidebar-foreground mb-4 border-b border-sidebar-border pb-2">
              Location Details
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-md bg-sidebar-accent/50">
                <Building2 className="h-4 w-4 text-sidebar-primary mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-sidebar-foreground">Unit Headquarters</p>
                  <p className="text-xs font-bold text-sidebar-primary">Trivandrum</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 rounded-md bg-sidebar-accent/30">
                  <Building2 className="h-4 w-4 text-sidebar-primary mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-sidebar-foreground">91 INF BDE</p>
                    <p className="text-xs font-bold text-sidebar-primary">CDR BRIG ANURAG UPADHAYA</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-md bg-sidebar-accent/30">
                  <Building2 className="h-4 w-4 text-sidebar-primary mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-sidebar-foreground">54 DIV</p>
                    <p className="text-xs font-bold text-sidebar-primary">MAJ GEN R D SHARMA</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-md bg-sidebar-accent/30">
                  <Building2 className="h-4 w-4 text-sidebar-primary mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-sidebar-foreground">21 CORPS</p>
                    <p className="text-xs font-bold text-sidebar-primary">LT GEN ANIRUDH CHAUHAN, AVSM, SM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-md bg-sidebar-accent/30">
                  <Building2 className="h-4 w-4 text-sidebar-primary mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-sidebar-foreground">SOUTHERN COMMAND</p>
                    <p className="text-xs font-bold text-sidebar-primary">LT GEN DHIRAJ SETH, PVSM, AVSM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <PDFViewerDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={selectedDocument?.name || ''}
        pdfPath={selectedDocument?.pdfPath}
      />
    </>
  );
};

export default LeftSidebar;
