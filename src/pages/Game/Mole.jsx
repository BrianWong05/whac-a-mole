import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

function Mole({ isVisible, isHit, onClick }) {
  return (
    <div 
      className="relative flex items-center justify-center aspect-square touch-manipulation select-none"
    >
      {/* Forgiving Hitbox: Transparent padding area */}
      <button
        onClick={(isVisible && !isHit) ? onClick : undefined}
        className={`absolute inset-0 z-10 w-full h-full cursor-pointer outline-none focus:outline-none ${(!isVisible || isHit) ? 'pointer-events-none' : ''}`}
        aria-label={isVisible ? "Hit Mole" : "Empty Hole"}
      />

      {/* Hole Background */}
      <div className="w-24 h-8 bg-amber-900/40 rounded-full absolute bottom-4 blur-sm" />

      <AnimatePresence mode="popLayout">
        {isVisible && !isHit && (
          <motion.div
            key="mole"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative z-0"
          >
            {/* Mole Graphic - Simple SVG or CSS shape */}
            <div className="w-24 h-24 bg-amber-700 rounded-t-full rounded-b-3xl relative border-4 border-amber-900 shadow-xl overflow-hidden flex justify-center">
               {/* Eyes */}
               <div className="absolute top-6 left-5 w-3 h-3 bg-black rounded-full" />
               <div className="absolute top-6 right-5 w-3 h-3 bg-black rounded-full" />
               {/* Nose */}
               <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-pink-400 rounded-full" />
               {/* Whiskers */}
               <div className="absolute top-11 left-2 w-4 h-0.5 bg-black/30 rotate-12" />
               <div className="absolute top-11 right-2 w-4 h-0.5 bg-black/30 -rotate-12" />
            </div>
          </motion.div>
        )}
        
        {isHit && (
           <motion.div
             key="hit"
             initial={{ scale: 0.5, opacity: 0 }}
             animate={{ scale: 1.2, opacity: 1 }}
             exit={{ scale: 0.8, opacity: 0 }}
             className="absolute z-20 flex flex-col items-center"
           >
             <span className="text-4xl filter drop-shadow-md">⭐</span>
             <span className="text-2xl font-bold text-red-500 bg-white/80 px-2 py-1 rounded-lg mt-1 whitespace-nowrap drop-shadow-sm">好棒!</span>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

Mole.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isHit: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Mole;
