import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Key, DoorClosed, Gem, Star, Gamepad2, Castle, Trophy, ArrowLeft, RefreshCw, Lock, Clock, Users, User, Trash2 } from "lucide-react";
import { ALL_QUESTIONS, Question } from "./questions";

type Slide =
  | "registration"
  | "cover"
  | "objectives"
  | "instructions"
  | "story"
  | "map"
  | "room1"
  | "room2"
  | "room3"
  | "room4"
  | "room5"
  | "room6"
  | "room7"
  | "room8"
  | "room9"
  | "room10"
  | "victory"
  | "reflection"
  | "leaderboard";

interface ScoreData {
  id: number;
  name: string;
  className: string;
  score: number;
  duration: number;
  playMode?: "single" | "group";
  timestamp: string;
}

// Sound effects placeholders
const playSound = (type: "correct" | "wrong" | "open" | "win") => {
  console.log(`Playing sound: ${type}`);
};

const formatDurationHelper = (seconds: number) => {
  if (!seconds) return "-";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
};

// --- Components defined outside App to prevent unmounting/losing focus on re-renders ---

function SlideRegistration({
  playerName,
  setPlayerName,
  playerClass,
  setPlayerClass,
  playMode,
  setPlayMode,
  groupMembers,
  setGroupMembers,
  setCurrentSlide,
  fetchLeaderboard,
}: {
  playerName: string;
  setPlayerName: (val: string) => void;
  playerClass: string;
  setPlayerClass: (val: string) => void;
  playMode: "single" | "group";
  setPlayMode: (val: "single" | "group") => void;
  groupMembers: string;
  setGroupMembers: (val: string) => void;
  setCurrentSlide: (slide: Slide) => void;
  fetchLeaderboard: () => void;
}) {
  const members = groupMembers.split(",").map(m => m.trim()).filter(Boolean);
  const isDisabled = playMode === "single" 
    ? !playerName || !playerClass 
    : !playerName || !playerClass || !groupMembers || members.length > 5;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-[#0f172a] text-white font-sans">
      <Castle size={80} className="text-amber-400 mb-4 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
      <h1 className="text-4xl font-bold mb-6 text-indigo-300 uppercase tracking-wider">Pendaftaran Agen Matematika</h1>
      
      <div className="flex flex-col gap-4 w-full max-w-sm">
        {/* Mode Selector */}
        <div className="bg-slate-900/50 p-1.5 rounded-2xl border border-indigo-500/20 flex gap-2">
          <button
            type="button"
            onClick={() => setPlayMode("single")}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              playMode === "single"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <User size={16} /> Single
          </button>
          <button
            type="button"
            onClick={() => setPlayMode("group")}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              playMode === "group"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Users size={16} /> Group (Max 5)
          </button>
        </div>

        {/* Inputs */}
        <input 
          type="text" 
          placeholder={playMode === "single" ? "Nama Lengkap" : "Nama Kelompok"} 
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="p-4 rounded-xl bg-slate-800 text-white font-semibold border-2 border-slate-700 focus:outline-none focus:border-indigo-400 transition-colors"
        />
        
        {playMode === "group" && (
          <>
            <input 
              type="text" 
              placeholder="Nama Anggota (misal: Alex, Budi, Caca)" 
              value={groupMembers}
              onChange={(e) => setGroupMembers(e.target.value)}
              className={`p-4 rounded-xl bg-slate-800 text-white font-semibold border-2 focus:outline-none transition-colors ${
                members.length > 5 ? "border-red-500 focus:border-red-400" : "border-slate-700 focus:border-indigo-400"
              }`}
            />
            {members.length > 5 && (
              <p className="text-red-400 text-xs font-bold text-left -mt-2">
                ⚠️ Maksimal 5 orang anggota kelompok! (Terisi: {members.length})
              </p>
            )}
          </>
        )}

        <input 
          type="text" 
          placeholder="Kelas" 
          value={playerClass}
          onChange={(e) => setPlayerClass(e.target.value)}
          className="p-4 rounded-xl bg-slate-800 text-white font-semibold border-2 border-slate-700 focus:outline-none focus:border-indigo-400 transition-colors"
        />

        <button 
          disabled={isDisabled}
          onClick={() => setCurrentSlide("cover")}
          className="mt-2 px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-900 font-black rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
        >
          Masuk <span className="ml-2 text-xl leading-none">➜</span>
        </button>

        <button 
          type="button"
          onClick={() => { fetchLeaderboard(); setCurrentSlide("leaderboard"); }}
          className="mt-4 text-xs text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <Trophy size={14} /> Lihat Papan Skor
        </button>
      </div>
    </motion.div>
  );
}

function SlideCover({
  setCurrentSlide,
  fetchLeaderboard,
}: {
  setCurrentSlide: (slide: Slide) => void;
  fetchLeaderboard: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-[#0f172a] text-white font-sans relative overflow-hidden">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 left-10 text-amber-400 opacity-50"><Star size={40} /></motion.div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute bottom-20 right-10 text-indigo-400 opacity-50"><Gem size={60} /></motion.div>

      <motion.div initial={{ y: -50 }} animate={{ y: 0 }} className="mb-6">
        <Castle size={120} className="text-amber-400 mx-auto drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
      </motion.div>
      
      <h1 className="text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-widest uppercase">
        ESCAPE ROOM
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold mb-10 text-indigo-300 uppercase tracking-wider">Misi Menyelamatkan Kota Pangkat</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button 
          onClick={() => setCurrentSlide("objectives")}
          className="group relative inline-flex items-center justify-center px-10 py-4 font-black text-slate-900 transition-all duration-200 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:scale-105 uppercase"
        >
          <span className="flex items-center gap-2 text-xl">
            <Gamepad2 size={28} className="group-hover:rotate-12 transition-transform" />
            Mulai
          </span>
        </button>

        <button 
          onClick={() => { fetchLeaderboard(); setCurrentSlide("leaderboard"); }}
          className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-600 transition-colors uppercase tracking-widest flex items-center gap-2"
        >
          <Trophy size={20} /> Papan Skor
        </button>
      </div>
    </motion.div>
  );
}

function SlideObjectives({ setCurrentSlide }: { setCurrentSlide: (slide: Slide) => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} className="flex flex-col min-h-screen p-8 bg-[#0f172a] text-white justify-center items-center font-sans">
      <div className="max-w-2xl w-full bg-slate-900/80 p-8 rounded-3xl border border-indigo-500/20 shadow-2xl backdrop-blur-sm">
        <h2 className="text-4xl font-bold mb-8 text-center text-amber-400 flex justify-center items-center gap-3 uppercase tracking-wider">
          <Trophy size={40} /> Tujuan Pembelajaran
        </h2>
        <ul className="space-y-4 text-xl text-indigo-100">
          <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex gap-4">
             <span className="text-emerald-400 font-bold">01</span> Memahami konsep bilangan Berpangkat.
          </motion.li>
          <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex gap-4">
             <span className="text-emerald-400 font-bold">02</span> Menentukan hasil dari bilangan berpangkat bulat positif.
          </motion.li>
          <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex gap-4">
             <span className="text-emerald-400 font-bold">03</span> Menuliskan perkalian berulang dalam bentuk notasi pangkat.
          </motion.li>
          <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex gap-4">
             <span className="text-emerald-400 font-bold">04</span> Menyelesaikan masalah yang berkaitan dengan perpangkatan.
          </motion.li>
        </ul>
        <div className="mt-12 flex justify-center">
          <button onClick={() => setCurrentSlide("instructions")} className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-900 font-black rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-all transform hover:scale-105 flex items-center uppercase">
            Lanjut <span className="ml-2 text-xl leading-none">➜</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SlideInstructions({
  setCurrentSlide,
  startGame,
}: {
  setCurrentSlide: (slide: Slide) => void;
  startGame: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} className="flex flex-col min-h-screen p-8 bg-[#0f172a] text-white justify-center items-center font-sans">
      <div className="max-w-2xl w-full bg-slate-900/80 p-8 rounded-3xl border border-indigo-500/20 shadow-2xl backdrop-blur-sm">
        <h2 className="text-4xl font-bold mb-8 text-center text-amber-400 uppercase tracking-wider">Petunjuk Bermain</h2>
        <ul className="space-y-4 text-lg text-indigo-100">
          <li className="flex items-center gap-3"><span className="w-2 h-2 bg-emerald-400 rounded-full"></span> Bacalah soal dengan teliti.</li>
          <li className="flex items-center gap-3"><span className="w-2 h-2 bg-emerald-400 rounded-full"></span> Pilih jawaban yang menurutmu benar.</li>
          <li className="flex items-center gap-3"><span className="w-2 h-2 bg-emerald-400 rounded-full"></span> Jawaban benar membuka pintu berikutnya.</li>
          <li className="flex items-center gap-3"><span className="w-2 h-2 bg-emerald-400 rounded-full"></span> Jawaban salah harus mengulang hingga benar.</li>
          <li className="flex items-center gap-3"><span className="w-2 h-2 bg-emerald-400 rounded-full"></span> Setiap jawaban benar memperoleh 20 poin (total 10 soal).</li>
          <li className="flex items-center gap-3"><span className="w-2 h-2 bg-emerald-400 rounded-full"></span> Kumpulkan seluruh poin (maksimal 200) untuk menyelamatkan Kota Pangkat.</li>
          <li className="flex items-center gap-3 text-amber-300 font-bold"><span className="w-2 h-2 bg-amber-400 rounded-full"></span> Dalam mode Kelompok, giliran menjawab akan diacak di setiap soal / jika waktu 30s habis.</li>
        </ul>
        <div className="mt-10 flex justify-between">
          <button onClick={() => setCurrentSlide("objectives")} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-600 transition-colors uppercase tracking-widest flex items-center gap-2">
            <ArrowLeft size={16} /> Kembali
          </button>
          <button onClick={startGame} className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-900 font-black rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-all transform hover:scale-105 flex items-center uppercase">
            Mulai Petualangan <span className="ml-2 text-xl leading-none">➜</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SlideStory({ setCurrentSlide }: { setCurrentSlide: (slide: Slide) => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="flex flex-col min-h-screen p-8 bg-[#0f172a] text-white justify-center items-center relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-slate-950/80 pointer-events-none"></div>
      
      <div className="z-10 max-w-3xl text-center">
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="mb-8">
          <Gem size={80} className="text-slate-500 mx-auto" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-amber-500 uppercase tracking-wider drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">Kota Pangkat Dalam Bahaya!</h2>
        <p className="text-2xl leading-relaxed text-indigo-200 italic border-l-4 border-indigo-500/50 pl-6 text-left">
          "Kristal Energi Kota Pangkat telah dicuri oleh Dr. Minus. Kamu dipilih menjadi Agen Matematika untuk mengembalikannya. Bukalah setiap pintu dengan menjawab tantangan perpangkatan."
        </p>
        <button onClick={() => setCurrentSlide("map")} className="mt-12 px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-black rounded-xl shadow-[0_4px_15px_rgba(245,158,11,0.3)] transition-all transform hover:scale-105 flex items-center gap-2 mx-auto uppercase">
          Mulai Misi <Key className="ml-2" />
        </button>
      </div>
    </motion.div>
  );
}

function SlideMap({
  unlockedRooms,
  setCurrentSlide,
}: {
  unlockedRooms: number;
  setCurrentSlide: (slide: Slide) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen p-8 bg-[#0f172a] text-white justify-center items-center font-sans">
      <h2 className="text-4xl font-bold mb-8 text-amber-400 uppercase tracking-wider">Peta Permainan</h2>
      
      <div className="flex flex-col items-center gap-2 relative max-h-[70vh] overflow-y-auto w-full max-w-md px-4 py-2 border border-slate-700/30 rounded-2xl bg-slate-950/20 backdrop-blur-sm">
        
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((room) => (
          <div key={room} className="flex flex-col items-center gap-1 w-full">
             <button 
                onClick={() => unlockedRooms >= room - 1 ? setCurrentSlide(`room${room}` as Slide) : null}
                className={`w-full py-3.5 rounded-xl font-bold text-base flex justify-center items-center gap-3 transition-all tracking-widest uppercase ${
                  unlockedRooms >= room - 1 
                    ? unlockedRooms >= room ? 'bg-emerald-600 hover:bg-emerald-500 border-2 border-emerald-400' : 'bg-indigo-600 hover:bg-indigo-500 border-2 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border-2 border-slate-700'
                }`}
             >
                {unlockedRooms >= room ? <DoorClosed size={18} className="opacity-50" /> : unlockedRooms >= room - 1 ? <Key size={18} className="text-amber-400" /> : <Lock size={18} />}
                Room {room}
             </button>
             {room < 10 && <div className="w-1 h-3 bg-slate-800 rounded-full"></div>}
          </div>
        ))}
        
      </div>
    </motion.div>
  );
}

function RoomLayout({ 
  nextSlide, 
  roomIndex,
  selectedQuestions,
  playerName,
  playerClass,
  score,
  unlockedRooms,
  handleCorrect,
  setCurrentSlide,
  playMode,
  groupMembers,
}: { 
  nextSlide: Slide;
  roomIndex: number;
  selectedQuestions: Question[];
  playerName: string;
  playerClass: string;
  score: number;
  unlockedRooms: number;
  handleCorrect: (points: number, nextSlide: Slide, roomIndex: number) => void;
  setCurrentSlide: (slide: Slide) => void;
  playMode: "single" | "group";
  groupMembers: string;
}) {
  const questionData = selectedQuestions[roomIndex - 1];
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [timeLeft, setTimeLeft] = useState(30);

  const members = groupMembers.split(",").map(m => m.trim()).filter(Boolean);

  // Initialize random active student from group
  const [activeStudent, setActiveStudent] = useState<string>(() => {
    if (playMode === "group" && members.length > 0) {
      return members[Math.floor(Math.random() * members.length)];
    }
    return playerName;
  });

  const [notification, setNotification] = useState<string | null>(null);

  // Handle active student rotation
  const rotateStudent = () => {
    if (playMode === "group" && members.length > 1) {
      const otherMembers = members.filter(m => m !== activeStudent);
      const nextStudent = otherMembers[Math.floor(Math.random() * otherMembers.length)];
      setNotification(`Waktu habis! Sekarang giliran ${nextStudent} mengerjakan.`);
      setActiveStudent(nextStudent);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  useEffect(() => {
    if (status === "idle" && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (status === "idle" && timeLeft === 0) {
      if (playMode === "group" && members.length > 1) {
        rotateStudent();
        setTimeLeft(30); // reset timer for next member
      } else {
        setStatus("wrong");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, status]);

  if (!questionData) return null;

  const handleSelect = (option: { label: string, isCorrect: boolean }) => {
    if (status !== "idle") return;
    setSelectedAnswer(option.label);
    if (option.isCorrect) {
      setStatus("correct");
      handleCorrect(20, nextSlide, roomIndex);
    } else {
      setStatus("wrong");
      playSound("wrong");
    }
  };

  const handleRetry = () => {
    setStatus("idle");
    setSelectedAnswer(null);
    setTimeLeft(30);
    if (playMode === "group" && members.length > 1) {
      const otherMembers = members.filter(m => m !== activeStudent);
      const nextStudent = otherMembers[Math.floor(Math.random() * otherMembers.length)];
      setActiveStudent(nextStudent);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col min-h-screen bg-[#0f172a] text-white font-sans overflow-hidden">
      
      {/* Header HUD */}
      <div className="h-20 bg-indigo-900/50 border-b border-indigo-400/30 flex items-center justify-between px-4 sm:px-8 backdrop-blur-md shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.6)]">
            <span className="text-2xl">💎</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-amber-400 uppercase tracking-wider">Misi Kota Pangkat</h1>
            <p className="text-xs text-indigo-200">
              {playMode === "single" ? "Agen: " : "Tim: "}
              <span className="font-semibold text-white uppercase">{playerName}</span> • Kelas {playerClass}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-4 sm:space-x-6 items-center">
          {/* Timer Display */}
          <div className={`bg-slate-800/80 px-4 py-2 rounded-lg border flex items-center transition-colors ${timeLeft <= 5 && status === "idle" ? 'border-red-500/50 animate-pulse text-red-400' : 'border-indigo-500/30 text-indigo-300'}`}>
            <Clock size={16} className="mr-2" />
            <span className="text-xl font-black">{timeLeft}s</span>
          </div>

          <div className="bg-slate-800/80 px-4 py-2 rounded-lg border border-indigo-500/30 flex items-center">
            <span className="text-xs font-bold text-indigo-300 mr-3">SKOR:</span>
            <span className="text-2xl font-black text-emerald-400">{score}</span>
            <span className="text-xs text-slate-400 ml-1">/ 200</span>
          </div>
          <div className="flex space-x-1 hidden lg:flex">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => (
               <div key={idx} className={`w-7 h-7 rounded flex items-center justify-center text-[10px] ${idx <= unlockedRooms ? 'bg-emerald-500 border border-emerald-300' : 'bg-slate-700/50 border border-slate-600'}`}>
                 {idx <= unlockedRooms ? '🔑' : '🔒'}
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Floating Rotation Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-slate-950 px-6 py-3 rounded-xl font-black text-center shadow-lg z-50 border border-amber-300 uppercase tracking-wide text-xs"
            >
              {notification}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-950 p-6 md:p-12 overflow-y-auto flex flex-col justify-center items-center">
          
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] opacity-20 pointer-events-none hidden md:block">
             <div className="w-full h-full bg-slate-700" style={{ clipPath: "polygon(0% 100%, 20% 40%, 30% 60%, 50% 20%, 70% 60%, 80% 40%, 100% 100%)" }}></div>
          </div>

          <div className="max-w-2xl mx-auto flex flex-col w-full z-10">
            {/* Question Card */}
            <div className="mb-8 bg-slate-900/60 p-6 rounded-3xl border border-indigo-500/20 shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                 <span className="inline-block px-3 py-1 bg-indigo-600 text-[10px] font-bold rounded-full tracking-widest uppercase">RUANGAN {roomIndex}</span>
                 <div className="flex items-center gap-2 bg-indigo-500/20 px-3 py-1.5 rounded-full border border-indigo-400/30">
                   <User size={14} className="text-amber-400 animate-pulse" />
                   <span className="text-xs font-semibold text-indigo-200">
                     Giliran Mengerjakan: <strong className="text-amber-400 uppercase">{activeStudent}</strong>
                   </span>
                 </div>
              </div>
              <h2 className="text-3xl font-bold text-white leading-tight mb-2">{questionData.question}</h2>
              <p className="text-indigo-300 mt-2">Selesaikan tantangan ini untuk mendapatkan kunci!</p>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 items-start">
              {questionData.options.map((opt, i) => {
                const isSelected = selectedAnswer === opt.label;
                const showCorrect = isSelected && opt.isCorrect;
                const showWrong = isSelected && !opt.isCorrect;
                
                return (
                  <button 
                    key={i}
                    disabled={status !== "idle"}
                    onClick={() => handleSelect(opt)}
                    className={`group border-2 p-6 rounded-2xl flex items-center space-x-4 transition-all w-full text-left ${
                      showCorrect
                        ? "bg-white/5 border-4 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                        : showWrong
                        ? "bg-slate-800 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                        : "bg-slate-800 border-slate-700 hover:border-indigo-400"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl transition-colors flex-shrink-0 ${
                      showCorrect
                        ? "bg-emerald-500 text-slate-900"
                        : showWrong
                        ? "bg-red-500 text-white"
                        : "bg-slate-700 text-white group-hover:bg-indigo-500"
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-xl md:text-2xl font-bold flex-1">{opt.label}</span>
                    {showCorrect && <div className="ml-auto text-emerald-400 text-xl">✅</div>}
                    {showWrong && <div className="ml-auto text-red-400 text-xl">❌</div>}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {status === "wrong" && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="mt-8 flex items-center bg-purple-950/40 p-4 rounded-xl border border-purple-500/30"
                >
                  <div className="w-12 h-12 bg-slate-900 rounded-full flex-shrink-0 mr-4 border-2 border-purple-500 overflow-hidden">
                     <div className="w-full h-full bg-slate-800 flex items-center justify-center text-2xl grayscale">👤</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm italic text-purple-200">
                      {timeLeft === 0 ? "Waktu habis! " : ""}
                      "{questionData.hintMessage}" <span className="text-white font-bold">- Dr. Minus</span>
                    </p>
                    <button 
                      onClick={handleRetry}
                      className="mt-3 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-600 transition-colors uppercase tracking-widest px-4 py-2 flex items-center gap-2"
                    >
                      <RefreshCw size={14} /> Coba Lagi
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Controls (Shows when correct) */}
      <AnimatePresence>
        {status === "correct" && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-24 bg-slate-900 border-t border-indigo-500/30 flex items-center justify-between px-8 absolute bottom-0 left-0 right-0 z-20"
          >
            <div className="flex space-x-3 hidden sm:flex">
              <button onClick={() => setCurrentSlide("map")} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-600 transition-colors uppercase tracking-widest flex items-center gap-2"><ArrowLeft size={16}/> Peta</button>
            </div>

            <div className="flex space-x-4 items-center ml-auto">
              <div className="text-right mr-4 hidden sm:block">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Progress Misi</p>
                <div className="w-48 h-2 bg-slate-800 rounded-full mt-1 overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${(roomIndex / 10) * 100}%` }}></div>
                </div>
              </div>
              <button 
                onClick={() => setCurrentSlide(nextSlide)}
                className="px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-900 font-black rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-all transform hover:scale-105 flex items-center"
              >
                LANJUTKAN MISI <span className="ml-2 text-xl leading-none">➜</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

function SlideVictory({
  playerName,
  score,
  setCurrentSlide,
  fetchLeaderboard,
  submitScore,
  playMode,
  gameStartTime,
}: {
  playerName: string;
  score: number;
  setCurrentSlide: (slide: Slide) => void;
  fetchLeaderboard: () => void;
  submitScore: (finalDuration: number) => void;
  playMode: "single" | "group";
  gameStartTime: number | null;
}) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    
    const finalDuration = gameStartTime ? Math.round((Date.now() - gameStartTime) / 1000) : 0;
    setElapsedSeconds(finalDuration);
    submitScore(finalDuration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1 } }} className="flex flex-col min-h-screen p-8 bg-[#0f172a] text-white justify-center items-center relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-950"></div>
      
      <div className="z-10 max-w-3xl text-center flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }} 
          animate={{ scale: 1, rotate: 0 }} 
          transition={{ type: "spring", bounce: 0.5, duration: 1.5 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-amber-400 blur-3xl opacity-50 rounded-full animate-pulse"></div>
          <Gem size={120} className="text-amber-400 filter drop-shadow-[0_0_30px_rgba(251,191,36,1)]" />
        </motion.div>

        <h2 className="text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 drop-shadow-lg tracking-widest uppercase">
          SELAMAT!
        </h2>
        <p className="text-2xl md:text-3xl mb-8 font-bold text-indigo-200 uppercase tracking-wider">
          {playMode === "single" ? "Kamu" : "Kelompokmu"} berhasil menyelamatkan Kota Pangkat.
        </p>
        
        <div className="bg-slate-800/80 p-8 rounded-3xl border border-indigo-500/30 mb-12 flex flex-col items-center shadow-2xl backdrop-blur-sm">
          <span className="text-sm font-bold text-indigo-400 mb-2 uppercase tracking-[0.2em]">
            {playMode === "single" ? "Total Skor Agen " : "Total Skor Kelompok "} {playerName}
          </span>
          <span className="text-7xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            {score} <span className="text-xl text-slate-400">/ 200</span>
          </span>
          <span className="text-sm text-indigo-200 mt-2 font-bold flex items-center gap-1.5 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-400/20 shadow-inner">
            <Clock size={16} className="text-amber-400" />
            Waktu Misi: <span className="text-amber-400 font-extrabold">{formatDurationHelper(elapsedSeconds)}</span>
          </span>
          
          <div className="flex gap-2 mt-6 flex-wrap justify-center max-w-md">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
               <motion.div key={s} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: s * 0.15 }}>
                 <div className="w-10 h-10 bg-emerald-500 rounded flex items-center justify-center border-2 border-emerald-300">🔑</div>
               </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => setCurrentSlide("reflection")} className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-600 transition-colors uppercase tracking-widest flex items-center gap-2">
            Lanjut ke Refleksi
          </button>
          <button onClick={() => { fetchLeaderboard(); setCurrentSlide("leaderboard"); }} className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-900 font-black rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-all transform hover:scale-105 flex items-center uppercase gap-2">
            <Trophy size={20} /> Papan Skor
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SlideReflection({
  fetchLeaderboard,
  setCurrentSlide,
  resetGame,
}: {
  fetchLeaderboard: () => void;
  setCurrentSlide: (slide: Slide) => void;
  resetGame: (goToRegistration: boolean) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col min-h-screen p-8 bg-[#0f172a] text-white justify-center items-center font-sans">
      <div className="max-w-2xl w-full bg-slate-900/80 p-8 rounded-3xl border border-indigo-500/20 shadow-2xl backdrop-blur-sm">
        <h2 className="text-4xl font-bold mb-8 text-center text-amber-400 uppercase tracking-wider">Refleksi Belajar</h2>
        
        <div className="space-y-8 text-lg">
          <div>
            <p className="mb-4 font-bold text-indigo-200">1. Apakah kamu sudah memahami konsep bilangan berpangkat?</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-indigo-400 transition-colors flex-1 font-bold">
                <input type="radio" name="q1" className="w-5 h-5 accent-emerald-500" /> Ya
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-indigo-400 transition-colors flex-1 font-bold">
                <input type="radio" name="q1" className="w-5 h-5 accent-emerald-500" /> Masih perlu belajar
              </label>
            </div>
          </div>

          <div>
            <p className="mb-4 font-bold text-indigo-200">2. Soal mana yang menurutmu paling menantang?</p>
            <textarea className="w-full bg-slate-800 p-4 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-400 transition-colors resize-none h-24" placeholder="Tuliskan jawabanmu di sini..."></textarea>
          </div>

          <div>
            <p className="mb-4 font-bold text-indigo-200">3. Tuliskan satu hal baru yang kamu pelajari hari ini.</p>
            <textarea className="w-full bg-slate-800 p-4 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-400 transition-colors resize-none h-24" placeholder="Tuliskan jawabanmu di sini..."></textarea>
          </div>
        </div>

        <div className="mt-10 p-6 bg-indigo-900/40 rounded-xl border border-indigo-500/30 text-center">
          <p className="text-indigo-200 italic font-medium leading-relaxed">
            "Hebat! Kamu telah berhasil menyelesaikan seluruh tantangan. Ingatlah bahwa bilangan berpangkat merupakan cara sederhana untuk menuliskan perkalian berulang. Teruslah berlatih agar kemampuan matematikamu semakin meningkat."
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
           <button onClick={() => { fetchLeaderboard(); setCurrentSlide("leaderboard"); }} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-600 transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
             <Trophy size={16} /> Papan Skor
           </button>
           <button onClick={() => resetGame(true)} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-900 font-black rounded-lg shadow-md transition-all transform hover:scale-105 flex items-center justify-center gap-2 uppercase">
             <RefreshCw size={14} /> Main Lagi
           </button>
        </div>
      </div>
    </motion.div>
  );
}

function SlideLeaderboard({
  leaderboard,
  fetchLeaderboard,
  playerName,
  setCurrentSlide,
  resetGame,
  playMode,
  groupMembers,
}: {
  leaderboard: ScoreData[];
  fetchLeaderboard: () => void;
  playerName: string;
  setCurrentSlide: (slide: Slide) => void;
  resetGame: (goToRegistration: boolean) => void;
  playMode: "single" | "group";
  groupMembers: string;
}) {
  const [activeTab, setActiveTab] = useState<"single" | "group">("single");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetPasswordInput, setResetPasswordInput] = useState("");
  const [resetError, setResetError] = useState("");

  useEffect(() => {
    fetchLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const targetName = playMode === "single" 
    ? playerName 
    : `👥 ${playerName} (${groupMembers})`;

  const filteredLeaderboard = leaderboard.filter(entry => {
    if (entry.playMode) {
      return entry.playMode === activeTab;
    }
    // Fallback for older legacy data
    if (activeTab === "group") {
      return entry.name.startsWith("👥");
    } else {
      return !entry.name.startsWith("👥");
    }
  });

  const handleResetScores = async () => {
    try {
      const res = await fetch("/api/scores/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: resetPasswordInput }),
      });
      const data = await res.json();
      if (res.ok) {
        setResetPasswordInput("");
        setResetError("");
        setShowResetConfirm(false);
        fetchLeaderboard();
      } else {
        setResetError(data.error || "Password salah!");
      }
    } catch (err) {
      setResetError("Gagal mereset papan skor.");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col min-h-screen p-8 bg-[#0f172a] text-white justify-center items-center font-sans">
       <div className="max-w-3xl w-full bg-slate-900/80 p-8 rounded-3xl border border-indigo-500/20 shadow-2xl backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-amber-400 flex items-center gap-3 uppercase tracking-wider"><Trophy size={40} /> Papan Skor Global</h2>
            <button onClick={() => setCurrentSlide(playerName ? "cover" : "registration")} className="bg-slate-800 hover:bg-slate-700 p-3 rounded-xl border border-slate-600 transition-colors">
              <ArrowLeft size={24} />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex bg-slate-800/80 p-1.5 rounded-2xl border border-indigo-500/20 mb-6 max-w-xs mx-auto gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("single")}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === "single"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <User size={16} /> Solo
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("group")}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === "group"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users size={16} /> Group
            </button>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-indigo-500/30">
             <div className="max-h-[60vh] overflow-y-auto">
               <table className="w-full text-left border-collapse">
                 <thead className="bg-indigo-900/50 sticky top-0 z-10 backdrop-blur">
                   <tr>
                     <th className="p-4 font-bold text-indigo-300 uppercase tracking-widest text-xs">Peringkat</th>
                     <th className="p-4 font-bold text-indigo-300 uppercase tracking-widest text-xs">Agen / Kelompok</th>
                     <th className="p-4 font-bold text-indigo-300 uppercase tracking-widest text-xs">Kelas</th>
                     <th className="p-4 font-bold text-indigo-300 uppercase tracking-widest text-xs text-right">Waktu</th>
                     <th className="p-4 font-bold text-right text-indigo-300 uppercase tracking-widest text-xs">Skor</th>
                   </tr>
                 </thead>
                 <tbody>
                   {filteredLeaderboard.length === 0 ? (
                     <tr><td colSpan={5} className="p-8 text-center text-indigo-400 font-bold">Belum ada data skor untuk kategori ini.</td></tr>
                   ) : (
                     filteredLeaderboard.map((entry, index) => {
                       const isHighlighted = entry.name === targetName;
                       return (
                         <motion.tr 
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: index * 0.05 }}
                           key={entry.id} 
                           className={`border-b border-indigo-500/10 hover:bg-indigo-500/10 transition-colors ${isHighlighted ? 'bg-indigo-500/20 font-bold border-l-4 border-l-emerald-400' : 'border-l-4 border-l-transparent'}`}
                         >
                           <td className="p-4 font-bold">
                             {index === 0 ? <span className="text-amber-400 flex items-center gap-1"><Trophy size={16}/> 1</span> : 
                              index === 1 ? <span className="text-slate-300">2</span> : 
                              index === 2 ? <span className="text-amber-600">3</span> : 
                              index + 1}
                           </td>
                           <td className="p-4 text-white uppercase tracking-wider text-sm">{entry.name}</td>
                           <td className="p-4 text-indigo-200">{entry.className}</td>
                           <td className="p-4 text-indigo-200 text-right font-medium">{formatDurationHelper(entry.duration)}</td>
                           <td className="p-4 text-right text-emerald-400 font-black">{entry.score}</td>
                         </motion.tr>
                       );
                     })
                   )}
                 </tbody>
               </table>
             </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button onClick={() => resetGame(true)} className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-900 font-black rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 uppercase">
              <RefreshCw size={20} /> Main Lagi
            </button>
            <button 
              onClick={() => {
                setShowResetConfirm(true);
                setResetError("");
                setResetPasswordInput("");
              }}
              className="px-6 py-3.5 bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 font-bold rounded-xl transition-all border border-rose-500/30 flex items-center gap-2 text-sm uppercase tracking-wider"
            >
              <Trash2 size={16} /> Reset Skor
            </button>
          </div>
       </div>

       {showResetConfirm && (
         <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <motion.div 
             initial={{ scale: 0.95, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full shadow-2xl relative"
           >
             <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Konfirmasi Reset</h3>
             <p className="text-slate-400 text-sm mb-6">Tindakan ini akan menghapus semua skor hari ini secara permanen. Masukkan kata sandi otorisasi untuk melanjutkan:</p>
             
             <input 
               type="password"
               value={resetPasswordInput}
               onChange={(e) => setResetPasswordInput(e.target.value)}
               placeholder="Kata sandi..."
               className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl focus:outline-none focus:border-rose-500 transition-colors text-white mb-2 font-mono"
               onKeyDown={(e) => {
                 if (e.key === "Enter") handleResetScores();
               }}
             />
             
             {resetError && (
               <p className="text-rose-400 text-xs font-bold mb-4">{resetError}</p>
             )}

             <div className="flex gap-3 justify-end mt-6">
               <button 
                 onClick={() => setShowResetConfirm(false)}
                 className="px-4 py-2 text-slate-400 hover:text-white font-bold text-sm transition-colors uppercase tracking-wider"
               >
                 Batal
               </button>
               <button 
                 onClick={handleResetScores}
                 className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-sm rounded-xl transition-colors uppercase tracking-wider shadow-lg shadow-rose-600/30"
               >
                 Reset Sekarang
               </button>
             </div>
           </motion.div>
         </div>
       )}
    </motion.div>
  );
}

// --- Main App Component ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<Slide>("registration");
  const [playerName, setPlayerName] = useState("");
  const [playerClass, setPlayerClass] = useState("");
  const [playMode, setPlayMode] = useState<"single" | "group">("single");
  const [groupMembers, setGroupMembers] = useState("");
  const [score, setScore] = useState(0);
  const [unlockedRooms, setUnlockedRooms] = useState(0);
  const [leaderboard, setLeaderboard] = useState<ScoreData[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  
  // Game timing state
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);

  useEffect(() => {
    // If they are on a gameplay slide but haven't registered, redirect to registration
    const gameplaySlides = ["cover", "objectives", "instructions", "story", "map", "room1", "room2", "room3", "room4", "room5", "room6", "room7", "room8", "room9", "room10", "victory", "reflection"];
    if (gameplaySlides.includes(currentSlide) && !playerName) {
      setCurrentSlide("registration");
    }
  }, [currentSlide, playerName]);

  const startGame = () => {
    const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, 10)); // Play 10 questions!
    setGameStartTime(Date.now()); // Record start time
    setCurrentSlide("story");
  };

  const submitScore = async (finalDuration: number) => {
    try {
      const displayName = playMode === "single" 
        ? playerName 
        : `👥 ${playerName} (${groupMembers})`;
      await fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: displayName, className: playerClass, score, duration: finalDuration, playMode }),
      });
    } catch (err) {
      console.error("Failed to submit score", err);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/scores");
      const data = await res.json();
      if (data.scores) {
        setLeaderboard(data.scores);
      }
    } catch (err) {
      console.error("Failed to fetch leaderboard", err);
    }
  };

  const handleCorrect = (points: number, _nextSlide: Slide, roomIndex: number) => {
    playSound("correct");
    setScore((s) => s + points);
    setUnlockedRooms(Math.max(unlockedRooms, roomIndex));
    playSound("open");
  };

  const resetGame = (goToRegistration = false) => {
    setScore(0);
    setUnlockedRooms(0);
    setGameStartTime(null);
    if (goToRegistration) {
      setCurrentSlide("registration");
    } else {
      startGame();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {currentSlide === "registration" && (
        <SlideRegistration
          key="registration"
          playerName={playerName}
          setPlayerName={setPlayerName}
          playerClass={playerClass}
          setPlayerClass={setPlayerClass}
          playMode={playMode}
          setPlayMode={setPlayMode}
          groupMembers={groupMembers}
          setGroupMembers={setGroupMembers}
          setCurrentSlide={setCurrentSlide}
          fetchLeaderboard={fetchLeaderboard}
        />
      )}
      {currentSlide === "cover" && (
        <SlideCover key="cover" setCurrentSlide={setCurrentSlide} fetchLeaderboard={fetchLeaderboard} />
      )}
      {currentSlide === "objectives" && (
        <SlideObjectives key="objectives" setCurrentSlide={setCurrentSlide} />
      )}
      {currentSlide === "instructions" && (
        <SlideInstructions
          key="instructions"
          setCurrentSlide={setCurrentSlide}
          startGame={startGame}
        />
      )}
      {currentSlide === "story" && (
        <SlideStory key="story" setCurrentSlide={setCurrentSlide} />
      )}
      {currentSlide === "map" && (
        <SlideMap
          key="map"
          unlockedRooms={unlockedRooms}
          setCurrentSlide={setCurrentSlide}
        />
      )}
      {currentSlide === "room1" && (
        <RoomLayout
          key="room1"
          roomIndex={1}
          nextSlide="room2"
          selectedQuestions={selectedQuestions}
          playerName={playerName}
          playerClass={playerClass}
          score={score}
          unlockedRooms={unlockedRooms}
          handleCorrect={handleCorrect}
          setCurrentSlide={setCurrentSlide}
          playMode={playMode}
          groupMembers={groupMembers}
        />
      )}
      {currentSlide === "room2" && (
        <RoomLayout
          key="room2"
          roomIndex={2}
          nextSlide="room3"
          selectedQuestions={selectedQuestions}
          playerName={playerName}
          playerClass={playerClass}
          score={score}
          unlockedRooms={unlockedRooms}
          handleCorrect={handleCorrect}
          setCurrentSlide={setCurrentSlide}
          playMode={playMode}
          groupMembers={groupMembers}
        />
      )}
      {currentSlide === "room3" && (
        <RoomLayout
          key="room3"
          roomIndex={3}
          nextSlide="room4"
          selectedQuestions={selectedQuestions}
          playerName={playerName}
          playerClass={playerClass}
          score={score}
          unlockedRooms={unlockedRooms}
          handleCorrect={handleCorrect}
          setCurrentSlide={setCurrentSlide}
          playMode={playMode}
          groupMembers={groupMembers}
        />
      )}
      {currentSlide === "room4" && (
        <RoomLayout
          key="room4"
          roomIndex={4}
          nextSlide="room5"
          selectedQuestions={selectedQuestions}
          playerName={playerName}
          playerClass={playerClass}
          score={score}
          unlockedRooms={unlockedRooms}
          handleCorrect={handleCorrect}
          setCurrentSlide={setCurrentSlide}
          playMode={playMode}
          groupMembers={groupMembers}
        />
      )}
      {currentSlide === "room5" && (
        <RoomLayout
          key="room5"
          roomIndex={5}
          nextSlide="room6"
          selectedQuestions={selectedQuestions}
          playerName={playerName}
          playerClass={playerClass}
          score={score}
          unlockedRooms={unlockedRooms}
          handleCorrect={handleCorrect}
          setCurrentSlide={setCurrentSlide}
          playMode={playMode}
          groupMembers={groupMembers}
        />
      )}
      {currentSlide === "room6" && (
        <RoomLayout
          key="room6"
          roomIndex={6}
          nextSlide="room7"
          selectedQuestions={selectedQuestions}
          playerName={playerName}
          playerClass={playerClass}
          score={score}
          unlockedRooms={unlockedRooms}
          handleCorrect={handleCorrect}
          setCurrentSlide={setCurrentSlide}
          playMode={playMode}
          groupMembers={groupMembers}
        />
      )}
      {currentSlide === "room7" && (
        <RoomLayout
          key="room7"
          roomIndex={7}
          nextSlide="room8"
          selectedQuestions={selectedQuestions}
          playerName={playerName}
          playerClass={playerClass}
          score={score}
          unlockedRooms={unlockedRooms}
          handleCorrect={handleCorrect}
          setCurrentSlide={setCurrentSlide}
          playMode={playMode}
          groupMembers={groupMembers}
        />
      )}
      {currentSlide === "room8" && (
        <RoomLayout
          key="room8"
          roomIndex={8}
          nextSlide="room9"
          selectedQuestions={selectedQuestions}
          playerName={playerName}
          playerClass={playerClass}
          score={score}
          unlockedRooms={unlockedRooms}
          handleCorrect={handleCorrect}
          setCurrentSlide={setCurrentSlide}
          playMode={playMode}
          groupMembers={groupMembers}
        />
      )}
      {currentSlide === "room9" && (
        <RoomLayout
          key="room9"
          roomIndex={9}
          nextSlide="room10"
          selectedQuestions={selectedQuestions}
          playerName={playerName}
          playerClass={playerClass}
          score={score}
          unlockedRooms={unlockedRooms}
          handleCorrect={handleCorrect}
          setCurrentSlide={setCurrentSlide}
          playMode={playMode}
          groupMembers={groupMembers}
        />
      )}
      {currentSlide === "room10" && (
        <RoomLayout
          key="room10"
          roomIndex={10}
          nextSlide="victory"
          selectedQuestions={selectedQuestions}
          playerName={playerName}
          playerClass={playerClass}
          score={score}
          unlockedRooms={unlockedRooms}
          handleCorrect={handleCorrect}
          setCurrentSlide={setCurrentSlide}
          playMode={playMode}
          groupMembers={groupMembers}
        />
      )}
      {currentSlide === "victory" && (
        <SlideVictory
          key="victory"
          playerName={playerName}
          score={score}
          setCurrentSlide={setCurrentSlide}
          fetchLeaderboard={fetchLeaderboard}
          submitScore={submitScore}
          playMode={playMode}
          gameStartTime={gameStartTime}
        />
      )}
      {currentSlide === "reflection" && (
        <SlideReflection
          key="reflection"
          fetchLeaderboard={fetchLeaderboard}
          setCurrentSlide={setCurrentSlide}
          resetGame={resetGame}
        />
      )}
      {currentSlide === "leaderboard" && (
        <SlideLeaderboard
          key="leaderboard"
          leaderboard={leaderboard}
          fetchLeaderboard={fetchLeaderboard}
          playerName={playerName}
          setCurrentSlide={setCurrentSlide}
          resetGame={resetGame}
          playMode={playMode}
          groupMembers={groupMembers}
        />
      )}
    </AnimatePresence>
  );
}
