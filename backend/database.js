const Database = require("better-sqlite3");
const db = new Database("learnsphere.db");

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 institution TEXT NOT NULL,
 email TEXT NOT NULL UNIQUE,
 password_hash TEXT NOT NULL,
 role TEXT NOT NULL DEFAULT 'student'
   CHECK (role IN ('student','instructor','admin')),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL,
 description TEXT NOT NULL,
 instructor TEXT NOT NULL,
 progress INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS assessments (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL,
 course TEXT NOT NULL,
 due_date TEXT NOT NULL,
 type TEXT NOT NULL CHECK (type IN ('assignment','test'))
);
`);

if (db.prepare("SELECT COUNT(*) AS n FROM courses").get().n === 0) {
  const add = db.prepare(
    "INSERT INTO courses (title,description,instructor,progress) VALUES (?,?,?,?)"
  );
  const seed = [
    ["Data Structures & Algorithms","Core data structures and algorithms","LearnSphere Faculty",67],
    ["Database Management Systems","SQL, normalization and database design","LearnSphere Faculty",57],
    ["Computer Networks","Networking and secure communication","LearnSphere Faculty",31],
    ["Operating Systems","Processes, memory and scheduling","LearnSphere Faculty",83]
  ];
  db.transaction(() => seed.forEach(x => add.run(...x)))();
}

if (db.prepare("SELECT COUNT(*) AS n FROM assessments").get().n === 0) {
  const add = db.prepare(
    "INSERT INTO assessments (title,course,due_date,type) VALUES (?,?,?,?)"
  );
  const seed = [
    ["Binary Trees Assignment","Data Structures & Algorithms","2026-10-07","assignment"],
    ["SQL Assessment","Database Management Systems","2026-10-09","test"],
    ["Network Security Quiz","Computer Networks","2026-10-11","test"]
  ];
  db.transaction(() => seed.forEach(x => add.run(...x)))();
}

module.exports = db;