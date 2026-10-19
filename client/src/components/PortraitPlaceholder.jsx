import { UserRound } from "lucide-react";
import { motion } from "framer-motion";

export default function PortraitPlaceholder() {
  return (
    <motion.div
      className="portrait-column"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="portrait-orbit orbit-one" />
      <div className="portrait-orbit orbit-two" />
      <span className="portrait-spark spark-one">✦</span>
      <span className="portrait-spark spark-two">✦</span>

      <div className="portrait-frame">
        <div className="portrait-placeholder">
          <UserRound size={62} strokeWidth={1.1} />
          <span>Your portrait goes here</span>
          <small>Temporary placeholder</small>
        </div>
      </div>

      <p className="portrait-caption">COMPUTER SCIENCE <span>·</span> PERSONAL PORTFOLIO</p>
    </motion.div>
  );
}