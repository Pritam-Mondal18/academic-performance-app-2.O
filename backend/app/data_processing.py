import pandas as pd
import numpy as np
from typing import Tuple, List
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

# Expected numeric feature names that match your frontend
EXPECTED_NUMERIC_FEATURES = [
    "study_hours",          # per day
    "sleep_hours",          # per day
    "extracurricular",      # hours per week
    "social_media_hours",   # per day
    "attendance",           # percent
]

def load_dataset(csv_path: str) -> pd.DataFrame:
    """Load dataset from CSV and return as DataFrame."""
    return pd.read_csv(csv_path)

def infer_or_build_target(df: pd.DataFrame) -> Tuple[pd.DataFrame, str]:
    """
    Ensure dataset has a usable target column.
    If GPA/grades are continuous, bin into Low/Medium/High.
    """
    target_candidates = [
        "performance", "academic_performance", "target", "label",
        "final_grade", "grade", "G3", "gpa", "GPA"
    ]
    existing = [c for c in target_candidates if c in df.columns]

    if existing:
        ycol = existing[0]
        if pd.api.types.is_numeric_dtype(df[ycol]):
            df = df.copy()
            q = df[ycol].quantile([0.33, 0.66]).values
            bins = [-np.inf, q[0], q[1], np.inf]
            labels = ["Low", "Medium", "High"]
            df["__performance_binned__"] = pd.cut(df[ycol], bins=bins, labels=labels)
            ycol = "__performance_binned__"
        return df, ycol

    # If no obvious target, synthesize one heuristically
    df = df.copy()
    score = (
        (df.get("study_hours", 0) * 0.4)
        + (df.get("attendance", 0) * 0.3 / 10.0)
        + (df.get("sleep_hours", 0) * 0.2)
        - (df.get("social_media_hours", 0) * 0.2)
    )
    q = pd.Series(score).quantile([0.33, 0.66]).values
    bins = [-np.inf, q[0], q[1], np.inf]
    labels = ["Low", "Medium", "High"]
    df["performance"] = pd.cut(score, bins=bins, labels=labels)
    return df, "performance"

def select_features(df: pd.DataFrame, target_col: str) -> Tuple[pd.DataFrame, pd.Series, List[str], List[str]]:
    """
    Split dataset into X (features), y (target),
    and identify numeric + categorical features.
    """
    numeric_features = [f for f in EXPECTED_NUMERIC_FEATURES if f in df.columns]
    categorical_features = [c for c in df.columns if c not in numeric_features and c != target_col]

    # Keep only small-cardinality categoricals
    cat_filtered = []
    for c in categorical_features:
        if df[c].dtype == "O" or str(df[c].dtype).startswith("category"):
            if df[c].nunique() <= 30:
                cat_filtered.append(c)

    X = df[numeric_features + cat_filtered]
    y = df[target_col]

    return X, y, numeric_features, cat_filtered

def build_preprocessor(numeric_features: List[str], categorical_features: List[str]) -> ColumnTransformer:
    """Build preprocessing pipeline for numeric + categorical features."""
    transformers = []
    if numeric_features:
        transformers.append(("num", StandardScaler(), numeric_features))
    if categorical_features:
        transformers.append(("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features))

    return ColumnTransformer(transformers)
