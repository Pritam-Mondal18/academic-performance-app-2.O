import React, { useState } from "react";

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

const ScorePredictionForm = () => {
  const [form, setForm] = useState(initialForm);
  const [score, setScore] = useState(null);
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
    setScore(null);
    setErr("");
    try {
      const response = await fetch("http://localhost:8000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if ("predicted_exam_score" in data) {
        setScore(data.predicted_exam_score);
      } else {
        setErr(data.detail || "Prediction failed");
      }
    } catch (error) {
      setErr("API Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
      {/* Age */}
      <label>
        Age:
        <input
          type="number"
          name="age"
          min={10}
          max={30}
          value={form.age}
          onChange={handleChange}
          required
        />
      </label>

      {/* Gender */}
      <label>
        Gender:
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </label>

      {/* Study Hours Per Day */}
      <label>
        Study Hours Per Day:
        <input
          type="number"
          step="0.1"
          name="study_hours_per_day"
          min={0}
          max={24}
          value={form.study_hours_per_day}
          onChange={handleChange}
          required
        />
      </label>

      {/* Social Media Hours */}
      <label>
        Social Media Hours:
        <input
          type="number"
          step="0.1"
          name="social_media_hours"
          min={0}
          max={24}
          value={form.social_media_hours}
          onChange={handleChange}
        />
      </label>

      {/* Netflix Hours */}
      <label>
        Netflix Hours:
        <input
          type="number"
          step="0.1"
          name="netflix_hours"
          min={0}
          max={24}
          value={form.netflix_hours}
          onChange={handleChange}
        />
      </label>

      {/* Part Time Job */}
      <label>
        Part Time Job:
        <select
          name="part_time_job"
          value={form.part_time_job}
          onChange={handleChange}
          required
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </label>

      {/* Attendance Percentage */}
      <label>
        Attendance Percentage:
        <input
          type="number"
          step="0.1"
          name="attendance_percentage"
          min={0}
          max={100}
          value={form.attendance_percentage}
          onChange={handleChange}
          required
        />
      </label>

      {/* Sleep Hours */}
      <label>
        Sleep Hours:
        <input
          type="number"
          step="0.1"
          name="sleep_hours"
          min={0}
          max={24}
          value={form.sleep_hours}
          onChange={handleChange}
          required
        />
      </label>

      {/* Diet Quality */}
      <label>
        Diet Quality:
        <select
          name="diet_quality"
          value={form.diet_quality}
          onChange={handleChange}
          required
        >
          <option>Good</option>
          <option>Fair</option>
          <option>Poor</option>
        </select>
      </label>

      {/* Exercise Frequency */}
      <label>
        Exercise Frequency (per week):
        <input
          type="number"
          name="exercise_frequency"
          min={0}
          max={20}
          value={form.exercise_frequency}
          onChange={handleChange}
          required
        />
      </label>

      {/* Parental Education Level */}
      <label>
        Parental Education Level:
        <select
          name="parental_education_level"
          value={form.parental_education_level}
          onChange={handleChange}
          required
        >
          <option>No Formal Education</option>
          <option>High School</option>
          <option>Bachelor</option>
          <option>Master</option>
        </select>
      </label>

      {/* Internet Quality */}
      <label>
        Internet Quality:
        <select
          name="internet_quality"
          value={form.internet_quality}
          onChange={handleChange}
          required
        >
          <option>Good</option>
          <option>Average</option>
          <option>Poor</option>
        </select>
      </label>

      {/* Mental Health Rating */}
      <label>
        Mental Health Rating (1-10):
        <input
          type="number"
          name="mental_health_rating"
          min={1}
          max={10}
          value={form.mental_health_rating}
          onChange={handleChange}
          required
        />
      </label>

      {/* Extracurricular Participation */}
      <label>
        Extracurricular Participation:
        <select
          name="extracurricular_participation"
          value={form.extracurricular_participation}
          onChange={handleChange}
          required
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict Exam Score"}
      </button>

      {score !== null && (
        <div
          style={{ marginTop: "1rem", fontWeight: "bold", color: "#fd4a4a" }}
        >
          Predicted Exam Score: {score.toFixed(2)} / 100
        </div>
      )}
      {err && <div style={{ marginTop: "1rem", color: "#b00020" }}>{err}</div>}
    </form>
  );
};

export default ScorePredictionForm;
