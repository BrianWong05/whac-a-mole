import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-yellow-50 p-4 font-sans max-w-md mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-8 tracking-wide drop-shadow-sm">
        手眼協調<br/>大冒險
      </h1>
      
      <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border-4 border-orange-200">
        <p className="text-gray-600 text-lg mb-2">準備好了嗎？</p>
        <p className="text-gray-500 text-sm">點擊地鼠來得分！</p>
      </div>

      <button
        onClick={() => navigate('/game')}
        className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white text-2xl font-bold py-4 px-8 rounded-full shadow-lg transform transition active:scale-95 active:shadow-sm"
      >
        開始遊戲
      </button>
    </div>
  );
}
