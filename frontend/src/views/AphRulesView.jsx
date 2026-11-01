import React, { useState } from 'react';
import { 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  RotateCcw, 
  FileText, 
  TrendingUp, 
  Sparkles,
  Building,
  GraduationCap,
  Users
} from 'lucide-react';

export default function AphRulesView() {
  // Preset templates
  const presets = {
    compliant: {
      name: 'Apex Institute of Technology (Compliant)',
      program: 'ENGINEERING_UG',
      location: 'RURAL',
      sanctionedIntake: 360,
      professors: 4,
      assocProfessors: 8,
      asstProfessors: 24,
      instructionalArea: 3200,
      adminArea: 800,
      amenitiesArea: 600,
      landArea: 8.5
    },
    deficient: {
      name: 'Sardar Patel College (Cadre & Carpet Deficit)',
      program: 'ENGINEERING_UG',
      location: 'RURAL',
      sanctionedIntake: 420,
      professors: 2,
      assocProfessors: 3,
      asstProfessors: 16,
      instructionalArea: 2450,
      adminArea: 650,
      amenitiesArea: 400,
      landArea: 6.8
    }
  };

  const [form, setForm] = useState(presets.deficient);
  const [evaluation, setEvaluation] = useState(null);

  const calculateNorms = () => {
    const intake = Number(form.sanctionedIntake) || 0;
    // Engineering UG: 4-year degree -> Total students = intake * 4
    const totalStudents = intake * 4;
    // Statutory FSR 1:15 for Engineering UG
    const requiredFaculty = Math.ceil(totalStudents / 15);
    const totalFaculty = Number(form.professors) + Number(form.assocProfessors) + Number(form.asstProfessors);
    const fsr = (totalStudents / (totalFaculty || 1)).toFixed(1);

    // Cadre ratio 1 : 2 : 6
    // Units = requiredFaculty / 9
    const units = requiredFaculty / 9;
    const reqProf = Math.ceil(units * 1);
    const reqAssoc = Math.ceil(units * 2);
    const reqAsst = Math.ceil(units * 6);

    const profDeficit = Math.max(0, reqProf - Number(form.professors));
    const assocDeficit = Math.max(0, reqAssoc - Number(form.assocProfessors));
    const asstDeficit = Math.max(0, reqAsst - Number(form.asstProfessors));

    // Carpet norms: approx 5.5 sq.m per student for instructional
    // For 360 intake (1440 total) -> ~2800 sq.m instructional needed
    const reqInstructional = Math.round(intake * 7.5);
    const instructionalDeficit = Math.max(0, reqInstructional - Number(form.instructionalArea));

    // Land norms: Rural = 7.5 Acres, Urban = 2.5 Acres, Mega = 1.5 Acres
    const reqLand = form.location === 'RURAL' ? 7.5 : (form.location === 'URBAN' ? 2.5 : 1.5);
    const landDeficit = Math.max(0, reqLand - Number(form.landArea));

    const isFSRCompliant = totalFaculty >= requiredFaculty;
    const isCadreCompliant = profDeficit === 0 && assocDeficit === 0;
    const isCarpetCompliant = instructionalDeficit === 0;
    const isLandCompliant = landDeficit === 0;

    let score = 100;
    if (!isFSRCompliant) score -= 30;
    if (!isCadreCompliant) score -= 25;
    if (!isCarpetCompliant) score -= 25;
    if (!isLandCompliant) score -= 20;

    setEvaluation({
      totalStudents,
      requiredFaculty,
      totalFaculty,
      fsr: `1:${fsr}`,
      isFSRCompliant,
      cadre: {
        reqProf,
        actProf: Number(form.professors),
        profDeficit,
        reqAssoc,
        actAssoc: Number(form.assocProfessors),
        assocDeficit,
        reqAsst,
        actAsst: Number(form.asstProfessors),
        asstDeficit,
        isCadreCompliant
      },
      carpet: {
        reqInstructional,
        actInstructional: Number(form.instructionalArea),
        instructionalDeficit,
        isCarpetCompliant
      },
      land: {
        reqLand,
        actLand: Number(form.landArea),
        landDeficit,
        isLandCompliant
      },
      score: Math.max(0, score),
      status: score >= 85 ? 'APPROVED_COMPLIANT' : (score >= 60 ? 'DEFICIENCY_SCRUTINY' : 'SHOW_CAUSE_REJECTION')
    });
  };

  const handleApplyPreset = (key) => {
    setForm(presets[key]);
    setEvaluation(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-emerald">
              <Scale size={13} />
              AICTE Statutory Engine
            </span>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Approval Process Handbook (APH 2024-27) Automated Rule Solver
            </span>
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
            Institutional Compliance & Cadre Ratio Calculator
          </h2>
          <p style={{ fontSize: '14px', color: '#64748B' }}>
            Verifies 1:15 Faculty-to-Student Ratio, 1:2:6 Cadre distribution, built-up instructional carpet, and rural/urban land title norms in real-time.
          </p>
        </div>

        {/* Preset Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => handleApplyPreset('deficient')}
            className="btn btn-secondary"
            style={{ fontSize: '13px', border: '1px solid #FDE68A', background: '#FFFBEB' }}
          >
            <AlertTriangle size={15} color="#D97706" />
            Load Deficient College Preset
          </button>
          <button 
            onClick={() => handleApplyPreset('compliant')}
            className="btn btn-secondary"
            style={{ fontSize: '13px', border: '1px solid #A7F3D0', background: '#ECFDF5' }}
          >
            <CheckCircle2 size={15} color="#059669" />
            Load Compliant College Preset
          </button>
        </div>
      </div>

      {/* Main Form & Live Simulator */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '24px', alignItems: 'start' }}>
        {/* Left: Input Form Card */}
        <div className="card" style={{ padding: '24px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} color="#2563EB" />
            Institutional Parameter Inputs
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
                Technical Program & Degree Level
              </label>
              <select 
                value={form.program} 
                onChange={(e) => setForm({ ...form, program: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', background: '#F8FAFC' }}
              >
                <option value="ENGINEERING_UG">Engineering & Technology (UG B.Tech - 4 Years, FSR 1:15)</option>
                <option value="MANAGEMENT_PG">Management (MBA/PGDM - 2 Years, FSR 1:20)</option>
                <option value="PHARMACY_UG">Pharmacy (B.Pharm - 4 Years, FSR 1:15)</option>
                <option value="POLYTECHNIC_DIPLOMA">Polytechnic Diploma (3 Years, FSR 1:25)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Approved Sanctioned Intake
                </label>
                <input 
                  type="number"
                  value={form.sanctionedIntake}
                  onChange={(e) => setForm({ ...form, sanctionedIntake: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Location Classification
                </label>
                <select 
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', background: '#F8FAFC' }}
                >
                  <option value="RURAL">Rural (Norm: 7.5 Acres)</option>
                  <option value="URBAN">Urban / Non-Mega (Norm: 2.5 Acres)</option>
                  <option value="MEGA_CITY">Mega Cities (Norm: 1.5 Acres)</option>
                </select>
              </div>
            </div>

            {/* Faculty Breakdown */}
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '8px' }}>
                Declared Faculty Headcount (Cadre 1:2:6)
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '2px' }}>Professors</label>
                  <input 
                    type="number"
                    value={form.professors}
                    onChange={(e) => setForm({ ...form, professors: e.target.value })}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '2px' }}>Assoc. Profs</label>
                  <input 
                    type="number"
                    value={form.assocProfessors}
                    onChange={(e) => setForm({ ...form, assocProfessors: e.target.value })}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '2px' }}>Asst. Profs</label>
                  <input 
                    type="number"
                    value={form.asstProfessors}
                    onChange={(e) => setForm({ ...form, asstProfessors: e.target.value })}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>

            {/* Land & Carpet Areas */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Instructional Carpet (sq.m.)
                </label>
                <input 
                  type="number"
                  value={form.instructionalArea}
                  onChange={(e) => setForm({ ...form, instructionalArea: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Contiguous Land (Acres)
                </label>
                <input 
                  type="number"
                  step="0.1"
                  value={form.landArea}
                  onChange={(e) => setForm({ ...form, landArea: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
                />
              </div>
            </div>

            <button 
              onClick={calculateNorms}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '6px', padding: '12px' }}
            >
              <Sparkles size={16} />
              Evaluate APH Statutory Compliance
            </button>
          </div>
        </div>

        {/* Right: Real-time Diagnostic Report */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {evaluation ? (
            <>
              {/* Overall Score Banner */}
              <div 
                className="card"
                style={{
                  padding: '24px',
                  borderLeft: `5px solid ${evaluation.score >= 85 ? '#10B981' : (evaluation.score >= 60 ? '#F59E0B' : '#EF4444')}`,
                  background: evaluation.score >= 85 ? '#ECFDF5' : (evaluation.score >= 60 ? '#FFFBEB' : '#FEF2F2')
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                      AICTE Statutory Audit Score
                    </span>
                    <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                      {evaluation.status === 'APPROVED_COMPLIANT' ? '100% STATUTORY COMPLIANT' : (evaluation.status === 'DEFICIENCY_SCRUTINY' ? 'DEFICIENCIES DETECTED (SCRUTINY REQUIRED)' : 'STATUTORY REJECTION')}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>
                      Total Enrolled Student Base: <strong>{evaluation.totalStudents}</strong> (based on {form.sanctionedIntake} annual intake across 4 academic tiers)
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '42px', fontWeight: 900, color: evaluation.score >= 85 ? '#059669' : (evaluation.score >= 60 ? '#B45309' : '#DC2626'), lineHeight: 1 }}>
                      {evaluation.score}
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>out of 100</span>
                  </div>
                </div>
              </div>

              {/* 4 Dimension Diagnostics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* 1. FSR Card */}
                <div className="card" style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Faculty-to-Student Ratio (FSR)</span>
                    <span className={`badge ${evaluation.isFSRCompliant ? 'badge-emerald' : 'badge-rose'}`}>
                      {evaluation.isFSRCompliant ? 'COMPLIANT' : 'DEFICIENT'}
                    </span>
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: evaluation.isFSRCompliant ? '#059669' : '#DC2626' }}>
                    {evaluation.fsr}
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                    Mandatory Norm: 1:15 • Required: <strong>{evaluation.requiredFaculty}</strong> faculty • Declared: <strong>{evaluation.totalFaculty}</strong>
                  </p>
                </div>

                {/* 2. Cadre 1:2:6 Card */}
                <div className="card" style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Cadre Ratio (1:2:6)</span>
                    <span className={`badge ${evaluation.cadre.isCadreCompliant ? 'badge-emerald' : 'badge-amber'}`}>
                      {evaluation.cadre.isCadreCompliant ? 'COMPLIANT' : 'SHORTAGE'}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                    <div>• Professors: Declared <strong>{evaluation.cadre.actProf}</strong> (Req: {evaluation.cadre.reqProf}) {evaluation.cadre.profDeficit > 0 && <span style={{ color: '#DC2626' }}>[-{evaluation.cadre.profDeficit}]</span>}</div>
                    <div>• Assoc Profs: Declared <strong>{evaluation.cadre.actAssoc}</strong> (Req: {evaluation.cadre.reqAssoc}) {evaluation.cadre.assocDeficit > 0 && <span style={{ color: '#DC2626' }}>[-{evaluation.cadre.assocDeficit}]</span>}</div>
                    <div>• Asst Profs: Declared <strong>{evaluation.cadre.actAsst}</strong> (Req: {evaluation.cadre.reqAsst})</div>
                  </div>
                </div>

                {/* 3. Carpet Area */}
                <div className="card" style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Instructional Carpet Area</span>
                    <span className={`badge ${evaluation.carpet.isCarpetCompliant ? 'badge-emerald' : 'badge-rose'}`}>
                      {evaluation.carpet.isCarpetCompliant ? 'COMPLIANT' : 'DEFICIT'}
                    </span>
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: evaluation.carpet.isCarpetCompliant ? '#059669' : '#DC2626' }}>
                    {form.instructionalArea} sq.m.
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                    Mandatory Norm: <strong>{evaluation.carpet.reqInstructional} sq.m.</strong> {evaluation.carpet.instructionalDeficit > 0 && <span style={{ color: '#DC2626' }}>(Shortfall: -{evaluation.carpet.instructionalDeficit} sq.m.)</span>}
                  </p>
                </div>

                {/* 4. Land Requirement */}
                <div className="card" style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Contiguous Land Title</span>
                    <span className={`badge ${evaluation.land.isLandCompliant ? 'badge-emerald' : 'badge-rose'}`}>
                      {evaluation.land.isLandCompliant ? 'COMPLIANT' : 'DEFICIT'}
                    </span>
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: evaluation.land.isLandCompliant ? '#059669' : '#DC2626' }}>
                    {form.landArea} Acres
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                    Required for {form.location}: <strong>{evaluation.land.reqLand} Acres</strong>
                  </p>
                </div>
              </div>

              {/* Actionable Statutory Directives */}
              <div className="card" style={{ padding: '20px', background: '#F8FAFC' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                  Mandatory Statutory Corrective Actions
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: '#334155' }}>
                  {evaluation.cadre.assocDeficit > 0 && (
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertTriangle size={15} color="#D97706" />
                      Appoint <strong>{evaluation.cadre.assocDeficit}</strong> qualified Associate Professor(s) with Ph.D. under AICTE 7th Pay guidelines before final committee scrutiny.
                    </li>
                  )}
                  {evaluation.carpet.instructionalDeficit > 0 && (
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertTriangle size={15} color="#DC2626" />
                      Allocate additional <strong>{evaluation.carpet.instructionalDeficit} sq.m.</strong> instructional space or reduce intake proportionally to {Math.floor(form.instructionalArea / 7.5)} seats.
                    </li>
                  )}
                  {evaluation.score >= 85 && (
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669' }}>
                      <CheckCircle2 size={15} color="#059669" />
                      Institutional infrastructure satisfies all Extension of Approval (EoA) statutory requirements for 2026-27.
                    </li>
                  )}
                </ul>
              </div>
            </>
          ) : (
            /* Prompt State */
            <div className="card" style={{ padding: '60px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
              <Scale size={48} color="#94A3B8" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#334155' }}>
                Simulator Ready for Audit
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '450px' }}>
                Enter institutional details on the left or select a preset to compute instant AICTE APH 2024-27 statutory ratios and deficiency radar.
              </p>
              <button onClick={calculateNorms} className="btn btn-primary" style={{ marginTop: '8px' }}>
                Calculate Statutory Ratios Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
