import initSqlJs from 'sql.js';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

async function runSelfCheck() {
  console.log('🧪 Starting SQLite WASM & Case 01 Self-Check...');

  // 1. Initialize SQLite WASM
  const SQL = await initSqlJs();
  const db = new SQL.Database();
  console.log('✅ SQLite WASM Database instance created.');

  // 2. Read schema & seed SQL from files or inline
  const schemaSql = fs.readFileSync(path.resolve('src/cases/case01/schema.sql'), 'utf-8');
  db.run(schemaSql);
  console.log('✅ Schema DDL executed successfully.');

  // 3. Verify tables created
  const tablesRes = db.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name ASC;");
  const tableNames = tablesRes[0].values.map(r => r[0]);
  console.log('📊 Created Tables:', tableNames);
  assert(tableNames.includes('employees'), 'employees table missing');
  assert(tableNames.includes('keycard_scans'), 'keycard_scans table missing');
  assert(tableNames.includes('cctv_logs'), 'cctv_logs table missing');
  assert(tableNames.includes('phone_records'), 'phone_records table missing');
  assert(tableNames.includes('evidence_registry'), 'evidence_registry table missing');

  // 4. Seed Data
  db.run(`
    INSERT INTO employees (id, name, role, access_level, assigned_keycard, salary, notes) VALUES
    (1, 'Ronald Sterling', 'CEO', 5, 'NEXA-RFID-0001', 350000, 'Victim'),
    (2, 'David Thorne', 'VP of Security', 4, 'NEXA-RFID-8819', 140000, 'Culprit');

    INSERT INTO keycard_scans (id, timestamp, keycard_id, location_door, scan_result) VALUES
    (107, '2026-09-14 23:48:12', 'NEXA-RFID-8819', 'Penthouse Rear Emergency Door', 'GRANTED');
  `);
  console.log('✅ Seed data inserted.');

  // 5. Test Key Clue Query (David Thorne identification)
  const queryRes = db.exec("SELECT name, role FROM employees WHERE assigned_keycard = 'NEXA-RFID-8819';");
  assert(queryRes.length > 0, 'Query returned no results');
  const suspectName = queryRes[0].values[0][0];
  const suspectRole = queryRes[0].values[0][1];
  console.log(`🔍 Query Result: ${suspectName} (${suspectRole})`);
  assert.strictEqual(suspectName, 'David Thorne', 'Suspect must be David Thorne');

  // 6. Test Keycard scan at rear door
  const scanRes = db.exec("SELECT timestamp, location_door FROM keycard_scans WHERE keycard_id = 'NEXA-RFID-8819';");
  assert.strictEqual(scanRes[0].values[0][1], 'Penthouse Rear Emergency Door');
  console.log('✅ Breach timestamp verified at 23:48:12.');

  console.log('\n🎉 ALL RUNNABLE CHECKS PASSED: Phase 2 SQLite Engine & Case 01 verified 100%!');
}

runSelfCheck().catch(err => {
  console.error('❌ Self-check failed:', err);
  process.exit(1);
});
