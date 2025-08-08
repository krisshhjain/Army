
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
  category: 'welfare' | 'retirement' | 'kids';
}

// Welfare & Policy modules (current ones)
const welfareModules: ArmyModule[] = [
  { 
    id: 1, 
    name: 'Personal Documents', 
    icon: User, 
    pdfPath: '/pdfs/APPF.pdf',
    description: 'Manage personal records and documentation',
    category: 'welfare'
  },
  { 
    id: 2, 
    name: 'Part 2 Orders', 
    icon: FileText, 
    pdfPath: '/pdfs/Leave Policy.pdf',
    description: 'Administrative orders and notifications',
    category: 'welfare'
  },
  { 
    id: 3, 
    name: 'Promotion Cadres', 
    icon: TrendingUp, 
    pdfPath: '/pdfs/Promotion .pdf',
    description: 'Promotion policies and cadre management',
    category: 'welfare'
  },
  { 
    id: 4, 
    name: 'Discharge, Retirement and Dismissal', 
    icon: UserX, 
    pdfPath: '/pdfs/ECHS.pdf',
    description: 'Service termination procedures',
    category: 'welfare'
  },
  { 
    id: 5, 
    name: 'Medical Exam and Category', 
    icon: Stethoscope, 
    pdfPath: '/pdfs/Med cat.pdf',
    description: 'Medical examinations and categorization',
    category: 'welfare'
  },
  { 
    id: 6, 
    name: 'Pay and Allowances', 
    icon: DollarSign, 
    pdfPath: '/pdfs/Pay Scale.pdf',
    description: 'Salary structure and allowances',
    category: 'welfare'
  },
  { 
    id: 7, 
    name: 'MACP', 
    icon: CreditCard, 
    pdfPath: '/pdfs/APPF.pdf',
    description: 'Modified Assured Career Progression',
    category: 'welfare'
  },
  { 
    id: 8, 
    name: 'Leave Policy', 
    icon: Calendar, 
    pdfPath: '/pdfs/Leave Policy.pdf',
    description: 'Leave rules and regulations',
    category: 'welfare'
  },
  { 
    id: 9, 
    name: 'Service', 
    icon: Users, 
    pdfPath: '/pdfs/ECHS.pdf',
    description: 'Service conditions and rules',
    category: 'welfare'
  },
  { 
    id: 10, 
    name: 'Disability, Compensation and Impairment', 
    icon: Shield, 
    pdfPath: '/pdfs/Med cat.pdf',
    description: 'Disability benefits and compensation',
    category: 'welfare'
  },
  { 
    id: 11, 
    name: 'AGIF', 
    icon: FileText, 
    pdfPath: '/pdfs/APPF.pdf',
    description: 'Army Group Insurance Fund',
    category: 'welfare'
  },
  { 
    id: 12, 
    name: 'Court Case Handling', 
    icon: Scale, 
    pdfPath: '/pdfs/Leave Policy.pdf',
    description: 'Legal procedures and court cases',
    category: 'welfare'
  },
  { 
    id: 13, 
    name: 'ACWF', 
    icon: HardHat, 
    pdfPath: '/pdfs/Promotion .pdf',
    description: 'Army Central Welfare Fund',
    category: 'welfare'
  },
  { 
    id: 14, 
    name: 'Resettlement', 
    icon: Home, 
    pdfPath: '/pdfs/ECHS.pdf',
    description: 'Post-service resettlement programs',
    category: 'welfare'
  },
];

// Career after retirement modules (placeholder PDFs for now)
const retirementModules: ArmyModule[] = [
  { 
    id: 15, 
    name: 'Pension Schemes', 
    icon: DollarSign, 
    pdfPath: '/pdfs/APPF.pdf', // Update with actual PDF later
    description: 'Post-retirement pension benefits',
    category: 'retirement'
  },
  { 
    id: 16, 
    name: 'Second Career Options', 
    icon: TrendingUp, 
    pdfPath: '/pdfs/Leave Policy.pdf', // Update with actual PDF later
    description: 'Career opportunities after service',
    category: 'retirement'
  },
  { 
    id: 17, 
    name: 'Business Opportunities', 
    icon: FileText, 
    pdfPath: '/pdfs/Med cat.pdf', // Update with actual PDF later
    description: 'Entrepreneurship and business guidance',
    category: 'retirement'
  },
  { 
    id: 18, 
    name: 'Financial Planning', 
    icon: CreditCard, 
    pdfPath: '/pdfs/Promotion .pdf', // Update with actual PDF later
    description: 'Post-retirement financial management',
    category: 'retirement'
  },
];

// Career for kids modules (placeholder PDFs for now)
const kidsModules: ArmyModule[] = [
  { 
    id: 19, 
    name: 'Education Schemes', 
    icon: FileText, 
    pdfPath: '/pdfs/ECHS.pdf', // Update with actual PDF later
    description: 'Educational benefits for children',
    category: 'kids'
  },
  { 
    id: 20, 
    name: 'Scholarship Programs', 
    icon: TrendingUp, 
    pdfPath: '/pdfs/APPF.pdf', // Update with actual PDF later
    description: 'Scholarships and grants for kids',
    category: 'kids'
  },
  { 
    id: 21, 
    name: 'Career Guidance', 
    icon: Users, 
    pdfPath: '/pdfs/Leave Policy.pdf', // Update with actual PDF later
    description: 'Career counseling for army children',
    category: 'kids'
  },
  { 
    id: 22, 
    name: 'Skill Development', 
    icon: HardHat, 
    pdfPath: '/pdfs/Med cat.pdf', // Update with actual PDF later
    description: 'Skill building programs for youth',
    category: 'kids'
  },
];

const MainContent = () => {
  const [selectedModule, setSelectedModule] = useState<ArmyModule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'welfare' | 'retirement' | 'kids'>('welfare');

  const getActiveModules = () => {
    switch (activeTab) {
      case 'welfare':
        return welfareModules;
      case 'retirement':
        return retirementModules;
      case 'kids':
        return kidsModules;
      default:
        return welfareModules;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'welfare':
        return 'Welfare & Policy';
      case 'retirement':
        return 'Career after Retirement';
      case 'kids':
        return 'Career for Kids';
      default:
        return 'Welfare & Policy';
    }
  };

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
          {/* Tab Navigation */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('welfare')}
                className={`px-6 py-3 text-lg font-semibold transition-all duration-300 ${
                  activeTab === 'welfare'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Welfare & Policy
              </button>
              <button
                onClick={() => setActiveTab('retirement')}
                className={`px-6 py-3 text-lg font-semibold transition-all duration-300 ${
                  activeTab === 'retirement'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Career after Retirement
              </button>
              <button
                onClick={() => setActiveTab('kids')}
                className={`px-6 py-3 text-lg font-semibold transition-all duration-300 ${
                  activeTab === 'kids'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Career for Kids
              </button>
            </div>
          </div>

          {/* Section Title */}
          <div className="mb-6">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg tracking-widest text-center">
              {getTabTitle()}
            </h2>
            <div className="mx-auto mt-2 h-2 w-40 rounded-full bg-gradient-to-r from-primary via-accent to-primary shadow-lg" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {getActiveModules().map((module, index) => {
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
