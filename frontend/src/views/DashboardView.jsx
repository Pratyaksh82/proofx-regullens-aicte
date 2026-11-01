import React from 'react';
import { 
  ShieldAlert, 
  FileCheck2, 
  Building2, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Sliders, 
  Scale, 
  Download,
  ArrowRight,
  ExternalLink,
  Flame,
  Clock
} from 'lucide-react';

export default function DashboardView({ onNavigate, onLoadSample }) {
  const stats = [
    {
      label: 'Institutional Applications Scrutinized',
      value: '10,482',
      change: '+12.5% vs APH 2023',
      icon: Building2,
      color: '#2563EB',
      bg: '#EFF6FF',
      borderColor: '#BFDBFE'
    },
    {
      label: 'Tampered Documents Flagged (ELA)',
      value: '384',
      change: '100% Caught Prior to Approval',
      icon: ShieldAlert,
      color: '#EF4444',
      bg: '#FEF2F2',
      borderColor: '#FECACA'
    },
    {
      label: 'Deficient Carpet & Cadre Violations',
      value: '719',
      change: 'APH 1:2:6 / Land Deficits',
      icon: AlertTriangle,
      color: '#F59E0B',
      bg: '#FFFBEB',
      borderColor: '#FDE68A'
    },
    {
      label: 'Digital Approvals Issued with SHA-256',
      value: '9,379',
      change: 'Zero Bureaucratic Bottleneck',
      icon: FileCheck2,
      color: '#10B981',
      bg: '#ECFDF5',
      borderColor: '#A7F3D0'
    }
  ];

  const recentAudits = [
    {
      id: 'APP-AICTE-2026-99245',
      name: 'Apex Institute of Technology & Engineering',
      state: 'Maharashtra',
      branch: 'Computer Engineering (180 Intake)',
      doc: 'Municipal Fire Safety NOC',
      status: 'TAMPER_DETECTED',
      details: 'Spliced expiry date & cloned Municipal Seal detected via ELA (92% Conf)',
      time: '12 mins ago'
    },
    {
      id: 'APP-AICTE-2026-97297',
      name: 'Sardar Patel College of Engineering',
      state: 'Gujarat',
      branch: 'Mechanical & Robotics (240 Intake)',
      doc: 'Architect Instructional Carpet Plan',
      status: 'APH_DEFICIENT',
      details: 'Carpet area deficit of 420 sq.m; Associate Professor cadre short by 2',
      time: '34 mins ago'
    },
    {
      id: 'APP-AICTE-2026-88102',
      name: 'Kalinga Institute of Technology',
      state: 'Odisha',
      branch: 'Electronics & VLSI (120 Intake)',
      doc: 'Building Structural Stability Cert',
      status: 'VERIFIED',
      details: 'Valid BIS seal, structural engineer registration confirmed, zero ELA delta',
      time: '1 hour ago'
    },
    {
      id: 'APP-AICTE-2026-74911',
      name: 'Vidyapeeth Institute of Technology',
      state: 'Karnataka',
      branch: 'Information Technology (120 Intake)',
      doc: 'Land Title Deed & Khasra Encumbrance',
      status: 'VERIFIED',
      details: '7.5 Acres contiguous rural land confirmed, registry stamp 98.4% match',
      time: '2 hours ago'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} className="animate-fade-in">
      {/* Hero Welcome Banner */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #2563EB 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '36px 40px',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '820px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, marginBottom: '16px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38BDF8' }}></span>
            AICTE Approval Cycle 2026-27 Active Scrutiny Engine
          </div>
          <h1 style={{ fontSize: '34px', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Autonomous Document Forensics & Statutory Compliance Verification
          </h1>
          <p style={{ fontSize: '15px', color: '#E2E8F0', lineHeight: 1.6, marginBottom: '24px' }}>
            ReguLens AICTE by <strong>PROOFX</strong> protects the integrity of technical education by detecting photoshopped municipal certificates, verifying official government seals with computer vision, and programmatically auditing complex AICTE Approval Process Handbook (APH 2024-27) norms.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <button 
              onClick={() => { onLoadSample('tampered'); onNavigate('forensics'); }}
              className="btn btn-emerald"
              style={{ padding: '12px 22px', fontSize: '14.5px' }}
            >
              <Flame size={18} />
              Test Tampered Fire NOC (Live ELA)
            </button>
            <button 
              onClick={() => { onLoadSample('authentic'); onNavigate('forensics'); }}
              className="btn btn-secondary"
              style={{ padding: '12px 22px', fontSize: '14.5px', background: 'rgba(255, 255, 255, 0.95)' }}
            >
              <CheckCircle2 size={18} color="#059669" />
              Test Authentic Fire NOC
            </button>
            <button 
              onClick={() => onNavigate('rules')}
              className="btn btn-secondary"
              style={{ padding: '12px 20px', fontSize: '14px', background: 'transparent', color: '#fff', borderColor: 'rgba(255, 255, 255, 0.3)' }}
            >
              <Scale size={18} />
              Open APH Rule Solver
            </button>
          </div>
        </div>

        {/* Decorative Graphic Element */}
        <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', opacity: 0.12, pointerEvents: 'none' }}>
          <ShieldAlert size={360} />
        </div>
      </div>

      {/* Real-Time KPI Cards */}
      <div className="grid-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div 
              key={idx}
              className="card"
              style={{ padding: '22px', borderLeft: `4px solid ${s.color}` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', lineHeight: 1.3 }}>
                  {s.label}
                </span>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: s.bg, border: `1px solid ${s.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={s.color} />
                </div>
              </div>
              <div style={{ fontSize: '30px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: s.color, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={13} />
                {s.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Live Audits & Quick Workflows */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.9fr 1.1fr', gap: '24px' }}>
        {/* Left Panel: Real-Time Scrutiny Ledger */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>
                Live Scrutiny Queue & Forensic Flags
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B' }}>
                Incoming institutional applications undergoing automated vision & regulatory inspection
              </p>
            </div>
            <button onClick={() => onNavigate('institutions')} className="btn btn-ghost" style={{ fontSize: '13px' }}>
              View All 10,482 Institutions <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentAudits.map((item, i) => (
              <div 
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: item.status === 'TAMPER_DETECTED' ? '#FEF2F2' : (item.status === 'APH_DEFICIENT' ? '#FFFBEB' : '#F8FAFC'),
                  border: `1px solid ${item.status === 'TAMPER_DETECTED' ? '#FECACA' : (item.status === 'APH_DEFICIENT' ? '#FDE68A' : '#E2E8F0')}`,
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ 
                    marginTop: '2px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: item.status === 'TAMPER_DETECTED' ? '#EF4444' : (item.status === 'APH_DEFICIENT' ? '#F59E0B' : '#10B981'),
                    color: '#fff'
                  }}>
                    {item.status === 'TAMPER_DETECTED' ? <ShieldAlert size={18} /> : (item.status === 'APH_DEFICIENT' ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A' }}>{item.name}</span>
                      <span className="badge badge-neutral" style={{ fontSize: '10px' }}>{item.state}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                      <strong>{item.doc}</strong> • {item.branch}
                    </div>
                    <div style={{ fontSize: '11.5px', color: item.status === 'TAMPER_DETECTED' ? '#DC2626' : (item.status === 'APH_DEFICIENT' ? '#B45309' : '#059669'), fontWeight: 600, marginTop: '3px' }}>
                      {item.details}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {item.time}
                  </span>
                  <button 
                    onClick={() => {
                      if (item.status === 'TAMPER_DETECTED') {
                        onLoadSample('tampered');
                        onNavigate('forensics');
                      } else {
                        onNavigate('institutions');
                      }
                    }}
                    className="btn btn-secondary" 
                    style={{ padding: '4px 10px', fontSize: '11.5px' }}
                  >
                    Inspect Dossier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Regulatory AI Capabilities & Quick Tests */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quick Test Station Card */}
          <div className="card" style={{ padding: '22px', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={18} color="#EF4444" />
              One-Click Forensic Sandbox
            </h4>
            <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '16px' }}>
              Load authentic or forged AICTE accreditation documents instantly to inspect error level analysis (ELA) heatmaps and seal geometry:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={() => { onLoadSample('tampered'); onNavigate('forensics'); }}
                className="btn btn-secondary"
                style={{ justifyContent: 'space-between', padding: '12px 14px', border: '1px solid #FECACA', background: '#FEF2F2' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                  <ShieldAlert size={18} color="#DC2626" />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#991B1B' }}>Sample 1: Tampered Fire NOC</div>
                    <div style={{ fontSize: '11px', color: '#DC2626' }}>Forged 2026 date & photoshopped municipal seal</div>
                  </div>
                </div>
                <ArrowRight size={14} color="#991B1B" />
              </button>

              <button 
                onClick={() => { onLoadSample('authentic'); onNavigate('forensics'); }}
                className="btn btn-secondary"
                style={{ justifyContent: 'space-between', padding: '12px 14px', border: '1px solid #A7F3D0', background: '#ECFDF5' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                  <CheckCircle2 size={18} color="#059669" />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#065F46' }}>Sample 2: Authentic Fire NOC</div>
                    <div style={{ fontSize: '11px', color: '#059669' }}>Original digital municipal scan (Clean ELA baseline)</div>
                  </div>
                </div>
                <ArrowRight size={14} color="#065F46" />
              </button>
            </div>
          </div>

          {/* AICTE Statutory Compliance Card */}
          <div className="card" style={{ padding: '22px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={18} color="#2563EB" />
              AICTE APH 2024-27 Norms
            </h4>
            <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '14px' }}>
              Programmatic statutory verification across regulatory dimensions:
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                <CheckCircle2 size={14} color="#10B981" />
                <strong>Cadre Ratio Rule:</strong> 1 Professor : 2 Assoc. Prof : 6 Asst. Prof
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                <CheckCircle2 size={14} color="#10B981" />
                <strong>Faculty-Student Ratio:</strong> 1:15 (Engineering) / 1:20 (Management)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                <CheckCircle2 size={14} color="#10B981" />
                <strong>Instructional Carpet:</strong> 66 sq.m. per classroom / 132 sq.m. lab
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                <CheckCircle2 size={14} color="#10B981" />
                <strong>Land Requirements:</strong> 7.5 Acres (Rural) / 2.5 Acres (Urban)
              </li>
            </ul>

            <button 
              onClick={() => onNavigate('rules')}
              className="btn btn-secondary" 
              style={{ width: '100%', marginTop: '16px', fontSize: '13px' }}
            >
              Launch Interactive APH Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
