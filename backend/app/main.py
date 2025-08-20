from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

# Load your ML model (replace with your actual model path)
model = joblib.load("model.joblib")

app = FastAPI()

# Allow CORS for your frontend URL (localhost for dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict to your frontend in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserBehavior(BaseModel):
    # Define features based on your dataset columns, example:
    study_time: int
    failures: int
    absences: int
    # Add other fields as per dataset, typically numerical or encoded categorical fields

@app.get("/")
async def root():
    return {"message": "Academic Performance API Running"}

@app.post("/predict")
async def predict_performance(data: UserBehavior):
    # Prepare input array (ensure order matches training)
    features = np.array([
        data.study_time,
        data.failures,
        data.absences,
        # Include all required features here
    ]).reshape(1, -1)
    
    prediction = model.predict(features)
    score = model.predict_proba(features).max()  # Confidence score
    
    return {"prediction": int(prediction[0]), "confidence": float(score)}
