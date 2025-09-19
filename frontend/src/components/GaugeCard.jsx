import React, { useEffect, useState } from "react";
import "./GaugeCard.css";

const GaugeCard = ({ value = 0, maxValue = 100, darkMode }) => {
  const [displayValue, setDisplayValue] = useState(0);

  // Animate the score from 0 → value
  useEffect(() => {
    let start = 0;
    const duration = 1000; // 1 second
    const stepTime = Math.abs(Math.floor(duration / value || 1));

    const counter = setInterval(() => {
      start += 1;
      if (start >= value) {
        start = value;
        clearInterval(counter);
      }
      setDisplayValue(start);
    }, stepTime);

    return () => clearInterval(counter);
  }, [value]);

  const percentage = Math.min(Math.max(displayValue, 0), maxValue) / maxValue;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <div className={`gauge-card ${darkMode ? "dark" : "light"}`}>
      {/* Tooltip */}
      <div className="tooltip">Predicted exam score based on your inputs</div>

      <svg width={180} height={180} className="gauge-svg">
        <circle
          className="gauge-bg"
          fill="transparent"
          strokeWidth={10}
          r={radius}
          cx={90}
          cy={90}
        />
        <circle
          className="gauge-progress"
          fill="transparent"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx={90}
          cy={90}
        />
        <defs>
          <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f44336" />
            <stop offset="40%" stopColor="#9c27b0" />
            <stop offset="100%" stopColor="#673ab7" />
          </linearGradient>
        </defs>

        {/* SCORE */}
        <text
          x="50%"
          y="45%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="44"
          className="gauge-score"
        >
          {Math.round(displayValue)}
        </text>

        {/* /100 BELOW SCORE */}
        <text
          x="50%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="20"
          className="gauge-max"
        >
          /{maxValue}
        </text>
      </svg>

      <span className="gauge-label">Your Score</span>
    </div>
  );
};

export default GaugeCard;
