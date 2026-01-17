import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';
import History from './pages/History';

function App() {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900 font-sans overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
