import React, { useState, useEffect } from 'react'
import { useCase } from '../../context/CaseContext'
import { ShieldAlert, X, Check, FileCheck2, AlertCircle } from 'lucide-react'
import './AccusationModal.css'

export const AccusationModal: React.FC = () => {
  const {
    activeCase,
    isAccusationModalOpen,
    closeAccusationModal,
    unlockedEvidenceIds,
    submitAccusation
  } = useCase()

  const [selectedSuspectId, setSelectedSuspectId] = useState<number | null>(null)
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState<string[]>([])
  const [deductionNotes, setDeductionNotes] = useState<string>('')
  const [validationError, setValidationError] = useState<string | null>(null)

  // Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAccusationModalOpen) {
        closeAccusationModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAccusationModalOpen, closeAccusationModal])

  if (!isAccusationModalOpen) return null

  const toggleEvidence = (id: string) => {
    setSelectedEvidenceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSuspectId) {
      setValidationError('Pilih 1 tersangka utama sebelum mengajukan surat penangkapan.')
      return
    }
    if (selectedEvidenceIds.length < 1) {
      setValidationError('Pilih minimal 1 barang bukti kunci sebagai dasar penangkapan.')
      return
    }

    setValidationError(null)
    submitAccusation(selectedSuspectId, selectedEvidenceIds, deductionNotes)
  }

  return (
    <div className="accusation-backdrop" onClick={closeAccusationModal}>
      <div className="accusation-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <header className="accusation-header">
          <div className="accusation-header-title">
            <ShieldAlert size={20} color="var(--warning)" />
            <h2 className="accusation-title">
              Surat Perintah Penangkapan Tersangka
            </h2>
          </div>

          <button
            id="btn-close-accusation"
            onClick={closeAccusationModal}
            className="btn-outline"
            style={{ padding: '4px 8px' }}
            title="Tutup (Esc)"
          >
            <X size={16} />
          </button>
        </header>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="accusation-form">
          {/* Section 1: Suspect Selection */}
          <div>
            <div className="accusation-section-title">
              1. Tunjuk Tersangka Utama Pelaku Kejahatan
            </div>

            <div className="suspect-grid">
              {activeCase.suspects.map((suspect) => {
                const isSelected = selectedSuspectId === suspect.id
                return (
                  <div
                    key={suspect.id}
                    onClick={() => setSelectedSuspectId(suspect.id)}
                    className={`suspect-card ${isSelected ? 'suspect-card-selected' : ''}`}
                  >
                    {isSelected && (
                      <div className="suspect-check-badge">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}

                    <img
                      src={suspect.mugshotUrl}
                      alt={suspect.name}
                      className="suspect-avatar"
                    />
                    <div className="suspect-name">
                      {suspect.name}
                    </div>
                    <div className="suspect-role">
                      {suspect.role}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Section 2: Key Evidence Selection */}
          <div>
            <div className="accusation-section-title">
              2. Lampirkan Bukti Penentu Hasil Query SQL
            </div>

            <div className="evidence-checkbox-grid">
              {activeCase.evidenceList
                .filter((e) => unlockedEvidenceIds.includes(e.id))
                .map((ev) => {
                  const isChecked = selectedEvidenceIds.includes(ev.id)
                  return (
                    <div
                      key={ev.id}
                      onClick={() => toggleEvidence(ev.id)}
                      className={`evidence-check-item ${isChecked ? 'evidence-check-item-selected' : ''}`}
                    >
                      <div className={`custom-checkbox ${isChecked ? 'custom-checkbox-active' : ''}`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>

                      <img
                        src={ev.photoUrl}
                        alt={ev.name}
                        className="evidence-mini-thumb"
                      />

                      <div className="evidence-mini-info">
                        <div className="evidence-mini-name">
                          {ev.name}
                        </div>
                        <div className="evidence-mini-sub">
                          {ev.foundLocation}
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

          {/* Section 3: Deduction Rationale */}
          <div>
            <div className="accusation-section-title">
              3. Catatan Reka Ulang Kronologi Penyelidik
            </div>

            <textarea
              id="input-deduction-summary"
              value={deductionNotes}
              onChange={(e) => setDeductionNotes(e.target.value)}
              placeholder="Jelaskan secara ringkas bagaimana pelaku masuk ke penthouse, menyalahgunakan kartu akses, dan melarikan diri..."
              rows={3}
              className="deduction-textarea"
            />
          </div>

          {/* Validation Error Banner */}
          {validationError && (
            <div className="accusation-error-banner">
              <AlertCircle size={16} />
              <span>{validationError}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="accusation-actions">
            <button
              type="button"
              onClick={closeAccusationModal}
              className="btn-outline"
            >
              Batal
            </button>

            <button
              id="btn-submit-arrest-warrant"
              type="submit"
              className="btn-primary"
            >
              <FileCheck2 size={16} />
              <span>Ajukan Surat Penangkapan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
