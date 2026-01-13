import { useNavigate, useLocation } from 'react-router-dom';

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score || 0;

  return (

    <div className="flex flex-col items-center justify-center min-h-dvh bg-amber-50 p-4 font-sans relative overflow-hidden">
      
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-100 ring-4 ring-white/50 p-8 text-center animate-bounce-in">
        
        <h1 className="text-4xl font-black text-amber-600 mb-6 drop-shadow-sm">
          遊戲結束!
        </h1>
        
        <div className="p-8 bg-blue-50 rounded-3xl shadow-inner border-2 border-blue-100 mb-8 w-full">
          <p className="text-blue-400 text-sm uppercase font-bold tracking-widest mb-2">你的分數</p>
          <div className="text-7xl font-black text-blue-500 mb-4 drop-shadow-sm">{score}</div>
          <p className="text-xl text-amber-500 font-black flex items-center justify-center gap-2">
            做得好! <span>🎉</span>
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/game')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-[0_6px_0_rgb(37,99,235)] hover:shadow-[0_3px_0_rgb(37,99,235)] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all"
          >
            再玩一次
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-gray-600 font-bold text-sm py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            回首頁
          </button>
        </div>
      </div>
    </div>
  );

}
