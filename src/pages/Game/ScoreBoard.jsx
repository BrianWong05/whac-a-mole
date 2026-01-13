import PropTypes from 'prop-types';

function ScoreBoard({ score, timeLeft }) {
  return (
    <div className="w-full flex justify-between items-center mb-6 px-4 py-2 bg-white/80 backdrop-blur rounded-2xl shadow-md border-2 border-orange-100">
      <div className="flex flex-col items-center">
        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">分數</span>
        <span className="text-3xl font-black text-orange-500">{score}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">時間</span>
        {/* Color changes when time is running out */}
        <span className={`text-3xl font-black ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-blue-500'}`}>
          {timeLeft}
        </span>
      </div>
    </div>
  );
}

ScoreBoard.propTypes = {
  score: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
};

export default ScoreBoard;
