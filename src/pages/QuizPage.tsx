import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StarField from "@/components/StarField";
import BackButton from "@/components/BackButton";
import LoveQuiz from "@/components/LoveQuiz";
import Fireworks from "@/components/Fireworks";
import { playClickSound, playCelebrationSound } from "@/utils/sounds";

const QuizPage = () => {
  const navigate = useNavigate();
  const [showFireworks, setShowFireworks] = useState(false);
  const [quizDone, setQuizDone] = useState(false);

  const handleQuizComplete = useCallback(() => {
    playCelebrationSound();
    setQuizDone(true);
    setShowFireworks(true);
  }, []);

  const handleFireworksDone = useCallback(() => {
    setShowFireworks(false);
  }, []);

  return (
    <div className="midnight-gradient min-h-screen relative">
      <StarField />
      <BackButton />
      {showFireworks && <Fireworks onDone={handleFireworksDone} />}
      <main className="relative z-10">
        <LoveQuiz onComplete={handleQuizComplete} />
        {quizDone && !showFireworks && (
          <div className="flex justify-center pb-20">
            <motion.button
              className="neon-button font-body cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => {
                playClickSound();
                navigate("/game");
              }}
            >
              Next: Catch My Heart 🎮
            </motion.button>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizPage;
