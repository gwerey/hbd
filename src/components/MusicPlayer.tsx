import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';

interface MusicPlayerProps {
  src: string;
}

export const MusicPlayer = ({ src }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(e => {
          console.log("Playback failed", e);
          // Still allow entry even if music fails
        })
        .finally(() => {
          setHasInteracted(true);
        });
    } else {
      setHasInteracted(true);
    }
  };

  if (!hasInteracted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="text-center p-8 bg-white/10 rounded-2xl border border-white/20 shadow-2xl max-w-md mx-4 relative z-[101]">
          <h2 className="text-3xl font-bold text-white mb-6">🎉 Surprise! 🎉</h2>
          <p className="text-white/80 mb-8">Siap untuk kejutan ulang tahun Rayya?</p>
          <button
            onClick={startMusic}
            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-bold text-xl shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-6 h-6 fill-current" />
              Mulai Pesta!
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 shadow-lg flex items-center gap-2">
      <audio ref={audioRef} src={src} loop />
      <button
        onClick={togglePlay}
        className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
      >
        {isPlaying ? (
          <span className="animate-pulse">🎵</span>
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>
      <button
        onClick={toggleMute}
        className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
};
