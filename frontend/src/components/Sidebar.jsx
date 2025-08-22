// import React, { useState } from "react";

// const initialInputs = {
//   question1: 0,
//   question2: 0,
//   question3: 0,
//   question4: 0,
//   gender: "Male",
//   parental_status: "Yes",
// };

// const Sidebar = () => {
//   const [inputs, setInputs] = useState(initialInputs);

//   // You can add handler functions to lift state up or use context as needed!

//   const handleSlider = (e) => {
//     setInputs({ ...inputs, [e.target.name]: Number(e.target.value) });
//   };
//   const handleSelect = (e) => {
//     setInputs({ ...inputs, [e.target.name]: e.target.value });
//   };

//   return (
//     <aside className="sidebar">
//       <div className="sidebar-header">
//         <span className="sidebar-dot dot-red"></span>
//         <span className="sidebar-dot dot-yellow"></span>
//         <span className="sidebar-dot dot-green"></span>
//       </div>

//       {[1, 2, 3, 4].map((num) => (
//         <div className="sidebar-section" key={num}>
//           <label>
//             Question {num}
//             <span className="value">{inputs["question" + num]}</span>
//           </label>
//           <input
//             type="range"
//             name={`question${num}`}
//             min="0"
//             max="10"
//             value={inputs[`question${num}`]}
//             onChange={handleSlider}
//           />
//         </div>
//       ))}

//       <div className="sidebar-section">
//         <label>Gender</label>
//         <select name="gender" value={inputs.gender} onChange={handleSelect}>
//           <option>Male</option>
//           <option>Female</option>
//         </select>
//       </div>
//       <div className="sidebar-section">
//         <label>Parental Status</label>
//         <select
//           name="parental_status"
//           value={inputs.parental_status}
//           onChange={handleSelect}
//         >
//           <option>Yes</option>
//           <option>No</option>
//         </select>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

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

  const handleSlider = (e) => {
    setInputs({ ...inputs, [e.target.name]: Number(e.target.value) });
  };

  const handleSelect = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const labelStyle = {
    color: "#b3b5c6",
    fontWeight: "600",
    marginBottom: "0.3rem",
  };

  const sliderStyle = {
    width: "100%",
    accentColor: "#7c3aed",
    cursor: "pointer",
  };

  const selectStyle = {
    width: "100%",
    background: "#1c2040",
    border: "1.8px solid #303458",
    color: "#fff",
    borderRadius: "14px",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    outline: "none",
  };

  const sidebarStyle = {
    width: "280px",
    backgroundColor: "#232642",
    padding: "2rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.8rem",
    borderRadius: "24px 0 0 24px",
  };

  const questionContainerStyle = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <aside style={sidebarStyle}>
      <div className="sidebar-header">
        <span className="sidebar-dot dot-red"></span>
        <span className="sidebar-dot dot-yellow"></span>
        <span className="sidebar-dot dot-green"></span>
      </div>
      {/* Questions sliders */}
      {[1, 2, 3, 4].map((num) => (
        <div key={`question${num}`} style={questionContainerStyle}>
          <label htmlFor={`question${num}`} style={labelStyle}>
            Question {num}
          </label>
          <input
            type="range"
            id={`question${num}`}
            name={`question${num}`}
            min={0}
            max={10}
            value={inputs[`question${num}`]}
            onChange={handleSlider}
            style={sliderStyle}
          />
          <span
            style={{
              color: "#fd4a4a",
              fontWeight: "600",
              textAlign: "right",
              marginTop: "0.2rem",
            }}
          >
            {inputs[`question${num}`]}
          </span>
        </div>
      ))}

      {/* Gender selector */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="gender" style={labelStyle}>
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={inputs.gender}
          onChange={handleSelect}
          style={selectStyle}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      {/* Parental Status selector */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="parental_status" style={labelStyle}>
          Parental Status
        </label>
        <select
          id="parental_status"
          name="parental_status"
          value={inputs.parental_status}
          onChange={handleSelect}
          style={selectStyle}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;
