import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const VirtualGift = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openGift = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FF69B4', '#FFD700', '#00CED1', '#FF1493'],
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-12">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, -5, 5, -5, 0] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 2, repeatDelay: 1 }
            }}
            onClick={openGift}
            className="cursor-pointer group relative"
          >
            <div className="w-48 h-48 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-white/10 rounded-2xl" />
              {/* Ribbon */}
              <div className="absolute w-12 h-full bg-yellow-400/90 shadow-sm" />
              <div className="absolute w-full h-12 bg-yellow-400/90 shadow-sm" />
              <Gift className="w-24 h-24 text-white z-10 relative" />
              
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-pink-600 px-4 py-1 rounded-full font-bold shadow-lg animate-bounce">
                Klik Aku!
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md text-center border-4 border-pink-200"
          >
            <div className="mb-6 flex justify-center">
              <Sparkles className="w-16 h-16 text-yellow-500 animate-spin-slow" />
            </div>
            <h3 className="text-2xl font-bold text-pink-600 mb-4">Selamat Ulang Tahun! 🎂</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Semoga harimu penuh dengan keajaiban, tawa, dan kue yang enak! 
              Jangan lupa untuk terus bersinar seperti bintang! ✨
            </p>
            <div className="w-full h-48 bg-pink-100 rounded-xl overflow-hidden mb-4 relative group">
               <img 
                 src="https://public.youware.com/users-website-assets/prod/bfbcc9b6-938e-4ac3-9c45-628bdd51c4cf/922dcc03ceb94941bff9b2c891ac298f.png" 
                 alt="Birthday Cake" 
                 className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
               />
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-pink-500 hover:text-pink-700 font-medium text-sm underline"
            >
              Tutup Kado
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
