import React from "react";
import { motion } from "framer-motion";

const ResultDisplay = ({ result }) => {
  if (result.error) {
    return <p className="error">{result.error}</p>;
  }

  return (
    <motion.div
      className="result"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>📊 Prediction Result</h2>
      <p>
        Predicted Academic Performance: <strong>{result.prediction}</strong>
      </p>
      {result.probability && (
        <p>
          Confidence: <strong>{(result.probability * 100).toFixed(2)}%</strong>
        </p>
      )}
    </motion.div>
  );
};

export default ResultDisplay;
