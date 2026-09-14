import React, { useRef } from 'react'
import { Play, RotateCcw, AlertTriangle } from 'lucide-react'
import './SqlEditor.css'

interface SqlEditorProps {
  sql: string
  onChange: (sql: string) => void
  onRun: () => void
  error?: string
}

export const SqlEditor: React.FC<SqlEditorProps> = ({ sql, onChange, onRun, error }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Run query on Ctrl + Enter or Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      onRun()
    }
  }

  const sampleQueries = [
    { label: 'employees', sql: 'SELECT * FROM employees;' },
    { label: 'keycard_scans', sql: "SELECT * FROM keycard_scans WHERE timestamp >= '2026-09-14 23:00:00' ORDER BY timestamp ASC;" },
    { label: 'cctv_logs', sql: 'SELECT * FROM cctv_logs ORDER BY timestamp ASC;' },
    { label: 'phone_records', sql: 'SELECT * FROM phone_records ORDER BY timestamp ASC;' }
  ]

  return (
    <div className="sql-editor-container">
      {/* Editor Toolbar */}
      <div className="editor-toolbar">
        <div className="template-group">
          <span className="template-label">
            Contoh Query:
          </span>
          {sampleQueries.map((q) => (
            <button
              key={q.label}
              onClick={() => onChange(q.sql)}
              className="btn-template"
            >
              {q.label}
            </button>
          ))}
        </div>

        <div className="editor-actions">
          <button
            id="btn-clear-query"
            onClick={() => onChange('')}
            className="btn-outline"
            style={{ padding: '5px 10px', fontSize: '12px' }}
            title="Bersihkan Editor"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>

          <button
            id="btn-run-query"
            onClick={onRun}
            className="btn-primary"
            style={{ padding: '6px 14px', fontSize: '13px' }}
            title="Jalankan Query (Ctrl + Enter)"
          >
            <Play size={13} fill="currentColor" />
            <span>Jalankan (Ctrl+Enter)</span>
          </button>
        </div>
      </div>

      {/* Editor Textarea */}
      <div className="editor-textarea-box">
        <textarea
          ref={textareaRef}
          id="sql-query-editor"
          value={sql}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tulis perintah SQL di sini (misal: SELECT * FROM employees WHERE assigned_keycard = 'NEXA-RFID-8819';)..."
          spellCheck={false}
          className="sql-textarea"
        />
      </div>

      {/* Error Banner */}
      {error && (
        <div className="editor-error-banner">
          <AlertTriangle size={15} />
          <span><strong>Kesalahan SQL:</strong> {error}</span>
        </div>
      )}
    </div>
  )
}
