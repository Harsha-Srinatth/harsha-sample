import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LETTER = `To my dearest Ishuamma ✨, you are the most comfortable person in my life. You are the one person I can share everything with—every thought, every secret—without ever thinking twice. In this entire generation, I truly believe you are the rarest soul; the sweetest girl who stands by her person no matter what the situation is. You aren't just my partner; you are my peace and my home. You are my Teddy Bear 🧸—the one I want to hold onto forever. Happy Birthday, my dear Ishuamma. 🫂😘❤️`;

const FinalLetter = () => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < LETTER.length) {
        setDisplayed(LETTER.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [started]);

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      onViewportEnter={() => setStarted(true)}
    >
      <h2 className="font-display text-4xl text-primary glow-text-gold mb-10">A Letter For You</h2>

      <div className="quiz-card max-w-md w-full">
        <p className="font-body text-foreground text-base leading-relaxed whitespace-pre-wrap min-h-[200px]">
          {displayed}
          {displayed.length < LETTER.length && (
            <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-pulse" />
          )}
        </p>
      </div>

      {displayed.length >= LETTER.length && (
        <motion.p
          className="font-display text-3xl text-secondary glow-text-rose mt-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Forever yours 💖
        </motion.p>
      )}
    </motion.section>
  );
};

export default FinalLetter;
