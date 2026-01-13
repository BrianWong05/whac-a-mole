import { useNavigate, useLocation } from 'react-router-dom';

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score || 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-blue-50 p-4 font-sans max-w-md mx-auto text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 drop-shadow-sm">
        遊戲結束!
      </h1>
      
      <div className="p-8 bg-white rounded-3xl shadow-xl border-4 border-blue-200 mb-8 w-full">
        <p className="text-gray-500 text-lg mb-2">你的分數</p>
        <div className="text-6xl font-black text-blue-500 mb-4">{score}</div>
        <p className="text-xl text-yellow-500 font-bold">做得好! 🎉</p>
      </div>

      <button
        onClick={() => navigate('/game')}
        className="w-full max-w-xs bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold py-4 px-8 rounded-full shadow-lg transform transition active:scale-95 active:shadow-sm"
      >
        再玩一次
      </button>
      
      <button
        onClick={() => navigate('/')}
        className="mt-4 text-gray-500 underline text-sm p-2"
      >
        回首頁
      </button>
    </div>
  );
}
