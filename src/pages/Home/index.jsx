import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(60);
  const [selectedSpeed, setSelectedSpeed] = useState('slow');

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
        
        <div className="mb-8 p-4 bg-orange-50 rounded-2xl border-2 border-orange-100">
           {/* Time Selection */}
           <div className="mb-4">
             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">選擇遊戲時間</p>
             <div className="flex justify-center gap-2 flex-wrap">
               {[30, 60].map(time => (
                 <button
                   key={time}
                   onClick={() => setSelectedTime(time)}
                   className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border-2 min-w-[70px] ${
                     selectedTime === time 
                       ? 'bg-amber-500 text-white border-amber-500 shadow-md transform scale-105' 
                       : 'bg-white text-gray-400 border-gray-200 hover:border-amber-200 hover:text-amber-500'
                   }`}
                 >
                   {time}秒
                 </button>
               ))}
               
               <div className="relative">
                  <input
                    type="number"
                    min="10"
                    max="999"
                    value={[30,60].includes(selectedTime) ? '' : selectedTime}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val)) setSelectedTime(val);
                    }}
                    placeholder="自訂"
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border-2 w-20 text-center focus:outline-none ${
                      ![30, 60].includes(selectedTime)
                        ? 'bg-amber-500 text-white border-amber-500 shadow-md placeholder-amber-200'
                        : 'bg-white text-gray-400 border-gray-200 focus:border-amber-200 focus:text-amber-500'
                    }`}
                  />
                  <span className={`absolute right-1 top-2.5 text-xs font-bold pointer-events-none ${![30, 60].includes(selectedTime) ? 'text-amber-100' : 'hidden'}`}>
                    秒
                  </span>
               </div>
             </div>
           </div>

           {/* Speed Selection */}
           <div className="mb-2">
             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">選擇速度</p>
             <div className="inline-flex bg-white p-1 rounded-xl border-2 border-gray-100">
                <button
                  onClick={() => setSelectedSpeed('slow')}
                  className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                    selectedSpeed === 'slow'
                      ? 'bg-amber-100 text-amber-600 shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  正常
                </button>
                <button
                  onClick={() => setSelectedSpeed('fast')}
                  className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                    selectedSpeed === 'fast'
                      ? 'bg-red-100 text-red-600 shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  快速
                </button>
             </div>
           </div>
           
           <div className="h-px w-full bg-orange-100 my-4"></div>

           <p className="text-gray-600 text-lg font-bold mb-1">準備好了嗎？</p>
           <p className="text-gray-500 text-sm">點擊地鼠來得分！</p>
        </div>

        <div className="flex flex-col gap-4 w-full">
            <button
              onClick={() => navigate('/game', { state: { difficulty: 'easy', duration: selectedTime, speed: selectedSpeed } })}
              className="w-full bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-6 rounded-2xl shadow-[0_6px_0_rgb(21,128,61)] hover:shadow-[0_3px_0_rgb(21,128,61)] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all"
            >
              <div className="flex flex-col items-center">
                <span>簡單模式</span>
                <span className="text-sm opacity-90 font-normal mt-1">一次一隻</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/game', { state: { difficulty: 'hard', duration: selectedTime, speed: selectedSpeed } })}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold py-4 px-6 rounded-2xl shadow-[0_6px_0_rgb(194,65,12)] hover:shadow-[0_3px_0_rgb(194,65,12)] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all"
            >
              <div className="flex flex-col items-center">
                <span>挑戰模式</span>
                <span className="text-sm opacity-90 font-normal mt-1">一次兩隻</span>
              </div>
            </button>
          </div>
      </div>
    </div>
  );
}
