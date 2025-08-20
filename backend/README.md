# Backend – Academic Performance Based on Behavioral Patterns

FastAPI service that trains/loads a RandomForest model and exposes `/predict`.

## Quick Start

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt

# Make sure dataset exists at:
# ../dataset/student_habits_academic_performance.csv

uvicorn app.main:app --reload --port 8000
```
