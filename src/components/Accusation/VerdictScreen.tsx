import React from 'react'
import { useCase } from '../../context/CaseContext'
import { RotateCcw, ArrowLeft, ShieldCheck, ShieldAlert, Award } from 'lucide-react'
import './VerdictScreen.css'

export const VerdictScreen: React.FC = () => {
  const {
    activeCase,
    verdictResult,
    retryInvestigation,
    resetCaseProgress,
    returnToStageSelect,
    completedMilestones
  } = useCase()

  if (!verdictResult) return null

  const isSuccess = verdictResult.isSuccess

  return (
    <div className="verdict-container">
      <div className={`verdict-card ${isSuccess ? 'verdict-card-success' : 'verdict-card-fail'}`}>
        {/* Status Icon & Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div className={`verdict-icon-circle ${isSuccess ? 'verdict-icon-success' : 'verdict-icon-fail'}`}>
            {isSuccess ? (
              <ShieldCheck size={36} />
            ) : (
              <ShieldAlert size={36} />
            )}
          </div>

          <h1 className="verdict-status-title">
            {isSuccess ? 'Kasus Berhasil Dipecahkan!' : 'Analisis Bukti Belum Tepat'}
          </h1>
        </div>

        {/* Culprit Card / Suspect Profile */}
        <div className="culprit-card">
          {verdictResult.accusedSuspectMugshot && (
            <img
              src={verdictResult.accusedSuspectMugshot}
              alt={verdictResult.accusedSuspectName}
              className="culprit-mugshot"
            />
          )}

          <div className="culprit-info">
            <div className="culprit-label">Tersangka Tertuduh</div>
            <div className="culprit-name">
              {verdictResult.accusedSuspectName}
            </div>
            <div className="culprit-role">
              {verdictResult.accusedSuspectRole}
            </div>
          </div>

          <div className={`culprit-stamp ${isSuccess ? 'stamp-success' : 'stamp-fail'}`}>
            {isSuccess ? 'TERBUKTI' : 'DIBEBASKAN'}
          </div>
        </div>

        {/* Story / Reconstruction Breakdown */}
        {isSuccess && verdictResult.reconstructionStory ? (
          <div className="story-card">
            <div className="story-header">
              <Award size={18} color="var(--accent)" />
              <h3 className="story-title">
                Rekonstruksi Kronologi Kejahatan
              </h3>
            </div>
            <p className="story-text">
              {verdictResult.reconstructionStory}
            </p>
          </div>
        ) : (
          <div className="fail-message-box">
            {verdictResult.feedbackMessage}
          </div>
        )}

        {/* Case Stats Summary */}
        {isSuccess && (
          <div className="verdict-stats">
            <span>Kasus: {activeCase.caseNumber}</span>
            <span>•</span>
            <span>Petunjuk: {completedMilestones.length}/{activeCase.milestones.length}</span>
            <span>•</span>
            <span>Status: Terselesaikan</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="verdict-actions">
          {isSuccess ? (
            <>
              <button
                id="btn-return-to-stages-success"
                onClick={returnToStageSelect}
                className="btn-outline"
                style={{ padding: '10px 18px' }}
              >
                <ArrowLeft size={15} />
                <span>Papan Kasus</span>
              </button>

              <button
                id="btn-replay-case"
                onClick={resetCaseProgress}
                className="btn-primary"
                style={{ padding: '10px 24px' }}
              >
                <RotateCcw size={15} />
                <span>Mainkan Ulang</span>
              </button>
            </>
          ) : (
            <>
              <button
                id="btn-retry-investigation"
                onClick={retryInvestigation}
                className="btn-primary"
                style={{ padding: '10px 20px' }}
              >
                <ArrowLeft size={15} />
                <span>Kembali ke Meja Kerja SQL</span>
              </button>

              <button
                id="btn-reset-after-failure"
                onClick={resetCaseProgress}
                className="btn-outline"
                style={{ padding: '10px 18px' }}
              >
                <RotateCcw size={15} />
                <span>Papan Kasus</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
