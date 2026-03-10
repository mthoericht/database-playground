<template>
  <div
    class="template-card"
  >
    <div class="card-header">
      <span class="badge">{{ template.badge }}</span>
      <h4>{{ template.title }}</h4>
    </div>
    <p class="description">
      {{ template.description }}
    </p>
    <pre class="sql-preview"><code>{{ template.sql }}</code></pre>
    <button class="btn-primary btn-sm run-btn" @click="$emit('run', template.sql)">
      ▶ Ausführen
    </button>
  </div>
</template>

<script setup lang="ts">
import type { SqlTemplate } from '../types';

defineProps<{
  template: SqlTemplate;
}>();

defineEmits<{
  run: [sql: string];
}>();
</script>

<style scoped>
.template-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;

  transition: all 0.15s;
  display: flex;
  flex-direction: column;
}

.template-card:hover {
  border-color: var(--primary);
  transform: translateY(-1px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.badge {
  background: var(--primary);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: monospace;
}

.card-header h4 {
  font-size: 14px;
}

.description {
  color: var(--text-muted);
  font-size: 12px;
  margin-bottom: 10px;
}

.sql-preview {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 10px;
  font-size: 12px;
  overflow-x: auto;
  flex: 1;
  margin-bottom: 10px;
}

.sql-preview code {
  color: var(--success);
  font-family: 'Fira Code', 'Cascadia Code', monospace;
  white-space: pre;
}

.run-btn {
  align-self: flex-end;
}
</style>
