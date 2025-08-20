from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional

from .model import load_model, predict_from_input


# ============================================================
# FastAPI app
# ============================================================

app = FastAPI(
    title="Academic Performance Predictor API",
    description="API for predicting academic performance based on student habits",
    version="2.0"
)

# Load model + metadata at startup
MODEL, META = load_model()


# ============================================================
# Schemas
# ============================================================

class PredictInput(BaseModel):
    study_hours: float
    sleep_hours: float
    extracurricular: float
    social_media_hours: float
    attendance: float
    gender: Optional[str] = None
    extracurricular_participation: Optional[str] = None
    parental_education_level: Optional[str] = None
    diet_quality: Optional[str] = None
    internet_quality: Optional[str] = None
    part_time_job: Optional[str] = None


class PredictOutput(BaseModel):
    prediction: str
    probability: Optional[float] = None
    class_probabilities: Optional[Dict[str, float]] = None


# ============================================================
# Routes
# ============================================================

@app.get("/")
def root():
    return {"message": "Academic Performance Predictor API is running 🚀"}


@app.post("/predict", response_model=PredictOutput)
def predict(payload: PredictInput):
    try:
        result = predict_from_input(MODEL, payload.dict(), META)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
