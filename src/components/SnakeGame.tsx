import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const gameLoopRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  const generateFood = useCallback((currentSnake: { x: number, y: number }[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Ensure food doesn't land on snake
      const onSnake = currentSnake.some(segment => segment.x === newFood?.x && segment.y === newFood?.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const newHead = {
        x: (prevSnake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (prevSnake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const tick = (time: number) => {
      if (time - lastUpdateRef.current > 100) {
        moveSnake();
        lastUpdateRef.current = time;
      }
      gameLoopRef.current = requestAnimationFrame(tick);
    };

    gameLoopRef.current = requestAnimationFrame(tick);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [moveSnake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  return (
    <div className="relative flex flex-col items-center gap-6 p-4 border-2 border-[#00ffff]/30 bg-black/60 shadow-[4px_4px_0px_#ff00ff]">
      <div className="flex justify-between w-full px-2 font-pixel text-[#00ffff]">
        <div className="text-2xl glitch-text">DATA_RECOVERED: {score.toString().padStart(4, '0')}</div>
        <div className="text-2xl animate-pulse tracking-widest">{isPaused ? '[STALLED]' : '[EXECUTING]'}</div>
      </div>

      <div 
        className="relative grid bg-black border-4 border-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-none overflow-hidden"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: 'min(85vw, 420px)',
          height: 'min(85vw, 420px)'
        }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ 
               backgroundImage: `linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)`,
               backgroundSize: `calc(100% / ${GRID_SIZE}) calc(100% / ${GRID_SIZE})`
             }} 
        />

        {/* Snake segments */}
        {snake.map((segment, i) => (
          <motion.div
            key={`${i}-${segment.x}-${segment.y}`}
            initial={false}
            animate={{ 
              gridColumnStart: segment.x + 1, 
              gridRowStart: segment.y + 1 
            }}
            transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
            className={`w-full h-full border border-black ${i === 0 ? 'bg-[#ff00ff] shadow-[0_0_15px_#ff00ff]' : 'bg-[#00ffff]/80'}`}
          />
        ))}

        {/* Food */}
        <motion.div
          animate={{ 
            opacity: [1, 0.4, 1],
            scale: [1, 1.3, 1]
          }}
          transition={{ repeat: Infinity, duration: 0.5, ease: "steps(4)" }}
          className="bg-[#00ffff] border-2 border-white"
          style={{ 
            gridColumnStart: food.x + 1, 
            gridRowStart: food.y + 1,
            width: '100%',
            height: '100%'
          }}
        />

        {/* Overlays */}
        <AnimatePresence>
          {(gameOver || isPaused) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-10"
            >
              {gameOver ? (
                <div className="text-center p-8 border-4 border-[#ff00ff] bg-black shadow-[10px_10px_0px_#00ffff]">
                  <h2 className="text-5xl font-black text-[#ff00ff] mb-6 tracking-tighter glitch-text">CPU_CRASH_0x1</h2>
                  <p className="text-[#00ffff]/60 mb-8 uppercase text-sm tracking-widest">Neural Link Severed</p>
                  <button 
                    onClick={resetGame}
                    className="w-full px-6 py-3 bg-[#ff00ff] text-black font-black uppercase hover:bg-[#00ffff] transition-all"
                  >
                    INIT_REBOOT
                  </button>
                </div>
              ) : (
                <div className="text-center p-8 border-4 border-[#00ffff] bg-black shadow-[10px_10px_0px_#ff00ff]">
                  <h2 className="text-4xl font-bold text-[#00ffff] mb-6 tracking-[0.2em] glitch-text uppercase">HALT_SIGNAL</h2>
                  <p className="text-[#00ffff]/40 text-xs mb-8 uppercase tracking-[0.3em] font-mono">Input requested to proceed</p>
                  <button 
                    onClick={() => setIsPaused(false)}
                    className="w-full px-8 py-4 bg-[#00ffff] text-black font-black uppercase hover:invert transition-all"
                  >
                    OVERRIDE_PAUSE
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-[10px] text-[#ff00ff]/60 uppercase tracking-[0.4em] font-mono flex gap-4">
        <span>[A_KEYS:SHIFT]</span>
        <span>[SPACE:SIG_STOP]</span>
      </div>
    </div>
  );
}
