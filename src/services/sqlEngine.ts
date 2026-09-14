import initSqlJs, { type Database } from 'sql.js'
// @ts-ignore - Vite wasm url import
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import type { QueryExecutionResult, TableSchemaInfo } from '../cases/types'

export class SqlEngineService {
  private static instance: SqlEngineService | null = null
  private db: Database | null = null
  private isInitialized = false
  private initPromise: Promise<void> | null = null

  private constructor() {}

  public static getInstance(): SqlEngineService {
    if (!SqlEngineService.instance) {
      SqlEngineService.instance = new SqlEngineService()
    }
    return SqlEngineService.instance
  }

  /**
   * Initializes sql.js with WebAssembly binary
   */
  public async init(): Promise<void> {
    if (this.isInitialized && this.db) {
      return
    }

    if (this.initPromise) {
      return this.initPromise
    }

    this.initPromise = (async () => {
      try {
        const SQL = await initSqlJs({
          locateFile: () => sqlWasmUrl || '/sql-wasm.wasm'
        })
        this.db = new SQL.Database()
        this.isInitialized = true
      } catch (err) {
        console.error('Failed to initialize SQLite WASM:', err)
        throw new Error('SQLite WASM initialization failed: ' + String(err))
      }
    })()

    return this.initPromise
  }

  /**
   * Executes a SQL query string and measures execution time in milliseconds.
   */
  public executeQuery(sql: string): QueryExecutionResult {
    const trimmed = sql.trim()
    if (!trimmed) {
      return {
        columns: [],
        values: [],
        rowCount: 0,
        executionTimeMs: 0,
        error: 'Query is empty. Enter a valid SQL statement.'
      }
    }

    if (!this.db) {
      return {
        columns: [],
        values: [],
        rowCount: 0,
        executionTimeMs: 0,
        error: 'Database engine not ready. Wait for initialization.'
      }
    }

    const startTime = performance.now()
    try {
      // db.exec returns QueryExecResult[]: [{ columns: string[], values: unknown[][] }]
      const results = this.db.exec(trimmed)
      const executionTimeMs = parseFloat((performance.now() - startTime).toFixed(2))

      if (results.length === 0) {
        return {
          columns: [],
          values: [],
          rowCount: 0,
          executionTimeMs
        }
      }

      // Pick the last result set if multiple queries are chained
      const lastResult = results[results.length - 1]
      return {
        columns: lastResult.columns,
        values: lastResult.values,
        rowCount: lastResult.values.length,
        executionTimeMs
      }
    } catch (err: unknown) {
      const executionTimeMs = parseFloat((performance.now() - startTime).toFixed(2))
      const errorMessage = err instanceof Error ? err.message : String(err)
      return {
        columns: [],
        values: [],
        rowCount: 0,
        executionTimeMs,
        error: errorMessage
      }
    }
  }

  /**
   * Introspects sqlite_master to retrieve the list of tables and column definitions.
   */
  public getTableList(): TableSchemaInfo[] {
    if (!this.db) return []

    try {
      const masterRes = this.db.exec(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name ASC;"
      )

      if (masterRes.length === 0 || !masterRes[0].values) {
        return []
      }

      const tables: TableSchemaInfo[] = []
      for (const row of masterRes[0].values) {
        const tableName = String(row[0])
        const pragmaRes = this.db.exec(`PRAGMA table_info("${tableName}");`)
        
        const columns: { name: string; type: string; isPrimaryKey?: boolean }[] = []
        if (pragmaRes.length > 0 && pragmaRes[0].values) {
          // PRAGMA table_info columns: cid, name, type, notnull, dflt_value, pk
          for (const colRow of pragmaRes[0].values) {
            columns.push({
              name: String(colRow[1]),
              type: String(colRow[2] || 'TEXT'),
              isPrimaryKey: Boolean(colRow[5])
            })
          }
        }

        tables.push({
          tableName,
          columns
        })
      }

      return tables
    } catch (err) {
      console.error('Error fetching table list:', err)
      return []
    }
  }

  /**
   * Resets database by clearing and executing schema + seed scripts.
   */
  public resetDatabase(schemaSql: string, seedSql: string): void {
    if (!this.db) {
      throw new Error('Cannot reset: SQLite engine is not initialized.')
    }

    try {
      // Clear all existing user tables
      const tables = this.getTableList()
      for (const t of tables) {
        this.db.run(`DROP TABLE IF EXISTS "${t.tableName}";`)
      }

      // Execute schema DDL
      this.db.run(schemaSql)
      // Execute seed data inserts
      this.db.run(seedSql)
    } catch (err) {
      console.error('Failed to reset and seed database:', err)
      throw err
    }
  }

  /**
   * Closes database and cleans memory.
   */
  public close(): void {
    if (this.db) {
      this.db.close()
      this.db = null
      this.isInitialized = false
      this.initPromise = null
    }
  }
}

export const sqlEngine = SqlEngineService.getInstance()
