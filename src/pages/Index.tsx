import { useState, useEffect, useRef } from "react";
import CosmicSidebar from "@/components/CosmicSidebar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";
import BigBangIntro from "@/components/BigBangIntro";
import cosmicBg from "@/assets/cosmic-bg.jpg";
import nebulaSound from "@/assets/nebula.mp3";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    // Inisialisasi audio dengan preload
    audioRef.current = new Audio(nebulaSound);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    audioRef.current.preload = "auto";

    // Event listener untuk cross-browser compatibility
    audioRef.current.addEventListener("canplaythrough", () => {
      console.log("Audio ready to play");
    });

    audioRef.current.addEventListener("error", (e) => {
      console.error("Audio error:", e);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Function untuk start audio dengan error handling
  const startAudio = async () => {
    if (audioRef.current && !audioStarted) {
      try {
        // Reset audio position jika sudah pernah diplay
        audioRef.current.currentTime = 0;

        // Play dengan promise handling
        await audioRef.current.play();
        setAudioStarted(true);
        console.log("Audio started successfully");

        // Remove event listeners setelah audio berhasil diplay
        removeUserInteractionListeners();
      } catch (error) {
        console.error("Failed to play audio:", error);

        // Retry mechanism untuk beberapa browser
        setTimeout(() => {
          if (audioRef.current && !audioStarted) {
            audioRef.current.play().catch(console.error);
          }
        }, 1000);
      }
    }
  };

  // Event handlers untuk berbagai jenis interaksi
  const handleUserInteraction = () => {
    startAudio();
  };

  // Function untuk add event listeners
  const addUserInteractionListeners = () => {
    // Mouse events
    document.addEventListener("click", handleUserInteraction, {
      once: true,
      passive: true,
    });
    document.addEventListener("mousedown", handleUserInteraction, {
      once: true,
      passive: true,
    });

    // Touch events untuk mobile
    document.addEventListener("touchstart", handleUserInteraction, {
      once: true,
      passive: true,
    });
    document.addEventListener("touchend", handleUserInteraction, {
      once: true,
      passive: true,
    });

    // Scroll events
    document.addEventListener("scroll", handleUserInteraction, {
      once: true,
      passive: true,
    });
    document.addEventListener("wheel", handleUserInteraction, {
      once: true,
      passive: true,
    });

    // Keyboard events
    document.addEventListener("keydown", handleUserInteraction, {
      once: true,
      passive: true,
    });

    // Mobile specific events
    window.addEventListener("orientationchange", handleUserInteraction, {
      once: true,
      passive: true,
    });

    // Focus events
    window.addEventListener("focus", handleUserInteraction, {
      once: true,
      passive: true,
    });
  };

  // Function untuk remove event listeners
  const removeUserInteractionListeners = () => {
    document.removeEventListener("click", handleUserInteraction);
    document.removeEventListener("mousedown", handleUserInteraction);
    document.removeEventListener("touchstart", handleUserInteraction);
    document.removeEventListener("touchend", handleUserInteraction);
    document.removeEventListener("scroll", handleUserInteraction);
    document.removeEventListener("wheel", handleUserInteraction);
    document.removeEventListener("keydown", handleUserInteraction);
    window.removeEventListener("orientationchange", handleUserInteraction);
    window.removeEventListener("focus", handleUserInteraction);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);

    // Add event listeners setelah intro selesai
    setTimeout(() => {
      addUserInteractionListeners();
    }, 100);
  };

  // Cleanup saat component unmount
  useEffect(() => {
    return () => {
      removeUserInteractionListeners();
    };
  }, []);

  // Handle visibility change (ketika user switch tab/app)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (audioRef.current && audioStarted) {
        if (document.hidden) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch(console.error);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [audioStarted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {showIntro && <BigBangIntro onComplete={handleIntroComplete} />}

      {!showIntro && (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          {/* Audio Status Indicator (Optional - bisa dihapus) */}
          {!audioStarted && (
            <div className="fixed top-4 right-4 z-50 bg-primary/20 backdrop-blur-sm rounded-lg p-2 text-xs text-primary border border-primary/30">
              🎵 Click anywhere to start cosmic sounds
            </div>
          )}

          {/* Cosmic Background */}
          <div
            className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20 animate-parallax-slow pointer-events-none"
            style={{ backgroundImage: `url(${cosmicBg})` }}
          />

          {/* Main Layout */}
          <div className="relative z-10 flex min-h-screen">
            {/* Sidebar */}
            <CosmicSidebar />

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 xl:ml-72">
              {/* Hero Section */}
              <HeroSection />

              {/* About Section */}
              <AboutSection />

              {/* Connect Section */}
              <ConnectSection />

              {/* Footer */}
              <Footer />
            </main>
          </div>

          {/* Global Cosmic Effects */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Large Floating Nebula */}
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-nebula-flow" />
            <div
              className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/8 to-primary/8 rounded-full blur-3xl animate-nebula-flow"
              style={{ animationDelay: "4s" }}
            />

            {/* Cosmic Particles */}
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 bg-accent/30 rounded-full animate-cosmic-drift"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `-5px`,
                  animationDelay: `${Math.random() * 40}s`,
                  animationDuration: `${40 + Math.random() * 20}s`,
                }}
              />
            ))}

            {/* Stellar Background Rings */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen border border-primary/5 rounded-full animate-stellar-rotate" />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] border border-accent/5 rounded-full animate-stellar-rotate"
              style={{
                animationDirection: "reverse",
                animationDuration: "40s",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] border border-primary/3 rounded-full animate-stellar-rotate"
              style={{ animationDuration: "60s" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
