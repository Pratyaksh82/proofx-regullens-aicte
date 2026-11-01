import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './views/DashboardView';
import ForensicsView from './views/ForensicsView';
import AphRulesView from './views/AphRulesView';
import InstitutionsView from './views/InstitutionsView';
import PsrReportView from './views/PsrReportView';
import HandbookGuideView from './views/HandbookGuideView';
import { Shield, ExternalLink, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [preloadedSample, setPreloadedSample] = useState('tampered');
  const [selectedInst, setSelectedInst] = useState(null);

  const handleLoadSample = (sampleType) => {
    setPreloadedSample(sampleType);
    setActiveTab('forensics');
  };

  const handleGenerateReport = (dossierData) => {
    setActiveTab('psr');
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <DashboardView onNavigate={setActiveTab} onLoadSample={handleLoadSample} />
        )}
        {activeTab === 'forensics' && (
          <ForensicsView preloadedSample={preloadedSample} onGenerateReport={handleGenerateReport} />
        )}
        {activeTab === 'rules' && (
          <AphRulesView />
        )}
        {activeTab === 'institutions' && (
          <InstitutionsView onSelectInstitution={setSelectedInst} onNavigate={setActiveTab} />
        )}
        {activeTab === 'psr' && (
          <PsrReportView />
        )}
        {activeTab === 'handbook' && (
          <HandbookGuideView />
        )}
      </main>

      {/* Official Government Hackathon Footer */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid var(--border-light)', padding: '24px 32px', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#64748B' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Shield size={16} />
            </div>
            <div>
              <span style={{ fontWeight: 800, color: '#0F172A' }}>PROOFX • ReguLens AICTE</span>
              <span style={{ margin: '0 8px', color: '#CBD5E1' }}>•</span>
              <span>Smart India Hackathon 2026 Submission</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>Problem Statement: <strong>SIH26261</strong></span>
            <span>Team ID: <strong style={{ color: '#2563EB' }}>198271</strong></span>
            <span style={{ background: '#10B981', color: '#0F172A', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
              TEAM PROOFX
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
