<template>
  <div
    class="overlay"
    @click.self="$emit('close')"
  >
    <div class="detail-panel">
      <div class="detail-header">
        <h2>📄 {{ table }}</h2>
        <button
          class="btn-secondary btn-sm"
          @click="$emit('close')"
        >
          ✕
        </button>
      </div>

      <div
        v-if="loading"
        class="loading"
      >
        Laden...
      </div>

      <template v-else>
        <section class="section">
          <h3>Spalten</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Typ</th>
                <th>NOT NULL</th>
                <th>Standard</th>
                <th>PK</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="col in schema.columns"
                :key="col.name"
              >
                <td><strong>{{ col.name }}</strong></td>
                <td><code>{{ col.type || 'ANY' }}</code></td>
                <td>{{ col.notnull ? '✓' : '' }}</td>
                <td><code v-if="col.dflt_value">{{ col.dflt_value }}</code></td>
                <td>{{ col.pk ? '🔑' : '' }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section
          v-if="schema.foreignKeys?.length"
          class="section"
        >
          <h3>Fremdschlüssel</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>Spalte</th>
                <th>Referenz-Tabelle</th>
                <th>Referenz-Spalte</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="fk in schema.foreignKeys"
                :key="fk.from"
              >
                <td>{{ fk.from }}</td>
                <td>{{ fk.table }}</td>
                <td>{{ fk.to }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="section">
          <h3>Daten (max. 100 Zeilen)</h3>
          <div class="table-scroll">
            <table
              v-if="rows.length"
              class="data-table"
            >
              <thead>
                <tr>
                  <th
                    v-for="col in Object.keys(rows[0])"
                    :key="col"
                  >
                    {{ col }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, i) in rows"
                  :key="i"
                >
                  <td
                    v-for="col in Object.keys(row)"
                    :key="col"
                  >
                    {{ row[col] }}
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              v-else
              class="empty"
            >
              Keine Daten vorhanden
            </p>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useTableDetail } from '../composables/useTableDetail';

const props = defineProps<{
  table: string
}>();

defineEmits<{
  close: []
}>();

const { schema, rows, loading, loadTableDetail } = useTableDetail();

watch(() => props.table, (name: string) => 
{
  if (name) loadTableDetail(name);
}, { immediate: true });
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;
  z-index: 100;
  overflow-y: auto;
}

.detail-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  padding: 24px;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.detail-header h2 {
  font-size: 20px;
}

.section {
  margin-bottom: 24px;
}

.section h3 {
  font-size: 14px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
}

.data-table tbody tr:hover {
  background: var(--surface-hover);
}

.data-table code {
  background: var(--bg);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: var(--primary);
}

.loading,
.empty {
  color: var(--text-muted);
  text-align: center;
  padding: 20px;
}
</style>
