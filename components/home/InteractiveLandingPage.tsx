"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { 
  Heart, Sparkles, BookOpen, Activity, 
  Leaf, Music, Users, ArrowRight, 
  Terminal, Mail, User, Phone, CheckCircle 
} from "lucide-react";

export default function InteractiveLandingPage() {
  const t = useTranslations("hero");
  const locale = useLocale();
  
  // Interactive States
  const [activeTab, setActiveTab] = useState("education");
  const [tabParticles, setTabParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [btnPull, setBtnPull] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // Terminal log state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  
  // Dial Hover state
  const [dialProgress, setDialProgress] = useState(40);
  
  // Stats state for count-up
  const [stats, setStats] = useState({ volunteers: 0, members: 0, events: 0, beneficiaries: 0 });
  
  // Sparkline data
  const [sparklineData, setSparklineData] = useState<number[]>([10, 15, 8, 20, 18, 30, 25, 45, 40, 60]);
  
  // Contact Form Feedback State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Terminal logs seed
  const logMessages = [
    "[INFO] Connecting to Supabase NGO Database...",
    "[SUCCESS] Secure connection established.",
    "[ACTION] Syncing volunteer applications from Varanasi...",
    "[UPDATE] Seva Mitra: 524 active volunteers logged.",
    "[INFO] Initiating Vedic Gurukul library expansion program...",
    "[SUCCESS] 500+ Sanskrit & modern textbooks distributed.",
    "[ACTION] Loading Ayurveda medical camp schedule...",
    "[CAMP] 120 patients diagnosed at Lanka, Varanasi camp today.",
    "[UPDATE] Water preservation drive initiated at Ganga banks.",
    "[SUCCESS] 1200+ saplings planted in monsoon campaign.",
    "[INFO] Fetching Banaras Gharana cultural preservation archive...",
    "[SUCCESS] Online music lessons launched for 80 young students.",
  ];

  // 3D Tilt handler
  const handleTiltMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Normalize values
    const tiltX = (y / (box.height / 2)) * -12; // tilt max 12deg
    const tiltY = (x / (box.width / 2)) * 12;
    setTilt({ x: tiltX, y: tiltY });
  };
  
  const handleTiltMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };
  
  // Magnetic Button
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const box = btn.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Pull factor
    setBtnPull({ x: x * 0.35, y: y * 0.35 });
  };
  
  const handleBtnMouseLeave = () => {
    setBtnPull({ x: 0, y: 0 });
  };

  // Sparkline updater
  useEffect(() => {
    const interval = setInterval(() => {
      setSparklineData(prev => {
        const nextData = [...prev.slice(1)];
        const lastVal = prev[prev.length - 1];
        const change = Math.floor(Math.random() * 21) - 10;
        const newVal = Math.max(5, Math.min(95, lastVal + change));
        nextData.push(newVal);
        return nextData;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Stats count up
  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      setStats({
        volunteers: Math.min(500, Math.floor((500 / steps) * currentStep)),
        members: Math.min(200, Math.floor((200 / steps) * currentStep)),
        events: Math.min(50, Math.floor((50 / steps) * currentStep)),
        beneficiaries: Math.min(1000, Math.floor((1000 / steps) * currentStep)),
      });
      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);
    return () => clearInterval(interval);
  }, []);

  // Terminal log simulation
  useEffect(() => {
    if (hoveredCard === "terminal") {
      const interval = setInterval(() => {
        setTerminalLogs(prev => {
          const nextLogs = [...prev];
          if (nextLogs.length > 5) nextLogs.shift();
          nextLogs.push(logMessages[logIndex]);
          return nextLogs;
        });
        setLogIndex(prev => (prev + 1) % logMessages.length);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hoveredCard, logIndex]);

  // Tab particle effect
  const handleTabClick = (tab: string, e: React.MouseEvent) => {
    setActiveTab(tab);
    
    // Create SVG particles
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const colors = ["#a855f7", "#ec4899", "#10b981", "#E07B39", "#C9920C"];
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() * 40 - 20),
      y: y + (Math.random() * 40 - 20),
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    setTabParticles(newParticles);
    setTimeout(() => {
      setTabParticles([]);
    }, 1000);
  };

  // Confetti canvas drawing
  useEffect(() => {
    if (formSubmitted && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 400;
      
      let particles: any[] = [];
      const colors = ["#a855f7", "#ec4899", "#10b981", "#E07B39", "#C9920C", "#3b82f6"];
      
      for (let i = 0; i < 150; i++) {
        particles.push({
          x: canvas.width / 2,
          y: canvas.height - 20,
          vx: Math.random() * 12 - 6,
          vy: Math.random() * -15 - 5,
          radius: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          gravity: 0.25,
          friction: 0.98
        });
      }
      
      let animationId: number;
      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
          p.vy += p.gravity;
          p.vx *= p.friction;
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.01;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fill();
          
          if (p.alpha <= 0) {
            particles.splice(index, 1);
          }
        });
        
        if (particles.length > 0) {
          animationId = requestAnimationFrame(render);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };
      
      render();
      return () => cancelAnimationFrame(animationId);
    }
  }, [formSubmitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 6000);
  };

  const getBilingualText = (hi: string, en: string) => {
    return locale === "hi" ? hi : en;
  };

  return (
    <div id="__next" className="relative min-h-screen text-slate-100 bg-[#070014] overflow-x-hidden font-sans">
      {/* Background neon mesh gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/15 blur-[120px] animate-drift"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-600/10 blur-[130px] animate-drift" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute top-[40%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-pink-600/10 blur-[120px] animate-drift" style={{ animationDelay: '-10s' }}></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Floating Header Navbar */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 bg-white/5 flex items-center justify-center">
              <img src="/images/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="block text-gradient-neon font-bold text-sm tracking-wider font-mono">
                {getBilingualText("सेवार्थ पथ संस्थानम्", "SEWARTH PATH")}
              </span>
              <span className="block text-xs text-slate-400 font-mono tracking-widest uppercase">
                {getBilingualText("सत्यं सेवा सुंदरम्", "Sansthanam")}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-mono tracking-wider">
            <Link href={`/${locale}/about`} className="text-slate-300 hover:text-white transition-colors">{getBilingualText("हमारे बारे में", "About")}</Link>
            <Link href={`/${locale}/programs`} className="text-slate-300 hover:text-white transition-colors">{getBilingualText("कार्यक्रम", "Programs")}</Link>
            <Link href={`/${locale}/events`} className="text-slate-300 hover:text-white transition-colors">{getBilingualText("आयोजन", "Events")}</Link>
            <Link href={`/${locale}/membership`} className="text-slate-300 hover:text-white transition-colors">{getBilingualText("सदस्यता", "Membership")}</Link>
            <Link href={`/${locale}/contact`} className="text-slate-300 hover:text-white transition-colors">{getBilingualText("संपर्क", "Contact")}</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              href={locale === "hi" ? `/en` : `/hi`} 
              className="text-xs font-bold font-mono px-3 py-1.5 rounded-full border border-white/10 hover:border-purple-500 transition-all duration-300 text-purple-400 hover:bg-purple-500/10"
            >
              {locale === "hi" ? "ENGLISH" : "हिन्दी"}
            </Link>
            <Link 
              href={`/${locale}/donate`}
              className="relative hidden sm:inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-mono font-bold text-white rounded-lg group bg-gradient-to-br from-purple-600 to-pink-500 group-hover:from-purple-600 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-800"
            >
              <span className="relative px-4 py-2 transition-all duration-75 bg-slate-950 rounded-md group-hover:bg-opacity-0">
                {getBilingualText("अभी दान करें 🧡", "DONATE NOW 🧡")}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero Container */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center justify-center text-center">
        {/* Registration Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-light border-purple-500/30 text-purple-400 text-xs font-mono tracking-wider mb-8 animate-pulse-slow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{getBilingualText("पंजीकरण संख्या 202200996052093", "Reg No. 202200996052093 | Indian Trusts Act")}</span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black font-mono tracking-tight text-white mb-6 leading-none">
          <span className="block text-gradient-neon filter drop-shadow-[0_0_30px_rgba(168,85,247,0.35)]">
            {getBilingualText("सेवार्थ पथ संस्थानम्", "SEWARTH PATH")}
          </span>
          <span className="block text-2xl sm:text-4xl md:text-5xl text-slate-300 font-light mt-3 tracking-widest">
            {getBilingualText("सेवा परमो धर्मः", "SERVICE IS THE HIGHEST DHARMA")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-slate-400 text-base sm:text-lg md:text-xl font-light mb-12 leading-relaxed font-mono">
          {getBilingualText(
            "संपूर्ण भारत में शिक्षा, स्वास्थ्य, सामाजिक कल्याण और सांस्कृतिक संरक्षण के लिए कार्यरत एक पंजीकृत सार्वजनिक धर्मार्थ ट्रस्ट। एको अहं द्वितीयो नास्ति — मैं एक हूं, दूसरा नहीं है।",
            "A registered public charitable trust working for education, health, social welfare, and cultural preservation across India. Eko Aham Dwitiyo Nasti — I am One, There is No Second."
          )}
        </p>

        {/* Floating 3D Tilt Console */}
        <div 
          className="relative w-full max-w-3xl glass-panel rounded-2xl p-8 mb-16 cursor-grab active:cursor-grabbing select-none transition-all duration-300 ease-out glow-purple"
          onMouseMove={handleTiltMouseMove}
          onMouseLeave={handleTiltMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
            transition: hoveredCard ? 'none' : 'transform 0.5s ease-out',
          }}
        >
          {/* Neon Border */}
          <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>

          {/* Console Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <span className="text-xs font-mono text-slate-500">sevarth-console-v2.0.4.sh</span>
            <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            </div>
          </div>

          {/* Console Content */}
          <div className="text-left font-mono space-y-4">
            <p className="text-purple-400 text-sm sm:text-base">
              &gt; {getBilingualText("न्यास संकल्प:", "Trust Resolution:")}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-purple-500 pl-4 py-1 italic">
              {getBilingualText(
                "\"हम निर्धन और पिछड़े वर्गों के सशक्तिकरण, वैदिक ज्ञान के संरक्षण तथा स्वास्थ्य सेवाओं को समाज के अंतिम व्यक्ति तक पहुँचाने के लिए प्रतिबद्ध हैं।\"",
                "\"We are committed to empowering marginalized communities, preserving Vedic knowledge, and delivering high-quality healthcare to the last mile of society.\""
              )}
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-3 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">#Education</span>
              <span className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">#Ayurveda</span>
              <span className="px-3 py-1 rounded bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold">#BanarasGharana</span>
              <span className="px-3 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">#Gaushala</span>
            </div>
          </div>
        </div>

        {/* Magnetic CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          <Link 
            href={`/${locale}/donate`}
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={handleBtnMouseLeave}
            style={{
              transform: `translate3d(${btnPull.x}px, ${btnPull.y}px, 0)`,
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-mono font-bold text-sm tracking-wider rounded-xl overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]"
          >
            {/* sweeping light-streak reflection */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -left-full group-hover:animate-shine"></span>
            <Heart className="w-4 h-4 fill-white group-hover:scale-125 transition-transform" />
            <span>{getBilingualText("दान करें • MAKE A DIFFERENCE", "DONATE NOW • MAKE A DIFFERENCE")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link 
            href={`/${locale}/volunteer`}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 hover:border-purple-500/50 text-slate-300 hover:text-white font-mono text-sm tracking-wider rounded-xl transition-all duration-300"
          >
            <span>{getBilingualText("स्वयंसेवक बनें", "JOIN AS VOLUNTEER")}</span>
          </Link>
        </div>
      </section>

      {/* Bento Grid Layout Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-center font-mono font-bold text-3xl sm:text-4xl text-white mb-16 tracking-wide">
          {getBilingualText("।। संगठित कार्य, जीवंत प्रभाव ।।", "|| WORK OVERVIEW & ACTIVE DATA ||")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Stats Tracker */}
          <div 
            className={`glass-panel rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] ${hoveredCard === "stats" ? 'glow-purple border-purple-500/40 bg-purple-950/10' : ''}`}
            onMouseEnter={() => setHoveredCard("stats")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex justify-between items-start mb-6">
              <span className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                <Users className="w-6 h-6" />
              </span>
              <span className="text-[10px] font-mono text-slate-500">live-stats-sync.log</span>
            </div>

            <h3 className="text-lg font-mono font-bold mb-4">{getBilingualText("सक्रिय प्रभाव ट्रैकर", "Active Impact Tracker")}</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-2xl font-black text-purple-400 font-mono">{stats.volunteers}+</p>
                <p className="text-xs text-slate-400 font-mono">{getBilingualText("स्वयंसेवक", "Volunteers")}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-pink-400 font-mono">{stats.members}+</p>
                <p className="text-xs text-slate-400 font-mono">{getBilingualText("सदस्य", "Members")}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-400 font-mono">{stats.beneficiaries}+</p>
                <p className="text-xs text-slate-400 font-mono">{getBilingualText("लाभार्थी", "Lives Touched")}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-yellow-400 font-mono">{stats.events}+</p>
                <p className="text-xs text-slate-400 font-mono">{getBilingualText("आयोजन", "Events Held")}</p>
              </div>
            </div>

            {/* Sparkline mini-graph */}
            <div className="pt-2 border-t border-white/5">
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-2">
                <span>{getBilingualText("सहभागिता दर", "Engagement Index")}</span>
                <span className="text-purple-400">Live Updating</span>
              </div>
              <div className="h-12 w-full flex items-end">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d={`M ${sparklineData.map((val, idx) => `${(idx / (sparklineData.length - 1)) * 100} ${100 - val}`).join(" L ")}`}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3"
                    className="transition-all duration-500 ease-in-out"
                  />
                  <path
                    d={`M 0 100 L ${sparklineData.map((val, idx) => `${(idx / (sparklineData.length - 1)) * 100} ${100 - val}`).join(" L ")} L 100 100 Z`}
                    fill="url(#sparkline-grad)"
                    className="transition-all duration-500 ease-in-out"
                  />
                  <defs>
                    <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2: Dial Card */}
          <div 
            className={`glass-panel rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] ${hoveredCard === "dial" ? 'glow-emerald border-emerald-500/40 bg-emerald-950/10' : ''}`}
            onMouseEnter={() => {
              setHoveredCard("dial");
              setDialProgress(85);
            }}
            onMouseLeave={() => {
              setHoveredCard(null);
              setDialProgress(40);
            }}
          >
            <div className="flex justify-between items-start mb-6">
              <span className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Activity className="w-6 h-6" />
              </span>
              <span className="text-[10px] font-mono text-slate-500">fund-allocation.radar</span>
            </div>

            <h3 className="text-lg font-mono font-bold mb-2">{getBilingualText("वित्तीय दक्षता सूचकांक", "Financial Allocation")}</h3>
            <p className="text-xs text-slate-400 font-mono mb-6 leading-relaxed">
              {getBilingualText(
                "हमारे प्राप्त दान का 85% से अधिक भाग जमीनी स्तर पर सेवा कार्यों जैसे शिक्षा, निःशुल्क चिकित्सा एवं अन्नदान शिविरों में व्यय होता है।",
                "Over 85% of our donations directly fund grassroots programs, including Vedic schools, libraries, medical drives, and environment protection."
              )}
            </p>

            <div className="flex justify-center items-center py-2 relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="50" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="64" cy="64" r="50" 
                  stroke="#10b981" strokeWidth="8" fill="transparent" 
                  strokeDasharray="314.16"
                  strokeDashoffset={314.16 - (314.16 * dialProgress) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col justify-center items-center font-mono">
                <span className="text-2xl font-bold text-white">{dialProgress}%</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest">{getBilingualText("सेवा व्यय", "Direct Seva")}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Live Tech Stack / Seva Terminal */}
          <div 
            className={`glass-panel rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] ${hoveredCard === "terminal" ? 'glow-pink border-pink-500/40 bg-pink-950/10' : ''}`}
            onMouseEnter={() => setHoveredCard("terminal")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex justify-between items-start mb-6">
              <span className="p-3 rounded-lg bg-pink-500/10 text-pink-400">
                <Terminal className="w-6 h-6" />
              </span>
              <span className="text-[10px] font-mono text-slate-500">live-action.sh</span>
            </div>

            <h3 className="text-lg font-mono font-bold mb-1">{getBilingualText("संस्थान लाइव कंसोल", "NGO Operations Terminal")}</h3>
            <p className="text-xs text-slate-400 font-mono mb-4">
              {getBilingualText(
                "कार्यवाही ट्रैक करने के लिए इस कार्ड पर माउस लाएँ।",
                "Hover here to synchronize with live NGO updates."
              )}
            </p>

            <div className="bg-black/40 rounded-lg p-4 font-mono text-[11px] h-36 overflow-hidden border border-white/5 space-y-1.5 text-pink-400/90">
              {terminalLogs.length === 0 ? (
                <div className="text-slate-500 animate-pulse">&gt; {getBilingualText("टर्मिनल निष्क्रिय। हिलाएँ...", "System idle. Hover card to sync...")}</div>
              ) : (
                terminalLogs.map((log, idx) => (
                  <div key={idx} className="whitespace-nowrap overflow-hidden text-ellipsis">
                    &gt; {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Feature Showcase Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-center font-mono font-bold text-3xl sm:text-4xl text-white mb-6 tracking-wide">
          {getBilingualText("।। हमारे मुख्य कार्यक्षेत्र ।।", "|| MAJOR FOCUS AREAS ||")}
        </h2>
        <p className="text-center text-slate-400 font-mono text-sm max-w-xl mx-auto mb-16 leading-relaxed">
          {getBilingualText(
            "सेवार्थ पथ संस्थानम् विभिन्न क्षेत्रों में समाज कल्याण हेतु समर्पित है। कार्यक्षेत्र देखने के लिए नीचे दिए गए बटनों पर क्लिक करें।",
            "Exploring our dedicated branches of operations. Click a tab to see details of our projects."
          )}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: "education", icon: BookOpen, labelHi: "शिक्षा & गुरुकुल", labelEn: "Education & Vedic" },
            { id: "health", icon: Activity, labelHi: "चिकित्सा शिविर", labelEn: "Healthcare Camps" },
            { id: "culture", icon: Music, labelHi: "कला & संस्कृति", labelEn: "Culture & Music" },
            { id: "environment", icon: Leaf, labelHi: "गौशाला & प्रकृति", labelEn: "Gaushala & Nature" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={(e) => handleTabClick(tab.id, e)}
              className={`flex items-center gap-2 px-6 py-3 font-mono text-xs font-bold tracking-wider rounded-lg border transition-all duration-300 relative overflow-hidden ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "bg-white/5 text-slate-400 border-white/5 hover:border-purple-500/30 hover:bg-white/10"
              }`}
            >
              <tab.icon className="w-4 h-4 text-purple-400" />
              <span>{getBilingualText(tab.labelHi, tab.labelEn)}</span>
              
              {/* Tab particles on click */}
              {activeTab === tab.id && tabParticles.map(p => (
                <span
                  key={p.id}
                  className="absolute w-1.5 h-1.5 rounded-full pointer-events-none animate-ping"
                  style={{
                    left: p.x,
                    top: p.y,
                    backgroundColor: p.color,
                  }}
                />
              ))}
            </button>
          ))}
        </div>

        {/* Morphing Feature Card */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto border-purple-500/10 shadow-2xl relative overflow-hidden">
          {/* Neon corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-500/40 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/40 rounded-br-3xl"></div>

          {activeTab === "education" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-2">Branch 01 // Gurukul System</span>
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white mb-4">
                  {getBilingualText("वैदिक गुरुकुल एवं पुस्तकालय", "Vedic Gurukuls & Libraries")}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-mono mb-6">
                  {getBilingualText(
                    "हम बच्चों को निःशुल्क वैदिक शिक्षा के साथ-साथ आधुनिक तकनीकी एवं व्यावसायिक प्रशिक्षण प्रदान करते हैं। वाराणसी के ग्रामीण क्षेत्रों में निःशुल्क पुस्तकालयों का संचालन किया जाता है ताकि हर मेधावी को संसाधन मिल सकें।",
                    "Synthesizing ancient wisdom with modern tech. We fund and support Vedic Gurukuls alongside organizing computer literacy and vocational training for underprivileged students across Varanasi region."
                  )}
                </p>
                <ul className="text-slate-300 font-mono text-xs space-y-2 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-purple-500" /> {getBilingualText("३ सक्रिय वैदिक गुरुकुल", "3 Active Vedic Gurukuls supported")}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-purple-500" /> {getBilingualText("५०००+ पुस्तकें निःशुल्क उपलब्ध", "5,000+ free reference books distributed")}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-purple-500" /> {getBilingualText("ग्रामीण तकनीकी केंद्र संचालन", "Tech training programs for rural youths")}</li>
                </ul>
              </div>
              <div className="w-full h-64 rounded-xl overflow-hidden border border-white/10">
                <img src="/img1.png" alt="Education" className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          )}

          {activeTab === "health" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2">Branch 02 // Medical Camps</span>
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white mb-4">
                  {getBilingualText("निःशुल्क चिकित्सा एवं आयुर्वेद शिविर", "Free Health Camps & Ayurveda")}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-mono mb-6">
                  {getBilingualText(
                    "ग्रामीण और मलिन बस्तियों में अनुभवी डॉक्टरों द्वारा निःशुल्क स्वास्थ्य जांच, योग शिविर और आयुर्वेदिक जड़ी-बूटियों का वितरण किया जाता है। साथ ही दिव्यांगों को सहायक उपकरण उपलब्ध कराए जाते हैं।",
                    "Bringing quality healthcare to marginalized settlements. We hold free diagnostic campaigns, distribute free medicines and Ayurveda remedies, and organize holistic Yoga camps to cultivate physical and mental wellness."
                  )}
                </p>
                <ul className="text-slate-300 font-mono text-xs space-y-2 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> {getBilingualText("१५+ वार्षिक विशाल स्वास्थ्य शिविर", "15+ major healthcare camps held annually")}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> {getBilingualText("१०००+ निःशुल्क दवा वितरण", "Free Ayurveda & modern medicine for 1,000+ individuals")}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> {getBilingualText("योग एवं प्राकृतिक चिकित्सा प्रसार", "Yoga education camps led by experts")}</li>
                </ul>
              </div>
              <div className="w-full h-64 rounded-xl overflow-hidden border border-white/10">
                <img src="/img2.png" alt="Healthcare" className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          )}

          {activeTab === "culture" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono text-pink-400 uppercase tracking-widest block mb-2">Branch 03 // Sanatan & Music</span>
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white mb-4">
                  {getBilingualText("भारतीय संस्कृति एवं बनारस घराना संगीत", "Sanatan Culture & Banaras Gharana")}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-mono mb-6">
                  {getBilingualText(
                    "काशी की समृद्ध सांस्कृतिक संगीत धरोहर (बनारस घराना) को जीवित रखने के लिए युवाओं को शास्त्रीय संगीत, वाद्य यंत्र वादन और वैदिक मंत्रोच्चार का निःशुल्क प्रशिक्षण दिया जाता है।",
                    "Sustaining Kashi's classical music legacy. We provide free training in classical vocals, tabla, sitar, and flute under the Guru-Shishya tradition, safeguarding the Banaras Gharana style and Vedic oral chants."
                  )}
                </p>
                <ul className="text-slate-300 font-mono text-xs space-y-2 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-pink-500" /> {getBilingualText("शास्त्रीय संगीत कक्षाएं", "Free music classes for deserving students")}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-pink-500" /> {getBilingualText("वैदिक मंत्रोच्चार प्रतियोगिताएं", "Vedic chanting and Sanskrit competitions")}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-pink-500" /> {getBilingualText("कलाकार आर्थिक सहायता योजना", "Direct support scheme for aging local artists")}</li>
                </ul>
              </div>
              <div className="w-full h-64 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-purple-950/20">
                <Music className="w-24 h-24 text-pink-500/50 animate-float-slow" />
              </div>
            </div>
          )}

          {activeTab === "environment" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest block mb-2">Branch 04 // Organic & Gaushala</span>
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white mb-4">
                  {getBilingualText("जैविक खेती, गौशाला एवं वृक्षारोपण", "Organic Farming & Gaushalas")}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-mono mb-6">
                  {getBilingualText(
                    "पर्यावरण संरक्षण के तहत हम गंगा किनारे वृक्षारोपण अभियान चलाते हैं। साथ ही लावारिस एवं बीमार गौवंश के आश्रय हेतु गौशालाओं की स्थापना और जैविक कृषि प्रसार का कार्य किया जाता है।",
                    "Healing the planet via localized actions. We plant broad-canopy trees on the banks of Ganga, run dedicated shelters (Gaushalas) for stray and injured cows, and promote ancient Vedic organic farming methods."
                  )}
                </p>
                <ul className="text-slate-300 font-mono text-xs space-y-2 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-yellow-500" /> {getBilingualText("१२००+ पौधे प्रतिवर्ष रोपण", "1,200+ native saplings planted along banks")}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-yellow-500" /> {getBilingualText("गो-वंश सेवा एवं चिकित्सा", "Dedicated fodder & vet support for Gaushalas")}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-yellow-500" /> {getBilingualText("कृषक प्रशिक्षण संगोष्ठियां", "Ayurvedic bio-pesticide training for farmers")}</li>
                </ul>
              </div>
              <div className="w-full h-64 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-emerald-950/20">
                <Leaf className="w-24 h-24 text-yellow-500/50 animate-float-medium" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Contact & Confetti Engagement */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-white/10 glow-purple">
          {/* Confetti canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none"></canvas>

          {formSubmitted ? (
            <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white mb-2">
                {getBilingualText("धन्यवाद! संदेश प्राप्त हुआ।", "Dhanyavad! Message Received.")}
              </h3>
              <p className="text-slate-400 font-mono text-xs max-w-md">
                {getBilingualText(
                  "सेवार्थ पथ की टीम जल्द ही आपसे संपर्क करेगी। हम आपके सहयोग की सराहना करते हैं।",
                  "Our coordinators will get back to you shortly. Thank you for taking a step on the path of Seva."
                )}
              </p>
            </div>
          ) : (
            <div className="relative z-10">
              <h2 className="text-center font-mono font-bold text-2xl sm:text-3xl text-white mb-4 tracking-wide">
                {getBilingualText("।। संपर्क करें एवं सहयोग दें ।।", "|| CONNECT WITH US ||")}
              </h2>
              <p className="text-center text-slate-400 font-mono text-xs max-w-lg mx-auto mb-10">
                {getBilingualText(
                  "क्या आप स्वयंसेवा करना चाहते हैं या ट्रस्ट से संबंधित कोई जिज्ञासा है? हमें लिखें।",
                  "Have queries about donations, memberships, or volunteering? Let's talk."
                )}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="relative group">
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                      placeholder={getBilingualText("आपका नाम", "Your Full Name")}
                    />
                    <User className="absolute right-4 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  {/* Email field */}
                  <div className="relative group">
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                      placeholder={getBilingualText("ईमेल आईडी", "Email Address")}
                    />
                    <Mail className="absolute right-4 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {/* Phone field */}
                  <div className="relative group">
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                      placeholder={getBilingualText("मोबाइल नंबर", "Phone Number")}
                    />
                    <Phone className="absolute right-4 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  </div>

                  {/* Message field */}
                  <div className="relative group">
                    <textarea 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 resize-none"
                      placeholder={getBilingualText("आपका संदेश...", "Your Message / Query details...")}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-mono font-bold text-sm tracking-wider rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] cursor-pointer"
                >
                  {getBilingualText("संदेश भेजें ⚡ SEND SECURE MESSAGE", "SEND MESSAGE ⚡ SUBMIT INTERACTION")}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Futuristic Glassmorphic Footer */}
      <footer className="relative z-10 glass-panel border-t border-white/5 py-12 text-slate-400 text-center font-mono text-xs">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-left">
            <span className="block text-gradient-neon font-bold text-sm mb-2">SEWARTH PATH SANSTHANM</span>
            <span className="block text-[10px] leading-relaxed text-slate-500">
              Registered Public Charitable Trust. Contributions to the General Seva fund are utilized in compliance with the Indian Trusts Act 1882.
            </span>
          </div>

          <div className="flex justify-center gap-6 text-slate-300">
            <Link href={`/${locale}/about`} className="hover:text-purple-400 transition-colors">{getBilingualText("के बारे में", "About")}</Link>
            <Link href={`/${locale}/programs`} className="hover:text-purple-400 transition-colors">{getBilingualText("कार्यक्षेत्र", "Programs")}</Link>
            <Link href={`/${locale}/donate`} className="hover:text-purple-400 transition-colors">{getBilingualText("दान", "Donate")}</Link>
            <Link href={`/${locale}/membership`} className="hover:text-purple-400 transition-colors">{getBilingualText("सदस्यता", "Members")}</Link>
          </div>

          <div className="text-right text-[10px] text-slate-500">
            <p className="mb-1">© 2026 Sewarth Path Sansthanam. All rights reserved.</p>
            <p>Designed with Glassmorphic Premium Language.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
