<template>
  <div v-if="loading || result || error" class="result">
    <h2>📋 Ergebnis</h2>

    <div v-if="loading" class="status loading">
      ⏳ Abfrage wird ausgeführt...
    </div>

    <div v-else-if="error" class="status error">
      <strong>❌ Fehler:</strong> {{ error }}
    </div>

    <template v-else-if="result">
      <!-- SELECT-Ergebnis -->
      <template v-if="result.type === 'query'">
        <p class="info">{{ result.rowCount }} Zeile(n) zurückgegeben</p>
        <div v-if="result.rows?.length" class="table-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th v-for="col in columns" :key="col">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in result.rows" :key="i">
                <td v-for="col in columns" :key="col">
                  <span :class="{ null: row[col] === null }">
                    {{ row[col] === null ? 'NULL' : row[col] }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="info">Keine Ergebnisse.</p>
      </template>

      <!-- INSERT/UPDATE/DELETE-Ergebnis -->
      <template v-else>
        <div class="status success">
          <strong>✅ Erfolgreich!</strong>
          {{ result.changes }} Zeile(n) betroffen.
          <span v-if="result.lastInsertRowid">
            Letzte ID: {{ result.lastInsertRowid }}
          </span>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { QueryResult } from '../types'

const props = defineProps<{
  result: QueryResult | null
  error: string | null
  loading: boolean
}>()

const columns = computed<string[]>(() => {
  if (props.result?.rows?.length) {
    return Object.keys(props.result.rows[0])
  }
  return []
})
</script>

<style scoped>
.result {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}

.result h2 {
  font-size: 18px;
  margin-bottom: 12px;
}

.status {
  padding: 12px 16px;
  border-radius: var(--radius);
  font-size: 14px;
}

.loading {
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary);
}

.error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error);
}

.success {
  background: rgba(34, 197, 94, 0.1);
  color: var(--success);
}

.info {
  color: var(--text-muted);
  font-size: 13px;
  margin-bottom: 10px;
}

.table-scroll {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.data-table th,
.data-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

.data-table th {
  background: var(--bg);
  color: var(--text-muted);
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  position: sticky;
  top: 0;
}

.data-table tbody tr:hover {
  background: var(--surface-hover);
}

.null {
  color: var(--text-muted);
  font-style: italic;
}
</style>
