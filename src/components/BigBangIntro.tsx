import React, { useEffect, useRef, useState } from "react";
import { Play, Sparkles, Star, Zap } from "lucide-react";
import galaxyHero from "@/assets/big-bang.mp4";

interface BigBangIntroProps {
  onComplete: () => void;
  publicVideoPath?: string;
}

const BigBangIntro: React.FC<BigBangIntroProps> = ({ onComplete, publicVideoPath }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stage, setStage] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);

  const videoSrc = publicVideoPath ? publicVideoPath : (galaxyHero as unknown as string);

  const handleStartJourney = async () => {
    const video = videoRef.current;
    if (!video) {
      setLoadingMessage("Video tidak tersedia.");
      setTimeout(() => onComplete(), 26000);
      return;
    }

    try {
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");
    } catch (e) {}

    setLoadingMessage("Mempersiapkan video...");
    setHasStarted(true);

    try {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise;
      }

      try {
        video.muted = false;
        video.volume = 0.8;
      } catch (e) {}

      setIsPlaying(true);
      setLoadingMessage(null);
    } catch (err) {
      try {
        await (async () => {
          video.muted = true;
          const p = video.play();
          if (p !== undefined) await p;
        })();
        setIsPlaying(true);
        setLoadingMessage(null);
      } catch (err2) {
        setLoadingMessage("Tidak bisa memutar video — lanjut ke tampilan selanjutnya...");
        setTimeout(() => onComplete(), 26000);
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.currentTime >= 10 && stage === 0) {
        setStage(1);
      }
    };

    const onEnded = () => {
      onComplete();
    };

    const onError = (ev: any) => {
      setLoadingMessage("Terjadi error saat memuat video. Cek network/path.");
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
    };
  }, [onComplete, stage]);

  useEffect(() => {
    if (hasStarted && isPlaying) {
      const t = setTimeout(() => {
        onComplete();
      }, 28000);
      return () => clearTimeout(t);
    }
  }, [hasStarted, isPlaying, onComplete]);

  return (
    <>
      <style jsx>{`
        @keyframes galaxy-spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes cosmic-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(6, 182, 212, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(6, 182, 212, 0.8), 0 0 80px rgba(139, 92, 246, 0.6);
          }
        }

        @keyframes text-glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(139, 92, 246, 0.6);
          }
          50% {
            text-shadow: 0 0 20px rgba(6, 182, 212, 1), 0 0 40px rgba(139, 92, 246, 0.8);
          }
        }

        @keyframes stars-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes cosmic-glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(6, 182, 212, 0.6);
          }
          50% {
            text-shadow: 0 0 30px rgba(6, 182, 212, 1), 0 0 60px rgba(139, 92, 246, 0.8);
          }
        }

        @keyframes welcome-appear {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes star-orbit {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }

        .galaxy-button {
          background: radial-gradient(circle at center, 
            rgba(139, 92, 246, 0.9) 0%, 
            rgba(6, 182, 212, 0.7) 40%, 
            rgba(139, 92, 246, 0.5) 70%, 
            rgba(0, 0, 0, 0.8) 100%);
          animation: cosmic-pulse 3s ease-in-out infinite;
        }

        .galaxy-button:hover {
          animation: cosmic-pulse 1.5s ease-in-out infinite;
          transform: scale(1.05);
        }

        .welcome-text {
          animation: text-glow 2s ease-in-out infinite;
        }

        .floating-stars {
          animation: stars-twinkle 2s ease-in-out infinite;
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }

        .cosmic-text {
          background: linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4);
          background-size: 400% 100%;
          animation: cosmic-glow 2s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .welcome-appear {
          animation: welcome-appear 2s ease-out forwards;
        }

        .star-orbit {
          animation: star-orbit 8s linear infinite;
        }

        .video-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10;
          background: black;
        }

        .video-fullscreen {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .text-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 20;
          pointer-events: none;
        }
      `}</style>

      {!hasStarted && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-black via-purple-900/30 to-black flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full floating-stars"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          <div className="flex flex-col items-center justify-center text-center relative z-10 px-4">
            <div className="absolute -top-20 -left-20">
              <Sparkles className="w-8 h-8 text-cyan-400 floating-stars floating" />
            </div>
            <div className="absolute -top-16 -right-16">
              <Star className="w-6 h-6 text-purple-400 floating-stars floating" style={{ animationDelay: '0.5s' }} />
            </div>
            <div className="absolute -bottom-20 -left-16">
              <Zap className="w-7 h-7 text-pink-400 floating-stars floating" style={{ animationDelay: '1s' }} />
            </div>
            <div className="absolute -bottom-16 -right-20">
              <Sparkles className="w-8 h-8 text-cyan-400 floating-stars floating" style={{ animationDelay: '1.5s' }} />
            </div>

            <button
              aria-label="Begin Journey"
              onClick={handleStartJourney}
              className="galaxy-button relative w-48 h-48 md:w-56 md:h-56 rounded-full flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 group mb-8"
            >
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-purple-500/30" 
                   style={{ animation: 'galaxy-spin 4s linear infinite' }} />
              <div className="absolute inset-8 rounded-full bg-gradient-to-l from-cyan-400/40 via-purple-400/40 to-pink-400/40" 
                   style={{ animation: 'galaxy-spin 6s linear infinite reverse' }} />
              
              <Play className="w-12 h-12 md:w-16 md:h-16 text-white mb-3 group-hover:scale-110 transition-transform duration-300 relative z-10" fill="currentColor" />
              
              <span className="welcome-text text-white text-lg md:text-xl font-bold relative z-10">
                Begin Journey
              </span>
              <span className="welcome-text text-white/90 text-sm md:text-base font-medium relative z-10 mt-1">
                to the Stars
              </span>

              <div className="absolute inset-0" style={{ animation: 'galaxy-spin 10s linear infinite' }}>
                <Star className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 text-yellow-400" />
                <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
                <Zap className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 text-pink-400" />
                <Star className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
              </div>
            </button>

            <div className="space-y-4 max-w-2xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white welcome-text">
                Welcome to RenzMc's Galaxy
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 welcome-text">
                Embark on an epic cosmic adventure through space and time
              </p>
              
              <div className="flex items-center justify-center space-x-4 mt-6">
                <Star className="w-4 h-4 text-cyan-400 floating-stars" />
                <Sparkles className="w-5 h-5 text-purple-400 floating-stars" style={{ animationDelay: '0.3s' }} />
                <Zap className="w-4 h-4 text-pink-400 floating-stars" style={{ animationDelay: '0.6s' }} />
                <Star className="w-3 h-3 text-yellow-400 floating-stars" style={{ animationDelay: '0.9s' }} />
                <Sparkles className="w-4 h-4 text-cyan-400 floating-stars" style={{ animationDelay: '1.2s' }} />
              </div>
            </div>

            {loadingMessage && (
              <p className="text-sm text-yellow-300 mt-4 cosmic-text">{loadingMessage}</p>
            )}
          </div>
        </div>
      )}

      {/* Video Container - Z-INDEX 10 */}
      {hasStarted && (
        <div className="video-container">
          <video
            ref={videoRef}
            className="video-fullscreen"
            playsInline
            preload="auto"
          >
            <source src={videoSrc} type="video/mp4" />
            Browser Anda tidak mendukung tag video.
          </video>
        </div>
      )}

      {/* Loading Overlay - Z-INDEX 30 */}
      {hasStarted && !isPlaying && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-white text-xl cosmic-text">Loading cosmic experience...</p>
            {loadingMessage && <p className="text-white/70 text-sm mt-2">{loadingMessage}</p>}
          </div>
        </div>
      )}

      {/* Text Overlay - Z-INDEX 20 (DI ATAS VIDEO) */}
      {stage >= 1 && isPlaying && (
        <div className="text-overlay flex items-center justify-center">
          <div className="text-center welcome-appear">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="star-orbit">
                <Star className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="star-orbit" style={{ animationDelay: '-2s', animationDuration: '6s' }}>
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div className="star-orbit" style={{ animationDelay: '-4s', animationDuration: '10s' }}>
                <Zap className="w-6 h-6 text-pink-400" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl cosmic-text">
              Welcome to RenzMc's Galaxy
            </h1>
            <p className="text-xl md:text-3xl text-white/95 drop-shadow-lg cosmic-text font-light">
              Witness the birth of the universe...
            </p>
            
            <div className="flex justify-center space-x-6 mt-8">
              <Star className="w-6 h-6 text-cyan-400 animate-pulse" />
              <Sparkles className="w-7 h-7 text-purple-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
              <Zap className="w-6 h-6 text-pink-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BigBangIntro;
