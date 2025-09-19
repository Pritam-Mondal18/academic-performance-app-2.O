import React from "react";

const About = () => {
  return (
    <div>
      <h2>About</h2>
      <p style={{ maxWidth: "700px", lineHeight: 1.6 }}>
        This Academic Performance Predictor leverages behavioral patterns and
        lifestyle factors to estimate student exam scores.
        <br />
        It is built with React (frontend) and FastAPI + Machine Learning
        (backend).
      </p>
    </div>
  );
};

export default About;
