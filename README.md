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

```
.
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── schemas.py
│   │   └── train_model.py
│   └── data/
│       ├── best_model.pkl
│       └── student_habits_performance.csv
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── DashboardMain.jsx
    │   │   ├── GaugeCard.jsx
    │   │   ├── ScorePredictionForm.jsx
    │   │   └── Sidebar.jsx
    │   ├── App.jsx
    │   └── main.jsx
├── .gitignore
├── LICENSE
└── README.md
```



---

## Installation

### Prerequisites

- Node.js & npm
- Python 3.8+
- pip

---

### Backend Setup

1. Navigate to backend directory:

``` cd backend```


2. Create virtual environment and activate (recommended):

python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate


3. Install dependencies:

pip install -r requirements.txt


4. Optionally train the model:

python app/train_model.py


5. Run backend server:

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000


---

## Frontend Setup

1. Navigate to frontend directory:

cd frontend


2. Install dependencies:

npm install


3. Start frontend dev server:

npm run dev


4. Visit app at [http://localhost:5173](http://localhost:5173)

---

## Usage

- Input details into the frontend form.
- Click "Predict Exam Score".
- View predicted score visualized on the dashboard gauge.
- Use sliders and selectors to explore different inputs.
- Backend handles all ML computation transparently.

---

## API Endpoints

- `GET /` - Root endpoint, returns welcome message.
- `POST /api/predict` - Accepts student data in JSON, returns predicted exam score.

Request JSON should match `StudentData` schema including fields like age, gender, study_hours_per_day, etc.

---

## Model Training

Model trained using scikit-learn’s RandomForestRegressor.

- Data preprocessing with OneHotEncoder for categorical, StandardScaler for numeric.
- Trained on `student_habits_performance.csv`.
- Saves pipeline to `best_model.pkl`.
- Trained model used by backend for predictions.

---

## Deployment

- Ensure backend and frontend communicate via configured CORS.
- Use production ASGI server (e.g., Gunicorn with Uvicorn workers) for backend.
- Serve frontend static files with optimized build (`npm run build`).
- Consider Dockerizing for portability.

---




