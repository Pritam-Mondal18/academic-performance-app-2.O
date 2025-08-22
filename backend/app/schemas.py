from pydantic import BaseModel

# Use this to put shared schemas if you expand API later
class StudentData(BaseModel):
    age: int
    study_hours_per_day: float
    sleep_hours: float
    attendance_percentage: float
    gender: str
    part_time_job: str
    diet_quality: str
    parental_education_level: str
    internet_quality: str
    extracurricular_participation: str
