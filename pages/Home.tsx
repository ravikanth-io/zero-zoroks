import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROFILE, SKILLS, PROJECTS, CERTIFICATIONS } from '../constants';
import { TerminalIcon, DownloadIcon, ShieldIcon, ServerIcon, CrosshairIcon, LockIcon, ActivityIcon } from '../components/Icons'; 

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState('');
  const [bootSequence, setBootSequence] = useState<string[]>([]);
  const [glitchIndex, setGlitchIndex] = useState(0);

  // Upendra-style "I" concepts
  const words = ["am Zero.", "am One.", "am the Error.", "am the Fix.", "am Ravikanth."];

  // Typewriter Effect for Hero Text
  useEffect(() => {
    let currentWordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentWord = words[currentWordIndex];
      
      if (isDeleting) {
        setTypedText(currentWord.substring(0, charIndex - 1));
        charIndex--;
        typingSpeed = 50;
      } else {
        setTypedText(currentWord.substring(0, charIndex + 1));
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % words.length;
        typingSpeed = 500; // Pause before new word
      }

      setTimeout(type, typingSpeed);
    };

    const timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Unique "Cyber Deck" Boot Sequence
  useEffect(() => {
    const steps = [
      "Initializing core systems...",
      "Bypassing perimeter firewalls...",
      "Establishing encrypted uplink...",
      "Handshake successful [200 OK]",
      "Loading user profile: RK",
      "Access granted. Welcome, Operator."
    ];
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < steps.length) {
        setBootSequence(prev => [...prev, steps[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Network Topology Animation (Refined)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {x: number, y: number, vx: number, vy: number, size: number}[] = [];
    
    // Performance optimization: Adjust counts based on screen size
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 60; // Reduced count for cleaner look & performance
    const connectionDistance = isMobile ? 100 : 140;

    const init = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || window.innerWidth;
      canvas.height = rect?.height || window.innerHeight;

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // Slower, more floating velocity
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.5 + 0.5
        });
      }
    };

    const animate = () => {
      const isDark = document.documentElement.classList.contains('dark');
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Theme-aware colors with lower opacity for subtlety
      const particleFill = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)';
      const lineStrokeBase = isDark ? '0, 255, 65' : '100, 116, 139'; // Cyber green (dark) or Slate (light)

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        // Smooth bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleFill;
        ctx.fill();

        // Draw connections
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const connDistSq = connectionDistance * connectionDistance;

          if (distSq < connDistSq) {
            // Calculate opacity based on distance
            const opacity = (1 - distSq / connDistSq) * 0.15; // Max opacity 0.15
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineStrokeBase}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleDownloadResume = () => {
    const resumeContent = `
${PROFILE.name.toUpperCase()}
${PROFILE.role}

CONTACT
-------
Email: ${PROFILE.email}
LinkedIn: https://${PROFILE.linkedin}
GitHub: https://${PROFILE.github}
Location: ${PROFILE.location}

PROFILE
-------
${PROFILE.bio}

SKILLS
------
${SKILLS.map(s => `${s.category}:\n  ${s.items.join(', ')}`).join('\n')}

PROJECTS
--------
${PROJECTS.map(p => `${p.title}\n  ${p.description}\n  Tech: ${p.tags.join(', ')}`).join('\n\n')}

CERTIFICATIONS
--------------
${CERTIFICATIONS.map(c => `${c.name}\n  Issuer: ${c.issuer}\n  Date: ${c.date}`).join('\n\n')}
    `.trim();

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${PROFILE.name.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col w-full">
      <style>{`
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
        .glitch-text {
          animation: glitch 2.5s infinite;
        }
        .glitch-hover:hover {
          animation: glitch 0.3s infinite;
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative flex min-h-[90vh] items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-gray-200 dark:border-cyber-border bg-cream dark:bg-cyber-dark transition-colors duration-300">
        
        {/* Network Topology Background */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 pointer-events-none z-0"
        />
        
        <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center py-12">
          <div className="animate-in slide-in-from-left duration-700 flex flex-col justify-center">
            
            {/* Unique Cyber Deck Boot Sequence */}
            <div className="bg-black/90 rounded-md border border-cyber-border p-3 mb-8 w-full max-w-md font-mono text-xs shadow-2xl backdrop-blur-md">
              <div className="flex gap-1.5 mb-2 border-b border-gray-800 pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span className="ml-2 text-gray-500">term://boot.sh</span>
              </div>
              <div className="space-y-1 h-24 overflow-hidden flex flex-col justify-end">
                 {bootSequence.map((line, i) => (
                    <div key={i} className={`${i === bootSequence.length - 1 ? 'text-cyber-green' : 'text-gray-400'}`}>
                      <span className="text-gray-600 mr-2">➜</span>
                      {line}
                    </div>
                 ))}
                 <div className="animate-pulse text-cyber-green">_</div>
              </div>
            </div>

            {/* UPENDRA STYLE HERO TEXT - "I" CONCEPT */}
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-none">
              <span className="text-cyber-green inline-block hover:scale-110 transition-transform cursor-pointer">I</span>
              <br />
              <span className="text-4xl md:text-5xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-900 dark:from-gray-400 dark:to-white font-normal mt-2 block h-[1.2em]">
                 {typedText}<span className="text-cyber-green animate-pulse">_</span>
              </span>
            </h1>
            
            {/* Optimized Alignment & Description - Bold, Philosophical */}
            <div className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl leading-relaxed space-y-6">
              <div className="border-l-4 border-cyber-green pl-6 py-2">
                <p className="font-bold italic text-xl md:text-2xl text-gray-900 dark:text-white mb-2">
                  "Confusing the Enemy is the First Step to Security."
                </p>
                <p className="text-base font-mono opacity-80">
                  I don't just write code; I orchestrate chaos to find order. Standing at the intersection where AI meets the firewall.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link 
                to="/projects"
                className="px-8 py-4 bg-cyber-green text-black font-bold text-lg rounded hover:bg-green-400 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] flex items-center gap-2 shadow-lg shadow-green-500/20 uppercase tracking-widest"
              >
                <TerminalIcon className="w-5 h-5" />
                Analyze Me
              </Link>
              <button 
                onClick={handleDownloadResume}
                className="px-8 py-4 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-bold text-lg rounded hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-105 flex items-center gap-2 uppercase tracking-widest"
              >
                <DownloadIcon className="w-5 h-5" />
                Extract Data
              </button>
            </div>

            {/* Key Skills & Focus Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-gray-200 dark:border-cyber-border/50 pt-8 w-full">
              {/* Key Skills */}
              <div>
                 <h3 className="text-xs font-mono font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <ActivityIcon className="w-4 h-4 text-cyber-green" />
                    Weapons of Choice
                 </h3>
                 <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 font-mono group cursor-default">
                       <div className="p-1.5 rounded bg-cream-100 dark:bg-cyber-gray border border-gray-200 dark:border-cyber-border group-hover:border-cyber-green transition-colors">
                          <ShieldIcon className="w-4 h-4 text-cyber-green" />
                       </div>
                       <span className="group-hover:text-cyber-green transition-colors">SOC Operations & SIEM</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 font-mono group cursor-default">
                       <div className="p-1.5 rounded bg-cream-100 dark:bg-cyber-gray border border-gray-200 dark:border-cyber-border group-hover:border-cyber-green transition-colors">
                          <CrosshairIcon className="w-4 h-4 text-blue-500" />
                       </div>
                       <span className="group-hover:text-blue-400 transition-colors">Ethical Hacking & Pentesting</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 font-mono group cursor-default">
                       <div className="p-1.5 rounded bg-cream-100 dark:bg-cyber-gray border border-gray-200 dark:border-cyber-border group-hover:border-cyber-green transition-colors">
                          <ServerIcon className="w-4 h-4 text-purple-500" />
                       </div>
                       <span className="group-hover:text-purple-400 transition-colors">Network Forensics</span>
                    </div>
                 </div>
              </div>

              {/* Current Focus */}
              <div>
                 <h3 className="text-xs font-mono font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <LockIcon className="w-4 h-4 text-blue-500" />
                    Target Locked
                 </h3>
                 <div className="bg-white/60 dark:bg-cyber-gray/40 rounded-lg p-4 border border-gray-200 dark:border-cyber-border/50 backdrop-blur-sm shadow-sm hover:border-cyber-green/50 transition-colors group">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                      Hunting down vulnerabilities in <span className="text-cyber-green font-medium">Cloud Architectures</span> (AWS/Azure) and teaching machines to catch thieves using <span className="text-gray-900 dark:text-white font-medium">Python & PowerShell</span>.
                    </p>
                 </div>
              </div>
            </div>

          </div>
          
          <div className="relative group animate-in slide-in-from-right duration-700 delay-100 flex justify-center md:justify-end">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyber-green to-teal-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 w-full max-w-md h-full"></div>
            <div className="relative bg-white dark:bg-cyber-gray rounded-lg border border-gray-200 dark:border-cyber-border p-2 shadow-xl max-w-md w-full overflow-hidden">
                {/* Image overlay effect */}
                <div className="absolute inset-0 bg-cyber-green/10 mix-blend-overlay z-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 z-20 pointer-events-none"></div>
                
                <img 
                  src="https://picsum.photos/800/800?grayscale&blur=1" 
                  alt="System Terminal" 
                  className="rounded bg-gray-100 dark:bg-black w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                />
                
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur border border-gray-200 dark:border-cyber-border p-4 rounded text-xs font-mono text-green-600 dark:text-green-400 z-30 shadow-lg">
                  <div className="flex justify-between items-center mb-2 border-b border-gray-300 dark:border-gray-800 pb-2">
                    <span className="font-bold">SYSTEM_MONITOR</span>
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </div>
                  <p className="mb-1">$ user: {PROFILE.name.toLowerCase().replace(/\s+/g, '_')}</p>
                  <p className="mb-1">$ role: {PROFILE.role}</p>
                  <p>$ status: <span className="animate-pulse">tracking_signal...</span></p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Profile Section */}
      <div className="w-full bg-black py-16 sm:py-24 border-b border-cyber-border relative overflow-hidden group">
         {/* Grid Background Effect */}
         <div className="absolute inset-0 opacity-20" 
              style={{ backgroundImage: 'linear-gradient(#30363d 1px, transparent 1px), linear-gradient(90deg, #30363d 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
         </div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl overflow-hidden border border-cyber-border/50 shadow-2xl">
               {/* Cinematic Image */}
               <img 
                  src="https://picsum.photos/1920/1080?grayscale" 
                  alt="Cinematic Operator" 
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000 ease-out"
               />
               
               {/* Overlay Gradient */}
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>

               {/* Cinematic Text Overlay */}
               <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                  <div className="flex items-center gap-2 text-cyber-green font-mono text-xs md:text-sm tracking-[0.2em] mb-4 animate-pulse">
                     <span className="w-2 h-2 bg-cyber-green rounded-full"></span>
                     OPERATOR_IDENTITY_CONFIRMED
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4 leading-none">
                     {PROFILE.name.toUpperCase()}
                  </h2>
                  <p className="text-gray-300 font-mono text-sm md:text-base border-l-2 border-cyber-green pl-4 leading-relaxed max-w-xl backdrop-blur-sm">
                     System ID: RK_SEC_NODE_01 <br />
                     Clearance Level: ALPHA <br />
                     Objective: Secure. Defend. Analyze.
                  </p>
               </div>

               {/* Decorative Scanner Line */}
               <div className="absolute top-0 left-0 w-full h-1 bg-cyber-green/50 shadow-[0_0_15px_rgba(0,255,65,0.5)] animate-[scan_4s_linear_infinite]"></div>
            </div>
         </div>
      </div>

      {/* About Me Details Section */}
      <div className="bg-cream dark:bg-[#0a0c10] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            
            {/* Detailed Sections (Left Column) */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col space-y-16">
              
              {/* 01. Mission Brief */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-cyber-green mr-2">01.</span> The Illusion (Mission)
                </h2>
                <div className="prose dark:prose-invert text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  <p className="mb-4">
                    They say "Ignorance is Bliss". I say <strong className="text-black dark:text-white">Ignorance is a Vulnerability</strong>. My entry into cybersecurity wasn't about building walls; it was about learning how to walk through them, only to understand how to keep others out.
                  </p>
                  <p className="mb-4">
                    I live in the Blue Team, but I think like the Red Team. Using virtualized war zones (Kali Linux, ELK Stack), I simulate the attack to engineer the perfect defense.
                  </p>
                  <p>
                    <strong>The goal?</strong> To make the invisible threats visible. To integrate into a SOC where I don't just watch logs—I interpret the story they are trying to hide.
                  </p>
                </div>
              </div>

              {/* 02. Tactical Methodology */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-cyber-green mr-2">02.</span> The Reality (Methodology)
                </h2>
                <div className="prose dark:prose-invert text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p className="mb-4">
                    Defense in Depth? No. I believe in <strong className="text-black dark:text-white">Defense by Design</strong>. I operate under one rule: "Assume Breach."
                  </p>
                  <p>
                    I don't wait for the alert. I deploy <strong>Wazuh</strong> to listen to the whispers of the endpoint. I write <strong>Suricata</strong> rules that act as tripwires for the unseen. Every packet captures a truth, and I am the translator.
                  </p>
                </div>
              </div>

              {/* 03. Future Trajectory */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-cyber-green mr-2">03.</span> The Destiny (Trajectory)
                </h2>
                <div className="prose dark:prose-invert text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p className="mb-4">
                    The threat landscape shifts every millisecond. Stagnation is death.
                  </p>
                  <p>
                    I spend my nights on <strong>HackTheBox</strong> (Top 2%) because the classroom teaches you the rules, but the CTF teaches you how to break them. Next stop: <strong>CompTIA Security+</strong> and cloud dominance (AWS/Azure).
                  </p>
                </div>
              </div>

            </div>

            {/* Core Attributes (Right Column) - Sticky for better UX */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 md:sticky md:top-24">
              <div className="p-6 rounded-xl bg-white dark:bg-cyber-gray border border-gray-200 dark:border-cyber-border hover:border-cyber-green transition-colors group">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <ActivityIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Rapid Learner</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Constantly upskilling via TryHackMe and HackTheBox to stay ahead of new vectors.</p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-cyber-gray border border-gray-200 dark:border-cyber-border hover:border-cyber-green transition-colors group">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <CrosshairIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Detail Oriented</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Meticulous in log review and documentation, ensuring no anomaly goes unnoticed.</p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-cyber-gray border border-gray-200 dark:border-cyber-border hover:border-cyber-green transition-colors group">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <ServerIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Problem Solver</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Approach security incidents with a calm, analytical mindset to remediate issues.</p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-cyber-gray border border-gray-200 dark:border-cyber-border hover:border-cyber-green transition-colors group">
                 <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <ShieldIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Team Player</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Effective communicator who bridges the gap between technical and non-technical stakeholders.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;