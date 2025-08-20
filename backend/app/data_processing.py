import pandas as pd
import numpy as np
from typing import Tuple, List, Dict
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split

# Expected numeric feature names that match your frontend
EXPECTED_NUMERIC_FEATURES = [
    "study_hours",          # per day
    "sleep_hours",          # per day
    "extracurricular",      # hours per week
    "social_media_hours",   # per day
    "attendance",           # percent
]

def load_dataset(csv_path) -> pd.DataFrame:
    df = pd.read_csv(csv_path)
    return df

def infer_or_build_target(df: pd.DataFrame) -> Tuple[pd.DataFrame, str]:
    """
    Try to find a usable target column. We look for common names.
    If only a continuous grade (e.g., GPA) is present, we bin into Low/Medium/High.
    """
    target_candidates = [
        "performance", "academic_performance", "target", "label",
        "final_grade", "grade", "G3", "gpa", "GPA"
    ]
    existing = [c for c in target_candidates if c in df.columns]

    if existing:
        ycol = existing[0]
        # If numeric continuous, bin to 3 classes
        if pd.api.types.is_numeric_dtype(df[ycol]):
            df = df.copy()
            q = df[ycol].quantile([0.33, 0.66]).values
            bins = [-np.inf, q[0], q[1], np.inf]
            labels = ["Low", "Medium", "High"]
            df["__performance_binned__"] = pd.cut(df[ycol], bins=bins, labels=labels)
            ycol = "__performance_binned__"
        return df, ycol

    # If no obvious target, synthesize a heuristic class from features (fallback)
    df = df.copy()
    # Simple heuristic score
    score = (
        (df.get("study_hours", 0) * 0.4)
        + (df.get("attendance", 0) * 0.3 / 10.0)  # scale percent
        + (df.get("sleep_hours", 0) * 0.2)
        - (df.get("social_media_hours", 0) * 0.2)
    )
    q = pd.Series(score).quantile([0.33, 0.66]).values
    bins = [-np.inf, q[0], q[1], np.inf]
    labels = ["Low", "Medium", "High"]
    df["performance"] = pd.cut(score, bins=bins, labels=labels)
    return df, "performance"

def select_features(df: pd.DataFrame) -> Tuple[pd.DataFrame, List[str], List[str]]:
    """
    Use our expected numeric features; any additional categoricals will be auto-detected.
    """
    numeric_features = [f for f in EXPECTED_NUMERIC_FEATURES if f in df.columns]
    categorical_features = [c for c in df.columns if c not in numeric_features]

    # Remove target-like columns from features
    for col in ["performance", "academic_performance", "target", "label", "final_grade", "grade", "G3", "gpa", "GPA", "__performance_binned__"]:
        if col in categorical_features:
            categorical_features.remove(col)
        if col in numeric_features:
            numeric_features.remove(col)

    # Keep only a reasonable set: our known numerics + any small-cardinality categoricals
    cat_filtered = []
    for c in categorical_features:
        if df[c].dtype == "O" or str(df[c].dtype).startswith("category"):
            if df[c].nunique() <= 30:
                cat_filtered.append(c)

    return df, numeric_features, cat_filtered

def build_preprocessor(numeric_features: List[str], categorical_features: List[str]) -> ColumnTransformer:
    transformers = []
    if numeric_features:
        transformers.append(("num", StandardScaler(), numeric_features))
    if categorical_features:
        transformers.append(("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features))

    if not transformers:
        # If somehow nothing selected, create a pass-through on an empty list (rare)
        return ColumnTransformer([], remainder="drop")
    return ColumnTransformer(transformers)
