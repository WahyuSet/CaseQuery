import React from 'react'
import { useCase } from '../../context/CaseContext'
import { HotspotMarker } from './HotspotMarker'
import { EvidenceModal } from './EvidenceModal'
import { Terminal, BookOpen, ShieldAlert, Sparkles, MapPin, Clock, ArrowLeft } from 'lucide-react'
import './CrimeSceneView.css'

export const CrimeSceneView: React.FC = () => {
  const {
    activeCase,
    selectedEvidence,
    completedMilestones,
    inspectEvidence,
    closeEvidenceModal,
    openWorkstation,
    toggleNotebook,
    openAccusationModal,
    returnToStageSelect
  } = useCase()

  return (
    <div className="scene-view-container">
      {/* Sub-header Navigation */}
      <header className="scene-nav-header">
        <div className="scene-header-left">
          <button
            id="btn-return-stages"
            onClick={returnToStageSelect}
            className="btn-outline"
            title="Kembali ke Papan Kasus"
          >
            <ArrowLeft size={14} />
            <span>Papan Kasus</span>
          </button>
          
          <span className="badge">{activeCase.caseNumber}</span>
          
          <h2 className="scene-case-title">
            {activeCase.title}
          </h2>

          <div className="scene-case-location">
            <MapPin size={13} />
            <span>{activeCase.location}</span>
          </div>
        </div>

        <div className="scene-header-actions">
          <button
            id="btn-toggle-notebook"
            onClick={toggleNotebook}
            className="btn-outline"
            title="Buka Catatan Kasus (Hotkey: N)"
          >
            <BookOpen size={14} />
            <span>Catatan ({completedMilestones.length}/{activeCase.milestones.length})</span>
          </button>

          <button
            id="btn-open-workstation-top"
            onClick={() => openWorkstation()}
            className="btn-primary"
          >
            <Terminal size={15} />
            <span>Meja Kerja SQL</span>
          </button>

          <button
            id="btn-accuse-scene-top"
            onClick={openAccusationModal}
            className="btn-secondary"
          >
            <ShieldAlert size={14} color="var(--warning)" />
            <span>Ajukan Dakwaan</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Canvas Area */}
      <div className="scene-canvas-area">
        <div className="scene-photo-frame">
          <img
            src={activeCase.crimeScenePhotoUrl}
            alt="Tempat Kejadian Perkara"
            className="scene-photo-img"
          />

          {/* Interactive Crime Scene Markers [A], [B], [C] */}
          {activeCase.hotspots.map((hotspot) => (
            <HotspotMarker
              key={hotspot.id}
              hotspot={hotspot}
              onSelect={inspectEvidence}
            />
          ))}

          {/* Hint Overlay Badge */}
          <div className="scene-hint-badge">
            <Sparkles size={14} color="#f59e0b" />
            <span>Klik pin kuning [A], [B], atau [C] untuk memeriksa barang bukti</span>
          </div>
        </div>
      </div>

      {/* Bottom Briefing Bar */}
      <footer className="scene-briefing-bar">
        <div className="briefing-content">
          <div className="briefing-meta">
            <span className="briefing-tag">Laporan Singkat TKP</span>
            <div className="briefing-time">
              <Clock size={11} />
              <span>{activeCase.incidentDate}</span>
            </div>
          </div>
          <p className="briefing-text">
            {activeCase.briefingSummary}
          </p>
        </div>

        <div>
          <button
            id="btn-open-workstation-main"
            onClick={() => openWorkstation()}
            className="btn-primary"
          >
            <Terminal size={16} />
            <span>Buka Meja Kerja SQL</span>
          </button>
        </div>
      </footer>

      {/* Evidence Modal Inspector */}
      {selectedEvidence && (
        <EvidenceModal
          evidence={selectedEvidence}
          onClose={closeEvidenceModal}
          onOpenWorkstation={openWorkstation}
        />
      )}
    </div>
  )
}
