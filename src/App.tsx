import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  BarChart3,
  BookOpen,
  ClipboardList,
  Compass,
  Home,
  Info,
  Layers,
  Menu,
  X,
} from 'lucide-react';
import { MisterJoPlayer } from './components/MisterJoPlayer';
import { AboutView } from './components/Views/AboutView';
import { AnalysisView } from './components/Views/AnalysisView';
import { FbdLabView } from './components/Views/FbdLabView';
import { GalleryView } from './components/Views/GalleryView';
import { HomeView } from './components/Views/HomeView';
import { PracticeView } from './components/Views/PracticeView';
import { ProgressView } from './components/Views/ProgressView';
import { TheoryView } from './components/Views/TheoryView';
import { ALL_PROBLEMS } from './data/problems';
import { MenuViewId, UserProgressState } from './types/physics';
import {
  MisterJoNarrator,
  SpeechSegment,
  TtsPlaybackStatus,
} from './utils/speechUtils';

const STORAGE_KEY = 'olympiad_physics_lab_soal4_v1';

const DEFAULT_PROGRESS: UserProgressState = {
  attempts: {},
  completedTheoryLevels: [],
  lastVisitedProblemId: 1,
};

function loadProgress(): UserProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<UserProgressState>;
    return {
      attempts: parsed.attempts ?? {},
      completedTheoryLevels: Array.isArray(parsed.completedTheoryLevels)
        ? parsed.completedTheoryLevels
        : [],
      lastVisitedProblemId:
        typeof parsed.lastVisitedProblemId === 'number'
          ? parsed.lastVisitedProblemId
          : 1,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

const MENU_ITEMS: {
  id: MenuViewId;
  label: string;
  icon: typeof Home;
}[] = [
  { id: 'beranda', label: 'BERANDA', icon: Home },
  { id: 'analisis', label: 'ANALISIS SOAL NOMOR 4', icon: Compass },
  { id: 'teori', label: 'PUSAT BELAJAR TEORI', icon: BookOpen },
  { id: 'galeri', label: 'GALERI ANIMASI FISIKA', icon: Activity },
  { id: 'latihan', label: 'LATIHAN 15 SOAL', icon: ClipboardList },
  { id: 'fbd-lab', label: 'FREE BODY DIAGRAM LAB', icon: Layers },
  { id: 'progres', label: 'PROGRES BELAJAR', icon: BarChart3 },
  { id: 'tentang', label: 'TENTANG APLIKASI', icon: Info },
];

export default function App() {
  const [activeView, setActiveView] = useState<MenuViewId>('beranda');
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(
    null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [progress, setProgress] = useState<UserProgressState>(() =>
    loadProgress()
  );

  // Mister Jo TTS State
  const [ttsTitle, setTtsTitle] = useState('Pengantar Olympiad Physics Lab');
  const [ttsStatus, setTtsStatus] = useState<TtsPlaybackStatus>('idle');
  const [ttsRate, setTtsRate] = useState(1.0);
  const [activeSegment, setActiveSegment] = useState<SpeechSegment | null>(
    null
  );
  const narratorRef = useRef<MisterJoNarrator | null>(null);

  useEffect(() => {
    const narrator = new MisterJoNarrator({
      onStatusChange: setTtsStatus,
      onSegmentChange: (seg) => setActiveSegment(seg),
      onFinish: () => setActiveSegment(null),
    });
    narratorRef.current = narrator;
    return () => narrator.stop(true);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  const handleNavigate = (view: MenuViewId, problemId?: number) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    if (view === 'latihan') {
      setSelectedProblemId(problemId ?? null);
      if (problemId) {
        setProgress((prev) => ({ ...prev, lastVisitedProblemId: problemId }));
      }
    }
  };

  const handleSelectProblem = (id: number | null) => {
    setSelectedProblemId(id);
    if (id !== null) {
      setProgress((prev) => ({ ...prev, lastVisitedProblemId: id }));
    }
  };

  const handleRecordAttempt = (
    problemId: number,
    input: string,
    isCorrect: boolean,
    hintsUsed: number
  ) => {
    setProgress((prev) => {
      const existing = prev.attempts[problemId];
      return {
        ...prev,
        attempts: {
          ...prev.attempts,
          [problemId]: {
            problemId,
            lastInput: input,
            isCorrect,
            attemptsCount: (existing?.attemptsCount ?? 0) + 1,
            hintsUsed: Math.max(existing?.hintsUsed ?? 0, hintsUsed),
            updatedAt: new Date().toISOString(),
          },
        },
      };
    });
  };

  const handleToggleTheoryLevel = (level: number) => {
    setProgress((prev) => {
      const exists = prev.completedTheoryLevels.includes(level);
      return {
        ...prev,
        completedTheoryLevels: exists
          ? prev.completedTheoryLevels.filter((l) => l !== level)
          : [...prev.completedTheoryLevels, level].sort((a, b) => a - b),
      };
    });
  };

  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const handleSpeakSegments = (title: string, segments: SpeechSegment[]) => {
    setTtsTitle(title);
    narratorRef.current?.play(segments, 0);
  };

  const handleSpeakIntro = () => {
    handleSpeakSegments('Pengantar Belajar bersama Mister Jo', [
      {
        id: 'intro-1',
        label: 'Sapaan Mister Jo',
        text: 'Halo, saya Mister Jo. Selamat datang di Olympiad Physics Lab. Pada platform ini kita akan menguasai tuntas satu topik penting dari Soal Nomor 4 OSK Fisika 2026, yaitu gerak saling mengejar pada poligon beraturan.',
      },
      {
        id: 'intro-2',
        label: 'Panduan Belajar Bertahap',
        text: 'Mulailah dari menu Analisis Soal Nomor 4, lanjutkan ke Pusat Belajar Teori lima level, uji intuisi Anda melalui Galeri Animasi dan Free Body Diagram Lab, lalu taklukkan seluruh lima belas soal latihan numerik.',
      },
    ]);
  };

  const correctCount = Object.values(progress.attempts).filter(
    (a) => a.isCorrect
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FF] text-[#1E1433]">
      {/* Top Bar Contract: 3 clean zones separated by gap-8 */}
      <header className="sticky top-0 z-30 border-b border-[#E4DDF7] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-4 sm:px-6 py-3">
          {/* Zone 1: Single-line Brand Title */}
          <button
            type="button"
            onClick={() => handleNavigate('beranda')}
            className="text-base sm:text-lg font-extrabold tracking-tight text-[#4C1D95] whitespace-nowrap shrink-0 cursor-pointer"
          >
            OLYMPIAD PHYSICS LAB
          </button>

          {/* Zone 2: 4 concise single-line text nav links on desktop */}
          <nav
            className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#5B4D7A]"
            aria-label="Navigasi Cepat"
          >
            <button
              type="button"
              onClick={() => handleNavigate('beranda')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                activeView === 'beranda'
                  ? 'border-[#6D28D9] text-[#1E1433]'
                  : 'border-transparent hover:text-[#1E1433]'
              }`}
            >
              Beranda
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('analisis')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                activeView === 'analisis'
                  ? 'border-[#6D28D9] text-[#1E1433]'
                  : 'border-transparent hover:text-[#1E1433]'
              }`}
            >
              Analisis Soal 4
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('teori')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                activeView === 'teori'
                  ? 'border-[#6D28D9] text-[#1E1433]'
                  : 'border-transparent hover:text-[#1E1433]'
              }`}
            >
              Pusat Teori
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('latihan')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                activeView === 'latihan'
                  ? 'border-[#6D28D9] text-[#1E1433]'
                  : 'border-transparent hover:text-[#1E1433]'
              }`}
            >
              Latihan 15 Soal
            </button>
          </nav>

          {/* Zone 3: 1 primary CTA + mobile drawer toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleNavigate('progres')}
              className="hidden sm:inline-flex items-center rounded-lg bg-[#6D28D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5B21B6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Progres ({correctCount}/{ALL_PROBLEMS.length})
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Tutup Menu Navigasi' : 'Buka Menu Navigasi'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden inline-flex items-center gap-1.5 rounded-lg border border-[#E4DDF7] bg-white px-3 py-2 text-xs font-semibold text-[#4C1D95] cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E4DDF7] bg-white px-4 py-3">
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1.5" aria-label="Menu Utama Mobile">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-semibold text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#4C1D95] text-white'
                      : 'text-[#473B66] hover:bg-[#F5F2FF]'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main 2-Zone Shell: Left 8-Menu Sidebar + Workspace */}
      <div className="mx-auto w-full max-w-[1440px] flex-1 flex flex-col lg:flex-row gap-6 px-4 sm:px-6 py-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-20 space-y-4">
            <nav
              className="rounded-2xl border border-[#E4DDF7] bg-white p-2.5 space-y-1"
              aria-label="Menu Utama"
            >
              <div className="px-3 py-2 text-[11px] font-bold text-[#6B5B95]">
                Navigasi Pembelajaran
              </div>
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#4C1D95] text-white'
                        : 'text-[#473B66] hover:bg-[#F5F2FF] hover:text-[#1E1433]'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="rounded-2xl border border-[#E4DDF7] bg-white p-4 space-y-2">
              <div className="text-xs font-bold text-[#4C1D95]">
                Pengajar Pembimbing
              </div>
              <div className="text-sm font-extrabold text-[#1E1433]">
                MISTER JO
              </div>
              <p className="text-xs leading-relaxed text-[#5B4D7A]">
                Narator suara interaktif untuk teori, FBD, dan 12 tahap pembahasan buku teks.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Global Mister Jo Player Bar */}
          <MisterJoPlayer
            title={ttsTitle}
            status={ttsStatus}
            rate={ttsRate}
            activeSegment={activeSegment}
            onPlay={handleSpeakIntro}
            onPause={() => narratorRef.current?.pause()}
            onResume={() => narratorRef.current?.resume()}
            onReplay={() => narratorRef.current?.replay()}
            onStop={() => narratorRef.current?.stop()}
            onRateChange={(r) => {
              setTtsRate(r);
              narratorRef.current?.setRate(r);
            }}
            compact
          />

          {activeView === 'beranda' && (
            <HomeView
              progress={progress}
              onNavigate={handleNavigate}
              onSpeakIntro={handleSpeakIntro}
            />
          )}

          {activeView === 'analisis' && (
            <AnalysisView
              onSpeakSegments={handleSpeakSegments}
              activeSegmentId={activeSegment?.id ?? null}
            />
          )}

          {activeView === 'teori' && (
            <TheoryView
              completedLevels={progress.completedTheoryLevels}
              onToggleLevelComplete={handleToggleTheoryLevel}
              onSpeakSegments={handleSpeakSegments}
              activeSegmentId={activeSegment?.id ?? null}
            />
          )}

          {activeView === 'galeri' && <GalleryView />}

          {activeView === 'latihan' && (
            <PracticeView
              selectedProblemId={selectedProblemId}
              onSelectProblem={handleSelectProblem}
              attempts={progress.attempts}
              onRecordAttempt={handleRecordAttempt}
              onSpeakSegments={handleSpeakSegments}
              onReplayNarration={() => narratorRef.current?.replay()}
              activeSegmentId={activeSegment?.id ?? null}
              activeFbdStep={activeSegment?.fbdStep}
            />
          )}

          {activeView === 'fbd-lab' && (
            <FbdLabView
              onSpeakSegments={handleSpeakSegments}
              activeFbdStep={activeSegment?.fbdStep}
            />
          )}

          {activeView === 'progres' && (
            <ProgressView
              progress={progress}
              onOpenProblem={(id) => handleNavigate('latihan', id)}
              onResetProgress={handleResetProgress}
            />
          )}

          {activeView === 'tentang' && <AboutView />}
        </main>
      </div>

      {/* Quiet Academic Footer */}
      <footer className="border-t border-[#E4DDF7] bg-white py-4 px-6 text-xs text-[#6B5B95]">
        <div className="mx-auto max-w-[1440px] flex flex-wrap items-center justify-between gap-2">
          <span>
            Olympiad Physics Lab · Pengembangan Khusus OSK Fisika SMA 2026 Soal Nomor 4
          </span>
          <span>Master the Concept. Understand the Physics. Conquer the Olympiad.</span>
        </div>
      </footer>
    </div>
  );
}
