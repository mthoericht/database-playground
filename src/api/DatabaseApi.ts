import type { QueryResult, TableEntry, TableSchema } from '../types';

export class DatabaseApi 
{
  private static async handleJson<T>(res: Response): Promise<T> 
  {
    const data = await res.json();
    if (!res.ok) 
    {
      const message = (data as { error?: string }).error ?? 'Unbekannter API-Fehler';
      throw new Error(message);
    }
    return data as T;
  }

  static async getTables(): Promise<TableEntry[]> 
  {
    const res = await fetch('/api/tables');
    return this.handleJson<TableEntry[]>(res);
  }

  static async runQuery(sql: string): Promise<QueryResult> 
  {
    const res = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sql }),
    });
    return this.handleJson<QueryResult>(res);
  }

  static async resetDatabase(): Promise<void> 
  {
    const res = await fetch('/api/reset', { method: 'POST' });
    await this.handleJson<unknown>(res);
  }

  static async getTableSchema(name: string): Promise<TableSchema> 
  {
    const res = await fetch(`/api/tables/${encodeURIComponent(name)}/schema`);
    return this.handleJson<TableSchema>(res);
  }

  static async getTableData(name: string): Promise<Record<string, unknown>[]> 
  {
    const res = await fetch(`/api/tables/${encodeURIComponent(name)}/data`);
    return this.handleJson<Record<string, unknown>[]>(res);
  }
}

