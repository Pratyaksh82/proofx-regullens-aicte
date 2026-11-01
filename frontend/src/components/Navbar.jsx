import React from 'react';
import { Shield, Activity, FileCheck, Scale, Building2, BookOpen, AlertTriangle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: Activity },
    { id: 'forensics', label: 'Forensic Studio (ELA)', icon: Shield, badge: 'Live AI' },
    { id: 'rules', label: 'APH 2024-27 Rules', icon: Scale },
    { id: 'institutions', label: 'Institutions Scrutiny', icon: Building2 },
    { id: 'psr', label: 'PSR Dossier Builder', icon: FileCheck },
    { id: 'handbook', label: 'Statutory Guide', icon: BookOpen },
  ];

  return (
    <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-light)' }}>
      {/* Top Banner with SIH official branding */}
      <div style={{ background: 'linear-gradient(90deg, #0F172A 0%, #1E3A8A 60%, #1E293B 100%)', color: '#fff', padding: '6px 32px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
            <span className="pulse-dot"></span>
            SMART INDIA HACKATHON 2026 • AICTE REGULATION BUREAU
          </span>
          <span style={{ color: '#94A3B8' }}>|</span>
          <span style={{ color: '#E2E8F0' }}>Problem Statement: <strong>SIH26261</strong> (Smart Automation)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <span style={{ background: 'rgba(255, 255, 255, 0.12)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600, color: '#38BDF8' }}>
            TEAM ID: 198271
          </span>
          <span style={{ background: '#10B981', color: '#0F172A', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, letterSpacing: '0.04em' }}>
            TEAM PROOFX
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)' }}>
            <Shield size={24} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                ReguLens <span style={{ color: '#2563EB' }}>AICTE</span>
              </span>
              <span className="badge badge-blue" style={{ fontSize: '10px', padding: '2px 6px' }}>v1.0-PROD</span>
            </div>
            <p style={{ fontSize: '11px', color: '#64748B', fontWeight: 500, margin: 0 }}>
              AI Application Validation & Forensic Regulatory Verification
            </p>
          </div>
        </div>

        {/* Tab Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: isActive ? 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' : 'transparent',
                  color: isActive ? '#1E3A8A' : '#475569',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
              >
                <Icon size={16} strokeWidth={isActive ? 2.4 : 1.8} color={isActive ? '#2563EB' : '#64748B'} />
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{ background: '#10B981', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <div style={{ position: 'absolute', bottom: '-12px', left: '16px', right: '16px', height: '2.5px', background: '#2563EB', borderRadius: '2px 2px 0 0' }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* System Online Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
          <img src="/sih_logo.png" alt="SIH 2026" style={{ height: '22px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
          <span style={{ color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
            API Live
          </span>
        </div>
      </div>
    </header>
  );
}
