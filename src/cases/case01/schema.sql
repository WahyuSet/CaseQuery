-- =======================================================
-- CASE #001: THE MIDNIGHT PENTHOUSE BREACH
-- Database Schema DDL (SQLite)
-- =======================================================

CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    access_level INTEGER NOT NULL,
    assigned_keycard TEXT NOT NULL UNIQUE,
    salary INTEGER,
    mugshot_url TEXT,
    notes TEXT
);

CREATE TABLE keycard_scans (
    id INTEGER PRIMARY KEY,
    timestamp TEXT NOT NULL,
    keycard_id TEXT NOT NULL,
    location_door TEXT NOT NULL,
    scan_result TEXT NOT NULL -- 'GRANTED' or 'DENIED'
);

CREATE TABLE cctv_logs (
    id INTEGER PRIMARY KEY,
    timestamp TEXT NOT NULL,
    camera_id TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    snapshot_url TEXT
);

CREATE TABLE phone_records (
    id INTEGER PRIMARY KEY,
    timestamp TEXT NOT NULL,
    sender_name TEXT NOT NULL,
    receiver_name TEXT NOT NULL,
    duration_seconds INTEGER,
    message_snippet TEXT
);

CREATE TABLE evidence_registry (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    found_location TEXT NOT NULL,
    photo_url TEXT
);
