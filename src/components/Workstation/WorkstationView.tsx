import React, { useState } from 'react'
import { useCase } from '../../context/CaseContext'
import { sqlEngine } from '../../services/sqlEngine'
import type { QueryExecutionResult } from '../../cases/types'
import { SchemaExplorer } from './SchemaExplorer'
import { SqlEditor } from './SqlEditor'
import { QueryResultGrid } from './QueryResultGrid'
import { QuickEvidenceDock } from './QuickEvidenceDock'
import { EvidenceModal } from '../CrimeScene/EvidenceModal'
import { ArrowLeft, BookOpen, ShieldAlert, Terminal } from 'lucide-react'
import './WorkstationView.css'

export const WorkstationView: React.FC = () => {
  const {
    activeCase,
    returnToCrimeScene,
    activeSqlDraft,
    setActiveSqlDraft,
    selectedEvidence,
    unlockedEvidenceIds,
    completedMilestones,
    inspectEvidence,
    closeEvidenceModal,
    openWorkstation,
    evaluateQueryResult,
    toggleNotebook,
    setNotebookNotes,
    notebookNotes,
    openAccusationModal
  } = useCase()

  const [queryResult, setQueryResult] = useState<QueryExecutionResult | null>(null)

  const handleRunQuery = () => {
    const res = sqlEngine.executeQuery(activeSqlDraft)
    setQueryResult(res)
    evaluateQueryResult(res)
  }

  const handleInsertSql = (snippet: string) => {
    if (snippet.startsWith('SELECT')) {
      setActiveSqlDraft(snippet)
    } else {
      setActiveSqlDraft(activeSqlDraft ? `${activeSqlDraft} ${snippet}` : snippet)
    }
  }

  const handlePinClue = (rowSummary: string) => {
    const updated = notebookNotes
      ? `${notebookNotes}\n[BUKTI TERSEMAT]: ${rowSummary}`
      : `[BUKTI TERSEMAT]: ${rowSummary}`
    setNotebookNotes(updated)
    alert('Baris data berhasil disematkan ke Catatan Kasus.')
  }

  return (
    <div className="workstation-container">
      {/* Top Workstation Navigation Bar */}
      <header className="workstation-nav-header">
        <div className="workstation-header-left">
          <button
            id="btn-back-to-scene"
            onClick={returnToCrimeScene}
            className="btn-outline"
          >
            <ArrowLeft size={14} />
            <span>Foto TKP</span>
          </button>

          <div className="workstation-title-group">
            <Terminal size={16} color="var(--accent)" />
            <span className="workstation-title">
              Meja Kerja SQL - {activeCase.caseNumber}
            </span>
          </div>
        </div>

        <div className="workstation-header-actions">
          <button
            id="btn-open-notebook-workstation"
            onClick={toggleNotebook}
            className="btn-outline"
          >
            <BookOpen size={14} />
            <span>Catatan ({completedMilestones.length}/{activeCase.milestones.length})</span>
          </button>

          <button
            id="btn-accuse-warrant"
            onClick={openAccusationModal}
            className="btn-secondary"
          >
            <ShieldAlert size={14} color="var(--warning)" />
            <span>Ajukan Dakwaan</span>
          </button>
        </div>
      </header>

      {/* 3-Column Workstation Layout */}
      <div className="workstation-columns">
        {/* Left Column: Schema Explorer */}
        <SchemaExplorer onInsertSql={handleInsertSql} />

        {/* Center Column: Query Editor + Result Grid */}
        <div className="workstation-center-col">
          <SqlEditor
            sql={activeSqlDraft}
            onChange={setActiveSqlDraft}
            onRun={handleRunQuery}
            error={queryResult?.error}
          />

          <QueryResultGrid
            result={queryResult}
            onPinClue={handlePinClue}
          />
        </div>

        {/* Right Column: Quick Evidence Dock */}
        <QuickEvidenceDock
          activeCase={activeCase}
          unlockedEvidenceIds={unlockedEvidenceIds}
          completedMilestones={completedMilestones}
          onInspectEvidence={inspectEvidence}
        />
      </div>

      {/* Evidence Modal Inspector */}
      {selectedEvidence && (
        <EvidenceModal
          evidence={selectedEvidence}
          onClose={closeEvidenceModal}
          onOpenWorkstation={openWorkstation}
        />
      )}
    </div>
  )
}
