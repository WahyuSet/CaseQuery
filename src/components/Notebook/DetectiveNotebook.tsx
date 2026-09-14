import React, { useState, useEffect } from 'react'
import { useCase } from '../../context/CaseContext'
import { X, CheckCircle2, Circle, BookOpen, Edit3, Trash2, Terminal } from 'lucide-react'
import './DetectiveNotebook.css'

export const DetectiveNotebook: React.FC = () => {
  const {
    activeCase,
    isNotebookOpen,
    toggleNotebook,
    completedMilestones,
    notebookNotes,
    setNotebookNotes,
    openWorkstation
  } = useCase()

  const [activeTab, setActiveTab] = useState<'MILESTONES' | 'SCRATCHPAD'>('MILESTONES')

  // Global hotkeys: 'N' to toggle notebook, 'Escape' to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'

      if (e.key === 'Escape' && isNotebookOpen) {
        toggleNotebook()
      } else if ((e.key === 'n' || e.key === 'N') && !isInput) {
        e.preventDefault()
        toggleNotebook()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isNotebookOpen, toggleNotebook])

  if (!isNotebookOpen) return null

  return (
    <div className="notebook-backdrop" onClick={toggleNotebook}>
      <div className="notebook-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <header className="notebook-header">
          <div className="notebook-title-group">
            <BookOpen size={18} color="var(--accent)" />
            <h2 className="notebook-title">
              Catatan Investigasi
            </h2>
            <span className="badge badge-accent">
              {completedMilestones.length}/{activeCase.milestones.length}
            </span>
          </div>

          <button
            id="btn-close-notebook"
            onClick={toggleNotebook}
            className="btn-outline"
            style={{ padding: '4px 8px' }}
            title="Tutup Catatan (Esc atau N)"
          >
            <X size={16} />
          </button>
        </header>

        {/* Tab Switcher */}
        <div className="notebook-tabs">
          <button
            onClick={() => setActiveTab('MILESTONES')}
            className={`notebook-tab-btn ${activeTab === 'MILESTONES' ? 'notebook-tab-btn-active' : ''}`}
          >
            Petunjuk Kasus ({completedMilestones.length})
          </button>
          <button
            onClick={() => setActiveTab('SCRATCHPAD')}
            className={`notebook-tab-btn ${activeTab === 'SCRATCHPAD' ? 'notebook-tab-btn-active' : ''}`}
          >
            Catatan Bebas
          </button>
        </div>

        {/* Tab 1: Milestones Content */}
        {activeTab === 'MILESTONES' && (
          <div className="notebook-content-scroll">
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Objektif akan otomatis tercentang ketika query SQL Anda menghasilkan data bukti yang relevan:
            </div>

            {activeCase.milestones.map((ms) => {
              const isCompleted = completedMilestones.includes(ms.id)
              return (
                <div
                  key={ms.id}
                  className={`milestone-card ${isCompleted ? 'milestone-card-done' : 'milestone-card-pending'}`}
                >
                  <div className="milestone-card-header">
                    {isCompleted ? (
                      <CheckCircle2 size={18} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    ) : (
                      <Circle size={18} color="var(--text-muted)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    )}

                    <div style={{ flex: 1 }}>
                      <h4 className={`milestone-title ${isCompleted ? 'milestone-title-done' : ''}`}>
                        {ms.title}
                      </h4>

                      <p className="milestone-desc">
                        {ms.description}
                      </p>

                      {!isCompleted && (
                        <div style={{ marginTop: '10px' }}>
                          <button
                            onClick={() => {
                              toggleNotebook()
                              openWorkstation()
                            }}
                            className="btn-outline"
                            style={{ fontSize: '11px', padding: '3px 8px' }}
                          >
                            <Terminal size={11} />
                            <span>Buka Meja Kerja SQL</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Tab 2: Scratchpad Content */}
        {activeTab === 'SCRATCHPAD' && (
          <div className="scratchpad-container">
            <div className="scratchpad-meta">
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Edit3 size={13} />
                <span>Tersimpan otomatis di browser</span>
              </span>
              <button
                onClick={() => {
                  if (confirm('Yakin ingin mengosongkan catatan bebas?')) {
                    setNotebookNotes('')
                  }
                }}
                className="btn-outline"
                style={{ fontSize: '11px', padding: '2px 6px' }}
                title="Hapus semua catatan"
              >
                <Trash2 size={11} />
                <span>Hapus</span>
              </button>
            </div>

            <textarea
              id="notebook-scratchpad"
              value={notebookNotes}
              onChange={(e) => setNotebookNotes(e.target.value)}
              placeholder="Ketik hipotesis alibi yang janggal, nama saksi, atau query penting di sini...&#10;&#10;Contoh:&#10;- David Thorne pemegang kartu RFID-8819&#10;- Rekaman CCTV sekuriti keluar pukul 23:55"
              className="scratchpad-textarea"
            />

            <div className="scratchpad-meta">
              <span>{notebookNotes.length} karakter</span>
              <span>Tekan Esc untuk menutup</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
