import { motion } from "framer-motion";

export function Loader() {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Chargement du site BEGEC TP"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(135deg, #0a1d52 0%, #1F3C88 60%, #1a3580 100%)" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "36px 36px" }}
      />

      {/* Brand mark */}
      <motion.div
        className="relative z-10 mb-8 text-center"
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-white">
          BEGEC <span style={{ color: "#F5A623" }}>TP</span>
        </div>
        <div className="text-blue-200 text-xs md:text-sm tracking-[0.3em] uppercase mt-2">
          Bâtir l'Avenir
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="relative z-10 w-48 h-1 rounded-full overflow-hidden bg-white/15">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #F5A623, #ffce6b)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
