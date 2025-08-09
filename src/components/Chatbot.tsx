import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, FileText, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as pdfjsLib from 'pdfjs-dist';
import Fuse from 'fuse.js';
import { createWorker } from 'tesseract.js';

// Set worker path for pdfjs - use CDN with proper fallback
const workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  pdfPath?: string;
  pdfTitle?: string;
}

interface PDFData {
  path: string;
  title: string;
  text: string;
  keywords: string[];
}

// Define PDF data with comprehensive keywords
const pdfData: PDFData[] = [
  // Welfare & Policy PDFs
  {
    path: '/pdfs/APPF.pdf',
    title: 'Personal Documents (APPF)',
    text: '',
    keywords: ['personal', 'documents', 'appf', 'records', 'documentation', 'identity', 'profile', 'army personal file', 'vyaktigat', 'dastavej', 'kagaj', 'record', 'service record', 'employment record', 'file', 'personnel file', 'individual', 'soldier file']
  },
  {
    path: '/pdfs/Leave Policy.pdf',
    title: 'Leave Policy',
    text: '',
    keywords: ['leave', 'vacation', 'time off', 'holiday', 'absence', 'annual leave', 'sick leave', 'casual leave', 'chutti', 'avkash', 'medical leave', 'maternity leave', 'paternity leave', 'emergency leave', 'extraordinary leave', 'study leave', 'sabbatical', 'furlough', 'rest', 'break']
  },
  {
    path: '/pdfs/Promotion .pdf',
    title: 'Promotion Cadres',
    text: '',
    keywords: ['promotion', 'cadre', 'rank', 'advancement', 'career progression', 'upgrade', 'hierarchy', 'utkarsh', 'teraki', 'pad', 'position', 'grade', 'seniority', 'next rank', 'promotion board', 'selection', 'merit', 'career', 'growth', 'advance']
  },
  {
    path: '/pdfs/ECHS.pdf',
    title: 'ECHS / Service',
    text: '',
    keywords: ['echs', 'medical', 'health', 'service', 'discharge', 'retirement', 'dismissal', 'healthcare', 'hospital', 'treatment', 'medicine', 'doctor', 'clinic', 'ex servicemen health scheme', 'medical facility', 'health insurance', 'medical card', 'dawai', 'ilaj', 'aspatal', 'sevanivritti', 'pension medical']
  },
  {
    path: '/pdfs/Med cat.pdf',
    title: 'Medical Category',
    text: '',
    keywords: ['medical', 'category', 'exam', 'health', 'fitness', 'medical examination', 'disability', 'compensation', 'medical board', 'fitness test', 'health check', 'medical test', 'physical', 'checkup', 'swasthya', 'pariksha', 'medical category', 'fit', 'unfit', 'permanent category', 'temporary category', 'shape1', 'shape2', 'shape3']
  },
  {
    path: '/pdfs/Pay Scale.pdf',
    title: 'Pay and Allowances',
    text: '',
    keywords: ['pay', 'salary', 'allowances', 'compensation', 'wages', 'benefits', 'scale', 'increment', 'paisa', 'tankhwah', 'vetan', 'bhatta', 'money', 'payment', 'income', 'basic pay', 'da', 'dearness allowance', 'hra', 'house rent allowance', 'medical allowance', 'transport allowance', 'field allowance', 'kit maintenance', 'washing allowance']
  },
  
  // Career after Retirement PDFs
  {
    path: '/pdfs/Introduction.pdf',
    title: 'Introduction to Post-Retirement',
    text: '',
    keywords: ['introduction', 'post retirement', 'after service', 'second career', 'civilian life', 'parichay', 'sevanivritti ke baad', 'retirement baad', 'new life', 'second innings', 'post army', 'veteran', 'ex serviceman', 'purv sainik', 'after army', 'new beginning', 'transition']
  },
  {
    path: '/pdfs/Job-Opportunities-for-Retired-Army-Personnel.pdf',
    title: 'Job Opportunities for Retired Army Personnel',
    text: '',
    keywords: ['job', 'opportunities', 'employment', 'work', 'career', 'retired', 'ex-servicemen', 'second career', 'nokri', 'kaam', 'rozgar', 'naukri', 'job vacancy', 'employment opportunity', 'work opportunity', 'post retirement job', 'veteran job', 'ex army job', 'purv sainik rozgar', 'placement', 'hiring', 'recruitment', 'opening', 'position']
  },
  {
    path: '/pdfs/Professional-Courses-for-Skill-Enhancement.pdf',
    title: 'Professional Courses for Skill Enhancement',
    text: '',
    keywords: ['courses', 'training', 'skill', 'enhancement', 'education', 'learning', 'professional development', 'course', 'training program', 'skill development', 'kaushal', 'siksha', 'padhai', 'study', 'certificate course', 'diploma', 'degree', 'upskilling', 'reskilling', 'capacity building', 'knowledge', 'coaching', 'tutorial']
  },
  {
    path: '/pdfs/Support Resources.pdf',
    title: 'Support Resources',
    text: '',
    keywords: ['support', 'resources', 'help', 'assistance', 'guidance', 'counseling', 'aid', 'sahayata', 'madad', 'support system', 'help center', 'resource center', 'guidance center', 'counseling center', 'helpline', 'assistance program', 'welfare support', 'advisory', 'consultation']
  },
  {
    path: '/pdfs/Recommendations for Welfare Enhancement.pdf',
    title: 'Recommendations for Welfare Enhancement',
    text: '',
    keywords: ['recommendations', 'welfare', 'enhancement', 'improvement', 'suggestions', 'betterment', 'sujhav', 'sudhar', 'kalyan', 'welfare improvement', 'better facilities', 'enhancement plan', 'improvement plan', 'welfare scheme', 'better service', 'facility improvement', 'service enhancement']
  },
  {
    path: '/pdfs/Conclusion.pdf',
    title: 'Conclusion',
    text: '',
    keywords: ['conclusion', 'summary', 'final', 'end', 'wrap up', 'closing', 'samapt', 'ant', 'samapan', 'final thoughts', 'ending', 'finale', 'last', 'completion', 'finish', 'close']
  },
  
  // Career for Kids PDFs
  {
    path: '/pdfs/Career-for-kids.pdf',
    title: 'Career for Kids',
    text: '',
    keywords: ['kids', 'children', 'career', 'education', 'future', 'youth', 'students', 'academic', 'bacche', 'bachpan', 'bal', 'shishu', 'child education', 'school', 'college', 'study', 'learning', 'student life', 'academic career', 'child development', 'young ones', 'teenage', 'adolescent', 'scholarship for kids', 'education for children']
  },
  
  // Left Sidebar PDFs
  {
    path: '/pdfs/KRA.pdf',
    title: 'KRAs',
    text: '',
    keywords: ['kra', 'key result areas', 'performance', 'objectives', 'goals', 'targets', 'lakshya', 'uddeshya', 'performance indicator', 'result area', 'key performance', 'achievement', 'milestone', 'evaluation', 'assessment', 'measurement', 'outcome', 'deliverable']
  },
  {
    path: '/pdfs/Posted-Officers.pdf',
    title: 'Posted Officers',
    text: '',
    keywords: ['posted', 'officers', 'posting', 'assignment', 'transfer', 'deployment', 'personnel', 'officer posting', 'transfer order', 'posting order', 'adhikari', 'seva', 'transfer posting', 'new posting', 'officer assignment', 'duty assignment', 'location posting', 'station posting', 'unit posting']
  }
];

const Chatbot: React.FC<{ onOpenPDF: (path: string, title: string) => void }> = ({ onOpenPDF }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi Thambi, Need help? 🪖 I'm Sainik Sahayak, your army document assistant! You can type or speak to me in Hindi or English.", isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pdfTexts, setPdfTexts] = useState<Map<string, string>>(new Map());
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [listeningProgress, setListeningProgress] = useState(0);
  const [voiceActivity, setVoiceActivity] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const listeningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const voiceActivityRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Fuse.js for fuzzy search
  const fuse = new Fuse(pdfData, {
    keys: ['title', 'keywords', 'text'],
    threshold: 0.4,
    includeScore: true
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechSupported(true);
      
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN'; // English (India) - will transliterate Hindi words to English alphabets
      
      recognition.onstart = () => {
        setIsListening(true);
        setListeningProgress(0);
        setVoiceActivity(false);
        
        // Start 3-second countdown
        listeningTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current) {
            recognitionRef.current.stop();
          }
        }, 3000);
        
        // Animate progress bar
        const progressInterval = setInterval(() => {
          setListeningProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + (100 / 30); // 30 updates over 3 seconds
          });
        }, 100);
        
        progressIntervalRef.current = progressInterval;
        
        // Simulate voice activity detection (random intervals when listening)
        const activityInterval = setInterval(() => {
          setVoiceActivity(prev => !prev);
        }, Math.random() * 500 + 200); // Random interval between 200-700ms
        
        voiceActivityRef.current = activityInterval;
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => prev + ' ' + transcript);
        // Trigger voice activity on actual speech
        setVoiceActivity(true);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        // Show user-friendly error message based on error type
        let errorMessage = '';
        switch (event.error) {
          case 'network':
            errorMessage = 'Speech recognition needs internet connection. Please check your connection and try again.';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please allow microphone access in your browser settings.';
            break;
          case 'no-speech':
            errorMessage = 'No speech detected. Please try speaking again.';
            break;
          case 'audio-capture':
            errorMessage = 'Microphone not found. Please check your microphone connection.';
            break;
          case 'service-not-allowed':
            errorMessage = 'Speech service not available. Please try typing instead.';
            break;
          default:
            errorMessage = 'Speech recognition failed. Please try typing your message.';
        }
        
        // Add error message to chat
        const errorBotMessage: Message = {
          id: Date.now(),
          text: `⚠️ ${errorMessage}`,
          isUser: false
        };
        setMessages(prev => [...prev, errorBotMessage]);
        
        // Clear timeout on error
        if (listeningTimeoutRef.current) {
          clearTimeout(listeningTimeoutRef.current);
          listeningTimeoutRef.current = null;
        }
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        if (voiceActivityRef.current) {
          clearInterval(voiceActivityRef.current);
          voiceActivityRef.current = null;
        }
        setVoiceActivity(false);
        setListeningProgress(0);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        setListeningProgress(0);
        setVoiceActivity(false);
        if (listeningTimeoutRef.current) {
          clearTimeout(listeningTimeoutRef.current);
          listeningTimeoutRef.current = null;
        }
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        if (voiceActivityRef.current) {
          clearInterval(voiceActivityRef.current);
          voiceActivityRef.current = null;
        }
      };
      
      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        setIsListening(false);
        
        const errorMessage: Message = {
          id: Date.now(),
          text: '⚠️ Could not start voice input. Please ensure you have internet connection and microphone access.',
          isUser: false
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      if (listeningTimeoutRef.current) {
        clearTimeout(listeningTimeoutRef.current);
        listeningTimeoutRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      if (voiceActivityRef.current) {
        clearInterval(voiceActivityRef.current);
        voiceActivityRef.current = null;
      }
      setVoiceActivity(false);
      setListeningProgress(0);
    }
  };

  // Extract text from PDF with OCR fallback for image-based PDFs
  const extractPDFText = async (pdfPath: string): Promise<string> => {
    try {
      const pdf = await pdfjsLib.getDocument(pdfPath).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        
        // If no text found, try OCR on the page
        if (pageText.trim().length < 10) {
          try {
            const viewport = page.getViewport({ scale: 2.0 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d')!;
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            await page.render({
              canvasContext: context,
              viewport: viewport,
              canvas: canvas
            }).promise;
            
            // Convert canvas to image and run OCR
            const imageData = canvas.toDataURL('image/png');
            const worker = await createWorker('eng');
            const { data: { text } } = await worker.recognize(imageData);
            await worker.terminate();
            
            fullText += text + ' ';
          } catch (ocrError) {
            console.warn(`OCR failed for page ${i} of ${pdfPath}:`, ocrError);
            fullText += pageText + ' ';
          }
        } else {
          fullText += pageText + ' ';
        }
      }
      
      return fullText.toLowerCase();
    } catch (error) {
      console.error(`Error extracting text from ${pdfPath}:`, error);
      return '';
    }
  };

  // Preload PDF texts
  useEffect(() => {
    const loadPDFTexts = async () => {
      const textMap = new Map<string, string>();
      
      for (const pdf of pdfData) {
        try {
          const text = await extractPDFText(pdf.path);
          textMap.set(pdf.path, text);
          // Update the pdfData with extracted text
          pdf.text = text;
        } catch (error) {
          console.error(`Failed to load ${pdf.path}:`, error);
        }
      }
      
      setPdfTexts(textMap);
    };

    loadPDFTexts();
  }, []);

  const normalizeText = (text: string): string => {
    // Convert common Hindi speech-to-text transliterations to English keywords
    const hindiToEnglish: { [key: string]: string } = {
      'naukri': 'job',
      'nokri': 'job',
      'kaam': 'job',
      'rozgar': 'job',
      'chutti': 'leave',
      'avkash': 'leave',
      'tankhwah': 'pay',
      'vetan': 'pay',
      'paisa': 'pay',
      'dawai': 'medical',
      'ilaj': 'medical',
      'aspatal': 'medical',
      'swasthya': 'medical',
      'bacche': 'kids',
      'bachpan': 'kids',
      'teraki': 'promotion',
      'utkarsh': 'promotion',
      'madad': 'support',
      'sahayata': 'support',
      'sevanivritti': 'retirement'
    };

    let normalizedText = text.toLowerCase();
    
    // Replace Hindi words with English equivalents
    Object.entries(hindiToEnglish).forEach(([hindi, english]) => {
      normalizedText = normalizedText.replace(new RegExp(hindi, 'gi'), english);
    });
    
    return normalizedText;
  };

  const searchPDFs = (query: string): PDFData | null => {
    const searchQuery = normalizeText(query);
    
    // First try exact keyword matching
    for (const pdf of pdfData) {
      if (pdf.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchQuery) || 
        searchQuery.includes(keyword.toLowerCase())
      )) {
        return pdf;
      }
    }
    
    // Try partial matching for compound words
    for (const pdf of pdfData) {
      const queryWords = searchQuery.split(' ');
      const hasMatch = queryWords.some(word => 
        pdf.keywords.some(keyword => 
          keyword.toLowerCase().includes(word) || 
          word.includes(keyword.toLowerCase())
        )
      );
      if (hasMatch) {
        return pdf;
      }
    }
    
    // Then try fuzzy search on titles and keywords
    const fuseResults = fuse.search(searchQuery);
    if (fuseResults.length > 0 && fuseResults[0].score! < 0.6) {
      return fuseResults[0].item;
    }
    
    // Finally search in extracted PDF text
    for (const pdf of pdfData) {
      if (pdf.text && pdf.text.includes(searchQuery)) {
        return pdf;
      }
    }
    
    return null;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Search for relevant PDF
    const foundPDF = searchPDFs(inputText);

    let botResponse: Message;

    if (foundPDF) {
      botResponse = {
        id: Date.now() + 1,
        text: `I found the perfect document for you! The "${foundPDF.title}" contains information about what you're looking for. Would you like me to open it?`,
        isUser: false,
        pdfPath: foundPDF.path,
        pdfTitle: foundPDF.title
      };
    } else {
      botResponse = {
        id: Date.now() + 1,
        text: "I couldn't find a specific document for that query. Try searching for terms like:\n• 'nokri' or 'job' for employment\n• 'chutti' or 'leave' for leave policies\n• 'promotion' or 'teraki' for career advancement\n• 'medical' or 'dawai' for health services\n• 'pay' or 'tankhwah' for salary information\n• 'kids' or 'bacche' for children's career guidance\n\nYou can also browse the modules in the main section!",
        isUser: false
      };
    }

    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 px-4 py-3 h-auto rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <span className="text-sm font-medium text-primary-foreground">Hi Thambi, Need help?</span>
          <Bot className="h-5 w-5 text-primary-foreground group-hover:scale-110 transition-transform" />
        </Button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl border border-border w-96 h-[500px] flex flex-col animate-in slide-in-from-bottom-2 duration-300 relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Sainik Sahayak</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Futuristic gradient overlay when listening */}
          {isListening && (
            <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10">
              <div 
                className={`w-full h-full transition-all duration-500 ${
                  voiceActivity ? 'opacity-90' : 'opacity-60'
                }`}
                style={{
                  background: 'linear-gradient(90deg, #FF6B35, #F7931E, #FFD23F, #06FFA5, #1FB3D3, #4285F4, #FF6B35)',
                  backgroundSize: voiceActivity ? '300% 100%' : '100% 100%',
                  animation: voiceActivity ? 'gradientShift 2s linear infinite' : 'none'
                }}
              />
              
              {/* Voice activity indicators */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex space-x-2">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-white/40 rounded-full transition-all duration-300 ${
                        voiceActivity ? 'voice-wave' : ''
                      }`}
                      style={{ 
                        height: voiceActivity 
                          ? `${Math.random() * 25 + 8}px` 
                          : '6px',
                        animationDelay: `${i * 100}ms`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Progress and status */}
              <div className="absolute bottom-2 left-4 right-4">
                <div className="text-center">
                  <span className="text-xs text-white font-medium drop-shadow-sm">
                    🎤 Listening... {Math.ceil((100 - listeningProgress) / 33)}s remaining
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  {message.pdfPath && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full"
                      onClick={() => onOpenPDF(message.pdfPath!, message.pdfTitle!)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Open Document
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about documents or speak..."
                className="flex-1"
                disabled={isLoading}
              />
              {speechSupported && (
                <Button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isLoading}
                  variant={isListening ? "default" : "outline"}
                  size="sm"
                  className={`px-3 ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              )}
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
                size="sm"
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {speechSupported && (
              <div className="mt-1 text-center">
                <span className="text-xs text-muted-foreground">
                  💡 Voice input requires internet connection
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
