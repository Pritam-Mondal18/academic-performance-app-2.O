// import React from "react";
// import { motion } from "framer-motion";

// const ResultDisplay = ({ result }) => {
//   if (result.error) {
//     return <p className="error">{result.error}</p>;
//   }

//   return (
//     <motion.div
//       className="result"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//     >
//       <h2>📊 Prediction Result</h2>
//       <p>
//         Predicted Academic Performance: <strong>{result.prediction}</strong>
//       </p>
//       {result.probability && (
//         <p>
//           Confidence: <strong>{(result.probability * 100).toFixed(2)}%</strong>
//         </p>
//       )}
//     </motion.div>
//   );
// };

// export default ResultDisplay;
import React from "react";
import { motion } from "framer-motion";

const ResultDisplay = ({ result }) => {
  if (!result) {
    return null; // don't show anything if no prediction yet
  }

  return (
    <motion.div
      className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-2xl shadow-md mt-4 max-w-md mx-auto text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold mb-2">Prediction Result</h3>
      <p className="text-xl font-bold">{result}</p>
    </motion.div>
  );
};

export default ResultDisplay;
