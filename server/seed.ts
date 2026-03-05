import type Database from 'better-sqlite3'

type KundeRow = [string, string, string, string, number]
type ProduktRow = [string, string, number, number]
type BestellungRow = [number, number, number, string]

const schema = `
  CREATE TABLE IF NOT EXISTS kunden (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vorname TEXT NOT NULL,
    nachname TEXT NOT NULL,
    email TEXT UNIQUE,
    stadt TEXT,
    alter_jahre INTEGER
  );

  CREATE TABLE IF NOT EXISTS produkte (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    kategorie TEXT,
    preis REAL NOT NULL,
    lagerbestand INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS bestellungen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kunden_id INTEGER NOT NULL,
    produkt_id INTEGER NOT NULL,
    menge INTEGER NOT NULL DEFAULT 1,
    bestell_datum TEXT DEFAULT (date('now')),
    FOREIGN KEY (kunden_id) REFERENCES kunden(id),
    FOREIGN KEY (produkt_id) REFERENCES produkte(id)
  );
`

const kunden: KundeRow[] = [
  ['Max', 'Mustermann', 'max@example.com', 'Berlin', 30],
  ['Anna', 'Schmidt', 'anna@example.com', 'München', 25],
  ['Peter', 'Weber', 'peter@example.com', 'Hamburg', 45],
  ['Lisa', 'Fischer', 'lisa@example.com', 'Berlin', 28],
  ['Tom', 'Bauer', 'tom@example.com', 'Köln', 35],
  ['Sarah', 'Wagner', 'sarah@example.com', 'München', 22],
  ['Jan', 'Koch', 'jan@example.com', 'Frankfurt', 40],
  ['Laura', 'Richter', 'laura@example.com', 'Hamburg', 33],
]

const produkte: ProduktRow[] = [
  ['Laptop', 'Elektronik', 999.99, 15],
  ['Maus', 'Elektronik', 29.99, 100],
  ['Tastatur', 'Elektronik', 79.99, 50],
  ['Schreibtisch', 'Möbel', 299.99, 10],
  ['Stuhl', 'Möbel', 199.99, 20],
  ['Monitor', 'Elektronik', 449.99, 25],
  ['Kopfhörer', 'Elektronik', 149.99, 40],
  ['Regal', 'Möbel', 89.99, 30],
  ['Notizbuch', 'Büro', 9.99, 200],
  ['Kugelschreiber', 'Büro', 2.99, 500],
]

const bestellungen: BestellungRow[] = [
  [1, 1, 1, '2025-01-15'],
  [1, 2, 2, '2025-01-15'],
  [2, 3, 1, '2025-02-10'],
  [2, 6, 1, '2025-02-10'],
  [3, 4, 1, '2025-03-01'],
  [4, 7, 2, '2025-03-05'],
  [5, 1, 1, '2025-03-10'],
  [5, 5, 1, '2025-03-10'],
  [6, 9, 5, '2025-04-01'],
  [6, 10, 10, '2025-04-01'],
  [7, 2, 3, '2025-04-15'],
  [8, 3, 1, '2025-05-01'],
  [1, 6, 1, '2025-05-10'],
  [3, 7, 1, '2025-05-15'],
]

export function seedDatabase(db: Database.Database): void {
  db.exec(schema)

  const kundenCount = db.prepare('SELECT COUNT(*) as count FROM kunden').get() as { count: number }
  if (kundenCount.count > 0) return

  const insertKunde = db.prepare(
    'INSERT INTO kunden (vorname, nachname, email, stadt, alter_jahre) VALUES (?, ?, ?, ?, ?)'
  )
  for (const k of kunden) insertKunde.run(...k)

  const insertProdukt = db.prepare(
    'INSERT INTO produkte (name, kategorie, preis, lagerbestand) VALUES (?, ?, ?, ?)'
  )
  for (const p of produkte) insertProdukt.run(...p)

  const insertBestellung = db.prepare(
    'INSERT INTO bestellungen (kunden_id, produkt_id, menge, bestell_datum) VALUES (?, ?, ?, ?)'
  )
  for (const b of bestellungen) insertBestellung.run(...b)

  console.log('Datenbank mit Beispieldaten befüllt.')
}
