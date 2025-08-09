
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
  Home,
  Trophy,
  Banknote,
  ArrowLeft
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PDFViewerDialog from './PDFViewerDialog';

interface ArmyModule {
  id: number;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  pdfPath?: string;
  description: string;
  category: 'welfare' | 'retirement' | 'kids' | 'agniveer';
}

interface PensionOption {
  id: number;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  pdfPath: string;
  description: string;
}

const pensionOptions: PensionOption[] = [
  {
    id: 1,
    name: 'Service Pension',
    icon: Users,
    pdfPath: '/pdfs/SERVICE PENSION.pdf',
    description: 'Service pension schemes and benefits for retired personnel'
  },
  {
    id: 2,
    name: 'Family Pension',
    icon: Home,
    pdfPath: '/pdfs/FAMILY PENSION.pdf',
    description: 'Pension benefits for family members and dependents'
  },
  {
    id: 3,
    name: 'Pensionary Awards',
    icon: Trophy,
    pdfPath: '/pdfs/PENSIONARY AWARDS.pdf',
    description: 'Awards and recognition for pensioners'
  }
];

// Welfare & Policy modules (updated with correct PDFs)
const welfareModules: ArmyModule[] = [
  { 
    id: 1, 
    name: 'Personal Documents', 
    icon: User, 
    pdfPath: '/pdfs/PERSONAL DOCUENTATION.pdf',
    description: 'Manage personal records and documentation',
    category: 'welfare'
  },
  { 
    id: 2, 
    name: 'Part 2 Orders', 
    icon: FileText, 
    pdfPath: '/pdfs/PART 2.pdf',
    description: 'Administrative orders and notifications',
    category: 'welfare'
  },
  { 
    id: 3, 
    name: 'Promotion Cadres', 
    icon: TrendingUp, 
    pdfPath: '/pdfs/PROMOTION CADRE.pdf',
    description: 'Promotion policies and cadre management',
    category: 'welfare'
  },
  { 
    id: 4, 
    name: 'Discharge, Retirement and Dismissal', 
    icon: UserX, 
    pdfPath: '/pdfs/DISCHARGE, RETIREMENT & DISMISSAL.pdf',
    description: 'Service termination procedures',
    category: 'welfare'
  },
  { 
    id: 5, 
    name: 'Medical Exam and Category', 
    icon: Stethoscope, 
    pdfPath: '/pdfs/MEDICAL AND CATEGORY.pdf',
    description: 'Medical examinations and categorization',
    category: 'welfare'
  },
  { 
    id: 6, 
    name: 'Pay and Allowances', 
    icon: DollarSign, 
    pdfPath: '/pdfs/PAY & ALLOWANCES.pdf',
    description: 'Salary structure and allowances',
    category: 'welfare'
  },
  { 
    id: 9, 
    name: 'MACP', 
    icon: CreditCard, 
    pdfPath: '/pdfs/MACP.pdf',
    description: 'Modified Assured Career Progression',
    category: 'welfare'
  },
  { 
    id: 10, 
    name: 'Leave Policy', 
    icon: Calendar, 
    pdfPath: '/pdfs/LEAVE.pdf',
    description: 'Leave rules and regulations',
    category: 'welfare'
  },
  { 
    id: 11, 
    name: 'Disability, Compensation and Impairment', 
    icon: Shield, 
    pdfPath: '/pdfs/DISABILITY COMPENSATION & IMPAIRMENT RELIEF.pdf',
    description: 'Disability benefits and compensation',
    category: 'welfare'
  },
  { 
    id: 12, 
    name: 'AGIF', 
    icon: FileText, 
    pdfPath: '/pdfs/AGIF.pdf',
    description: 'Army Group Insurance Fund',
    category: 'welfare'
  },
  { 
    id: 13, 
    name: 'Court Case Handling', 
    icon: Scale, 
    pdfPath: '/pdfs/COURT CASE HANDLING.pdf',
    description: 'Legal procedures and court cases',
    category: 'welfare'
  },
  { 
    id: 14, 
    name: 'ACWF', 
    icon: HardHat, 
    pdfPath: '/pdfs/ACWF.pdf',
    description: 'Army Central Welfare Fund',
    category: 'welfare'
  },
  { 
    id: 15, 
    name: 'Resettlement', 
    icon: Home, 
    pdfPath: '/pdfs/RESETTLEMENT.pdf',
    description: 'Post-service resettlement programs',
    category: 'welfare'
  },
  { 
    id: 16, 
    name: 'Posting and Transfer', 
    icon: FileText, 
    pdfPath: '/pdfs/POSTING AND TRANSFER.pdf',
    description: 'Posting and transfer policies',
    category: 'welfare'
  },
  { 
    id: 17, 
    name: 'Pension', 
    icon: Banknote, 
    pdfPath: '', // This will open pension selection
    description: 'Pension schemes and benefits',
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

// AGNIVEER modules
const agniveerModules: ArmyModule[] = [
  {
    id: 24,
    name: 'AGNIVEER Recruitment',
    icon: Users,
    pdfPath: '/pdfs/AGNIVEERS.pdf',
    description: 'Complete guide to AGNIVEER recruitment process and eligibility',
    category: 'agniveer',
  },
  {
    id: 25,
    name: 'AGNIVEER Benefits Guide',
    icon: TrendingUp,
    pdfPath: '/pdfs/Agniveer_Benefits_Guide.pdf',
    description: 'Career benefits, opportunities and post-service guidance',
    category: 'agniveer',
  },
];

const MainContent = () => {
  const [selectedModule, setSelectedModule] = useState<ArmyModule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'welfare' | 'retirement' | 'kids' | 'agniveer'>('welfare');
  const [showPensionSelection, setShowPensionSelection] = useState(false);
  const [selectedPensionOption, setSelectedPensionOption] = useState<PensionOption | null>(null);

  const getActiveModules = () => {
    switch (activeTab) {
      case 'welfare':
        return welfareModules;
      case 'retirement':
        return retirementModules;
      case 'kids':
        return kidsModules;
      case 'agniveer':
        return agniveerModules;
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
      case 'agniveer':
        return 'AGNIVEER';
      default:
        return 'Welfare & Policy';
    }
  };

  const handleModuleClick = (module: ArmyModule) => {
    if (module.name === 'Pension') {
      setShowPensionSelection(true);
    } else {
      setSelectedModule(module);
      setIsDialogOpen(true);
    }
  };

  const handlePensionOptionClick = (option: PensionOption) => {
    setSelectedPensionOption(option);
    setSelectedModule({
      id: option.id,
      name: option.name,
      icon: option.icon,
      pdfPath: option.pdfPath,
      description: option.description,
      category: 'welfare'
    });
    setShowPensionSelection(false);
    setIsDialogOpen(true);
  };

  const handleBackToPension = () => {
    setIsDialogOpen(false);
    setSelectedModule(null);
    setSelectedPensionOption(null);
    setShowPensionSelection(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedModule(null);
    setShowPensionSelection(false);
    setSelectedPensionOption(null);
  };

  return (
    <>
      <main className="flex-1 p-6 space-y-6">



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
              <button
                onClick={() => setActiveTab('agniveer')}
                className={`px-6 py-3 text-lg font-semibold transition-all duration-300 ${
                  activeTab === 'agniveer'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Agniveer
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

      {/* Pension Selection Dialog */}
      {showPensionSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Select Pension Type</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPensionSelection(false)}
                className="h-8 w-8 p-0"
              >
                ✕
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pensionOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <div 
                    key={option.id} 
                    className="dashboard-card p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 group"
                    onClick={() => handlePensionOptionClick(option)}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                          {option.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {option.description}
                        </p>
                      </div>
                      <div className="w-full">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <PDFViewerDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={selectedModule?.name || ''}
        pdfPath={selectedModule?.pdfPath}
        showBackButton={selectedPensionOption !== null}
        onBack={handleBackToPension}
      />
    </>
  );
};

export default MainContent;
