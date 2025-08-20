from typing import Dict, Any
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from .utils import (
    DATASET_PATH, MODEL_PATH, PIPELINE_PATH, META_PATH,
    save_artifact, load_artifact, artifacts_exist
)
from .data_processing import load_dataset, infer_or_build_target, select_features, build_preprocessor

def train_and_save_model() -> Dict[str, Any]:
    df = load_dataset(DATASET_PATH)
    df, target_col = infer_or_build_target(df)
    df, num_feats, cat_feats = select_features(df)

    # Keep only rows with target
    df = df.dropna(subset=[target_col])

    X = df[num_feats + cat_feats]
    y = df[target_col].astype(str)

    pre = build_preprocessor(num_feats, cat_feats)
    clf = RandomForestClassifier(
        n_estimators=300,
        max_depth=None,
        random_state=42,
        class_weight="balanced_subsample"
    )
    pipe = Pipeline([("pre", pre), ("clf", clf)])

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    pipe.fit(X_train, y_train)

    # Evaluate (printed to console/logs)
    try:
        y_pred = pipe.predict(X_test)
        report = classification_report(y_test, y_pred, output_dict=True)
    except Exception:
        report = {}

    # Persist artifacts
    save_artifact(pipe, MODEL_PATH)
    meta = {
        "target_col": target_col,
        "numeric_features": num_feats,
        "categorical_features": cat_feats,
        "report": report,
    }
    save_artifact(meta, META_PATH)

    # Preprocessor is inside the pipeline; saving separately optional
    save_artifact(pre, PIPELINE_PATH)

    return meta

def load_model_and_meta():
    model = load_artifact(MODEL_PATH)
    meta = load_artifact(META_PATH)
    return model, meta

def ensure_model_ready() -> Dict[str, Any]:
    if artifacts_exist():
        model, meta = load_model_and_meta()
        return {"model": model, "meta": meta, "fresh_train": False}
    else:
        meta = train_and_save_model()
        model, meta2 = load_model_and_meta()
        return {"model": model, "meta": meta2, "fresh_train": True}

def predict_from_input(model, payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Payload keys should include:
      study_hours, sleep_hours, extracurricular, social_media_hours, attendance
    Missing keys will be filled with 0.
    """
    feature_order = ["study_hours", "sleep_hours", "extracurricular", "social_media_hours", "attendance"]
    row = {k: payload.get(k, 0) for k in feature_order}
    df = pd.DataFrame([row])

    pred = model.predict(df)[0]
    out: Dict[str, Any] = {"prediction": str(pred)}

    # Probability if classifier supports it
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(df)[0]
        classes = list(getattr(model, "classes_", []))
        # Confidence for predicted class
        try:
            idx = classes.index(pred)
            out["probability"] = float(proba[idx])
        except Exception:
            pass
        # Also return full distribution
        out["class_probabilities"] = {str(c): float(p) for c, p in zip(classes, proba)}

    return out
