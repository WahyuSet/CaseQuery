import React from 'react'
import { useCase } from '../../context/CaseContext'
import {
  Search,
  Terminal,
  Award,
  ArrowRight,
  Database,
  ShieldCheck,
  Zap,
  HelpCircle,
  Play
} from 'lucide-react'
import './LandingPageView.css'

export const LandingPageView: React.FC = () => {
  const { openStageSelect, setActiveView } = useCase()

  const handlePlayCase001 = () => {
    setActiveView('CRIME_SCENE')
  }

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="landing-container">
      <div className="landing-wrapper">
        
        {/* Section 1: Hero Split */}
        <section className="landing-hero">
          <div className="landing-hero-content">
            <div style={{ display: 'inline-flex', width: 'fit-content' }}>
              <span className="badge badge-accent">Web Game Edukatif SQL</span>
            </div>

            <h1 className="landing-hero-title">
              Pecahkan Kasus Kriminal Lewat Analisis Database SQL
            </h1>

            <p className="landing-hero-desc">
              Periksa tempat kejadian perkara, verifikasi alibi para tersangka lewat query SQL di browser, dan bongkar dalang kejahatan secara akurat.
            </p>

            <div className="landing-hero-actions">
              <button
                id="btn-landing-open-stages"
                onClick={openStageSelect}
                className="btn-primary"
              >
                <span>Buka Papan Kasus</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => handleScrollToSection('section-spotlight')}
                className="btn-secondary"
              >
                <span>Lihat Kasus Unggulan</span>
              </button>
            </div>
          </div>

          {/* Right Column: Mini Forensic Flow */}
          <div className="landing-flowcard">
            <span className="flowcard-heading">Alur Investigasi Interaktif</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="flow-step-row">
                <div className="flow-step-icon-wrap">
                  <Search size={15} />
                </div>
                <div className="flow-step-text">
                  <h4>1. Inspeksi Bukti TKP</h4>
                  <p>Temukan kartu RFID retak, cangkir kopi, dan rekaman CCTV di lokasi kejadian.</p>
                </div>
              </div>

              <div className="flow-step-row">
                <div className="flow-step-icon-wrap">
                  <Terminal size={15} />
                </div>
                <div className="flow-step-text">
                  <h4>2. Uji Query SQL di Browser</h4>
                  <p>Cocokkan log pintu darurat dan log panggilan dengan database SQLite lokal.</p>
                </div>
              </div>

              <div className="flow-step-row">
                <div className="flow-step-icon-wrap">
                  <Award size={15} />
                </div>
                <div className="flow-step-text">
                  <h4>3. Ajukan Surat Penangkapan</h4>
                  <p>Sertakan bukti penentu dan dapatkan pengakuan bersalah dari pelaku.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Bento Grid (Fitur & Keunggulan) */}
        <section className="landing-bento-section">
          <div className="section-header-block">
            <h2 className="section-headline">Kenapa Belajar SQL Lewat Investigasi?</h2>
            <p className="section-subtext">
              Tinggalkan latihan query yang membosankan. Hadapi skenario dunia nyata dengan data relasional yang menantang nalar logika Anda.
            </p>
          </div>

          <div className="bento-grid-asym">
            {/* Wide Cell: SQLite WASM */}
            <div className="bento-cell-wide">
              <div className="bento-icon-box">
                <Database size={18} />
              </div>
              <h3 className="bento-cell-title">Database SQLite Asli Berjalan di Browser</h3>
              <p className="bento-cell-desc">
                Tanpa setup server dan tanpa instalasi software tambahan. Mesin SQLite dikompilasi ke WebAssembly sehingga query Anda dieksekusi secara instan dengan latensi 0ms dan privasi data 100% terjaga di perangkat Anda.
              </p>
            </div>

            {/* Column Stack: 2 Smaller Cells */}
            <div className="bento-col-stack">
              <div className="bento-cell-item">
                <div className="bento-icon-box">
                  <Zap size={18} />
                </div>
                <h3 className="bento-cell-title">The Two-Way Clue Loop</h3>
                <p className="bento-cell-desc">
                  Petunjuk fisik dari foto TKP menjadi kunci input query database, dan hasil query membuka berkas bukti visual baru.
                </p>
              </div>

              <div className="bento-cell-item">
                <div className="bento-icon-box">
                  <ShieldCheck size={18} />
                </div>
                <h3 className="bento-cell-title">Evaluasi Milestone Cerdas</h3>
                <p className="bento-cell-desc">
                  Sistem memeriksa baris data faktual yang dihasilkan oleh query Anda, memberikan kebebasan eksplorasi sintaks SQL tanpa rumus kaku.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Featured Spotlight Case (Kasus 001) */}
        <section id="section-spotlight" className="landing-bento-section">
          <div className="section-header-block">
            <h2 className="section-headline">Kasus Perdana yang Siap Dipecahkan</h2>
            <p className="section-subtext">
              Mulailah dari berkas perkara pertama yang telah dibuka lengkap dengan bukti fisik dan log digital.
            </p>
          </div>

          <div className="spotlight-card">
            <div className="spotlight-image-wrap">
              <img
                src="/assets/scenes/penthouse_scene.jpg"
                alt="Penthouse Crime Scene"
                className="spotlight-image"
              />
            </div>

            <div className="spotlight-content">
              <div className="spotlight-meta-tags">
                <span className="badge">KASUS 001</span>
                <span className="badge badge-accent">Tingkat Menengah</span>
              </div>

              <h3 className="spotlight-title">
                The Midnight Penthouse Breach
              </h3>

              <p className="spotlight-desc">
                Ronald Sterling, CEO NexaCore Tech, ditemukan tewas di ruang kerja penthouse lantai 42. Flash drive enkripsi brankas raib dicuri. Periksa riwayat kartu RFID dan rekaman CCTV tangga darurat untuk menjebak pelakunya.
              </p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  id="btn-play-spotlight"
                  onClick={handlePlayCase001}
                  className="btn-primary"
                >
                  <Play size={14} fill="currentColor" />
                  <span>Investigasi Kasus Ini</span>
                </button>

                <button
                  onClick={openStageSelect}
                  className="btn-outline"
                >
                  <span>Daftar Kasus Lengkap</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: FAQ Singkat */}
        <section className="faq-section">
          <div className="section-header-block">
            <h2 className="section-headline">Pertanyaan Umum</h2>
            <p className="section-subtext">
              Hal-hal yang sering ditanyakan seputar cara kerja game investigasi ini.
            </p>
          </div>

          <div className="faq-list">
            <div className="faq-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={16} color="var(--accent)" />
                <h4 className="faq-question">Apakah saya perlu menginstal software database?</h4>
              </div>
              <p className="faq-answer">
                Sama sekali tidak. Aplikasi ini memanfaatkan SQLite WASM yang berjalan sepenuhnya di dalam browser web modern Anda tanpa konfigurasi backend.
              </p>
            </div>

            <div className="faq-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={16} color="var(--accent)" />
                <h4 className="faq-question">Apakah game ini cocok untuk pemula yang baru belajar SQL?</h4>
              </div>
              <p className="faq-answer">
                Sangat cocok. Tersedia fitur penjelajah skema tabel dan tombol template query instan untuk membantu Anda memahami struktur relasional data secara bertahap.
              </p>
            </div>

            <div className="faq-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={16} color="var(--accent)" />
                <h4 className="faq-question">Apakah catatan dan progres penyelidikan saya akan tersimpan?</h4>
              </div>
              <p className="faq-answer">
                Ya. Seluruh progres penyelesaian petunjuk kasus dan catatan bebas di buku catatan detektif otomatis tersimpan di memori browser lokal Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Footer CTA */}
        <section className="footer-cta-card">
          <h2 className="footer-cta-title">
            Siap Menguji Kemampuan Analisis SQL Anda?
          </h2>
          <p className="footer-cta-sub">
            Buka berkas perkara kriminal sekarang, telusuri anomali log akses, dan buktikan siapa dalang kejahatannya.
          </p>
          <button
            id="btn-footer-open-stages"
            onClick={openStageSelect}
            className="btn-primary"
            style={{ padding: '12px 28px', fontSize: '15px' }}
          >
            <span>Buka Papan Kasus Sekarang</span>
            <ArrowRight size={16} />
          </button>
        </section>

        {/* Bottom Footer Strip */}
        <footer className="landing-footer-strip">
          <span>SQL Case Detective &bull; In-Browser Forensic Investigation</span>
          <span>Teknologi: React 19, TypeScript, SQLite WASM</span>
        </footer>

      </div>
    </div>
  )
}
