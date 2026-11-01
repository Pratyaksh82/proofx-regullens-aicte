import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from app.models.schemas import (
    ForensicAnalysisResult,
    StampVerificationResult,
    AphRuleEvaluationRequest,
    AphRuleEvaluationResult,
    PsrDossierRequest,
    PsrDossierResponse
)
from app.forensics.ela_engine import ErrorLevelAnalysisEngine
from app.forensics.stamp_matcher import StampMatcherEngine
from app.rules.aph_rules import AphRuleEngine
from app.forensics.psr_generator import PsrGenerator

router = APIRouter()

ela_engine = ErrorLevelAnalysisEngine()
stamp_engine = StampMatcherEngine()
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "reports_generated")
os.makedirs(OUTPUT_DIR, exist_ok=True)

@router.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "PROOFX ReguLens AICTE Core API",
        "team": "PROOFX",
        "team_id": "198271",
        "problem_statement": "SIH26261",
        "version": "1.0.0"
    }

@router.post("/audit/document", response_model=ForensicAnalysisResult)
async def audit_document(file: UploadFile = File(...)):
    """
    Performs pixel-level Error Level Analysis (ELA) and compression delta forensics.
    Identifies spliced dates, tampered stamps, and graphic alterations.
    """
    if not file.content_type.startswith("image/") and not file.filename.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
        raise HTTPException(status_code=400, detail="Only standard image scans (PNG, JPG, JPEG, WEBP) are supported for pixel forensics.")
    
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    result = ela_engine.analyze_image(contents, filename=file.filename)
    return result

@router.post("/audit/stamp", response_model=StampVerificationResult)
async def verify_stamp(file: UploadFile = File(...)):
    """
    Detects circular official government seals, analyzes ink density and contour geometry,
    and returns confidence match against statutory registry.
    """
    contents = await file.read()
    result = stamp_engine.detect_and_verify_seal(contents)
    return result

@router.post("/rules/evaluate", response_model=AphRuleEvaluationResult)
def evaluate_aph_rules(request: AphRuleEvaluationRequest):
    """
    Evaluates institutional declarations against AICTE Approval Process Handbook (APH 2024-27).
    Calculates 1:2:6 cadre ratios, instructional carpet deficit, and land norms.
    """
    result = AphRuleEngine.evaluate(request)
    return result

@router.post("/report/generate-psr", response_model=PsrDossierResponse)
def generate_psr_dossier(request: PsrDossierRequest):
    """
    Compiles full Preliminary Scrutiny Report (PSR) PDF with embedded SHA-256 cryptographic provenance.
    """
    result = PsrGenerator.generate_dossier(request, OUTPUT_DIR)
    return result

@router.get("/report/download/{filename}")
def download_report(filename: str):
    """
    Downloads generated PSR dossier.
    """
    file_path = os.path.join(OUTPUT_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Requested report not found.")
    return FileResponse(file_path, media_type="application/pdf", filename=filename)
