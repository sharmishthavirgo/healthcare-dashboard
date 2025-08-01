# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict

app = FastAPI()

# --- CORS Configuration ---
origins = [
    "http://localhost:5173",  # Your Vite development server
    "http://127.0.0.1:5173",  # Another common localhost variation for Vite
    # Add your production frontend URL(s) here when deploying
    # "https://your-production-frontend.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # List of origins that are allowed to make requests
    allow_credentials=True,      # Allow cookies to be included in requests
    allow_methods=["*"],         # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],         # Allow all headers
)
# --- End CORS Configuration ---

# Example FastAPI endpoint
@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI Backend!"}

@app.get("/api/patients")
async def get_patients():
    # In a real app, you'd fetch this from a database
    patients = [
        {"id": "pat_001", "name": "Alice Smith", "age": 45, "condition": "Hypertension"},
        {"id": "pat_002", "name": "Bob Johnson", "age": 62, "condition": "Diabetes"},
    ]
    return patients

@app.post("/api/patients")
async def create_patient(patient_data: Dict):
    # In a real app, save to database and return the created object
    print(f"Received patient data: {patient_data}")
    return {"message": "Patient created successfully", "patient": patient_data}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
