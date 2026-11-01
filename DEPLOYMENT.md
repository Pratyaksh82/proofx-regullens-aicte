# PROOFX • ReguLens AICTE — Production Deployment Guide
**Smart India Hackathon 2026** | **Problem Statement: SIH26261**  
**Team Name:** PROOFX | **Team ID:** 198271  

This directory contains the production-grade deployment configurations for **PROOFX ReguLens AICTE**, enabling frictionless deployment across **Docker**, **Render**, and **Vercel**.

---

## Architecture Overview

```
                      +---------------------------------------+
                      |          Client / Browser             |
                      +---------------------------------------+
                                          |
                                          | HTTP / HTTPS
                                          v
                      +---------------------------------------+
                      |         Unified FastAPI Server        |
                      |           (Uvicorn ASGI)              |
                      +---------------------------------------+
                         |                                 |
            /api/*, /docs, /static              /* (Static Frontend SPA)
                         |                                 |
                         v                                 v
          +-------------------------------+    +------------------------+
          |  FastAPI Endpoints            |    | React 19 / Vite SPA    |
          |  - ELA Forensics Engine       |    | - Scrutiny Dashboard   |
          |  - Stamp/Seal Contour Matcher |    | - Forensic Studio      |
          |  - AICTE APH 2024-27 Solver   |    | - APH Rule Engine      |
          |  - ReportLab PSR Generator    |    | - PSR Dossier Builder  |
          +-------------------------------+    +------------------------+
```

---

## 1. Local & Production Docker Deployment

### Prerequisites
- Docker & Docker Compose installed.

### Option A: One-Command Docker Compose (Recommended)
From the `proofx/` directory, run:
```bash
docker compose up --build
```

### Option B: Direct Docker Build & Run
```bash
# Build the multi-stage image
docker build -t proofx-regullens-aicte:latest .

# Run container exposing port 8000
docker run -d --name proofx -p 8000:8000 proofx-regullens-aicte:latest
```

The container automatically:
1. Compiles the React 19 frontend into an optimized static bundle.
2. Installs Python 3.11 backend dependencies including OpenCV headless.
3. Mounts the compiled frontend inside the FastAPI server.
4. Exposes `http://localhost:8000/` serving both the UI and all `/api` endpoints.

---

## 2. 1-Click Render Cloud Deployment

Render hosts the unified Python + React service on its global cloud infrastructure.

### Deployment Steps:
1. Push your repository to GitHub or GitLab.
2. Log in to [Render Dashboard](https://dashboard.render.com).
3. Click **New +** -> **Blueprint**.
4. Connect your repository and select `proofx/render.yaml` (or create a Web Service pointing to `proofx/`).
5. Configure the service:
   - **Environment:** `Python`
   - **Build Command:** `./build.sh`
   - **Start Command:** `python -m uvicorn main:app --app-dir backend --host 0.0.0.0 --port $PORT`
   - **Health Check Path:** `/api/health`
6. Click **Create Web Service**.

Your app will be live with free automatic SSL (e.g., `https://proofx-regullens-aicte.onrender.com`).

---

## 3. Vercel Frontend Deployment (Optional Decoupled Setup)

If you prefer deploying the frontend separately to Vercel's Edge CDN:
1. Import the repository into [Vercel](https://vercel.com).
2. Set **Root Directory** to `proofx/frontend` (or use the root with `proofx/vercel.json`).
3. Set **Framework Preset** to `Vite`.
4. Deploy!

To route API calls to a live backend, update `vercel.json` rewrites or configure the `VITE_API_BASE_URL` environment variable.

---

## 4. Verification & Health Monitoring

Once deployed, verify the installation using standard HTTP checks:

| Endpoint | Method | Expected Response | Description |
| :--- | :--- | :--- | :--- |
| `/` | `GET` | `200 OK (HTML)` | Renders the React 19 Scrutiny Desk |
| `/api/health` | `GET` | `200 OK (JSON)` | Verifies backend vitality and SIH metadata |
| `/docs` | `GET` | `200 OK (Swagger)` | Interactive OpenAPI documentation |

### Health Check Response:
```json
{
  "status": "online",
  "service": "PROOFX ReguLens AICTE Core API",
  "team": "PROOFX",
  "team_id": "198271",
  "problem_statement": "SIH26261",
  "version": "1.0.0"
}
```

---

## 5. Automated CI/CD Testing

To run the automated forensic and statutory test suite:
```bash
# Inside proofx/
python -m pytest backend/tests/test_backend.py -v
```
All 4 test suites pass in `< 0.3s`.
