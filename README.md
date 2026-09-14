# SQL Case Detective

Game investigasi kasus kriminal interaktif berbasis **SQL (Structured Query Language)** yang berjalan 100% di browser pemain menggunakan teknologi **SQLite WebAssembly (WASM)**.

Pemain memecahkan misteri kejahatan dengan menginspeksi tempat kejadian perkara (TKP), menemukan barang bukti fisik, dan memverifikasi log akses serta alibi tersangka menggunakan query SQL.

---

## Fitur Utama

- **The Two-Way Clue Loop**:
  - *Visual ke SQL*: Mengamati foto TKP dan barang bukti fisik untuk mendapatkan entitas dan ID kunci (seperti kartu RFID, stempel waktu, dan nomor perangkat).
  - *SQL ke Visual*: Mengeksekusi query database untuk membuka dokumen rahasia, rekaman CCTV, dan profil tersangka.
- **In-Browser SQLite WASM (`sql.js`)**:
  - Database berjalan sepenuhnya di sisi klien (0ms latency, tanpa server backend, 100% offline-ready).
- **Interactive Crime Scene**:
  - Inspeksi titik rawan (*hotspot markers*) pada foto tempat kejadian perkara untuk memeriksa detail barang bukti.
- **Forensic Workstation (Meja Kerja SQL)**:
  - Database Schema Explorer dengan pohon kolom interaktif.
  - SQL Editor dengan tombol template query dan eksekusi instan (`Ctrl + Enter`).
  - Query Result Grid terpaginasi dengan fitur sematkan bukti (*Pin to Notes*).
  - Quick Evidence Dock untuk melihat progres objektif kasus.
- **Detective Notebook & Autosave**:
  - Buku catatan (*slide-over drawer*, Hotkey `N`) untuk memantau progres petunjuk kasus dan catatan bebas yang tersimpan otomatis di `localStorage`.
- **Accusation & Verdict Engine**:
  - Pengajuan surat perintah penangkapan dengan memilih tersangka utama dan bukti pendukung kunci.
  - Layar hasil evaluasi yang menampilkan reka ulang kronologi kejadian secara mendalam.

---

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Database Engine**: `sql.js` (SQLite compiled to WebAssembly)
- **Styling**: Modern Modular CSS (Co-located per component) sesuai standar `/design-taste-frontend`
- **Typography**: Google Fonts `Nunito`, `Nunito Sans`, dan `Fira Code`
- **Icons**: `lucide-react`

---

## Cara Menjalankan

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Jalankan Development Server
```bash
npm run dev
```
Akses aplikasi melalui browser di `http://localhost:5173/`.

### 3. Menjalankan Tes Mandiri Engine
```bash
npm test
```

### 4. Build untuk Produksi
```bash
npm run build
```

---

## Struktur Proyek

```
src/
├── cases/             # Definisi skema, data kasus, tersangka, dan bukti
├── services/          # Wrapper singleton SQLite WASM (sqlEngine.ts)
├── context/           # State management terpusat (CaseContext.tsx)
├── components/        # Komponen modular UI (StageSelect, CrimeScene, Workstation, Notebook, Accusation)
├── App.tsx            # Root component & router antarmuka
└── index.css          # Design system tokens & utility classes
```
