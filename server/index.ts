import express, { Request, Response } from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { seedDatabase } from './seed';

interface SqliteMasterRow {
  name: string
  type: string
}

interface ColumnInfo {
  cid: number
  name: string
  type: string
  notnull: number
  dflt_value: string | null
  pk: number
}

interface ForeignKeyInfo {
  id: number
  seq: number
  table: string
  from: string
  to: string
  on_update: string
  on_delete: string
  match: string
}

interface QueryRequestBody {
  sql?: string
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = new Database(join(__dirname, '..', 'data', 'playground.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

seedDatabase(db);

// Alle Tabellen und Views auflisten
app.get('/api/tables', (_req: Request, res: Response) => 
{
  try 
  {
    const tables = db.prepare(
      "SELECT name, type FROM sqlite_master WHERE type IN ('table', 'view') AND name NOT LIKE 'sqlite_%' ORDER BY type, name"
    ).all() as SqliteMasterRow[];
    res.json(tables.map(t => ({ name: t.name, type: t.type })));
  }
  catch (err) 
  {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Tabellenstruktur anzeigen
app.get('/api/tables/:name/schema', (req: Request, res: Response) => 
{
  try 
  {
    const columns = db.prepare(`PRAGMA table_info("${req.params.name}")`).all() as ColumnInfo[];
    const foreignKeys = db.prepare(`PRAGMA foreign_key_list("${req.params.name}")`).all() as ForeignKeyInfo[];
    res.json({ columns, foreignKeys });
  }
  catch (err) 
  {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Tabellendaten anzeigen
app.get('/api/tables/:name/data', (req: Request, res: Response) => 
{
  try 
  {
    const rows = db.prepare(`SELECT * FROM "${req.params.name}" LIMIT 100`).all();
    res.json(rows);
  }
  catch (err) 
  {
    res.status(500).json({ error: (err as Error).message });
  }
});

// SQL-Query ausführen
app.post('/api/query', (req: Request<unknown, unknown, QueryRequestBody>, res: Response) => 
{
  const { sql } = req.body;
  if (!sql || !sql.trim()) 
  {
    return res.status(400).json({ error: 'Kein SQL-Befehl angegeben.' });
  }

  try 
  {
    const trimmed = sql.trim().toUpperCase();
    if (trimmed.startsWith('SELECT') || trimmed.startsWith('PRAGMA') || trimmed.startsWith('WITH')) 
    {
      const rows = db.prepare(sql).all();
      res.json({ type: 'query', rows, rowCount: rows.length });
    }
    else 
    {
      const result = db.prepare(sql).run();
      res.json({
        type: 'statement',
        changes: result.changes,
        lastInsertRowid: result.lastInsertRowid?.toString()
      });
    }
  }
  catch (err) 
  {
    res.status(400).json({ error: (err as Error).message });
  }
});

// Datenbank zurücksetzen
app.post('/api/reset', (_req: Request, res: Response) => 
{
  try 
  {
    db.pragma('foreign_keys = OFF');

    const objects = db.prepare("SELECT type, name FROM sqlite_master WHERE name NOT LIKE 'sqlite_%' AND type IN ('table', 'view', 'index') ORDER BY type").all() as { type: string; name: string }[];
    for (const obj of objects) 
    {
      db.prepare(`DROP ${obj.type.toUpperCase()} IF EXISTS "${obj.name}"`).run();
    }
    db.pragma('foreign_keys = ON');
    seedDatabase(db);
    res.json({ message: 'Datenbank wurde zurückgesetzt.' });
  }
  catch (err) 
  {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.listen(PORT, () => 
{
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
