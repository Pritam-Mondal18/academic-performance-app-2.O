from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
import uvicorn

from .model import ensure_model_ready, predict_from_input

app = FastAPI(title="Academic Performance Predictor API", version="1.0.0")

# CORS for Vite dev server + allow all (tighten in prod)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictInput(BaseModel):
    study_hours: float = Field(..., ge=0, description="Average study hours per day")
    sleep_hours: float = Field(..., ge=0, description="Average sleep hours per day")
    extracurricular: float = Field(..., ge=0, description="Extracurricular hours per week")
    social_media_hours: float = Field(..., ge=0, description="Social media hours per day")
    attendance: float = Field(..., ge=0, le=100, description="Attendance percentage 0-100")

class PredictOutput(BaseModel):
    prediction: str
    probability: Optional[float] = None
    class_probabilities: Optional[dict] = None

BOOT = ensure_model_ready()
MODEL = BOOT["model"]

@app.get("/healthcheck")
def healthcheck():
    return {"status": "ok", "model_loaded": True, "fresh_train": BOOT["fresh_train"]}

@app.post("/predict", response_model=PredictOutput)
def predict(payload: PredictInput):
    try:
        result = predict_from_input(MODEL, payload.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/")
def root():
    return {"message": "Academic Performance Predictor API. Use POST /predict."}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
