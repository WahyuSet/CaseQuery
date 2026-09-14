import React, { useEffect } from 'react'
import type { EvidenceItem } from '../../cases/types'
import { X, Terminal, MapPin, Tag, FileSearch } from 'lucide-react'
import './EvidenceModal.css'

interface EvidenceModalProps {
  evidence: EvidenceItem
  onClose: () => void
  onOpenWorkstation: (suggestedSql?: string) => void
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  evidence,
  onClose,
  onOpenWorkstation
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="evidence-modal-backdrop" onClick={onClose}>
      <div className="evidence-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <header className="evidence-modal-header">
          <div className="evidence-header-title-group">
            <FileSearch size={18} color="var(--accent)" />
            <span className="badge">{evidence.id}</span>
            <h2 className="evidence-modal-title">
              {evidence.name}
            </h2>
          </div>

          <button
            id="btn-close-evidence"
            onClick={onClose}
            className="btn-outline"
            style={{ padding: '4px 8px' }}
            title="Tutup (Esc)"
          >
            <X size={16} />
          </button>
        </header>

        {/* Modal Body */}
        <div className="evidence-modal-body">
          {/* Left Column: Image View */}
          <div className="evidence-image-col">
            <div className="evidence-photo-box">
              <img
                src={evidence.photoUrl}
                alt={evidence.name}
              />
            </div>

            <div className="evidence-meta-tags">
              <span className="badge badge-accent">
                <Tag size={11} />
                <span>{evidence.category}</span>
              </span>
              <span className="badge">
                <MapPin size={11} />
                <span>{evidence.foundLocation}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Forensic Details */}
          <div className="evidence-details-col">
            <div>
              <div className="evidence-section-label">Deskripsi Barang Bukti</div>
              <p className="evidence-description-text">
                {evidence.description}
              </p>
            </div>

            <div className="evidence-notes-box">
              <h4>Catatan Forensik</h4>
              <p className="evidence-notes-text">
                "{evidence.forensicNotes}"
              </p>
            </div>

            {evidence.suggestedSqlPrompt && (
              <div className="suggested-query-box">
                <div className="evidence-section-label">Rekomendasi Query SQL</div>
                <code className="suggested-query-code">
                  {evidence.suggestedSqlPrompt}
                </code>
              </div>
            )}

            {/* Action Buttons */}
            <div className="evidence-modal-actions">
              <button
                id="btn-evidence-open-workstation"
                onClick={() => onOpenWorkstation(evidence.suggestedSqlPrompt)}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                <Terminal size={15} />
                <span>Uji di Meja Kerja SQL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
