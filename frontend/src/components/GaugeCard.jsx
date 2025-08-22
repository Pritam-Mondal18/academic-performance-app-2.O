import React from "react";

const GaugeCard = ({ value = 0, maxValue = 100 }) => {
  const percentage = Math.min(Math.max(value, 0), maxValue) / maxValue;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <div
      style={{
        backgroundColor: "#232642",
        borderRadius: "24px",
        padding: "24px 32px",
        minWidth: 220,
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fd4a4a",
        fontWeight: 700,
        boxShadow: "0 8px 24px #1a1f2baa",
      }}
    >
      <svg width={180} height={180}>
        <circle
          stroke="#4a4b6a"
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
        {/* /100 BELOW SCORE */}
        <text
          x="50%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="20"
          fill="#fff"
        >
          /{maxValue}
        </text>
      </svg>
      <span style={{ marginTop: 16, fontSize: 18, color: "#aab4cc" }}>
        Your Score
      </span>
    </div>
  );
};

export default GaugeCard;
