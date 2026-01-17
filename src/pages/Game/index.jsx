import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Mole from './Mole';
import ScoreBoard from './ScoreBoard';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { playSound } from '@/utils/audio';
import { useScrollLock } from '../../hooks/useScrollLock';

export default function Game() {
  useScrollLock();
  const navigate = useNavigate();
  const location = useLocation();
  const difficulty = location.state?.difficulty || 'easy';
  const duration = location.state?.duration || 60;
  
  // Game State
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Refs for stale closure prevention
  const scoreRef = useRef(score);
  useEffect(() => { scoreRef.current = score; }, [score]);
  
  // Logic State
  // activeIndices: Array of currently visible mole indices for rendering
  const [activeIndices, setActiveIndices] = useState([]);
  // hitIndices: Array of indices that are currently in "hit" state (showing feedback)
  const [hitIndices, setHitIndices] = useState([]);
  
  // Settings
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [speed, setSpeed] = useState(location.state?.speed || 'slow'); // 'slow' | 'fast'
  const [moleSize, setMoleSize] = useState('normal'); // 'normal' | 'large'
  
  const timerRef = useRef(null);
  
  // Performance Tracking Refs
  const totalSpawns = useRef(0);
  const spawnTimes = useRef(new Map()); // Map<index, timestamp>
  const reactionHistory = useRef([]); // Array<ms>
  
  // Cycle Management
  // We use refs to track the state of each spawn cycle independently
  // This allows "Hit" events to fast-forward the specific cycle that spawned the mole
  const cycle1Timeout = useRef(null);
  const cycle2Timeout = useRef(null);
  const cycle1Mole = useRef(null); // The mole index currently managed by Cycle 1
  const cycle2Mole = useRef(null); // The mole index currently managed by Cycle 2
  
  // Shared availability tracker for collision detection (synchronous)
  const occupiedHoles = useRef(new Set());

  // Constants
  const SPEEDS = {
    slow: { visible: 1500, visibleMin: 1000, gap: 1000, gapMin: 500 },
    fast: { visible: 800, visibleMin: 600, gap: 500, gapMin: 300 }
  };

  // Helper to get random time within range (adds variety)
  const getRandomTime = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Start Game
  useEffect(() => {
    setIsPlaying(true);
    return () => stopGame();
  }, []);

  // Timer Loop
  useEffect(() => {
    if (!isPlaying || settingsOpen) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isPlaying, settingsOpen]);

  // Spawn Cycle Logic
  const runSpawnCycle = useCallback((cycleId) => {
    if (!isPlaying || settingsOpen) return;

    const currentSpeed = SPEEDS[speed];
    const timeoutRef = cycleId === 1 ? cycle1Timeout : cycle2Timeout;
    const moleRef = cycleId === 1 ? cycle1Mole : cycle2Mole;
    
    // Safety: Clear any existing timer for this cycle to prevent overlaps
    clearTimeout(timeoutRef.current);

    // 1. Wait for GAP
    const gapTime = getRandomTime(currentSpeed.gapMin, currentSpeed.gap);

    timeoutRef.current = setTimeout(() => {
      if (!isPlaying || settingsOpen) return;

      // 2. Pick a hole
      let nextMole;
      let attempts = 0;
      do {
        nextMole = Math.floor(Math.random() * 9);
        attempts++;
      } while (occupiedHoles.current.has(nextMole) && attempts < 20);

      // If we couldn't find a spot (grid full), just wait a bit and try again
      if (occupiedHoles.current.has(nextMole)) {
        runSpawnCycle(cycleId);
        return;
      }

      // 3. Spawn Mole
      occupiedHoles.current.add(nextMole);
      moleRef.current = nextMole;
      
      // Track Metrics
      totalSpawns.current += 1;
      spawnTimes.current.set(nextMole, Date.now());

      setActiveIndices(prev => [...prev, nextMole]);

      // 4. Set timer to Hide Mole
      const visibleTime = getRandomTime(currentSpeed.visibleMin, currentSpeed.visible);
      
      timeoutRef.current = setTimeout(() => {
        // Natural expiration
        occupiedHoles.current.delete(nextMole);
        if (moleRef.current === nextMole) {
           moleRef.current = null;
        }
        setActiveIndices(prev => prev.filter(i => i !== nextMole));
        
        // Loop
        runSpawnCycle(cycleId);
      }, visibleTime);

    }, gapTime);

  }, [isPlaying, settingsOpen, speed]);

  // Initialize Cycles
  useEffect(() => {
    if (isPlaying && !settingsOpen) {
      // Start Cycle 1
      runSpawnCycle(1);

      // Start Cycle 2 only if Hard mode
      if (difficulty === 'hard') {
        // Add a small initial offset so they don't spawn exactly safely together
        setTimeout(() => runSpawnCycle(2), 500);
      }
    }

    return () => {
      clearTimeout(cycle1Timeout.current);
      clearTimeout(cycle2Timeout.current);
      
      // Cleanup board state to prevent orphans on pause/settings change
      cycle1Mole.current = null;
      cycle2Mole.current = null;
      occupiedHoles.current.clear();
      setActiveIndices([]);
      setHitIndices([]);
    };
  }, [isPlaying, settingsOpen, speed, difficulty, runSpawnCycle]);


  const handleHit = (index) => {
    // Check if valid hit
    if (occupiedHoles.current.has(index) && !hitIndices.includes(index)) {
      setScore(s => s + 1);
      
      // Track Reaction Time
      const spawnTime = spawnTimes.current.get(index);
      if (spawnTime) {
        const reactionTime = Date.now() - spawnTime;
        reactionHistory.current.push(reactionTime);
        spawnTimes.current.delete(index);
      }

      // Audio Feedback
      playSound();
      
      // Visual Feedback
      setHitIndices(prev => [...prev, index]);
      
      // Cleanup function to run
      const cleanupHit = (cycleRunner) => {
          occupiedHoles.current.delete(index);
          
          setTimeout(() => {
            setActiveIndices(prev => prev.filter(i => i !== index));
            setHitIndices(prev => prev.filter(i => i !== index));
            // Restart the cycle that owned this (or default to 1 if orphan)
            if (cycleRunner) cycleRunner(); 
          }, 200); 
      };

      // Determine owner and fast-forward
      if (cycle1Mole.current === index) {
        clearTimeout(cycle1Timeout.current);
        cycle1Mole.current = null;
        cleanupHit(() => runSpawnCycle(1));
        
      } else if (cycle2Mole.current === index) {
        clearTimeout(cycle2Timeout.current);
        cycle2Mole.current = null;
        cleanupHit(() => runSpawnCycle(2));
      } else {
        // Orphan case: Mole exists in occupiedHoles/activeIndices but neither cycle claims it.
        // This happens if cycles reset (e.g. settings change) but state wasn't cleared, 
        // OR logic race condition. We must clean it up to avoid stuck "Good Job" message.
        cleanupHit(null); // Don't restart a cycle, as we don't know which one it was. The loops are likely already running.
      }
    }
  };

  const stopGame = () => {
    clearInterval(timerRef.current);
    clearTimeout(cycle1Timeout.current);
    clearTimeout(cycle2Timeout.current);
  };

  const endGame = () => {
    stopGame();
    setIsPlaying(false);
    navigate('/result', { 
      state: { 
        score: scoreRef.current,
        totalSpawns: totalSpawns.current,
        reactionHistory: reactionHistory.current
      } 
    });
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
    if (!settingsOpen) {
      // Pausing: Clears are handled by useEffect dependency content, 
      // but logic relies on !settingsOpen to run loops.
    }
  };

  return (
    <div className={`min-h-dvh flex items-center justify-center p-4 font-sans touch-manipulation overflow-hidden bg-amber-50 ${moleSize === 'large' ? 'origin-top' : ''}`}>
      
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      {/* Main Game Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-sm landscape:max-w-4xl flex flex-col landscape:flex-row relative z-10 border-4 border-amber-100 ring-4 ring-white/50">
        
        {/* Left Panel: Stats & Controls */}
        <div className="p-6 bg-amber-50/50 landscape:w-1/3 landscape:border-r-4 landscape:border-amber-100 flex flex-col justify-center items-center landscape:items-stretch relative">
          
          <div className="w-full flex justify-between items-center mb-4 landscape:mb-8">
             <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">分數</span>
                <span className="text-4xl font-black text-amber-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-amber-100 min-w-[3ch] text-center">
                  {score}
                </span>
             </div>

             <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">時間</span>
                <span className={`text-4xl font-black px-4 py-2 rounded-xl shadow-sm border min-w-[3ch] text-center ${timeLeft <= 10 ? 'text-red-500 bg-red-50 border-red-100 animate-pulse' : 'text-blue-500 bg-white border-blue-100'}`}>
                  {timeLeft}
                </span>
             </div>
          </div>
          
           <div className="mb-4 text-center">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${difficulty === 'hard' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                {difficulty === 'hard' ? '挑戰模式' : '簡單模式'}
              </span>
           </div>

          <button 
            onClick={toggleSettings}
            className="p-3 bg-white rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 border-2 border-dashed border-gray-200 transition-colors mx-auto landscape:mx-0 landscape:mt-auto landscape:w-full landscape:flex landscape:items-center landscape:justify-center landscape:gap-2 group"
          >
            <Cog6ToothIcon className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
            <span className="hidden landscape:inline font-bold text-sm">遊戲設定</span>
          </button>
        </div>

        {/* Right Panel: Game Grid */}
        <div className="landscape:w-2/3 p-4 bg-green-50/50 flex items-center justify-center relative overflow-hidden">
           {/* Ground Texture */}
           <div className="absolute inset-0 opacity-5 pointer-events-none" 
              style={{ backgroundImage: 'radial-gradient(#15803d 1px, transparent 1px)', backgroundSize: '16px 16px' }} 
           />

          <div className={`grid grid-cols-3 gap-3 md:gap-6 w-full max-w-[320px] landscape:max-w-md aspect-square ${moleSize === 'large' ? 'scale-110' : ''}`}>
            {Array.from({ length: 9 }).map((_, index) => (
              <Mole 
                key={index}
                isVisible={activeIndices.includes(index)}
                isHit={hitIndices.includes(index)}
                onClick={() => handleHit(index)}
              />
            ))}
          </div>
        </div>

        {/* Settings Overlay - integrated into card */}
        {settingsOpen && (
          <div className="absolute inset-0 z-50 bg-white/90 flex items-center justify-center backdrop-blur-sm animate-fade-in">
            <div className="text-center w-full max-w-xs">
              <h2 className="text-3xl font-black text-gray-800 mb-8 tracking-tight">暫停 / 設定</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-extrabold text-gray-400 uppercase mb-2 tracking-widest">速度</label>
                  <div className="inline-flex bg-gray-100 p-1 rounded-full">
                    <button 
                      onClick={() => setSpeed('slow')}
                      className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${speed === 'slow' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      正常
                    </button>
                    <button 
                      onClick={() => setSpeed('fast')}
                      className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${speed === 'fast' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      快速
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-400 uppercase mb-2 tracking-widest">地鼠大小</label>
                  <div className="inline-flex bg-gray-100 p-1 rounded-full">
                    <button 
                      onClick={() => setMoleSize('normal')}
                      className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${moleSize === 'normal' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      標準
                    </button>
                    <button 
                      onClick={() => setMoleSize('large')}
                      className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${moleSize === 'large' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      巨大
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-10">
                <button 
                  onClick={toggleSettings}
                  className="w-full px-8 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform transition hover:-translate-y-0.5 active:translate-y-0"
                >
                  繼續遊戲
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="w-full px-8 py-3 bg-white hover:bg-red-50 text-red-500 border-2 border-red-100 hover:border-red-200 rounded-xl font-bold transition-all"
                >
                  離開遊戲
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

