import os
import sys

# Ensure backend directory is in sys.path for reliable module resolution
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.api.endpoints import router as api_router

app = FastAPI(
    title="PROOFX • ReguLens AICTE Core API",
    description="SIH26261: AI-Powered Application Validation, Document Authentication & Regulatory Compliance Verification",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for local Vite development and production deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Router
app.include_router(api_router, prefix="/api")

# Static mounting for generated reports
reports_dir = os.path.join(current_dir, "app", "reports_generated")
os.makedirs(reports_dir, exist_ok=True)
app.mount("/static/reports", StaticFiles(directory=reports_dir), name="reports")

# Check for production frontend build (dist)
frontend_dist_1 = os.path.join(os.path.dirname(current_dir), "frontend", "dist")
frontend_dist_2 = os.path.join(current_dir, "dist")

dist_path = None
if os.path.exists(frontend_dist_1) and os.path.isfile(os.path.join(frontend_dist_1, "index.html")):
    dist_path = frontend_dist_1
elif os.path.exists(frontend_dist_2) and os.path.isfile(os.path.join(frontend_dist_2, "index.html")):
    dist_path = frontend_dist_2

if dist_path:
    # Mount assets folder
    assets_dir = os.path.join(dist_path, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    # Serve sample files if present
    samples_dir = os.path.join(dist_path, "samples")
    if os.path.exists(samples_dir):
        app.mount("/samples", StaticFiles(directory=samples_dir), name="samples")

    @app.get("/")
    def serve_index():
        return FileResponse(os.path.join(dist_path, "index.html"))

    @app.get("/{full_path:path}")
    def serve_frontend_spa(full_path: str):
        # Exclude internal API, docs, and static routes
        if full_path.startswith(("api", "docs", "redoc", "static", "openapi.json")):
            raise HTTPException(status_code=404, detail="Resource Not Found")
        file_path = os.path.join(dist_path, full_path)
        if full_path and os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(dist_path, "index.html"))
else:
    @app.get("/")
    def root():
        return {
            "project": "PROOFX ReguLens AICTE",
            "team": "PROOFX",
            "team_id": "198271",
            "problem_statement": "SIH26261",
            "status": "active",
            "documentation": "/docs",
            "health": "/api/health"
        }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
