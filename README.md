# healthcare-dashboard# Healthcare Dashboard

A responsive web application for managing patient data within a healthcare setting, featuring a dynamic patient list.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Frontend](#running-the-frontend)
  - [Running the Backend (FastAPI)](#running-the-backend-fastapi)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)

---

## About

This project is a work-in-progress frontend for a healthcare management dashboard, coupled with a Python FastAPI backend for data persistence and API services. Its primary current functionality is to display a comprehensive list of patients, allowing users to efficiently search, sort, and paginate through patient records.

---

## Features

### Implemented

- **Dynamic Patient List:** Displays essential patient information in a tabular format.
- **Client-Side Search:** Users can search patients by first name, last name, email, phone, medical status, and conditions.
- **Interactive Sorting:** Sort patient records by various columns (e.g., Name, Age, Last Visit, Status) in ascending or descending order.
- **Pagination:** Navigate through large datasets with adjustable rows per page.
- **Status Visualization:** Patient medical status (`active`, `inactive`, `critical`) is clearly indicated using colored Material-UI Chips.
- **Data Fetching with React Query:** Efficient data management, caching, and background re-fetching for the patient list.
- **View/Edit Navigation:** Buttons to navigate to individual patient detail/edit pages (links are present, but pages are placeholders).
- **FastAPI Backend:** A robust, high-performance Python backend serving patient data (currently using in-memory mock data, easily extendable to a database). Currently getting mock data from fast api

### Upcoming (Planned)

- **Full Patient Details View:** A dedicated page to view all information for a specific patient.
- **Patient Creation/Editing Forms:** Functionality to add new patients and modify existing records.
- **Database Integration:** Connect FastAPI backend to a persistent database (e.g., PostgreSQL, MongoDB).
- **Authentication & Authorization:** Secure access to the dashboard.
- **Role-Based Access Control:** Differentiate user permissions.
- **Comprehensive Medical Records:** Detailed views for allergies, medications, conditions, and documents.

---

## Technologies Used

- **Frontend:**

  - [React](https://react.dev/) - A JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript for better code quality and maintainability.
  - [Material-UI (MUI v5/v6)](https://mui.com/) - A comprehensive React UI framework.
  - [MUI X DataGrid (Community)](https://mui.com/x/react-data-grid/) - A powerful data table component with built-in sorting, filtering, and pagination.
  - [React Query (TanStack Query)](https://tanstack.com/query/latest) - For declarative, always-up-to-date, and cached data fetching.
  - [date-fns](https://date-fns.org/) - A modern JavaScript date utility library.
  - [React Router DOM](https://reactrouter.com/en/main) - For declarative routing in React applications.

- **Backend:**
  - [Python 3.x](https://www.python.org/) - The programming language.
  - [FastAPI](https://fastapi.tiangolo.com/) - A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
  - [Uvicorn](https://www.uvicorn.org/) - An ASGI server to run FastAPI applications.
  - [Pydantic](https://docs.pydantic.dev/) - For data validation and settings management using Python type hints.
  - _(Future: SQL/NoSQL database drivers, ORMs like SQLAlchemy, etc.)_

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js & npm/yarn:** Ensure you have Node.js (which includes npm) installed. You can download it from [nodejs.org](https://nodejs.org/). Yarn is also a popular alternative.
  - Node.js (LTS version recommended)
  - npm (comes with Node.js) or Yarn
- **Python 3.8+:** Download from [python.org](https://www.python.org/downloads/).
- **Git:** For cloning the repository.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [your-repository-url]
    cd [your-repository-name]
    ```

2.  **Frontend Setup:**

    ```bash
    cd frontend # Or your actual frontend directory name
    npm install
    # OR
    yarn install
    ```

3.  **Backend Setup:**

    ```bash
    cd ../backend # Adjust path if your backend folder has a different name or location
    # Create a virtual environment
    python3 -m venv venv
    # Activate the virtual environment
    # On macOS/Linux:
    source venv/bin/activate
    # On Windows (Command Prompt):
    .\venv\Scripts\activate
    # On Windows (PowerShell):
    .\venv\Scripts\Activate.ps1

    # Install backend dependencies
    pip install -r requirements.txt
    # If you don't have requirements.txt, you might need:
    # pip install fastapi uvicorn
    ```

    _Make sure you have a `requirements.txt` file in your `backend` directory containing `fastapi` and `uvicorn`, e.g.:_

    ```
    fastapi==0.111.0 # Or the version you used
    uvicorn==0.30.1 # Or the version you used
    ```

    cd backend # Ensure you are in the backend directory

# Run the FastAPI application using Uvicorn

uvicorn main:app --reload --port 8000

### Running the Frontend

Once the frontend dependencies are installed:

```bash
cd frontend # Ensure you are in the frontend directory
npm start
# OR
yarn start

```
