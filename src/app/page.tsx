"use client";
import { AboutSection } from "@/components/sections/about";
import { ContactPreviewSection } from "@/components/sections/contact-preview";
import { HeroSection } from "@/components/sections/hero";
import { PortfolioSection } from "@/components/sections/portfolio";
import { ServicesSection } from "@/components/sections/services";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";


function IntroOverlay() {
  const [animationPhase, setAnimationPhase] = useState("initial");

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase("nameVisible"), 400);
    const timer2 = setTimeout(() => setAnimationPhase("lineAppear"), 2000);
    const timer3 = setTimeout(() => setAnimationPhase("splitScreen"), 2800);
    const timer4 = setTimeout(() => setAnimationPhase("exit"), 4000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="intro-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: animationPhase === "exit" ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50"
        style={{ overflow: "visible" }}
      >

        <div className="relative z-50" style={{ overflow: "visible" }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: animationPhase !== "initial" ? 1 : 0, 
              opacity: animationPhase !== "initial" && animationPhase !== "exit" ? 0.4 : 0 
            }}
            transition={{ 
              duration: 1.0, 
              ease: "easeOut" 
            }}
            className="absolute -inset-20 rounded-full bg-gradient-to-r from-purple-400/30 via-blue-300/30 to-pink-300/30 blur-2xl"
            style={{ zIndex: -1 }}
          />

          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={{ 
              y: 0, 
              opacity: animationPhase === "nameVisible" || animationPhase === "lineAppear" ? 1 : 0, 
              scale: animationPhase === "nameVisible" || animationPhase === "lineAppear" ? 1 : 0.9 
            }}
            transition={{ 
              delay: 0.2, 
              duration: 0.8, 
              ease: "easeOut" 
            }}
            className="relative text-center z-50"
            style={{ overflow: "visible" }}
          >
            <div 
              className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-purple-600 to-blue-600 tracking-tight"
              style={{ 
                lineHeight: "1.2", 
                paddingTop: "0.2em", 
                paddingBottom: "0.3em",
                overflow: "visible"
              }}
            >
              Barış Mercan
            </div>
            
            {/* Parçacık Efektleri */}
            <div className="absolute -inset-12 pointer-events-none" style={{ zIndex: -1 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: animationPhase === "lineAppear" ? [0, 0.8, 0] : 0,
                    scale: animationPhase === "lineAppear" ? [0, 1, 0] : 0,
                    x: animationPhase === "lineAppear" ? [(Math.random() - 0.5) * 120] : 0,
                    y: animationPhase === "lineAppear" ? [(Math.random() - 0.5) * 120] : 0
                  }}
                  transition={{
                    delay: 0.3 + i * 0.1,
                    duration: 1.2,
                    ease: "easeOut"
                  }}
                  className="absolute w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                  style={{
                    left: `${30 + Math.random() * 40}%`,
                    top: `${30 + Math.random() * 40}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Çizgi Animasyonu */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ 
            scaleY: animationPhase === "lineAppear" || animationPhase === "splitScreen" ? 1 : 0,
          }}
          transition={{ 
            duration: 0.7, 
            ease: "easeOut"
          }}
          className="absolute inset-y-0 left-1/2 transform -translate-x-0.5 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 origin-top z-30"
        />

        {/* Sol Panel */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ 
            x: animationPhase === "exit" ? "-100%" : 0 
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut" 
          }}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white to-gray-50 z-10"
        />
        
        {/* Sağ Panel */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ 
            x: animationPhase === "exit" ? "100%" : 0 
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut" 
          }}
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white to-gray-50 z-10"
        />

        {/* Enerji Dalgası */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: animationPhase === "splitScreen" ? [0, 2, 0] : 0,
            opacity: animationPhase === "splitScreen" ? [0, 0.6, 0] : 0,
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-px bg-gradient-to-r from-transparent via-white to-transparent z-40"
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const readyTimer = setTimeout(() => setPageReady(true), 50);
    
    // Ana animasyon süresi
    const introTimer = setTimeout(() => setShowIntro(false), 4500);
    
    return () => {
      clearTimeout(readyTimer);
      clearTimeout(introTimer);
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={showIntro ? "invisible" : "visible"}
      >
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ServicesSection />
        <ContactPreviewSection />
      </motion.div>

      {showIntro && pageReady && <IntroOverlay />}
    </>
  );
}