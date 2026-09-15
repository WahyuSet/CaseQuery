import React, { useState } from 'react'
import { useCase } from '../../context/CaseContext'
import { availableCases } from '../../cases'
import {
  ArrowLeft,
  Lock,
  Play,
  MapPin,
  Clock,
  FolderArchive,
  ShieldCheck,
  SearchCheck,
  Database
} from 'lucide-react'
import './StageSelectView.css'

type CaseFilter = 'ALL' | 'AVAILABLE' | 'LOCKED'

export const StageSelectView: React.FC = () => {
  const { openLanding, setActiveView, completedMilestones, activeCase } = useCase()
  const [filter, setFilter] = useState<CaseFilter>('ALL')

  const isCase01Solved = completedMilestones.length === activeCase.milestones.length

  const handleStartCase = (caseId: string) => {
    if (caseId === 'case_001') {
      setActiveView('CRIME_SCENE')
    } else {
      alert('Kasus ini sedang dalam proses penyusunan berkas forensik dan akan segera dibuka.')
    }
  }

  const filteredCases = availableCases.filter((c) => {
    if (filter === 'AVAILABLE') return c.status !== 'LOCKED'
    if (filter === 'LOCKED') return c.status === 'LOCKED'
    return true
  })

  return (
    <div className="stage-board-container">
      <div className="stage-board-wrapper">
        
        {/* Header with Back to Home Button */}
        <header className="stage-board-header">
          <div className="board-header-left">
            <div className="board-title-group">
              <FolderArchive size={26} color="var(--accent)" />
              <h1 className="board-title">
                Papan Berkas Kasus
              </h1>
            </div>
            <p className="board-subtitle">
              Pilih berkas perkara aktif untuk memulai penyelidikan di tempat kejadian perkara.
            </p>
          </div>

          <div>
            <button
              id="btn-return-home"
              onClick={openLanding}
              className="btn-outline"
            >
              <ArrowLeft size={14} />
              <span>Kembali ke Beranda</span>
            </button>
          </div>
        </header>

        {/* Detective Progress Banner */}
        <section className="detective-stat-banner">
          <div className="stat-item">
            <span className="stat-label">Pangkat Penyelidik</span>
            <span className="stat-value stat-value-accent">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={18} />
                <span>Detektif Madya</span>
              </span>
            </span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Kasus Terpecahkan</span>
            <span className="stat-value">
              {isCase01Solved ? '1 / 3' : '0 / 3'}
            </span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Petunjuk Terungkap</span>
            <span className="stat-value">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <SearchCheck size={17} color="var(--accent)" />
                <span>{completedMilestones.length} / {activeCase.milestones.length}</span>
              </span>
            </span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Mesin Forensik</span>
            <span className="stat-value" style={{ fontSize: '15px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Database size={16} color="var(--success)" />
                <span>SQLite WASM Siap</span>
              </span>
            </span>
          </div>
        </section>

        {/* Filter Bar */}
        <div className="board-filter-bar">
          <div className="filter-pills-group">
            <button
              onClick={() => setFilter('ALL')}
              className={`btn-filter-pill ${filter === 'ALL' ? 'btn-filter-pill-active' : ''}`}
            >
              Semua Berkas ({availableCases.length})
            </button>
            <button
              onClick={() => setFilter('AVAILABLE')}
              className={`btn-filter-pill ${filter === 'AVAILABLE' ? 'btn-filter-pill-active' : ''}`}
            >
              Tersedia (1)
            </button>
            <button
              onClick={() => setFilter('LOCKED')}
              className={`btn-filter-pill ${filter === 'LOCKED' ? 'btn-filter-pill-active' : ''}`}
            >
              Segera Hadir (2)
            </button>
          </div>

          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Menampilkan {filteredCases.length} berkas perkara
          </span>
        </div>

        {/* Case Cards Grid */}
        <section className="case-grid">
          {filteredCases.map((c) => {
            const isLocked = c.status === 'LOCKED'

            return (
              <article
                key={c.id}
                className={`case-card ${isLocked ? 'case-card-locked' : ''}`}
              >
                {/* Photo Banner - Clean, no overlaid badges */}
                <div className="case-image-wrapper">
                  <img
                    src={c.crimeScenePhotoUrl}
                    alt={c.title}
                    className={`case-image ${isLocked ? 'case-image-locked' : ''}`}
                  />
                </div>

                {/* Body Content */}
                <div className="case-body">
                  <div className="case-meta-top">
                    <div className="case-tags">
                      <span className="badge">{c.caseNumber}</span>
                      <span className="badge">{c.difficulty}</span>
                    </div>

                    <div>
                      {isLocked ? (
                        <span className="badge">Segera Hadir</span>
                      ) : isCase01Solved ? (
                        <span className="badge badge-success">Selesai</span>
                      ) : (
                        <span className="badge badge-accent">Tersedia</span>
                      )}
                    </div>
                  </div>

                  <h2 className="case-title">
                    {c.title}
                  </h2>

                  <div className="case-meta-location">
                    <div className="meta-row">
                      <MapPin size={13} color="var(--accent)" />
                      <span>{c.location}</span>
                    </div>
                    <div className="meta-row">
                      <Clock size={13} />
                      <span>{c.incidentDate}</span>
                    </div>
                  </div>

                  <p className="case-desc">
                    {c.briefingSummary}
                  </p>

                  {/* Action Button */}
                  <div className="case-actions">
                    {isLocked ? (
                      <button
                        disabled
                        className="btn-outline"
                        style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed' }}
                      >
                        <Lock size={14} />
                        <span>Berkas Terkunci</span>
                      </button>
                    ) : (
                      <button
                        id={`btn-start-case-${c.id}`}
                        onClick={() => handleStartCase(c.id)}
                        className="btn-primary"
                        style={{ width: '100%' }}
                      >
                        <Play size={14} fill="currentColor" />
                        <span>Masuk ke TKP</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </section>

      </div>
    </div>
  )
}
