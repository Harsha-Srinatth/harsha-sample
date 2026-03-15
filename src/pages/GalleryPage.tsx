import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import BackButton from "@/components/BackButton";
import PolaroidGallery from "@/components/PolaroidGallery";
import { motion } from "framer-motion";
import { playClickSound } from "@/utils/sounds";

const GalleryPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    playClickSound();
    navigate("/quiz");
  };

  return (
    <div className="midnight-gradient min-h-screen relative">
      <StarField />
      <BackButton />
      <main className="relative z-10">
        <PolaroidGallery />
        <div className="flex justify-center pb-20">
          <motion.button
            className="neon-button font-body cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            onClick={handleNext}
          >
            Next: The Love Quiz 💕
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default GalleryPage;
