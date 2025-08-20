from typing import Dict, Any, Optional, Tuple
import os
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split

from .utils import (
    DATASET_PATH, MODEL_PATH,
    save_artifact, load_artifact
)
from .data_processing import (
    load_dataset, infer_or_build_target,
    select_features, build_preprocessor
)

# ---------------------------
# Train and Save Model
# ---------------------------

# def train_and_save_model() -> Tuple[Pipeline, Dict[str, Any]]:
#     """Train a RandomForest model and save it to disk."""
#     print("⚡ Training new model...")

#     # ✅ FIX: load_dataset must return a DataFrame
#     df = load_dataset(DATASET_PATH)
#     df = infer_or_build_target(df)

#     # Split features/target
#     X, y, numeric_features, categorical_features = select_features(df)

#     # Preprocessor
#     preprocessor = build_preprocessor(numeric_features, categorical_features)

#     # Define model
#     model = Pipeline([
#         ("preprocessor", preprocessor),
#         ("classifier", RandomForestClassifier(
#             n_estimators=200, random_state=42, class_weight="balanced"
#         ))
#     ])

#     # Train/val split
#     X_train, X_test, y_train, y_test = train_test_split(
#         X, y, test_size=0.2, random_state=42, stratify=y
#     )

#     # Fit model
#     model.fit(X_train, y_train)

#     # Evaluate
#     y_pred = model.predict(X_test)
#     print("📊 Classification Report:\n", classification_report(y_test, y_pred))

#     # Metadata
#     meta = {
#         "numeric_features": numeric_features,
#         "categorical_features": categorical_features,
#         "target_name": y.name if hasattr(y, "name") else "target",
#         "classes": list(model.classes_)
#     }

#     # Save model + metadata
#     save_artifact((model, meta), MODEL_PATH)

#     return model, meta

def train_and_save_model() -> Tuple[Pipeline, Dict[str, Any]]:
    """Train a RandomForest model and save it to disk."""
    print("⚡ Training new model...")

    # Load dataset
    df = load_dataset(DATASET_PATH)

    # Ensure target column
    df, target_col = infer_or_build_target(df)

    # Split features/target
    X, y, numeric_features, categorical_features = select_features(df, target_col)

    # Preprocessor
    preprocessor = build_preprocessor(numeric_features, categorical_features)

    # Define model
    model = Pipeline([
        ("preprocessor", preprocessor),
        ("classifier", RandomForestClassifier(
            n_estimators=200, random_state=42, class_weight="balanced"
        ))
    ])

    # Train/val split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Fit model
    model.fit(X_train, y_train)

    # Evaluate
    y_pred = model.predict(X_test)
    print("📊 Classification Report:\n", classification_report(y_test, y_pred))

    # Metadata
    meta = {
        "numeric_features": numeric_features,
        "categorical_features": categorical_features,
        "target_name": target_col,
        "classes": list(model.classes_)
    }

    # Save model + metadata
    save_artifact((model, meta), MODEL_PATH)

    return model, meta


# ---------------------------
# Load Model
# ---------------------------

def load_model() -> Tuple[Pipeline, Dict[str, Any]]:
    """Load trained model from disk, or train a new one if missing."""
    if not os.path.exists(MODEL_PATH):
        print("⚠️ Model file not found. Auto-training a new one...")
        return train_and_save_model()

    model, meta = load_artifact(MODEL_PATH)
    return model, meta

# ---------------------------
# Prediction
# ---------------------------

def predict_from_input(model, payload: Dict[str, Any], meta: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Build input DataFrame using the exact features the model was trained on.
    Falls back to the 5 numeric features if meta is unavailable.
    """
    if meta is not None:
        numeric_features = list(meta.get("numeric_features", []))
        categorical_features = list(meta.get("categorical_features", []))
        expected_cols = numeric_features + categorical_features
    else:
        numeric_features = ["study_hours", "sleep_hours", "extracurricular", "social_media_hours", "attendance"]
        categorical_features = []
        expected_cols = numeric_features

    row: Dict[str, Any] = {}

    # Fill numeric features
    for col in numeric_features:
        val = payload.get(col, 0)
        try:
            row[col] = float(val)
        except (TypeError, ValueError):
            row[col] = 0.0

    # Fill categorical features
    for col in categorical_features:
        row[col] = str(payload.get(col, ""))

    # Create dataframe with exact column order
    df = pd.DataFrame([row], columns=expected_cols)

    # Predict
    pred = model.predict(df)[0]
    out: Dict[str, Any] = {"prediction": str(pred)}

    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(df)[0]
        classes = list(getattr(model, "classes_", []))
        try:
            idx = classes.index(pred)
            out["probability"] = float(proba[idx])
        except Exception:
            pass
        out["class_probabilities"] = {str(c): float(p) for c, p in zip(classes, proba)}

    return out
