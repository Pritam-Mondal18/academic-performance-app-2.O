import React, { useState } from "react";
import { motion } from "framer-motion";

const FormInput = ({ setResult }) => {
  const [formData, setFormData] = useState({
    study_hours: "",
    sleep_hours: "",
    attendance: "",
    social_activity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          study_hours: Number(formData.study_hours),
          sleep_hours: Number(formData.sleep_hours),
          attendance: Number(formData.attendance),
          social_activity: Number(formData.social_activity),
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong with prediction");
      }

      const data = await response.json();
      setResult(data.prediction); // pass result to parent (ResultDisplay)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-2xl shadow-md w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Enter Your Habits
      </h2>

      {["study_hours", "sleep_hours", "attendance", "social_activity"].map(
        (field) => (
          <div className="mb-3" key={field}>
            <label className="block text-gray-700 mb-1 capitalize">
              {field.replace("_", " ")}
            </label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
        )
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </motion.form>
  );
};

export default FormInput;
