import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();


  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-amber-50 p-4 font-sans relative overflow-hidden">
      
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-100 ring-4 ring-white/50 p-8 text-center">
        
        <div className="mb-8">
           <h1 className="text-5xl font-black text-amber-600 mb-2 tracking-wide drop-shadow-sm leading-tight">
            手眼協調<br/>
            <span className="text-orange-500">大冒險</span>
          </h1>
          <div className="h-1 w-24 bg-amber-200 mx-auto rounded-full mt-4"></div>
        </div>
        
        <div className="mb-10 p-6 bg-orange-50 rounded-2xl border-2 border-orange-100">
          <p className="text-gray-600 text-lg font-bold mb-2">準備好了嗎？</p>
          <p className="text-gray-500 text-sm">點擊地鼠來得分，小心不要點錯了！</p>
        </div>

        <button
          onClick={() => navigate('/game')}
          className="w-full bg-green-500 hover:bg-green-600 text-white text-2xl font-bold py-5 px-8 rounded-2xl shadow-[0_8px_0_rgb(21,128,61)] hover:shadow-[0_4px_0_rgb(21,128,61)] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all"
        >
          開始遊戲
        </button>

        <div className="mt-8 text-xs text-gray-400 font-bold uppercase tracking-widest">
          React Game Demo
        </div>
      </div>
    </div>
  );
}
