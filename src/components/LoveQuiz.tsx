import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

const LoveQuiz = ({ onComplete }: Props) => {
  const [step, setStep] = useState(0);
  const [dateVal, setDateVal] = useState({ month: "", day: "", year: "" });
  const [choiceAnswer, setChoiceAnswer] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const checkDate = () => {
    if (dateVal.month === "2" && dateVal.day === "1" && dateVal.year === "2026") {
      setError("");
      setStep(1);
    } else {
      setError("Hmm, think again my love 💭");
    }
  };

  const checkChoice = (val: string) => {
    setChoiceAnswer(val);
    if (val.toLowerCase() === "patience") {
      setError("");
      setTimeout(() => setStep(2), 500);
    } else {
      setError("Not quite! Try again 😘");
    }
  };

  const checkNickname = () => {
    if (nickname.trim().toLowerCase() === "bangaram") {
      setError("");
      onComplete();
    } else {
      setError("That's not the magic word... 🤔");
    }
  };

  const sectionAnim = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  return (
    <motion.section className="min-h-screen flex flex-col items-center justify-center px-6 py-20" {...sectionAnim}>
      <motion.h2
        className="font-display text-4xl text-primary glow-text-gold mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        The Love Quiz
      </motion.h2>

      <div className="quiz-card w-full max-w-sm">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="q1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <p className="text-foreground font-body text-lg mb-4">Where was our first meet? 💕</p>
              <p className="text-muted-foreground text-sm mb-4">Enter the date (MM / DD / YYYY)</p>
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  placeholder="MM"
                  className="w-1/3 bg-muted text-foreground rounded-xl px-3 py-3 text-center font-body outline-none focus:ring-2 focus:ring-primary"
                  value={dateVal.month}
                  onChange={(e) => setDateVal({ ...dateVal, month: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="DD"
                  className="w-1/3 bg-muted text-foreground rounded-xl px-3 py-3 text-center font-body outline-none focus:ring-2 focus:ring-primary"
                  value={dateVal.day}
                  onChange={(e) => setDateVal({ ...dateVal, day: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="YYYY"
                  className="w-1/3 bg-muted text-foreground rounded-xl px-3 py-3 text-center font-body outline-none focus:ring-2 focus:ring-primary"
                  value={dateVal.year}
                  onChange={(e) => setDateVal({ ...dateVal, year: e.target.value })}
                />
              </div>
              {error && <p className="text-secondary text-sm mb-3">{error}</p>}
              <button className="neon-button w-full font-body" onClick={checkDate}>
                Check ✨
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="q2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <p className="text-foreground font-body text-lg mb-4">What is my favorite thing about you? 🥰</p>
              <div className="flex flex-col gap-3 mb-4">
                {["Your smile", "Patience", "Your cooking", "Your style"].map((opt) => (
                  <button
                    key={opt}
                    className={`w-full py-3 px-4 rounded-xl font-body text-left transition-all ${
                      choiceAnswer === opt
                        ? "bg-primary text-primary-foreground glow-gold"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                    onClick={() => checkChoice(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {error && <p className="text-secondary text-sm">{error}</p>}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="q3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <p className="text-foreground font-body text-lg mb-2">What is your secret nickname? 🤫</p>
              <p className="text-muted-foreground text-sm mb-4">Type the magic word to unlock...</p>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full bg-muted text-foreground rounded-xl px-4 py-3 font-body outline-none focus:ring-2 focus:ring-primary mb-4"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              {error && <p className="text-secondary text-sm mb-3">{error}</p>}
              <button className="neon-button w-full font-body" onClick={checkNickname}>
                Unlock 🔓
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i <= step ? "bg-primary glow-gold" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default LoveQuiz;
