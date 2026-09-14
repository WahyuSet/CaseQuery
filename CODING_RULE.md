# Coding Standards & Guidelines (CODING_RULE.md)
# Project: SQL Case Detective (Cyber Forensics Edition)

**Document Version:** 1.0.0  
**Enforcement:** Strict (All code changes must comply with these rules)  
**Core Mantras:** 
1. *Ponytail Philosophy*: Efisien, minimalis, YAGNI, standard library first, zero bloat.
2. *Visual Excellence*: Modern, high-end cyber noir aesthetic, clean typography, responsive layout.

---

## 1. Arsitektur & Prinsip Minimalis (The Ponytail Ladder)

Sebelum menulis kode atau membuat fungsi baru, patuhi **tangga prioritas**:
1. **Apakah fitur ini benar-benar dibutuhkan sekarang?** Jika spekulatif ("siapa tahu nanti butuh"), **jangan dibuat** (YAGNI).
2. **Apakah sudah ada di codebase?** Pakai ulang helper, context, atau komponen yang sudah ada. Jangan membuat duplikasi.
3. **Apakah browser API / JavaScript standar sudah menyediakannya?** Gunakan fitur native (`localStorage`, `URLSearchParams`, `Date.now()`, `structuredClone`) daripada menginstall package npm baru.
4. **Bisa dibuat satu baris yang jelas?** Buat satu baris.
5. **Hindari Abstraksi Berlebihan:**
   - Dilarang membuat generic interface/factory jika hanya ada 1 implementasi konkret.
   - Dilarang membungkus logic sederhana ke dalam 3-4 layer wrapper yang tidak diperlukan.
   - Kode yang membosankan dan mudah dibaca jauh lebih unggul daripada kode yang rumit dan "pintar".

---

## 2. Standar TypeScript & React

### 2.1 Konvensi Komponen
- Gunakan **Functional Components** dengan TypeScript strict typing.
- Pisahkan props ke dalam `interface [ComponentName]Props`:
  ```tsx
  interface HotspotMarkerProps {
    id: string;
    label: string;
    position: { xPercent: number; yPercent: number };
    onClick: (id: string) => void;
  }
  ```
- Dilarang menggunakan `any`. Jika tipe data bersifat dinamis (seperti hasil baris SQLite), gunakan `Record<string, unknown>` atau generic tipe eksplisit `QueryResult`.

### 2.2 State Management
- **Zero-Dependency State:** Gunakan bawaan React (`useState`, `useReducer`, `createContext`, `useContext`).
- Dilarang menginstall library state eksternal berat (Redux, MobX, dll.).
- Data persistence wajib menggunakan `localStorage` dengan penanganan error fallback (`try-catch` jika storage penuh atau private browsing aktif).

### 2.3 Naming Conventions
- **Komponen React:** `PascalCase.tsx` (contoh: `CrimeSceneView.tsx`, `SqlEditor.tsx`).
- **Hooks & Services:** `camelCase.ts` (contoh: `sqlEngine.ts`, `useCaseState.ts`).
- **Data & Seed Files:** `camelCase.ts` atau `kebab-case.sql` (contoh: `case01Data.ts`, `schema.sql`).
- **Aset Gambar:** `kebab-case.webp` (contoh: `penthouse-scene.webp`, `coffee-cup-evidence.webp`).

---

## 3. Standar SQLite WASM (`sql.js`)

1. **Inisialisasi Tunggal (Singleton Engine):**
   - Engine WASM hanya boleh di-instantiate **satu kali** saat aplikasi pertama kali dimuat, bukan di setiap render komponen.
2. **Isolasi Memori:**
   - Setiap kasus membaca skema dan seed data secara terisolasi.
   - Fitur "Reset Case" harus mengeksekusi ulang script `schema.sql` dan `seedData.ts` pada database in-memory tanpa perlu me-reload halaman web.
3. **Performa & Timing:**
   - Setiap eksekusi query harus mencatat durasi eksekusi dalam milidetik (`performance.now()`) untuk ditampilkan pada antarmuka terminal.
4. **Penanganan Error Query yang Bersahabat:**
   - Jika query pengguna mengalami sintaks error (misal: salah ketik nama tabel), error message dari SQLite WASM harus ditangkap dan ditampilkan dalam kotak peringatan terminal merah yang mudah dipahami detektif pemula.

---

## 4. Standar Styling & Visual (Web Application Excellence)

1. **Design System Tokens Only:**
   - Seluruh warna, spasi, border-radius, dan font size wajib merujuk pada token CSS yang telah didefinisikan di `index.css` (misal: `var(--bg-surface)`, `var(--neon-cyan)`, `var(--neon-amber)`).
   - Dilarang menulis raw color sembarangan (seperti `#ffffff` atau `#000000` langsung) di inline style komponen.
2. **Kualitas Tampilan (No Empty Boxes):**
   - Dilarang menggunakan kotak abu-abu polos sebagai placeholder gambar.
   - Semua elemen visual harus memiliki asset gambar berkualitas tinggi yang konsisten dengan tema Cyber Noir.
3. **Micro-Interactions & Responsiveness:**
   - Semua tombol dan link interaktif wajib memiliki state `:hover`, `:active`, dan `:focus-visible`.
   - Gunakan transisi halus (`transition: all 0.2s ease-in-out`).
   - Sediakan scrollbar kustom bertema gelap untuk tabel data berukuran besar.

---

## 5. Aksesibilitas (a11y) & Usability

1. **Unique Element IDs:**
   - Setiap tombol utama, input editor, dan modal harus memiliki atribut `id` yang unik dan deskriptif (contoh: `id="btn-run-query"`, `id="btn-open-workstation"`, `id="marker-evidence-a"`).
2. **Keyboard Navigation & Shortcuts:**
   - `Ctrl + Enter` (atau `Cmd + Enter`): Menjalankan query SQL di editor.
   - `Escape`: Menutup modal bukti atau modal tuduhan.
   - `N`: Membuka/menutup Detective Notebook.
3. **Contrast Ratio:**
   - Teks pada terminal dan hasil tabel harus memiliki kontras tinggi terhadap latar belakang gelap agar nyaman dibaca berjam-jam saat bermain.

---

## 6. Verification & Definition of Done (DoD)

Sebuah fitur atau perbaikan kode dianggap selesai jika:
1. **Tidak Ada Error TypeScript:** `npm run build` atau `npx tsc` berjalan sukses dengan 0 error.
2. **Tidak Ada Unnecessary Dependencies:** Setiap package baru yang ingin diinstall harus punya justifikasi kuat yang tidak bisa diselesaikan dengan 10-20 baris kode native.
3. **Verifikasi Fungsional Nyata:** Fitur telah diuji langsung pada alur game (misal: klik marker -> modal muncul -> buka laptop -> query dieksekusi -> milestone tercentang).
4. **Single Root-Cause Fix:** Jika memperbaiki bug, perbaiki pada akar fungsinya, bukan menambal di setiap komponen pemanggil.
