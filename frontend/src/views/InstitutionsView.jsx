import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ExternalLink, 
  Download,
  FileText,
  MapPin,
  Flame,
  ArrowRight
} from 'lucide-react';

export default function InstitutionsView({ onSelectInstitution, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const institutions = [
    {
      id: 'APP-AICTE-2026-99245',
      name: 'Apex Institute of Technology & Engineering',
      location: 'Pune, Maharashtra',
      region: 'Western Region',
      program: 'Engineering & Technology (UG B.Tech)',
      intake: 360,
      status: 'FORGERY_DETECTED',
      forensicFlag: 'Municipal Fire Safety NOC Spliced (93.8% Conf)',
      cadreStatus: 'Compliant (1:2:6)',
      carpetStatus: 'Compliant (3,200 sq.m.)',
      riskScore: 92,
      appliedDate: '24-Oct-2026'
    },
    {
      id: 'APP-AICTE-2026-97297',
      name: 'Sardar Patel College of Engineering',
      location: 'Ahmedabad, Gujarat',
      region: 'Central-West',
      program: 'Mechanical & Robotics Engineering',
      intake: 420,
      status: 'DEFICIENT_CARPET_CADRE',
      forensicFlag: 'Clean Document Scans',
      cadreStatus: 'Shortage (2 Assoc. Profs Deficit)',
      carpetStatus: 'Deficit (-420 sq.m. Instructional)',
      riskScore: 68,
      appliedDate: '22-Oct-2026'
    },
    {
      id: 'APP-AICTE-2026-88102',
      name: 'Kalinga Institute of Technology & Research',
      location: 'Bhubaneswar, Odisha',
      region: 'Eastern Region',
      program: 'Electronics & Computer Science',
      intake: 240,
      status: 'APPROVED_VERIFIED',
      forensicFlag: 'All Documents 100% Verified',
      cadreStatus: 'Fully Compliant (1:2:6)',
      carpetStatus: '2,600 sq.m. (Surplus)',
      riskScore: 8,
      appliedDate: '20-Oct-2026'
    },
    {
      id: 'APP-AICTE-2026-74911',
      name: 'Vidyapeeth Institute of Applied Sciences',
      location: 'Bengaluru, Karnataka',
      region: 'South-Western Region',
      program: 'Artificial Intelligence & Data Science',
      intake: 180,
      status: 'APPROVED_VERIFIED',
      forensicFlag: 'All Documents 100% Verified',
      cadreStatus: 'Fully Compliant (1:2:6)',
      carpetStatus: '2,100 sq.m. (Compliant)',
      riskScore: 5,
      appliedDate: '18-Oct-2026'
    },
    {
      id: 'APP-AICTE-2026-66419',
      name: 'Vishwa Bharati Polytechnic College',
      location: 'Nagpur, Maharashtra',
      region: 'Western Region',
      program: 'Diploma in Civil & Mechanical Engg',
      intake: 300,
      status: 'LAND_TITLE_DEFICIT',
      forensicFlag: 'Sub-leased land encumbrance flagged',
      cadreStatus: 'Shortage of 4 Lecturers',
      carpetStatus: 'Compliant',
      riskScore: 74,
      appliedDate: '17-Oct-2026'
    },
    {
      id: 'APP-AICTE-2026-51203',
      name: 'Malaviya Institute of Management',
      location: 'Varanasi, Uttar Pradesh',
      region: 'Northern Region',
      program: 'MBA / PGDM Post Graduate',
      intake: 120,
      status: 'APPROVED_VERIFIED',
      forensicFlag: 'Clean Digital Scans',
      cadreStatus: 'Fully Compliant (FSR 1:20)',
      carpetStatus: '1,450 sq.m. (Compliant)',
      riskScore: 6,
      appliedDate: '15-Oct-2026'
    }
  ];

  const filtered = institutions.filter((inst) => {
    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inst.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inst.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'ALL') return matchesSearch;
    if (statusFilter === 'FORGERY') return matchesSearch && inst.status === 'FORGERY_DETECTED';
    if (statusFilter === 'DEFICIENT') return matchesSearch && (inst.status.includes('DEFICIENT') || inst.status.includes('DEFICIT'));
    if (statusFilter === 'APPROVED') return matchesSearch && inst.status === 'APPROVED_VERIFIED';
    return matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Header & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-purple">
              <Building2 size={13} />
              National Institutional Directory
            </span>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              10,500+ AICTE-Approved Colleges Under Active Scrutiny
            </span>
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
            Institutions Scrutiny & Approval Desk
          </h2>
          <p style={{ fontSize: '14px', color: '#64748B' }}>
            Centralized dossier inspection tracking document authenticity, APH faculty distribution, and preliminary scrutiny report (PSR) certification status.
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {[
            { id: 'ALL', label: 'All Records' },
            { id: 'FORGERY', label: 'Forgery Flags', count: 1, color: '#DC2626' },
            { id: 'DEFICIENT', label: 'APH Deficits', count: 2, color: '#D97706' },
            { id: 'APPROVED', label: 'Certified Approvals', count: 3, color: '#059669' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setStatusFilter(btn.id)}
              className={`btn ${statusFilter === btn.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '7px 12px', fontSize: '12.5px' }}
            >
              {btn.label}
              {btn.count && (
                <span style={{ background: statusFilter === btn.id ? '#fff' : btn.color, color: statusFilter === btn.id ? '#1E3A8A' : '#fff', fontSize: '10px', padding: '1px 5px', borderRadius: '10px' }}>
                  {btn.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="card" style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Search size={18} color="#94A3B8" />
        <input 
          type="text"
          placeholder="Search by college name, application ID (e.g. APP-AICTE-2026-99245), state, or engineering branch..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', background: 'transparent' }}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} style={{ border: 'none', background: 'transparent', color: '#94A3B8', cursor: 'pointer', fontSize: '12px' }}>
            Clear
          </button>
        )}
      </div>

      {/* Institutional Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '14px 20px' }}>Application & Institution</th>
              <th style={{ padding: '14px 16px' }}>Program / Intake</th>
              <th style={{ padding: '14px 16px' }}>Forensic Status (ELA)</th>
              <th style={{ padding: '14px 16px' }}>APH Cadre / Carpet</th>
              <th style={{ padding: '14px 16px' }}>Risk Index</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>Scrutiny Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inst, idx) => (
              <tr 
                key={inst.id}
                style={{ 
                  borderBottom: '1px solid #E2E8F0',
                  background: idx % 2 === 0 ? '#FFFFFF' : '#FAFCFF',
                  transition: 'background 0.15s ease'
                }}
              >
                {/* College Info */}
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#2563EB', fontWeight: 600 }}>
                    {inst.id}
                  </div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                    {inst.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <MapPin size={12} /> {inst.location} ({inst.region})
                  </div>
                </td>

                {/* Program */}
                <td style={{ padding: '16px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#1E293B' }}>{inst.program}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Intake: <strong>{inst.intake} seats</strong></div>
                </td>

                {/* Forensic Status */}
                <td style={{ padding: '16px 16px' }}>
                  {inst.status === 'FORGERY_DETECTED' ? (
                    <div>
                      <span className="badge badge-rose">
                        <ShieldAlert size={12} /> SPLICED NOC DETECTED
                      </span>
                      <div style={{ fontSize: '11px', color: '#DC2626', marginTop: '4px', fontWeight: 500 }}>
                        {inst.forensicFlag}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="badge badge-emerald">
                        <CheckCircle2 size={12} /> VERIFIED
                      </span>
                      <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px' }}>
                        {inst.forensicFlag}
                      </div>
                    </div>
                  )}
                </td>

                {/* APH Norms */}
                <td style={{ padding: '16px 16px' }}>
                  <div style={{ fontSize: '12.5px', color: inst.cadreStatus.includes('Shortage') ? '#DC2626' : '#059669', fontWeight: 600 }}>
                    {inst.cadreStatus}
                  </div>
                  <div style={{ fontSize: '12px', color: inst.carpetStatus.includes('Deficit') ? '#DC2626' : '#64748B' }}>
                    {inst.carpetStatus}
                  </div>
                </td>

                {/* Risk Score */}
                <td style={{ padding: '16px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ 
                      fontSize: '15px', 
                      fontWeight: 800, 
                      color: inst.riskScore >= 70 ? '#DC2626' : (inst.riskScore >= 40 ? '#D97706' : '#059669') 
                    }}>
                      {inst.riskScore}/100
                    </div>
                    <div style={{ width: '48px', height: '6px', borderRadius: '3px', background: '#E2E8F0', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${inst.riskScore}%`, 
                        height: '100%', 
                        background: inst.riskScore >= 70 ? '#EF4444' : (inst.riskScore >= 40 ? '#F59E0B' : '#10B981') 
                      }}></div>
                    </div>
                  </div>
                </td>

                {/* Actions */}
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  {inst.status === 'FORGERY_DETECTED' ? (
                    <button 
                      onClick={() => onNavigate('forensics')}
                      className="btn btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '12px', border: '1px solid #FECACA', background: '#FEF2F2', color: '#B91C1C' }}
                    >
                      <Flame size={14} /> Open ELA Scan
                    </button>
                  ) : (
                    <button 
                      onClick={() => onNavigate('psr')}
                      className="btn btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      <FileText size={14} /> Dossier PDF
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
