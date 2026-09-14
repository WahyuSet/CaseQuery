import React from 'react'
import type { CaseManifest } from '../../cases/types'
import { FolderCheck, ExternalLink, CheckCircle2, Circle } from 'lucide-react'
import './QuickEvidenceDock.css'

interface QuickEvidenceDockProps {
  activeCase: CaseManifest
  unlockedEvidenceIds: string[]
  completedMilestones: string[]
  onInspectEvidence: (evidenceId: string) => void
}

export const QuickEvidenceDock: React.FC<QuickEvidenceDockProps> = ({
  activeCase,
  unlockedEvidenceIds,
  completedMilestones,
  onInspectEvidence
}) => {
  return (
    <aside className="evidence-dock-panel">
      {/* Header */}
      <div className="dock-header">
        <div className="dock-title-group">
          <FolderCheck size={16} color="var(--accent)" />
          <span className="dock-title">
            Bukti Kasus
          </span>
        </div>
        <span className="badge badge-accent">
          {unlockedEvidenceIds.length} Ditemukan
        </span>
      </div>

      {/* Content Area */}
      <div className="dock-content">
        {/* Milestones / Lead Progress */}
        <div className="dock-section">
          <div className="dock-section-title">
            Petunjuk Terungkap ({completedMilestones.length}/{activeCase.milestones.length})
          </div>

          <div className="milestone-list-box">
            {activeCase.milestones.map((ms) => {
              const isDone = completedMilestones.includes(ms.id)
              return (
                <div
                  key={ms.id}
                  className={`milestone-mini-item ${isDone ? 'milestone-mini-item-done' : ''}`}
                >
                  {isDone ? (
                    <CheckCircle2 size={13} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  ) : (
                    <Circle size={13} color="var(--text-muted)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  )}
                  <span>{ms.title}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Evidence Cards */}
        <div className="dock-section">
          <div className="dock-section-title">
            Barang Bukti Terbuka
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeCase.evidenceList
              .filter((e) => unlockedEvidenceIds.includes(e.id))
              .map((evidence) => (
                <div
                  key={evidence.id}
                  onClick={() => onInspectEvidence(evidence.id)}
                  className="dock-evidence-card"
                  title="Klik untuk melihat foto dan catatan forensik"
                >
                  <img
                    src={evidence.photoUrl}
                    alt={evidence.name}
                    className="dock-evidence-thumb"
                  />
                  <div className="dock-evidence-info">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                      <span className="dock-evidence-name">
                        {evidence.name}
                      </span>
                      <ExternalLink size={12} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                    </div>
                    <span className="dock-evidence-meta">
                      ID: {evidence.id} • {evidence.category}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
