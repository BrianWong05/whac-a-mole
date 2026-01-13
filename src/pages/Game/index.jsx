import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Mole from './Mole';
import ScoreBoard from './ScoreBoard';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

export default function Game() {
  const navigate = useNavigate();
  
  // Game State
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Logic State
  const [activeMole, setActiveMole] = useState(null); // index 0-8 or null
  const [hitMole, setHitMole] = useState(null); // index 0-8 or null
  
  // Settings
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [speed, setSpeed] = useState('slow'); // 'slow' | 'fast'
  const [moleSize, setMoleSize] = useState('normal'); // 'normal' | 'large'
  
  const timerRef = useRef(null);
  const moleTimerRef = useRef(null);

  // Constants
  const SPEEDS = {
    slow: { visible: 1500, gap: 1000 },
    fast: { visible: 800, gap: 500 }
  };

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

  // Game Loop (Mole Appearance)
  const scheduleNextMole = useCallback(() => {
    if (!isPlaying || settingsOpen) return;

    // Wait for "gap" then show new mole
    const currentSpeed = SPEEDS[speed];
    
    moleTimerRef.current = setTimeout(() => {
      // Pick random hole loop
      let nextMole;
      do {
        nextMole = Math.floor(Math.random() * 9);
      } while (nextMole === activeMole); // Avoid same hole twice in a row (optional, but good)

      setActiveMole(nextMole);
      setHitMole(null); // Reset hit state

      // Hide after "visible" duration
      moleTimerRef.current = setTimeout(() => {
        setActiveMole(null);
        // Schedule next
        scheduleNextMole();
      }, currentSpeed.visible);

    }, currentSpeed.gap);

  }, [activeMole, isPlaying, settingsOpen, speed]);

  useEffect(() => {
    if (isPlaying && !settingsOpen) {
      scheduleNextMole();
    }
    return () => clearTimeout(moleTimerRef.current);
  }, [isPlaying, settingsOpen, speed]); // Re-schedule if settings change


  const handleHit = (index) => {
    if (index === activeMole && hitMole === null) {
      setScore(s => s + 1);
      setHitMole(index);
      
      // Stop the "disappear" timer and schedule next one quickly? 
      // Or just let the hit animation play then fade out?
      // Let's clear current timeout and schedule next mole after short delay to show "Great Job"
      clearTimeout(moleTimerRef.current);
      
      // Keep "activeMole" set so the hole isn't empty, but set "hitMole" to show feedback
      // Wait for animation then move on
      moleTimerRef.current = setTimeout(() => {
        setActiveMole(null);
        setHitMole(null);
        scheduleNextMole();
      }, 1000); // 1s to see the feedback
    }
  };

  const stopGame = () => {
    clearInterval(timerRef.current);
    clearTimeout(moleTimerRef.current);
  };

  const endGame = () => {
    stopGame();
    setIsPlaying(false);
    navigate('/result', { state: { score } });
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

          <button 
            onClick={toggleSettings}
            className="p-3 bg-white rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 border-2 border-dashed border-gray-200 transition-colors mx-auto landscape:mx-0 landscape:mt-auto landscape:w-full landscape:flex landscape:items-center landscape:justify-center landscape:gap-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300">
              <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.819l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.922-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
            </svg>
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
                isVisible={activeMole === index}
                isHit={hitMole === index}
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

              <button 
                onClick={toggleSettings}
                className="mt-10 px-8 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform transition hover:-translate-y-0.5 active:translate-y-0"
              >
                繼續遊戲
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

