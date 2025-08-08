
import React, { useState } from 'react';
import { 
  Search, 
  User, 
  FileText, 
  TrendingUp, 
  UserX, 
  Stethoscope, 
  DollarSign, 
  CreditCard, 
  Calendar, 
  Users, 
  Shield, 
  Scale, 
  HardHat, 
  Home
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PDFViewerDialog from './PDFViewerDialog';

interface ArmyModule {
  id: number;
  name: string;
  icon: React.ComponentType<any>;
  pdfPath?: string;
  description: string;
}

const modules: ArmyModule[] = [
  { 
    id: 1, 
    name: 'Personal Documents', 
    icon: User, 
    pdfPath: '/pdfs/APPF.pdf',
    description: 'Manage personal records and documentation'
  },
  { 
    id: 2, 
    name: 'Part 2 Orders', 
    icon: FileText, 
    pdfPath: '/pdfs/Leave Policy.pdf',
    description: 'Administrative orders and notifications'
  },
  { 
    id: 3, 
    name: 'Promotion Cadres', 
    icon: TrendingUp, 
    pdfPath: '/pdfs/Promotion .pdf',
    description: 'Promotion policies and cadre management'
  },
  { 
    id: 4, 
    name: 'Discharge, Retirement and Dismissal', 
    icon: UserX, 
    pdfPath: '/pdfs/ECHS.pdf',
    description: 'Service termination procedures'
  },
  { 
    id: 5, 
    name: 'Medical Exam and Category', 
    icon: Stethoscope, 
    pdfPath: '/pdfs/Med cat.pdf',
    description: 'Medical examinations and categorization'
  },
  { 
    id: 6, 
    name: 'Pay and Allowances', 
    icon: DollarSign, 
    pdfPath: '/pdfs/Pay Scale.pdf',
    description: 'Salary structure and allowances'
  },
  { 
    id: 7, 
    name: 'MACP', 
    icon: CreditCard, 
    pdfPath: '/pdfs/APPF.pdf',
    description: 'Modified Assured Career Progression'
  },
  { 
    id: 8, 
    name: 'Leave Policy', 
    icon: Calendar, 
    pdfPath: '/pdfs/Leave Policy.pdf',
    description: 'Leave rules and regulations'
  },
  { 
    id: 9, 
    name: 'Service', 
    icon: Users, 
    pdfPath: '/pdfs/ECHS.pdf',
    description: 'Service conditions and rules'
  },
  { 
    id: 10, 
    name: 'Disability, Compensation and Impairment', 
    icon: Shield, 
    pdfPath: '/pdfs/Med cat.pdf',
    description: 'Disability benefits and compensation'
  },
  { 
    id: 11, 
    name: 'AGIF', 
    icon: FileText, 
    pdfPath: '/pdfs/APPF.pdf',
    description: 'Army Group Insurance Fund'
  },
  { 
    id: 12, 
    name: 'Court Case Handling', 
    icon: Scale, 
    pdfPath: '/pdfs/Leave Policy.pdf',
    description: 'Legal procedures and court cases'
  },
  { 
    id: 13, 
    name: 'ACWF', 
    icon: HardHat, 
    pdfPath: '/pdfs/Promotion .pdf',
    description: 'Army Central Welfare Fund'
  },
  { 
    id: 14, 
    name: 'Resettlement', 
    icon: Home, 
    pdfPath: '/pdfs/ECHS.pdf',
    description: 'Post-service resettlement programs'
  },
];

const MainContent = () => {
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
      <main className="flex-1 p-6 space-y-6">
        {/* Search Bar */}
        <div className="dashboard-card p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search modules, documents, personnel..."
                className="pl-10 bg-background border-border"
              />
            </div>
            <Button className="command-button">
              Search
            </Button>
          </div>
        </div>

        {/* Army Modules Section */}
        <div className="space-y-4">
          <div className="mb-6">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg tracking-widest text-center">
              Welfare & Policy
            </h2>
            <div className="mx-auto mt-2 h-2 w-40 rounded-full bg-gradient-to-r from-primary via-accent to-primary shadow-lg" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {modules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <div 
                  key={module.id} 
                  className="dashboard-card p-3 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 group"
                  onClick={() => handleModuleClick(module)}
                  style={{animationDelay: `${index * 50}ms`}}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                        {module.name}
                      </h3>
                    </div>
                    <div className="w-full">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        Open Module
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <PDFViewerDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={selectedModule?.name || ''}
        pdfPath={selectedModule?.pdfPath}
      />
    </>
  );
};

export default MainContent;
