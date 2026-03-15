import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { playClickSound } from "@/utils/sounds";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    playClickSound();
    navigate(-1);
  };

  return (
    <motion.button
      className="fixed top-4 left-4 z-40 w-10 h-10 rounded-full flex items-center justify-center bg-muted/60 backdrop-blur-md border border-border/50 text-foreground"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleBack}
    >
      <ArrowLeft size={20} />
    </motion.button>
  );
};

export default BackButton;
