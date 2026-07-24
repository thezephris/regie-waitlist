"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Mic, ShieldAlert, LayoutDashboard, Loader2, X, Check, ArrowRight, AlertCircle, ExternalLink } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useTheme } from "next-themes";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

function Counter({ from, to }: { from: number; to: number }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, to, { duration: 2.5, ease: "easeOut" });
    return controls.stop;
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
}

import CurvedLoop from "@/components/ui/curved-loop";
import ClickSpark from "@/components/ui/click-spark";
import ShinyText from "@/components/ui/shiny-text";
import DotField from "@/components/ui/dot-field";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const [waitlistCount, setWaitlistCount] = useState(1532);

  useEffect(() => {
    const baseCount = 1532;
    // Referans tarih: 1 Mayıs 2024 (isteğe bağlı değiştirilebilir)
    const startDate = new Date("2024-05-01T00:00:00Z").getTime(); 
    const now = Date.now();
    const diffHours = (now - startDate) / (1000 * 60 * 60);
    const increments = Math.floor(diffHours / 12);
    if (increments > 0) {
      setWaitlistCount(baseCount + increments);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Lütfen geçerli bir e-posta adresi girin.");
      setTimeout(() => setError(null), 3500);
      return;
    }
    setError(null);
    setStatus("loading");
    
    try {
      await addDoc(collection(db, "emails"), {
        email,
        createdAt: serverTimestamp()
      });
      setStatus("success");
    } catch (err) {
      console.error("Error saving email:", err);
      setError("Sunucu hatası: Firestore kurallarını veya bağlantını kontrol et.");
      setTimeout(() => setError(null), 3500);
      setStatus("idle");
    }
  };

  return (
    <ClickSpark sparkColor="var(--foreground)" sparkSize={12} sparkRadius={20} sparkCount={8} duration={400}>
      {/* Forced fixed layout without scroll. It will scale everything dynamically. */}
      <main className="fixed inset-0 w-full h-full flex flex-col items-center justify-between px-4 sm:px-6 py-[2vh] overflow-hidden selection:bg-primary/20">
        
        {/* Dot Field Background */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-100 transition-opacity duration-500">
          <DotField 
             dotRadius={1.5}
             dotSpacing={25}
             gradientFrom={isDark ? "#a1a1aa" : "#000000"} 
             gradientTo={isDark ? "#fafafa" : "#000000"}
             glowColor={isDark ? "#120F17" : "transparent"}
          />
        </div>

        {/* Decorative Curved Loop */}
        <div className="absolute top-[35%] left-0 w-full opacity-10 dark:opacity-10 z-0 pointer-events-auto">
          <CurvedLoop 
            marqueeText="Elevate ✦ Your ✦ Stream ✦ With ✦ Regie ✦ " 
            speed={0.8} 
            className="fill-foreground font-black text-[80px] tracking-widest uppercase" 
            curveAmount={350}
            interactive={true}
          />
        </div>

        {/* 1. TOP NAV */}
        <div className="w-full flex justify-center flex-shrink-0 mt-[1vh] relative z-10">
          <div className="flex items-center justify-between bg-card px-4 py-2 rounded-full shadow-lg shadow-black/20 dark:shadow-white/10 border border-border w-full max-w-[280px] sm:max-w-[320px]">
            {/* Logo Container */}
            <div className="relative w-16 h-5 flex items-center justify-start ml-2">
               <Image src="/regie-black.png" alt="Regie" fill className="object-contain object-left dark:opacity-0 opacity-100 transition-opacity duration-500 ease-out" />
               <Image src="/regie-white.png" alt="Regie" fill className="object-contain object-left opacity-0 dark:opacity-100 absolute inset-0 transition-opacity duration-500 ease-out" />
            </div>
            <AnimatedThemeToggler />
          </div>
        </div>

        {/* 2. MIDDLE CONTENT */}
        <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0">
          <div className="flex flex-col items-center justify-center w-full max-w-4xl" style={{ gap: 'max(1vh, 0.5rem)' }}>
            
            {/* Badge */}
            <div className="flex items-center justify-center bg-card px-3 py-1 rounded-full shadow-md shadow-black/10 dark:shadow-white/5 border border-border text-[10px] sm:text-xs font-medium mb-[1vh]">
              <ShinyText speed={3}>
                <Star className="w-3 h-3" />
                <span>Sınırların Ötesinde</span>
              </ShinyText>
            </div>

            {/* Headline */}
            <h1 className="font-bold text-center text-foreground tracking-tighter drop-shadow-sm px-2" style={{ fontSize: 'clamp(1.75rem, 5vh, 4.5rem)', lineHeight: '1.1' }}>
              Yayın Yönetiminin Geleceğine Erken Erişim
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-center max-w-2xl leading-snug px-4 mt-[1vh]" style={{ fontSize: 'clamp(0.85rem, 2vh, 1.125rem)' }}>
              Devrim niteliğindeki AI destekli reji asistanına ilk sen sahip ol. 
              Şimdi katıl ve yayıncılığın geleceğini yakala!
            </p>

            {/* Form */}
            <div className="w-full max-w-lg flex flex-col items-center px-4 mt-[2vh]">
              <motion.form 
                onSubmit={handleSubmit}
                animate={error !== null ? { x: [-8, 8, -8, 8, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`relative flex items-center w-full bg-card rounded-full shadow-xl shadow-black/30 dark:shadow-white/20 border p-1 focus-within:shadow-2xl focus-within:shadow-black/50 dark:focus-within:shadow-white/30 transition-all duration-500 ease-out ${error !== null ? 'border-red-500/50' : 'border-border'}`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                      setEmail(e.target.value);
                      if(error !== null) setError(null);
                  }}
                  placeholder="E-posta adresiniz"
                  disabled={status !== "idle"}
                  className="flex-1 bg-transparent border-none outline-none px-4 text-foreground placeholder:text-muted-foreground w-full"
                  style={{ fontSize: 'clamp(0.875rem, 2vh, 1rem)' }}
                />
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="relative overflow-hidden group bg-primary text-primary-foreground px-5 py-2.5 sm:py-3 rounded-full font-semibold flex items-center justify-center min-w-[100px] sm:min-w-[130px] border-2 border-transparent hover:bg-transparent hover:text-foreground hover:border-primary disabled:opacity-80 disabled:pointer-events-none transition-all duration-500 ease-out shadow-md hover:shadow-lg"
                  style={{ fontSize: 'clamp(0.75rem, 1.5vh, 0.875rem)' }}
                >
                  {/* Status Transitions */}
                  <AnimatePresence initial={false}>
                    {status === "loading" ? (
                      <motion.div
                        key="loader"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Loader2 className="w-5 h-5 animate-spin text-primary-foreground dark:text-foreground" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                        className="absolute inset-0 flex items-center justify-center gap-2"
                      >
                        <div className="relative flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 overflow-hidden">
                          {/* Outgoing arrow */}
                          <ArrowRight className="absolute inset-0 w-full h-full translate-x-0 group-hover:translate-x-[150%] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]" />
                          {/* Incoming arrow */}
                          <ArrowRight className="absolute inset-0 w-full h-full -translate-x-[150%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]" />
                        </div>
                        <span className="group-hover:translate-x-0.5 transition-transform duration-500 ease-out">Katıl</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Invisible Placeholder to rigidly maintain size */}
                  <div className="flex items-center justify-center gap-2 opacity-0 pointer-events-none">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Katıl
                  </div>
                </button>
              </motion.form>

              {/* Error Message */}
              <div className="h-5 mt-[1vh] w-full flex justify-center">
                <AnimatePresence>
                    {error !== null && (
                        <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-red-500 font-medium flex items-center gap-1.5 bg-red-50 dark:bg-red-950/30 px-3 py-0.5 rounded-full border border-red-200 dark:border-red-900/50 whitespace-nowrap"
                            style={{ fontSize: 'clamp(0.65rem, 1.5vh, 0.875rem)' }}
                        >
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
              </div>
            </div>

            {/* Avatars */}
            <div className="flex flex-col items-center gap-[1vh] mt-[1vh]">
              <div className="flex -space-x-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted border-2 border-background overflow-hidden shadow-lg shadow-black/40 dark:shadow-white/20"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-full h-full object-cover" /></div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted border-2 border-background overflow-hidden shadow-lg shadow-black/40 dark:shadow-white/20"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="avatar" className="w-full h-full object-cover" /></div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted border-2 border-background overflow-hidden shadow-lg shadow-black/40 dark:shadow-white/20"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="avatar" className="w-full h-full object-cover" /></div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-card border-2 border-background overflow-hidden shadow-lg shadow-black/40 dark:shadow-white/20 flex items-center justify-center text-[10px] font-bold text-muted-foreground">+</div>
              </div>
              <span className="text-muted-foreground font-medium" style={{ fontSize: 'clamp(0.65rem, 1.5vh, 0.875rem)' }}>
                <Counter from={214} to={waitlistCount} /> yayıncı tarafından bekleniyor
              </span>
            </div>

            {/* Features Grid - Premium Redesign */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 w-full mt-[3vh] sm:mt-[4vh]">
              
              {/* Card 1 */}
              <div className="group relative w-full rounded-[2rem] bg-card border border-border/60 hover:border-primary/40 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-xl shadow-black/20 dark:shadow-white/5 hover:shadow-2xl hover:shadow-black/40 dark:hover:shadow-white/20 hover:-translate-y-1.5 z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                <div className="relative flex flex-col p-6 sm:p-7 h-full">
                  <div className="flex items-center justify-between mb-8 sm:mb-10">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-card border border-border shadow-[0_5px_15px_-3px_rgba(0,0,0,0.1)] dark:shadow-[0_5px_15px_-3px_rgba(255,255,255,0.05)] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                      <Mic className="w-5 h-5 text-foreground/80 group-hover:text-primary transition-colors duration-500" />
                    </div>
                    <div className="w-8 h-1 rounded-full bg-border/50 group-hover:bg-primary/20 transition-colors duration-500" />
                  </div>
                  <div className="mt-auto text-left">
                    <h3 className="font-bold text-foreground text-base sm:text-lg tracking-tight mb-2 group-hover:text-primary transition-colors duration-500">
                      Otonom Sesli Komuta
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 'clamp(0.75rem, 1.5vh, 0.85rem)' }}>
                      Yayınını sadece konuşarak yönet. Rejiye ihtiyaç duymadan saniyeler içinde sahneler arası geçiş yap.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative w-full rounded-[2rem] bg-card border border-border/60 hover:border-primary/40 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-xl shadow-black/20 dark:shadow-white/5 hover:shadow-2xl hover:shadow-black/40 dark:hover:shadow-white/20 hover:-translate-y-1.5 z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                <div className="relative flex flex-col p-6 sm:p-7 h-full">
                  <div className="flex items-center justify-between mb-8 sm:mb-10">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-card border border-border shadow-[0_5px_15px_-3px_rgba(0,0,0,0.1)] dark:shadow-[0_5px_15px_-3px_rgba(255,255,255,0.05)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                      <ShieldAlert className="w-5 h-5 text-foreground/80 group-hover:text-primary transition-colors duration-500" />
                    </div>
                    <div className="w-8 h-1 rounded-full bg-border/50 group-hover:bg-primary/20 transition-colors duration-500" />
                  </div>
                  <div className="mt-auto text-left">
                    <h3 className="font-bold text-foreground text-base sm:text-lg tracking-tight mb-2 group-hover:text-primary transition-colors duration-500">
                      Yapay Zeka Kalkanı
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 'clamp(0.75rem, 1.5vh, 0.85rem)' }}>
                      İstenmeyen kelimeleri anında tespit edip sansürler. Kanalın güvende kalır, sen rahat edersin.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative w-full rounded-[2rem] bg-card border border-border/60 hover:border-primary/40 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-xl shadow-black/20 dark:shadow-white/5 hover:shadow-2xl hover:shadow-black/40 dark:hover:shadow-white/20 hover:-translate-y-1.5 z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                <div className="relative flex flex-col p-6 sm:p-7 h-full">
                  <div className="flex items-center justify-between mb-8 sm:mb-10">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-card border border-border shadow-[0_5px_15px_-3px_rgba(0,0,0,0.1)] dark:shadow-[0_5px_15px_-3px_rgba(255,255,255,0.05)] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                      <LayoutDashboard className="w-5 h-5 text-foreground/80 group-hover:text-primary transition-colors duration-500" />
                    </div>
                    <div className="w-8 h-1 rounded-full bg-border/50 group-hover:bg-primary/20 transition-colors duration-500" />
                  </div>
                  <div className="mt-auto text-left">
                    <h3 className="font-bold text-foreground text-base sm:text-lg tracking-tight mb-2 group-hover:text-primary transition-colors duration-500">
                      Kusursuz Entegrasyon
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 'clamp(0.75rem, 1.5vh, 0.85rem)' }}>
                      OBS, Streamlabs ve yayın donanımlarınla hiçbir ekstra kuruluma ihtiyaç duymadan senkronize ol.
                    </p>
                  </div>
                </div>
              </div>

            </div>
            
          </div>
        </div>

        {/* 3. BOTTOM FOOTER */}
        <div className="w-full flex justify-center flex-shrink-0 mb-[1vh]">
          <div className="flex flex-col items-center gap-[0.5vh]">
            <span className="font-semibold uppercase tracking-widest text-muted-foreground/60" style={{ fontSize: 'clamp(0.55rem, 1vh, 0.75rem)' }}>Designed & Developed by</span>
            <a 
              href="https://www.thezephris.space/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group px-3 py-1.5 rounded-full bg-card shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_20px_rgba(255,255,255,0.03)] border border-border hover:border-primary/40 font-semibold text-foreground hover:bg-muted flex items-center gap-1.5 hover:-translate-y-0.5 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{ fontSize: 'clamp(0.65rem, 1.5vh, 0.85rem)' }}
            >
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-primary flex items-center justify-center group-hover:scale-[1.15] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                <span className="text-[6px] sm:text-[8px] text-primary-foreground font-bold leading-none">Z</span>
              </div>
              thezephris.space
              <ExternalLink className="w-2.5 h-2.5 text-muted-foreground group-hover:text-foreground transition-colors duration-700" />
            </a>
          </div>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-lg bg-card rounded-[2rem] p-8 sm:p-10 flex flex-col items-center text-center shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] overflow-hidden border border-border"
              >
                <button
                  onClick={() => setStatus("idle")}
                  className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 sm:mb-8 relative">
                  <div className="absolute inset-0 rounded-full bg-green-200/50 dark:bg-green-800/20 scale-125 -z-10" />
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#16a34a] flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                  </div>
                </div>

                <h2 className="font-bold text-foreground mb-3 sm:mb-4" style={{ fontSize: 'clamp(1.5rem, 3.5vh, 2.25rem)', lineHeight: '1.2' }}>
                  You have been <br /> added to our <span className="text-[#16a34a]">waitlist!</span>
                </h2>
                <p className="text-muted-foreground mb-8 sm:mb-10 max-w-[280px] leading-relaxed" style={{ fontSize: 'clamp(0.85rem, 2vh, 1rem)' }}>
                  Thank you for joining, you&apos;ll be the first to know when we are ready!
                </p>

                <div className="flex flex-col items-center gap-2 sm:gap-3 relative z-10">
                  <div className="flex -space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted border-2 border-card overflow-hidden shadow-sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" alt="avatar" /></div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted border-2 border-card overflow-hidden shadow-sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" alt="avatar" /></div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted border-2 border-card overflow-hidden shadow-sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" alt="avatar" /></div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted border-2 border-card overflow-hidden shadow-sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" alt="avatar" /></div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted border-2 border-card overflow-hidden shadow-sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=5" alt="avatar" /></div>
                  </div>
                  <span className="text-muted-foreground font-medium mt-1" style={{ fontSize: 'clamp(0.65rem, 1.5vh, 0.75rem)' }}>You&apos;re not alone, <span className="text-[#16a34a] font-bold">1,532+</span> people joined!</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </ClickSpark>
  );
}
