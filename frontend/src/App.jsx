import React, { useState } from "react";
import FormInput from "./components/FormInput";
import ResultDisplay from "./components/ResultDisplay";
import AnimatedWrapper from "./components/AnimatedWrapper";

const App = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePrediction = async (formData) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ error: "Something went wrong. Try again!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedWrapper>
      <div className="container">
        <h1 className="title">🎓 Academic Performance Predictor</h1>
        <p className="subtitle">
          Enter your study habits and lifestyle to predict academic performance
        </p>

        <FormInput onSubmit={handlePrediction} loading={loading} />
        {result && <ResultDisplay result={result} />}
      </div>
    </AnimatedWrapper>
  );
};

export default App;
