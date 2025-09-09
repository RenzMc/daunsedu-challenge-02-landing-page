import React, { useEffect, useRef, useState } from "react";
import { Play, Sparkles, Star, Zap } from "lucide-react";
import galaxyHero from "@/assets/big-bang.mp4";

interface BigBangIntroProps {
  onComplete: () => void;
  publicVideoPath?: string;
}

const BigBangIntro: React.FC<BigBangIntroProps> = ({ 
  onComplete, 
  publicVideoPath 
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stage, setStage] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [showEarlyOverlay, setShowEarlyOverlay] = useState(false);
  const [audioPermissionGranted, setAudioPermissionGranted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const earlyOverlayTimeout = useRef<number | null>(null);
  const videoSrc = publicVideoPath ? publicVideoPath : (galaxyHero as unknown as string);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice || isTouchDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Request audio permission for mobile
  const requestAudioPermission = async (): Promise<boolean> => {
    if (!isMobile) {
      setAudioPermissionGranted(true);
      return true;
    }

    try {
      // Try to get microphone permission as a way to request audio access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately
      setAudioPermissionGranted(true);
      return true;
    } catch (error) {
      // If microphone permission fails, try alternative approach
      try {
        // Create a temporary audio context to trigger permission
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        await audioContext.resume();
        audioContext.close();
        setAudioPermissionGranted(true);
        return true;
      } catch (audioError) {
        console.warn('Audio permission not granted, continuing with muted video');
        setAudioPermissionGranted(false);
        return false;
      }
    }
  };

  const handleStartJourney = async () => {
    const video = videoRef.current;
    if (!video) {
      setLoadingMessage("Video not available.");
      setTimeout(() => onComplete(), 26000);
      return;
    }

    setLoadingMessage("Requesting permissions...");
    
    // Request audio permission on mobile
    const hasAudioPermission = await requestAudioPermission();

    // Set video attributes for better mobile compatibility
    try {
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");
      video.setAttribute("x5-video-player-type", "h5");
      video.setAttribute("x5-video-player-fullscreen", "false");
      video.setAttribute("x5-video-orientation", "portraint");
    } catch (e) {
      console.warn('Could not set video attributes:', e);
    }

    setLoadingMessage("Preparing video...");
    setHasStarted(true);

    try {
      // Always start muted for autoplay compatibility
      video.muted = true;
      video.volume = 0;
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise;
      }

      // Try to unmute if we have permission and it's not mobile, or if mobile permission was granted
      if (hasAudioPermission && (!isMobile || audioPermissionGranted)) {
        try {
          video.muted = false;
          video.volume = 0.8;
        } catch (e) {
          console.warn('Could not unmute video:', e);
        }
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
      console.error('Video play error:', err);
      try {
        // Fallback: ensure muted playback
        video.muted = true;
        video.volume = 0;
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
        console.error('Fallback video play failed:', err2);
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

    const onError = (e: Event) => {
      console.error('Video error:', e);
      setLoadingMessage("Error loading video. Check network/path.");
    };

    const onLoadStart = () => {
      setLoadingMessage("Loading video...");
    };

    const onCanPlay = () => {
      setLoadingMessage(null);
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);
    video.addEventListener("loadstart", onLoadStart);
    video.addEventListener("canplay", onCanPlay);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      video.removeEventListener("loadstart", onLoadStart);
      video.removeEventListener("canplay", onCanPlay);
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
          0%, 100% {
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
          0%, 100% {
            text-shadow: 
              0 0 10px rgba(255,255,255,0.9), 
              0 0 20px rgba(139,92,246,0.6);
          }
          50% {
            text-shadow: 
              0 0 20px rgba(6,182,212,1), 
              0 0 40px rgba(139,92,246,0.8);
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

        /* Enhanced mobile video support */
        @media (max-width: 768px) {
          .video-fullscreen {
            object-fit: cover;
            object-position: center;
            width: 100vw;
            height: 100vh;
            max-width: 100vw;
            max-height: 100vh;
          }
        }

        /* iOS Safari specific fixes */
        @supports (-webkit-touch-callout: none) {
          .video-fullscreen {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }
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
          text-shadow: 0 8px 30px rgba(0,0,0,0.6);
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
            text-shadow: 0 0 18px rgba(0,0,0,0.25);
          }
        }

        .glow {
          filter: drop-shadow(0 8px 40px rgba(6,182,212,0.12));
        }

        .galaxy-button {
          background: radial-gradient(
            circle at center, 
            rgba(139,92,246,0.95) 0%, 
            rgba(6,182,212,0.8) 45%, 
            rgba(139,92,246,0.6) 70%, 
            rgba(0,0,0,0.9) 100%
          );
          animation: cosmic-pulse 3s ease-in-out infinite;
        }

        .welcome-appear {
          animation: welcome-appear 900ms cubic-bezier(.2,.8,.2,1) forwards;
        }

        /* Mobile-specific button adjustments */
        @media (max-width: 640px) {
          .galaxy-button {
            width: 160px;
            height: 160px;
          }
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
              className="galaxy-button relative w-44 h-44 md:w-56 md:h-56 rounded-full flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl touch-manipulation"
            >
              <Play className="w-12 h-12 md:w-16 md:h-16 text-white mb-2" />
              <div className="text-white font-bold text-sm md:text-base">Begin Journey</div>
            </button>

            <h1 className="text-2xl sm:text-3xl md:text-5xl mt-8 text-white font-bold px-4">
              Welcome to RenzMc's Galaxy
            </h1>
            <p className="text-white/90 mt-2 max-w-xl text-center text-sm sm:text-base px-4">
              Embark on an epic cosmic experience. 
              {isMobile && " We'll request audio permission for the best experience."}
            </p>
            {loadingMessage && (
              <p className="text-sm text-yellow-300 mt-4 px-4 text-center">
                {loadingMessage}
              </p>
            )}
          </div>
        </div>
      )}

      {/* VIDEO */}
      <video
        ref={videoRef}
        className="video-fullscreen"
        playsInline
        webkit-playsinline="true"
        preload="auto"
        muted
        controls={false}
        disablePictureInPicture
        x5-video-player-type="h5"
        x5-video-player-fullscreen="false"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* LOADING OVERLAY */}
      {hasStarted && !isPlaying && (
        <div className="loading-overlay bg-black">
          <div className="text-center px-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-white text-sm sm:text-base">
              {loadingMessage || "Playing video..."}
            </p>
            {isMobile && !audioPermissionGranted && (
              <p className="text-yellow-300 text-xs mt-2">
                Audio permission not granted - video will play silently
              </p>
            )}
          </div>
        </div>
      )}

      {/* STAGE OVERLAY */}
      {isPlaying && (stage >= 1 || showEarlyOverlay) && (
        <div className="stage-overlay">
          <div className="text-center welcome-appear pointer-events-none px-4">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div 
                style={{ animation: "galaxy-spin 8s linear infinite" }} 
                className="star-orbit"
              >
                <Star className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 cosmic-text gradient glow">
              Welcome to RenzMc's Galaxy
            </h1>
            <p className="text-lg sm:text-xl md:text-3xl cosmic-text gradient">
              Witness the birth of the universe...
            </p>

            <div className="flex justify-center space-x-4 sm:space-x-6 mt-6 sm:mt-8">
              <Star className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400 animate-pulse" />
              <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-purple-400 animate-pulse" />
              <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-pink-400 animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BigBangIntro;
