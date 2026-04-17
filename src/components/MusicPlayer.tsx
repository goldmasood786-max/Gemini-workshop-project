import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, HardDrive } from 'lucide-react';
import { tracks } from '../lib/audio';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="w-full max-w-md bg-black border-4 border-[#00ffff] p-6 shadow-[8px_8px_0px_#ff00ff] relative overflow-hidden group font-pixel">
      
      {/* GLITCH BOX */}
      <div className="absolute top-2 right-2 flex gap-1">
         <div className="w-2 h-2 bg-[#ff00ff] animate-pulse" />
         <div className="w-2 h-2 bg-[#00ffff] animate-pulse delay-75" />
      </div>

      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />

      <div className="flex items-center gap-6">
        {/* RAW DATA COVER */}
        <div className="relative w-28 h-28 flex-shrink-0 border-2 border-[#ff00ff]">
          <motion.div 
            key={currentTrack.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute inset-0 overflow-hidden"
          >
            <img 
              src={currentTrack.cover} 
              alt={currentTrack.title}
              className="w-full h-full object-cover grayscale contrast-200 brightness-75"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {isPlaying && (
            <motion.div 
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ repeat: Infinity, duration: 0.2 }}
              className="absolute inset-0 bg-[#ff00ff]/20 pointer-events-none"
            />
          )}
        </div>

        {/* TRACK_INFO_STREAM */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 text-[#ff00ff]">
             <HardDrive size={14} />
             <span className="text-[10px] uppercase font-mono tracking-widest">DRIVE_C:</span>
          </div>
          <h3 className="text-[#00ffff] font-black text-2xl truncate tracking-tight glitch-text leading-none">{currentTrack.title.toUpperCase()}</h3>
          <p className="text-[#ff00ff] text-base font-bold uppercase tracking-[0.2em]">{currentTrack.artist.toUpperCase()}</p>
          <div className="flex items-center gap-2 text-[#00ffff]/40">
             <div className="w-3 h-3 border border-[#00ffff]/40 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#00ffff]/40" />
             </div>
             <span className="text-[10px] font-mono tracking-tighter uppercase italic">BIT_RATE: 320KBPS</span>
          </div>
        </div>
      </div>

      {/* DATA_STREAM_PROGRESS */}
      <div className="mt-8 space-y-3">
        <div className="flex justify-between text-[10px] text-[#00ffff]/50 uppercase tracking-widest font-mono">
           <span>00:00:FF</span>
           <span>0X_STREAM_ACTIVE</span>
        </div>
        <div className="h-4 w-full bg-[#00ffff]/10 border-2 border-[#00ffff]/30 relative">
          <motion.div 
            className="h-full bg-[#00ffff] shadow-[0_0_15px_#00ffff]"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
          {/* Progress Markers */}
          <div className="absolute inset-0 flex justify-between px-[10%]">
             {[...Array(4)].map((_, i) => (
               <div key={i} className="w-0.5 h-full bg-black/40" />
             ))}
          </div>
        </div>
      </div>

      {/* COMMAND_CONTROLS */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex flex-col gap-1 items-start">
           <div className="flex items-center gap-1">
              <Volume2 size={12} className="text-[#ff00ff]" />
              <span className="text-[9px] text-[#ff00ff] font-mono">GAIN_LVL</span>
           </div>
           <div className="w-16 h-1 border border-[#ff00ff]/30">
              <div className="w-3/4 h-full bg-[#ff00ff]/60" />
           </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={prevTrack}
            className="p-2 border-2 border-[#00ffff]/40 text-[#00ffff]/40 hover:text-[#00ffff] hover:border-[#00ffff] transition-all active:scale-95"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-16 h-16 bg-[#ff00ff] text-black flex items-center justify-center hover:bg-[#00ffff] transition-colors shadow-[0_0_20px_rgba(255,0,255,0.4)] relative group"
          >
            <div className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-40 transition-opacity" />
            {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} className="translate-x-0.5" fill="currentColor" />}
          </button>

          <button 
            onClick={nextTrack}
            className="p-2 border-2 border-[#00ffff]/40 text-[#00ffff]/40 hover:text-[#00ffff] hover:border-[#00ffff] transition-all active:scale-95"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>

        <div className="text-right">
           <div className="text-[10px] text-[#00ffff]/30 uppercase font-mono mb-1">LOOP_0X</div>
           <div className="w-8 h-8 border-2 border-[#00ffff]/20 flex items-center justify-center text-[#00ffff]/20 text-xs">
              01
           </div>
        </div>
      </div>
    </div>
  );
}
