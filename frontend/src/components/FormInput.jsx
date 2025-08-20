import React, { useState } from "react";

const FormInput = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    study_hours: "",
    sleep_hours: "",
    extracurricular: "",
    social_media_hours: "",
    attendance: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Study Hours (per day):
        <input
          type="number"
          name="study_hours"
          value={formData.study_hours}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Sleep Hours (per day):
        <input
          type="number"
          name="sleep_hours"
          value={formData.sleep_hours}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Extracurricular Activities (hours per week):
        <input
          type="number"
          name="extracurricular"
          value={formData.extracurricular}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Social Media Usage (hours per day):
        <input
          type="number"
          name="social_media_hours"
          value={formData.social_media_hours}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Attendance Percentage:
        <input
          type="number"
          name="attendance"
          value={formData.attendance}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict"}
      </button>
    </form>
  );
};

export default FormInput;
