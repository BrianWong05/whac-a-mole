import { useNavigate, useLocation } from 'react-router-dom';

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score = 0, totalSpawns = 0, reactionHistory = [] } = location.state || {}; // Destructure with defaults

  const hitRate = totalSpawns > 0 ? Math.round((score / totalSpawns) * 100) : 0;
  const avgReaction = reactionHistory.length > 0
    ? (reactionHistory.reduce((a, b) => a + b, 0) / reactionHistory.length / 1000).toFixed(2)
    : "0.00";

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
        
        <div className="p-6 bg-blue-50 rounded-3xl shadow-inner border-2 border-blue-100 mb-6 w-full">
          <p className="text-blue-400 text-sm uppercase font-bold tracking-widest mb-1">你的分數</p>
          <div className="text-6xl font-black text-blue-500 mb-2 drop-shadow-sm">{score}</div>
          <p className="text-lg text-amber-500 font-black flex items-center justify-center gap-2">
            做得好! <span>🎉</span>
          </p>
        </div>

        {/* Performance Stats Grid */}
        <div className="grid grid-cols-3 gap-2 w-full mb-6">
          <div className="bg-amber-50 p-2 rounded-xl border border-amber-100 flex flex-col items-center">
             <span className="text-[10px] bg-amber-100 px-2 rounded-full font-bold text-amber-600 uppercase mb-1">總出現</span>
             <span className="text-xl font-black text-amber-600">{totalSpawns}</span>
          </div>
           <div className="bg-amber-50 p-2 rounded-xl border border-amber-100 flex flex-col items-center">
             <span className="text-[10px] bg-amber-100 px-2 rounded-full font-bold text-amber-600 uppercase mb-1">命中率</span>
             <span className="text-xl font-black text-amber-600">{hitRate}%</span>
          </div>
           <div className="bg-amber-50 p-2 rounded-xl border border-amber-100 flex flex-col items-center">
             <span className="text-[10px] bg-amber-100 px-2 rounded-full font-bold text-amber-600 uppercase mb-1">平均反應</span>
             <span className="text-xl font-black text-amber-600">{avgReaction}s</span>
          </div>
        </div>

        {/* Detailed Reaction Log */}
        {reactionHistory.length > 0 && (
           <div className="w-full bg-gray-50 rounded-2xl mb-6 border border-gray-100 overflow-hidden text-sm">
              <div className="bg-gray-100/50 px-4 py-3 border-b border-gray-200/50 backdrop-blur-sm">
                <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest text-left">反應時間記錄</h3>
              </div>
              
              <div className="max-h-48 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
                <div className="space-y-1">
                  {reactionHistory.map((time, i) => (
                    <div key={i} className="flex justify-between px-3 py-2 text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all text-sm items-center">
                      <span className="font-bold text-gray-400"># {i + 1}</span>
                      <span className="font-mono text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded text-xs">
                        {(time / 1000).toFixed(2)}s
                      </span>
                    </div>
                  ))}
                </div>
              </div>
           </div>
        )}

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
