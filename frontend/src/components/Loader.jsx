import React from "react";
import { motion } from "framer-motion";
import "./Loader.css";

const Loader = () => {
  return (
    <motion.div
      className="loader-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="spinner"></div>
    </motion.div>
  );
};

export default Loader;
