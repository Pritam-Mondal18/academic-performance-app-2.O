import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import DashboardMain from "./components/DashboardMain";
import ScorePredictionForm from "./components/ScorePredictionForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Loader from "./components/Loader";

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -50 },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.4,
};

function App() {
  const [predictedScore, setPredictedScore] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Trigger loader on route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600); // 0.6s loader
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={darkMode ? "dark-mode" : "light-mode"}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Header */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Global Loader */}
      {loading && <Loader overlay darkMode={darkMode} />}

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem" }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Home */}
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <DashboardMain score={predictedScore} darkMode={darkMode} />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ScorePredictionForm
                      onPrediction={setPredictedScore}
                      darkMode={darkMode}
                    />
                  </div>
                </motion.div>
              }
            />

            {/* About */}
            <Route
              path="/about"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <About darkMode={darkMode} />
                </motion.div>
              }
            />

            {/* Contact */}
            <Route
              path="/contact"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Contact darkMode={darkMode} />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
