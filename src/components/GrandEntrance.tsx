import { motion } from "framer-motion";

interface Props {
  onEnter: () => void;
}

const GrandEntrance = ({ onEnter }: Props) => {
  const name = "Harshitha Naga Lova Sai Manikanta Vinitha Raja Kumari";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center midnight-gradient px-6"
      exit={{ opacity: 0, y: -60 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Floating hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{ left: `${15 + i * 13}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {i % 2 === 0 ? "💖" : "✨"}
        </motion.span>
      ))}

      <motion.h1
        className="font-display text-4xl sm:text-5xl md:text-6xl text-center shimmer-text leading-relaxed mb-8 max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {name}
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-lg mb-10 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        A special day for a special soul
      </motion.p>

      <motion.button
        className="neon-button font-body cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEnter}
      >
        Enter My World ✨
      </motion.button>
    </motion.div>
  );
};

export default GrandEntrance;
