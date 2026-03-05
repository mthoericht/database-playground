<template>
  <div class="templates">
    <h2>📚 SQL-Vorlagen</h2>
    <p class="subtitle">
      Klicke auf eine Vorlage, um sie auszuführen und das Ergebnis zu sehen.
    </p>

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
      <TemplateCard
        v-for="tpl in filteredTemplates"
        :key="tpl.title"
        :template="tpl"
        @run="$emit('run', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TemplateCard from './TemplateCard.vue';
import { useSqlTemplates } from '../composables/useSqlTemplates';

defineEmits<{
  run: [sql: string]
}>();

const { categories, activeCategory, filteredTemplates } = useSqlTemplates();
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
</style>
