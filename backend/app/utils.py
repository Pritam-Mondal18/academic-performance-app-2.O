from pathlib import Path
import joblib

# Project paths
BASE_DIR = Path(__file__).resolve().parent.parent  # backend/
APP_DIR = Path(__file__).resolve().parent          # backend/app
PROJECT_ROOT = BASE_DIR.parent                     # project root
DATASET_PATH = PROJECT_ROOT / "dataset" / "student_habits_academic_performance.csv"

# Model artifacts (kept inside app/ to respect your locked structure)
MODEL_PATH = APP_DIR / "model_artifact.pkl"
PIPELINE_PATH = APP_DIR / "preprocess_pipeline.pkl"
META_PATH = APP_DIR / "model_meta.joblib"

def save_artifact(obj, path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(obj, path)

def load_artifact(path: Path):
    return joblib.load(path)

def artifacts_exist() -> bool:
    return MODEL_PATH.exists() and PIPELINE_PATH.exists() and META_PATH.exists()
