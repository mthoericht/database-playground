import type { SqlCategory, SqlTemplate } from '../types'

export const categories: SqlCategory[] = [
  { key: 'abfragen', label: 'Abfragen', icon: '🔍' },
  { key: 'filter', label: 'Filtern & Sortieren', icon: '🎯' },
  { key: 'aggregate', label: 'Aggregation', icon: '📊' },
  { key: 'joins', label: 'Joins', icon: '🔗' },
  { key: 'mutation', label: 'Daten ändern', icon: '✏️' },
  { key: 'struktur', label: 'Struktur', icon: '🏗️' },
]

export const templates: SqlTemplate[] = [
  // Abfragen
  {
    category: 'abfragen',
    badge: 'SELECT',
    title: 'Alle Kunden anzeigen',
    description: 'Einfache SELECT-Abfrage: Alle Spalten und Zeilen einer Tabelle.',
    sql: 'SELECT * FROM kunden;'
  },
  {
    category: 'abfragen',
    badge: 'SELECT',
    title: 'Bestimmte Spalten auswählen',
    description: 'Nur bestimmte Spalten abfragen statt alle (*) zu laden.',
    sql: 'SELECT vorname, nachname, stadt\nFROM kunden;'
  },
  {
    category: 'abfragen',
    badge: 'DISTINCT',
    title: 'Eindeutige Werte',
    description: 'Doppelte Werte entfernen mit DISTINCT.',
    sql: 'SELECT DISTINCT stadt\nFROM kunden;'
  },
  {
    category: 'abfragen',
    badge: 'ALIAS',
    title: 'Spalten umbenennen',
    description: 'Spalten mit AS einen Alias geben für bessere Lesbarkeit.',
    sql: "SELECT vorname AS Vorname,\n       nachname AS Nachname,\n       alter_jahre AS \"Alter\"\nFROM kunden;"
  },
  {
    category: 'abfragen',
    badge: 'LIMIT',
    title: 'Ergebnisse begrenzen',
    description: 'Nur eine bestimmte Anzahl von Zeilen zurückgeben.',
    sql: 'SELECT * FROM produkte\nLIMIT 5;'
  },

  // Filter & Sortieren
  {
    category: 'filter',
    badge: 'WHERE',
    title: 'Kunden aus Berlin',
    description: 'Ergebnisse mit WHERE filtern - nur Kunden aus Berlin.',
    sql: "SELECT * FROM kunden\nWHERE stadt = 'Berlin';"
  },
  {
    category: 'filter',
    badge: 'WHERE',
    title: 'Produkte über 100€',
    description: 'Vergleichsoperatoren in WHERE-Klauseln verwenden.',
    sql: 'SELECT name, preis\nFROM produkte\nWHERE preis > 100;'
  },
  {
    category: 'filter',
    badge: 'AND/OR',
    title: 'Mehrere Bedingungen',
    description: 'WHERE mit AND und OR kombinieren.',
    sql: "SELECT * FROM kunden\nWHERE stadt = 'München'\n  AND alter_jahre < 30;"
  },
  {
    category: 'filter',
    badge: 'LIKE',
    title: 'Muster-Suche',
    description: 'Textmuster mit LIKE und Platzhaltern (%) suchen.',
    sql: "SELECT * FROM produkte\nWHERE name LIKE '%er%';"
  },
  {
    category: 'filter',
    badge: 'IN',
    title: 'Werte aus Liste',
    description: 'IN-Operator für mehrere mögliche Werte verwenden.',
    sql: "SELECT * FROM kunden\nWHERE stadt IN ('Berlin', 'Hamburg', 'München');"
  },
  {
    category: 'filter',
    badge: 'BETWEEN',
    title: 'Bereichsfilter',
    description: 'Werte in einem Bereich mit BETWEEN filtern.',
    sql: 'SELECT name, preis\nFROM produkte\nWHERE preis BETWEEN 50 AND 300;'
  },
  {
    category: 'filter',
    badge: 'ORDER BY',
    title: 'Nach Preis sortieren',
    description: 'Ergebnisse aufsteigend (ASC) oder absteigend (DESC) sortieren.',
    sql: 'SELECT name, preis\nFROM produkte\nORDER BY preis DESC;'
  },
  {
    category: 'filter',
    badge: 'ORDER BY',
    title: 'Mehrfach sortieren',
    description: 'Nach mehreren Spalten sortieren.',
    sql: 'SELECT * FROM kunden\nORDER BY stadt ASC, nachname ASC;'
  },

  // Aggregation
  {
    category: 'aggregate',
    badge: 'COUNT',
    title: 'Kunden zählen',
    description: 'Anzahl der Datensätze mit COUNT ermitteln.',
    sql: 'SELECT COUNT(*) AS anzahl_kunden\nFROM kunden;'
  },
  {
    category: 'aggregate',
    badge: 'SUM/AVG',
    title: 'Preis-Statistiken',
    description: 'Summe, Durchschnitt, Min und Max berechnen.',
    sql: 'SELECT\n  COUNT(*) AS anzahl,\n  ROUND(AVG(preis), 2) AS durchschnitt,\n  MIN(preis) AS minimum,\n  MAX(preis) AS maximum,\n  SUM(preis) AS summe\nFROM produkte;'
  },
  {
    category: 'aggregate',
    badge: 'GROUP BY',
    title: 'Produkte pro Kategorie',
    description: 'Daten gruppieren und pro Gruppe aggregieren.',
    sql: 'SELECT kategorie,\n       COUNT(*) AS anzahl,\n       ROUND(AVG(preis), 2) AS durchschnittspreis\nFROM produkte\nGROUP BY kategorie;'
  },
  {
    category: 'aggregate',
    badge: 'GROUP BY',
    title: 'Kunden pro Stadt',
    description: 'Kunden nach Stadt gruppieren und zählen.',
    sql: 'SELECT stadt,\n       COUNT(*) AS anzahl_kunden\nFROM kunden\nGROUP BY stadt\nORDER BY anzahl_kunden DESC;'
  },
  {
    category: 'aggregate',
    badge: 'HAVING',
    title: 'Gruppen filtern',
    description: 'HAVING filtert Gruppen nach Aggregation (im Gegensatz zu WHERE).',
    sql: 'SELECT kategorie,\n       COUNT(*) AS anzahl\nFROM produkte\nGROUP BY kategorie\nHAVING COUNT(*) > 2;'
  },

  // Joins
  {
    category: 'joins',
    badge: 'INNER JOIN',
    title: 'Bestellungen mit Kunden',
    description: 'Zwei Tabellen über einen Fremdschlüssel verknüpfen.',
    sql: 'SELECT k.vorname, k.nachname,\n       p.name AS produkt,\n       b.menge, b.bestell_datum\nFROM bestellungen b\nINNER JOIN kunden k ON b.kunden_id = k.id\nINNER JOIN produkte p ON b.produkt_id = p.id;'
  },
  {
    category: 'joins',
    badge: 'LEFT JOIN',
    title: 'Alle Kunden mit Bestellungen',
    description: 'LEFT JOIN zeigt auch Kunden OHNE Bestellungen.',
    sql: 'SELECT k.vorname, k.nachname,\n       COUNT(b.id) AS anzahl_bestellungen\nFROM kunden k\nLEFT JOIN bestellungen b ON k.id = b.kunden_id\nGROUP BY k.id, k.vorname, k.nachname;'
  },
  {
    category: 'joins',
    badge: 'JOIN',
    title: 'Umsatz pro Kunde',
    description: 'Komplexer Join mit Berechnung.',
    sql: 'SELECT k.vorname, k.nachname,\n       COUNT(b.id) AS bestellungen,\n       ROUND(SUM(p.preis * b.menge), 2) AS gesamtumsatz\nFROM kunden k\nINNER JOIN bestellungen b ON k.id = b.kunden_id\nINNER JOIN produkte p ON b.produkt_id = p.id\nGROUP BY k.id\nORDER BY gesamtumsatz DESC;'
  },
  {
    category: 'joins',
    badge: 'SUBQUERY',
    title: 'Unterabfrage',
    description: 'Eine Abfrage innerhalb einer anderen Abfrage.',
    sql: 'SELECT * FROM produkte\nWHERE preis > (\n  SELECT AVG(preis) FROM produkte\n);'
  },
  {
    category: 'joins',
    badge: 'JOIN',
    title: 'Projekte mit Kundennamen',
    description: 'Projekte-Tabelle mit Vor- und Nachname des zugehörigen Kunden anzeigen (Tabelle "projekte" muss zuerst erstellt werden).',
    sql: 'SELECT p.id, p.name AS projekt,\n       k.vorname, k.nachname,\n       p.budget\nFROM projekte p\nINNER JOIN kunden k ON p.kunde_id = k.id;'
  },

  // Daten ändern
  {
    category: 'mutation',
    badge: 'INSERT',
    title: 'Neuen Kunden einfügen',
    description: 'Einen neuen Datensatz mit INSERT INTO hinzufügen.',
    sql: "INSERT INTO kunden (vorname, nachname, email, stadt, alter_jahre)\nVALUES ('Julia', 'Meyer', 'julia@example.com', 'Dresden', 27);"
  },
  {
    category: 'mutation',
    badge: 'INSERT',
    title: 'Mehrere Produkte einfügen',
    description: 'Mehrere Datensätze gleichzeitig einfügen.',
    sql: "INSERT INTO produkte (name, kategorie, preis, lagerbestand)\nVALUES\n  ('Webcam', 'Elektronik', 59.99, 35),\n  ('USB-Stick', 'Elektronik', 12.99, 150);"
  },
  {
    category: 'mutation',
    badge: 'INSERT',
    title: 'Mehrere Projekte einfügen',
    description: 'Mehrere Projekte mit Kunden-Referenz einfügen (Tabelle "projekte" muss zuerst erstellt werden).',
    sql: "INSERT INTO projekte (name, kunde_id, budget)\nVALUES\n  ('Webseite Redesign', 1, 15000.00),\n  ('App Entwicklung', 2, 45000.00),\n  ('Datenbank Migration', 3, 8000.00);"
  },
  {
    category: 'mutation',
    badge: 'UPDATE',
    title: 'Preis aktualisieren',
    description: 'Bestehende Daten mit UPDATE ändern.',
    sql: "UPDATE produkte\nSET preis = preis * 0.9\nWHERE kategorie = 'Büro';"
  },
  {
    category: 'mutation',
    badge: 'UPDATE',
    title: 'Lagerbestand anpassen',
    description: 'Einen spezifischen Datensatz ändern.',
    sql: "UPDATE produkte\nSET lagerbestand = lagerbestand - 1\nWHERE name = 'Laptop';"
  },
  {
    category: 'mutation',
    badge: 'DELETE',
    title: 'Datensatz löschen',
    description: 'Zeilen mit DELETE entfernen (Vorsicht!).',
    sql: "DELETE FROM produkte\nWHERE name = 'Kugelschreiber';"
  },

  // Struktur
  {
    category: 'struktur',
    badge: 'CREATE TABLE',
    title: 'Neue Tabelle erstellen',
    description: 'Eine neue Tabelle mit verschiedenen Spaltentypen anlegen.',
    sql: "CREATE TABLE mitarbeiter (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  name TEXT NOT NULL,\n  abteilung TEXT,\n  gehalt REAL,\n  eingestellt_am TEXT DEFAULT (date('now'))\n);"
  },
  {
    category: 'struktur',
    badge: 'FOREIGN KEY',
    title: 'Tabelle mit Fremdschlüssel',
    description: 'FOREIGN KEY verknüpft Spalten mit einer anderen Tabelle und stellt referenzielle Integrität sicher.',
    sql: "CREATE TABLE projekte (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  name TEXT NOT NULL,\n  kunde_id INTEGER NOT NULL,\n  budget REAL,\n  FOREIGN KEY (kunde_id) REFERENCES kunden(id)\n    ON DELETE CASCADE\n    ON UPDATE CASCADE\n);"
  },
  {
    category: 'struktur',
    badge: 'ALTER TABLE',
    title: 'Spalte hinzufügen',
    description: 'Eine bestehende Tabelle um eine Spalte erweitern.',
    sql: 'ALTER TABLE kunden\nADD COLUMN telefon TEXT;'
  },
  {
    category: 'struktur',
    badge: 'DROP TABLE',
    title: 'Tabelle löschen',
    description: 'Eine Tabelle komplett entfernen (Vorsicht!).',
    sql: 'DROP TABLE IF EXISTS mitarbeiter;'
  },
  {
    category: 'struktur',
    badge: 'INDEX',
    title: 'Index erstellen',
    description: 'Einen Index für schnellere Abfragen anlegen.',
    sql: 'CREATE INDEX IF NOT EXISTS idx_kunden_stadt\nON kunden(stadt);'
  },
  {
    category: 'struktur',
    badge: 'VIEW',
    title: 'View erstellen',
    description: 'Eine gespeicherte Abfrage als View anlegen.',
    sql: "CREATE VIEW IF NOT EXISTS v_bestelluebersicht AS\nSELECT k.vorname || ' ' || k.nachname AS kunde,\n       p.name AS produkt,\n       b.menge,\n       p.preis * b.menge AS gesamt,\n       b.bestell_datum\nFROM bestellungen b\nJOIN kunden k ON b.kunden_id = k.id\nJOIN produkte p ON b.produkt_id = p.id;"
  },
]
