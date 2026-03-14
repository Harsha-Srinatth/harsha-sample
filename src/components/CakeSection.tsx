import { useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

const CakeSection = () => {
  const [cakeCut, setCakeCut] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const cakeRef = useRef<HTMLDivElement>(null);
  const knifeY = useMotionValue(0);
  const sectionRef = useRef<HTMLElement>(null);

  const handleDragEnd = () => {
    const currentY = knifeY.get();
    // If dragged down enough (past ~120px), it hits the cake
    if (currentY > 100) {
      if (navigator.vibrate) navigator.vibrate(200);
      try {
        const audio = new Audio("https://cdn.freesound.org/previews/397/397354_4284968-lq.mp3");
        audio.volume = 0.5;
        audio.play().catch(() => {});
      } catch {}
      setCakeCut(true);
      setTimeout(() => setShowReveal(true), 2000);
    }
  };

  if (showReveal) {
    return (
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="polaroid-card max-w-xs glow-gold">
          <img src="/placeholder.svg" alt="Us together" className="w-full aspect-square object-cover rounded-sm" />
          <p className="text-center mt-3 font-display text-xl" style={{ color: "#333" }}>
            The best part of my year is you.
          </p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="font-display text-4xl text-primary glow-text-gold mb-8">
        {cakeCut ? "Yay! 🎉" : "Cut the Cake!"}
      </h2>

      <div ref={cakeRef} className="relative w-64 flex flex-col items-center" style={{ height: 320 }}>
        {/* Knife - draggable */}
        {!cakeCut && (
          <motion.div
            className="absolute top-0 z-10 text-5xl cursor-grab active:cursor-grabbing select-none"
            drag="y"
            dragConstraints={{ top: -20, bottom: 200 }}
            dragElastic={0.1}
            style={{ y: knifeY }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.1 }}
          >
            🔪
          </motion.div>
        )}

        {/* Cake */}
        <div className="absolute bottom-8 flex flex-col items-center">
          {/* Candles */}
          {!cakeCut && (
            <div className="flex gap-4 mb-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="w-3 h-5 rounded-full"
                    style={{
                      background: "linear-gradient(to top, #FF6B00, #FFD700, #FFFF00)",
                      animation: `flicker ${0.3 + i * 0.1}s ease-in-out infinite`,
                    }}
                  />
                  <div className="w-1 h-6" style={{ background: "hsl(var(--rose))" }} />
                </div>
              ))}
            </div>
          )}

          {/* Cake body */}
          <motion.div
            className="flex items-end"
            animate={cakeCut ? { gap: "2rem" } : { gap: "0" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div animate={cakeCut ? { rotate: -15, x: -10 } : {}} transition={{ duration: 0.8 }}>
              <div className="w-20 h-8 rounded-t-lg" style={{ background: "linear-gradient(135deg, #FF69B4, #FF1493)" }} />
              <div className="w-20 h-10" style={{ background: "linear-gradient(135deg, #D4AF37, #FFD700)" }} />
              <div className="w-20 h-8 rounded-b-lg" style={{ background: "linear-gradient(135deg, #8B4513, #D2691E)" }} />
            </motion.div>
            <motion.div animate={cakeCut ? { rotate: 15, x: 10 } : {}} transition={{ duration: 0.8 }}>
              <div className="w-20 h-8 rounded-t-lg" style={{ background: "linear-gradient(135deg, #FF69B4, #FF1493)" }} />
              <div className="w-20 h-10" style={{ background: "linear-gradient(135deg, #D4AF37, #FFD700)" }} />
              <div className="w-20 h-8 rounded-b-lg" style={{ background: "linear-gradient(135deg, #8B4513, #D2691E)" }} />
            </motion.div>
          </motion.div>

          {/* Plate */}
          <div className="w-48 h-4 rounded-full bg-muted mt-1" />
        </div>
      </div>

      {!cakeCut && (
        <p className="text-muted-foreground font-body text-sm mt-6 animate-pulse">
          ☝️ Drag the knife down to cut the cake!
        </p>
      )}
    </motion.section>
  );
};

export default CakeSection;
