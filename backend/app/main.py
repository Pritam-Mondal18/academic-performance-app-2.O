from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import pandas as pd

app = FastAPI()

# CORS allowing frontend origin (change to your frontend URL and port)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Example: Vite default frontend port
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

# Load model pipeline
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../data/best_model.pkl')
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    model = None
    print(f"Error loading model: {e}")

# Pydantic input schema matching your dataset columns except target/student_id
class StudentData(BaseModel):
    age: float
    gender: str
    study_hours_per_day: float
    social_media_hours: float
    netflix_hours: float
    part_time_job: str
    attendance_percentage: float
    sleep_hours: float
    diet_quality: str
    exercise_frequency: int
    parental_education_level: str
    internet_quality: str
    mental_health_rating: int
    extracurricular_participation: str

@app.get("/")
def read_root():
    return {"message": "Academic Performance Prediction API"}

@app.post("/api/predict")
def predict(data: StudentData):
    if model is None:
        raise HTTPException(status_code=503, detail="Model is not loaded")
    try:
        input_df = {
            'age': [data.age],
            'gender': [data.gender],
            'study_hours_per_day': [data.study_hours_per_day],
            'social_media_hours': [data.social_media_hours],
            'netflix_hours': [data.netflix_hours],
            'part_time_job': [data.part_time_job],
            'attendance_percentage': [data.attendance_percentage],
            'sleep_hours': [data.sleep_hours],
            'diet_quality': [data.diet_quality],
            'exercise_frequency': [data.exercise_frequency],
            'parental_education_level': [data.parental_education_level],
            'internet_quality': [data.internet_quality],
            'mental_health_rating': [data.mental_health_rating],
            'extracurricular_participation': [data.extracurricular_participation]
        }
        input_data = pd.DataFrame(input_df)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid input data: {e}")

    try:
        prediction = model.predict(input_data)
        predicted_score = float(prediction[0])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}")

    return {"predicted_exam_score": round(predicted_score, 2)}
