import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('whac-a-mole-history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        } else {
          // If data is corrupted (e.g. object instead of array), reset it to empty or handle gracefully
          console.warn("History data is not an array, resetting.");
          setHistory([]); 
        }
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  const clearHistory = () => {
    if (confirm('確定要清除所有紀錄嗎？此動作無法復原。')) {
      localStorage.removeItem('whac-a-mole-history');
      setHistory([]);
    }
  };

  return (
    <div className="min-h-dvh bg-amber-50 font-sans relative overflow-hidden flex flex-col">
       {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md shadow-sm border-b border-amber-100 p-4 sticky top-0">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
           <button 
             onClick={() => navigate('/')}
             className="flex items-center gap-1 text-gray-500 hover:text-amber-600 transition-colors font-bold"
           >
             <ChevronLeftIcon className="w-5 h-5" />
             <span>返回</span>
           </button>
           <h1 className="text-xl font-black text-amber-600 tracking-wide">歷史紀錄</h1>
           <div className="w-16"></div> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4 pb-20">
          
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
               <div className="bg-amber-100 p-6 rounded-full mb-4">
                  <span className="text-4xl">📝</span>
               </div>
               <p className="text-xl font-bold text-gray-400">尚未有遊戲紀錄</p>
               <p className="text-sm text-gray-400 mt-2">快去玩一場吧！</p>
            </div>
          ) : (
            history.map((record) => (
              <div 
                key={record.id} 
                onClick={() => setSelectedRecord(record)}
                className="bg-white rounded-2xl shadow-sm border border-amber-100 p-4 flex flex-col gap-3 animate-fade-in hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99] active:bg-gray-50 from-gray-50"
              >
                 <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{record.date}</span>
                    <span className="text-xs font-bold bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">完成</span>
                 </div>
                 
                 <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">分數</p>
                      <p className="text-2xl font-black text-blue-500">{record.score}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">出現總數</p>
                      <p className="text-lg font-bold text-gray-600">{record.totalSpawns}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">命中率</p>
                      <p className="text-lg font-bold text-gray-600">{record.hitRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">平均反應</p>
                      <p className="text-lg font-bold text-gray-600">{record.avgReaction}</p>
                    </div>
                 </div>
              </div>
            ))
          )}

        </div>
      </div>

      {/* Footer Actions */}
      {history.length > 0 && (
         <div className="relative z-10 p-4 bg-white/90 backdrop-blur border-t border-gray-100 safe-area-bottom">
            <div className="max-w-2xl mx-auto">
               <button 
                 onClick={clearHistory}
                 className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-red-500 hover:bg-red-50 font-bold transition-colors border border-transparent hover:border-red-100"
               >
                 <TrashIcon className="w-5 h-5" />
                 <span>清除所有紀錄</span>
               </button>
            </div>
         </div>
      )}

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedRecord(null)}>
          <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm overflow-hidden border-2 border-white/50" onClick={e => e.stopPropagation()}>
             <div className="text-center mb-6">
               <h2 className="text-xl font-black text-gray-800 tracking-tight mb-1">詳細記錄</h2>
               <p className="text-xs font-bold text-gray-400">{selectedRecord.date}</p>
             </div>

             <div className="grid grid-cols-4 gap-2 mb-6">
                <div className="bg-blue-50 p-2 rounded-xl text-center">
                   <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">分數</p>
                   <p className="text-lg font-black text-blue-600">{selectedRecord.score}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl text-center">
                   <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">總數</p>
                   <p className="text-lg font-black text-gray-600">{selectedRecord.totalSpawns}</p>
                </div>
                <div className="bg-amber-50 p-2 rounded-xl text-center">
                   <p className="text-[10px] text-amber-400 font-bold uppercase mb-1">命中率</p>
                   <p className="text-lg font-black text-amber-600">{selectedRecord.hitRate}</p>
                </div>
                <div className="bg-purple-50 p-2 rounded-xl text-center">
                   <p className="text-[10px] text-purple-400 font-bold uppercase mb-1">平均</p>
                   <p className="text-lg font-black text-purple-600">{selectedRecord.avgReaction}</p>
                </div>
             </div>

             {/* Detailed Reaction Log (Reused from Result) */}
             <div className="w-full bg-gray-50 rounded-2xl mb-6 border border-gray-100 overflow-hidden text-sm">
                <div className="bg-gray-100/50 px-4 py-3 border-b border-gray-200/50 backdrop-blur-sm">
                  <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest text-left">反應時間記錄</h3>
                </div>
                
                <div className="max-h-48 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
                   {selectedRecord.reactionHistory && selectedRecord.reactionHistory.length > 0 ? (
                      <div className="space-y-1">
                        {selectedRecord.reactionHistory.map((time, i) => (
                          <div key={i} className="flex justify-between px-3 py-2 text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all text-sm items-center">
                            <span className="font-bold text-gray-400"># {i + 1}</span>
                            <span className="font-mono text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded text-xs">
                              {(time / 1000).toFixed(2)}s
                            </span>
                          </div>
                        ))}
                      </div>
                   ) : (
                      <p className="text-center text-gray-400 py-4 text-xs font-bold">無詳細反應資料</p>
                   )}
                </div>
             </div>

             <button 
               onClick={() => setSelectedRecord(null)}
               className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-colors"
             >
               關閉
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
