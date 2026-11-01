# ==============================================================================
# PROOFX • ReguLens AICTE — Production Multi-Stage Container Image
# SIH26261: AI-Powered Application Validation, Document Forensics & APH Compliance
# ==============================================================================

# Stage 1: Build the React 19 / Vite Frontend SPA
FROM node:20-alpine AS frontend-builder
WORKDIR /build

# Install dependencies with frozen lockfile / clean install
COPY frontend/package.json ./
RUN npm install

# Copy frontend source and build static production bundle
COPY frontend/ ./
RUN npm run build

# Stage 2: Production Python Backend Runtime
FROM python:3.11-slim AS final

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

# Install essential system libraries for OpenCV headless and imaging
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python backend dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy backend application source
COPY backend/ /app/

# Copy compiled frontend SPA bundle into backend for unified serving
COPY --from=frontend-builder /build/dist /app/dist

# Expose production port
EXPOSE 8000

# Health check to ensure service vitality
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:${PORT:-8000}/api/health || exit 1

# Launch production ASGI server
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
