import sys
import os
import io
import unittest
from PIL import Image, ImageDraw

# Add backend directory to sys.path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, backend_dir)

from app.models.schemas import (
    AphRuleEvaluationRequest,
    ForensicAnalysisResult,
    StampVerificationResult,
    PsrDossierRequest
)
from app.rules.aph_rules import AphRuleEngine
from app.forensics.ela_engine import ErrorLevelAnalysisEngine
from app.forensics.stamp_matcher import StampMatcherEngine
from app.forensics.psr_generator import PsrGenerator

class TestProofxBackend(unittest.TestCase):

    def setUp(self):
        self.output_dir = os.path.join(backend_dir, "tests", "test_output")
        os.makedirs(self.output_dir, exist_ok=True)

    def test_aph_rules_evaluation(self):
        # Scenario A: Deficient institution (carpet deficit and cadre deficit)
        req = AphRuleEvaluationRequest(
            institution_name="Test Institute of Technology",
            total_student_intake=1200,
            declared_carpet_sqm=8760.0, # Required is 1200 * 7.5 = 9000. Deficit = -240
            land_area_acres=7.5,
            professors=8,
            associate_professors=18,
            assistant_professors=64,
            fire_noc_valid=True,
            fire_noc_validity_date="2026-03-31",
            fdr_lien_confirmed=True
        )
        res = AphRuleEngine.evaluate(req)
        
        self.assertEqual(res.overall_status, "DEFICIENT")
        self.assertEqual(res.carpet_deficit_sqm, -240.0)
        self.assertTrue(len(res.critical_deficiencies) > 0)
        self.assertTrue(len(res.sha256_hash) == 64)

    def test_ela_forensics_engine(self):
        # Create a synthetic image with a tampered text patch
        img = Image.new("RGB", (400, 200), (255, 255, 255))
        draw = ImageDraw.Draw(img)
        draw.text((20, 30), "VALIDITY: 2023", fill=(0, 0, 0))
        
        # Save baseline to JPEG
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=90)
        
        # Spliced edit: paste text with high-frequency edges simulating digital tampering
        img_tampered = Image.open(buf)
        draw_t = ImageDraw.Draw(img_tampered)
        draw_t.text((100, 30), "2026 FORGED", fill=(0, 0, 150))
        
        buf_tampered = io.BytesIO()
        img_tampered.save(buf_tampered, format="JPEG", quality=95)
        
        ela = ErrorLevelAnalysisEngine()
        result = ela.analyze_image(buf_tampered.getvalue(), filename="tampered_test.jpg")
        
        self.assertTrue(result.tampering_detected)
        self.assertTrue(result.compression_delta > 0)
        self.assertIsNotNone(result.heatmap_data_uri)

    def test_stamp_matcher_engine(self):
        # Create synthetic image with blue circular stamp
        img = Image.new("RGB", (400, 400), (255, 255, 255))
        draw = ImageDraw.Draw(img)
        draw.ellipse([150, 150, 250, 250], outline=(30, 58, 138), width=3)
        draw.ellipse([160, 160, 240, 240], outline=(30, 58, 138), width=2)
        draw.text((170, 195), "APPROVED", fill=(30, 58, 138))
        
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        
        matcher = StampMatcherEngine()
        res = matcher.detect_and_verify_seal(buf.getvalue())
        
        self.assertTrue(res.stamp_detected)
        self.assertEqual(res.verification_status, "VERIFIED")
        self.assertTrue(res.match_percentage > 90.0)

    def test_psr_pdf_generation(self):
        req_eval = AphRuleEvaluationRequest()
        eval_res = AphRuleEngine.evaluate(req_eval)
        
        forensic_res = ForensicAnalysisResult(
            document_id="DOC-99812",
            filename="fire_noc.pdf",
            tampering_detected=True,
            forensic_score=68.5,
            compression_delta=94.2,
            font_mismatch_detected=True,
            audit_summary="Tampered validity date detected with 94.2% compression delta.",
            bounding_boxes=[]
        )
        
        stamp_res = StampVerificationResult(
            stamp_detected=True,
            confidence=0.984,
            match_percentage=98.4,
            verification_status="VERIFIED",
            issuer="MUNICIPAL FIRE & RESCUE SERVICES",
            registration_no="FSC/2024/MUM/8821",
            details="Authentic municipal stamp verified."
        )
        
        dossier_req = PsrDossierRequest(
            institution_name="Technovation Engineering Institute",
            evaluation_result=eval_res,
            forensic_result=forensic_res,
            stamp_result=stamp_res,
            officer_remarks="Preliminary scrutiny report generated autonomously by PROOFX."
        )
        
        resp = PsrGenerator.generate_dossier(dossier_req, self.output_dir)
        self.assertEqual(resp.status, "SUCCESS")
        self.assertTrue(os.path.exists(os.path.join(self.output_dir, resp.pdf_filename)))
        self.assertTrue(len(resp.sha256_audit_hash) == 64)

if __name__ == "__main__":
    unittest.main()
