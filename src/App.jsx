import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';

function App() {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900 font-sans mx-auto max-w-md shadow-2xl overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
