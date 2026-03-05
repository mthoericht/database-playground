import { ref } from 'vue'
import type { QueryResult, TableEntry } from '../types'

const tables = ref<TableEntry[]>([])
const activeTable = ref<string | null>(null)
const result = ref<QueryResult | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)

async function loadTables(): Promise<void> {
  try {
    const res = await fetch('/api/tables')
    tables.value = await res.json()
  } catch (e) {
    console.error('Fehler beim Laden der Tabellen:', e)
  }
}

function selectTable(name: string): void {
  activeTable.value = name
}

async function runQuery(sql: string): Promise<void> {
  loading.value = true
  error.value = null
  result.value = null

  try {
    const res = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sql })
    })
    const data = await res.json()
    if (!res.ok) {
      error.value = data.error
    } else {
      result.value = data
      loadTables()
    }
  } catch (e) {
    error.value = (e as Error).message
  } finally {
    loading.value = false
  }
}

async function resetDatabase(): Promise<void> {
  if (!confirm('Datenbank wirklich zurücksetzen? Alle Änderungen gehen verloren.')) return
  try {
    await fetch('/api/reset', { method: 'POST' })
    await loadTables()
    activeTable.value = null
    result.value = null
    error.value = null
  } catch (e) {
    error.value = (e as Error).message
  }
}

export function useDatabase() {
  return {
    tables,
    activeTable,
    result,
    error,
    loading,
    loadTables,
    selectTable,
    runQuery,
    resetDatabase,
  }
}
