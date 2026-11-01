from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class BoundingBox(BaseModel):
    id: str
    x: float = Field(..., description="Normalized X coordinate (0-100%) or pixel X")
    y: float = Field(..., description="Normalized Y coordinate (0-100%) or pixel Y")
    width: float = Field(..., description="Width (percentage or pixels)")
    height: float = Field(..., description="Height (percentage or pixels)")
    label: str
    severity: str = Field(..., description="critical | warning | pass | info")
    confidence: float
    explanation: str
    tampered_text: Optional[str] = None
    expected_value: Optional[str] = None

class ForensicAnalysisResult(BaseModel):
    document_id: str
    filename: str
    tampering_detected: bool
    forensic_score: float = Field(..., description="0 to 100, where 100 is pristine authentic")
    compression_delta: float = Field(..., description="ELA compression difference %")
    font_mismatch_detected: bool
    bounding_boxes: List[BoundingBox] = []
    heatmap_data_uri: Optional[str] = None
    audit_summary: str
    metadata_exif: Dict[str, Any] = {}

class StampVerificationResult(BaseModel):
    stamp_detected: bool
    confidence: float
    match_percentage: float
    verification_status: str = Field(..., description="VERIFIED | TAMPERED | MISSING")
    issuer: str
    registration_no: str
    bounding_box: Optional[BoundingBox] = None
    seal_type: str = "Government Municipal / Fire Safety"
    details: str

class AphRuleEvaluationRequest(BaseModel):
    institution_name: str = "Technovation Engineering Institute"
    institution_type: str = "Technical Engineering (Degree)"
    total_student_intake: int = 1200
    declared_carpet_sqm: float = 8760.0
    land_area_acres: float = 7.5
    professors: int = 8
    associate_professors: int = 18
    assistant_professors: int = 64
    fire_noc_valid: bool = True
    fire_noc_validity_date: str = "2026-03-31"
    fdr_lien_confirmed: bool = True
    anti_ragging_undertaking: bool = True

class AphRuleEvaluationResult(BaseModel):
    overall_status: str = Field(..., description="APPROVED | CONDITIONAL | DEFICIENT | REJECTED")
    compliance_score: float = Field(..., description="Overall institutional score 0-100%")
    cadre_status: str
    cadre_target_ratio: str = "1 : 2 : 6"
    cadre_actual_ratio: str
    cadre_deficiencies: List[str] = []
    carpet_required_sqm: float
    carpet_declared_sqm: float
    carpet_deficit_sqm: float
    land_compliance: str
    fire_noc_compliance: str
    critical_deficiencies: List[str] = []
    warnings: List[str] = []
    passed_clauses: List[str] = []
    sha256_hash: str

class PsrDossierRequest(BaseModel):
    institution_name: str
    evaluation_result: AphRuleEvaluationResult
    forensic_result: ForensicAnalysisResult
    stamp_result: StampVerificationResult
    officer_remarks: Optional[str] = "Preliminary scrutiny automated verification passed with human-in-the-loop review."

class PsrDossierResponse(BaseModel):
    report_id: str
    institution_name: str
    generated_at: str
    sha256_audit_hash: str
    pdf_filename: str
    download_url: str
    status: str
