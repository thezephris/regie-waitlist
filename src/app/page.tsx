"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Mic, ShieldAlert, LayoutDashboard, Loader2, X, Check, ArrowRight, AlertCircle, ExternalLink } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useTheme } from "next-themes";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already_registered">("idle");
  const [error, setError] = useState<string | null>(null);
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/waitlist/count');
        if (response.ok) {
          const data = await response.json();
          setWaitlistCount(data.count);
        } else {
          console.error("API'den sayı alınırken hata oluştu:", response.status);
        }
      } catch (err) {
        console.error("Firebase'den sayı okunurken ağ hatası alındı:", err);
        // Fallback YOK. Gerçek sayı okunana kadar 0 kalacak.
      }
    };

    fetchCount();
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
      const docId = email.trim().toLowerCase();
      await setDoc(doc(db, "emails", docId), {
        email: docId,
        createdAt: serverTimestamp()
      });
      setWaitlistCount(prev => prev + 1);
      setStatus("success");
    } catch (err: any) {
      console.error("Error saving email:", err);
      // Firebase, kuralımızda "sadece oluştur (create)" dediğimiz için zaten var olan docId (e-posta) üzerine yazmaya çalışırken permission-denied verecektir.
      if (err.code === "permission-denied") {
        setStatus("already_registered");
      } else {
        setError("Sunucu hatası: Firestore kurallarını veya bağlantını kontrol et.");
        setTimeout(() => setError(null), 3500);
        setStatus("idle");
      }
    }
  };

  return (
    <ClickSpark sparkColor="var(--foreground)" sparkSize={12} sparkRadius={20} sparkCount={8} duration={400}>
      {/* Responsive Layout that scrolls on overflow */}
      <main className="relative w-full min-h-[100dvh] flex flex-col items-center justify-between px-4 sm:px-6 py-[4vh] sm:py-[2vh] overflow-x-hidden selection:bg-primary/20">
        
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
        <div className="absolute top-[31%] sm:top-[36%] left-0 w-full opacity-10 dark:opacity-10 z-0 pointer-events-auto">
          <CurvedLoop 
            marqueeText="Elevate ✦ Your ✦ Stream ✦ With ✦ Regie ✦ " 
            speed={0.8} 
            className="fill-foreground font-black text-[80px] tracking-widest uppercase" 
            curveAmount={350}
            interactive={true}
          />
        </div>

        {/* 1. TOP NAV */}
        <div className="w-full flex justify-center flex-shrink-0 mt-[1vh] relative z-10" style={{ minHeight: 'clamp(2.5rem, 5vh, 4rem)' }}>
          <div className="flex items-center justify-between bg-card px-4 py-[1vh] rounded-full shadow-lg shadow-black/20 dark:shadow-white/10 border border-border w-full max-w-[280px] sm:max-w-[320px] h-full">
            {/* Left: Logo */}
            <div className="relative w-14 h-6 sm:w-16 sm:h-8 flex flex-shrink-0 items-center justify-start">
               <Image src="/RegieLogoBlack.png" alt="Regie Logo" fill className="object-contain object-left dark:opacity-0 opacity-100 transition-opacity duration-500 ease-out" priority />
               <Image src="/RegieLogoWhite.png" alt="Regie Logo" fill className="object-contain object-left opacity-0 dark:opacity-100 absolute inset-0 transition-opacity duration-500 ease-out" priority />
            </div>

            {/* Center: Text Logo */}
            <div className="flex items-center justify-center pointer-events-none" style={{ marginTop: '2px' }}>
              <span 
                className="text-foreground tracking-tighter"
                style={{ fontFamily: "'Goks', Impact, sans-serif", fontSize: 'clamp(1.5rem, 2.5vh, 2rem)', lineHeight: 1, paddingBottom: '2px' }}
              >
                regie<span className="text-primary">.</span>
              </span>
            </div>

            {/* Right: Theme Toggler */}
            <div className="flex items-center justify-end w-14 sm:w-16 flex-shrink-0">
              <AnimatedThemeToggler />
            </div>
          </div>
        </div>

        {/* 2. MIDDLE CONTENT */}
        <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0 py-[1vh] z-10 pointer-events-none">
          <div className="flex flex-col items-center justify-center w-full max-w-5xl" style={{ gap: 'clamp(0.5rem, 1.5vh, 2rem)' }}>
            
            {/* Badge */}
            <div className="flex items-center justify-center bg-card px-3 py-[0.5vh] rounded-full shadow-md shadow-black/10 dark:shadow-white/5 border border-border font-medium pointer-events-auto" style={{ fontSize: 'clamp(0.6rem, 1.2vh, 0.75rem)', marginBottom: 'clamp(0.25rem, 1vh, 0.5rem)' }}>
              <ShinyText speed={3}>
                <Star className="w-[1.5vh] h-[1.5vh] min-w-[0.75rem] min-h-[0.75rem] mr-[0.5vh]" />
                <span>Sınırların Ötesinde</span>
              </ShinyText>
            </div>

            {/* Headline */}
            <h1 className="font-bold text-center text-foreground tracking-tighter drop-shadow-sm px-2 pointer-events-auto" style={{ fontSize: 'clamp(1.75rem, 4.5vh, 4.5rem)', lineHeight: '1.1' }}>
              Yayın Yönetiminin Geleceğine Erken Erişim
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-center max-w-2xl leading-snug px-4 pointer-events-auto" style={{ fontSize: 'clamp(0.75rem, 1.8vh, 1.125rem)', marginTop: 'clamp(0.25rem, 1vh, 1rem)' }}>
              Devrim niteliğindeki AI destekli reji asistanına ilk sen sahip ol. 
              Şimdi katıl ve yayıncılığın geleceğini yakala!
            </p>

            {/* Form */}
            <div className="w-full max-w-lg flex flex-col items-center px-4 pointer-events-auto" style={{ marginTop: 'clamp(1rem, 2vh, 3rem)' }}>
              <motion.form 
                onSubmit={handleSubmit}
                animate={error !== null ? { x: [-8, 8, -8, 8, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`relative flex items-center w-full bg-card rounded-full shadow-xl shadow-black/30 dark:shadow-white/20 border p-1 focus-within:shadow-2xl focus-within:shadow-black/50 dark:focus-within:shadow-white/30 transition-all duration-500 ease-out ${error !== null ? 'border-red-500/50' : 'border-border'}`}
                style={{ height: 'clamp(3rem, 7vh, 4rem)' }}
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
                  className="flex-1 bg-transparent border-none outline-none px-4 text-foreground placeholder:text-muted-foreground w-full h-full"
                  style={{ fontSize: 'clamp(0.8rem, 1.8vh, 1rem)' }}
                />
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="relative overflow-hidden group bg-primary text-primary-foreground px-[2vw] sm:px-6 h-full rounded-full font-semibold flex items-center justify-center min-w-[100px] sm:min-w-[130px] border-2 border-transparent hover:bg-transparent hover:text-foreground hover:border-primary disabled:opacity-80 disabled:pointer-events-none transition-all duration-500 ease-out shadow-[0_0_20px_rgba(105,220,158,0.24)] hover:shadow-[0_0_24px_rgba(105,220,158,0.4)]"
                  style={{ fontSize: 'clamp(0.75rem, 1.5vh, 0.9rem)' }}
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
                        <div className="relative flex items-center justify-center w-[2vh] h-[2vh] min-w-[1rem] min-h-[1rem] overflow-hidden">
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
                    <ArrowRight className="w-[2vh] h-[2vh] min-w-[1rem] min-h-[1rem]" />
                    Katıl
                  </div>
                </button>
              </motion.form>

              {/* Error Message */}
              <div className="w-full flex justify-center" style={{ height: 'clamp(1.5rem, 3vh, 2rem)', marginTop: 'clamp(0.5rem, 1vh, 1rem)' }}>
                <AnimatePresence>
                    {error !== null && (
                        <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-red-500 font-medium flex items-center gap-1.5 bg-red-50 dark:bg-red-950/30 px-3 py-0.5 rounded-full border border-red-200 dark:border-red-900/50 whitespace-nowrap"
                            style={{ fontSize: 'clamp(0.65rem, 1.4vh, 0.85rem)' }}
                        >
                            <AlertCircle className="w-[1.5vh] h-[1.5vh] min-w-[0.75rem] min-h-[0.75rem] flex-shrink-0" />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
              </div>
            </div>

            {/* Avatars */}
            <div className="flex flex-col items-center pointer-events-auto" style={{ gap: 'clamp(0.25rem, 1vh, 0.75rem)', marginTop: 'clamp(0.5rem, 2vh, 2rem)' }}>
              <div className="flex" style={{ paddingLeft: 'clamp(0.5rem, 1.5vh, 1rem)' }}>
                <div className="rounded-full bg-muted border-2 border-background overflow-hidden shadow-lg shadow-black/40 dark:shadow-white/20" style={{ width: 'clamp(1.75rem, 4vh, 2.5rem)', height: 'clamp(1.75rem, 4vh, 2.5rem)', marginLeft: 'calc(clamp(1.75rem, 4vh, 2.5rem) * -0.4)' }}><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-full h-full object-cover" /></div>
                <div className="rounded-full bg-muted border-2 border-background overflow-hidden shadow-lg shadow-black/40 dark:shadow-white/20" style={{ width: 'clamp(1.75rem, 4vh, 2.5rem)', height: 'clamp(1.75rem, 4vh, 2.5rem)', marginLeft: 'calc(clamp(1.75rem, 4vh, 2.5rem) * -0.4)' }}><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="avatar" className="w-full h-full object-cover" /></div>
                <div className="rounded-full bg-muted border-2 border-background overflow-hidden shadow-lg shadow-black/40 dark:shadow-white/20" style={{ width: 'clamp(1.75rem, 4vh, 2.5rem)', height: 'clamp(1.75rem, 4vh, 2.5rem)', marginLeft: 'calc(clamp(1.75rem, 4vh, 2.5rem) * -0.4)' }}><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="avatar" className="w-full h-full object-cover" /></div>
                <div className="rounded-full bg-card border-2 border-background overflow-hidden shadow-lg shadow-black/40 dark:shadow-white/20 flex items-center justify-center font-bold text-muted-foreground" style={{ width: 'clamp(1.75rem, 4vh, 2.5rem)', height: 'clamp(1.75rem, 4vh, 2.5rem)', marginLeft: 'calc(clamp(1.75rem, 4vh, 2.5rem) * -0.4)', fontSize: 'clamp(0.6rem, 1.2vh, 0.8rem)' }}>+</div>
              </div>
              <span className="text-muted-foreground font-medium" style={{ fontSize: 'clamp(0.65rem, 1.5vh, 0.85rem)' }}>
                <Counter from={0} to={waitlistCount} /> yayıncı tarafından bekleniyor
              </span>
            </div>

            {/* Features Grid - Premium Redesign */}
            <div className="grid grid-cols-1 sm:grid-cols-3 w-full pointer-events-auto" style={{ gap: 'clamp(0.5rem, 2vh, 1.5rem)', marginTop: 'clamp(1rem, 3vh, 3rem)' }}>
              
              {/* Card 1 */}
              <div className="group relative w-full rounded-[clamp(1rem,3vh,2rem)] bg-card border border-border/60 hover:border-primary/40 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-xl shadow-black/20 dark:shadow-white/5 hover:shadow-2xl hover:shadow-black/40 dark:hover:shadow-[0_0_30px_rgba(105,220,158,0.15)] hover:-translate-y-1 z-10 flex flex-col justify-between" style={{ padding: 'clamp(1rem, 2.5vh, 1.5rem)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                <div className="relative flex flex-col h-full">
                  <div className="flex items-center justify-between" style={{ marginBottom: 'clamp(1rem, 2.5vh, 2rem)' }}>
                    <div className="flex items-center justify-center rounded-[clamp(0.75rem,2vh,1rem)] bg-card border border-border shadow-[0_5px_15px_-3px_rgba(0,0,0,0.1)] dark:shadow-[0_5px_15px_-3px_rgba(255,255,255,0.05)] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]" style={{ width: 'clamp(2.5rem, 6vh, 3.5rem)', height: 'clamp(2.5rem, 6vh, 3.5rem)' }}>
                      <Mic className="text-foreground/80 group-hover:text-primary transition-colors duration-500" style={{ width: 'clamp(1.25rem, 3vh, 1.75rem)', height: 'clamp(1.25rem, 3vh, 1.75rem)' }} />
                    </div>
                    <div className="w-8 h-1 rounded-full bg-border/50 group-hover:bg-primary/20 transition-colors duration-500" />
                  </div>
                  <div className="mt-auto text-left">
                    <h3 className="font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-500" style={{ fontSize: 'clamp(0.9rem, 2vh, 1.25rem)', marginBottom: 'clamp(0.25rem, 1vh, 0.75rem)' }}>
                      Otonom Sesli Komuta
                    </h3>
                    <p className="text-muted-foreground leading-snug" style={{ fontSize: 'clamp(0.7rem, 1.6vh, 0.95rem)' }}>
                      Yayınını sadece konuşarak yönet. Rejiye ihtiyaç duymadan saniyeler içinde sahneler arası geçiş yap.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative w-full rounded-[clamp(1rem,3vh,2rem)] bg-card border border-border/60 hover:border-ai-accent/40 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-xl shadow-black/20 dark:shadow-white/5 hover:shadow-2xl hover:shadow-black/40 dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:-translate-y-1 z-10 flex flex-col justify-between" style={{ padding: 'clamp(1rem, 2.5vh, 1.5rem)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                <div className="relative flex flex-col h-full">
                  <div className="flex items-center justify-between" style={{ marginBottom: 'clamp(1rem, 2.5vh, 2rem)' }}>
                    <div className="flex items-center justify-center rounded-[clamp(0.75rem,2vh,1rem)] bg-card border border-border shadow-[0_5px_15px_-3px_rgba(0,0,0,0.1)] dark:shadow-[0_5px_15px_-3px_rgba(255,255,255,0.05)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]" style={{ width: 'clamp(2.5rem, 6vh, 3.5rem)', height: 'clamp(2.5rem, 6vh, 3.5rem)' }}>
                      <ShieldAlert className="text-foreground/80 group-hover:text-ai-accent transition-colors duration-500" style={{ width: 'clamp(1.25rem, 3vh, 1.75rem)', height: 'clamp(1.25rem, 3vh, 1.75rem)' }} />
                    </div>
                    <div className="w-8 h-1 rounded-full bg-border/50 group-hover:bg-ai-accent/30 transition-colors duration-500" />
                  </div>
                  <div className="mt-auto text-left">
                    <h3 className="font-bold text-foreground tracking-tight group-hover:text-ai-accent transition-colors duration-500" style={{ fontSize: 'clamp(0.9rem, 2vh, 1.25rem)', marginBottom: 'clamp(0.25rem, 1vh, 0.75rem)' }}>
                      Yapay Zeka Kalkanı
                    </h3>
                    <p className="text-muted-foreground leading-snug" style={{ fontSize: 'clamp(0.7rem, 1.6vh, 0.95rem)' }}>
                      İstenmeyen kelimeleri anında tespit edip sansürler. Kanalın güvende kalır, sen rahat edersin.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative w-full rounded-[clamp(1rem,3vh,2rem)] bg-card border border-border/60 hover:border-primary/40 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-xl shadow-black/20 dark:shadow-white/5 hover:shadow-2xl hover:shadow-black/40 dark:hover:shadow-[0_0_30px_rgba(105,220,158,0.15)] hover:-translate-y-1 z-10 flex flex-col justify-between" style={{ padding: 'clamp(1rem, 2.5vh, 1.5rem)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                <div className="relative flex flex-col h-full">
                  <div className="flex items-center justify-between" style={{ marginBottom: 'clamp(1rem, 2.5vh, 2rem)' }}>
                    <div className="flex items-center justify-center rounded-[clamp(0.75rem,2vh,1rem)] bg-card border border-border shadow-[0_5px_15px_-3px_rgba(0,0,0,0.1)] dark:shadow-[0_5px_15px_-3px_rgba(255,255,255,0.05)] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]" style={{ width: 'clamp(2.5rem, 6vh, 3.5rem)', height: 'clamp(2.5rem, 6vh, 3.5rem)' }}>
                      <LayoutDashboard className="text-foreground/80 group-hover:text-primary transition-colors duration-500" style={{ width: 'clamp(1.25rem, 3vh, 1.75rem)', height: 'clamp(1.25rem, 3vh, 1.75rem)' }} />
                    </div>
                    <div className="w-8 h-1 rounded-full bg-border/50 group-hover:bg-primary/20 transition-colors duration-500" />
                  </div>
                  <div className="mt-auto text-left">
                    <h3 className="font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-500" style={{ fontSize: 'clamp(0.9rem, 2vh, 1.25rem)', marginBottom: 'clamp(0.25rem, 1vh, 0.75rem)' }}>
                      Kusursuz Entegrasyon
                    </h3>
                    <p className="text-muted-foreground leading-snug" style={{ fontSize: 'clamp(0.7rem, 1.6vh, 0.95rem)' }}>
                      OBS, Streamlabs ve yayın donanımlarınla hiçbir ekstra kuruluma ihtiyaç duymadan senkronize ol.
                    </p>
                  </div>
                </div>
              </div>

            </div>
            
          </div>
        </div>

        {/* 3. BOTTOM FOOTER */}
        <div className="w-full flex justify-center flex-shrink-0" style={{ marginTop: 'clamp(1rem, 2vh, 3rem)', marginBottom: 'clamp(0.5rem, 1vh, 2rem)' }}>
          <div className="flex flex-col items-center" style={{ gap: 'clamp(0.25rem, 1vh, 0.5rem)' }}>
            <span className="font-semibold uppercase tracking-widest text-muted-foreground/60" style={{ fontSize: 'clamp(0.55rem, 1.2vh, 0.75rem)' }}>Designed & Developed by</span>
            <a 
              href="https://www.thezephris.space/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group px-3 py-1 rounded-full bg-card shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_20px_rgba(255,255,255,0.03)] border border-border hover:border-primary/40 font-semibold text-foreground hover:bg-muted flex items-center gap-1.5 hover:-translate-y-0.5 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{ fontSize: 'clamp(0.65rem, 1.5vh, 0.85rem)' }}
            >
              <div className="rounded-full bg-primary flex items-center justify-center group-hover:scale-[1.15] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]" style={{ width: 'clamp(0.75rem, 1.5vh, 1rem)', height: 'clamp(0.75rem, 1.5vh, 1rem)' }}>
                <span className="text-primary-foreground font-bold leading-none" style={{ fontSize: 'clamp(0.4rem, 0.8vh, 0.6rem)' }}>Z</span>
              </div>
              thezephris.space
              <ExternalLink className="text-muted-foreground group-hover:text-foreground transition-colors duration-700" style={{ width: 'clamp(0.75rem, 1.5vh, 1rem)', height: 'clamp(0.75rem, 1.5vh, 1rem)' }} />
            </a>
          </div>
        </div>

        {/* Success & Already Registered Modals */}
        <AnimatePresence>
          {(status === "success" || status === "already_registered") && (
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

                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-6 sm:mb-8 relative ${status === "success" ? "bg-green-100 dark:bg-green-900/30" : "bg-orange-100 dark:bg-orange-900/30"}`}>
                  <div className={`absolute inset-0 rounded-full scale-125 -z-10 ${status === "success" ? "bg-green-200/50 dark:bg-green-800/20" : "bg-orange-200/50 dark:bg-orange-800/20"}`} />
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-lg ${status === "success" ? "bg-[#16a34a] shadow-green-500/30" : "bg-orange-500 shadow-orange-500/30"}`}>
                    {status === "success" ? <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" /> : <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />}
                  </div>
                </div>

                <h2 className="font-bold text-foreground mb-3 sm:mb-4" style={{ fontSize: 'clamp(1.5rem, 3.5vh, 2.25rem)', lineHeight: '1.2' }}>
                  {status === "success" ? (
                    <>You have been <br /> added to our <span className="text-[#16a34a]">waitlist!</span></>
                  ) : (
                    <>You are already <br /> on the <span className="text-orange-500">waitlist!</span></>
                  )}
                </h2>
                
                <p className="text-muted-foreground mb-8 sm:mb-10 max-w-[280px] leading-relaxed" style={{ fontSize: 'clamp(0.85rem, 2vh, 1rem)' }}>
                  {status === "success" ? 
                    "Thank you for joining, you'll be the first to know when we are ready!" : 
                    "We already have this email in our system. We will notify you soon!"}
                </p>

                <div className="flex flex-col items-center gap-2 sm:gap-3 relative z-10">
                  <div className="flex -space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted border-2 border-card overflow-hidden shadow-sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" alt="avatar" /></div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted border-2 border-card overflow-hidden shadow-sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" alt="avatar" /></div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted border-2 border-card overflow-hidden shadow-sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" alt="avatar" /></div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted border-2 border-card overflow-hidden shadow-sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" alt="avatar" /></div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted border-2 border-card overflow-hidden shadow-sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=5" alt="avatar" /></div>
                  </div>
                  <span className="text-muted-foreground font-medium mt-1" style={{ fontSize: 'clamp(0.65rem, 1.5vh, 0.75rem)' }}>You&apos;re not alone, <span className="text-[#16a34a] font-bold">{waitlistCount}</span> people joined!</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </ClickSpark>
  );
}
