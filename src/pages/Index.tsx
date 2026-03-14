import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import StarField from "@/components/StarField";
import GrandEntrance from "@/components/GrandEntrance";
import PolaroidGallery from "@/components/PolaroidGallery";
import LoveQuiz from "@/components/LoveQuiz";
import CatchGame from "@/components/CatchGame";
import Fireworks from "@/components/Fireworks";
import CakeSection from "@/components/CakeSection";
import FinalLetter from "@/components/FinalLetter";

const Index = () => {
  const [entered, setEntered] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [gameDone, setGameDone] = useState(false);

  const handleQuizComplete = useCallback(() => {
    setQuizDone(true);
    setShowFireworks(true);
  }, []);

  const handleFireworksDone = useCallback(() => {
    setShowFireworks(false);
  }, []);

  const handleGameWin = useCallback(() => {
    setGameDone(true);
  }, []);

  return (
    <div className="midnight-gradient min-h-screen relative">
      <StarField />

      <AnimatePresence>
        {!entered && <GrandEntrance onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <main className="relative z-10">
          <PolaroidGallery />
          <LoveQuiz onComplete={handleQuizComplete} />

          {quizDone && showFireworks && <Fireworks onDone={handleFireworksDone} />}

          {quizDone && <CatchGame onWin={handleGameWin} />}

          {gameDone && <CakeSection />}

          {gameDone && <FinalLetter />}
        </main>
      )}
    </div>
  );
};

export default Index;
