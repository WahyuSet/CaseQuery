import React, { createContext, useContext, useState, useEffect } from 'react'
import type { CaseManifest, EvidenceItem, QueryExecutionResult } from '../cases/types'
import { case01Manifest } from '../cases/case01/case01Data'
import { sqlEngine } from '../services/sqlEngine'

export type AppView = 'STAGE_SELECT' | 'CRIME_SCENE' | 'WORKSTATION' | 'VERDICT'

export interface ToastData {
  title: string
  subTitle?: string
}

export interface VerdictResult {
  isSuccess: boolean
  accusedSuspectName: string
  accusedSuspectRole?: string
  accusedSuspectMugshot?: string
  feedbackTitle: string
  feedbackMessage: string
  reconstructionStory?: string
}

interface CaseContextType {
  activeCase: CaseManifest
  activeView: AppView
  selectedEvidence: EvidenceItem | null
  unlockedEvidenceIds: string[]
  completedMilestones: string[]
  activeSqlDraft: string
  notebookNotes: string
  isNotebookOpen: boolean
  isDbReady: boolean
  activeToast: ToastData | null
  isAccusationModalOpen: boolean
  verdictResult: VerdictResult | null
  // Actions
  setActiveView: (view: AppView) => void
  inspectEvidence: (evidenceId: string) => void
  closeEvidenceModal: () => void
  openWorkstation: (initialSql?: string) => void
  returnToCrimeScene: () => void
  returnToStageSelect: () => void
  toggleNotebook: () => void
  setNotebookNotes: (notes: string) => void
  setActiveSqlDraft: (sql: string) => void
  evaluateQueryResult: (res: QueryExecutionResult) => void
  dismissToast: () => void
  openAccusationModal: () => void
  closeAccusationModal: () => void
  submitAccusation: (suspectId: number, evidenceIds: string[], deductionNotes: string) => void
  retryInvestigation: () => void
  resetCaseProgress: () => void
}

const CaseContext = createContext<CaseContextType | undefined>(undefined)

export const CaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeCase] = useState<CaseManifest>(case01Manifest)
  const [activeView, setActiveView] = useState<AppView>('STAGE_SELECT')
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null)
  const [unlockedEvidenceIds, setUnlockedEvidenceIds] = useState<string[]>(() => {
    return activeCase.evidenceList.filter((e) => e.unlockedByDefault).map((e) => e.id)
  })
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([])
  const [activeSqlDraft, setActiveSqlDraft] = useState<string>('SELECT * FROM employees;')
  const [isNotebookOpen, setIsNotebookOpen] = useState(false)
  const [isDbReady, setIsDbReady] = useState(false)
  const [activeToast, setActiveToast] = useState<ToastData | null>(null)
  const [isAccusationModalOpen, setIsAccusationModalOpen] = useState(false)
  const [verdictResult, setVerdictResult] = useState<VerdictResult | null>(null)

  // LocalStorage persistence for notes
  const [notebookNotes, setNotebookNotesState] = useState<string>(() => {
    try {
      return localStorage.getItem(`notes_${activeCase.id}`) || ''
    } catch {
      return ''
    }
  })

  // Initialize SQLite WASM and seed case database on mount
  useEffect(() => {
    let mounted = true

    async function initDb() {
      try {
        await sqlEngine.init()
        sqlEngine.resetDatabase(activeCase.schemaSql, activeCase.seedSql)
        if (mounted) {
          setIsDbReady(true)
        }
      } catch (err) {
        console.error('Failed to init DB in CaseProvider:', err)
      }
    }

    initDb()

    return () => {
      mounted = false
    }
  }, [activeCase])

  const setNotebookNotes = (notes: string) => {
    setNotebookNotesState(notes)
    try {
      localStorage.setItem(`notes_${activeCase.id}`, notes)
    } catch (e) {
      console.warn('LocalStorage error:', e)
    }
  }

  const inspectEvidence = (evidenceId: string) => {
    const item = activeCase.evidenceList.find((e) => e.id === evidenceId)
    if (item) {
      setSelectedEvidence(item)
      if (!unlockedEvidenceIds.includes(item.id)) {
        setUnlockedEvidenceIds((prev) => [...prev, item.id])
      }
    }
  }

  const closeEvidenceModal = () => {
    setSelectedEvidence(null)
  }

  const openWorkstation = (initialSql?: string) => {
    if (initialSql) {
      setActiveSqlDraft(initialSql)
    }
    setSelectedEvidence(null)
    setActiveView('WORKSTATION')
  }

  const returnToCrimeScene = () => {
    setActiveView('CRIME_SCENE')
  }

  const returnToStageSelect = () => {
    setActiveView('STAGE_SELECT')
  }

  const toggleNotebook = () => {
    setIsNotebookOpen((prev) => !prev)
  }

  const dismissToast = () => {
    setActiveToast(null)
  }

  const openAccusationModal = () => {
    setIsAccusationModalOpen(true)
  }

  const closeAccusationModal = () => {
    setIsAccusationModalOpen(false)
  }

  const submitAccusation = (suspectId: number, evidenceIds: string[], _deductionNotes: string) => {
    const accused = activeCase.suspects.find((s) => s.id === suspectId)
    const isCulpritCorrect = suspectId === activeCase.solution.culpritId
    // Checks if at least one crucial evidence is included: EV-02 (RFID) or EV-03 (Vault) or EV-04 (CCTV)
    const hasCrucialEvidence = evidenceIds.some((id) =>
      activeCase.solution.requiredEvidenceIds.includes(id) || id === 'EV-04'
    )

    setIsAccusationModalOpen(false)

    if (isCulpritCorrect && hasCrucialEvidence) {
      // SUCCESS!
      setVerdictResult({
        isSuccess: true,
        accusedSuspectName: accused ? accused.name : 'David Thorne',
        accusedSuspectRole: accused ? accused.role : 'VP of Security',
        accusedSuspectMugshot: accused?.mugshotUrl,
        feedbackTitle: 'SURAT PERINTAH PENANGKAPAN DISETUJUI HAKIM!',
        feedbackMessage: 'Bukti forensik dan log digital yang Anda ajukan tidak dapat dibantah di pengadilan. Pelaku mengakui seluruh perbuatannya!',
        reconstructionStory: activeCase.solution.reconstructionStory
      })
    } else if (!isCulpritCorrect) {
      // WRONG SUSPECT!
      setVerdictResult({
        isSuccess: false,
        accusedSuspectName: accused ? accused.name : 'Tersangka yang Dipilih',
        accusedSuspectRole: accused ? accused.role : 'Karyawan',
        accusedSuspectMugshot: accused?.mugshotUrl,
        feedbackTitle: 'SALAH TANGKAP // TUDUHAN DITOLAK PENGADILAN',
        feedbackMessage: `${accused ? accused.name : 'Tersangka'} memiliki alibi kuat yang terverifikasi dalam rekaman CCTV dan log akses keluar gedung. Penyelidikan harus diulang untuk mencegah tersangka asli kabur!`
      })
    } else {
      // CORRECT SUSPECT BUT INSUFFICIENT EVIDENCE
      setVerdictResult({
        isSuccess: false,
        accusedSuspectName: accused ? accused.name : 'David Thorne',
        accusedSuspectRole: accused ? accused.role : 'VP of Security',
        accusedSuspectMugshot: accused?.mugshotUrl,
        feedbackTitle: 'BUKTI TIDAK MEMADAI // TERSANGKA DIBEBASKAN DENGAN JAMINAN',
        feedbackMessage: 'Anda menunjuk orang yang tepat, namun bukti yang dilampirkan tidak cukup kuat untuk membuktikan keterlibatannya secara langsung di TKP (Lantai 42) pada jam kejadian.'
      })
    }

    setActiveView('VERDICT')
  }

  const retryInvestigation = () => {
    setVerdictResult(null)
    setActiveView('WORKSTATION')
  }

  const evaluateQueryResult = (res: QueryExecutionResult) => {
    if (res.error) return

    for (const ms of activeCase.milestones) {
      if (!completedMilestones.includes(ms.id)) {
        try {
          if (ms.evaluator(res)) {
            setCompletedMilestones((prev) => [...prev, ms.id])
            setActiveToast({
              title: ms.title,
              subTitle: 'Objektif berhasil diselesaikan! Buka Buku Catatan (N) untuk detail temuan.'
            })
            if (ms.unlockedEvidenceId && !unlockedEvidenceIds.includes(ms.unlockedEvidenceId)) {
              setUnlockedEvidenceIds((prev) => [...prev, ms.unlockedEvidenceId!])
            }
          }
        } catch (e) {
          console.error('Error evaluating milestone:', e)
        }
      }
    }
  }

  const resetCaseProgress = () => {
    sqlEngine.resetDatabase(activeCase.schemaSql, activeCase.seedSql)
    setCompletedMilestones([])
    setUnlockedEvidenceIds(activeCase.evidenceList.filter((e) => e.unlockedByDefault).map((e) => e.id))
    setActiveSqlDraft('SELECT * FROM employees;')
    setVerdictResult(null)
    setActiveView('STAGE_SELECT')
  }

  return (
    <CaseContext.Provider
      value={{
        activeCase,
        activeView,
        selectedEvidence,
        unlockedEvidenceIds,
        completedMilestones,
        activeSqlDraft,
        notebookNotes,
        isNotebookOpen,
        isDbReady,
        activeToast,
        isAccusationModalOpen,
        verdictResult,
        setActiveView,
        inspectEvidence,
        closeEvidenceModal,
        openWorkstation,
        returnToCrimeScene,
        returnToStageSelect,
        toggleNotebook,
        setNotebookNotes,
        setActiveSqlDraft,
        evaluateQueryResult,
        dismissToast,
        openAccusationModal,
        closeAccusationModal,
        submitAccusation,
        retryInvestigation,
        resetCaseProgress
      }}
    >
      {children}
    </CaseContext.Provider>
  )
}

export function useCase(): CaseContextType {
  const context = useContext(CaseContext)
  if (!context) {
    throw new Error('useCase must be used within a CaseProvider')
  }
  return context
}
