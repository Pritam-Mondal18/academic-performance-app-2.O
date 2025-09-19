import React, { useState } from "react";
import Loader from "./Loader"; // ✅ import reusable Loader
import "./ScorePredictionForm.css";

const initialForm = {
  age: 20,
  gender: "Male",
  study_hours_per_day: 4,
  social_media_hours: 2,
  netflix_hours: 1,
  part_time_job: "No",
  attendance_percentage: 90,
  sleep_hours: 7,
  diet_quality: "Good",
  exercise_frequency: 3,
  parental_education_level: "Bachelor",
  internet_quality: "Good",
  mental_health_rating: 7,
  extracurricular_participation: "Yes",
};

const ScorePredictionForm = ({ onPrediction, darkMode }) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const payload = {
        age: Number(form.age),
        gender: form.gender,
        study_hours_per_day: Number(form.study_hours_per_day),
        social_media_hours: Number(form.social_media_hours),
        netflix_hours: Number(form.netflix_hours),
        part_time_job: form.part_time_job,
        attendance_percentage: Number(form.attendance_percentage),
        sleep_hours: Number(form.sleep_hours),
        diet_quality: form.diet_quality,
        exercise_frequency: Number(form.exercise_frequency),
        parental_education_level: form.parental_education_level,
        internet_quality: form.internet_quality,
        mental_health_rating: Number(form.mental_health_rating),
        extracurricular_participation: form.extracurricular_participation,
      };

      const response = await fetch("http://localhost:8000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if ("predicted_exam_score" in data && onPrediction) {
        onPrediction(data.predicted_exam_score);
      } else {
        setErr(data.detail || "Prediction failed");
      }
    } catch (error) {
      setErr("API Error: " + error.message);
    }
    setLoading(false);
  };

  const fields = [
    { label: "Age", name: "age", type: "number", min: 10, max: 30, step: 1 },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    {
      label: "Study Hours Per Day",
      name: "study_hours_per_day",
      type: "number",
      min: 0,
      max: 24,
      step: 0.1,
    },
    {
      label: "Social Media Hours",
      name: "social_media_hours",
      type: "number",
      min: 0,
      max: 24,
      step: 0.1,
    },
    {
      label: "Netflix Hours",
      name: "netflix_hours",
      type: "number",
      min: 0,
      max: 24,
      step: 0.1,
    },
    {
      label: "Part Time Job",
      name: "part_time_job",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      label: "Attendance Percentage",
      name: "attendance_percentage",
      type: "number",
      min: 0,
      max: 100,
      step: 0.1,
    },
    {
      label: "Sleep Hours",
      name: "sleep_hours",
      type: "number",
      min: 0,
      max: 24,
      step: 0.1,
    },
    {
      label: "Diet Quality",
      name: "diet_quality",
      type: "select",
      options: ["Good", "Fair", "Poor"],
    },
    {
      label: "Exercise Frequency (per week)",
      name: "exercise_frequency",
      type: "number",
      min: 0,
      max: 20,
      step: 1,
    },
    {
      label: "Parental Education Level",
      name: "parental_education_level",
      type: "select",
      options: ["No Formal Education", "High School", "Bachelor", "Master"],
    },
    {
      label: "Internet Quality",
      name: "internet_quality",
      type: "select",
      options: ["Good", "Average", "Poor"],
    },
    {
      label: "Mental Health Rating (1-10)",
      name: "mental_health_rating",
      type: "number",
      min: 1,
      max: 10,
      step: 1,
    },
    {
      label: "Extracurricular Participation",
      name: "extracurricular_participation",
      type: "select",
      options: ["Yes", "No"],
    },
  ];

  return (
    <form
      className={`score-form ${darkMode ? "dark" : "light"}`}
      onSubmit={handleSubmit}
    >
      {fields.map(({ label, name, type, min, max, step, options }) => (
        <div key={name} className="field">
          <label>{label}:</label>
          {type === "select" ? (
            <select
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              min={min}
              max={max}
              step={step}
              value={form[name]}
              onChange={handleChange}
              required
            />
          )}
        </div>
      ))}

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? (
          <Loader overlay={false} size="small" />
        ) : (
          "Predict Exam Score"
        )}
      </button>

      {err && <div className="error">{err}</div>}
    </form>
  );
};

export default ScorePredictionForm;
