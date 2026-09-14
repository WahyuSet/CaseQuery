import React from 'react'
import { useCase } from '../../context/CaseContext'
import { availableCases } from '../../cases'
import {
  Search,
  Terminal,
  Lock,
  Play,
  MapPin,
  Clock,
  FolderOpen,
  Award
} from 'lucide-react'
import './StageSelectView.css'

export const StageSelectView: React.FC = () => {
  const { setActiveView, completedMilestones, activeCase } = useCase()

  const isCase01Solved = completedMilestones.length === activeCase.milestones.length

  const handleStartCase = (caseId: string) => {
    if (caseId === 'case_001') {
      setActiveView('CRIME_SCENE')
    } else {
      alert('Kasus ini sedang dalam proses penyusunan berkas forensik dan akan segera dibuka.')
    }
  }

  return (
    <div className="stage-select-container">
      <div className="stage-select-wrapper">
        
        {/* Asymmetric Split Hero */}
        <section className="hero-split">
          <div className="hero-content">
            <div className="hero-tag">
              <span className="badge badge-accent">Game Puzzle SQL</span>
            </div>

            <h1 className="hero-title">
              Pecahkan Kasus Kriminal Lewat Analisis Database
            </h1>

            <p className="hero-description">
              Periksa tempat kejadian perkara, uji alibi para tersangka lewat query SQL di browser, dan ungkap dalang kejahatan.
            </p>

            <div className="hero-actions">
              <button
                id="btn-hero-start"
                onClick={() => handleStartCase('case_001')}
                className="btn-primary"
              >
                <Play size={14} fill="currentColor" />
                <span>Mulai Kasus 001</span>
              </button>
            </div>
          </div>

          {/* Right Column: Mini Forensic Flow */}
          <div className="hero-flowcard">
            <span className="flowcard-title">Alur Investigasi</span>
            <div className="flow-step-list">
              <div className="flow-step-item">
                <div className="flow-step-icon">
                  <Search size={15} />
                </div>
                <div className="flow-step-content">
                  <h4>Inspeksi Foto TKP</h4>
                  <p>Temukan bukti fisik seperti cangkir kopi beracun dan kartu akses RFID.</p>
                </div>
              </div>

              <div className="flow-step-item">
                <div className="flow-step-icon">
                  <Terminal size={15} />
                </div>
                <div className="flow-step-content">
                  <h4>Uji Query SQL</h4>
                  <p>Jalankan query SQLite di browser untuk memverifikasi log akses dan alibi.</p>
                </div>
              </div>

              <div className="flow-step-item">
                <div className="flow-step-icon">
                  <Award size={15} />
                </div>
                <div className="flow-step-content">
                  <h4>Ajukan Dakwaan</h4>
                  <p>Tunjuk tersangka utama dan sertakan bukti pendukung yang valid.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case List Section */}
        <section>
          <div className="stages-header">
            <div className="stages-title-group">
              <FolderOpen size={20} color="var(--accent)" />
              <h2 className="stages-title">
                Papan Berkas Kasus
              </h2>
            </div>
            <span className="stages-subtitle">
              Penyimpanan lokal SQLite WASM
            </span>
          </div>

          <div className="case-grid">
            {availableCases.map((c) => {
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
                    {/* Meta Top: Clean badges below the photo */}
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

                    <h3 className="case-title">
                      {c.title}
                    </h3>

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
          </div>
        </section>

      </div>
    </div>
  )
}
