# Trackie – Academic Project Tracking Platform

Trackie is a role-based academic/project tracking web application built as part of the **Software Engineering coursework** for the **BS in Data Science and Applications, IIT Madras**.

It enables collaboration between **Admins**, **Instructors**, and **Students** through dedicated dashboards and role-specific workflows.

---

## 🌐 Live Demo

**Deployed URL:**  
https://soft-engg-project-sep-2024-se-sep-1-1sylj1nzp-trackie.vercel.app/

---

## 📌 Project Overview

Trackie supports academic management and project tracking in an educational setting.

### Core Objectives
- Provide role-based workflows for Admin, Instructor, and Student users
- Track student progress and participation
- Improve transparency and coordination among stakeholders
- Deliver a complete full-stack software engineering project

---

## ✨ Features

- Role-based authentication and authorization
- Admin management interface
- Instructor workflows for monitoring and evaluation
- Student interface for participation and progress tracking
- Deployed frontend for easy access

---

## 🧱 Tech Stack

- **Frontend:** Vue, TypeScript, HTML, CSS
- **Backend:** Python
- **Deployment:** Vercel (frontend)

---

## 🔐 Demo Credentials

Use the following credentials for quick access:

### 🔑 Admin Credentials
- **Email:** `admin@gmail.com`
- **Password:** `Admin@12`

### 🔑 Instructor Credentials
- **Email:** `instructor1@gmail.com`
- **Password:** `Instructor@121`

> Instructors **1 through 5** are available.  
> Example: `instructor2@gmail.com` / `Instructor@122`

### 🔑 Student Credentials
- **Email:** `student1@gmail.com`
- **Password:** `Student@121`

> Students **1 through 5** are available.  
> Example: `student2@gmail.com` / `Student@122`

---

## 📁 Repository Structure

```text
.
├── README.md
├── frontend-1/        # Vue + TypeScript frontend
├── backend/           # Python backend (if present)
└── ...
```

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/mudgalma/soft-engg-project-sep-2024-se-sep-1.git
cd soft-engg-project-sep-2024-se-sep-1
```

### 2. Setup frontend

```bash
cd frontend-1
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

### 3. Setup backend (example)

```bash
cd backend
python -m venv .venv
```

Activate environment:

- **Windows**
  ```bash
  .venv\Scripts\activate
  ```
- **macOS/Linux**
  ```bash
  source .venv/bin/activate
  ```

Install dependencies and run:

```bash
pip install -r requirements.txt
python -m flask --app app run --host=0.0.0.0 --port=5000
```

Set environment variables before starting backend:

```bash
export HF_TOKEN=your_huggingface_token
# optional alternative name used by some deployments:
# export HUGGINGFACEHUB_API_TOKEN=your_huggingface_token
```

---

## 🧪 Testing

If tests are configured:

- **Frontend:** `npm run test`
- **Backend:** `pytest`

---

## 🚀 Deployment

Frontend is deployed on Vercel:  
https://soft-engg-project-sep-2024-se-sep-1-1sylj1nzp-trackie.vercel.app/

For backend deployment on Render (Web Service), use a gunicorn start command that binds to Render's `$PORT`:

```bash
gunicorn --chdir backend --bind 0.0.0.0:$PORT app:app
```

Required backend environment variables for LLM endpoints:
- `HF_TOKEN` or `HUGGINGFACEHUB_API_TOKEN` (either one is accepted)

---

## 📚 Academic Context

This project was developed as coursework at **IIT Madras** for the **BS in Data Science and Applications** program, demonstrating practical full-stack software engineering and deployment.

---

## 🤝 Contribution

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

This project is currently intended for academic use.

---
