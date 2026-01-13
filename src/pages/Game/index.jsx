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
    <div className={`min-h-dvh flex flex-col items-center bg-green-50 p-4 font-sans touch-manipulation relative overflow-hidden ${moleSize === 'large' ? 'scale-110 origin-top' : ''}`}>
      
      {/* Header / Score */}
      <div className="w-full max-w-md relative z-30">
        <ScoreBoard score={score} timeLeft={timeLeft} />
        
        <button 
          onClick={toggleSettings}
          className="absolute -top-1 right-2 p-2 bg-white/50 rounded-full hover:bg-white text-gray-600 hover:text-gray-900 border border-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.819l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.922-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Settings Modal */}
      {settingsOpen && (
        <div className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 text-center animate-bounce-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">遊戲設定</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-500 mb-2">速度</label>
              <div className="flex justify-center space-x-2">
                <button 
                  onClick={() => setSpeed('slow')}
                  className={`px-4 py-2 rounded-full font-bold ${speed === 'slow' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  慢
                </button>
                <button 
                  onClick={() => setSpeed('fast')}
                  className={`px-4 py-2 rounded-full font-bold ${speed === 'fast' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  快
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-500 mb-2">地鼠大小</label>
              <div className="flex justify-center space-x-2">
                <button 
                  onClick={() => setMoleSize('normal')}
                  className={`px-4 py-2 rounded-full font-bold ${moleSize === 'normal' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  正常
                </button>
                <button 
                  onClick={() => setMoleSize('large')}
                  className={`px-4 py-2 rounded-full font-bold ${moleSize === 'large' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  大
                </button>
              </div>
            </div>

            <button 
              onClick={toggleSettings}
              className="w-full bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-3 rounded-xl shadow-lg"
            >
              回到遊戲
            </button>
          </div>
        </div>
      )}

      {/* Game Grid */}
      <div className={`grid grid-cols-3 gap-8 w-full max-w-md p-4 mt-4 transition-transform ${moleSize === 'large' ? 'scale-110' : ''}`}>
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
  );
}
