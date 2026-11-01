#!/usr/bin/env bash
# ==============================================================================
# PROOFX • ReguLens AICTE — Automated Build Script for Render / Linux Cloud
# ==============================================================================
set -o errexit

echo "======================================================================"
echo " PROOFX: ReguLens AICTE — Production Build Sequence"
echo " Problem Statement: SIH26261 | Team ID: 198271 | Team: PROOFX"
echo "======================================================================"

# Step 1: Compile React Frontend SPA
echo ">>> [1/3] Building React 19 Frontend SPA..."
cd frontend
npm install --include=optional
npm run build
cd ..

# Verify frontend build
if [ ! -f "frontend/dist/index.html" ]; then
    echo "ERROR: Frontend compilation failed! frontend/dist/index.html not found."
    exit 1
fi
echo ">>> Frontend build verified successfully."

# Step 2: Install Python Backend Dependencies
echo ">>> [2/3] Installing Python Backend Dependencies..."
pip install --upgrade pip
pip install -r backend/requirements.txt

# Step 3: Run Automated Verification Tests
echo ">>> [3/3] Running Forensic & APH Rule Engine Automated Tests..."
PYTHONPATH=backend pytest backend/tests/test_backend.py -v

echo "======================================================================"
echo " PROOFX Production Build & Verification Completed Successfully!"
echo "======================================================================"
