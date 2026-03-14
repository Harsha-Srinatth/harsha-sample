import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import StarField from "@/components/StarField";
import GrandEntrance from "@/components/GrandEntrance";

const Index = () => {
  const [entered, setEntered] = useState(false);
  const navigate = useNavigate();

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => navigate("/gallery"), 1000);
  };

  return (
    <div className="midnight-gradient min-h-screen relative">
      <StarField />
      <AnimatePresence>
        {!entered && <GrandEntrance onEnter={handleEnter} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
