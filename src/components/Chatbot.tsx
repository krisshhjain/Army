import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, FileText, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as pdfjsLib from 'pdfjs-dist';
import Fuse from 'fuse.js';
import { createWorker } from 'tesseract.js';
import { pdfSearchData, type PDFData } from '@/data/pdfSearchData';

// Configure PDF.js worker to avoid CORS issues
// Use local worker file from public directory
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => unknown) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => unknown) | null;
  onend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  pdfPath?: string;
  pdfTitle?: string;
  pdfOptions?: PDFData[];
  userTypeSelection?: boolean;
}

type UserType = 'serving' | 'retired' | 'agniveer' | 'family' | null;

const Chatbot: React.FC<{ onOpenPDF: (path: string, title: string) => void }> = ({ onOpenPDF }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "🪖 Namaste! I'm Sainik Sahayak, your army document assistant!\n\nTo provide you with the most relevant information, please tell me which category you belong to:", 
      isUser: false,
      userTypeSelection: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pdfTexts, setPdfTexts] = useState<Map<string, string>>(new Map());
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [listeningProgress, setListeningProgress] = useState(0);
  const [voiceActivity, setVoiceActivity] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const listeningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const voiceActivityRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Fuse.js for fuzzy search
  const fuse = new Fuse(pdfSearchData, {
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
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => prev + ' ' + transcript);
        // Trigger voice activity on actual speech
        setVoiceActivity(true);
      };
      
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
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
          .map((item) => 'str' in item ? item.str : '')
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
      
      for (const pdf of pdfSearchData) {
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

  const searchPDFs = (query: string, userType: UserType): PDFData[] => {
    const searchQuery = normalizeText(query);
    let filteredPDFs = pdfSearchData;
    
    // Filter PDFs based on user type
    if (userType) {
      filteredPDFs = pdfSearchData.filter(pdf => {
        const title = pdf.title.toLowerCase();
        const keywords = pdf.keywords.join(' ').toLowerCase();
        
        switch (userType) {
          case 'serving':
            // Prioritize current service documents
            return !title.includes('retired') && 
                   !title.includes('ex-servicemen') && 
                   !title.includes('post-retirement') &&
                   !title.includes('resettlement') &&
                   !title.includes('kids') &&
                   !title.includes('family pension') &&
                   !title.includes('widow pension');
                   
          case 'retired':
            // Prioritize retirement and post-service documents
            return title.includes('pension') ||
                   title.includes('retired') ||
                   title.includes('ex-servicemen') ||
                   title.includes('post-retirement') ||
                   title.includes('resettlement') ||
                   title.includes('echs') ||
                   title.includes('job opportunities') ||
                   title.includes('disability compensation') ||
                   keywords.includes('veteran') ||
                   keywords.includes('purv sainik');
                   
          case 'agniveer':
            // Prioritize AGNIVEER specific documents
            return title.includes('agniveer') ||
                   title.includes('agnipath') ||
                   keywords.includes('agniveer') ||
                   keywords.includes('agnipath') ||
                   // Also include general service documents relevant to AGNIVEER
                   title.includes('leave') ||
                   title.includes('pay') ||
                   title.includes('medical') ||
                   title.includes('posting');
                   
          case 'family':
            // Prioritize family-related documents
            return title.includes('family') ||
                   title.includes('kids') ||
                   title.includes('children') ||
                   title.includes('career for kids') ||
                   title.includes('widow pension') ||
                   title.includes('dependent') ||
                   title.includes('echs') ||
                   keywords.includes('bacche') ||
                   keywords.includes('parivar') ||
                   keywords.includes('family');
                   
          default:
            return true;
        }
      });
    }
    
    // Calculate weighted scores for each PDF
    const scoredPDFs: Array<{ pdf: PDFData; score: number; matchType: string }> = [];
    
    for (const pdf of filteredPDFs) {
      let score = 0;
      let matchType = '';
      
      // 1. EXACT TITLE MATCH (Highest Priority - Weight: 100)
      if (pdf.title.toLowerCase() === searchQuery) {
        score += 100;
        matchType = 'exact-title';
      }
      
      // 2. EXACT KEYWORD MATCH (High Priority - Weight: 80)
      const exactKeywordMatch = pdf.keywords.find(keyword => 
        keyword.toLowerCase() === searchQuery
      );
      if (exactKeywordMatch) {
        score += 80;
        if (!matchType) matchType = 'exact-keyword';
      }
      
      // 3. TITLE CONTAINS QUERY (High Priority - Weight: 70)
      if (pdf.title.toLowerCase().includes(searchQuery)) {
        score += 70;
        if (!matchType) matchType = 'title-contains';
      }
      
      // 4. MULTIPLE KEYWORD MATCHES (Medium-High Priority - Weight: 60)
      const keywordMatches = pdf.keywords.filter(keyword => 
        keyword.toLowerCase().includes(searchQuery) || 
        searchQuery.includes(keyword.toLowerCase())
      );
      if (keywordMatches.length > 1) {
        score += 60 + (keywordMatches.length * 5); // Bonus for multiple matches
        if (!matchType) matchType = 'multiple-keywords';
      }
      
      // 5. SINGLE KEYWORD CONTAINS QUERY (Medium Priority - Weight: 40)
      else if (keywordMatches.length === 1) {
        score += 40;
        if (!matchType) matchType = 'single-keyword';
      }
      
      // 6. QUERY CONTAINS KEYWORD (Medium Priority - Weight: 35)
      const queryContainsKeyword = pdf.keywords.find(keyword => 
        searchQuery.includes(keyword.toLowerCase())
      );
      if (queryContainsKeyword && !keywordMatches.length) {
        score += 35;
        if (!matchType) matchType = 'query-contains-keyword';
      }
      
      // 7. PARTIAL WORD MATCHES (Lower Priority - Weight: 25)
      const queryWords = searchQuery.split(' ');
      const partialMatches = queryWords.filter(word => 
        word.length > 2 && // Only consider words longer than 2 characters
        pdf.keywords.some(keyword => 
          keyword.toLowerCase().includes(word) || 
          word.includes(keyword.toLowerCase())
        )
      );
      if (partialMatches.length > 0 && score === 0) {
        score += 25 + (partialMatches.length * 3);
        if (!matchType) matchType = 'partial-words';
      }
      
      // 8. PDF TEXT CONTAINS QUERY (Lowest Priority - Weight: 15)
      if (pdf.text && pdf.text.includes(searchQuery) && score === 0) {
        score += 15;
        if (!matchType) matchType = 'text-content';
      }
      
      // 9. USER TYPE BONUS (Additional scoring based on relevance to user type)
      if (userType && score > 0) {
        const userTypeBonus = calculateUserTypeBonus(pdf, userType);
        score += userTypeBonus;
      }
      
      // Only include PDFs with a score > 0
      if (score > 0) {
        scoredPDFs.push({ pdf, score, matchType });
      }
    }
    
    // Sort by score (highest first), then by match type priority
    scoredPDFs.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      
      // If scores are equal, prioritize by match type
      const matchTypePriority = {
        'exact-title': 1,
        'exact-keyword': 2,
        'title-contains': 3,
        'multiple-keywords': 4,
        'single-keyword': 5,
        'query-contains-keyword': 6,
        'partial-words': 7,
        'text-content': 8
      };
      
      return (matchTypePriority[a.matchType as keyof typeof matchTypePriority] || 9) - 
             (matchTypePriority[b.matchType as keyof typeof matchTypePriority] || 9);
    });
    
    // Return the sorted PDFs
    return scoredPDFs.map(item => item.pdf);
  };
  
  const calculateUserTypeBonus = (pdf: PDFData, userType: UserType): number => {
    const title = pdf.title.toLowerCase();
    const keywords = pdf.keywords.join(' ').toLowerCase();
    let bonus = 0;
    
    switch (userType) {
      case 'serving':
        if (title.includes('promotion') || title.includes('pay') || title.includes('leave')) bonus += 10;
        if (title.includes('kra') || title.includes('posting')) bonus += 8;
        if (keywords.includes('serving') || keywords.includes('current service')) bonus += 5;
        break;
        
      case 'retired':
        if (title.includes('pension') || title.includes('retired')) bonus += 15;
        if (title.includes('echs') || title.includes('resettlement')) bonus += 12;
        if (title.includes('disability') || title.includes('family pension')) bonus += 10;
        if (keywords.includes('veteran') || keywords.includes('ex-servicemen')) bonus += 8;
        break;
        
      case 'agniveer':
        if (title.includes('agniveer') || title.includes('agnipath')) bonus += 20;
        if (title.includes('benefits') && keywords.includes('agniveer')) bonus += 15;
        if (title.includes('training') || title.includes('skill')) bonus += 8;
        break;
        
      case 'family':
        if (title.includes('family') || title.includes('kids')) bonus += 15;
        if (title.includes('dependent') || title.includes('children')) bonus += 12;
        if (title.includes('widow') || title.includes('scholarship')) bonus += 10;
        if (keywords.includes('parivar') || keywords.includes('bacche')) bonus += 8;
        break;
    }
    
    return bonus;
  };

  const resetChatbot = () => {
    setUserType(null);
    setMessages([
      { 
        id: 1, 
        text: "🪖 Namaste! I'm Sainik Sahayak, your army document assistant!\n\nTo provide you with the most relevant information, please tell me which category you belong to:", 
        isUser: false,
        userTypeSelection: true
      }
    ]);
    setInputText('');
    setIsLoading(false);
  };

  const handleUserTypeSelection = (selectedType: UserType) => {
    setUserType(selectedType);
    
    const userTypeMessage: Message = {
      id: Date.now(),
      text: getSelectedTypeText(selectedType),
      isUser: true
    };
    
    const welcomeMessage: Message = {
      id: Date.now() + 1,
      text: getWelcomeMessage(selectedType),
      isUser: false
    };
    
    setMessages(prev => [...prev, userTypeMessage, welcomeMessage]);
  };
  
  const getSelectedTypeText = (type: UserType): string => {
    switch (type) {
      case 'serving': return '🎖️ Serving Personnel';
      case 'retired': return '🏅 Retired Personnel';
      case 'agniveer': return '🔥 AGNIVEER';
      case 'family': return '👨‍👩‍👧‍👦 Family Member';
      default: return '';
    }
  };
  
  const getWelcomeMessage = (type: UserType): string => {
    switch (type) {
      case 'serving':
        return "Welcome, Soldier! 🎖️ I'll help you with current service documents like promotions, pay scales, leave policies, medical categories, and posting information. What do you need help with?";
      case 'retired':
        return "Welcome, Veteran! 🏅 I'll assist you with retirement benefits, pensions, ECHS, resettlement opportunities, and post-service support. How can I help you today?";
      case 'agniveer':
        return "Welcome, AGNIVEER! 🔥 I'll help you with AGNIVEER-specific benefits, training, compensation, and career opportunities. What information do you need?";
      case 'family':
        return "Welcome, Family Member! 👨‍👩‍👧‍👦 I'll help you with family-related benefits, children's career guidance, dependent allowances, and family support services. What would you like to know?";
      default:
        return "How can I help you today?";
    }
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

    // Search for relevant PDFs with user type context
    const foundPDFs = searchPDFs(inputText, userType);

    let botResponse: Message;

    if (foundPDFs.length === 1) {
      // Single PDF found
      botResponse = {
        id: Date.now() + 1,
        text: `I found the perfect document for you! The "${foundPDFs[0].title}" contains information about what you're looking for. Would you like me to open it?`,
        isUser: false,
        pdfPath: foundPDFs[0].path,
        pdfTitle: foundPDFs[0].title
      };
    } else if (foundPDFs.length > 1) {
      // Multiple PDFs found - ask for clarification with confidence indicators
      const topMatch = foundPDFs[0];
      const hasHighConfidenceMatch = foundPDFs.length > 1 && 
        (topMatch.title.toLowerCase().includes(inputText.toLowerCase()) ||
         topMatch.keywords.some(k => k.toLowerCase() === inputText.toLowerCase()));
      
      if (hasHighConfidenceMatch) {
        botResponse = {
          id: Date.now() + 1,
          text: `I found several relevant documents, with "${topMatch.title}" being the most relevant. Here are your options:`,
          isUser: false,
          pdfOptions: foundPDFs.slice(0, 5) // Limit to top 5 results
        };
      } else {
        botResponse = {
          id: Date.now() + 1,
          text: `I found multiple documents related to your query. What are you looking for specifically? Please choose from the options below:`,
          isUser: false,
          pdfOptions: foundPDFs.slice(0, 5) // Limit to top 5 results
        };
      }
    } else {
      // No PDFs found - provide contextual suggestions based on user type
      botResponse = {
        id: Date.now() + 1,
        text: getContextualSuggestions(userType),
        isUser: false
      };
    }

    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const getContextualSuggestions = (type: UserType): string => {
    switch (type) {
      case 'serving':
        return "I couldn't find a specific document for that query. As serving personnel, you might be interested in:\n• 'promotion' or 'teraki' for career advancement\n• 'pay' or 'tankhwah' for salary information\n• 'leave' or 'chutti' for leave policies\n• 'medical' for health services\n• 'posting' for transfer information\n• 'kra' for performance areas";
      case 'retired':
        return "I couldn't find a specific document for that query. As a veteran, you might need:\n• 'pension' for retirement benefits\n• 'echs' for medical services\n• 'resettlement' for post-service opportunities\n• 'job opportunities' for second career\n• 'disability compensation' for war injuries\n• 'family pension' for dependent benefits";
      case 'agniveer':
        return "I couldn't find a specific document for that query. As an AGNIVEER, you might be looking for:\n• 'agniveer benefits' for compensation details\n• 'agnipath scheme' for program information\n• 'training' for skill development\n• 'pay' or 'salary' for compensation\n• 'leave' or 'chutti' for time off policies\n• 'exit benefits' for post-service options";
      case 'family':
        return "I couldn't find a specific document for that query. For family members, you might need:\n• 'kids career' or 'children education' for guidance\n• 'family pension' for dependent benefits\n• 'echs' for family medical services\n• 'scholarship' for educational support\n• 'welfare' for family assistance programs";
      default:
        return "I couldn't find a specific document for that query. Try searching for terms like:\n• 'job' for employment\n• 'leave' for leave policies\n• 'promotion' for career advancement\n• 'medical' for health services\n• 'pay' for salary information\n• 'kids' for children's guidance";
    }
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
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">Sainik Sahayak</span>
                {userType && (
                  <span className="text-xs text-muted-foreground">
                    {getSelectedTypeText(userType)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {userType && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetChatbot}
                  className="h-8 w-8 p-0 text-xs"
                  title="Change Category"
                >
                  🔄
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  resetChatbot();
                }}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
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
                  {message.userTypeSelection && !userType && (
                    <div className="mt-3 space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start"
                        onClick={() => handleUserTypeSelection('serving')}
                      >
                        🎖️ Serving Personnel
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start"
                        onClick={() => handleUserTypeSelection('retired')}
                      >
                        🏅 Retired Personnel
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start"
                        onClick={() => handleUserTypeSelection('agniveer')}
                      >
                        🔥 AGNIVEER
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start"
                        onClick={() => handleUserTypeSelection('family')}
                      >
                        👨‍👩‍👧‍👦 Family Member
                      </Button>
                    </div>
                  )}
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
                  {message.pdfOptions && message.pdfOptions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.pdfOptions.map((pdf, index) => {
                        // Calculate match indicator based on position (top results are better matches)
                        const getMatchIndicator = (index: number) => {
                          if (index === 0) return { emoji: '🎯', text: 'Best Match', color: 'text-green-600' };
                          if (index === 1) return { emoji: '⭐', text: 'High Match', color: 'text-blue-600' };
                          if (index === 2) return { emoji: '✨', text: 'Good Match', color: 'text-purple-600' };
                          return { emoji: '📄', text: 'Related', color: 'text-gray-600' };
                        };
                        
                        const matchInfo = getMatchIndicator(index);
                        
                        return (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full text-left justify-start h-auto p-3 hover:bg-accent/50 overflow-hidden"
                            onClick={() => onOpenPDF(pdf.path, pdf.title)}
                          >
                            <div className="flex items-start gap-3 w-full min-w-0">
                              <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <div className="text-left flex-1 min-w-0 overflow-hidden">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <span className="font-medium text-xs truncate flex-1 min-w-0">{pdf.title}</span>
                                  <span className={`text-xs ${matchInfo.color} flex items-center gap-1 flex-shrink-0 whitespace-nowrap`}>
                                    {matchInfo.emoji} {matchInfo.text}
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                  Click to open this document
                                </div>
                              </div>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
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
            {userType ? (
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
            ) : (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Please select your category above to start chatting
                </p>
              </div>
            )}
            {speechSupported && userType && (
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
