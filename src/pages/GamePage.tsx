import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import StarField from "@/components/StarField";
import BackButton from "@/components/BackButton";
import CatchGame from "@/components/CatchGame";

const GamePage = () => {
  const navigate = useNavigate();

  const handleWin = useCallback(() => {
    setTimeout(() => navigate("/cake"), 1500);
  }, [navigate]);

  return (
    <div className="midnight-gradient min-h-screen relative">
      <StarField />
      <BackButton />
      <main className="relative z-10">
        <CatchGame onWin={handleWin} />
      </main>
    </div>
  );
};

export default GamePage;
