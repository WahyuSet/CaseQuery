import { CaseProvider, useCase } from './context/CaseContext'
import { StageSelectView } from './components/StageSelect/StageSelectView'
import { CrimeSceneView } from './components/CrimeScene/CrimeSceneView'
import { WorkstationView } from './components/Workstation/WorkstationView'
import { VerdictScreen } from './components/Accusation/VerdictScreen'
import { AccusationModal } from './components/Accusation/AccusationModal'
import { DetectiveNotebook } from './components/Notebook/DetectiveNotebook'
import { ToastNotification } from './components/Common/ToastNotification'
import { Database } from 'lucide-react'
import './App.css'

function AppContent() {
  const { activeView, isDbReady, activeToast, dismissToast, returnToStageSelect } = useCase()

  return (
    <div className="app-container">
      {/* Top Clean Header */}
      <header className="topbar">
        <div
          className="topbar-brand"
          onClick={returnToStageSelect}
          title="Kembali ke Beranda & Papan Kasus"
        >
          <div className="topbar-logo-icon">
            <Database size={15} />
          </div>
          <span className="topbar-title">SQL Case Detective</span>
        </div>

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
      </header>

      {/* Main View Router */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
