# 🗄️ Datenbank Playground

Interaktive SQL-Lernumgebung mit **Vue.js**, **Vite**, **TypeScript** und **SQLite**.

## Features

- **SQL-Vorlagen** in 6 Kategorien:
  - 🔍 **Abfragen** — SELECT, DISTINCT, ALIAS, LIMIT
  - 🎯 **Filtern & Sortieren** — WHERE, AND/OR, LIKE, IN, BETWEEN, ORDER BY
  - 📊 **Aggregation** — COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING
  - 🔗 **Joins** — INNER JOIN, LEFT JOIN, Subqueries, Projekte mit Kundennamen
  - ✏️ **Daten ändern** — INSERT, UPDATE, DELETE
  - 🏗️ **Struktur** — CREATE TABLE, FOREIGN KEY, ALTER TABLE, DROP TABLE, INDEX, VIEW
- **Freitext-Editor** für eigene SQL-Befehle (Ctrl+Enter zum Ausführen)
- **Tabellen- & View-Browser** mit Schema-, Fremdschlüssel- und Datenansicht
- **SQLite-Datenbank** mit Beispieldaten (Kunden, Produkte, Bestellungen)
- **Datenbank-Reset** zum vollständigen Zurücksetzen auf den Ausgangszustand

## Projektstruktur

```
├── server/
│   ├── index.ts            # Express-Backend (API-Endpunkte)
│   └── seed.ts             # Datenbank-Schema & Initialdaten
├── src/
│   ├── components/         # Vue-Komponenten
│   ├── composables/        # Vue Composables (Logik)
│   │   ├── useDatabase.ts      # API-Aufrufe, Query-Ausführung, Reset
│   │   ├── useTableDetail.ts   # Schema & Daten einer Tabelle laden
│   │   └── useSqlTemplates.ts  # Kategorien-Filter für Vorlagen
│   ├── data/
│   │   └── sqlTemplates.ts # SQL-Vorlagen & Kategorien
│   └── types.ts            # TypeScript-Interfaces
├── data/                   # SQLite-Datenbankdatei (generiert)
```

> **Hinweis:** Im `data/`-Verzeichnis entstehen neben `playground.db` auch die Dateien
> `playground.db-wal` (Write-Ahead Log) und `playground.db-shm` (Shared Memory).
> Diese gehören zum SQLite WAL-Modus, der gleichzeitiges Lesen und Schreiben ermöglicht.
> Alle drei Dateien werden automatisch verwaltet und sind in `.gitignore` ausgeschlossen.

## Start

```bash
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
