import type { CaseManifest } from '../types'

export const case01SchemaSql = `
CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    access_level INTEGER NOT NULL,
    assigned_keycard TEXT NOT NULL UNIQUE,
    salary INTEGER,
    mugshot_url TEXT,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS keycard_scans (
    id INTEGER PRIMARY KEY,
    timestamp TEXT NOT NULL,
    keycard_id TEXT NOT NULL,
    location_door TEXT NOT NULL,
    scan_result TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cctv_logs (
    id INTEGER PRIMARY KEY,
    timestamp TEXT NOT NULL,
    camera_id TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    snapshot_url TEXT
);

CREATE TABLE IF NOT EXISTS phone_records (
    id INTEGER PRIMARY KEY,
    timestamp TEXT NOT NULL,
    sender_name TEXT NOT NULL,
    receiver_name TEXT NOT NULL,
    duration_seconds INTEGER,
    message_snippet TEXT
);

CREATE TABLE IF NOT EXISTS evidence_registry (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    found_location TEXT NOT NULL,
    photo_url TEXT
);
`

export const case01SeedSql = `
-- 1. EMPLOYEES & SUSPECTS
INSERT INTO employees (id, name, role, access_level, assigned_keycard, salary, mugshot_url, notes) VALUES
(1, 'Ronald Sterling', 'Chief Executive Officer', 5, 'NEXA-RFID-0001', 350000, '/assets/suspects/ronald.svg', 'Korban. Ditemukan tewas di meja kerja dengan cangkir kopi beracun.'),
(2, 'David Thorne', 'VP of Corporate Security', 4, 'NEXA-RFID-8819', 140000, '/assets/suspects/david.svg', 'Memiliki akses fisik ke seluruh pintu darurat dan kunci cadangan vault.'),
(3, 'Maya Lin', 'Chief Financial Officer', 4, 'NEXA-RFID-1044', 185000, '/assets/suspects/maya.svg', 'Sempat bersitegang perihal pembekuan dana audit 2 hari sebelum insiden.'),
(4, 'Marcus Vance', 'Lead AI Engineer', 3, 'NEXA-RFID-5520', 130000, '/assets/suspects/marcus.svg', 'Mengerjakan protokol private key AI. Memiliki jadwal dinas di Bandung.'),
(5, 'Arthur Bell', 'Head Facilities Custodian', 2, 'NEXA-RFID-0912', 45000, '/assets/suspects/arthur.svg', 'Petugas kebersihan lantai 40-42. Mengaku shift berakhir jam 21:00.');

-- 2. KEYCARD ACCESS LOGS (Malam Kejadian 14 Sept 2026)
INSERT INTO keycard_scans (id, timestamp, keycard_id, location_door, scan_result) VALUES
(101, '2026-09-14 20:15:22', 'NEXA-RFID-0912', 'Floor 40 Janitor Closet', 'GRANTED'),
(102, '2026-09-14 20:34:10', 'NEXA-RFID-1044', 'Main Lobby Turnstile Out', 'GRANTED'),
(103, '2026-09-14 21:05:44', 'NEXA-RFID-0001', 'Penthouse Private Elevator', 'GRANTED'),
(104, '2026-09-14 21:20:00', 'NEXA-RFID-0912', 'Main Lobby Turnstile Out', 'GRANTED'),
(105, '2026-09-14 22:10:15', 'NEXA-RFID-8819', 'Security Control Room', 'GRANTED'),
(106, '2026-09-14 23:12:00', 'NEXA-RFID-0001', 'Penthouse Main Suite', 'GRANTED'),
(107, '2026-09-14 23:48:12', 'NEXA-RFID-8819', 'Penthouse Rear Emergency Door', 'GRANTED'),
(108, '2026-09-14 23:53:04', 'NEXA-RFID-8819', 'Penthouse Vault Secure Chamber', 'GRANTED'),
(109, '2026-09-14 23:58:30', 'NEXA-RFID-8819', 'Sub-Level 2 Parking Ramp Exit', 'GRANTED'),
(110, '2026-09-15 00:15:20', 'NEXA-RFID-5520', 'NexaCore Bandung Research Lab', 'GRANTED');

-- 3. CCTV LOGS
INSERT INTO cctv_logs (id, timestamp, camera_id, location, description, snapshot_url) VALUES
(201, '2026-09-14 20:35:00', 'CAM-LOBBY-01', 'Front Entrance', 'Maya Lin (CFO) terlihat meninggalkan gedung menuju taksi Bluebird.', '/assets/evidence/cctv_suspect_flee.svg'),
(202, '2026-09-14 21:08:12', 'CAM-ELEV-03', 'Penthouse Elevator', 'Ronald Sterling membawa cangkir kopi Aura Coffee masuk ke lift.', '/assets/evidence/coffee_cup.jpg'),
(203, '2026-09-14 23:42:00', 'CAM-STAIRS-04', 'Emergency Stairwell Floor 41', 'Pria mengenakan jaket seragam pengawas sekuriti naik menuju lantai 42.', '/assets/evidence/cctv_suspect_flee.svg'),
(204, '2026-09-14 23:55:18', 'CAM-STAIRS-04', 'Emergency Stairwell Floor 41', 'Sosok pria yang sama turun terburu-buru membawa tas ransel hitam padat.', '/assets/evidence/cctv_suspect_flee.svg'),
(205, '2026-09-14 23:59:02', 'CAM-GARAGE-B2', 'Sub-Level 2 Exit', 'Sedan hitam metalik melaju keluar dengan kecepatan tinggi tanpa menyalakan lampu utama.', '/assets/evidence/cctv_suspect_flee.svg');

-- 4. PHONE RECORDS & ENCRYPTED CHAT SNIPPETS
INSERT INTO phone_records (id, timestamp, sender_name, receiver_name, duration_seconds, message_snippet) VALUES
(301, '2026-09-14 18:30:10', 'Maya Lin', 'Ronald Sterling', 240, 'Ronald, auditor menuntut laporan escrow besok pagi. Tolong jangan abaikan.'),
(302, '2026-09-14 19:15:00', 'Marcus Vance', 'Ronald Sterling', 60, 'Pak, saya sudah tiba di lab Bandung untuk sinkronisasi cluster AI.'),
(303, '2026-09-14 22:15:40', 'David Thorne', '+62-811-SHADOW-BROKER', 0, '[SIGNAL CHAT]: Pembeli sudah setor 500,000 USDT di escrow wallet. Ambil flash drive vault sebelum tengah malam.'),
(304, '2026-09-14 22:16:05', '+62-811-SHADOW-BROKER', 'David Thorne', 0, '[SIGNAL CHAT]: Pastikan CEO tidak bisa menekan tombol alarm panic lock.'),
(305, '2026-09-14 23:57:22', 'David Thorne', '+62-811-SHADOW-BROKER', 0, '[SIGNAL CHAT]: Master key sudah di tangan. Dia tidak akan bangun lagi. Siapkan transfer sekarang.');

-- 5. EVIDENCE REGISTRY
INSERT INTO evidence_registry (id, name, category, description, found_location, photo_url) VALUES
('EV-01', 'Cangkir Espresso Beracun', 'Physical', 'Cangkir keramik Aura Coffee dengan noda kopi. Uji lab forensik positif mengandung potassium cyanide.', 'Meja Kerja CEO (Marker A)', '/assets/evidence/coffee_cup.jpg'),
('EV-02', 'Kartu Akses Pegawai Retak', 'Physical', 'Kartu RFID berlabel NEXA-RFID-8819 terjatuh di karpet dekat pintu darurat.', 'Pintu Darurat Penthouse (Marker B)', '/assets/evidence/broken_keycard.jpg'),
('EV-03', 'Server Vault USB Extraction Log', 'Digital', 'Monitor server private vault mencatat transfer data ilegal master key pada 23:52:10.', 'Server Vault Kamar CEO (Marker C)', '/assets/evidence/server_monitor.svg'),
('EV-04', 'Snapshot CCTV Tangga Darurat', 'Forensic', 'Rekaman kamera CAM-STAIRS-04 menunjukkan jaket sekuriti dengan nomor badge 8819.', 'Server Kamera Pengawas', '/assets/evidence/cctv_suspect_flee.svg');
`

export const case01Manifest: CaseManifest = {
  id: 'case_001',
  caseNumber: 'CASE #001',
  title: 'The Midnight Penthouse Breach',
  location: 'NexaCore Tower - Penthouse Floor 42, Jakarta',
  difficulty: 'Rookie',
  status: 'OPEN',
  incidentDate: '14 September 2026, 23:45 WIB',
  briefingSummary: `
Ronald Sterling, CEO startup keamanan siber NexaCore Technologies, ditemukan tewas di kursi kerjanya di Penthouse Lantai 42. 
Pintu vault pribadi di samping meja dalam kondisi terbuka dan master encryption key perusahaan raib.
Tim patroli pertama mengamankan TKP dan menemukan 3 titik kejanggalan fisik: cangkir kopi beracun di meja korban, kartu akses retak di dekat pintu darurat belakang, serta layar server vault yang memunculkan peringatan pencurian USB.
Gunakan terminal forensik kepolisian untuk menginvestigasi database internal gedung dan bongkar siapa pelaku sebenarnya!
  `.trim(),
  crimeScenePhotoUrl: '/assets/scenes/penthouse_scene.jpg',
  hotspots: [
    {
      id: 'hotspot_a',
      label: 'A',
      title: 'Meja Kerja Korban (Cangkir Espresso)',
      position: { xPercent: 47, yPercent: 64 },
      evidenceId: 'EV-01'
    },
    {
      id: 'hotspot_b',
      label: 'B',
      title: 'Pintu Masuk & Koridor (Kartu Akses Retak)',
      position: { xPercent: 82, yPercent: 68 },
      evidenceId: 'EV-02'
    },
    {
      id: 'hotspot_c',
      label: 'C',
      title: 'Server DataVault (Log Pencurian USB)',
      position: { xPercent: 89, yPercent: 38 },
      evidenceId: 'EV-03'
    }
  ],
  evidenceList: [
    {
      id: 'EV-01',
      name: 'Cangkir Espresso Beracun',
      category: 'Physical',
      foundLocation: 'Meja Kerja CEO Ronald Sterling (Marker A)',
      photoUrl: '/assets/evidence/coffee_cup.jpg',
      description: 'Cangkir kopi hitam dengan residu bubuk putih di pinggirannya. Stiker pesanan: Aura Coffee Cup #088 diambil pukul 21:05 oleh R. Sterling.',
      forensicNotes: 'Uji toksikologi mengonfirmasi sianida konsentrasi tinggi. Korban meninggal lemas dalam hitungan menit setelah meminumnya.',
      suggestedSqlPrompt: "SELECT * FROM employees WHERE name LIKE '%Sterling%' OR role LIKE '%CEO%';",
      unlockedByDefault: true
    },
    {
      id: 'EV-02',
      name: 'Kartu Akses Pegawai Retak',
      category: 'Physical',
      foundLocation: 'Lantai dekat Pintu Darurat Belakang (Marker B)',
      photoUrl: '/assets/evidence/broken_keycard.jpg',
      description: 'Kartu RFID fisik patah di sudutnya, kemungkinan terjatuh saat pelaku melarikan diri tergesa-gesa. Terukir label seri: NEXA-RFID-8819.',
      forensicNotes: 'Periksa database tabel employees untuk mencari siapa pemilik kartu berlabel NEXA-RFID-8819 ini!',
      suggestedSqlPrompt: "SELECT * FROM employees WHERE assigned_keycard = 'NEXA-RFID-8819';",
      unlockedByDefault: true
    },
    {
      id: 'EV-03',
      name: 'Server Vault USB Extraction Log',
      category: 'Digital',
      foundLocation: 'Monitor Private Server Vault (Marker C)',
      photoUrl: '/assets/evidence/server_monitor.svg',
      description: 'Layar server vault menunjukkan transfer file: Master_Encryption_Key.bin disalin ke USB drive eksternal pada 23:52:10.',
      forensicNotes: 'Akses vault memerlukan otorisasi level 4+. Cek tabel keycard_scans pada jam 23:40 - 00:00.',
      suggestedSqlPrompt: "SELECT * FROM keycard_scans WHERE timestamp BETWEEN '2026-09-14 23:40:00' AND '2026-09-15 00:00:00';",
      unlockedByDefault: true
    },
    {
      id: 'EV-04',
      name: 'Rekaman CCTV Tangga Darurat 23:55',
      category: 'Forensic',
      foundLocation: 'Kamera CCTV CAM-STAIRS-04',
      photoUrl: '/assets/evidence/cctv_suspect_flee.svg',
      description: 'Rekaman visual menunjukkan seorang pria memakai jaket security keluar dari pintu tangga darurat dengan ransel berat pada pukul 23:55:18.',
      forensicNotes: 'Cocok dengan waktu scan pintu keluar parkir basement pukul 23:58.',
      suggestedSqlPrompt: "SELECT * FROM cctv_logs WHERE location LIKE '%Stair%' OR location LIKE '%Emergency%';",
      unlockedByDefault: false
    }
  ],
  suspects: [
    {
      id: 2,
      name: 'David Thorne',
      role: 'VP of Corporate Security',
      mugshotUrl: '/assets/suspects/david.svg',
      assignedKeycard: 'NEXA-RFID-8819',
      alibiStatement: 'Mengklaim sedang berpatroli rutin di pos sekuriti lantai dasar sepanjang malam.',
      isCulprit: true
    },
    {
      id: 3,
      name: 'Maya Lin',
      role: 'Chief Financial Officer',
      mugshotUrl: '/assets/suspects/maya.svg',
      assignedKeycard: 'NEXA-RFID-1044',
      alibiStatement: 'Meninggalkan kantor jam 20:30 untuk makan malam dengan rekanan bisnis di Sudirman.',
      isCulprit: false
    },
    {
      id: 4,
      name: 'Marcus Vance',
      role: 'Lead AI Engineer',
      mugshotUrl: '/assets/suspects/marcus.svg',
      assignedKeycard: 'NEXA-RFID-5520',
      alibiStatement: 'Berada di fasilitas riset Bandung sejak siang hari untuk sinkronisasi server.',
      isCulprit: false
    },
    {
      id: 5,
      name: 'Arthur Bell',
      role: 'Head Facilities Custodian',
      mugshotUrl: '/assets/suspects/arthur.svg',
      assignedKeycard: 'NEXA-RFID-0912',
      alibiStatement: 'Shift kebersihan selesai jam 21:00 dan langsung pulang ke rumah naik KRL.',
      isCulprit: false
    }
  ],
  milestones: [
    {
      id: 'ms_identify_rfid',
      title: 'Identifikasi Pemilik Kartu NEXA-RFID-8819',
      description: 'Cari tahu siapa pemilik kartu akses retak yang terjatuh di TKP (Marker B).',
      isCompleted: false,
      unlockedEvidenceId: 'EV-02',
      evaluator: (res) => {
        // Did the query result contain David Thorne or the keycard NEXA-RFID-8819?
        if (res.error || res.values.length === 0) return false
        return res.values.some((row) =>
          row.some((val) => {
            const str = String(val).toLowerCase()
            return str.includes('david thorne') || str.includes('nexa-rfid-8819')
          })
        )
      }
    },
    {
      id: 'ms_trace_access',
      title: 'Lacak Jejak Pintu Darurat Penthouse Jam 23:48',
      description: 'Buktikan bahwa kartu tersangka digunakan untuk membuka pintu darurat di jam pembunuhan.',
      isCompleted: false,
      evaluator: (res) => {
        if (res.error || res.values.length === 0) return false
        return res.values.some((row) =>
          row.some((val) => {
            const str = String(val).toLowerCase()
            return str.includes('penthouse rear emergency door') || str.includes('23:48')
          })
        )
      }
    },
    {
      id: 'ms_cctv_lead',
      title: 'Konfirmasi Sosok Mencurigakan di CCTV',
      description: 'Periksa rekaman CCTV tangga darurat atau basement antara pukul 23:40 - 00:00.',
      isCompleted: false,
      unlockedEvidenceId: 'EV-04',
      evaluator: (res) => {
        if (res.error || res.values.length === 0) return false
        return res.values.some((row) =>
          row.some((val) => {
            const str = String(val).toLowerCase()
            return str.includes('cam-stairs-04') || str.includes('tas ransel hitam') || str.includes('sub-level 2')
          })
        )
      }
    },
    {
      id: 'ms_motive_crypto',
      title: 'Ungkap Komunikasi Kripto Rahasia (Motif)',
      description: 'Telusuri tabel pesan rahasia untuk membuktikan motif suap 500,000 USDT.',
      isCompleted: false,
      evaluator: (res) => {
        if (res.error || res.values.length === 0) return false
        return res.values.some((row) =>
          row.some((val) => {
            const str = String(val).toLowerCase()
            return str.includes('500,000 usdt') || str.includes('shadow-broker') || str.includes('master key sudah di tangan')
          })
        )
      }
    }
  ],
  schemaSql: case01SchemaSql,
  seedSql: case01SeedSql,
  solution: {
    culpritId: 2, // David Thorne
    requiredEvidenceIds: ['EV-02', 'EV-03'],
    reconstructionStory: `
David Thorne (VP of Security) telah berkhianat dan menjual master encryption key NexaCore kepada sindikat luar seharga 500,000 USDT.
Mengetahui Ronald Sterling sedang lembur sendirian di penthouse, David naik melalui tangga darurat pada pukul 23:42 mengenakan seragam dinasnya. 
Ia memasukkan potassium cyanide ke cangkir espresso Ronald, lalu menggunakan kartu aksesnya (NEXA-RFID-8819) untuk membuka pintu darurat dan menyalin file vault ke USB drive pada 23:52. 
Saat bergegas melarikan diri, kartu RFID-nya tersangkut dan retak di lantai. Ia kabur lewat basement B2 pukul 23:59 menggunakan sedan hitamnya.
    `.trim()
  }
}
