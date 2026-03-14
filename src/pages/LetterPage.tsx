import StarField from "@/components/StarField";
import BackButton from "@/components/BackButton";
import FinalLetter from "@/components/FinalLetter";

const LetterPage = () => {
  return (
    <div className="midnight-gradient min-h-screen relative">
      <StarField />
      <BackButton />
      <main className="relative z-10">
        <FinalLetter />
      </main>
    </div>
  );
};

export default LetterPage;
