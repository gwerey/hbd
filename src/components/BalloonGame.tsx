import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  speed: number;
}

export const BalloonGame = ({ onComplete }: { onComplete: () => void }) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const totalBalloons = 15;

  useEffect(() => {
    const newBalloons = Array.from({ length: totalBalloons }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10% to 90% width
      y: Math.random() * 60 + 20, // 20% to 80% height
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      speed: Math.random() * 2 + 2,
    }));
    setBalloons(newBalloons);
  }, []);

  const popBalloon = (id: number, e: React.MouseEvent) => {
    // Confetti burst at click position
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { x, y },
      colors: [balloons.find(b => b.id === id)?.color || '#fff'],
      disableForReducedMotion: true,
      zIndex: 100,
    });

    setBalloons(prev => prev.filter(b => b.id !== id));
    setPoppedCount(prev => {
      const newCount = prev + 1;
      if (newCount === totalBalloons) {
        setTimeout(onComplete, 500);
      }
      return newCount;
    });
  };

  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      <AnimatePresence>
        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ 
              y: `${balloon.y}vh`, 
              opacity: 1,
              x: [`${balloon.x}vw`, `${balloon.x + (Math.random() * 10 - 5)}vw`]
            }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ 
              duration: balloon.speed, 
              ease: "easeOut",
              x: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2
              }
            }}
            className="absolute cursor-pointer pointer-events-auto hover:scale-110 transition-transform"
            style={{ left: 0, top: 0 }}
            onClick={(e) => popBalloon(balloon.id, e)}
          >
            <div 
              className="w-24 h-32 rounded-[50%] relative shadow-lg"
              style={{ 
                backgroundColor: balloon.color,
                boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.1), inset 10px 10px 20px rgba(255,255,255,0.3)'
              }}
            >
              {/* Balloon String */}
              <div className="absolute bottom-[-20px] left-1/2 w-[2px] h-[20px] bg-white/50 -translate-x-1/2" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {balloons.length > 0 && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-white font-bold animate-bounce pointer-events-auto">
          Letuskan Balonnya! ({poppedCount}/{totalBalloons})
        </div>
      )}
    </div>
  );
};
