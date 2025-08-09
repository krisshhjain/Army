
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

// Career after retirement modules (actual PDFs provided)
const retirementModules: ArmyModule[] = [
  {
    id: 15,
    name: 'Introduction',
    icon: FileText,
    pdfPath: '/pdfs/Introduction.pdf',
    description: 'Introduction to post-retirement opportunities',
    category: 'retirement',
  },
  {
    id: 16,
    name: 'Job Opportunities for Retired Army Personnel',
    icon: TrendingUp,
    pdfPath: '/pdfs/Job-Opportunities-for-Retired-Army-Personnel.pdf',
    description: 'Explore job opportunities after retirement',
    category: 'retirement',
  },
  {
    id: 17,
    name: 'Professional Courses for Skill Enhancement',
    icon: HardHat,
    pdfPath: '/pdfs/Professional-Courses-for-Skill-Enhancement.pdf',
    description: 'Courses to enhance professional skills',
    category: 'retirement',
  },
  {
    id: 18,
    name: 'Support Resources',
    icon: Users,
    pdfPath: '/pdfs/Support Resources.pdf',
    description: 'Resources and support for retired personnel',
    category: 'retirement',
  },
  {
    id: 19,
    name: 'Recommendations for Welfare Enhancement',
    icon: Scale,
    pdfPath: '/pdfs/Recommendations for Welfare Enhancement.pdf',
    description: 'Recommendations to improve welfare',
    category: 'retirement',
  },
  {
    id: 20,
    name: 'Conclusion',
    icon: FileText,
    pdfPath: '/pdfs/Conclusion.pdf',
    description: 'Summary and conclusion',
    category: 'retirement',
  },
];

// Career for kids modules (now includes actual PDF)
const kidsModules: ArmyModule[] = [
  {
    id: 23,
    name: 'Career for Kids',
    icon: FileText,
    pdfPath: '/pdfs/Career-for-kids.pdf',
    description: 'Guidance and opportunities for children of army personnel',
    category: 'kids',
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
        {/* PRAGATI Header */}
        <div className="text-center py-4 mb-4">
          <div className="relative">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
              PRAGATI
            </h1>
            <div className="absolute -top-1 -left-1 w-full h-full text-4xl font-bold text-primary/10 -z-10">
              PRAGATI
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1 font-medium">
            Guide For You
          </p>
          <div className="flex justify-center mt-2">
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 rounded-full"></div>
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
