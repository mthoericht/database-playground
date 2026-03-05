<template>
  <div class="app">
    <header class="header">
      <div class="header-content">
        <h1>🗄️ Datenbank Playground</h1>
        <p>Interaktive SQL-Lernumgebung mit SQLite</p>
      </div>
      <button
        class="btn-danger"
        @click="resetDatabase"
      >
        🔄 Datenbank zurücksetzen
      </button>
    </header>

    <div class="layout">
      <aside class="sidebar">
        <TableBrowser
          :tables="tables"
          :active-table="activeTable"
          @select="selectTable"
          @refresh="loadTables"
        />
      </aside>

      <main class="main">
        <QueryTemplates @run="runQuery" />

        <QueryEditor @run="runQuery" />

        <QueryResult
          :result="result"
          :error="error"
          :loading="loading"
        />
      </main>
    </div>

    <TableDetail
      v-if="activeTable"
      :table="activeTable"
      @close="activeTable = null"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TableBrowser from './components/TableBrowser.vue';
import TableDetail from './components/TableDetail.vue';
import QueryTemplates from './components/QueryTemplates.vue';
import QueryEditor from './components/QueryEditor.vue';
import QueryResult from './components/QueryResult.vue';
import { useDatabase } from './composables/useDatabase';

const {
  tables, activeTable, result, error, loading,
  loadTables, selectTable, runQuery, resetDatabase,
} = useDatabase();

onMounted(loadTables);
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header h1 {
  font-size: 22px;
  font-weight: 700;
}

.header p {
  color: var(--text-muted);
  font-size: 13px;
}

.layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 260px;
  min-width: 260px;
  border-right: 1px solid var(--border);
  background: var(--surface);
  overflow-y: auto;
}

.main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
