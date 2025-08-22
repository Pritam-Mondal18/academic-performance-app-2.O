import React, { useState } from "react";

const initialForm = {
  age: 16,
  study_hours_per_day: 5,
  sleep_hours: 7,
  attendance_percentage: 85,
  gender: "Male",
  part_time_job: "Yes",
  diet_quality: "Poor",
  parental_education_level: "High School",
  internet_quality: "Average",
  extracurricular_participation: "No",
};

const ScorePredictionForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [predictedScore, setPredictedScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let val = value;
    if (type === "number" || type === "range") val = Number(value);
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPredictedScore(null);

    try {
      const response = await fetch("http://localhost:8000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Prediction failed");

      const data = await response.json();
      setPredictedScore(data.predicted_exam_score);
    } catch (err) {
      setError(err.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>
          Age: {formData.age}
          <input
            type="range"
            name="age"
            min="10"
            max="25"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Study Hours per Day: {formData.study_hours_per_day}
          <input
            type="range"
            name="study_hours_per_day"
            min="0"
            max="15"
            value={formData.study_hours_per_day}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Sleep Hours: {formData.sleep_hours}
          <input
            type="range"
            name="sleep_hours"
            min="3"
            max="12"
            value={formData.sleep_hours}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Attendance (%): {formData.attendance_percentage}
          <input
            type="range"
            name="attendance_percentage"
            min="0"
            max="100"
            value={formData.attendance_percentage}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Part-Time Job:
          <select
            name="part_time_job"
            value={formData.part_time_job}
            onChange={handleChange}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Diet Quality:
          <select
            name="diet_quality"
            value={formData.diet_quality}
            onChange={handleChange}
          >
            <option>Good</option>
            <option>Average</option>
            <option>Poor</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Parental Education Level:
          <select
            name="parental_education_level"
            value={formData.parental_education_level}
            onChange={handleChange}
          >
            <option>No Formal Education</option>
            <option>High School</option>
            <option>Bachelor's Degree</option>
            <option>Master's Degree or Higher</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Internet Quality:
          <select
            name="internet_quality"
            value={formData.internet_quality}
            onChange={handleChange}
          >
            <option>Poor</option>
            <option>Average</option>
            <option>Good</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Extracurricular Participation:
          <select
            name="extracurricular_participation"
            value={formData.extracurricular_participation}
            onChange={handleChange}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>
      </div>

      <button disabled={loading}>
        {loading ? "Predicting..." : "Predict Exam Score"}
      </button>

      {error && <div className="error-message">{error}</div>}

      {predictedScore !== null && !error && (
        <div className="result" role="status" aria-live="polite">
          🎯 {predictedScore.toFixed(2)} / 100
        </div>
      )}
    </form>
  );
};

export default ScorePredictionForm;
