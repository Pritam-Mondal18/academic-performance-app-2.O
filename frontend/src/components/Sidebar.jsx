import React, { useState } from "react";

const initialInputs = {
  question1: 0,
  question2: 0,
  question3: 0,
  question4: 0,
  gender: "Male",
  parental_status: "Yes",
};

const Sidebar = () => {
  const [inputs, setInputs] = useState(initialInputs);

  // You can add handler functions to lift state up or use context as needed!

  const handleSlider = (e) => {
    setInputs({ ...inputs, [e.target.name]: Number(e.target.value) });
  };
  const handleSelect = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-dot dot-red"></span>
        <span className="sidebar-dot dot-yellow"></span>
        <span className="sidebar-dot dot-green"></span>
      </div>

      {[1, 2, 3, 4].map((num) => (
        <div className="sidebar-section" key={num}>
          <label>
            Question {num}
            <span className="value">{inputs["question" + num]}</span>
          </label>
          <input
            type="range"
            name={`question${num}`}
            min="0"
            max="10"
            value={inputs[`question${num}`]}
            onChange={handleSlider}
          />
        </div>
      ))}

      <div className="sidebar-section">
        <label>Gender</label>
        <select name="gender" value={inputs.gender} onChange={handleSelect}>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
      <div className="sidebar-section">
        <label>Parental Status</label>
        <select
          name="parental_status"
          value={inputs.parental_status}
          onChange={handleSelect}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;
