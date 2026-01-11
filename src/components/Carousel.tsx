import { motion } from 'framer-motion';

const items = [
  { id: 1, src: "https://public.youware.com/users-website-assets/prod/bfbcc9b6-938e-4ac3-9c45-628bdd51c4cf/edbd3b86b2e747569597349f0a0aa563.png", alt: "Cute Koala" },
  { id: 2, src: "https://public.youware.com/users-website-assets/prod/bfbcc9b6-938e-4ac3-9c45-628bdd51c4cf/67ca0d4784434215b5c1d0ceebc44414.png", alt: "Party Penguin" },
  { id: 3, src: "https://public.youware.com/users-website-assets/prod/bfbcc9b6-938e-4ac3-9c45-628bdd51c4cf/8d13316807264f17a3866b9b57d74fcc.png", alt: "Magical Unicorn" },
];

export const Carousel = () => {
  return (
    <div className="w-full overflow-hidden py-10 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
      <h3 className="text-center text-white text-xl font-bold mb-8 opacity-90">Teman-teman Pesta 🎉</h3>
      <div className="relative flex overflow-x-hidden group">
        <motion.div
          className="flex gap-12 px-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 15,
            repeatType: "loop" 
          }}
          style={{ width: "fit-content" }}
        >
          {[...items, ...items, ...items, ...items].map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="w-48 h-48 flex-shrink-0 bg-white/20 rounded-full p-4 backdrop-blur-md border-2 border-white/30 hover:scale-110 transition-transform duration-300 shadow-lg"
            >
              <img 
                src={item.src} 
                alt={item.alt} 
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
