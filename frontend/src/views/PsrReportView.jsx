import React, { useState } from 'react';
import { 
  FileCheck, 
  Download, 
  ShieldCheck, 
  Printer, 
  QrCode, 
  ExternalLink,
  Building,
  CheckCircle2,
  AlertOctagon,
  Copy,
  Sparkles
} from 'lucide-react';

export default function PsrReportView() {
  const [selectedInst, setSelectedInst] = useState('Apex');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  const reportData = {
    Apex: {
      id: 'AICTE-PSR-2026-99245',
      name: 'Apex Institute of Technology & Engineering',
      approvalType: 'Extension of Approval (EoA) 2026-27',
      address: 'Sector 28, Hinjawadi Infotech Park, Pune, Maharashtra - 411057',
      councilRegion: 'Western Regional Office (WRO), Mumbai',
      program: 'Engineering & Technology (UG 4-Year B.Tech)',
      intake: 360,
      timestamp: '27-OCT-2026 14:32:09 IST',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      verdict: 'DEFICIENT_SHOW_CAUSE_ISSUED',
      verdictText: 'PROVISIONAL SCRUTINY REJECTION: SPLICED MUNICIPAL FIRE NOC',
      forensics: [
        { doc: 'Municipal Fire Safety NOC', status: 'FLAGGED_TAMPERED', confidence: '93.8%', note: 'Spliced expiry date & cloned circular municipal stamp' },
        { doc: 'Registered Land Title Deed', status: 'VERIFIED_GENUINE', confidence: '98.2%', note: '7.8 Acres contiguous land confirmed via revenue records' },
        { doc: 'Structural Stability Certificate', status: 'VERIFIED_GENUINE', confidence: '96.5%', note: 'BIS registered structural engineer signature confirmed' }
      ],
      aph: [
        { metric: 'Faculty-Student Ratio (FSR)', standard: '1:15 (Req: 96)', actual: '1:16.8 (Act: 86)', status: 'DEFICIENT' },
        { metric: 'Cadre Ratio (Prof : Assoc : Asst)', standard: '1 : 2 : 6 (Req: 11:22:63)', actual: 'Act: 8 : 16 : 62', status: 'SHORTAGE' },
        { metric: 'Instructional Carpet Area', standard: '2,700 sq.m.', actual: '2,850 sq.m.', status: 'COMPLIANT' },
        { metric: 'Contiguous Land Area', standard: '7.5 Acres (Rural)', actual: '7.8 Acres', status: 'COMPLIANT' }
      ]
    },
    Kalinga: {
      id: 'AICTE-PSR-2026-88102',
      name: 'Kalinga Institute of Technology & Research',
      approvalType: 'Extension of Approval (EoA) 2026-27',
      address: 'Chandaka Industrial Estate, Patia, Bhubaneswar, Odisha - 751024',
      councilRegion: 'Eastern Regional Office (ERO), Kolkata',
      program: 'Electronics & Computer Science Engineering',
      intake: 240,
      timestamp: '27-OCT-2026 16:15:44 IST',
      sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      verdict: 'APPROVED_RECOMMENDED',
      verdictText: '100% STATUTORY APPROVAL RECOMMENDED',
      forensics: [
        { doc: 'Municipal Fire Safety NOC', status: 'VERIFIED_GENUINE', confidence: '98.6%', note: 'Clean ELA compression baseline; authentic municipal seal' },
        { doc: 'Registered Land Title Deed', status: 'VERIFIED_GENUINE', confidence: '99.1%', note: '8.5 Acres registered in name of the Society/Trust' },
        { doc: 'Architect Carpet Plan (Blueprints)', status: 'VERIFIED_GENUINE', confidence: '97.4%', note: 'CoA registered architect seal verified with live stamp' }
      ],
      aph: [
        { metric: 'Faculty-Student Ratio (FSR)', standard: '1:15 (Req: 64)', actual: '1:14.2 (Act: 68)', status: 'COMPLIANT' },
        { metric: 'Cadre Ratio (Prof : Assoc : Asst)', standard: '1 : 2 : 6 (Req: 7:14:43)', actual: 'Act: 8 : 15 : 45', status: 'COMPLIANT' },
        { metric: 'Instructional Carpet Area', standard: '1,800 sq.m.', actual: '2,150 sq.m.', status: 'COMPLIANT' },
        { metric: 'Contiguous Land Area', standard: '7.5 Acres', actual: '8.5 Acres', status: 'COMPLIANT' }
      ]
    }
  };

  const curr = reportData[selectedInst];

  const handleCopyHash = () => {
    navigator.clipboard.writeText(curr.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    try {
      // Call backend PDF generator
      const res = await fetch('/api/report/generate-psr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          institution_name: curr.name,
          application_id: curr.id,
          academic_year: '2026-27',
          institution_type: 'Engineering & Technology',
          intake: curr.intake,
          location: curr.address,
          overall_status: curr.verdict,
          forensic_score: curr.verdict === 'APPROVED_RECOMMENDED' ? 98.5 : 42.0,
          compliance_score: curr.verdict === 'APPROVED_RECOMMENDED' ? 96.0 : 68.0,
          detected_flags: curr.forensics.filter(f => f.status.includes('FLAGGED')).map(f => f.note)
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.download_url) {
          window.open(data.download_url, '_blank');
        }
      } else {
        // Fallback trigger print
        window.print();
      }
    } catch (err) {
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Title & Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-blue">
              <FileCheck size={13} />
              Preliminary Scrutiny Report (PSR)
            </span>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Statutory Decision-Support Dossier with Cryptographic Provenance
            </span>
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
            Preliminary Scrutiny Report (PSR) Dossier
          </h2>
          <p style={{ fontSize: '14px', color: '#64748B' }}>
            Official dossier compiled automatically for AICTE Scrutiny Committee, Standing Hearing Committee (SHC), and Appellate Committee.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select 
            value={selectedInst} 
            onChange={(e) => setSelectedInst(e.target.value)}
            style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', background: '#FFFFFF', fontWeight: 600 }}
          >
            <option value="Apex">Apex Institute of Tech (Tampered NOC Flagged)</option>
            <option value="Kalinga">Kalinga Institute of Tech (100% Approved)</option>
          </select>

          <button 
            onClick={handleDownloadPdf}
            className="btn btn-primary"
            style={{ padding: '9px 16px', fontSize: '13px' }}
            disabled={isGenerating}
          >
            <Download size={15} />
            {isGenerating ? 'Compiling PDF...' : 'Download Official PSR PDF'}
          </button>
        </div>
      </div>

      {/* Official Dossier Document Preview */}
      <div 
        className="card"
        style={{
          background: '#FFFFFF',
          maxWidth: '1050px',
          margin: '0 auto',
          width: '100%',
          padding: '48px 56px',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
          border: '1px solid #CBD5E1',
          position: 'relative'
        }}
      >
        {/* Government Letterhead Header */}
        <div style={{ borderBottom: '2.5px solid #0F172A', paddingBottom: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#1E3A8A', textTransform: 'uppercase' }}>
              Ministry of Education • Government of India
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', marginTop: '2px', letterSpacing: '-0.02em' }}>
              ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
            </h1>
            <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
              Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070 • www.aicte-india.org
            </div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563EB', marginTop: '6px' }}>
              PRELIMINARY SCRUTINY REPORT (PSR) — APPROVAL CYCLE 2026-27
            </div>
          </div>

          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            <div style={{ background: '#0F172A', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              {curr.id}
            </div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>
              Date: <strong>{curr.timestamp}</strong>
            </div>
          </div>
        </div>

        {/* Institution Particulars Grid */}
        <div style={{ background: '#F8FAFC', padding: '16px 20px', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '14px', fontSize: '13px' }}>
            <div>
              <span style={{ color: '#64748B', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>Institution Name & Address:</span>
              <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '14.5px', marginTop: '2px' }}>{curr.name}</div>
              <div style={{ color: '#475569', fontSize: '12px', marginTop: '2px' }}>{curr.address}</div>
            </div>
            <div>
              <span style={{ color: '#64748B', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>AICTE Jurisdiction & Program:</span>
              <div style={{ fontWeight: 700, color: '#1E293B', marginTop: '2px' }}>{curr.councilRegion}</div>
              <div style={{ color: '#475569', fontSize: '12px' }}>{curr.program} (Intake: <strong>{curr.intake} seats</strong>)</div>
            </div>
          </div>
        </div>

        {/* Executive Verdict Banner */}
        <div 
          style={{
            padding: '16px 20px',
            borderRadius: '10px',
            marginBottom: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: curr.verdict === 'APPROVED_RECOMMENDED' ? '#ECFDF5' : '#FEF2F2',
            border: `1.5px solid ${curr.verdict === 'APPROVED_RECOMMENDED' ? '#10B981' : '#EF4444'}`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {curr.verdict === 'APPROVED_RECOMMENDED' ? (
              <CheckCircle2 size={26} color="#059669" />
            ) : (
              <AlertOctagon size={26} color="#DC2626" />
            )}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: curr.verdict === 'APPROVED_RECOMMENDED' ? '#065F46' : '#991B1B', textTransform: 'uppercase' }}>
                Statutory Scrutiny Committee Recommendation
              </div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: curr.verdict === 'APPROVED_RECOMMENDED' ? '#047857' : '#B91C1C' }}>
                {curr.verdictText}
              </div>
            </div>
          </div>
          <span className={`badge ${curr.verdict === 'APPROVED_RECOMMENDED' ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '13px', padding: '6px 14px' }}>
            {curr.verdict === 'APPROVED_RECOMMENDED' ? 'EoA APPROVED' : 'SHOW CAUSE HEARING'}
          </span>
        </div>

        {/* Section 1: Forensic Document Verification Findings */}
        <div style={{ marginBottom: '26px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', marginBottom: '12px' }}>
            1. Document Authenticity & Forensic Analysis (Vision AI / ELA)
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ background: '#F1F5F9', color: '#475569', textAlign: 'left', fontSize: '11.5px' }}>
                <th style={{ padding: '8px 12px' }}>Document Description</th>
                <th style={{ padding: '8px 12px' }}>Forensic Status</th>
                <th style={{ padding: '8px 12px' }}>Confidence Score</th>
                <th style={{ padding: '8px 12px' }}>Forensic Investigator Observations</th>
              </tr>
            </thead>
            <tbody>
              {curr.forensics.map((f, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#0F172A' }}>{f.doc}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span className={`badge ${f.status.includes('FLAGGED') ? 'badge-rose' : 'badge-emerald'}`}>
                      {f.status.includes('FLAGGED') ? 'SUSPECTED FORGERY' : 'VERIFIED GENUINE'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: f.status.includes('FLAGGED') ? '#DC2626' : '#059669' }}>
                    {f.confidence}
                  </td>
                  <td style={{ padding: '10px 12px', color: '#475569' }}>{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 2: AICTE APH 2024-27 Norms Adherence */}
        <div style={{ marginBottom: '26px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', marginBottom: '12px' }}>
            2. Statutory Approval Process Handbook (APH 2024-27) Evaluation
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ background: '#F1F5F9', color: '#475569', textAlign: 'left', fontSize: '11.5px' }}>
                <th style={{ padding: '8px 12px' }}>Regulatory Norm Parameter</th>
                <th style={{ padding: '8px 12px' }}>Statutory Requirement</th>
                <th style={{ padding: '8px 12px' }}>Institutional Declaration</th>
                <th style={{ padding: '8px 12px' }}>Compliance Status</th>
              </tr>
            </thead>
            <tbody>
              {curr.aph.map((a, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#0F172A' }}>{a.metric}</td>
                  <td style={{ padding: '10px 12px', color: '#475569' }}>{a.standard}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#0F172A' }}>{a.actual}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span className={`badge ${a.status === 'COMPLIANT' ? 'badge-emerald' : 'badge-amber'}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cryptographic Ledger & Signatures */}
        <div style={{ borderTop: '2px solid #E2E8F0', paddingTop: '18px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '11.5px' }}>
          <div style={{ maxWidth: '650px' }}>
            <div style={{ fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#059669" />
              Cryptographic Audit Provenance (Immutable SHA-256 Ledger Hash)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <code style={{ background: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', color: '#1E293B', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                {curr.sha256}
              </code>
              <button onClick={handleCopyHash} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#2563EB' }}>
                <Copy size={13} />
              </button>
              {copiedHash && <span style={{ color: '#059669', fontSize: '11px', fontWeight: 600 }}>Copied!</span>}
            </div>
            <div style={{ color: '#94A3B8', fontSize: '11px', marginTop: '4px' }}>
              Digitally certified by PROOFX ReguLens AICTE Core Regulatory Engine • SIH26261
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '10px 16px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <QrCode size={48} color="#0F172A" style={{ margin: '0 auto' }} />
            <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700, marginTop: '4px' }}>
              SCAN TO VERIFY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
