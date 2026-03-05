export interface QueryResult {
  type: 'query' | 'statement'
  rows?: Record<string, unknown>[]
  rowCount?: number
  changes?: number
  lastInsertRowid?: string
}

export interface TableColumn {
  cid: number
  name: string
  type: string
  notnull: number
  dflt_value: string | null
  pk: number
}

export interface ForeignKey {
  from: string
  table: string
  to: string
}

export interface TableEntry {
  name: string
  type: 'table' | 'view'
}

export interface TableSchema {
  columns: TableColumn[]
  foreignKeys: ForeignKey[]
}

export interface SqlCategory {
  key: string
  label: string
  icon: string
}

export interface SqlTemplate {
  category: string
  badge: string
  title: string
  description: string
  sql: string
}
