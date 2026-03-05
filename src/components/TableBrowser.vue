<template>
  <div class="table-browser">
    <div class="browser-header">
      <h3>📋 Tabellen & Views</h3>
      <button class="btn-secondary btn-sm" @click="$emit('refresh')">↻</button>
    </div>
    <ul class="table-list">
      <li
        v-for="entry in tables"
        :key="entry.name"
        :class="{ active: entry.name === activeTable }"
        @click="$emit('select', entry.name)"
      >
        <span class="table-icon">{{ entry.type === 'view' ? '👁️' : '📄' }}</span>
        {{ entry.name }}
        <span v-if="entry.type === 'view'" class="type-badge">VIEW</span>
      </li>
    </ul>
    <p v-if="tables.length === 0" class="empty">Keine Tabellen vorhanden</p>
  </div>
</template>

<script setup lang="ts">
import type { TableEntry } from '../types'

defineProps<{
  tables: TableEntry[]
  activeTable: string | null
}>()

defineEmits<{
  select: [name: string]
  refresh: []
}>()
</script>

<style scoped>
.table-browser {
  padding: 12px;
}

.browser-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.browser-header h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-list {
  list-style: none;
}

.table-list li {
  padding: 8px 12px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.15s;
}

.table-list li:hover {
  background: var(--surface-hover);
}

.table-list li.active {
  background: var(--primary);
  color: white;
}

.type-badge {
  margin-left: auto;
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  background: var(--bg);
  padding: 1px 6px;
  border-radius: 4px;
  font-family: monospace;
}

.table-list li.active .type-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.empty {
  color: var(--text-muted);
  font-size: 13px;
  text-align: center;
  padding: 20px;
}
</style>
