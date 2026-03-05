<template>
  <div class="templates">
    <h2>📚 SQL-Vorlagen</h2>
    <p class="subtitle">Klicke auf eine Vorlage, um sie auszuführen und das Ergebnis zu sehen.</p>

    <div class="category-tabs">
      <button
        v-for="cat in categories"
        :key="cat.key"
        :class="['tab', { active: activeCategory === cat.key }]"
        @click="activeCategory = cat.key"
      >
        {{ cat.icon }} {{ cat.label }}
      </button>
    </div>

    <div class="template-grid">
      <div
        v-for="tpl in filteredTemplates"
        :key="tpl.title"
        class="template-card"
        @click="$emit('run', tpl.sql)"
      >
        <div class="card-header">
          <span class="badge">{{ tpl.badge }}</span>
          <h4>{{ tpl.title }}</h4>
        </div>
        <p class="description">{{ tpl.description }}</p>
        <pre class="sql-preview"><code>{{ tpl.sql }}</code></pre>
        <button class="btn-primary btn-sm run-btn">▶ Ausführen</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSqlTemplates } from '../composables/useSqlTemplates'

defineEmits<{
  run: [sql: string]
}>()

const { categories, activeCategory, filteredTemplates } = useSqlTemplates()
</script>

<style scoped>
.templates {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}

.templates h2 {
  font-size: 18px;
  margin-bottom: 4px;
}

.subtitle {
  color: var(--text-muted);
  font-size: 13px;
  margin-bottom: 16px;
}

.category-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.tab {
  background: var(--bg);
  color: var(--text-muted);
  border: 1px solid var(--border);
  padding: 6px 14px;
  font-size: 13px;
  border-radius: 20px;
}

.tab.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.tab:hover:not(.active) {
  background: var(--surface-hover);
  color: var(--text);
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
}

.template-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  cursor: pointer;
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
