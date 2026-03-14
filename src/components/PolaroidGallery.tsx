import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  { id: 1, src: "/placeholder.svg", caption: "Us 💕", rotation: -8 },
  { id: 2, src: "/placeholder.svg", caption: "Forever ✨", rotation: 5 },
  { id: 3, src: "/placeholder.svg", caption: "My Teddy 🧸", rotation: -4 },
  { id: 4, src: "/placeholder.svg", caption: "Bangaram 💖", rotation: 7 },
];

const PolaroidGallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      <motion.h2
        className="font-display text-4xl text-primary glow-text-gold mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Our Memories
      </motion.h2>

      <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            className="polaroid-card cursor-pointer"
            style={{ rotate: photo.rotation }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(photo.id)}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full aspect-square object-cover rounded-sm"
            />
            <p className="text-center mt-2 text-sm font-body" style={{ color: "#333" }}>
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="polaroid-card max-w-sm w-full glow-gold"
              initial={{ scale: 0.7, rotate: 5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
            >
              <img
                src={photos.find((p) => p.id === selected)?.src}
                alt=""
                className="w-full aspect-square object-cover rounded-sm"
              />
              <p className="text-center mt-3 text-lg font-display" style={{ color: "#333" }}>
                {photos.find((p) => p.id === selected)?.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PolaroidGallery;
