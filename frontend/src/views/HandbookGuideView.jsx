import React, { useState } from 'react';
import { BookOpen, Search, Scale, Shield, AlertTriangle, ExternalLink, ChevronRight, FileText } from 'lucide-react';

export default function HandbookGuideView() {
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const chapters = [
    {
      title: 'Chapter 2: Extension of Approval (EoA)',
      subtitle: 'Statutory Regulations for Existing Technical Institutions',
      sections: [
        {
          num: '2.1',
          heading: 'Mandatory Online Application Submission',
          content: 'Institutions must submit annual enrollment data, faculty payroll returns, and structural safety renewals via the AICTE web portal by the specified deadline.'
        },
        {
          num: '2.4',
          heading: 'Deficiency Processing & Scrutiny Committee',
          content: 'Preliminary Scrutiny Reports (PSR) must automatically cross-reference municipal Fire Safety NOCs and architect certificates against digital registries.'
        },
        {
          num: '2.7',
          heading: 'Zero-Tolerance on Fraudulent Declarations',
          content: 'Submission of altered, forged, or photoshopped NOCs attracts immediate punitive withdrawal of approval for a minimum of 2 consecutive academic years.'
        }
      ]
    },
    {
      title: 'Chapter 4: Norms for Faculty Cadre & FSR',
      subtitle: 'Faculty-Student Ratios and 1:2:6 Distribution Formulas',
      sections: [
        {
          num: '4.1',
          heading: 'Statutory Faculty-to-Student Ratio (FSR)',
          content: 'Undergraduate Engineering programs mandate a strict 1:15 FSR based on total sanctioned intake across all 4 years. Postgraduate Management (MBA) requires 1:20.'
        },
        {
          num: '4.2',
          heading: 'Cadre Ratio: 1 Professor : 2 Assoc. Prof : 6 Asst. Prof',
          content: 'For every 9 faculty members required, institutions must maintain at least 1 Professor and 2 Associate Professors holding UGC/AICTE compliant Ph.D. degrees.'
        },
        {
          num: '4.5',
          heading: 'Ghost Faculty Detection & Aadhaar Linking',
          content: 'AICTE strictly prohibits dual employment. Faculty members detected on multiple college payrolls face immediate deregistration from the national faculty portal.'
        }
      ]
    },
    {
      title: 'Chapter 5: Mandatory Statutory NOCs',
      subtitle: 'Fire Safety, Structural Stability & Land Ownership Deeds',
      sections: [
        {
          num: '5.1',
          heading: 'Fire and Life Safety Certificate (NOC)',
          content: 'Must be issued by the competent Municipal Corporation or State Fire Service Directorate. The certificate must explicitly certify educational occupancy.'
        },
        {
          num: '5.3',
          heading: 'Structural Stability Certificate',
          content: 'Must be issued by a registered structural engineer certified by the Bureau of Indian Standards (BIS) confirming compliance with NBC 2016 norms.'
        },
        {
          num: '5.6',
          heading: 'Land Title & Encumbrance Certificate',
          content: 'Institutions must possess contiguous land registered in the name of the sponsoring Trust/Society with a minimum 30-year unencumbered lease or ownership deed.'
        }
      ]
    },
    {
      title: 'Chapter 7: Penal Action & Appeals Framework',
      subtitle: 'Punitive Reductions, Show-Cause Proceedings & Restitution',
      sections: [
        {
          num: '7.2',
          heading: 'Excess Admissions Over Sanctioned Intake',
          content: 'Colleges admitting students beyond approved limits face a 5x tuition fee penalty per excess student and a 50% reduction in sanctioned intake for the subsequent year.'
        },
        {
          num: '7.5',
          heading: 'Standing Hearing Committee (SHC) Procedure',
          content: 'Institutions flagged for document discrepancies receive a formal Show-Cause Notice with a 7-day window to present original physical documents before the SHC.'
        }
      ]
    }
  ];

  const curr = chapters[selectedChapter];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-blue">
            <BookOpen size={13} />
            Statutory AICTE Knowledge Base
          </span>
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            Approval Process Handbook (APH 2024-27) Gazette Norms
          </span>
        </div>
        <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
          AICTE APH 2024-27 Regulatory Handbook Explorer
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          Interactive statutory reference indexing official AICTE regulations, cadre ratios, safety mandates, and penal action frameworks.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'start' }}>
        {/* Left: Chapter Navigation List */}
        <div className="card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '12px', padding: '0 8px' }}>
            Regulatory Chapters
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedChapter(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: selectedChapter === idx ? '#EFF6FF' : 'transparent',
                  color: selectedChapter === idx ? '#1E3A8A' : '#334155',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: selectedChapter === idx ? 800 : 600 }}>
                    {ch.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                    {ch.subtitle}
                  </div>
                </div>
                <ChevronRight size={16} color={selectedChapter === idx ? '#2563EB' : '#94A3B8'} />
              </button>
            ))}
          </div>

          <div style={{ marginTop: '20px', padding: '14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '12px' }}>
            <span style={{ fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ExternalLink size={13} color="#2563EB" />
              Official Portal Link
            </span>
            <p style={{ color: '#64748B', marginTop: '4px' }}>
              Download complete statutory PDF handbook directly from AICTE Official Portal:
            </p>
            <a 
              href="https://www.aicte-india.org" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#2563EB', fontWeight: 600, display: 'inline-block', marginTop: '6px', textDecoration: 'none' }}
            >
              www.aicte-india.org &rarr;
            </a>
          </div>
        </div>

        {/* Right: Chapter Detail Viewer */}
        <div className="card" style={{ padding: '28px' }}>
          <div style={{ borderBottom: '2px solid #E2E8F0', paddingBottom: '16px', marginBottom: '20px' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '8px' }}>Official Gazette Norm</span>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
              {curr.title}
            </h3>
            <p style={{ fontSize: '13.5px', color: '#64748B', marginTop: '2px' }}>
              {curr.subtitle}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {curr.sections.map((sec, i) => (
              <div 
                key={i}
                style={{
                  padding: '16px 20px',
                  borderRadius: '10px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ background: '#0F172A', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                    Clause {sec.num}
                  </span>
                  <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A' }}>
                    {sec.heading}
                  </h4>
                </div>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
