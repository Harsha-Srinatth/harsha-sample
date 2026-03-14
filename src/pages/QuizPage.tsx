import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import BackButton from "@/components/BackButton";
import LoveQuiz from "@/components/LoveQuiz";
import Fireworks from "@/components/Fireworks";

const QuizPage = () => {
  const navigate = useNavigate();
  const [showFireworks, setShowFireworks] = useState(false);
  const [quizDone, setQuizDone] = useState(false);

  const handleQuizComplete = useCallback(() => {
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
            <button
              className="neon-button font-body cursor-pointer"
              onClick={() => navigate("/game")}
            >
              Next: Catch My Heart 🎮
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizPage;
