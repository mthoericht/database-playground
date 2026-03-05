<template>
  <div class="editor">
    <div class="editor-header">
      <h2>✍️ Eigener SQL-Befehl</h2>
      <div class="editor-actions">
        <button
          class="btn-secondary btn-sm"
          @click="clear"
        >
          Leeren
        </button>
        <button
          class="btn-primary"
          :disabled="!sql.trim()"
          @click="run"
        >
          ▶ Ausführen
        </button>
      </div>
    </div>
    <textarea
      v-model="sql"
      class="sql-input"
      placeholder="SQL-Befehl eingeben... z.B. SELECT * FROM kunden;"
      rows="5"
      spellcheck="false"
      @keydown.ctrl.enter="run"
      @keydown.meta.enter="run"
    />
    <p class="hint">
      Tipp: <kbd>Ctrl</kbd> + <kbd>Enter</kbd> zum Ausführen
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  run: [sql: string]
}>();
const sql = ref<string>('');

function run(): void 
{
  if (sql.value.trim()) 
  {
    emit('run', sql.value.trim());
  }
}

function clear(): void 
{
  sql.value = '';
}
</script>

<style scoped>
.editor {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.editor-header h2 {
  font-size: 18px;
}

.editor-actions {
  display: flex;
  gap: 8px;
}

.sql-input {
  width: 100%;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--success);
  font-family: 'Fira Code', 'Cascadia Code', monospace;
  font-size: 14px;
  padding: 14px;
  resize: vertical;
  outline: none;
  transition: border-color 0.15s;
}

.sql-input:focus {
  border-color: var(--primary);
}

.sql-input::placeholder {
  color: var(--text-muted);
}

.hint {
  color: var(--text-muted);
  font-size: 12px;
  margin-top: 8px;
}

kbd {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1px 6px;
  font-size: 11px;
  font-family: inherit;
}
</style>
