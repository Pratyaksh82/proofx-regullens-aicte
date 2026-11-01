import math
import hashlib
import json
from datetime import datetime
from app.models.schemas import AphRuleEvaluationRequest, AphRuleEvaluationResult

class AphRuleEngine:
    """
    AICTE Approval Process Handbook (APH 2024-27) Mathematical Constraint Solver.
    Validates institutional statutory compliance against national regulatory standards.
    """

    # AICTE Standard Technical Degree Parameters
    STUDENT_FACULTY_RATIO = 20  # 1 faculty per 20 students
    CARPET_SQM_PER_STUDENT = 7.5 # Total instructional + administrative + amenities multiplier

    @classmethod
    def evaluate(cls, req: AphRuleEvaluationRequest) -> AphRuleEvaluationResult:
        critical_deficiencies = []
        warnings = []
        passed_clauses = []

        # -------------------------------------------------------------
        # 1. Faculty Cadre Ratio Evaluation (1 : 2 : 6)
        # -------------------------------------------------------------
        total_students = req.total_student_intake
        required_faculty = math.ceil(total_students / cls.STUDENT_FACULTY_RATIO)
        actual_faculty = req.professors + req.associate_professors + req.assistant_professors

        # Ideal division into 1:2:6 (total 9 units)
        req_prof = math.ceil(required_faculty * (1 / 9))
        req_assoc = math.ceil(required_faculty * (2 / 9))
        req_asst = math.ceil(required_faculty * (6 / 9))

        cadre_deficiencies = []
        if req.professors < req_prof:
            cadre_deficiencies.append(f"Professors deficit: Have {req.professors}, required {req_prof} (Shortfall: {req_prof - req.professors})")
        if req.associate_professors < req_assoc:
            cadre_deficiencies.append(f"Associate Professors deficit: Have {req.associate_professors}, required {req_assoc} (Shortfall: {req_assoc - req.associate_professors})")
        if req.assistant_professors < req_asst:
            cadre_deficiencies.append(f"Assistant Professors deficit: Have {req.assistant_professors}, required {req_asst} (Shortfall: {req_asst - req.assistant_professors})")

        actual_ratio_str = f"{req.professors} : {req.associate_professors} : {req.assistant_professors}"
        
        if len(cadre_deficiencies) == 0:
            cadre_status = "VERIFIED (Pass)"
            passed_clauses.append(f"Faculty Cadre Ratio compliant with APH Clause 7.1 (1:2:6 verified, {actual_faculty} faculty).")
        else:
            cadre_status = "DEFICIENT (Ratio Mismatch)"
            warnings.extend(cadre_deficiencies)

        # -------------------------------------------------------------
        # 2. Instructional Carpet Area Evaluation
        # -------------------------------------------------------------
        required_carpet = round(total_students * cls.CARPET_SQM_PER_STUDENT, 1)
        carpet_deficit = round(req.declared_carpet_sqm - required_carpet, 1)

        if carpet_deficit >= 0:
            passed_clauses.append(f"Instructional Carpet Area compliant: {req.declared_carpet_sqm} sq.m exceeds norm of {required_carpet} sq.m.")
        else:
            critical_deficiencies.append(
                f"Instructional Area Deficit: {carpet_deficit} sq.m (Declared {req.declared_carpet_sqm} sq.m vs required {required_carpet} sq.m under APH Appendix 4)."
            )

        # -------------------------------------------------------------
        # 3. Land & FSI Compliance
        # -------------------------------------------------------------
        # Minimum rural campus norm = 7.5 Acres, urban = 4.0 Acres
        min_land = 7.5
        if req.land_area_acres >= min_land:
            land_compliance = f"VERIFIED: {req.land_area_acres} Acres (Single Contiguous Parcel)"
            passed_clauses.append(f"Land Area compliant: {req.land_area_acres} Acres exceeds minimum requirement of {min_land} Acres.")
        else:
            land_compliance = f"DEFICIENT: Shortfall of {round(min_land - req.land_area_acres, 2)} Acres"
            critical_deficiencies.append(f"Land Area shortfall: {req.land_area_acres} Acres does not meet minimum {min_land} Acres contiguous norm.")

        # -------------------------------------------------------------
        # 4. Fire Safety NOC & Temporal Validity
        # -------------------------------------------------------------
        if req.fire_noc_valid:
            try:
                exp_date = datetime.strptime(req.fire_noc_validity_date, "%Y-%m-%d")
                now = datetime.now()
                if exp_date >= now:
                    fire_noc_compliance = f"VALID (Expires: {req.fire_noc_validity_date})"
                    passed_clauses.append("Fire Safety Clearance Certificate is current and unexpired.")
                else:
                    fire_noc_compliance = f"EXPIRED ({req.fire_noc_validity_date})"
                    critical_deficiencies.append(f"Fire Safety Clearance expired on {req.fire_noc_validity_date}. Extension of Approval barred.")
            except Exception:
                fire_noc_compliance = "INVALID DATE FORMAT"
                critical_deficiencies.append("Fire NOC validity date unparseable.")
        else:
            fire_noc_compliance = "REVOKED / UNVERIFIED"
            critical_deficiencies.append("Statutory Fire Safety NOC missing or revoked.")

        # -------------------------------------------------------------
        # 5. Financial & Statutory Undertakings
        # -------------------------------------------------------------
        if req.fdr_lien_confirmed:
            passed_clauses.append("Fixed Deposit Receipt (FDR) statutory joint lien confirmed with AICTE.")
        else:
            critical_deficiencies.append("FDR Joint Lien not registered with regulatory account.")

        if req.anti_ragging_undertaking:
            passed_clauses.append("Statutory Anti-Ragging affidavit verified for all current enrollments.")
        else:
            warnings.append("Anti-Ragging affidavits incomplete for latest intake cohort.")

        # -------------------------------------------------------------
        # 6. Compliance Scoring & Overall Status
        # -------------------------------------------------------------
        score = 100.0
        # Deduct for critical deficiencies
        score -= (len(critical_deficiencies) * 22.0)
        # Deduct for warnings
        score -= (len(warnings) * 7.5)
        compliance_score = max(10.0, min(100.0, round(score, 1)))

        if len(critical_deficiencies) > 0:
            overall_status = "DEFICIENT"
        elif len(warnings) > 0:
            overall_status = "CONDITIONAL"
        else:
            overall_status = "APPROVED"

        # Generate Cryptographic SHA-256 Provenance Hash
        from datetime import timezone
        audit_payload = {
            "institution": req.institution_name,
            "intake": total_students,
            "score": compliance_score,
            "status": overall_status,
            "deficiencies": critical_deficiencies,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        raw_str = json.dumps(audit_payload, sort_keys=True)
        sha_hash = hashlib.sha256(raw_str.encode("utf-8")).hexdigest()

        return AphRuleEvaluationResult(
            overall_status=overall_status,
            compliance_score=compliance_score,
            cadre_status=cadre_status,
            cadre_target_ratio="1 : 2 : 6",
            cadre_actual_ratio=actual_ratio_str,
            cadre_deficiencies=cadre_deficiencies,
            carpet_required_sqm=required_carpet,
            carpet_declared_sqm=req.declared_carpet_sqm,
            carpet_deficit_sqm=carpet_deficit,
            land_compliance=land_compliance,
            fire_noc_compliance=fire_noc_compliance,
            critical_deficiencies=critical_deficiencies,
            warnings=warnings,
            passed_clauses=passed_clauses,
            sha256_hash=sha_hash
        )
