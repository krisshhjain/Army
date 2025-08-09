export interface PDFData {
  path: string;
  title: string;
  text: string;
  keywords: string[];
}

// Comprehensive PDF search data with keywords for all available documents
export const pdfSearchData: PDFData[] = [
  // Personal & Documentation
  {
    path: '/pdfs/PERSONAL DOCUENTATION.pdf',
    title: 'Personal Documents',
    text: '',
    keywords: ['personal documents', 'identification papers', 'individual documentation', 'identity verification', 'personal profile', 'vyaktigat dastavej', 'pahchan kagaj', 'vyakti pramaan', 'personal credentials', 'identity proof']
  },
  {
    path: '/pdfs/APPF.pdf',
    title: 'Army Personal File (APPF)',
    text: '',
    keywords: ['appf', 'army personal file', 'military records', 'service documentation', 'personnel dossier', 'service history', 'employment tracker', 'sena vyaktigat file', 'karmchari file', 'military personnel record', 'service archive']
  },
  
  // Leave & Attendance
  {
    path: '/pdfs/LEAVE.pdf',
    title: 'Leave Policy',
    text: '',
    keywords: ['leave types', 'vacation entitlement', 'time off', 'holiday schedule', 'absence management', 'annual leave', 'sick leave', 'casual leave', 'chutti', 'avkash', 'medical leave', 'maternity leave', 'paternity leave', 'emergency leave', 'extraordinary leave', 'study leave', 'sabbatical', 'furlough', 'varshik chutti', 'bimari ki chutti', 'aaksmik chutti', 'matritva avkash', 'pitritva avkash', 'aapatkalin chutti', 'adhyayan avkash']
  },
  {
    path: '/pdfs/Leave Policy.pdf',
    title: 'Leave Policy Guidelines',
    text: '',
    keywords: ['leave policy', 'leave rules', 'leave guidelines', 'leave procedure', 'leave entitlement', 'leave application', 'leave approval', 'leave balance', 'leave calculation', 'chutti niyam', 'avkash niti', 'chutti ke niyam', 'avkash dishanirdesh', 'chutti prakriya', 'chutti aavedan', 'avkash manjuri', 'chutti hisab', 'chutti balance tracking']
  },
  
  // Promotion & Career
  {
    path: '/pdfs/PROMOTION CADRE.pdf',
    title: 'Promotion Cadres',
    text: '',
    keywords: ['promotion cadre', 'rank structure', 'advancement hierarchy', 'career progression ladder', 'rank upgrade', 'military hierarchy', 'utkarsh', 'teraki', 'pad', 'position levels', 'grade system', 'seniority ladder', 'next rank', 'promotion board', 'selection criteria', 'merit system', 'padonnati', 'rank badho', 'age badhna', 'career ki tarakki', 'naya rank', 'senior ban jana', 'yogyata system']
  },
  {
    path: '/pdfs/Promotion .pdf',
    title: 'Promotion Guidelines',
    text: '',
    keywords: ['promotion rules', 'promotion criteria', 'promotion eligibility', 'promotion process', 'promotion board procedure', 'rank advancement guidelines', 'career progression rules', 'seniority system', 'merit promotion', 'promotion policy framework', 'padonnati ke niyam', 'teraki ke niyam', 'promotion ki shart', 'padonnati ki prakriya', 'rank badhane ke niyam', 'yogyata aadhar par promotion']
  },
  {
    path: '/pdfs/MACP.pdf',
    title: 'MACP (Modified Assured Career Progression)',
    text: '',
    keywords: ['macp', 'modified assured career progression', 'career advancement scheme', 'promotion scheme', 'financial upgrade', 'pay scale enhancement', 'assured progression', 'time bound promotion', 'career growth guarantee', 'financial benefits', 'nishchit career badhna', 'vetan vriddhi', 'pay scale badho', 'samay se promotion', 'arthik labh', 'career ki guarantee']
  },
  
  // Pay & Allowances
  {
    path: '/pdfs/PAY & ALLOWANCES.pdf',
    title: 'Pay and Allowances',
    text: '',
    keywords: ['salary structure', 'allowances breakdown', 'compensation package', 'wages details', 'benefits package', 'pay scale', 'increment system', 'paisa', 'tankhwah', 'vetan', 'bhatta', 'money', 'payment structure', 'income components', 'basic pay', 'da', 'dearness allowance', 'hra', 'house rent allowance', 'medical allowance', 'transport allowance', 'field allowance', 'kit maintenance', 'washing allowance', 'mulik vetan', 'mahngai bhatta', 'ghar kiraya bhatta', 'chikitsa bhatta', 'yatayat bhatta', 'field bhatta', 'kit rakhrakha', 'dhulai bhatta']
  },
  {
    path: '/pdfs/Pay Scale.pdf',
    title: 'Pay Scale Structure',
    text: '',
    keywords: ['pay scale matrix', 'salary scale chart', 'pay structure framework', 'pay matrix system', 'pay band levels', 'grade pay system', 'basic pay levels', 'pay level structure', 'pay fixation rules', 'increment matrix', 'salary structure chart', 'pay chart details', 'vetan scale', 'tankhwah ki sanrachna', 'vetan matrix', 'vetan band', 'grade vetan', 'mulik vetan', 'vetan star', 'vetan nirdhaaran', 'vridhi', 'vetan chart']
  },
  
  // Medical & Health
  {
    path: '/pdfs/MEDICAL AND CATEGORY.pdf',
    title: 'Medical Category',
    text: '',
    keywords: ['medical category assessment', 'health category', 'fitness examination', 'medical examination', 'disability assessment', 'compensation evaluation', 'medical board review', 'fitness test', 'health check protocol', 'medical test procedure', 'physical assessment', 'health checkup', 'swasthya', 'pariksha', 'medical category classification', 'fit status', 'unfit status', 'permanent category', 'temporary category', 'shape1', 'shape2', 'shape3', 'chikitsa shreni', 'sehat jach', 'swasthya jach', 'medical board', 'sharir jach', 'medical pariksha', 'swasth', 'aswasth', 'shape ek', 'shape do', 'shape tin']
  },
  {
    path: '/pdfs/Med cat.pdf',
    title: 'Medical Categories',
    text: '',
    keywords: ['medical categories system', 'med cat classification', 'fitness category grading', 'medical classification system', 'health category standards', 'medical grading system', 'fitness grading criteria', 'medical standards framework', 'health standards protocol', 'physical fitness standards', 'chikitsa shreni vyavastha', 'swasthya category system', 'fitness grading framework', 'medical standard protocol', 'sharir yogyata mapdand', 'swasthya mapdand']
  },
  {
    path: '/pdfs/ECHS.pdf',
    title: 'ECHS (Ex-Servicemen Contributory Health Scheme)',
    text: '',
    keywords: ['echs scheme', 'ex servicemen health scheme', 'medical benefits', 'healthcare facilities', 'hospital treatment', 'medicine coverage', 'doctor consultation', 'clinic facilities', 'medical facility access', 'health insurance coverage', 'medical card benefits', 'dawai coverage', 'ilaj facilities', 'aspatal treatment', 'medical benefits package', 'purv sainik swasthya yojana', 'chikitsa suvidha', 'dawakhana', 'daktar consultation', 'chikitsa card', 'swasthya bima coverage', 'medical labh']
  },
  
  // Pension & Retirement
  {
    path: '/pdfs/SERVICE PENSION.pdf',
    title: 'Service Pension',
    text: '',
    keywords: ['service pension scheme', 'pension benefits', 'retirement benefits package', 'pensionary benefits', 'monthly pension', 'gratuity payment', 'commutation', 'family pension', 'pension scheme details', 'retired pay', 'pension calculation method', 'seva pension', 'sevanivritti labh', 'masik pension', 'gratuity', 'parivarik pension', 'pension yojana', 'retirement ke baad paisa', 'pension ka hisab', 'budhapa pension']
  },
  {
    path: '/pdfs/FAMILY PENSION.pdf',
    title: 'Family Pension',
    text: '',
    keywords: ['family pension scheme', 'widow pension', 'dependent pension', 'family benefits package', 'spouse pension', 'children allowance', 'family welfare scheme', 'dependent benefits', 'survivor benefits', 'family support system', 'parivarik pension', 'vidhva pension', 'patni ko pension', 'bachon ka bhatta', 'parivar kalyan', 'ghar walo ko labh', 'parivar ki madad', 'ashrit vyakti pension']
  },
  {
    path: '/pdfs/PENSIONARY AWARDS.pdf',
    title: 'Pensionary Awards',
    text: '',
    keywords: ['pensionary awards', 'military awards', 'recognition medals', 'honor medals', 'gallantry awards', 'service medals', 'distinguished service awards', 'bravery awards', 'military honors', 'decoration awards', 'commendation medals', 'pension puraskar', 'samman', 'medal', 'veerता puraskar', 'seva medal', 'vishisht seva', 'bahaduri puraskar', 'sainik samman', 'alankaran', 'prasansa']
  },
  {
    path: '/pdfs/DISCHARGE, RETIREMENT & DISMISSAL.pdf',
    title: 'Discharge, Retirement & Dismissal',
    text: '',
    keywords: ['discharge procedure', 'retirement process', 'dismissal procedure', 'service termination', 'separation process', 'release procedure', 'sevanivritti prakriya', 'mukti', 'discharge procedure', 'retirement benefits', 'voluntary retirement', 'compulsory retirement', 'medical discharge', 'disciplinary discharge', 'seva samapti', 'naukri se chutna', 'seva mukti', 'swecchik sevanivritti', 'jabardasti retirement', 'anushashan discharge']
  },
  
  // Disability & Compensation
  {
    path: '/pdfs/DISABILITY COMPENSATION & IMPAIRMENT RELIEF.pdf',
    title: 'Disability Compensation & Impairment Relief',
    text: '',
    keywords: ['disability compensation', 'impairment relief', 'medical disability', 'war injury compensation', 'service disability', 'invalid pension', 'disability pension', 'medical board assessment', 'disability assessment', 'compensation package', 'viklaangta muaavja', 'kshati purti', 'chot lagane par paisa', 'yuddh mein ghaayal', 'seva mein viklaangta', 'apang pension', 'viklaang pension', 'medical board jach', 'viklaangta ka aanklan', 'muaavja package']
  },
  
  // Insurance & Welfare Funds
  {
    path: '/pdfs/AGIF.pdf',
    title: 'Army Group Insurance Fund (AGIF)',
    text: '',
    keywords: ['agif scheme', 'army group insurance fund', 'group insurance', 'life insurance coverage', 'insurance benefits', 'insurance claim', 'insurance policy', 'death benefits', 'insurance coverage', 'sena samoohik bima kosh', 'jeevan bima', 'samoohik bima', 'bima labh', 'bima claim', 'bima policy', 'mrityu labh', 'bima ki suraksha']
  },
  {
    path: '/pdfs/ACWF.pdf',
    title: 'Army Central Welfare Fund (ACWF)',
    text: '',
    keywords: ['acwf scheme', 'army central welfare fund', 'welfare schemes', 'financial assistance', 'welfare benefits', 'welfare fund', 'relief fund', 'assistance program', 'welfare support', 'sena kendriya kalyan kosh', 'kalyan', 'kalyan yojana', 'arthik sahayata', 'kalyan labh', 'kalyan fund', 'rahat kosh', 'sahayata karyakram', 'kalyan samarthan']
  },
  
  // Legal & Court Cases
  {
    path: '/pdfs/COURT CASE HANDLING.pdf',
    title: 'Court Case Handling',
    text: '',
    keywords: ['court case handling', 'legal proceedings', 'litigation management', 'legal proceedings', 'court martial', 'disciplinary action', 'legal assistance', 'court procedures', 'legal defense', 'tribunal proceedings', 'adjudication', 'legal support', 'adalat ka maamla', 'kanuni karyavahi', 'mukadama', 'court martial', 'anushashan karyavahi', 'kanuni sahayata', 'adalat ki prakriya', 'kanuni bachav', 'nyayaadhikarana', 'faisla', 'kanuni madad']
  },
  
  // Posting & Transfer
  {
    path: '/pdfs/POSTING AND TRANSFER.pdf',
    title: 'Posting and Transfer',
    text: '',
    keywords: ['posting orders', 'transfer policy', 'station posting', 'unit posting', 'posting order', 'movement orders', 'relocation', 'assignment', 'deployment', 'station change', 'posting guidelines', 'tabaadla', 'posting', 'station posting', 'unit posting', 'posting ka aadesh', 'transfer policy', 'jagah badalna', 'naya posting', 'duty assignment', 'naya station', 'posting ke niyam']
  },
  {
    path: '/pdfs/Posted-Officers.pdf',
    title: 'Posted Officers',
    text: '',
    keywords: ['posted officers list', 'officer postings', 'posting assignments', 'transfer orders', 'deployment orders', 'personnel movements', 'officer posting', 'transfer order', 'posting order', 'adhikari posting', 'seva assignment', 'transfer posting', 'new posting', 'officer assignment', 'duty assignment', 'location posting', 'tabaadla huye adhikari', 'naye posted officers', 'adhikari ka posting', 'transfer aadesh', 'naya duty station']
  },
  
  // Administrative
  {
    path: '/pdfs/PART 2.pdf',
    title: 'Part 2 Orders',
    text: '',
    keywords: ['part 2 orders', 'administrative orders', 'official orders', 'unit notifications', 'circulars', 'instructions', 'directives', 'announcements', 'official communication', 'unit orders', 'part do', 'aadesh', 'prashaanik aadesh', 'sarkari aadesh', 'suchna', 'paripatra', 'hidayat', 'dishanirdesh', 'ghoshna', 'sarkari sampreshan', 'unit ke aadesh']
  },
  {
    path: '/pdfs/KRA.pdf',
    title: 'KRAs (Key Result Areas)',
    text: '',
    keywords: ['kra assessment', 'key result areas', 'performance metrics', 'objectives', 'goals', 'targets', 'lakshya', 'uddeshya', 'performance indicator', 'result area', 'key performance', 'achievement', 'milestone', 'evaluation', 'assessment', 'measurement', 'outcome', 'deliverable', 'mukhya parinaam kshetra', 'kaam ka lakshya', 'laksit upalabdhi', 'kaam ki jach', 'moolyankan', 'upalabdhi ka mapdand', 'pradan kiye jane vale parinaam']
  },
  
  // Post-Retirement & Career
  {
    path: '/pdfs/RESETTLEMENT.pdf',
    title: 'Resettlement',
    text: '',
    keywords: ['resettlement program', 'post service transition', 'rehabilitation', 'second career', 'civilian transition', 'job placement', 'skill development', 'training program', 'employment assistance', 'career guidance', 'transition support', 'punarvass', 'seva ke baad', 'punarvaas', 'dusra career', 'nagrik jeevan mein jaana', 'naukri dilana', 'kaushal vikas', 'rozgar mein madad', 'career ki salah', 'badlav mein sahayata']
  },
  {
    path: '/pdfs/Introduction.pdf',
    title: 'Introduction to Post-Retirement',
    text: '',
    keywords: ['introduction guide', 'post retirement guide', 'after service guide', 'second career introduction', 'civilian life guide', 'parichay', 'sevanivritti ke baad', 'retirement baad', 'new life', 'second innings', 'post army', 'veteran guide', 'ex serviceman guide', 'purv sainik', 'after army', 'new beginning', 'transition guide', 'seva ke baad ka jeevan', 'naya jeevan', 'dusri paari', 'nagrik jeevan', 'puratan sainik', 'army ke baad', 'nai shururat']
  },
  {
    path: '/pdfs/Job-Opportunities-for-Retired-Army-Personnel.pdf',
    title: 'Job Opportunities for Retired Army Personnel',
    text: '',
    keywords: ['job opportunities', 'employment opportunities', 'work opportunities', 'career options', 'retired personnel jobs', 'ex-servicemen jobs', 'second career options', 'nokri', 'kaam', 'rozgar', 'naukri', 'job vacancy', 'employment opportunity', 'work opportunity', 'post retirement job', 'veteran job', 'ex army job', 'purv sainik rozgar', 'placement', 'hiring', 'recruitment', 'opening', 'position', 'mauke', 'kaam dhanda', 'retired army personnel ke liye naukri', 'sevanivritti ke baad rozgar', 'purv sainik ke liye kaam']
  },
  {
    path: '/pdfs/Professional-Courses-for-Skill-Enhancement.pdf',
    title: 'Professional Courses for Skill Enhancement',
    text: '',
    keywords: ['professional courses', 'skill enhancement courses', 'training courses', 'skill development programs', 'education programs', 'learning programs', 'professional development', 'course options', 'skill development', 'kaushal', 'siksha', 'padhai', 'study', 'certificate course', 'diploma', 'degree', 'upskilling', 'reskilling', 'capacity building', 'knowledge', 'coaching', 'tutorial', 'vyavasayik course', 'kaushal vikas programs', 'hunnar badhana', 'seekhna', 'gyaan', 'taleem', 'prashikshan', 'skill development vikas']
  },
  {
    path: '/pdfs/Support Resources.pdf',
    title: 'Support Resources',
    text: '',
    keywords: ['support resources', 'help resources', 'assistance resources', 'guidance resources', 'counseling services', 'aid services', 'sahayata', 'madad', 'support system', 'help center', 'resource center', 'guidance center', 'counseling center', 'helpline', 'assistance program', 'welfare support', 'advisory', 'consultation', 'sahara', 'sadhan', 'margdarshan', 'salah', 'parishad', 'help line', 'sahayata karyakram', 'kalyan sahaayata', 'salah mashvara']
  },
  {
    path: '/pdfs/Recommendations for Welfare Enhancement.pdf',
    title: 'Recommendations for Welfare Enhancement',
    text: '',
    keywords: ['welfare recommendations', 'welfare enhancement', 'improvement suggestions', 'suggestions', 'betterment', 'sujhav', 'sudhar', 'kalyan enhancement', 'welfare improvement', 'better facilities', 'enhancement plan', 'improvement plan', 'welfare scheme', 'better service', 'facility improvement', 'service enhancement', 'sifarish', 'kalyan vriddhi', 'behtar banane ke tarike', 'sudhaar ke sujhav', 'behtar suvidha', 'kalyan yojana', 'seva mein sudhar']
  },
  {
    path: '/pdfs/Conclusion.pdf',
    title: 'Conclusion',
    text: '',
    keywords: ['conclusion summary', 'summary', 'final summary', 'end summary', 'wrap up', 'closing', 'samapt', 'ant', 'samapan', 'final thoughts', 'ending', 'finale', 'last', 'completion', 'finish', 'close', 'nishkarsh', 'saransh', 'antim', 'khatam', 'samapti', 'antim vichar', 'poorna', 'band']
  },
  
  // Children & Education
  {
    path: '/pdfs/Career-for-kids.pdf',
    title: 'Career for Kids',
    text: '',
    keywords: ['kids career', 'children education', 'career for children', 'education', 'future', 'youth', 'students', 'academic', 'bacche', 'bachpan', 'bal', 'shishu', 'child education', 'school', 'college', 'study', 'learning', 'student life', 'academic career', 'child development', 'young ones', 'teenage', 'adolescent', 'scholarship for kids', 'education for children', 'bachon ka career', 'bachon ki shiksha', 'bhavishya', 'naujawan', 'vidyarthi', 'padhna likhna', 'bal vikas', 'kishori', 'scholarship', 'bachon ke liye siksha']
  },
  
  // AGNIVEER Scheme
  {
    path: '/pdfs/AGNIVEERS.pdf',
    title: 'AGNIVEER Recruitment',
    text: '',
    keywords: ['agniveer recruitment', 'agnipath scheme', 'recruitment scheme', 'new scheme', 'four year service', 'tour of duty', 'short service', 'military service', 'armed forces', 'bharti', 'recruitment process', 'selection', 'modern military', 'young warriors', 'youth recruitment', 'nayi yojana', 'char saal ki seva', 'chhoti seva', 'sainik seva', 'sena mein bharti', 'chayan prakriya', 'prashikshan', 'aadhunik sena', 'yuva yoddha', 'naujawano ki bharti']
  },
  {
    path: '/pdfs/Agniveer_Benefits_Guide.pdf',
    title: 'AGNIVEER Benefits Guide',
    text: '',
    keywords: ['agniveer benefits guide', 'agnipath benefits', 'agniveer compensation', 'agniveer salary', 'agniveer allowances', 'agniveer insurance', 'agniveer skill development', 'certification', 'post service benefits', 'seva nidhi', 'exit benefits', 'career opportunities', 'agniveer package', 'financial benefits', 'agniveer ke fayde', 'agnipath ke labh', 'muaavja', 'tankhwah', 'bhatta', 'bima', 'kaushal vikas', 'pramaan patra', 'seva ke baad ke fayde', 'arthik labh', 'prashikshan ke fayde']
  }
];

// Helper function to search PDFs
export const searchPDFsByKeyword = (keyword: string): PDFData[] => {
  const searchTerm = keyword.toLowerCase();
  return pdfSearchData.filter(pdf => 
    pdf.title.toLowerCase().includes(searchTerm) ||
    pdf.keywords.some(k => k.toLowerCase().includes(searchTerm)) ||
    pdf.text.toLowerCase().includes(searchTerm)
  );
};

// Helper function to get all PDF titles
export const getAllPDFTitles = (): string[] => {
  return pdfSearchData.map(pdf => pdf.title);
};

// Helper function to get PDF by path
export const getPDFByPath = (path: string): PDFData | undefined => {
  return pdfSearchData.find(pdf => pdf.path === path);
};
