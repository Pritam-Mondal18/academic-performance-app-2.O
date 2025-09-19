import React from "react";
import "./GaugeCard.css";

const GaugeCard = ({ value = 0, maxValue = 100, darkMode }) => {
  const percentage = Math.min(Math.max(value, 0), maxValue) / maxValue;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <div className={`gauge-card ${darkMode ? "dark" : "light"}`}>
      <svg width={180} height={180}>
        <circle
          stroke={darkMode ? "#4a4b6a" : "#ccc"}
          fill="transparent"
          strokeWidth={10}
          r={radius}
          cx={90}
          cy={90}
        />
        <circle
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx={90}
          cy={90}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
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
          fill="#fd4a4a"
          fontWeight="bold"
        >
          {Math.round(value)}
        </text>
        {/* /100 */}
        <text
          x="50%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="20"
          fill={darkMode ? "#fff" : "#333"}
        >
          /{maxValue}
        </text>
      </svg>
      <span className="gauge-label">Your Score</span>
    </div>
  );
};

export default GaugeCard;
