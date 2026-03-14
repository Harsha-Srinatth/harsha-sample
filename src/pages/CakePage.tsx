import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import BackButton from "@/components/BackButton";
import CakeSection from "@/components/CakeSection";
import { motion } from "framer-motion";

const CakePage = () => {
  const navigate = useNavigate();

  return (
    <div className="midnight-gradient min-h-screen relative">
      <StarField />
      <BackButton />
      <main className="relative z-10">
        <CakeSection />
        <div className="flex justify-center pb-20">
          <motion.button
            className="neon-button font-body cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => navigate("/letter")}
          >
            Read My Letter 💌
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default CakePage;
