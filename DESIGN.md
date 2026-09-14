# Design Specification Document (DESIGN.md)
# Project: SQL Case Detective (Educational Puzzle & Investigation Edition)

**Version:** 2.0.0  
**Status:** Implemented & Verified  
**Theme:** Light Neutral & Modern Educational Puzzle (Anti-Slop Modern UI)  
**Standard:** /design-taste-frontend (`VARIANCE: 6`, `MOTION: 4`, `DENSITY: 5`)  

---

## 1. Design Philosophy & Art Direction

### 1.1 Anti-Slop & Educational Puzzle Aesthetic
Game ini mengadopsi gaya visual **Modern Neutral & Tactile Puzzle**: memadukan kebersihan antarmuka aplikasi modern (*Notion / Linear style*) dengan estetika investigasi detektif yang ramah, hangat, dan fokus pada pemecahan masalah logis.

* **Mood:** Fokus, cerdas, bersahabat, terang (*clean light surface*), dan memicu rasa ingin tahu tanpa intimidasi dashboard polisi yang gelap.
* **Prinsip Anti-Slop (/design-taste-frontend):**
  - **Zero Em-Dashes (`—`):** Karakter em-dash dilarang di seluruh teks UI, digantikan tanda hubung reguler `-` atau pemisah hierarki visual.
  - **Tanpa Badge Melayang:** Thumbnail foto kasus tampil bersih; semua badge status, tingkat kesulitan, dan lokasi diletakkan rapi di bawah gambar.
  - **Menghilangkan Simetri Kaku:** Landing page tidak menggunakan layout klise "3 kartu fitur identik", melainkan *Asymmetric Split Hero* dengan kartu ringkasan alur di sisi kanan.
  - **Label Aksi Aktif:** Menghilangkan penomoran generik `Langkah 1/2/3` menjadi kata kerja instruktif langsung (*"Pilih Tersangka Utama"*, *"Lampirkan Bukti Penentu"*, *"Catatan Reka Ulang Kronologi"*).
  - **Tanpa Pure Black (`#000000`):** Bingkai foto TKP menggunakan deep slate halus `#0f172a` dengan kontras natural.
  - **Co-located Modular CSS:** Menghapus seluruh inline styles (`style={{...}}`) menjadi 12 file CSS komponen terpisah.

---

## 2. Design Tokens & Visual Hierarchy

### 2.1 Color Palette (`src/index.css`)

```css
:root {
  /* Surface & Backgrounds */
  --bg-primary: #ffffff;             /* Latar kartu utama, dialog, dan baris data */
  --bg-secondary: #f8fafc;           /* Latar halaman aplikasi & container sekunder */
  --bg-tertiary: #f1f5f9;            /* Hover row, table headers, pill background */
  --bg-surface-elevated: #ffffff;    /* Header sticky, toolbar */
  --bg-dark-container: #0f172a;      /* Bingkai foto TKP & canvas barang bukti */

  /* Borders & Dividers */
  --border-subtle: #e2e8f0;          /* Garis pemisah tabel, kartu netral */
  --border-strong: #cbd5e1;          /* Border hover kartu, scrollbar thumb */
  --border-focus: #4f46e5;           /* Input focus border */

  /* Brand Accent (Indigo) */
  --accent: #4f46e5;                 /* Tombol utama, link aktif, ikon sorotan */
  --accent-light: #eef2ff;           /* Background badge aktif, highlight baris */
  --accent-hover: #4338ca;           /* State hover tombol utama */
  --accent-muted: #818cf8;

  /* Status Colors */
  --success: #16a34a;                /* Milestone selesai, vonis sukses */
  --success-light: #f0fdf4;
  --success-border: #bbf7d0;

  --warning: #d97706;                /* Pin bukti TKP [A][B][C], peringatan */
  --warning-light: #fffbeb;
  --warning-border: #fde68a;

  --error: #dc2626;                  /* Error SQL, vonis gagal */
  --error-light: #fef2f2;
  --error-border: #fecaca;

  /* Typography */
  --text-primary: #0f172a;           /* Headings, data sel tabel, teks utama */
  --text-secondary: #475569;         /* Deskripsi kasus, label pendukung */
  --text-muted: #94a3b8;             /* Timestamp, nomor urut baris, placeholder */
  --text-inverse: #ffffff;           /* Teks tombol utama */

  --font-display: 'Nunito', sans-serif;
  --font-body: 'Nunito Sans', sans-serif;
  --font-mono: 'Fira Code', monospace;

  /* Radius Scale */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-full: 9999px;

  /* Natural Soft Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(15, 23, 42, 0.05);
  --shadow-md: 0 4px 12px -2px rgba(15, 23, 42, 0.08);
  --shadow-lg: 0 12px 28px -4px rgba(15, 23, 42, 0.12);
  --shadow-modal: 0 20px 40px -8px rgba(15, 23, 42, 0.25);

  color-scheme: light;
}
```

### 2.2 Typography Hierarchy
* **Headings & Brand Title:** `Nunito` (Weight: 700, 800, 900) - font rounded humanist yang ramah, percaya diri, dan mudah dibaca.
* **Body Text & Catatan Kasus:** `Nunito Sans` (Weight: 400, 600, 700) - nyaman untuk membaca narasi panjang dan alibi saksi.
* **SQL Editor, Tabel Data, & Schema Tree:** `Fira Code` (Weight: 400, 500, 600) - font monospace terkalibrasi untuk keterbacaan kolom dan query SQL.

---

## 3. UI/UX Layout & Wireframes (ASCII Schematics)

### 3.1 View 1: Stage Select (Asymmetric Split Hero)

```
+-------------------------------------------------------------------------------+
| (DB) SQL Case Detective                                  [● Database Siap]    |
+-------------------------------------------------------------------------------+
|                                                                               |
|   +-------------------------------------+  +------------------------------+   |
|   | HERO SPLIT (Kiri)                   |  | ALUR INVESTIGASI (Kanan)     |   |
|   | [Game Puzzle SQL]                   |  |                              |   |
|   | Pecahkan Kasus Kriminal Lewat       |  | (1) Inspeksi Foto TKP        |   |
|   | Analisis Database                   |  |     Temukan bukti fisik      |   |
|   |                                     |  | (2) Uji Query SQL            |   |
|   | Periksa TKP, uji alibi tersangka    |  |     Cek log akses & alibi    |   |
|   | lewat query SQL, dan ungkap dalang. |  | (3) Ajukan Dakwaan           |   |
|   |                                     |  |     Tunjuk tersangka utama   |   |
|   | [ > Mulai Kasus 001 ]               |  |                              |   |
|   +-------------------------------------+  +------------------------------+   |
|                                                                               |
|   Papan Berkas Kasus                                 Penyimpanan SQLite WASM  |
|   +---------------------+  +---------------------+  +---------------------+   |
|   | [ Foto TKP Penthouse|  | [ Foto Gudang Kargo |  | [ Foto Rumah Sakit  |   |
|   |   Tanpa Badge Tag ] |  |   Grayscale (Lock) ]|  |   Grayscale (Lock) ]|   |
|   | CASE-001 | Menengah |  | CASE-002 | Sulit    |  | CASE-003 | Ahli     |   |
|   | Pembunuhan Penthouse|  | Pencurian Gudang    |  | Rekam Medis Palsu   |   |
|   | Cyber Penthouse B2  |  | Dermaga Utara       |  | RS Medika           |   |
|   | [ Masuk ke TKP ]    |  | [ Berkas Terkunci ] |  | [ Berkas Terkunci ] |   |
|   +---------------------+  +---------------------+  +---------------------+   |
+-------------------------------------------------------------------------------+
```

---

### 3.2 View 2: Interactive Crime Scene (TKP)

```
+-------------------------------------------------------------------------------+
| [<- Papan Kasus] CASE-001: Pembunuhan Penthouse  [Catatan (0/4)] [Meja Kerja] |
+-------------------------------------------------------------------------------+
|                                                                               |
|   +-----------------------------------------------------------------------+   |
|   | CANVAS FOTO TKP (Frame: Deep Slate #0f172a, Rounded Corners)          |   |
|   |                                                                       |   |
|   |         (Meja Korban)                                                 |   |
|   |            (A) [Pin Kuning Amber - Subtle Bounce]                     |   |
|   |                                                                       |   |
|   |                             (Pintu Belakang)                          |   |
|   |                                (B) [Pin Kartu RFID - Subtle Bounce]   |   |
|   |                                                                       |   |
|   |     (Server Vault)                                                    |   |
|   |        (C) [Pin Layar Server - Subtle Bounce]                         |   |
|   |                                                                       |   |
|   |                      [* Klik pin kuning [A], [B], [C] untuk periksa]  |   |
|   +-----------------------------------------------------------------------+   |
|                                                                               |
|   Laporan Singkat TKP:                          [ >_ Buka Meja Kerja SQL ]    |
|   Ronald Sterling ditemukan tewas di penthouse.                               |
|   Flash drive vault telah diekstraksi paksa.                                  |
+-------------------------------------------------------------------------------+
```

---

### 3.3 View 3: Forensic Workstation (Modern Devtool Ergonomics)

```
+-------------------------------------------------------------------------------+
| [<- Foto TKP]  Meja Kerja SQL - CASE-001          [Catatan (1/4)] [Ajukan]    |
+-------------------+---------------------------------------+-------------------+
| STRUKTUR DATABASE | EDITOR QUERY SQL                      | BUKTI KASUS (1)   |
+-------------------+---------------------------------------+-------------------+
| [Cari tabel..   ] | Contoh: [employees] [cctv_logs] ...   | PETUNJUK KASUS:   |
|                   | [Reset]           [Jalankan (Ctrl+Enter)]| [X] Pemilik RFID  |
| v employees       +---------------------------------------+ [ ] Jejak Pintu   |
|   * id (INT)      | SELECT * FROM employees               | [ ] Sosok CCTV    |
|   * name (TEXT)   | WHERE assigned_keycard = 'RFID-8819'; | [ ] Chat Kripto   |
|   * role (TEXT)   +---------------------------------------+                   |
| > keycard_scans   | 1 baris ditemukan (0.8 ms)            | BUKTI TERBUKA:    |
| > cctv_logs       +----+--------------+-------------------+ +---------------+ |
| > phone_records   | #  | name         | role              | | [Foto RFID]   | |
|                   +----+--------------+-------------------+ | Kartu Pegawai | |
| [Klik nama kolom  | 1  | David Thorne | VP Security  [Pin]| +---------------+ |
| untuk menyisipkan]+----+--------------+-------------------+-------------------+
```

---

### 3.4 View 4: Evidence Inspection Modal

```
+-------------------------------------------------------------+
| (Bukti) NEXA-RFID-8819: Kartu Akses Pegawai Retak    [Tutup X]
+-------------------------------------------------------------+
| +-------------------------+  Deskripsi Barang Bukti:        |
| |                         |  Kartu RFID bernoda ditemukan   |
| |  [FOTO MAKRO CLOSE-UP   |  di dekat tangga darurat lantai |
| |   KARTU RFID PEGAWAI    |  penthouse.                     |
| |   BERSIH TANPA TAG]     |                                 |
| |                         |  Catatan Forensik:              |
| +-------------------------+  "Gunakan query SQL pada tabel  |
| [Kategori: Fisik]            employees untuk melacak        |
| [Lokasi: Pintu Belakang]     pemegang kartu ini."           |
|                                                             |
|                              Rekomendasi Query SQL:         |
|                              SELECT * FROM employees ...    |
|                                                             |
|                 [ >_ Uji di Meja Kerja SQL ]                |
+-------------------------------------------------------------+
```

---

### 3.5 View 5: Detective Notebook (Slide-over Drawer)

```
+-------------------------------------------------------+
| (Buku) Catatan Investigasi (1/4)             [X Tutup]
+-------------------------------------------------------+
| [TAB: Petunjuk Kasus (1)]     [TAB: Catatan Bebas]   |
+-------------------------------------------------------+
| [V] Identifikasi Pemilik Kartu NEXA-RFID-8819         |
|     Terungkap: David Thorne (VP of Corporate Security)|
|                                                       |
| [ ] Lacak Jejak Pintu Darurat Penthouse Jam 23:48     |
|     Buka Meja Kerja SQL untuk memeriksa keycard_scans |
|                                                       |
| [ ] Konfirmasi Sosok Mencurigakan di CCTV             |
|     Buka Meja Kerja SQL untuk memeriksa cctv_logs     |
|                                                       |
| [ ] Ungkap Komunikasi Kripto Rahasia                  |
|     Buka Meja Kerja SQL untuk memeriksa phone_records |
+-------------------------------------------------------+
| Scratchpad (Auto-saved di browser):                   |
| - David berada di TKP pukul 23:48                     |
| - Ada pesan escrow wallet mencurigakan                |
+-------------------------------------------------------+
```

---

### 3.6 View 6: Accusation Modal & Verdict Screen

```
+-----------------------------------------------------------------+
| (Warrant) Surat Perintah Penangkapan Tersangka         [Batal X]|
+-----------------------------------------------------------------+
| 1. Tunjuk Tersangka Utama Pelaku Kejahatan                      |
|    [ ( ) Maya Lin ]    [ (X) David Thorne (Terpilih) ]          |
|    [ ( ) Marcus Vance ][ ( ) Arthur Bell ]                      |
|                                                                 |
| 2. Lampirkan Bukti Penentu Hasil Query SQL                      |
|    [X] Kartu Akses Pegawai Retak (EV-02)                        |
|    [X] Snapshot CCTV Tangga Darurat (EV-04)                     |
|                                                                 |
| 3. Catatan Reka Ulang Kronologi Penyelidik                      |
|    [ Pelaku masuk via pintu darurat, meracuni korban, dan...  ] |
|                                                                 |
|                 [ Ajukan Surat Penangkapan ]                    |
+-----------------------------------------------------------------+
```

---

## 4. Struktur Modul & File Arsitektur

```
src/
├── cases/
│   ├── types.ts                     # TypeScript interface model kasus
│   ├── index.ts                     # Registri daftar kasus
│   └── case01/
│       ├── schema.sql               # DDL 5 tabel SQLite
│       └── case01Data.ts            # Manifest kasus, seed SQL, evaluasi milestone
├── services/
│   └── sqlEngine.ts                 # Singleton wrapper sql.js (WASM)
├── context/
│   └── CaseContext.tsx              # Central state (zero external state dependency)
├── components/
│   ├── Common/
│   │   ├── ToastNotification.tsx   # Alert bukti terbuka
│   │   └── ToastNotification.css
│   ├── StageSelect/
│   │   ├── StageSelectView.tsx     # Landing page & asymmetric split hero
│   │   └── StageSelectView.css
│   ├── CrimeScene/
│   │   ├── CrimeSceneView.tsx      # Canvas interaktif TKP
│   │   ├── CrimeSceneView.css
│   │   ├── HotspotMarker.tsx       # Pin interaktif [A][B][C]
│   │   ├── EvidenceModal.tsx       # Dialog zoom-in barang bukti
│   │   └── EvidenceModal.css
│   ├── Workstation/
│   │   ├── WorkstationView.tsx     # 3-column SQL workspace orchestrator
│   │   ├── WorkstationView.css
│   │   ├── SchemaExplorer.tsx      # Sidebar tabel & kolom
│   │   ├── SchemaExplorer.css
│   │   ├── SqlEditor.tsx           # Textarea editor SQL & template query
│   │   ├── SqlEditor.css
│   │   ├── QueryResultGrid.tsx     # Tabel hasil query terpaginasi
│   │   ├── QueryResultGrid.css
│   │   ├── QuickEvidenceDock.tsx   # Panel bukti & lead progress kanan
│   │   └── QuickEvidenceDock.css
│   ├── Notebook/
│   │   ├── DetectiveNotebook.tsx   # Drawer slide-over buku catatan (Hotkey: N)
│   │   └── DetectiveNotebook.css
│   └── Accusation/
│       ├── AccusationModal.tsx     # Form pengajuan penangkapan
│       ├── AccusationModal.css
│       ├── VerdictScreen.tsx       # Layar resolusi vonis & reka ulang
│       └── VerdictScreen.css
├── App.tsx                          # Root router view & header aplikasi
├── App.css                          # Layout header & kontainer app
├── index.css                        # Token sistem visual, tombol, & font Nunito
└── main.tsx                         # React 19 entry point
```

---

Dokumen ini adalah acuan resmi visual, tata letak, dan standar desain aplikasi yang telah diselaraskan dengan implementasi terkini.
