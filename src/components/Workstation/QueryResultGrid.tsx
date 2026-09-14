import React, { useState } from 'react'
import type { QueryExecutionResult } from '../../cases/types'
import { Clock, CheckCircle2, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react'
import './QueryResultGrid.css'

interface QueryResultGridProps {
  result: QueryExecutionResult | null
  onPinClue?: (rowSummary: string) => void
}

const PAGE_SIZE = 15

export const QueryResultGrid: React.FC<QueryResultGridProps> = ({ result, onPinClue }) => {
  const [currentPage, setCurrentPage] = useState(1)

  if (!result) {
    return (
      <div className="grid-empty-state">
        <div className="grid-empty-title">Belum ada query yang dieksekusi</div>
        <div className="grid-empty-desc">
          Tulis perintah SQL di editor atas atau klik tabel di panel kiri, lalu tekan <strong>Ctrl + Enter</strong>.
        </div>
      </div>
    )
  }

  if (result.columns.length === 0) {
    return (
      <div className="grid-empty-state">
        <CheckCircle2 size={24} color="var(--success)" />
        <div className="grid-empty-title">Query berhasil dijalankan tanpa baris data (0 baris).</div>
        <div className="grid-exec-time">
          Selesai dalam {result.executionTimeMs} ms
        </div>
      </div>
    )
  }

  const totalPages = Math.ceil(result.values.length / PAGE_SIZE)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const displayedRows = result.values.slice(startIndex, startIndex + PAGE_SIZE)

  return (
    <div className="grid-container">
      {/* Result Status Bar */}
      <div className="grid-status-bar">
        <div className="grid-status-left">
          <span className="badge badge-accent">
            {result.rowCount} baris ditemukan
          </span>
          <span className="grid-exec-time">
            <Clock size={12} />
            {result.executionTimeMs} ms
          </span>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="grid-pagination">
            <span>
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn-outline"
              style={{ padding: '2px 6px' }}
            >
              <ChevronLeft size={13} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn-outline"
              style={{ padding: '2px 6px' }}
            >
              <ChevronRight size={13} />
            </button>
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="grid-table-scroll">
        <table className="result-table">
          <thead>
            <tr>
              <th className="result-th" style={{ width: '40px' }}>#</th>
              {result.columns.map((col) => (
                <th key={col} className="result-th">
                  {col}
                </th>
              ))}
              {onPinClue && <th className="result-th" style={{ width: '50px' }}>Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {displayedRows.map((row, rIdx) => {
              const rowNum = startIndex + rIdx + 1
              return (
                <tr key={rIdx} className="result-tr">
                  <td className="result-td result-td-num">
                    {rowNum}
                  </td>
                  {row.map((val, cIdx) => {
                    const strVal = val === null ? 'NULL' : String(val)
                    const isNull = val === null
                    return (
                      <td
                        key={cIdx}
                        className={`result-td ${isNull ? 'result-td-null' : ''}`}
                      >
                        {strVal}
                      </td>
                    )
                  })}
                  {onPinClue && (
                    <td className="result-td">
                      <button
                        onClick={() => {
                          const summary = row.map((v, i) => `${result.columns[i]}: ${v}`).join(', ')
                          onPinClue(summary)
                        }}
                        className="btn-pin"
                        title="Sematkan baris data ini ke Catatan"
                      >
                        <Bookmark size={13} />
                      </button>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
