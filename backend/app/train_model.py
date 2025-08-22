import pandas as pd
import numpy as np
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib


DATA_PATH = os.path.join(os.path.dirname(__file__), '../data/student_habits_performance.csv')
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../data/best_model.pkl')


# Load dataset
df = pd.read_csv(DATA_PATH)


# Drop student_id as unique identifier
df = df.drop(columns=['student_id'])


# Target and features
X = df.drop(columns=['exam_score'])
y = df['exam_score']


# Categorical and numerical columns
cat_cols = ['gender', 'part_time_job', 'diet_quality', 'parental_education_level', 'internet_quality', 'extracurricular_participation']
num_cols = [col for col in X.columns if col not in cat_cols]


# Preprocessing pipeline
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), num_cols),
        ('cat', OneHotEncoder(drop='first', sparse_output=False), cat_cols)  # Changed here
    ])


# Model pipeline
model_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=150, random_state=42))
])


# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


# Train
model_pipeline.fit(X_train, y_train)


# Predict on test
y_pred = model_pipeline.predict(X_test)


print("MAE:", mean_absolute_error(y_test, y_pred))
print("R^2:", r2_score(y_test, y_pred))


# Save the pipeline (preprocessing + model)
joblib.dump(model_pipeline, MODEL_PATH)


print(f"Model saved to {MODEL_PATH}")
