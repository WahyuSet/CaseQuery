import React, { useState, useEffect } from 'react'
import { sqlEngine } from '../../services/sqlEngine'
import type { TableSchemaInfo } from '../../cases/types'
import { Database, ChevronRight, ChevronDown, Copy, Search, Key } from 'lucide-react'
import './SchemaExplorer.css'

interface SchemaExplorerProps {
  onInsertSql: (sql: string) => void
}

export const SchemaExplorer: React.FC<SchemaExplorerProps> = ({ onInsertSql }) => {
  const [tables, setTables] = useState<TableSchemaInfo[]>([])
  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({})
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    const list = sqlEngine.getTableList()
    setTables(list)
    if (list.length > 0) {
      setExpandedTables({
        [list[0].tableName]: true,
        [list[1]?.tableName]: true
      })
    }
  }, [])

  const toggleTable = (tableName: string) => {
    setExpandedTables((prev) => ({
      ...prev,
      [tableName]: !prev[tableName]
    }))
  }

  const filteredTables = tables.filter((t) =>
    t.tableName.toLowerCase().includes(searchFilter.toLowerCase())
  )

  return (
    <aside className="schema-explorer-panel">
      {/* Header */}
      <div className="schema-header">
        <Database size={15} color="var(--accent)" />
        <span className="schema-title">
          Struktur Database
        </span>
      </div>

      {/* Quick Search */}
      <div className="schema-search-box">
        <div className="search-input-wrapper">
          <Search size={13} color="var(--text-muted)" />
          <input
            id="input-schema-search"
            type="text"
            placeholder="Cari nama tabel..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="schema-search-input"
          />
        </div>
      </div>

      {/* Table List */}
      <div className="schema-table-list">
        {filteredTables.length === 0 ? (
          <div className="schema-empty">
            Tabel tidak ditemukan
          </div>
        ) : (
          filteredTables.map((table) => {
            const isExpanded = !!expandedTables[table.tableName]
            return (
              <div key={table.tableName}>
                {/* Table Header Row */}
                <div
                  className={`table-row ${isExpanded ? 'table-row-expanded' : ''}`}
                  onClick={() => toggleTable(table.tableName)}
                >
                  <div className="table-name-group">
                    {isExpanded ? (
                      <ChevronDown size={14} color="var(--accent)" />
                    ) : (
                      <ChevronRight size={14} color="var(--text-muted)" />
                    )}
                    <span className={`table-name ${isExpanded ? 'table-name-active' : ''}`}>
                      {table.tableName}
                    </span>
                  </div>

                  <button
                    id={`btn-copy-select-${table.tableName}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      onInsertSql(`SELECT * FROM ${table.tableName} LIMIT 25;`)
                    }}
                    title={`Salin query SELECT untuk tabel ${table.tableName}`}
                    className="btn-copy-table"
                  >
                    <Copy size={12} />
                  </button>
                </div>

                {/* Column List */}
                {isExpanded && (
                  <div className="column-list">
                    {table.columns.map((col) => (
                      <div
                        key={col.name}
                        onClick={() => onInsertSql(col.name)}
                        className="column-item"
                        title="Klik untuk menyisipkan nama kolom ke editor"
                      >
                        <div className="column-left">
                          {col.isPrimaryKey ? (
                            <Key size={10} color="var(--warning)" />
                          ) : (
                            <span style={{ color: 'var(--text-muted)' }}>•</span>
                          )}
                          <span>{col.name}</span>
                        </div>
                        <span className="column-type">
                          {col.type}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Footer Info */}
      <div className="schema-footer">
        Klik ikon salin untuk query cepat.
      </div>
    </aside>
  )
}
