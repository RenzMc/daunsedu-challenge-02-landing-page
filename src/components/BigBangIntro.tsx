import React, { useEffect, useRef, useState } from "react";
import { Play, Sparkles, Star, Zap } from "lucide-react";
import galaxyHero from "@/assets/big-bang.mp4";

interface BigBangIntroProps {
  onComplete: () => void;
  publicVideoPath?: string;
}

const BigBangIntro: React.FC<BigBangIntroProps> = ({
  onComplete,
  publicVideoPath,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stage, setStage] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [showEarlyOverlay, setShowEarlyOverlay] = useState(false);

  const earlyOverlayTimeout = useRef<number | null>(null);
  const videoSrc = publicVideoPath
    ? publicVideoPath
    : (galaxyHero as unknown as string);

  const handleStartJourney = async () => {
    const video = videoRef.current;
    if (!video) {
      setLoadingMessage("Video not available.");
      setTimeout(() => onComplete(), 26000);
      return;
    }

    try {
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");
    } catch (e) {}

    setLoadingMessage("Preparing video...");
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
      } catch (e) {
        // Continue if unmute is blocked
      }

      setIsPlaying(true);
      setLoadingMessage(null);

      if (earlyOverlayTimeout.current) {
        window.clearTimeout(earlyOverlayTimeout.current);
      }
      earlyOverlayTimeout.current = window.setTimeout(() => {
        setShowEarlyOverlay(true);
      }, 500);
    } catch (err) {
      try {
        video.muted = true;
        const p = video.play();
        if (p !== undefined) await p;
        setIsPlaying(true);
        setLoadingMessage(null);
        if (earlyOverlayTimeout.current) {
          window.clearTimeout(earlyOverlayTimeout.current);
        }
        earlyOverlayTimeout.current = window.setTimeout(() => {
          setShowEarlyOverlay(true);
        }, 500);
      } catch (err2) {
        setLoadingMessage("Cannot play video — proceeding to next view...");
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

    const onError = () => {
      setLoadingMessage("Error loading video. Check network/path.");
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
      const t = window.setTimeout(() => {
        onComplete();
      }, 28000);
      return () => clearTimeout(t);
    }
  }, [hasStarted, isPlaying, onComplete]);

  useEffect(() => {
    return () => {
      if (earlyOverlayTimeout.current) {
        window.clearTimeout(earlyOverlayTimeout.current);
      }
    };
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes galaxy-spin {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes cosmic-pulse {
          0%,
          100% {
            box-shadow:
              0 0 20px rgba(139, 92, 246, 0.5),
              0 0 40px rgba(6, 182, 212, 0.3);
          }
          50% {
            box-shadow:
              0 0 40px rgba(6, 182, 212, 0.8),
              0 0 80px rgba(139, 92, 246, 0.6);
          }
        }

        @keyframes text-glow {
          0%,
          100% {
            text-shadow:
              0 0 10px rgba(255, 255, 255, 0.9),
              0 0 20px rgba(139, 92, 246, 0.6);
          }
          50% {
            text-shadow:
              0 0 20px rgba(6, 182, 212, 1),
              0 0 40px rgba(139, 92, 246, 0.8);
          }
        }

        @keyframes cosmic-glow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes welcome-appear {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .video-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: 10;
        }

        .start-overlay {
          position: fixed;
          inset: 0;
          z-index: 80;
        }

        .loading-overlay {
          position: fixed;
          inset: 0;
          z-index: 85;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stage-overlay {
          position: fixed;
          inset: 0;
          z-index: 90;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .cosmic-text {
          color: white;
          text-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
          -webkit-font-smoothing: antialiased;
          animation: text-glow 2s ease-in-out infinite;
        }

        @supports ((-webkit-background-clip: text) or (background-clip: text)) {
          .cosmic-text.gradient {
            background: linear-gradient(
              90deg,
              #06b6d4,
              #8b5cf6,
              #ec4899,
              #06b6d4
            );
            background-size: 400% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: cosmic-glow 6s ease-in-out infinite;
            text-shadow: 0 0 18px rgba(0, 0, 0, 0.25);
          }
        }

        .glow {
          filter: drop-shadow(0 8px 40px rgba(6, 182, 212, 0.12));
        }

        .galaxy-button {
          background: radial-gradient(
            circle at center,
            rgba(139, 92, 246, 0.95) 0%,
            rgba(6, 182, 212, 0.8) 45%,
            rgba(139, 92, 246, 0.6) 70%,
            rgba(0, 0, 0, 0.9) 100%
          );
          animation: cosmic-pulse 3s ease-in-out infinite;
        }

        .welcome-appear {
          animation: welcome-appear 900ms cubic-bezier(0.2, 0.8, 0.2, 1)
            forwards;
        }
      `}</style>

      {/* START SCREEN */}
      {!hasStarted && (
        <div className="start-overlay bg-gradient-to-br from-black via-purple-900/30 to-black flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(80)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="flex flex-col items-center justify-center text-center relative z-10 px-4">
            <button
              aria-label="Begin Journey"
              onClick={handleStartJourney}
              className="galaxy-button relative w-44 h-44 md:w-56 md:h-56 rounded-full flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              <Play className="w-12 h-12 md:w-16 md:h-16 text-white mb-2" />
              <div className="text-white font-bold">Begin Journey</div>
            </button>

            <h1 className="text-3xl md:text-5xl mt-8 text-white font-bold">
              Welcome to RenzMc's Galaxy
            </h1>
            <p className="text-white/90 mt-2 max-w-xl text-center">
              Embark on an epic cosmic experience. Click the button to start.
            </p>
            {loadingMessage && (
              <p className="text-sm text-yellow-300 mt-4">{loadingMessage}</p>
            )}
          </div>
        </div>
      )}

      {/* VIDEO */}
      <video
        ref={videoRef}
        className="video-fullscreen"
        playsInline
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* LOADING OVERLAY */}
      {hasStarted && !isPlaying && (
        <div className="loading-overlay bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-white">
              Playing video... {loadingMessage ?? ""}
            </p>
          </div>
        </div>
      )}

      {/* STAGE OVERLAY */}
      {isPlaying && (stage >= 1 || showEarlyOverlay) && (
        <div className="stage-overlay">
          <div className="text-center welcome-appear pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div
                style={{ animation: "galaxy-spin 8s linear infinite" }}
                className="star-orbit"
              >
                <Star className="w-6 h-6 text-cyan-400" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 cosmic-text gradient glow">
              Welcome to RenzMc's Galaxy
            </h1>
            <p className="text-xl md:text-3xl cosmic-text gradient">
              Witness the birth of the universe...
            </p>

            <div className="flex justify-center space-x-6 mt-8">
              <Star className="w-6 h-6 text-cyan-400 animate-pulse" />
              <Sparkles className="w-7 h-7 text-purple-400 animate-pulse" />
              <Zap className="w-6 h-6 text-pink-400 animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BigBangIntro;
