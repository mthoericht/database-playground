import { storeToRefs } from 'pinia';
import { useDatabaseStore } from '../stores/databaseStore';

export function useDatabase() 
{
  const store = useDatabaseStore();
  const { tables, activeTable, result, error, loading } = storeToRefs(store);

  return {
    tables,
    activeTable,
    result,
    error,
    loading,
    loadTables: store.loadTables,
    selectTable: store.selectTable,
    runQuery: store.runQuery,
    resetDatabase: store.resetDatabase,
  };
}
