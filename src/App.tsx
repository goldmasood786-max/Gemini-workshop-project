import React from 'react';
import { motion } from 'motion/react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Power, Activity, ShieldAlert } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#00ffff] flex flex-col font-pixel selection:bg-[#ff00ff]/30 overflow-hidden relative">
      
      {/* GLITCH OVERLAYS */}
      <div className="crt-overlay" />
      <div className="scanline" />
      <div className="noise-overlay" />

      {/* SYSTEM HEADER */}
      <header className="relative z-10 w-full px-6 py-4 flex justify-between items-center border-b-2 border-[#00ffff]/30 bg-black/80">
        <div className="flex items-center gap-4 group cursor-crosshair">
          <motion.div 
            animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="p-1 border-2 border-[#ff00ff] text-[#ff00ff]"
          >
            <Power size={20} />
          </motion.div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-widest uppercase glitch-text leading-none">
              SYNTH_CORE v0.9
            </h1>
            <span className="text-[10px] font-mono tracking-tighter opacity-50 uppercase">Neural Stream: STABLE</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-12 text-sm tracking-[0.2em] uppercase">
           <div className="flex items-center gap-2 group cursor-pointer hover:text-[#ff00ff] transition-colors">
              <Activity size={14} />
              <span className="border-b border-transparent group-hover:border-[#ff00ff]">SIGNAL_ARCADE</span>
           </div>
           <div className="flex items-center gap-2 group cursor-pointer hover:text-[#ff00ff] transition-colors">
              <ShieldAlert size={14} />
              <span className="border-b border-transparent group-hover:border-[#ff00ff]">ENCRYPTED_VAULT</span>
           </div>
           <div className="px-4 py-1 border-2 border-[#00ffff] bg-[#00ffff]/10 animate-pulse">
             CONNECTION:[SECURE]
           </div>
        </div>
      </header>

      {/* CORE MODULES */}
      <main className="relative z-10 flex-1 grid lg:grid-cols-[250px_1fr_400px] border-l-2 border-[#00ffff]/10">
        
        {/* LEFT SYSTEM LOGS */}
        <aside className="hidden lg:flex flex-col border-r-2 border-[#00ffff]/20 bg-black/40 p-4 font-mono text-[9px] gap-6 uppercase tracking-widest overflow-hidden">
           <div className="space-y-2">
              <div className="text-[#ff00ff]/80 font-bold border-b border-[#ff00ff]/30 pb-1 flex justify-between">
                 <span>SYS_MONITOR</span>
                 <span>[OK]</span>
              </div>
              <div className="space-y-4 pt-4">
                 <div className="space-y-1">
                    <p className="opacity-40">CPU_ARCH: QUANTUM_HEX</p>
                    <div className="h-2 w-full bg-[#00ffff]/5 border border-[#00ffff]/20">
                       <motion.div 
                         animate={{ width: ['20%', '85%', '45%', '70%'] }} 
                         transition={{ repeat: Infinity, duration: 2, ease: "steps(5)" }} 
                         className="h-full bg-[#ff00ff]" 
                       />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <p className="opacity-40">MEM_LEAK: MINIMAL</p>
                    <div className="h-2 w-full bg-[#00ffff]/5 border border-[#00ffff]/20">
                       <motion.div 
                         animate={{ width: ['60%', '30%', '90%', '55%'] }} 
                         transition={{ repeat: Infinity, duration: 1.5, ease: "steps(3)" }} 
                         className="h-full bg-[#00ffff]" 
                       />
                    </div>
                 </div>
              </div>
           </div>

           <div className="mt-auto space-y-2 opacity-30">
              <p>BOOT_SEQ: COMPLETED</p>
              <p>KERNEL: 0x82FA93</p>
              <p>Uptime: inf</p>
           </div>
        </aside>

        {/* GAME SECTOR */}
        <section className="flex flex-col items-center justify-center p-8 bg-[#00ffff]/[0.02]">
          <div className="mb-4 text-[#ff00ff] text-sm animate-pulse">
            CAUTION: HIGH_INTENSITY_NEURAL_STIMULATION
          </div>
          <SnakeGame />
        </section>

        {/* AUDIO SECTOR */}
        <section className="flex flex-col border-l-2 border-[#00ffff]/20 p-8 gap-8 bg-black/20">
           <div className="space-y-8">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-8 bg-[#ff00ff] animate-bounce" />
                 <h2 className="text-xl tracking-[0.3em] uppercase text-[#ff00ff] glitch-text">AUDIO_WAVE</h2>
              </div>
              <MusicPlayer />
           </div>

           <div className="flex-1 border-t-2 border-[#00ffff]/20 pt-8 flex flex-col gap-4">
              <h3 className="text-xs tracking-[0.4em] uppercase opacity-40">RAW_DATA_FEED</h3>
              <div className="flex-1 overflow-hidden font-mono text-[9px] text-[#00ffff]/40 space-y-2">
                 {[...Array(10)].map((_, i) => (
                   <div key={i} className="flex gap-4">
                     <span className="text-[#ff00ff] opacity-60">[{Math.random().toString(16).slice(2, 8)}]</span>
                     <span className="truncate">PACKET_LOSS_{Math.floor(Math.random() * 100)}: RETRIEVING_DATA_FROM_SECTOR_{i}...</span>
                   </div>
                 ))}
                 <motion.div 
                   animate={{ opacity: [0, 1] }} 
                   transition={{ repeat: Infinity, duration: 0.1 }}
                   className="w-2 h-3 bg-[#00ffff]/40"
                 />
              </div>
           </div>
        </section>
      </main>

      {/* FOOTER RAILS */}
      <footer className="relative z-10 px-6 py-2 flex justify-between items-center text-[11px] uppercase tracking-[0.5em] text-[#00ffff]/30 border-t-2 border-[#00ffff]/30 bg-black">
        <div>TERMINAL_STATE: [STANDBY]</div>
        <div className="flex gap-12">
           <span className="hover:text-[#ff00ff] cursor-wait transition-colors">ERR_NULL</span>
           <span className="hover:text-[#ff00ff] cursor-wait transition-colors">0x000F</span>
        </div>
      </footer>
    </div>
  );
}
