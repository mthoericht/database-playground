import { defineStore } from 'pinia';
import type { QueryResult, TableEntry } from '../types';
import { DatabaseApi } from '../api/DatabaseApi';

interface DatabaseState {
  tables: TableEntry[]
  activeTable: string | null
  result: QueryResult | null
  error: string | null
  loading: boolean
}

export const useDatabaseStore = defineStore('database', {
  state: (): DatabaseState => ({
    tables: [],
    activeTable: null,
    result: null,
    error: null,
    loading: false,
  }),
  actions: {
    async loadTables() 
    {
      try 
      {
        this.tables = await DatabaseApi.getTables();
      }
      catch (e) 
      {
        console.error('Fehler beim Laden der Tabellen:', e);
      }
    },

    selectTable(name: string) 
    {
      this.activeTable = name;
    },

    async runQuery(sql: string) 
    {
      this.loading = true;
      this.error = null;
      this.result = null;

      try 
      {
        const data = await DatabaseApi.runQuery(sql);
        this.result = data;
        this.loadTables();
      }
      catch (e) 
      {
        this.error = (e as Error).message;
      }
      finally 
      {
        this.loading = false;
      }
    },

    async resetDatabase() 
    {
      if (!confirm('Datenbank wirklich zurücksetzen? Alle Änderungen gehen verloren.')) return;
      try 
      {
        await DatabaseApi.resetDatabase();
        await this.loadTables();
        this.activeTable = null;
        this.result = null;
        this.error = null;
      }
      catch (e) 
      {
        this.error = (e as Error).message;
      }
    },
  },
});

