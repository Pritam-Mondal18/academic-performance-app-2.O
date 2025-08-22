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

const ScorePredictionForm = ({ onPrediction }) => {
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
      // Prepare payload by explicitly converting numbers, ensuring no missing fields
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
      if ("predicted_exam_score" in data) {
        if (onPrediction) onPrediction(data.predicted_exam_score);
      } else {
        setErr(data.detail || "Prediction failed");
      }
    } catch (error) {
      setErr("API Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 420,
        margin: "1rem auto",
        padding: "1rem 2rem",
        backgroundColor: "#222542",
        borderRadius: "20px",
        display: "grid",
        gap: "1rem",
      }}
    >
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
          required
        />
      </label>

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
          required
        />
      </label>

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

      {err && <div style={{ color: "#b00020", fontWeight: 600 }}>{err}</div>}
    </form>
  );
};

export default ScorePredictionForm;
