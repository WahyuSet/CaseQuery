import { CaseProvider, useCase } from './context/CaseContext'
import { LandingPageView } from './components/LandingPage/LandingPageView'
import { StageSelectView } from './components/StageSelect/StageSelectView'
import { CrimeSceneView } from './components/CrimeScene/CrimeSceneView'
import { WorkstationView } from './components/Workstation/WorkstationView'
import { VerdictScreen } from './components/Accusation/VerdictScreen'
import { AccusationModal } from './components/Accusation/AccusationModal'
import { DetectiveNotebook } from './components/Notebook/DetectiveNotebook'
import { ToastNotification } from './components/Common/ToastNotification'
import { Database, FolderArchive } from 'lucide-react'
import './App.css'

function AppContent() {
  const {
    activeView,
    isDbReady,
    activeToast,
    dismissToast,
    openLanding,
    openStageSelect
  } = useCase()

  return (
    <div className="app-container">
      {/* Dynamic Navigation Topbar */}
      <header className="topbar">
        <div className="topbar-left">
          <div
            className="topbar-brand"
            onClick={openLanding}
            title="Kembali ke Beranda"
          >
            <div className="topbar-logo-icon">
              <Database size={15} />
            </div>
            <span className="topbar-title">SQL Case Detective</span>
          </div>

          {/* Dynamic Navigation Menu */}
          <nav className="topbar-nav">
            <button
              onClick={openLanding}
              className={`topbar-nav-btn ${activeView === 'LANDING' ? 'topbar-nav-btn-active' : ''}`}
            >
              Beranda
            </button>
            <button
              onClick={openStageSelect}
              className={`topbar-nav-btn ${activeView === 'STAGE_SELECT' ? 'topbar-nav-btn-active' : ''}`}
            >
              Papan Kasus
            </button>
          </nav>
        </div>

        <div className="topbar-right">
          {activeView === 'LANDING' && (
            <button
              onClick={openStageSelect}
              className="btn-outline"
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              <FolderArchive size={13} />
              <span>Buka Papan Kasus</span>
            </button>
          )}

          <div className="topbar-status">
            <span
              className="topbar-status-dot"
              style={{
                backgroundColor: isDbReady ? 'var(--success)' : 'var(--warning)'
              }}
            />
            <span>
              {isDbReady ? 'Database Siap' : 'Menyiapkan Database...'}
            </span>
          </div>
        </div>
      </header>

      {/* Main View Router */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeView === 'LANDING' && <LandingPageView />}
        {activeView === 'STAGE_SELECT' && <StageSelectView />}
        {activeView === 'CRIME_SCENE' && <CrimeSceneView />}
        {activeView === 'WORKSTATION' && <WorkstationView />}
        {activeView === 'VERDICT' && <VerdictScreen />}
      </main>

      {/* Global Modals & Overlays */}
      <AccusationModal />
      <DetectiveNotebook />

      {/* Clue Unlock Toast */}
      {activeToast && (
        <ToastNotification
          message={activeToast.title}
          subMessage={activeToast.subTitle}
          onClose={dismissToast}
        />
      )}
    </div>
  )
}

function App() {
  return (
    <CaseProvider>
      <AppContent />
    </CaseProvider>
  )
}

export default App
