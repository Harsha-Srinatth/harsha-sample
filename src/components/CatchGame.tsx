import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { playCollectSound, playBoomSound, playClickSound, playCelebrationSound } from "@/utils/sounds";

interface FallingItem {
  id: number;
  x: number;
  y: number;
  type: "heart" | "cake" | "gift" | "bomb" | "broken" | "nickname";
  emoji: string;
  speed: number;
}

interface Props {
  onWin: () => void;
}

const ITEM_CONFIG = {
  heart: { emoji: "❤️", points: 1 },
  cake: { emoji: "🎂", points: 1 },
  gift: { emoji: "🎁", points: 1 },
  bomb: { emoji: "💣", points: 0 },
  broken: { emoji: "💔", points: 0 },
  nickname: { emoji: "💝", points: 10 },
};

const CatchGame = ({ onWin }: Props) => {
  const [score, setScore] = useState(0);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [won, setWon] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const catcherXRef = useRef(50);
  const [catcherX, setCatcherX] = useState(50);

  const WINNING_SCORE = 30;

  useEffect(() => {
    if (score >= WINNING_SCORE && !won) {
      playCelebrationSound();
      setWon(true);
      setGameStarted(false);
      setTimeout(() => onWin(), 800);
    }
  }, [score, onWin, won]);

  const spawnItem = useCallback(() => {
    const types: FallingItem["type"][] = ["heart", "cake", "gift", "bomb", "broken", "nickname"];
    const weights = [30, 25, 25, 8, 7, 5];
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    let type: FallingItem["type"] = "heart";
    for (let i = 0; i < types.length; i++) {
      r -= weights[i];
      if (r <= 0) { type = types[i]; break; }
    }

    const item: FallingItem = {
      id: idRef.current++,
      x: 5 + Math.random() * 85,
      y: -5,
      type,
      emoji: ITEM_CONFIG[type].emoji,
      speed: 0.4 + Math.random() * 0.4,
    };
    setItems((prev) => [...prev, item]);
  }, []);

  useEffect(() => {
    if (!gameStarted) return;
    const spawnInterval = setInterval(spawnItem, 1000);
    return () => clearInterval(spawnInterval);
  }, [gameStarted, spawnItem]);

  useEffect(() => {
    if (!gameStarted) return;
    let raf: number;
    const tick = () => {
      setItems((prev) => {
        const next: FallingItem[] = [];
        const cx = catcherXRef.current;
        prev.forEach((item) => {
          const ny = item.y + item.speed;
          if (ny > 88) {
            const diff = Math.abs(item.x - cx);
            if (diff < 14) {
              const cfg = ITEM_CONFIG[item.type];
              if (item.type === "bomb" || item.type === "broken") {
                playBoomSound();
                setScore(0);
                setMessage(item.type === "bomb" ? "💥 Boom! Haha!" : "💔 Oops!");
                setTimeout(() => setMessage(""), 1000);
              } else {
                playCollectSound();
                setScore((s) => s + cfg.points);
                if (item.type === "nickname") {
                  setMessage("🔥 BANGARAM 10x!");
                  setTimeout(() => setMessage(""), 1200);
                }
              }
            }
            return;
          }
          next.push({ ...item, y: ny });
        });
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [gameStarted]);

  const updateCatcherX = (clientX: number) => {
    if (!gameRef.current) return;
    const rect = gameRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(5, Math.min(95, x));
    catcherXRef.current = clamped;
    setCatcherX(clamped);
  };

  const handleTouch = (e: React.TouchEvent) => {
    updateCatcherX(e.touches[0].clientX);
  };

  const handleMouse = (e: React.MouseEvent) => {
    updateCatcherX(e.clientX);
  };

  if (won) {
    return (
      <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center"
        >
          <p className="text-5xl mb-4">🎉</p>
          <h3 className="font-display text-3xl text-primary glow-text-gold mb-2">You Won!</h3>
          <p className="text-muted-foreground font-body">Score: {score} — Time to cut the cake! 🎂</p>
        </motion.div>
      </section>
    );
  }

  if (!gameStarted) {
    return (
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-4xl text-primary glow-text-gold mb-4">Catch My Heart</h2>
        <p className="text-muted-foreground font-body text-center mb-2 max-w-xs">
          Move the teddy to catch hearts, cakes & gifts! Avoid bombs 💣
        </p>
        <p className="text-secondary font-body text-sm mb-6">Reach {WINNING_SCORE} points to unlock the cake! 🎂</p>
        <motion.button
          className="neon-button font-body"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => {
            playClickSound();
            setGameStarted(true);
          }}
        >
          Start Game 🎮
        </motion.button>
      </motion.section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-primary font-body font-bold text-xl glow-text-gold">Score: {score}</span>
        <span className="text-muted-foreground font-body text-sm">/ {WINNING_SCORE}</span>
      </div>
      {message && (
        <motion.p
          className="text-secondary font-body font-bold text-lg mb-2"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {message}
        </motion.p>
      )}
      <div
        ref={gameRef}
        className="game-area relative w-full max-w-sm mx-auto"
        style={{ height: "65vh", touchAction: "none" }}
        onTouchMove={handleTouch}
        onMouseMove={handleMouse}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute text-2xl pointer-events-none"
            style={{ left: `${item.x}%`, top: `${item.y}%`, transform: "translate(-50%, -50%)" }}
          >
            {item.emoji}
          </div>
        ))}
        <div
          className="absolute text-4xl"
          style={{ left: `${catcherX}%`, bottom: "4%", transform: "translateX(-50%)" }}
        >
          🧸
        </div>
      </div>
    </section>
  );
};

export default CatchGame;
