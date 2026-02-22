
import React, { useEffect, useState, useRef } from 'react';
import { Menu, X, ArrowRight, Github, Linkedin, Mail, Plus, Trash2, Globe, Check, Lock, Briefcase, GraduationCap, Zap } from 'lucide-react';

// --- Types ---
interface Project {
  id: string;
  name: string;
  category: string;
  tags: string[];
  img: string;
  description: string;
  date: string;
  github?: string;
  live?: string;
  featured: boolean;
}

interface Service {
  id: string;
  title: string;
  tags: string[];
}

// --- Default Data ---
const DEFAULT_PROJECTS: Project[] = [
  { id: '1', name: "EQUI – Expense Tracker App", category: "UI/UX DESIGN", tags: ["Finance", "Mobile", "Figma"], img: "https://framerusercontent.com/images/EkAvM1ahgBSVfpWLLzVr0CQQHpU.png", description: "Designed end-to-end UI/UX for a finance app with screens for Home, Login, Budget, Analytics, and Settings.", date: "Nov 2024", featured: true },
  { id: '2', name: "UI/UX Redesign for E-commerce", category: "UI/UX DESIGN", tags: ["Web", "Retail", "Animation"], img: "https://framerusercontent.com/images/yYbXHJTjYl7oxY1TYtArDlr3es.png", description: "Improved navigation and interaction for an e-commerce platform through a modern mobile-first redesign.", date: "Jul 2024", featured: true },
  { id: '3', name: "PORTFOLIO 2026", category: "FRONTEND", tags: ["React", "Tailwind", "GSAP"], img: "https://framerusercontent.com/images/uv0QGWBUjawPLGUzoVSulQaJ7E.png", description: "Personal portfolio website featuring advanced animations and dark mode aesthetics.", date: "Feb 2026", featured: true },
  { id: '4', name: "AI DASHBOARD", category: "DASHBOARD", tags: ["AI", "Data", "SaaS"], img: "https://images.unsplash.com/photo-1551288049-bbda38a5f452?q=80&w=2070&auto=format&fit=crop", description: "Data visualization dashboard for an AI monitoring tool.", date: "Jan 2025", featured: true },
  { id: '5', name: "CRYPTO WALLET", category: "UI/UX DESIGN", tags: ["Crypto", "Wallet", "Security"], img: "https://images.unsplash.com/photo-1621416848440-236914c244a5?q=80&w=1974&auto=format&fit=crop", description: "Minimalist mobile wallet for managing digital assets.", date: "Dec 2024", featured: true }
];

const DEFAULT_SERVICES: Service[] = [
  { id: '1', title: "BRANDING", tags: ["Logo Design", "Graphic", "Strategy"] },
  { id: '2', title: "UI/UX", tags: ["Web & App Design", "UX Research", "Design Systems"] },
  { id: '3', title: "FRAMER", tags: ["Web Development", "No-Code", "Fast Delivery"] },
  { id: '4', title: "AI CREATIVE ARTIST", tags: ["Generative Art", "Neural Styling", "Custom Prompts"] },
];

const DEFAULT_SKILLS = ['Figma', 'React', 'Tailwind', 'GSAP', 'Framer', 'Wireframing', 'User Research', 'Typography', 'HTML', 'Git'];

const EXPERIENCES = [
  { role: "UI/UX Developer Intern", company: "Bizz+ Labs", period: "Aug 2025 - Dec 2025", description: "Spearheaded interface design initiatives at the innovation arm. Focusing on data-driven design systems." },
  { role: "Product Designer", company: "Freelance", period: "2024 - Present", description: "Partnering with startups to build minimum viable products with a focus on usability and conversion." }
];

const EDUCATION = [
  { year: "2023 – 2027", title: "B.Tech CSE (Data Science)", subtitle: "SICET, Hyderabad", details: "CGPA: 7.43" },
  { year: "2021 – 2023", title: "Class XII", subtitle: "Nine Education Academy", details: "" },
  { year: "2020 – 2021", title: "SSC (Class X)", subtitle: "St. Mary’s Vidyaniketan high school", details: "CGPA: 10" }
];

// --- Helper Components ---

const Reveal: React.FC<{ children?: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(entry.target); } }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  return (
    <div ref={ref} className={`${className} transition-all duration-1000 ease-[cubic-bezier(0.17,0.55,0.55,1)] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const SectionHeader = ({ title, number, className = "" }: { title: string, number: string, className?: string }) => (
  <Reveal className={`w-full border-b border-white/10 pb-4 mb-12 flex items-end justify-between ${className}`}>
    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary uppercase">{title}</h2>
    <span className="text-lg md:text-xl font-display font-bold text-accent mb-2">{number}</span>
  </Reveal>
);

// --- Admin Dashboard UI ---
const AdminDashboard = ({ projects, services, skills, setProjects, setServices, setSkills, onClose }: any) => {
  const [tab, setTab] = useState('projects');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'shivaji2026') {
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Invalid Password');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 bg-background z-[2000] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-surface p-10 rounded-3xl border border-white/10 space-y-6 text-center">
          <div className="flex justify-center mb-4 text-accent"><Lock size={40} /></div>
          <h2 className="text-2xl font-display font-bold uppercase">Authorized Access</h2>
          <p className="text-xs text-secondary tracking-widest uppercase opacity-60">Enter password to manage site data</p>
          <input
            type="password"
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-center font-mono tracking-widest focus:border-accent outline-none"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className="text-red-500 text-[10px] font-bold tracking-widest uppercase">{error}</p>}
          <div className="flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">Cancel</button>
            <button type="submit" className="flex-1 py-4 bg-white text-black rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all">Unlock</button>
          </div>
        </form>
      </div>
    );
  }

  const handleUpdateProject = (id: string, updates: Partial<Project>) => {
    setProjects(projects.map((p: Project) => p.id === id ? { ...p, ...updates } : p));
  };

  return (
    <div className="fixed inset-0 bg-background z-[1000] overflow-y-auto p-6 md:p-12 font-sans selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <h1 className="text-2xl font-display font-bold uppercase">Admin Dashboard</h1>
          <button onClick={onClose} className="border border-white/20 px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors">Exit Dashboard</button>
        </div>

        <div className="flex gap-4 mb-8">
          <button onClick={() => setTab('projects')} className={`px-6 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase transition-all ${tab === 'projects' ? 'bg-white text-black' : 'border border-white/10 text-secondary'}`}>Projects</button>
          <button onClick={() => setTab('services')} className={`px-6 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase transition-all ${tab === 'services' ? 'bg-white text-black' : 'border border-white/10 text-secondary'}`}>Services</button>
          <button onClick={() => setTab('stack')} className={`px-6 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase transition-all ${tab === 'stack' ? 'bg-white text-black' : 'border border-white/10 text-secondary'}`}>Stack</button>
        </div>

        {tab === 'projects' ? (
          <div className="space-y-6">
            <button onClick={() => setProjects([{ id: Date.now().toString(), name: "Untitled Project", category: "WEB DESIGN", tags: ["Concept"], img: "", description: "", date: "2026", featured: true }, ...projects])} className="w-full py-4 border border-dashed border-white/10 rounded-xl flex items-center justify-center gap-2 text-secondary hover:text-white hover:border-white transition-all text-[10px] font-bold tracking-widest uppercase"><Plus size={14} /> Add New Project</button>
            <div className="grid grid-cols-1 gap-4 pb-20">
              {projects.map((p: Project) => (
                <div key={p.id} className="bg-surface/50 p-6 rounded-xl border border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <button onClick={() => handleUpdateProject(p.id, { featured: !p.featured })} className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${p.featured ? 'border-accent text-accent' : 'border-white/10 text-secondary'}`}>
                      {p.featured ? <Check size={12} /> : null} Featured
                    </button>
                    <button onClick={() => setProjects(projects.filter((pr: Project) => pr.id !== p.id))} className="text-secondary hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm font-bold w-full" value={p.name} onChange={(e) => handleUpdateProject(p.id, { name: e.target.value })} />
                    <input className="bg-white/5 border border-white/10 p-3 rounded-lg text-xs text-secondary w-full" value={p.tags?.join(', ') || ''} onChange={(e) => handleUpdateProject(p.id, { tags: e.target.value.split(',').map(t => t.trim()).filter(t => t !== '') })} />
                  </div>
                  <textarea className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-xs text-secondary" rows={2} value={p.description} onChange={(e) => handleUpdateProject(p.id, { description: e.target.value })} />
                </div>
              ))}
            </div>
          </div>
        ) : tab === 'services' ? (
          <div className="space-y-4 pb-20">
            {services.map((s: Service) => (
              <div key={s.id} className="bg-surface/50 p-6 rounded-xl border border-white/5 flex gap-4 items-center">
                <input className="flex-1 bg-white/5 border border-white/10 p-4 rounded-lg font-bold text-sm uppercase" value={s.title} onChange={(e) => setServices(services.map((ser: Service) => ser.id === s.id ? { ...ser, title: e.target.value.toUpperCase() } : ser))} />
                <input className="flex-1 bg-white/5 border border-white/10 p-4 rounded-lg text-xs text-secondary" value={s.tags.join(', ')} onChange={(e) => setServices(services.map((ser: Service) => ser.id === s.id ? { ...ser, tags: e.target.value.split(',').map(t => t.trim()) } : ser))} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6 pb-20">
            <div className="bg-surface/50 p-10 rounded-3xl border border-white/5">
              <label className="text-[10px] font-bold tracking-widest text-secondary uppercase mb-4 block">Edit Tech Stack (Comma Separated)</label>
              <textarea
                className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-lg font-display focus:border-accent outline-none min-h-[200px]"
                value={skills.join(', ')}
                onChange={(e) => setSkills(e.target.value.split(',').map(s => s.trim()).filter(s => s !== ''))}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- App Root ---

const App = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'home' | 'dashboard'>('home');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [navHoveredIdx, setNavHoveredIdx] = useState<number | null>(null);

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('shivaji_v10_projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('shivaji_v10_services');
    return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
  });
  const [skills, setSkills] = useState<string[]>(() => {
    const saved = localStorage.getItem('shivaji_v10_skills');
    return saved ? JSON.parse(saved) : DEFAULT_SKILLS;
  });

  useEffect(() => { localStorage.setItem('shivaji_v10_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('shivaji_v10_services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('shivaji_v10_skills', JSON.stringify(skills)); }, [skills]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => { clearTimeout(timer); window.removeEventListener('scroll', handleScroll); };
  }, []);

  if (loading) return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-[200]">
      <h1 className="text-4xl md:text-6xl font-display font-bold animate-pulse uppercase">
        <span className="text-accent">S</span>HI<span className="-mr-[0.05em]">V</span>AJI
      </h1>
    </div>
  );

  const displayedProjects = showAllProjects ? projects : projects.filter(p => p.featured).slice(0, 5);

  if (view === 'dashboard') return <AdminDashboard projects={projects} services={services} skills={skills} setProjects={setProjects} setServices={setServices} setSkills={setSkills} onClose={() => setView('home')} />;

  return (
    <div className="bg-background min-h-screen text-primary selection:bg-accent/40 selection:text-white font-sans overflow-x-hidden">

      {/* Navbar */}
      <header className="fixed top-6 inset-x-0 z-[60] flex justify-center px-4 md:px-6 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-[1050px] bg-black/80 backdrop-blur-3xl rounded-full p-2 pl-6 pr-2 flex items-center justify-between shadow-2xl ring-1 ring-white/10">
          <a href="#"
            onDoubleClick={() => setView('dashboard')}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-start group select-none pr-4 relative hover:scale-110 transition-transform duration-300">
            <span className="font-display font-extrabold text-lg text-white"><span className="text-accent">S</span>HI<span className="-mr-[0.05em]">V</span>AJI</span>
            <span className="text-accent font-bold text-[10px] absolute -right-0 -top-1 group-hover:rotate-90 transition-transform duration-300">+</span>
          </a>
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {['ABOUT', 'PROJECTS', 'SERVICES'].map((link, idx) => {
              let scale = 1;
              if (navHoveredIdx !== null) {
                if (navHoveredIdx === idx) scale = 1.5;
                else if (Math.abs(navHoveredIdx - idx) === 1) scale = 1.2;
              }
              return (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onMouseEnter={() => setNavHoveredIdx(idx)}
                  onMouseLeave={() => setNavHoveredIdx(null)}
                  style={{ transform: `scale(${scale})`, transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), color 0.3s ease' }}
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase inline-block ${navHoveredIdx === idx ? 'text-white' : 'text-white/40'}`}
                >
                  {link}
                </a>
              );
            })}
          </nav>
          <div className="hidden md:block w-32"></div>
          <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white"><Menu size={18} /></button>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-[1920px] mx-auto min-h-[95vh] flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>
          <Reveal className="w-full relative z-20">
            <h1 className="text-[16vw] leading-[0.75] font-display font-bold" style={{ transform: `translateX(${scrollY * 0.15}px)` }}>
              <span className="text-accent">S</span>HI<span className="-mr-[0.08em]">V</span>AJI
            </h1>
          </Reveal>
          <Reveal className="w-full flex justify-end relative z-10 -mt-2 md:-mt-10">
            <h1 className="text-[16vw] leading-[0.75] font-display font-bold text-outline-hero text-right" style={{ transform: `translateX(-${scrollY * 0.15}px)` }}>
              SURUGURU
            </h1>
          </Reveal>
          <style>{`
            .text-outline-hero { -webkit-text-stroke: 3px rgba(255,255,255,1); color: transparent; }
            @media (max-width: 768px) { .text-outline-hero { -webkit-text-stroke: 1.5px rgba(255,255,255,1); } }
          `}</style>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 md:px-12 max-w-[1920px] mx-auto">
          <SectionHeader title="PROJECTS" number="01" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {displayedProjects.map((p, idx) => (
              <Reveal key={p.id} className={`${idx % 3 === 0 ? 'md:col-span-2' : ''}`} delay={idx * 50}>
                <div className="group relative rounded-[2rem] overflow-hidden cursor-pointer border border-white/5 aspect-video md:aspect-[16/9] bg-surface">
                  <img src={p.img || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'} alt={p.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="flex gap-4">
                      {p.live && <a href={p.live} target="_blank" className="p-5 bg-white text-black rounded-full hover:bg-accent hover:text-white transition-all"><Globe size={22} /></a>}
                      {p.github && <a href={p.github} target="_blank" className="p-5 bg-white text-black rounded-full hover:bg-accent hover:text-white transition-all"><Github size={22} /></a>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-border pb-10 pt-8 gap-4">
                  <div>
                    <h3 className="text-4xl md:text-6xl font-display font-bold group-hover:text-accent transition-colors duration-300 uppercase">{p.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-5">
                      {p.tags?.map((tag, tIdx) => (
                        <span key={tIdx} className="px-4 py-1.5 rounded-full border border-white/10 text-[9px] tracking-[0.2em] text-secondary font-bold uppercase">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-white/40 group-hover:bg-accent group-hover:text-white transition-all duration-300 group-hover:rotate-45"><ArrowRight size={24} /></div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 w-full">
          <div className="px-6 md:px-12 max-w-[1920px] mx-auto">
            <SectionHeader title="SERVICES" number="02" />
          </div>
          <div className="flex flex-col">
            {services.map((s, idx) => (
              <Reveal key={s.id} delay={idx * 100} className="w-full">
                <div className="group relative border-t border-border w-full overflow-hidden cursor-pointer h-32 md:h-64 flex flex-col justify-center">
                  <div className="flex items-center justify-between w-full px-6 md:px-12 max-w-[1920px] mx-auto z-10 transition-all duration-500 group-hover:opacity-0">
                    <div className="flex gap-4 items-center">
                      {s.tags.slice(0, 3).map(t => (
                        <span key={t} className="text-[10px] font-bold tracking-[0.3em] text-secondary/40 uppercase whitespace-nowrap">{t}</span>
                      ))}
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-right uppercase">{s.title}</h2>
                  </div>
                  <div className="absolute inset-0 bg-accent flex flex-col justify-center items-center scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom ease-[cubic-bezier(0.7,0,0.3,1)] overflow-hidden">
                    <div className="ticker flex items-center whitespace-nowrap">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="inline-flex items-center">
                          <div className="flex flex-col items-center px-12 md:px-24">
                            <span className="text-5xl md:text-7xl lg:text-[7vw] font-display font-bold text-black uppercase leading-none">{s.title}</span>
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mt-3 opacity-70">
                              {s.tags.map((tag, tIdx) => (
                                <span key={tIdx} className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-black uppercase whitespace-nowrap">{tag}</span>
                              ))}
                            </div>
                          </div>
                          <span className="text-black/20 text-4xl md:text-6xl font-display">/</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-border"></div>
          </div>
        </section>

        {/* Experience Section - Alternating Minimal Rows */}
        <section id="experience" className="py-24 w-full">
          <div className="px-6 md:px-12 max-w-[1920px] mx-auto">
            <SectionHeader title="EXPERIENCE" number="03" />
          </div>
          <div className="flex flex-col">
            {EXPERIENCES.map((e, i) => (
              <Reveal key={i} delay={i * 100} className="w-full">
                <div className="group border-t border-border w-full py-16 md:py-24 hover:bg-surface/10 transition-colors">
                  <div className={`flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-12 max-w-[1920px] mx-auto gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Meta Data */}
                    <div className={`flex flex-col gap-4 ${i % 2 !== 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                      <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-[0.4em] bg-white/5 px-6 py-2 rounded-full">{e.period}</span>
                      <p className="text-secondary text-base font-bold tracking-[0.3em] uppercase opacity-60">{e.company}</p>
                    </div>
                    {/* Content */}
                    <div className={`flex flex-col ${i % 2 !== 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                      <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold uppercase group-hover:text-accent transition-colors duration-300">{e.role}</h3>
                      <p className="text-secondary leading-relaxed text-sm md:text-base opacity-70 mt-4 max-w-xl">{e.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-border"></div>
          </div>
        </section>

        {/* Education Section - Alternating Minimal Rows */}
        <section id="education" className="py-24 w-full">
          <div className="px-6 md:px-12 max-w-[1920px] mx-auto">
            <SectionHeader title="EDUCATION" number="04" />
          </div>
          <div className="flex flex-col">
            {EDUCATION.map((e, i) => (
              <Reveal key={i} delay={i * 100} className="w-full">
                <div className="group border-t border-border w-full py-16 md:py-24 hover:bg-surface/10 transition-colors">
                  <div className={`flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-12 max-w-[1920px] mx-auto gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`flex gap-4 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                      <span className="text-[10px] font-mono font-bold text-secondary uppercase tracking-[0.3em]">{e.year}</span>
                      <span className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">{e.subtitle}</span>
                    </div>
                    <h3 className={`text-3xl md:text-5xl lg:text-6xl font-display font-bold uppercase ${i % 2 !== 0 ? 'text-left' : 'text-right'}`}>{e.title}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-border"></div>
          </div>
        </section>

        {/* Stack Section - Minimal Floating Row Layout */}
        <section id="about" className="py-24 px-6 md:px-12 max-w-[1920px] mx-auto mb-24">
          <SectionHeader title="STACK" number="05" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-16 gap-x-8">
            {skills.map((skill, i) => (
              <Reveal key={skill} delay={i * 50} className="flex flex-col items-start group">
                <div className="w-full h-[1px] bg-white/10 mb-6 group-hover:bg-accent transition-all duration-700"></div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-all"></div>
                  <span className="text-xl md:text-2xl font-display font-bold uppercase text-secondary/60 group-hover:text-white transition-all transform group-hover:translate-x-2">{skill}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="relative pt-32 pb-16 px-6 md:px-12 max-w-[1920px] mx-auto border-t border-white/10">
        <div className="w-full mb-32">
          <Reveal>
            <h1 className="text-[18vw] font-display font-bold leading-[0.8] uppercase text-left select-none">
              <span className="text-accent">S</span>HI<span className="-mr-[0.08em]">V</span>AJI
            </h1>
          </Reveal>
        </div>
        <div className="w-full border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-secondary text-[10px] uppercase font-bold tracking-[0.6em] opacity-40">©2026 SHIVAJI DESIGN AGENCY — ALL RIGHTS RESERVED</p>
          <div className="flex gap-12">
            {[
              { icon: <Github size={22} />, url: "https://github.com/Shivaji-Suruguru" },
              { icon: <Linkedin size={22} />, url: "https://linkedin.com/in/shivaji-suruguru" },
              { icon: <Mail size={22} />, url: "mailto:shivaji@email.com" }
            ].map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noreferrer" className="text-secondary hover:text-white transition-all hover:scale-125">{s.icon}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
