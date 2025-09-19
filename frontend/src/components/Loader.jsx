import React from "react";
import { motion } from "framer-motion";
import "./Loader.css";

/**
 * Loader Component
 * @param {boolean} overlay - if true, shows fullscreen overlay
 * @param {string} size - "small" | "medium" | "large"
 * @param {boolean} darkMode - adapt spinner colors to theme
 */
const Loader = ({ overlay = true, size = "medium", darkMode = true }) => {
  const sizeMap = { small: 20, medium: 48, large: 72 };
  const spinnerSize = sizeMap[size] || sizeMap.medium;

  const spinner = (
    <div
      className="spinner"
      style={{
        width: spinnerSize,
        height: spinnerSize,
        borderWidth: spinnerSize / 6,
        borderColor: darkMode
          ? "rgba(255,255,255,0.3)" // dim border
          : "rgba(0,0,0,0.15)",
        borderTopColor: darkMode ? "#6d6afa" : "#3b38e2", // accent changes
      }}
    ></div>
  );

  if (overlay) {
    return (
      <motion.div
        className="loader-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {spinner}
      </motion.div>
    );
  }

  return spinner;
};

export default Loader;
