
import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  GraduationCap, 
  Calendar,
  UserCheck, 
  DollarSign, 
  MapPin,
  Heart,
  Stethoscope,
  Shield,
  Smartphone,
  Lock,
  Shirt,
  Star,
  Calculator,
  FileText,
  Home,
  Baby,
  Plane,
  TrendingUp,
  Building,
  Gift
} from 'lucide-react';
import PDFViewerDialog from './PDFViewerDialog';

interface ArmyModule {
  id: number;
  name: string;
  icon: React.ComponentType<any>;
  pdfPath?: string; // Path to PDF in public folder
}

const modules: ArmyModule[] = [
  { id: 1, name: 'After Retirement Career Option', icon: Briefcase, pdfPath: '/pdfs/after-retirement-career.pdf' },
  { id: 2, name: 'Career Options', icon: TrendingUp, pdfPath: '/pdfs/career-options.pdf' },
  { id: 3, name: 'Kids Career and Scholarships', icon: GraduationCap, pdfPath: '/pdfs/kids-career-scholarships.pdf' },
  { id: 4, name: 'ACR Due Initiation Dates', icon: Calendar, pdfPath: '/pdfs/acr-due-dates.pdf' },
  { id: 5, name: 'Change of Name', icon: UserCheck, pdfPath: '/pdfs/change-of-name.pdf' },
  { id: 6, name: 'Pay Scale and Structure', icon: DollarSign, pdfPath: '/pdfs/pay-scale-structure.pdf' },
  { id: 7, name: 'Unit Officers and Posting', icon: MapPin, pdfPath: '/pdfs/unit-officers-posting.pdf' },
  { id: 8, name: 'Med Cat', icon: Heart, pdfPath: '/pdfs/med-cat.pdf' },
  { id: 9, name: 'Annual Medicals', icon: Stethoscope, pdfPath: '/pdfs/annual-medicals.pdf' },
  { id: 10, name: 'APPF', icon: Shield, pdfPath: '/pdfs/appf.pdf' },
  { id: 11, name: 'Banned Apps', icon: Smartphone, pdfPath: '/pdfs/banned-apps.pdf' },
  { id: 12, name: 'Cyber Security Policy', icon: Lock, pdfPath: '/pdfs/cyber-security-policy.pdf' },
  { id: 13, name: 'Army Uniform', icon: Shirt, pdfPath: '/pdfs/army-uniform.pdf' },
  { id: 14, name: 'Armed Forces Rank Structure', icon: Star, pdfPath: '/pdfs/rank-structure.pdf' },
  { id: 15, name: 'Income Tax Info', icon: Calculator, pdfPath: '/pdfs/income-tax-info.pdf' },
  { id: 16, name: 'Claims and Allowances', icon: FileText, pdfPath: '/pdfs/claims-allowances.pdf' },
  { id: 17, name: 'Leave Policy', icon: Calendar, pdfPath: '/pdfs/leave-policy.pdf' },
  { id: 18, name: 'Marriage Pub Documents', icon: Home, pdfPath: '/pdfs/marriage-pub-docs.pdf' },
  { id: 19, name: 'Birth Death', icon: Baby, pdfPath: '/pdfs/birth-death.pdf' },
  { id: 20, name: 'TD (Temporary Duty)', icon: Plane, pdfPath: '/pdfs/td.pdf' },
  { id: 21, name: 'Promotion', icon: TrendingUp, pdfPath: '/pdfs/promotion.pdf' },
  { id: 22, name: 'HRA', icon: Building, pdfPath: '/pdfs/hra.pdf' },
  { id: 23, name: 'AGIF', icon: Gift, pdfPath: '/pdfs/agif.pdf' },
];

const LeftSidebar = () => {
  const [selectedModule, setSelectedModule] = useState<ArmyModule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleModuleClick = (module: ArmyModule) => {
    setSelectedModule(module);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedModule(null);
  };

  return (
    <>
      <aside className="bg-sidebar border-r border-sidebar-border w-80 min-h-screen">
        <div className="p-6">
          <h2 className="text-lg font-bold text-sidebar-foreground mb-6 border-b border-sidebar-border pb-2">
            Army Modules
          </h2>
          
          <div className="relative">
            <nav className="space-y-1 max-h-[calc(100vh-120px)] overflow-y-auto sidebar-scroll pr-2">
              {modules.map((module) => {
                const IconComponent = module.icon;
                return (
                  <div
                    key={module.id}
                    className="module-item cursor-pointer group p-2 rounded-md hover:bg-sidebar-accent transition-colors"
                    onClick={() => handleModuleClick(module)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sidebar-primary font-bold text-xs bg-sidebar-primary/10 px-2 py-1 rounded-full min-w-[24px] text-center">
                        {module.id}
                      </span>
                      <IconComponent className="h-4 w-4 text-sidebar-foreground group-hover:text-sidebar-primary transition-colors flex-shrink-0" />
                      <span className="text-sidebar-foreground group-hover:text-sidebar-accent-foreground font-medium text-sm leading-tight">
                        {module.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      <PDFViewerDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={selectedModule?.name || ''}
        pdfPath={selectedModule?.pdfPath}
      />
    </>
  );
};

export default LeftSidebar;
