import { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  Award, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  RotateCcw, 
  Check, 
  X, 
  ChevronRight, 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  User, 
  Download, 
  Cloud, 
  CloudOff, 
  Database, 
  BrainCircuit, 
  Flag, 
  ChevronLeft, 
  ThumbsUp,
  Flame,
  FileCheck2,
  Bookmark
} from 'lucide-react';

import { 
  VETERINARY_CURRICULUM, 
  VETERINARY_QUIZZES, 
  INTERACTIVE_CASE_STUDIES, 
  MOCK_EXAM_QUESTIONS,
  Semester,
  Subject,
  Chapter,
  QuizQuestion,
  CaseStudy
} from './data/veterinaryData';

// Badges definition
interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
  unlocked: boolean;
}

const INITIAL_BADGES: Badge[] = [
  { id: 'first_steps', title: 'First Steps', description: 'Read your first chapter notes', icon: '🌱', condition: 'Mark 1 chapter completed', unlocked: false },
  { id: 'clinical_novice', title: 'Clinical Novice', description: 'Complete 1 veterinary case study', icon: '🐾', condition: 'Solve 1 case study', unlocked: false },
  { id: 'pharma_master', title: 'Pharma Specialist', description: 'Perfect score in any subject quiz', icon: '💊', condition: 'Get 5/5 in any quiz', unlocked: false },
  { id: 'exam_warrior', title: 'Exam Warrior', description: 'Complete a full length Mock Examination', icon: '📝', condition: 'Submit a Mock Exam', unlocked: false },
  { id: 'ai_explorer', title: 'Dhanvantari Seeker', description: 'Use AI Search to research veterinary science', icon: '✨', condition: 'Perform 1 AI Search', unlocked: false },
  { id: 'offline_ready', title: 'Offline Ready', description: 'Activate offline revision download for a semester', icon: '💾', condition: 'Download any subject for offline use', unlocked: false }
];

// Helper to render Markdown strings to JSX Elements
const renderMarkdownToElements = (text: string) => {
  if (!text) return null;
  
  const blocks = text.split('\n\n').filter(b => b.trim() !== '');
  
  return (
    <div className="space-y-5">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        
        // Headers Level 1
        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={idx} className="text-xl font-black text-slate-900 pt-6 pb-2 border-b-2 border-emerald-100 flex items-center space-x-2">
              <span className="w-2.5 h-6 bg-emerald-600 rounded-md inline-block"></span>
              <span>{trimmed.substring(2)}</span>
            </h1>
          );
        }
        
        // Headers Level 2
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-lg font-extrabold text-slate-900 pt-5 pb-1 flex items-center space-x-2">
              <span className="w-1.5 h-4 bg-teal-500 rounded-sm inline-block"></span>
              <span>{trimmed.substring(3)}</span>
            </h2>
          );
        }
        
        // Headers Level 3
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-sm font-bold text-slate-850 pt-4 pb-0.5 uppercase tracking-wide">
              {trimmed.substring(4)}
            </h3>
          );
        }
        
        // Tables
        if (trimmed.includes('|')) {
          const lines = trimmed.split('\n').filter(l => l.trim() !== '');
          const isHeaderSep = lines[1]?.includes('---') || lines[1]?.includes('-|');
          
          return (
            <div key={idx} className="overflow-x-auto my-4 border border-slate-200 rounded-2xl shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    {lines[0].split('|').map((col, cIdx) => {
                      const textVal = col.trim();
                      if (cIdx === 0 && !textVal) return null;
                      if (cIdx === lines[0].split('|').length - 1 && !textVal) return null;
                      return (
                        <th key={cIdx} className="p-3 font-extrabold text-slate-800">{textVal}</th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {lines.slice(isHeaderSep ? 2 : 1).map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-100 hover:bg-slate-50/50">
                      {row.split('|').map((col, cIdx) => {
                        const textVal = col.trim();
                        if (cIdx === 0 && !textVal) return null;
                        if (cIdx === row.split('|').length - 1 && !textVal) return null;
                        return (
                          <td key={cIdx} className="p-3 text-slate-700 font-semibold">{textVal}</td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        
        // Bullet list
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1.5 text-slate-700">
              {trimmed.split('\n').map((bullet, bIdx) => {
                const bulletText = bullet.replace(/^[*-\s]+/, '');
                return (
                  <li key={bIdx} className="text-xs sm:text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: bulletText
                          .replace(/\*\_(.*?)\_\*/g, '<strong class="font-extrabold text-slate-900">$1</strong>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-slate-900">$1</strong>')
                          .replace(/_([^_]+)_/g, '<em class="italic">$1</em>')
                      }}
                  />
                );
              })}
            </ul>
          );
        }
        
        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          return (
            <ol key={idx} className="list-decimal pl-5 space-y-1.5 text-slate-700">
              {trimmed.split('\n').map((item, iIdx) => {
                const itemText = item.replace(/^\d+\.\s+/, '');
                return (
                  <li key={iIdx} className="text-xs sm:text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: itemText
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-slate-900">$1</strong>')
                          .replace(/_([^_]+)_/g, '<em class="italic">$1</em>')
                      }}
                  />
                );
              })}
            </ol>
          );
        }
        
        // Default Paragraph
        return (
          <p key={idx} className="text-slate-750 text-xs sm:text-sm leading-relaxed"
             dangerouslySetInnerHTML={{
               __html: trimmed
                 .replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-slate-900">$1</strong>')
                 .replace(/_([^_]+)_/g, '<em class="italic">$1</em>')
             }}
          />
        );
      })}
    </div>
  );
};

export default function App() {
  // Navigation tabs: 'curriculum' | 'ai-search' | 'cases' | 'exams' | 'dashboard'
  const [activeTab, setActiveTab] = useState<'curriculum' | 'ai-search' | 'cases' | 'exams' | 'dashboard'>('dashboard');

  // Semester study states
  const [selectedSemesterId, setSelectedSemesterId] = useState<number>(1);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('anatomy-1');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('anat-ch1');
  const [offlineDownloadedSubjects, setOfflineDownloadedSubjects] = useState<string[]>([]);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);

  // Curriculum view states for deep interactive drill-down
  const [curriculumViewMode, setCurriculumViewMode] = useState<'semesters' | 'subjects' | 'chapters' | 'reader'>('semesters');
  const [cachedTextbooks, setCachedTextbooks] = useState<{ [chapterId: string]: string }>({});
  const [textbookLoading, setTextbookLoading] = useState(false);
  const [readerTab, setReaderTab] = useState<'revision' | 'textbook'>('revision');

  // AI Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState<'disease' | 'medicine' | 'animal' | 'general'>('general');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<{ query: string; category: string; text: string }[]>([]);
  const [activeSearchResult, setActiveSearchResult] = useState<string | null>(null);

  // Daily Quiz states
  const [activeQuizSubjectId, setActiveQuizSubjectId] = useState<string | null>(null);
  const [currentQuizQuestionIndex, setCurrentQuizQuestionIndex] = useState<number>(0);
  const [selectedQuizOptionIndex, setSelectedQuizOptionIndex] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Case Study states
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);
  const [caseStage, setCaseStage] = useState<'intro' | 'diagnosis' | 'test' | 'treatment' | 'evaluation'>('intro');
  const [selectedCaseDiagnosis, setSelectedCaseDiagnosis] = useState<string>('');
  const [selectedCaseTest, setSelectedCaseTest] = useState<string>('');
  const [selectedCaseTreatment, setSelectedCaseTreatment] = useState<string[]>([]);
  const [caseScore, setCaseScore] = useState<number | null>(null);
  const [caseEvaluationText, setCaseEvaluationText] = useState<string>('');
  const [evaluatingCase, setEvaluatingCase] = useState<boolean>(false);
  const [completedCaseStudies, setCompletedCaseStudies] = useState<string[]>([]);

  // Mock Exam states
  const [inMockExam, setInMockExam] = useState<boolean>(false);
  const [examQuestions, setExamQuestions] = useState<QuizQuestion[]>([]);
  const [currentExamIndex, setCurrentExamIndex] = useState<number>(0);
  const [examAnswers, setExamAnswers] = useState<{ [questionId: string]: number }>({});
  const [flaggedExamQuestions, setFlaggedExamQuestions] = useState<string[]>([]);
  const [examTimeLeft, setExamTimeLeft] = useState<number>(600); // 10 minutes
  const [examResults, setExamResults] = useState<{
    score: number;
    total: number;
    percent: number;
    passed: boolean;
    timestamp: string;
    answers: { [qId: string]: { selected: number; correct: number } };
  } | null>(null);
  const [showExamResultsModal, setShowExamResultsModal] = useState<boolean>(false);
  const [examHistory, setExamHistory] = useState<any[]>([]);

  // User details / stats
  const [streakDays, setStreakDays] = useState<number>(3);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'offline'>('synced');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger brief Toast message
  const triggerToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Load persistence from local storage
  useEffect(() => {
    const storedCompleted = localStorage.getItem('vet_completed_chapters');
    if (storedCompleted) setCompletedChapters(JSON.parse(storedCompleted));

    const storedOffline = localStorage.getItem('vet_offline_subjects');
    if (storedOffline) setOfflineDownloadedSubjects(JSON.parse(storedOffline));

    const storedCaseStudies = localStorage.getItem('vet_completed_cases');
    if (storedCaseStudies) setCompletedCaseStudies(JSON.parse(storedCaseStudies));

    const storedExamHistory = localStorage.getItem('vet_exam_history');
    if (storedExamHistory) setExamHistory(JSON.parse(storedExamHistory));

    const storedBadges = localStorage.getItem('vet_badges');
    if (storedBadges) setBadges(JSON.parse(storedBadges));

    const storedSearchHistory = localStorage.getItem('vet_search_history');
    if (storedSearchHistory) setSearchResults(JSON.parse(storedSearchHistory));

    const storedTextbooks = localStorage.getItem('vet_cached_textbooks');
    if (storedTextbooks) setCachedTextbooks(JSON.parse(storedTextbooks));
  }, []);

  // Sync back state modifications to local storage & evaluate badges dynamically
  const saveState = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Badge unlock helper
  const checkAndUnlockBadge = (badgeId: string) => {
    setBadges((prevBadges) => {
      const updated = prevBadges.map((b) => {
        if (b.id === badgeId && !b.unlocked) {
          triggerToast(`🏆 Achievement Unlocked: ${b.title}!`, 'success');
          return { ...b, unlocked: true };
        }
        return b;
      });
      saveState('vet_badges', updated);
      return updated;
    });
  };

  // Handle Mock Exam Timer
  useEffect(() => {
    if (inMockExam && examTimeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setExamTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (inMockExam && examTimeLeft === 0) {
      submitMockExam();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inMockExam, examTimeLeft]);

  // Generate Comprehensive 10-Page Theory Notes with Gemini AI
  const compileTextbookNotes = async (chapter: any, subject: any) => {
    if (!chapter || !subject) return;
    setTextbookLoading(true);
    try {
      const response = await fetch('/api/generate-textbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subjectName: subject.name,
          subjectCode: subject.code,
          chapterTitle: chapter.title,
          chapterSummary: chapter.summary,
        }),
      });

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || 'Failed to communicate with AI server');
      }

      const data = await response.json();
      if (!data.text) {
        throw new Error('No content returned from AI model');
      }

      const updated = { ...cachedTextbooks, [chapter.id]: data.text };
      setCachedTextbooks(updated);
      saveState('vet_cached_textbooks', updated);
      triggerToast('📚 10-Page Textbook Chapter compiled and cached!', 'success');
      
      // Unlock badge for searching and reading
      checkAndUnlockBadge('ai_explorer');
    } catch (err: any) {
      console.error('Error compiling textbook notes:', err);
      triggerToast(err.message || 'Error generating detailed notes. Ensure Gemini key is set.', 'warning');
    } finally {
      setTextbookLoading(false);
    }
  };

  // AI Search Engine Submit
  const handleAISearch = async (e: any) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, mode: searchCategory }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      const newResult = {
        query: searchQuery,
        category: searchCategory,
        text: data.text,
      };

      const updatedHistory = [newResult, ...searchResults].slice(0, 15);
      setSearchResults(updatedHistory);
      saveState('vet_search_history', updatedHistory);
      setActiveSearchResult(data.text);
      setSearchQuery('');
      triggerToast('AI Search completed successfully!', 'success');
      checkAndUnlockBadge('ai_explorer');
    } catch (err: any) {
      console.error(err);
      triggerToast('Search Failed: Please check your internet or API credentials.', 'warning');
    } finally {
      setSearchLoading(false);
    }
  };

  // Toggle offline revision download
  const toggleOfflineSubjectDownload = (subjId: string) => {
    let updated: string[];
    if (offlineDownloadedSubjects.includes(subjId)) {
      updated = offlineDownloadedSubjects.filter((id) => id !== subjId);
      triggerToast('Removed subject materials from offline storage', 'info');
    } else {
      updated = [...offlineDownloadedSubjects, subjId];
      triggerToast('Subject notes downloaded for offline quick revision!', 'success');
      checkAndUnlockBadge('offline_ready');
    }
    setOfflineDownloadedSubjects(updated);
    saveState('vet_offline_subjects', updated);
  };

  // Toggle chapter completion
  const toggleChapterCompletion = (chId: string) => {
    let updated: string[];
    if (completedChapters.includes(chId)) {
      updated = completedChapters.filter((id) => id !== chId);
      triggerToast('Progress updated', 'info');
    } else {
      updated = [...completedChapters, chId];
      triggerToast('Chapter revision completed! +10XP', 'success');
      checkAndUnlockBadge('first_steps');
    }
    setCompletedChapters(updated);
    saveState('vet_completed_chapters', updated);
  };

  // Interactive Case Study Submission & Evaluation
  const submitCaseStudySelection = async (currentCase: CaseStudy) => {
    if (caseStage === 'intro') {
      setCaseStage('diagnosis');
    } else if (caseStage === 'diagnosis') {
      if (!selectedCaseDiagnosis) {
        triggerToast('Please select a tentative diagnosis', 'warning');
        return;
      }
      setCaseStage('test');
    } else if (caseStage === 'test') {
      if (!selectedCaseTest) {
        triggerToast('Please choose a laboratory or field diagnostic test', 'warning');
        return;
      }
      setCaseStage('treatment');
    } else if (caseStage === 'treatment') {
      if (selectedCaseTreatment.length === 0) {
        triggerToast('Please select at least one treatment step', 'warning');
        return;
      }
      
      // Evaluate via AI endpoint
      setEvaluatingCase(true);
      setCaseStage('evaluation');
      try {
        const response = await fetch('/api/case-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            caseTitle: currentCase.title,
            studentHistory: currentCase.history,
            studentDiagnosis: selectedCaseDiagnosis,
            studentTreatment: selectedCaseTreatment.join(', '),
          }),
        });

        if (!response.ok) {
          throw new Error('Feedback request failed');
        }

        const data = await response.json();
        setCaseEvaluationText(data.evaluation);

        // Grade calculation (simple heuristic combined with clinical markers)
        let calculatedScore = 6;
        if (selectedCaseDiagnosis === currentCase.correctDiagnosis) calculatedScore += 2;
        if (selectedCaseTest === currentCase.correctTest) calculatedScore += 1;
        if (selectedCaseTreatment.includes(currentCase.correctTreatment[0])) calculatedScore += 1;
        setCaseScore(calculatedScore);

        // Track completed case study
        if (!completedCaseStudies.includes(currentCase.id)) {
          const updated = [...completedCaseStudies, currentCase.id];
          setCompletedCaseStudies(updated);
          saveState('vet_completed_cases', updated);
        }

        checkAndUnlockBadge('clinical_novice');
        if (calculatedScore >= 9) {
          triggerToast('Superb Clinical Instinct! 10/10 Score potential.', 'success');
        }
      } catch (err: any) {
        console.error(err);
        triggerToast('AI Evaluation unavailable. Providing structural offline feedback.', 'info');
        // Offline fallback
        let score = 5;
        if (selectedCaseDiagnosis === currentCase.correctDiagnosis) score = 10;
        setCaseScore(score);
        setCaseEvaluationText(`### Offline Case Assessment\n\n* **Your Diagnosis:** ${selectedCaseDiagnosis}\n* **Correct Diagnosis:** ${currentCase.correctDiagnosis}\n\n**Expert Explanation:** ${currentCase.clinicalPearl}\n\n*You successfully completed the practical case! Score: ${score}/10.*`);
      } finally {
        setEvaluatingCase(false);
      }
    }
  };

  const handleTreatmentToggle = (opt: string) => {
    if (selectedCaseTreatment.includes(opt)) {
      setSelectedCaseTreatment(selectedCaseTreatment.filter((item) => item !== opt));
    } else {
      setSelectedCaseTreatment([...selectedCaseTreatment, opt]);
    }
  };

  const resetCaseStudy = () => {
    setActiveCaseStudyId(null);
    setCaseStage('intro');
    setSelectedCaseDiagnosis('');
    setSelectedCaseTest('');
    setSelectedCaseTreatment([]);
    setCaseScore(null);
    setCaseEvaluationText('');
  };

  // Quiz Hub Actions
  const startQuiz = (subjId: string) => {
    setActiveQuizSubjectId(subjId);
    setCurrentQuizQuestionIndex(0);
    setSelectedQuizOptionIndex(null);
    setQuizScore(0);
    setQuizSubmitted(false);
    setQuizFinished(false);
  };

  const quizQuestions = VETERINARY_QUIZZES.filter(q => q.subjectId === activeQuizSubjectId);

  const handleQuizOptionSelect = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedQuizOptionIndex(idx);
  };

  const submitQuizQuestion = () => {
    if (selectedQuizOptionIndex === null) {
      triggerToast('Select an answer option to proceed', 'warning');
      return;
    }
    const isCorrect = selectedQuizOptionIndex === quizQuestions[currentQuizQuestionIndex].correctAnswerIndex;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
    setQuizSubmitted(true);
  };

  const nextQuizQuestion = () => {
    if (currentQuizQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuizQuestionIndex((prev) => prev + 1);
      setSelectedQuizOptionIndex(null);
      setQuizSubmitted(false);
    } else {
      setQuizFinished(true);
      if (quizScore + (selectedQuizOptionIndex === quizQuestions[currentQuizQuestionIndex].correctAnswerIndex ? 1 : 0) === 5) {
        checkAndUnlockBadge('pharma_master');
      }
    }
  };

  // Mock Examination Core Actions
  const startMockExam = () => {
    // Collect questions randomly from exam bank
    const shuffled = [...MOCK_EXAM_QUESTIONS].sort(() => 0.5 - Math.random());
    setExamQuestions(shuffled.slice(0, 10)); // 10 questions mock exam
    setExamAnswers({});
    setFlaggedExamQuestions([]);
    setCurrentExamIndex(0);
    setExamTimeLeft(600); // 10 minutes
    setInMockExam(true);
    setExamResults(null);
    triggerToast('MP Veterinary Diploma Mock Exam started! 10 Minutes remaining.', 'info');
  };

  const handleExamAnswerSelect = (optionIdx: number) => {
    const activeQuestion = examQuestions[currentExamIndex];
    setExamAnswers({
      ...examAnswers,
      [activeQuestion.id]: optionIdx,
    });
  };

  const toggleFlagQuestion = (qId: string) => {
    if (flaggedExamQuestions.includes(qId)) {
      setFlaggedExamQuestions(flaggedExamQuestions.filter(id => id !== qId));
    } else {
      setFlaggedExamQuestions([...flaggedExamQuestions, qId]);
    }
  };

  const submitMockExam = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    let score = 0;
    const itemizedAnswers: { [qId: string]: { selected: number; correct: number } } = {};

    examQuestions.forEach((q) => {
      const selected = examAnswers[q.id] !== undefined ? examAnswers[q.id] : -1;
      const correct = q.correctAnswerIndex;
      if (selected === correct) {
        score += 1;
      }
      itemizedAnswers[q.id] = { selected, correct };
    });

    const percent = (score / examQuestions.length) * 100;
    const passed = percent >= 50; // 50% passing criteria for MP Vet Diplomas

    const newResult = {
      score,
      total: examQuestions.length,
      percent,
      passed,
      timestamp: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }),
      answers: itemizedAnswers,
    };

    const updatedHistory = [newResult, ...examHistory];
    setExamHistory(updatedHistory);
    saveState('vet_exam_history', updatedHistory);
    setExamResults(newResult);
    setInMockExam(false);
    setShowExamResultsModal(true);
    checkAndUnlockBadge('exam_warrior');
    triggerToast(passed ? '🎉 Congratulations! You cleared the Mock Exam!' : 'Study hard and try again! Revision is key.', passed ? 'success' : 'info');
  };

  // Helper variables for progress calculation
  const totalChaptersCount = VETERINARY_CURRICULUM.reduce((acc, sem) => {
    return acc + sem.subjects.reduce((sum, sub) => sum + sub.chapters.length, 0);
  }, 0);

  const curriculumProgressPercent = totalChaptersCount > 0 
    ? Math.round((completedChapters.length / totalChaptersCount) * 100) 
    : 0;

  const currentSemester = VETERINARY_CURRICULUM.find(s => s.id === selectedSemesterId);
  const currentSubject = currentSemester?.subjects.find(s => s.id === selectedSubjectId);
  const currentChapter = currentSubject?.chapters.find(c => c.id === selectedChapterId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      {/* Toast Alert */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center space-x-3 transition-all transform translate-y-0 scale-100 ${
          toastMessage.type === 'success' ? 'bg-emerald-600 text-white' : 
          toastMessage.type === 'warning' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
        }`}>
          {toastMessage.type === 'success' && <Check className="w-5 h-5 flex-shrink-0" />}
          {toastMessage.type === 'warning' && <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
          {toastMessage.type === 'info' && <Sparkles className="w-5 h-5 flex-shrink-0" />}
          <span className="font-medium text-sm">{toastMessage.text}</span>
        </div>
      )}

      {/* Header section with brand and connection status */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-600 text-white p-2 rounded-xl shadow-inner">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center">
                MP Veterinary Diploma <span className="ml-2 text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">2-Year Study Hub</span>
              </h1>
              <p className="text-xs text-slate-500">Comprehensive NDVSU Jabalpur Syllabus Study & Practical Prep</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-end sm:self-auto">
            {/* Offline sync status indicator */}
            <button 
              onClick={() => {
                setSyncStatus(prev => prev === 'synced' ? 'offline' : 'synced');
                triggerToast(syncStatus === 'synced' ? 'Switched to local offline mode' : 'Synchronized clinical files', 'info');
              }} 
              className={`flex items-center space-x-2 text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                syncStatus === 'synced' 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' 
                  : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
              }`}
            >
              {syncStatus === 'synced' ? (
                <>
                  <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cloud Active</span>
                </>
              ) : (
                <>
                  <CloudOff className="w-3.5 h-3.5 text-amber-600" />
                  <span>Offline Mode</span>
                </>
              )}
            </button>

            {/* Student stats block */}
            <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1 text-xs text-slate-600 space-x-2">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="font-bold">{streakDays} Day Streak</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation Menu */}
      <nav className="bg-white border-b border-slate-200 py-1.5 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-2 min-w-max">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 text-sm px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`flex items-center space-x-2 text-sm px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'curriculum'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Study Notes & Revision</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-search')}
            className={`flex items-center space-x-2 text-sm px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'ai-search'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Dhanvantari AI Search</span>
          </button>

          <button
            onClick={() => setActiveTab('cases')}
            className={`flex items-center space-x-2 text-sm px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'cases'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Interactive Case Studies</span>
          </button>

          <button
            onClick={() => setActiveTab('exams')}
            className={`flex items-center space-x-2 text-sm px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'exams'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Mock Exam Arena</span>
          </button>
        </div>
      </nav>

      {/* Main Content Containers */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Header greeting card */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-emerald-300 font-semibold text-xs tracking-wider uppercase">Welcome Back, Veterinary Student</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold">Madhya Pradesh Veterinary Study Suite</h2>
                <p className="text-emerald-100/80 text-sm max-w-xl">
                  Prepare for your 2-Year Diploma examinations (Animal Husbandry) & practical clinics with AI-powered diagnostics, curriculum notes, interactive clinical case studies, and complete mock trials.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="bg-emerald-700/60 text-emerald-100 px-2.5 py-1 rounded-md border border-emerald-600/40">📚 {completedChapters.length}/{totalChaptersCount} Chapters Revised</span>
                  <span className="bg-emerald-700/60 text-emerald-100 px-2.5 py-1 rounded-md border border-emerald-600/40">🏥 {completedCaseStudies.length}/{INTERACTIVE_CASE_STUDIES.length} Cases Solved</span>
                  <span className="bg-emerald-700/60 text-emerald-100 px-2.5 py-1 rounded-md border border-emerald-600/40">📝 {examHistory.length} Mock Exams Taken</span>
                </div>
              </div>
              <div className="flex-shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center text-center">
                <span className="text-xs text-emerald-200">Curriculum Completed</span>
                <span className="text-4xl font-black mt-1">{curriculumProgressPercent}%</span>
                {/* Visual mini progress ring */}
                <svg className="w-16 h-16 mt-2 transform -rotate-90">
                  <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="transparent" />
                  <circle cx="32" cy="32" r="26" stroke="#10b981" strokeWidth="6" fill="transparent" 
                          strokeDasharray={163.3} strokeDashoffset={163.3 - (163.3 * curriculumProgressPercent) / 100} />
                </svg>
              </div>
            </div>

            {/* Quick stats and alerts row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Study Sync & Offline Mode control */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium text-xs">Syllabus Offline Coverage</span>
                    <Database className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Offline Study Status</h3>
                  <p className="text-slate-600 text-xs">
                    Downloaded {offlineDownloadedSubjects.length} subject materials for offline reading. Access core revision notes even without an active internet connection.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    {offlineDownloadedSubjects.length > 0 ? `${offlineDownloadedSubjects.length} subjects downloaded` : 'No downloads yet'}
                  </span>
                  <button 
                    onClick={() => setActiveTab('curriculum')}
                    className="text-xs font-bold text-slate-800 hover:text-emerald-700 flex items-center space-x-1"
                  >
                    <span>Manage</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Mock Exam High score or trigger */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium text-xs">Latest Mock Performance</span>
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Mock Examination</h3>
                  {examHistory.length > 0 ? (
                    <div className="space-y-1">
                      <p className="text-2xl font-black text-slate-900">{examHistory[0].score}/{examHistory[0].total} <span className="text-xs font-medium text-slate-500">Correct answers</span></p>
                      <p className="text-xs text-slate-600">Last trial: {examHistory[0].timestamp}</p>
                    </div>
                  ) : (
                    <p className="text-slate-600 text-xs">
                      No trial exams recorded yet. Test your understanding of Anatomy, Physiology, Medicine & Pharmacology.
                    </p>
                  )}
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  {examHistory.length > 0 ? (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${examHistory[0].passed ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      {examHistory[0].passed ? 'PASS (50%+)' : 'FAIL'}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">Ready for evaluation</span>
                  )}
                  <button 
                    onClick={() => setActiveTab('exams')}
                    className="text-xs font-bold text-slate-800 hover:text-emerald-700 flex items-center space-x-1"
                  >
                    <span>Enter Exam Hall</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* AI Expert search prompt */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium text-xs">Instant AI Diagnostics</span>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Dhanvantari Vet AI</h3>
                  <p className="text-slate-600 text-xs">
                    Input symptoms or drug names. Get tailored clinical indications, etiology, Indian vaccine schedules, and differential indicators.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Ready to consult</span>
                  <button 
                    onClick={() => setActiveTab('ai-search')}
                    className="text-xs font-bold text-slate-800 hover:text-emerald-700 flex items-center space-x-1"
                  >
                    <span>Ask AI</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Main dashboard splits: Case Studies & Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Core interactive features list */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Fast access subjects bar */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800 flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>Quick-Revision Study Deck</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {VETERINARY_CURRICULUM[0].subjects.map((sub) => {
                      const completedCount = sub.chapters.filter(ch => completedChapters.includes(ch.id)).length;
                      const progress = Math.round((completedCount / sub.chapters.length) * 100);
                      return (
                        <div key={sub.id} className="border border-slate-100 rounded-xl p-4 hover:border-emerald-200 hover:bg-slate-50/50 transition-all flex flex-col justify-between">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400">{sub.code}</span>
                            <h4 className="font-bold text-slate-800 text-sm">{sub.name}</h4>
                            <p className="text-xs text-slate-500 italic">{sub.hindiName}</p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-100/60 flex items-center justify-between">
                            <div className="w-2/3">
                              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                                <span>Progress</span>
                                <span>{progress}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="bg-emerald-600 h-full transition-all" style={{ width: `${progress}%` }} />
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedSemesterId(1);
                                setSelectedSubjectId(sub.id);
                                setSelectedChapterId(sub.chapters[0].id);
                                setActiveTab('curriculum');
                              }}
                              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 p-1.5 rounded-lg transition-all"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Practical clinical cases highlights */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      <span>Interactive Clinical Cases</span>
                    </h3>
                    <button 
                      onClick={() => setActiveTab('cases')}
                      className="text-xs font-bold text-emerald-600 hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {INTERACTIVE_CASE_STUDIES.map((c) => {
                      const isCompleted = completedCaseStudies.includes(c.id);
                      return (
                        <div key={c.id} className="border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                c.species === 'Bovine' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
                              }`}>
                                {c.species}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                c.difficulty === 'Easy' ? 'bg-green-50 text-green-700' : 
                                c.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                              }`}>
                                {c.difficulty}
                              </span>
                            </div>
                            <h4 className="font-bold text-slate-800 text-sm">{c.title}</h4>
                            <p className="text-xs text-slate-500 line-clamp-1">{c.history}</p>
                          </div>
                          
                          <button
                            onClick={() => {
                              setActiveCaseStudyId(c.id);
                              setActiveTab('cases');
                            }}
                            className={`flex-shrink-0 text-xs font-bold px-3 py-2 rounded-lg transition-all ${
                              isCompleted 
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {isCompleted ? 'Solve Again (Cleared)' : 'Diagnose Patient'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Achievements & Badges */}
              <div className="space-y-6">
                
                {/* Unlockable Achievement Badges */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800 flex items-center space-x-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Unlocked Achievements</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {badges.map((b) => (
                      <div 
                        key={b.id} 
                        className={`p-3 rounded-xl border text-center transition-all ${
                          b.unlocked 
                            ? 'bg-emerald-50/50 border-emerald-200 shadow-sm' 
                            : 'bg-slate-50 border-slate-100 opacity-60'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{b.unlocked ? b.icon : '🔒'}</span>
                        <h4 className="text-xs font-bold text-slate-800 truncate">{b.title}</h4>
                        <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{b.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Study Planner Revision Check */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm">Exam Guidance Note</h3>
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Veterinary Diploma exams in MP (DAHET/DVLT) are composed of multiple-choice questions focusing on primary care, surgical restrainment, pharmacology doses, and animal management metrics. Use mock exams daily to secure optimal results.
                  </p>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] block font-bold text-emerald-400 uppercase tracking-widest mb-1">Key Revision Fact:</span>
                    <p className="text-xs text-slate-200 italic">"Rothera's chemical test yields a purple permanganate ring which is diagnostic of sub-clinical Ketosis in milch animals."</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: SUBJECT CURRICULUM NOTES */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            
            {/* Level 1: Semester Selector View */}
            {curriculumViewMode === 'semesters' && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-600 text-white p-2.5 rounded-2xl shadow-sm">
                      <BookOpen className="w-5 h-5 text-emerald-100" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Veterinary Syllabus & Academic Notes</h2>
                      <p className="text-xs text-slate-500">Madhya Pradesh 2-Year Animal Husbandry & Veterinary Diploma Curriculum</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                    Click on any semester below to view its specific subjects. Each subject contains fully categorized, detailed chapters, high-yield fast revision memory points, and the option to instantly compile or read complete 10-page textbook theory notes using Dhanvantari AI.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {VETERINARY_CURRICULUM.map((sem) => {
                    // Calculate completed chapters for this semester
                    const totalCh = sem.subjects.reduce((acc, sub) => acc + sub.chapters.length, 0);
                    const completedChInSem = sem.subjects.reduce((acc, sub) => {
                      return acc + sub.chapters.filter(ch => completedChapters.includes(ch.id)).length;
                    }, 0);
                    const percent = totalCh > 0 ? Math.round((completedChInSem / totalCh) * 100) : 0;

                    return (
                      <div
                        key={sem.id}
                        onClick={() => {
                          setSelectedSemesterId(sem.id);
                          if (sem.subjects.length > 0) {
                            setSelectedSubjectId(sem.subjects[0].id);
                            setSelectedChapterId(sem.subjects[0].chapters[0].id);
                          }
                          setCurriculumViewMode('subjects');
                        }}
                        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6 hover:shadow-md transition-all cursor-pointer group hover:border-emerald-500/50"
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1.5 flex-1 pr-4">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md uppercase">
                              Semester {sem.id === 1 ? 'I' : sem.id === 2 ? 'II' : sem.id === 3 ? 'III' : 'IV'}
                            </span>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mt-2">{sem.name}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed italic">
                              {sem.id === 1 && "Basic anatomy, physiology, and biochemistry of domestic livestock."}
                              {sem.id === 2 && "Animal breeding, livestock genetics, nutrition & pharmacology."}
                              {sem.id === 3 && "Veterinary pathology, epidemiology, surgery, and clinical medicine."}
                              {sem.id === 4 && "Dairy production, poultry breeding, economics & rural entrepreneurship."}
                            </p>
                          </div>
                          <div className="bg-slate-50 p-2.5 rounded-2xl text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors self-start">
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 space-y-3">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="font-semibold">{sem.subjects.length} Major Subjects</span>
                            <span className="font-bold text-slate-700">{completedChInSem}/{totalCh} Chapters Completed</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="bg-emerald-600 h-full transition-all duration-300"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Progress</span>
                            <span className="text-xs font-black text-emerald-700">{percent}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Level 2: Subjects Grid */}
            {curriculumViewMode === 'subjects' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <button
                      onClick={() => setCurriculumViewMode('semesters')}
                      className="text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors flex items-center space-x-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to Semesters</span>
                    </button>
                    <h2 className="text-xl font-bold text-slate-900">{currentSemester?.name} Subjects</h2>
                    <p className="text-xs text-slate-500">Select a subject below to explore chapters and notes.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentSemester?.subjects.map((subj) => {
                    const isDownloaded = offlineDownloadedSubjects.includes(subj.id);
                    const completedChInSub = subj.chapters.filter(ch => completedChapters.includes(ch.id)).length;
                    const percentSub = subj.chapters.length > 0 ? Math.round((completedChInSub / subj.chapters.length) * 100) : 0;

                    return (
                      <div
                        key={subj.id}
                        onClick={() => {
                          setSelectedSubjectId(subj.id);
                          setSelectedChapterId(subj.chapters[0].id);
                          setCurriculumViewMode('chapters');
                        }}
                        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-md hover:border-emerald-500/50 cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded uppercase">
                              {subj.code}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleOfflineSubjectDownload(subj.id);
                              }}
                              className={`p-1.5 rounded-lg transition-all ${
                                isDownloaded 
                                  ? 'text-emerald-600 bg-emerald-100' 
                                  : 'text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100'
                              }`}
                              title={isDownloaded ? "Available Offline" : "Download for offline use"}
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-1">
                            <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">{subj.name}</h3>
                            <p className="text-xs text-slate-500 italic">{subj.hindiName}</p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 space-y-2">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="font-semibold">{subj.chapters.length} Chapters</span>
                            <span className="font-bold text-emerald-700">{percentSub}% Done</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="bg-emerald-600 h-full transition-all duration-300"
                              style={{ width: `${percentSub}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Level 3: Chapters List */}
            {curriculumViewMode === 'chapters' && currentSubject && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <button
                    onClick={() => setCurriculumViewMode('subjects')}
                    className="text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors flex items-center space-x-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Subjects</span>
                  </button>
                  <div className="flex items-center space-x-2 pt-1">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">{currentSubject.code}</span>
                    <h2 className="text-xl font-bold text-slate-900">{currentSubject.name}</h2>
                  </div>
                  <p className="text-xs text-slate-500 italic mt-0.5">{currentSubject.hindiName}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Chapters Loop */}
                  <div className="lg:col-span-8 space-y-3">
                    {currentSubject.chapters.map((ch, idx) => {
                      const isCompleted = completedChapters.includes(ch.id);
                      return (
                        <div
                          key={ch.id}
                          onClick={() => {
                            setSelectedChapterId(ch.id);
                            setCurriculumViewMode('reader');
                            setReaderTab('revision');
                          }}
                          className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex items-start justify-between cursor-pointer hover:border-emerald-500/50 hover:shadow-sm transition-all"
                        >
                          <div className="space-y-1 flex-1 pr-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Chapter {idx + 1}</span>
                              {isCompleted && (
                                <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded flex items-center space-x-0.5">
                                  <Check className="w-2.5 h-2.5" />
                                  <span>Completed</span>
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm">{ch.title}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{ch.summary}</p>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-xl text-slate-400 self-center">
                            <ArrowRight className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Sidebar stats & quick actions */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Syllabus Evaluation</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-semibold">Total Chapters:</span>
                          <span className="font-bold text-slate-800">{currentSubject.chapters.length}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-semibold">Completed:</span>
                          <span className="font-bold text-emerald-600">
                            {currentSubject.chapters.filter(ch => completedChapters.includes(ch.id)).length}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-teal-800 to-emerald-950 text-white p-5 rounded-3xl shadow-md space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Quick Subject Quiz</h4>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Assess your diploma exam readiness with 5 rapid high-yield questions on {currentSubject.name}.
                      </p>
                      <button
                        onClick={() => startQuiz(currentSubject.id)}
                        className="w-full py-2.5 bg-white text-emerald-900 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-all flex items-center justify-center space-x-1 shadow-sm"
                      >
                        <span>Launch Practice Quiz</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Level 4: Theory Notes Reader */}
            {curriculumViewMode === 'reader' && currentChapter && (
              <div className="space-y-6">
                
                {/* Header Back & Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <button
                      onClick={() => setCurriculumViewMode('chapters')}
                      className="text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors flex items-center space-x-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to Chapter List</span>
                    </button>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-1 flex items-center space-x-1.5">
                      <span>Semester {selectedSemesterId}</span>
                      <span>•</span>
                      <span>{currentSubject?.name}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">{currentChapter.title}</h2>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleChapterCompletion(currentChapter.id)}
                      className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        completedChapters.includes(currentChapter.id)
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      }`}
                    >
                      {completedChapters.includes(currentChapter.id) ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Revised ✓</span>
                        </>
                      ) : (
                        <>
                          <span>Mark as Completed</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Main Split (Two Tabs: Revision vs Textbook) */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  
                  {/* Premium Tab Switcher */}
                  <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex space-x-1 bg-slate-200/60 p-1 rounded-xl">
                      <button
                        onClick={() => setReaderTab('revision')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                          readerTab === 'revision'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>Revision Notes (फास्ट संक्षेप)</span>
                      </button>
                      <button
                        onClick={() => setReaderTab('textbook')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                          readerTab === 'textbook'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>10-Page Theory Textbook (विस्तृत थ्योरी)</span>
                      </button>
                    </div>

                    {offlineDownloadedSubjects.includes(selectedSubjectId) && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-1 rounded-md flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>Available Offline</span>
                      </span>
                    )}
                  </div>

                  {/* Document Body Viewport */}
                  <div className="p-6 sm:p-8 space-y-6 leading-relaxed max-w-none">
                    
                    {/* TAB A: Revision notes */}
                    {readerTab === 'revision' && (
                      <div className="space-y-6">
                        <div className="bg-slate-50 border-l-4 border-slate-400 p-4 rounded-r-xl">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Lecture Outline</span>
                          <p className="text-xs text-slate-600 font-semibold">{currentChapter.summary}</p>
                        </div>

                        {/* Rendering preloaded parsed revision notes */}
                        <div className="text-sm text-slate-800 space-y-4">
                          {currentChapter.content.split('\n\n').map((paragraph, pIdx) => {
                            if (paragraph.startsWith('### ')) {
                              return (
                                <h3 key={pIdx} className="text-base font-extrabold text-slate-900 pt-3 border-b border-slate-100 pb-1">
                                  {paragraph.replace('### ', '')}
                                </h3>
                              );
                            }
                            if (paragraph.startsWith('## ')) {
                              return (
                                <h2 key={pIdx} className="text-lg font-black text-slate-900 pt-4 pb-2">
                                  {paragraph.replace('## ', '')}
                                </h2>
                              );
                            }

                            // Table parsing
                            if (paragraph.includes('|')) {
                              const rows = paragraph.split('\n').filter(r => r.trim() !== '');
                              const isHeader = rows[1]?.includes('---');
                              return (
                                <div key={pIdx} className="overflow-x-auto my-4 border border-slate-200 rounded-xl">
                                  <table className="w-full text-left border-collapse text-xs">
                                    <thead>
                                      <tr className="bg-slate-50 border-b border-slate-200">
                                        {rows[0].split('|').map((col, cIdx) => col.trim() && (
                                          <th key={cIdx} className="p-3 font-extrabold text-slate-700">{col.trim()}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {rows.slice(isHeader ? 2 : 1).map((row, rIdx) => (
                                        <tr key={rIdx} className="border-b border-slate-100 hover:bg-slate-50/50">
                                          {row.split('|').map((col, cIdx) => col.trim() && (
                                            <td key={cIdx} className="p-3 text-slate-600 font-medium">{col.trim()}</td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              );
                            }

                            // Bullet lists
                            if (paragraph.startsWith('* ')) {
                              return (
                                <ul key={pIdx} className="list-disc pl-5 space-y-1 text-slate-700">
                                  {paragraph.split('\n').map((bullet, bIdx) => (
                                    <li key={bIdx} className="text-xs sm:text-sm">
                                      {bullet.replace('* ', '').replace(/\*\*(.*?)\*\*/g, '$1')}
                                    </li>
                                  ))}
                                </ul>
                              );
                            }

                            return (
                              <p key={pIdx} className="text-slate-700 text-sm leading-relaxed"
                                 dangerouslySetInnerHTML={{
                                   __html: paragraph
                                     .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                     .replace(/_([^_]+)_/g, '<em>$1</em>')
                                 }}
                              />
                            );
                          })}
                        </div>

                        {/* Chapter Core Memory Cards */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 mt-8 space-y-3">
                          <div className="flex items-center space-x-2 text-emerald-800">
                            <Award className="w-4 h-4" />
                            <h4 className="font-extrabold text-xs uppercase tracking-wider">Chapter Core Memory Cards</h4>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            {currentChapter.keyRevisionPoints.map((pt, idx) => (
                              <div key={idx} className="bg-white p-3 rounded-xl border border-slate-100 flex items-start space-x-2.5 shadow-xs">
                                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">{idx + 1}</span>
                                <p className="text-xs text-slate-600 font-semibold">{pt}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB B: 10-Page Theory Textbook notes */}
                    {readerTab === 'textbook' && (
                      <div className="space-y-6">
                        
                        {/* 1. Loading state */}
                        {textbookLoading && (
                          <div className="text-center py-16 space-y-6 max-w-md mx-auto">
                            <div className="relative w-16 h-16 mx-auto">
                              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></div>
                              <div className="relative rounded-full h-16 w-16 border-4 border-emerald-600 border-t-transparent animate-spin flex items-center justify-center">
                                <Activity className="w-6 h-6 text-emerald-600 animate-pulse" />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <h3 className="font-extrabold text-slate-900 text-base">Compiling Comprehensive Notes...</h3>
                              <p className="text-xs text-slate-500 italic animate-pulse">
                                Consulting Nanaji Deshmukh University reference manuals and clinical guides...
                              </p>
                              <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 text-[10px] text-slate-500 text-left font-mono space-y-1">
                                <div className="text-emerald-700 font-bold">✔ Bound to port 3000</div>
                                <div>✔ Fetching comparative Indian breed matrices...</div>
                                <div className="animate-pulse">✍ Formulating Indian rural dispensary pharmacology...</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 2. Loaded state */}
                        {!textbookLoading && cachedTextbooks[currentChapter.id] && (
                          <div className="prose prose-slate max-w-none space-y-6">
                            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center space-x-3">
                              <span className="text-2xl">📖</span>
                              <div>
                                <h4 className="font-bold text-emerald-900 text-xs">Dhanvantari AI Comprehensive Textbook Guide</h4>
                                <p className="text-[10px] text-emerald-700">Detailed 10-page theory covering syllabus sub-divisions, pathology, and therapeutics.</p>
                              </div>
                            </div>
                            
                            <div className="text-slate-800">
                              {renderMarkdownToElements(cachedTextbooks[currentChapter.id])}
                            </div>
                          </div>
                        )}

                        {/* 3. Empty State / Action to compile */}
                        {!textbookLoading && !cachedTextbooks[currentChapter.id] && (
                          <div className="bg-slate-50 rounded-2xl border border-slate-200 border-dashed p-10 text-center flex flex-col items-center justify-center space-y-4 max-w-xl mx-auto">
                            <div className="w-14 h-14 bg-emerald-50 rounded-2xl text-emerald-600 flex items-center justify-center border border-emerald-100">
                              <Sparkles className="w-6 h-6 text-amber-500 fill-amber-500" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-extrabold text-slate-800 text-sm">Comprehensive 10-Page Theory Missing</h3>
                              <p className="text-slate-500 text-xs leading-relaxed">
                                Ready to unlock exhaustive, textbook-grade detailed theory notes? This builds an advanced study manual containing species-specific comparative tables, clinical diagnostic checklists, and rural field therapeutics.
                              </p>
                            </div>
                            <button
                              onClick={() => compileTextbookNotes(currentChapter, currentSubject)}
                              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center space-x-2"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                              <span>✨ Compile 10-Page Theory Notes</span>
                            </button>
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: DHANVANTARI AI SEARCH ENGINE */}
        {activeTab === 'ai-search' && (
          <div className="space-y-6">
            
            {/* AI introduction header block */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-600 p-2.5 rounded-2xl text-white shadow-md">
                  <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-950">Dhanvantari Veterinary AI</h2>
                  <p className="text-xs text-slate-500">Search diseases, drug parameters, animal management metrics instantly</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                Unlock instant peer-reviewed descriptions, vaccinations, and pharmacological dosages tailored around the Madhya Pradesh Animal Husbandry Diploma syllabus. Switch search modes to refine your technical context.
              </p>

              {/* Mode tags */}
              <div className="pt-2 flex flex-wrap gap-2">
                {[
                  { id: 'general', label: 'All Knowledge' },
                  { id: 'disease', label: 'Diseases & Symptoms' },
                  { id: 'medicine', label: 'Medicines & Dosage' },
                  { id: 'animal', label: 'Breeds & Management' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSearchCategory(cat.id as any)}
                    className={`text-xs px-4 py-2 rounded-xl font-bold transition-all ${
                      searchCategory === cat.id 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form query input split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form & Suggestions (5 columns) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Search execution box */}
                <form onSubmit={handleAISearch} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Consult AI Assistant</label>
                    <textarea
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. Symptoms of Mastitis, or dose of Atropine sulphate in sheep, or properties of Sahiwal cows..."
                      rows={4}
                      className="w-full p-3.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none bg-slate-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={searchLoading}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-sm"
                  >
                    {searchLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>Searching Database...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        <span>Consult Dhanvantari AI</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Search quick presets */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Curriculum Quick Prompts</h4>
                  <div className="space-y-2">
                    {[
                      { text: "Foot and Mouth Disease (FMD) lesions & potassium wash", cat: "disease" },
                      { text: "Dose, route & toxicity signs of Ivermectin in small ruminants", cat: "medicine" },
                      { text: "Characteristics of Murrah buffalo & Surti breeds in India", cat: "animal" },
                      { text: "Anatomy & capacity of the 4 ruminant stomach compartments", cat: "general" }
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSearchQuery(preset.text);
                          setSearchCategory(preset.cat as any);
                        }}
                        className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/40 text-xs font-semibold text-slate-700 flex items-start space-x-2.5 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>{preset.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* History of searched queries */}
                {searchResults.length > 0 && (
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase">Recent Searches</h4>
                      <button 
                        onClick={() => {
                          setSearchResults([]);
                          localStorage.removeItem('vet_search_history');
                        }}
                        className="text-[10px] text-red-500 hover:underline font-bold"
                      >
                        Clear History
                      </button>
                    </div>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto">
                      {searchResults.map((res, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSearchResult(res.text)}
                          className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-xs font-medium text-slate-600 truncate flex items-center space-x-2"
                        >
                          <BookOpen className="w-3 h-3 text-slate-400 flex-shrink-0" />
                          <span className="truncate flex-1">{res.query}</span>
                          <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">{res.category}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* AI Search Results Panel (7 columns) */}
              <div className="lg:col-span-7 space-y-6">
                
                {activeSearchResult ? (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
                    
                    {/* Diagnostic answer card header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">AI Consultation Output</span>
                        <h3 className="font-extrabold text-slate-900 text-base mt-2 flex items-center">
                          <BrainCircuit className="w-5 h-5 text-emerald-600 mr-2" />
                          <span>Dhanvantari Expert Report</span>
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(activeSearchResult);
                          triggerToast('Copied diagnostic report to clipboard', 'success');
                        }}
                        className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition-all"
                      >
                        Copy Report
                      </button>
                    </div>

                    {/* AI Formatted Response Area */}
                    <div className="text-sm text-slate-800 leading-relaxed space-y-4 max-h-[500px] overflow-y-auto pr-2">
                      {activeSearchResult.split('\n\n').map((para, idx) => {
                        if (para.startsWith('### ')) {
                          return <h3 key={idx} className="text-sm font-extrabold text-slate-900 pt-3 border-b border-slate-100 pb-1">{para.replace('### ', '')}</h3>;
                        }
                        if (para.startsWith('## ')) {
                          return <h2 key={idx} className="text-base font-black text-slate-900 pt-3">{para.replace('## ', '')}</h2>;
                        }
                        if (para.startsWith('* ') || para.startsWith('- ')) {
                          return (
                            <ul key={idx} className="list-disc pl-5 space-y-1">
                              {para.split('\n').map((bullet, bIdx) => (
                                <li key={bIdx} className="text-xs sm:text-sm text-slate-700">
                                  {bullet.replace(/^[*-\s]+/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return (
                          <p key={idx} className="text-slate-700 text-xs sm:text-sm"
                             dangerouslySetInnerHTML={{
                               __html: para
                                 .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                 .replace(/_([^_]+)_/g, '<em>$1</em>')
                             }}
                          />
                        );
                      })}
                    </div>

                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200 border-dashed p-12 text-center flex flex-col items-center justify-center space-y-3">
                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center border border-slate-100">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-800">No Query Consulted Yet</h3>
                    <p className="text-slate-500 text-xs max-w-md mx-auto">
                      Use the left-hand console to ask custom questions or select a curriculum quick prompt. Dhanvantari AI will produce a comprehensive review guide here.
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* TAB 4: INTERACTIVE CASE STUDIES */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            
            {/* Case Studies intro dashboard */}
            {!activeCaseStudyId ? (
              <div className="space-y-6">
                
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-600 text-white p-2.5 rounded-2xl shadow-sm">
                      <BrainCircuit className="w-5 h-5 text-emerald-100" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Clinical Case Simulator</h2>
                      <p className="text-xs text-slate-500">Formulate diagnosis & therapeutic strategies for live clinical evaluations</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 max-w-4xl">
                    Interact with simulated clinical presentations from typical Madhya Pradesh dairy setups. Examine anamnesis (history), evaluate physical biomarkers (body temperature, rumination, breathing patterns), choose appropriate diagnostics, structure treatments, and get evaluated in real-time by our AI Vet Instructor!
                  </p>
                </div>

                {/* Cases Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {INTERACTIVE_CASE_STUDIES.map((c) => {
                    const isCompleted = completedCaseStudies.includes(c.id);
                    return (
                      <div key={c.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-6 hover:shadow-md transition-all">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] px-2.5 py-0.5 rounded font-extrabold uppercase ${
                              c.species === 'Bovine' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
                            }`}>
                              {c.species} Case
                            </span>
                            <span className={`text-[10px] px-2.5 py-0.5 rounded font-extrabold uppercase ${
                              c.difficulty === 'Easy' ? 'bg-green-50 text-green-700' : 
                              c.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                            }`}>
                              {c.difficulty}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-slate-900">{c.title}</h3>
                            <p className="text-xs text-slate-400 italic font-medium">{c.hindiTitle}</p>
                          </div>

                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{c.history}</p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className={`text-xs font-bold flex items-center space-x-1 ${
                            isCompleted ? 'text-emerald-600' : 'text-slate-400'
                          }`}>
                            {isCompleted ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>Solved Successfully</span>
                              </>
                            ) : (
                              <span>Not Solved Yet</span>
                            )}
                          </span>

                          <button
                            onClick={() => {
                              setActiveCaseStudyId(c.id);
                              setCaseStage('intro');
                            }}
                            className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl transition-all shadow-sm"
                          >
                            Solve Case Study
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            ) : (
              // Active Case Simulator view
              (() => {
                const activeCase = INTERACTIVE_CASE_STUDIES.find(c => c.id === activeCaseStudyId)!;
                return (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
                    
                    {/* Header */}
                    <div className="bg-slate-50 border-b border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-1">
                        <button 
                          onClick={resetCaseStudy}
                          className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center space-x-1 mb-2"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Back to list</span>
                        </button>
                        <h2 className="text-xl font-bold text-slate-950">{activeCase.title}</h2>
                        <p className="text-xs text-slate-500 italic">{activeCase.hindiTitle}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-slate-200 text-slate-700 font-bold px-2.5 py-1 rounded-lg">
                          Stage: {caseStage.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Simulator Main split */}
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      
                      {/* Patient File Left column (5 cols) */}
                      <div className="lg:col-span-5 p-6 bg-slate-50/50 border-r border-slate-200 space-y-6">
                        <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center space-x-1.5 border-b border-slate-200 pb-2">
                          <FileText className="w-4 h-4 text-slate-500" />
                          <span>Veterinary Patient File</span>
                        </h3>

                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Anamnesis / History</span>
                            <p className="text-xs text-slate-700 leading-relaxed">{activeCase.history}</p>
                          </div>

                          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Physical Examination Findings</span>
                            <p className="text-xs text-slate-700 leading-relaxed">{activeCase.physicalExam}</p>
                          </div>

                          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl space-y-1.5">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Clinical Parameters Guide</span>
                            <ul className="text-[11px] text-slate-300 space-y-1 list-disc pl-4">
                              <li>Normal Cattle Temp: 101.5°F - 102.5°F</li>
                              <li>Normal Goat Temp: 102.5°F - 103.5°F</li>
                              <li>Subnormal temperature indicates shock or calcium deficiency.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Diagnostic Workspace Right Column (7 cols) */}
                      <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
                        
                        {/* Phase Intro */}
                        {caseStage === 'intro' && (
                          <div className="space-y-6 text-center py-8">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                              <Activity className="w-10 h-10" />
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-lg font-bold text-slate-800">Initiate Diagnosis Flow</h3>
                              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                                You have reviewed the anamnesis and clinical markers of the patient. Are you ready to formulate a tentative diagnostic hypothesis?
                              </p>
                            </div>
                            <button
                              onClick={() => setCaseStage('diagnosis')}
                              className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm"
                            >
                              Commence Diagnostics
                            </button>
                          </div>
                        )}

                        {/* Phase 1: Diagnosis Selection */}
                        {caseStage === 'diagnosis' && (
                          <div className="space-y-5">
                            <div className="space-y-1">
                              <span className="text-xs font-bold text-slate-400">Step 1 of 3</span>
                              <h3 className="text-lg font-bold text-slate-950">Formulate Tentative Diagnosis</h3>
                              <p className="text-xs text-slate-500">Based on symptoms and temperature, pick the most viable clinical condition.</p>
                            </div>

                            <div className="space-y-2">
                              {activeCase.optionsDiagnosis.map((opt, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedCaseDiagnosis(opt)}
                                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                                    selectedCaseDiagnosis === opt 
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold' 
                                      : 'border-slate-200 hover:bg-slate-50'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {selectedCaseDiagnosis === opt && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
                                </button>
                              ))}
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end">
                              <button
                                onClick={() => submitCaseStudySelection(activeCase)}
                                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all"
                              >
                                Submit Hypothesis
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Phase 2: Diagnostic Test */}
                        {caseStage === 'test' && (
                          <div className="space-y-5">
                            <div className="space-y-1">
                              <span className="text-xs font-bold text-slate-400">Step 2 of 3</span>
                              <h3 className="text-lg font-bold text-slate-950">Confirm via Laboratory/Field Test</h3>
                              <p className="text-xs text-slate-500">Select the correct diagnostic tool to substantiate your tentative hypothesis.</p>
                            </div>

                            <div className="space-y-2">
                              {activeCase.optionsTest.map((opt, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedCaseTest(opt)}
                                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                                    selectedCaseTest === opt 
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold' 
                                      : 'border-slate-200 hover:bg-slate-50'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {selectedCaseTest === opt && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
                                </button>
                              ))}
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end">
                              <button
                                onClick={() => submitCaseStudySelection(activeCase)}
                                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all"
                              >
                                Proceed to Therapeutics
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Phase 3: Treatment Selection */}
                        {caseStage === 'treatment' && (
                          <div className="space-y-5">
                            <div className="space-y-1">
                              <span className="text-xs font-bold text-slate-400">Step 3 of 3</span>
                              <h3 className="text-lg font-bold text-slate-950">Formulate Therapeutic Plan</h3>
                              <p className="text-xs text-slate-500">Select the primary clinical intervention. Choose correct drugs and safety strategies.</p>
                            </div>

                            <div className="space-y-2">
                              {activeCase.optionsTreatment.map((opt, idx) => {
                                const isSelected = selectedCaseTreatment.includes(opt);
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => handleTreatmentToggle(opt)}
                                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                                      isSelected 
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold' 
                                        : 'border-slate-200 hover:bg-slate-50'
                                    }`}
                                  >
                                    <span>{opt}</span>
                                    {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
                                  </button>
                                );
                              })}
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end">
                              <button
                                onClick={() => submitCaseStudySelection(activeCase)}
                                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all"
                              >
                                Finalize Therapy Plan
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Phase 4: AI Assessment & Scores */}
                        {caseStage === 'evaluation' && (
                          <div className="space-y-6">
                            
                            {evaluatingCase ? (
                              <div className="text-center py-12 space-y-4">
                                <div className="animate-spin rounded-full h-10 w-10 border-4 border-emerald-600 border-t-transparent mx-auto" />
                                <div className="space-y-1">
                                  <h4 className="font-bold text-slate-800 text-sm">Evaluating Clinical Submissions...</h4>
                                  <p className="text-xs text-slate-500">Dhanvantari AI is auditing diagnostic compatibility and safety metrics.</p>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-400">Clinical Evaluation</span>
                                  <span className="text-lg font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                                    Score: {caseScore}/10
                                  </span>
                                </div>

                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-slate-700 text-xs sm:text-sm space-y-4 max-h-[380px] overflow-y-auto">
                                  {caseEvaluationText.split('\n\n').map((para, idx) => {
                                    if (para.startsWith('### ')) {
                                      return <h3 key={idx} className="text-sm font-extrabold text-slate-900 pt-2 border-b border-slate-200 pb-1">{para.replace('### ', '')}</h3>;
                                    }
                                    if (para.startsWith('## ')) {
                                      return <h2 key={idx} className="text-sm font-black text-slate-900 pt-2">{para.replace('## ', '')}</h2>;
                                    }
                                    return (
                                      <p key={idx} className="leading-relaxed text-slate-600"
                                         dangerouslySetInnerHTML={{
                                           __html: para
                                             .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                             .replace(/_([^_]+)_/g, '<em>$1</em>')
                                         }}
                                      />
                                    );
                                  })}
                                </div>

                                <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl flex items-start space-x-3 text-xs leading-relaxed">
                                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <span className="font-bold block uppercase mb-0.5">Clinical Pearl (फील्ड का सच)</span>
                                    {activeCase.clinicalPearl}
                                  </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex justify-end space-x-2">
                                  <button
                                    onClick={() => {
                                      setCaseStage('intro');
                                      setSelectedCaseDiagnosis('');
                                      setSelectedCaseTest('');
                                      setSelectedCaseTreatment([]);
                                      setCaseScore(null);
                                      setCaseEvaluationText('');
                                    }}
                                    className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
                                  >
                                    Try Again
                                  </button>
                                  <button
                                    onClick={resetCaseStudy}
                                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                                  >
                                    Complete Case Study
                                  </button>
                                </div>
                              </div>
                            )}

                          </div>
                        )}

                      </div>

                    </div>

                  </div>
                );
              })()
            )}

          </div>
        )}

        {/* TAB 5: MOCK EXAMS PLATFORM */}
        {activeTab === 'exams' && (
          <div className="space-y-6">
            
            {/* Exam Hall Introduction */}
            {!inMockExam ? (
              <div className="space-y-6">
                
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-600 text-white p-2.5 rounded-2xl shadow-sm">
                      <FileText className="w-5 h-5 text-emerald-100" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">MP DAHET Mock Examination Portal</h2>
                      <p className="text-xs text-slate-500">Replicate standard Animal Husbandry Diploma entrance & final assessments</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 max-w-4xl">
                    Our mock exam engine randomly curates a balanced 10-Question full length paper covering veterinary Anatomy, core Physiology, Livestock Breeding, pharmacology routes, pathology indications, and medical diagnostics. Passing standard is **50%**.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-emerald-600" />
                      <div className="text-xs">
                        <span className="font-bold block text-slate-800">10 Minutes Limit</span>
                        <span className="text-slate-500">Strict countdown timer</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      <div className="text-xs">
                        <span className="font-bold block text-slate-800">10 High-Yield Questions</span>
                        <span className="text-slate-500">Curated from core syllabus</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center space-x-3">
                      <Award className="w-5 h-5 text-emerald-600" />
                      <div className="text-xs">
                        <span className="font-bold block text-slate-800">Real-time Performance review</span>
                        <span className="text-slate-500">Analyze answers per question</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exam triggers and history */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left: Start control (1 column) */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-slate-900 text-base">New Examination</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Ready to sit for evaluation? Please ensure a quiet space. The timer cannot be paused once initiated.
                      </p>
                    </div>
                    <button
                      onClick={startMockExam}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      Start Mock Exam
                    </button>
                  </div>

                  {/* Right: History table (2 columns) */}
                  <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="font-extrabold text-slate-900 text-base">Your Examination History</h3>
                    
                    {examHistory.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                              <th className="p-3 font-bold">Exam Date</th>
                              <th className="p-3 font-bold">Score</th>
                              <th className="p-3 font-bold">Accuracy</th>
                              <th className="p-3 font-bold text-right">Outcome</th>
                            </tr>
                          </thead>
                          <tbody>
                            {examHistory.map((trial, idx) => (
                              <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="p-3 text-slate-700 font-medium">{trial.timestamp}</td>
                                <td className="p-3 font-bold text-slate-900">{trial.score} / {trial.total}</td>
                                <td className="p-3 text-slate-600 font-bold">{Math.round(trial.percent)}%</td>
                                <td className="p-3 text-right">
                                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                    trial.passed ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-red-50 text-red-800 border border-red-100'
                                  }`}>
                                    {trial.passed ? 'PASS' : 'FAIL'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-400 text-xs">
                        No examination attempts recorded. Start your first exam above.
                      </div>
                    )}
                  </div>

                </div>

              </div>
            ) : (
              // Active Mock Exam Arena View
              (() => {
                const activeQuestion = examQuestions[currentExamIndex];
                const selectedOptionIdx = examAnswers[activeQuestion?.id];
                const isFlagged = flaggedExamQuestions.includes(activeQuestion?.id);

                return (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
                    
                    {/* Exam status header */}
                    <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-black">MP Veterinary Diploma Examination Hall</span>
                        <h3 className="text-base font-bold">DAHET General Veterinary Science Mock</h3>
                      </div>
                      
                      <div className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-xl border border-white/5">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-black text-emerald-400">
                          {Math.floor(examTimeLeft / 60)}:{(examTimeLeft % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Arena Layout Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      
                      {/* Navigator Sidebar (4 cols) */}
                      <div className="lg:col-span-4 p-6 bg-slate-50 border-r border-slate-200 space-y-6">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Question Navigator</h4>
                          <p className="text-[10px] text-slate-400">Navigate questions. Green represents answered, yellow represents flagged.</p>
                        </div>

                        {/* Grid of question buttons */}
                        <div className="grid grid-cols-5 gap-2">
                          {examQuestions.map((q, idx) => {
                            const isCurrent = currentExamIndex === idx;
                            const isAnswered = examAnswers[q.id] !== undefined;
                            const isQuestionFlagged = flaggedExamQuestions.includes(q.id);

                            let buttonStyle = 'bg-white border-slate-200 text-slate-700 hover:border-slate-300';
                            if (isCurrent) buttonStyle = 'bg-slate-900 text-white border-slate-900 scale-105';
                            else if (isQuestionFlagged) buttonStyle = 'bg-amber-100 border-amber-300 text-amber-800';
                            else if (isAnswered) buttonStyle = 'bg-emerald-50 border-emerald-300 text-emerald-800';

                            return (
                              <button
                                key={idx}
                                onClick={() => setCurrentExamIndex(idx)}
                                className={`h-10 w-10 rounded-xl border text-xs font-bold transition-all ${buttonStyle}`}
                              >
                                {idx + 1}
                              </button>
                            );
                          })}
                        </div>

                        {/* Legend */}
                        <div className="pt-4 border-t border-slate-200 space-y-2 text-[10px] text-slate-500">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-emerald-100 border border-emerald-300 rounded" />
                            <span>Answered Question</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded" />
                            <span>Flagged for Review</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-white border border-slate-200 rounded animate-pulse" />
                            <span>Unvisited/Unanswered</span>
                          </div>
                        </div>

                        <button
                          onClick={submitMockExam}
                          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                        >
                          Finish & Submit Paper
                        </button>
                      </div>

                      {/* Question Panel (8 cols) */}
                      <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
                        {activeQuestion && (
                          <div className="space-y-6">
                            
                            {/* Question and flag switch */}
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <span className="text-xs font-bold text-slate-400 uppercase">Question {currentExamIndex + 1} of {examQuestions.length}</span>
                                <h4 className="text-lg font-bold text-slate-950 leading-snug">{activeQuestion.question}</h4>
                              </div>

                              <button
                                onClick={() => toggleFlagQuestion(activeQuestion.id)}
                                className={`p-2.5 rounded-xl border transition-all ${
                                  isFlagged 
                                    ? 'bg-amber-100 border-amber-300 text-amber-800' 
                                    : 'border-slate-200 hover:bg-slate-50'
                                }`}
                                title={isFlagged ? "Unflag Question" : "Flag for review"}
                              >
                                <Flag className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Multiple choice options list */}
                            <div className="space-y-2.5">
                              {activeQuestion.options.map((opt, oIdx) => {
                                const isSelected = selectedOptionIdx === oIdx;
                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => handleExamAnswerSelect(oIdx)}
                                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                                      isSelected 
                                        ? 'bg-slate-100 border-slate-500 text-slate-900 font-bold' 
                                        : 'border-slate-200 hover:bg-slate-50'
                                    }`}
                                  >
                                    <span>{opt}</span>
                                    {isSelected && <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">✓</div>}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Nav buttons */}
                            <div className="pt-6 border-t border-slate-100 flex justify-between">
                              <button
                                onClick={() => setCurrentExamIndex((prev) => Math.max(0, prev - 1))}
                                disabled={currentExamIndex === 0}
                                className="px-4 py-2 border border-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
                              >
                                Previous
                              </button>
                              <button
                                onClick={() => setCurrentExamIndex((prev) => Math.min(examQuestions.length - 1, prev + 1))}
                                disabled={currentExamIndex + 1 === examQuestions.length}
                                className="px-4 py-2 bg-slate-900 disabled:opacity-40 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                              >
                                Next Question
                              </button>
                            </div>

                          </div>
                        )}
                      </div>

                    </div>

                  </div>
                );
              })()
            )}

            {/* Results Modal overlay */}
            {showExamResultsModal && examResults && (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
                  
                  <div className="text-center space-y-3">
                    <span className="text-5xl">{examResults.passed ? '🎉' : '📚'}</span>
                    <h3 className="text-xl font-bold text-slate-950">Mock Examination Submitted</h3>
                    <p className="text-xs text-slate-500">Your performance indicators have been calculated.</p>
                  </div>

                  {/* Highlight metrics */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Correct</span>
                      <p className="text-xl font-extrabold text-slate-900 mt-0.5">{examResults.score} / {examResults.total}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Accuracy</span>
                      <p className="text-xl font-extrabold text-slate-900 mt-0.5">{Math.round(examResults.percent)}%</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                      <p className={`text-sm font-extrabold mt-1.5 ${examResults.passed ? 'text-emerald-700' : 'text-red-700'}`}>
                        {examResults.passed ? 'PASSED' : 'FAILED'}
                      </p>
                    </div>
                  </div>

                  {/* Detailed question analysis list */}
                  <div className="space-y-4">
                    <h4 className="font-extrabold text-sm text-slate-800">Section-Wise Assessment Review</h4>
                    <div className="space-y-3">
                      {examQuestions.map((q, qIdx) => {
                        const state = examResults.answers[q.id];
                        const wasCorrect = state.selected === state.correct;
                        return (
                          <div key={q.id} className="border border-slate-100 rounded-xl p-4 space-y-2.5">
                            <div className="flex items-start justify-between gap-3">
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">Q{qIdx + 1}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                wasCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                              }`}>
                                {wasCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-slate-800">{q.question}</p>
                            
                            <div className="text-[11px] space-y-1 font-medium">
                              <p className="text-slate-600">Your Selection: <span className="text-slate-950 font-bold">{state.selected !== -1 ? q.options[state.selected] : 'Not Answered'}</span></p>
                              <p className="text-emerald-700">Correct Answer: <span className="font-bold">{q.options[state.correct]}</span></p>
                            </div>

                            <div className="bg-slate-50 p-3 rounded-lg text-[10px] text-slate-500 leading-relaxed italic border border-slate-100">
                              <span className="font-bold text-slate-700 block uppercase not-italic mb-0.5">Explanation:</span>
                              {q.explanation}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => setShowExamResultsModal(false)}
                      className="px-5 py-2.5 bg-slate-950 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                    >
                      Close Report
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer system branding details */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 space-y-3 sm:space-y-0">
          <p>© 2026 MP Veterinary Diploma Study & AI Companion. Nanaji Deshmukh University Syllabus Standard.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-emerald-700 font-medium">
              <Database className="w-3.5 h-3.5 mr-1" />
              <span>Syllabus Indexed Offline</span>
            </span>
            <span>Study Version 2.4.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
