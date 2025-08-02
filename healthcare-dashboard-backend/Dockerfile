# backend/Dockerfile
FROM python:3.9-slim-buster 
# Using a slim Python image for smaller size

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . .

# Expose the port that FastAPI (Uvicorn) will run on inside the container
EXPOSE 8000

# Command to run the FastAPI application
# `main:app` assumes your FastAPI app instance is named `app` in `main.py`
# `--host 0.0.0.0` ensures Uvicorn listens on all available network interfaces inside the container
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]