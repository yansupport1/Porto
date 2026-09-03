import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaBars,
  FaBolt,
  FaBookOpen,
  FaCheck,
  FaCode,
  FaCodeBranch,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLayerGroup,
  FaLightbulb,
  FaLinkedinIn,
  FaLocationDot,
  FaMobileScreenButton,
  FaPaperPlane,
  FaQuoteLeft,
  FaRocket,
  FaTiktok,
  FaXmark,
} from 'react-icons/fa6';
import { type IconType } from 'react-icons';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Project = {
  name: string;
  index: string;
  type: string;
  description: string;
  detail: string;
  accent: string;
  tags: string[];
  status: string;
  icon: IconType;
};

const projects: Project[] = [
  {
    name: 'Nexus-X',
    index: '01',
    type: 'Eksperimen digital',
    description: 'Ruang eksplorasi untuk ide, interface, dan hal-hal yang belum punya nama.',
    detail: 'Nexus-X adalah laboratorium kecil untuk menguji cara baru menyusun pengalaman digital. Fokusnya ada di struktur yang terasa ringan, respon yang cepat, dan detail yang membuat orang ingin tinggal lebih lama.',
    accent: '#76e1d0',
    tags: ['Eksperimen', 'UI system', 'Web'],
    status: 'Berjalan',
    icon: FaGlobe,
  },
  {
    name: 'CELENGAN KU',
    index: '02',
    type: 'Keuangan personal',
    description: 'Teman sederhana untuk melihat tabungan bertumbuh, satu target pada satu waktu.',
    detail: 'CELENGAN KU membantu membingkai kebiasaan menabung sebagai progres yang terlihat. Data dirangkum dengan bahasa yang mudah dibaca supaya keputusan kecil terasa dekat dan nyata.',
    accent: '#f1c66b',
    tags: ['Android', 'Keuangan', 'Utility'],
    status: 'APK live',
    icon: FaMobileScreenButton,
  },
  {
    name: 'TRADING KU',
    index: '03',
    type: 'Market companion',
    description: 'Panel ringkas untuk mencatat ritme pasar dan keputusan trading dengan lebih sadar.',
    detail: 'TRADING KU dibuat untuk memperjelas proses, bukan menjanjikan hasil. Ia merapikan catatan, watchlist, dan kebiasaan review agar setiap keputusan punya konteks.',
    accent: '#ff947b',
    tags: ['Android', 'Data', 'Dashboard'],
    status: 'APK live',
    icon: FaLayerGroup,
  },
  {
    name: 'GET SOURCE CODE',
    index: '04',
    type: 'Resource hub',
    description: 'Jembatan antara rasa penasaran dan kode yang benar-benar bisa dibuka.',
    detail: 'GET SOURCE CODE mengumpulkan referensi, potongan kode, dan jalur belajar yang praktis. Dibuat untuk orang yang belajar dengan cara membongkar lalu merakit kembali.',
    accent: '#c5a6f2',
    tags: ['Resource', 'Open learning', 'Android'],
    status: 'Dikembangkan',
    icon: FaCodeBranch,
  },
  {
    name: 'VPN',
    index: '05',
    type: 'Koneksi',
    description: 'Lapisan koneksi yang tenang, praktis, dan tidak mengganggu pekerjaan utama.',
    detail: 'VPN adalah proyek utilitas yang menjaga pengalaman tetap fokus pada koneksi yang aman dan mudah dipahami. Tidak banyak ornamen, hanya status yang jelas dan kontrol yang cepat.',
    accent: '#80b9f0',
    tags: ['Android', 'Network', 'Utility'],
    status: 'APK live',
    icon: FaRocket,
  },
];

const navItems = [
  { href: '/', label: 'Beranda', number: '01' },
  { href: '/dashboard', label: 'Dashboard', number: '02' },
  { href: '/about', label: 'Tentang Yanz', number: '03' },
  { href: '/projects', label: 'Proyek', number: '04' },
  { href: '/skills', label: 'Keahlian', number: '05' },
  { href: '/contact', label: 'Kontak', number: '06' },
];

function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = (href: string) => href === '/' ? location === '/' : location.startsWith(href);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="app-frame min-h-[100dvh]">
      <aside className="glass-sidebar fixed inset-y-5 left-5 z-40 hidden w-[248px] flex-col rounded-[28px] p-5 lg:flex">
        <Link href="/" className="brand-lockup" data-testid="link-logo">
          <span className="brand-mark">Y</span>
          <span>
            <span className="brand-name">Portfolio</span>
            <span className="brand-meta">Yanz / 2024—now</span>
          </span>
        </Link>
        <div className="sidebar-rule" />
        <p className="eyebrow px-2">Navigasi utama</p>
        <nav className="mt-4 space-y-1" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`nav-link ${active(item.href) ? 'active' : ''}`}
              data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
            >
              <span>{item.label}</span>
              <span className="nav-number">{item.number}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-status glass-inset mt-auto">
          <div className="status-line"><span className="status-dot" /> <span className="eyebrow">Status saat ini</span></div>
          <p>Merawat 4 APK live dan membuka ruang kolaborasi baru.</p>
          <Link href="/contact" className="micro-link mt-4" data-testid="link-sidebar-contact">Kirim sinyal <FaArrowUpRightFromSquare /></Link>
        </div>
      </aside>

      <header className="mobile-header glass fixed left-4 right-4 top-4 z-40 rounded-2xl px-4 py-3 lg:hidden">
        <Link href="/" className="brand-lockup" data-testid="link-mobile-logo">
          <span className="brand-mark small">Y</span>
          <span className="brand-name">Portfolio Yanz</span>
        </Link>
        <button className="icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'} data-testid="button-mobile-menu">
          {menuOpen ? <FaXmark /> : <FaBars />}
        </button>
      </header>
      {menuOpen && (
        <div className="mobile-menu glass fixed inset-x-4 top-[78px] z-30 rounded-2xl p-3 lg:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={`nav-link ${active(item.href) ? 'active' : ''}`} data-testid={`link-mobile-nav-${item.number}`}>
              <span>{item.label}</span><span className="nav-number">{item.number}</span>
            </Link>
          ))}
        </div>
      )}
      <main className="lg:pl-[278px]">{children}</main>
    </div>
  );
}

function RouteMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} · Portfolio Yanz`;
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute('content', description);
  }, [description, title]);
  return null;
}

function PageIntro({ eyebrow, title, body }: { eyebrow: string; title: ReactNode; body: string }) {
  return (
    <section className="page-intro">
      <div className="aurora-orb orb-gold" />
      <div className="intro-copy animate-rise">
        <p className="eyebrow accent-teal" data-testid="text-page-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="intro-body">{body}</p>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <RouteMeta title="Beranda" description="Portfolio Yanz — produk digital, Android, dan eksplorasi prompt engineering." />
      <section className="hero-panel hero-grid">
        <div className="aurora-orb orb-teal" />
        <div className="aurora-orb orb-coral" />
        <div className="hero-copy animate-rise">
          <div className="kicker"><span /> Developer / pembuat kemungkinan</div>
          <h1>Kode yang<br /><span>punya denyut</span><i>.</i></h1>
          <p className="hero-lede">Hai, saya Yanz. Saya merakit produk digital, merawat aplikasi yang tetap hidup, dan sedang menulis jalan menuju software engineering.</p>
          <div className="action-row">
            <Link href="/projects" className="button button-primary" data-testid="link-hero-projects">Lihat karya <FaArrowUpRightFromSquare /></Link>
            <Link href="/about" className="button button-quiet" data-testid="link-hero-about">Kenali Yanz <FaArrowRight /></Link>
          </div>
          <div className="hero-readout glass-inset">
            <span className="status-dot" /><span>available for thoughtful collaboration</span><span className="readout-line" /><span className="font-mono-ui">Y/01</span>
          </div>
        </div>
        <div className="hero-instrument animate-rise delay-2">
          <div className="instrument-shell glass-dark">
            <div className="instrument-top"><span>09:41</span><span>PORTFOLIO / YANZ</span><span className="signal-bars"><i /><i /><i /></span></div>
            <div className="instrument-display">
              <span className="display-label">Small things / real impact</span>
              <strong>04</strong>
              <span className="display-caption">APK LIVE</span>
              <div className="meter"><span /></div>
            </div>
            <div className="instrument-foot"><span>Software engineering</span><span>Prompt engineering</span></div>
          </div>
          <div className="floating-chip glass"><FaCode /><span>build log<br /><b>4 produk tetap bernapas</b></span></div>
        </div>
        <div className="scroll-cue"><FaArrowDown /> scroll pelan-pelan</div>
      </section>

      <div className="signal-strip glass">
        <div className="marquee-track"><span>Software engineering</span><i /><span>Prompt engineering</span><i /><span>4 APK live</span><i /><span>Made with curiosity</span><i /><span>Software engineering</span><i /><span>Prompt engineering</span><i /></div>
      </div>

      <section className="content-section context-section">
        <div className="section-label"><span>01</span><p>Sedikit konteks</p></div>
        <div className="section-copy">
          <h2>Bukan hanya<br />menulis kode.</h2>
          <p className="lead">Saya suka saat sesuatu yang rumit berubah menjadi sederhana, terasa dekat, lalu benar-benar dipakai seseorang.</p>
          <p>Setiap proyek saya mulai dari rasa penasaran: apa yang bisa dibuat lebih jelas, lebih cepat, atau lebih manusiawi? Dari sana, saya belajar lewat praktik—dari aplikasi Android sampai eksplorasi prompt yang membantu ide bergerak.</p>
          <Link href="/about" className="micro-link" data-testid="link-context-about">Baca cerita lengkap <FaArrowRight /></Link>
        </div>
      </section>

      <section className="content-section">
        <div className="stat-rail glass">
          <Stat value="04" label="APK sedang live" accent="teal" />
          <Stat value="05" label="proyek yang diceritakan" accent="gold" />
          <Stat value="∞" label="rasa ingin tahu" accent="coral" />
        </div>
      </section>

      <section className="content-section work-section">
        <div className="section-heading"><div><div className="section-label inline"><span>02</span><p>Pilihan karya</p></div><h2>Yang sedang hidup.</h2></div><Link href="/projects" className="micro-link desktop-only" data-testid="link-home-all-projects">Semua proyek <FaArrowRight /></Link></div>
        <div className="project-grid">{projects.slice(0, 4).map((project, index) => <ProjectTeaser key={project.name} project={project} index={index} />)}</div>
      </section>
      <Footer />
    </>
  );
}

function Stat({ value, label, accent }: { value: string; label: string; accent: string }) {
  return <div className={`stat-block accent-${accent}`} data-testid={`stat-${label.toLowerCase().replaceAll(' ', '-')}`}><strong>{value}</strong><span>{label}</span></div>;
}

function ProjectTeaser({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  return (
    <Link href="/projects" className={`project-teaser glass interactive-lift ${index === 0 ? 'featured' : ''}`} data-testid={`card-home-project-${project.name.toLowerCase().replaceAll(' ', '-')}`}>
      <div className="project-glow" style={{ backgroundColor: project.accent }} />
      <div className="project-top"><span className="font-mono-ui">{project.index} / {project.type}</span><Icon /></div>
      <div className="project-bottom"><h3>{project.name}</h3><p>{project.description}</p><span className="project-arrow"><FaArrowUpRightFromSquare /></span></div>
    </Link>
  );
}

function Dashboard() {
  return (
    <>
      <RouteMeta title="Dashboard" description="Control room Portfolio Yanz — 4 APK live, 5 proyek, dan arah software engineering." />
      <PageIntro eyebrow="02 / Control room" title={<>Sinyal proyek<br /><span className="accent-text-gold">terbaca jelas.</span></>} body="Satu ruang ringkas untuk melihat apa yang sedang hidup, apa yang sedang tumbuh, dan arah kerja Yanz berikutnya." />
      <section className="dashboard-section">
        <div className="dashboard-head glass">
          <div><p className="eyebrow accent-teal">Portfolio status / online</p><h2>Instrumen kerja Yanz</h2><p>Ringkasan identitas, fokus, dan jejak proyek dalam satu panel.</p></div>
          <div className="dashboard-badge"><span className="status-dot" /> LIVE SYSTEM</div>
        </div>
        <div className="dashboard-stats">
          <div className="dashboard-stat glass"><span className="eyebrow">Identity</span><strong>YANZ</strong><span>Developer & learner</span></div>
          <div className="dashboard-stat glass"><span className="eyebrow">Live APK</span><strong>04</strong><span>maintained products</span></div>
          <div className="dashboard-stat glass"><span className="eyebrow">Project index</span><strong>05</strong><span>documented directions</span></div>
          <div className="dashboard-stat glass"><span className="eyebrow">Current vector</span><strong className="small-value">SWE / PROMPT</strong><span>software engineering + prompt engineering</span></div>
        </div>
        <div className="dashboard-grid">
          <div className="glass dashboard-projects">
            <div className="module-head"><div><p className="eyebrow accent-gold">Project registry</p><h3>Yang sedang bergerak</h3></div><span className="module-count">05 ITEMS</span></div>
            <div className="status-list">{projects.map((project) => { const Icon = project.icon; return <div key={project.name} className="status-row" data-testid={`dashboard-project-${project.name.toLowerCase().replaceAll(' ', '-')}`}><span className="row-index">{project.index}</span><span className="row-icon" style={{ color: project.accent }}><Icon /></span><span className="row-name"><b>{project.name}</b><small>{project.type}</small></span><span className={`project-status ${project.status === 'APK live' ? 'live' : 'building'}`}><i />{project.status}</span></div>; })}</div>
          </div>
          <div className="glass dashboard-focus">
            <div className="module-head"><div><p className="eyebrow accent-coral">Focus vector</p><h3>Arah berikutnya</h3></div><FaBolt className="module-icon accent-gold" /></div>
            <div className="focus-orbit"><span className="orbit-core">Y</span><span className="orbit-node node-one">SWE</span><span className="orbit-node node-two">PROMPT</span></div>
            <p>Memperkuat fondasi software architecture, API thinking, dan kemampuan mengubah niat menjadi instruksi tajam.</p>
            <Link href="/skills" className="micro-link" data-testid="link-dashboard-skills">Buka peta keahlian <FaArrowRight /></Link>
          </div>
        </div>
        <div className="dashboard-note glass-inset"><FaBookOpen /><span><b>Field note / 2024—now</b> Produk yang sudah live tetap butuh perhatian. Stabilitas adalah bagian dari craft.</span><Link href="/about" className="micro-link" data-testid="link-dashboard-about">Tentang Yanz <FaArrowRight /></Link></div>
      </section>
      <Footer />
    </>
  );
}

function About() {
  return <><RouteMeta title="Tentang Yanz" description="Cerita kerja dan cara berpikir Yanz sebagai developer dan learner." /><PageIntro eyebrow="03 / Tentang Yanz" title={<>Seorang builder yang selalu <span className="accent-text-teal">membuka pintu baru.</span></>} body="Saya percaya kemampuan tumbuh paling cepat saat rasa ingin tahu bertemu proyek yang nyata. Jadi saya terus membangun, merawat, dan mengulang." /><section className="content-section about-section"><div className="quote-panel glass"><FaQuoteLeft className="quote-mark" /><p>“Saya ingin membuat teknologi yang terasa <span>jelas</span> sebelum terasa canggih.”</p><div className="signature"><span className="brand-mark small">Y</span><span><b>Yanz</b><small>Developer & learner</small></span></div></div><div className="now-panel glass-dark"><p className="eyebrow accent-gold">Sekarang</p><h2>Dari “bagaimana?”<br />menuju “sudah jalan.”</h2><p>Empat APK saya rawat agar tetap berjalan mulus. Di sela-selanya, saya mempelajari arsitektur software dan seni menyusun prompt yang bekerja.</p><div className="status-line"><span className="status-dot" /> tersedia untuk kolaborasi</div></div><div className="story-grid"><StoryCard number="01" title="Mulai dari rasa ingin tahu" body="Saya belajar dengan membongkar hal yang membuat saya penasaran, lalu merakit versi saya sendiri." /><StoryCard number="02" title="Rawat sampai matang" body="Produk yang sudah live tetap butuh perhatian. Stabilitas adalah bagian dari craft." /><StoryCard number="03" title="Bagikan jalannya" body="Kode, catatan, dan prompt lebih berguna ketika bisa menjadi pijakan untuk orang lain." /></div></section><Footer /></>;
}

function StoryCard({ number, title, body }: { number: string; title: string; body: string }) {
  return <div className="story-card glass"><span className="eyebrow accent-coral">{number}</span><h3>{title}</h3><p>{body}</p></div>;
}

function Projects() {
  const [selected, setSelected] = useState(projects[0].name);
  const activeProject = projects.find((project) => project.name === selected) ?? projects[0];
  const ActiveIcon = activeProject.icon;
  return <><RouteMeta title="Proyek" description="Lima proyek Yanz: aplikasi Android, resource hub, eksperimen digital, dan utilitas." /><PageIntro eyebrow="04 / Proyek pilihan" title={<>Lima proyek.<br /><span className="accent-text-coral">Satu benang merah.</span></>} body="Bukan sekadar daftar aplikasi. Ini adalah jejak cara saya berpikir: membuat yang berguna, menjaga yang sudah berjalan, dan terus menyisakan ruang untuk bereksperimen." /><section className="content-section projects-section"><div className="project-selector">{projects.map((project) => { const Icon = project.icon; return <button key={project.name} onClick={() => setSelected(project.name)} className={`selector-row glass ${selected === project.name ? 'selected' : ''}`} data-testid={`button-project-${project.name.toLowerCase().replaceAll(' ', '-')}`}><span className="row-index">{project.index}</span><span className="row-icon" style={{ color: project.accent }}><Icon /></span><span className="row-name"><b>{project.name}</b><small>{project.status}</small></span><FaArrowRight className="selector-arrow" /></button>; })}</div><div className="project-detail glass-dark"><div className="detail-glow" style={{ backgroundColor: activeProject.accent }} /><div className="detail-top"><span className="eyebrow">{activeProject.index} / {activeProject.type}</span><span className="detail-icon" style={{ color: activeProject.accent }}><ActiveIcon /></span></div><div className="detail-content"><div className="tag-list">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h2>{activeProject.name}</h2><p>{activeProject.detail}</p><div className="status-line" style={{ color: activeProject.accent }}><span className="status-dot" /> {activeProject.status}</div></div></div></section><section className="content-section"><div className="collab-panel glass"><div><p className="eyebrow accent-coral">Di balik layar</p><h2>Empat APK ini bukan angka pajangan. Mereka adalah tanggung jawab.</h2></div><Link href="/contact" className="button button-primary" data-testid="link-projects-collaborate">Ajak berkolaborasi <FaArrowUpRightFromSquare /></Link></div></section><Footer /></>;
}

function Skills() {
  const skills = [{ name: 'Android development', value: 82, note: 'Membangun & merawat APK' }, { name: 'UI / product thinking', value: 76, note: 'Menyusun alur yang jelas' }, { name: 'Prompt engineering', value: 68, note: 'Eksplorasi yang sedang tumbuh' }, { name: 'Problem solving', value: 88, note: 'Membongkar sampai paham' }];
  const tools = ['Android Studio', 'Kotlin', 'JavaScript', 'Git', 'Figma', 'Prompt design'];
  return <><RouteMeta title="Keahlian" description="Peta keahlian Yanz dalam Android development, product thinking, dan prompt engineering." /><PageIntro eyebrow="05 / Keahlian" title={<>Alat di tangan,<br /><span className="accent-text-teal">rasa ingin tahu di kepala.</span></>} body="Kemampuan saya dibentuk oleh proyek yang benar-benar harus hidup. Di sini adalah potret apa yang sedang saya kuasai dan ke mana saya bergerak berikutnya." /><section className="content-section skills-section"><div className="skills-panel glass"><div className="module-head"><div><p className="eyebrow accent-teal">Capability map</p><h2>Kekuatan saat ini</h2></div><FaLightbulb className="module-icon accent-coral" /></div><div className="skill-list">{skills.map((skill) => <div className="skill-row" key={skill.name}><div className="skill-meta"><span><b>{skill.name}</b><small>{skill.note}</small></span><em>{skill.value}/100</em></div><div className="skill-track"><span style={{ width: `${skill.value}%` }} /></div></div>)}</div></div><div className="tool-panel glass-dark"><p className="eyebrow accent-gold">Toolkit</p><h2>Yang membantu<br />ide jadi nyata.</h2><div className="tag-list">{tools.map((tool) => <span key={tool}>{tool}</span>)}</div><div className="panel-footnote">Sedang memperdalam software architecture, API thinking, dan cara membuat prompt yang lebih terukur.</div></div><div className="method-card glass"><FaCode className="card-icon accent-teal" /><h3>Cara kerja</h3><p>Saya memecah masalah besar menjadi potongan kecil yang bisa diuji, lalu memberi perhatian yang sama pada fungsi dan rasa.</p></div><div className="method-card glass"><FaRocket className="card-icon accent-coral" /><h3>Arah berikutnya</h3><p>Menjadi software engineer yang kuat di fondasi, sekaligus prompt engineer yang mampu mengubah niat menjadi instruksi tajam.</p></div></section><Footer /></>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  return <><RouteMeta title="Kontak" description="Hubungi Yanz untuk diskusi proyek, kerja sama, dan kesempatan belajar bersama." /><PageIntro eyebrow="06 / Mari terhubung" title={<>Ada ide yang ingin<br /><span className="accent-text-coral">dihidupkan?</span></>} body="Saya terbuka untuk kolaborasi, obrolan tentang produk, atau sekadar bertukar cara melihat masalah. Kirim sinyal—saya akan membalasnya." /><section className="content-section contact-section"><div className="contact-links"><ContactLink icon={FaTiktok} label="TikTok" value="@yanzking1222" href="https://www.tiktok.com/@yanzking1222" /><ContactLink icon={FaInstagram} label="Instagram" value="@dshadowenv" href="https://www.instagram.com/dshadowenv" /><ContactLink icon={FaEnvelope} label="Gmail" value="yansupport1@gmail.com" href="mailto:yansupport1@gmail.com" /><div className="contact-note glass-dark"><FaLocationDot className="accent-gold" /><h2>Tidak harus formal.<br />Yang penting, mulai.</h2><p>Tersedia untuk diskusi proyek, kerja sama, dan kesempatan belajar bersama.</p></div></div><form className="contact-form glass" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><div className="module-head"><div><p className="eyebrow accent-teal">Kirim pesan</p><h2>Mari mulai dari satu kalimat.</h2></div><FaPaperPlane className="module-icon accent-coral" /></div><div className="form-grid"><label><span>Nama</span><input required name="name" placeholder="Nama kamu" data-testid="input-contact-name" /></label><label><span>Email</span><input required type="email" name="email" placeholder="email@kamu.com" data-testid="input-contact-email" /></label></div><label className="form-message"><span>Cerita singkat</span><textarea required name="message" rows={5} placeholder="Ceritakan apa yang sedang kamu bangun..." data-testid="textarea-contact-message" /></label><button type="submit" className="button button-primary" data-testid="button-send-message">{sent ? <><FaCheck /> Pesan siap dikirim</> : <><FaPaperPlane /> Kirim pesan</>}</button>{sent && <p className="form-success" data-testid="status-contact-sent">Terima kasih. Untuk versi statis ini, lanjutkan lewat Gmail Yanz agar pesan benar-benar sampai.</p>}</form></section><Footer /></>;
}

function ContactLink({ icon: Icon, label, value, href }: { icon: IconType; label: string; value: string; href: string }) {
  return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="contact-link glass interactive-lift" data-testid={`link-contact-${label.toLowerCase()}`}><span className="contact-icon"><Icon /></span><span><small>{label}</small><b>{value}</b></span><FaArrowUpRightFromSquare className="contact-arrow" /></a>;
}

function Footer() {
  return <footer className="site-footer glass"><div className="footer-inner"><p className="brand-name">Portfolio <span className="accent-text-teal">Yanz</span></p><p className="footer-meta">Dibuat dari rasa penasaran · 2024—sekarang</p><div className="footer-links"><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" data-testid="link-footer-github"><FaGithub /></a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" data-testid="link-footer-linkedin"><FaLinkedinIn /></a></div></div></footer>;
}

function Router() {
  return <RoutedErrorBoundary><Shell><Switch><Route path="/" component={Home} /><Route path="/dashboard" component={Dashboard} /><Route path="/about" component={About} /><Route path="/projects" component={Projects} /><Route path="/skills" component={Skills} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></Shell></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;