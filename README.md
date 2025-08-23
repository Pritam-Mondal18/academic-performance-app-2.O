# Academic Performance Predictor

A full-stack web application that predicts student exam scores based on lifestyle, study habits, and demographics using a machine learning model served via an API.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Model Training](#model-training)
- [Deployment](#deployment)
- [License](#license)

---

## Features

- Interactive React dashboard with sliders, dropdowns, and forms.
- Real-time exam score prediction powered by a Random Forest model.
- Visual score gauge display.
- Backend API built with FastAPI for prediction service.
- Modular and scalable architecture.

---

## Tech Stack

### Frontend

- React for dynamic user interface.
- CSS Grid and Flexbox for layout design.
- Fetch API for backend communication.

### Backend

- Python 3 + FastAPI for API server.
- Pydantic for request data validation.
- Joblib to load saved ML models.
- Pandas for data manipulation.
- scikit-learn RandomForestRegressor for prediction model.
- Uvicorn as ASGI server.

---

## Project Structure

`.
├── backend/
│ ├── app/
│ │ ├── main.py
│ │ ├── schemas.py
│ │ └── train_model.py
│ ├── data/
│ │ ├── best_model.pkl
│ │ └── student_habits_performance.csv
└── frontend/
├── src/
│ ├── components/
│ │ ├── DashboardMain.jsx
│ │ ├── GaugeCard.jsx
│ │ ├── ScorePredictionForm.jsx
│ │ └── Sidebar.jsx
│ ├── App.jsx
│ └── main.jsx
`


---

## Installation

### Prerequisites

- Node.js & npm
- Python 3.8+
- pip

---

### Backend Setup

1. Navigate to backend directory:


