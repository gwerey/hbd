import { useState } from 'react';
import { motion } from 'framer-motion';
import { MusicPlayer } from './components/MusicPlayer';
import { Countdown } from './components/Countdown';
import { VirtualGift } from './components/VirtualGift';
import { Carousel } from './components/Carousel';
import { BalloonGame } from './components/BalloonGame';
import { Heart, Stars } from 'lucide-react';

function App() {
  const [gameCompleted, setGameCompleted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-800 to-red-900 overflow-x-hidden relative font-sans text-white selection:bg-pink-500 selection:text-white">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url('https://public.youware.com/users-website-assets/prod/bfbcc9b6-938e-4ac3-9c45-628bdd51c4cf/fc95008f8e40404d84f5b9353f760d2e.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Music Player */}
      <MusicPlayer src="https://public.youware.com/users-website-assets/prod/bfbcc9b6-938e-4ac3-9c45-628bdd51c4cf/df564acccb214c00ad371e85ba39f47a.mp3" />

      {/* Balloon Game Overlay */}
      {!gameCompleted && (
        <BalloonGame onComplete={() => setGameCompleted(true)} />
      )}

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center gap-12">
        
        {/* Header Section */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center space-y-4"
        >
          <div className="inline-block p-2 px-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4">
            <span className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
              <Stars className="w-4 h-4 text-yellow-400" />
              Special Day
              <Stars className="w-4 h-4 text-yellow-400" />
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-lg">
            Happy Birthday, Rayya!
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 font-light max-w-2xl mx-auto">
            Selamat ulang tahun Rayya! Semoga hari ini seindah senyumanmu.
          </p>
        </motion.header>

        {/* Countdown Section */}
        <section className="w-full">
          <Countdown targetDate="2026-01-12T00:00:00" />
        </section>

        {/* Hidden Message Section (Revealed after game) */}
        {gameCompleted && (
          <motion.section
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-10 h-10 text-pink-400 fill-current" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Doa Terbaik Untuk Rayya
                </h2>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed italic font-serif">
                  "Selamat ulang tahun Rayya! 🎉
                  Semoga panjang umur, sehat selalu, makin pintar, makin cantik, dan selalu dalam lindungan Tuhan. 
                  Semoga semua cita-citamu tercapai, dilancarkan segala urusannya, dan hari-harimu selalu penuh dengan kebahagiaan dan tawa.
                  Tetaplah menjadi Rayya yang ceria dan baik hati. I love you! ❤️"
                </p>
                <div className="text-sm font-bold tracking-widest text-pink-300 uppercase mt-4">
                  — With Love
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Virtual Gift Section */}
        <section className="w-full flex justify-center py-8">
          <VirtualGift />
        </section>

        {/* Carousel Section */}
        <section className="w-full max-w-5xl">
          <Carousel />
        </section>

        {/* Surprise Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            import('canvas-confetti').then((confetti) => {
              const duration = 3000;
              const animationEnd = Date.now() + duration;
              const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

              const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

              const interval: any = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                  return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti.default({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti.default({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
              }, 250);
            });
          }}
          className="fixed bottom-8 left-8 z-40 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-full shadow-lg font-bold flex items-center gap-2 hover:shadow-xl transition-shadow"
        >
          <Stars className="w-6 h-6 animate-spin-slow" />
          <span className="hidden md:inline">Tombol Kejutan!</span>
        </motion.button>

        {/* Footer */}
        <footer className="text-center text-white/40 text-sm py-8">
          <p>Dibuat dengan ❤️ untuk 12 Januari 2026</p>
        </footer>

      </div>
    </div>
  );
}

export default App;
