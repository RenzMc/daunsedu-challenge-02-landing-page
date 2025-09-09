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
  const [showEarlyOverlay, setShowEarlyOverlay] = useState(false);

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
    } catch {}

    setLoadingMessage("Mempersiapkan video...");
    setHasStarted(true);

    try {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise;
      }

      // coba unmute — jika browser blok, tetap fine (akan tetap mute)
      try {
        video.muted = false;
        video.volume = 0.8;
      } catch (e) {
        console.warn("Unmute gagal:", e);
      }

      setIsPlaying(true);
      setLoadingMessage(null);

      // overlay awal muncul cepat (mis. 600ms setelah playing) supaya user lihat teks
      setTimeout(() => setShowEarlyOverlay(true), 600);
    } catch (err) {
      console.error("play() failed:", err);
      // fallback: coba play dengan mute lagi
      try {
        video.muted = true;
        const p = video.play();
        if (p !== undefined) await p;
        setIsPlaying(true);
        setLoadingMessage(null);
        setTimeout(() => setShowEarlyOverlay(true), 600);
      } catch (err2) {
        console.error("fallback play() failed:", err2);
        setLoadingMessage("Tidak bisa memutar video — lanjut ke tampilan selanjutnya...");
        setTimeout(() => onComplete(), 26000);
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      // tetap biarkan stage 1 atur di 10s jika kamu ingin efek delayed
      if (video.currentTime >= 10 && stage === 0) {
        setStage(1);
      }
    };

    const onEnded = () => onComplete();

    const onError = (ev: any) => {
      console.error("Video error event:", ev);
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
        /* pastikan video di bawah overlay */
        .video-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: 10; /* rendah */
        }

        /* overlay utama (start screen) */
        .start-overlay {
          position: fixed;
          inset: 0;
          z-index: 90; /* jauh di atas video */
        }

        /* overlay loading */
        .loading-overlay {
          position: fixed;
          inset: 0;
          z-index: 95;
        }

        /* overlay stage (text di atas video) */
        .stage-overlay {
          position: fixed;
          inset: 0;
          z-index: 99; /* pastikan tertinggi */
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        /* Pastikan teks selalu terlihat (fallback warna putih) */
        .cosmic-text {
          color: white; /* fallback agar selalu terlihat */
          text-shadow: 0 6px 30px rgba(0,0,0,0.6), 0 0 20px rgba(6,182,212,0.15);
          -webkit-font-smoothing: antialiased;
        }

        /* Glowing effect */
        .glow {
          filter: drop-shadow(0 8px 40px rgba(6,182,212,0.12));
        }

        /* Jika kamu tetap ingin gradient text pada browser yang support,
           bisa aktifkan property ini — tapi jangan set text jadi transparent */
        .cosmic-text.gradient {
          /* Sebagai catatan: beberapa browser memerlukan -webkit-text-fill-color: transparent untuk gradient text,
             itu bisa membuat teks menjadi invisible di browser non-support. Jadi aku tidak memakai text-fill transparent. */
          background: linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4);
          background-clip: text;
          -webkit-background-clip: text;
          /* tidak memakai -webkit-text-fill-color supaya tidak transparan di beberapa browser */
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
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>

          <div className="flex flex-col items-center justify-center text-center relative z-10 px-4">
            <button
              aria-label="Begin Journey"
              onClick={handleStartJourney}
              className="relative w-44 h-44 md:w-56 md:h-56 rounded-full flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 shadow-2xl"
            >
              <Play className="w-12 h-12 md:w-16 md:h-16 text-white mb-2" />
              <div className="text-white font-bold">Begin Journey</div>
            </button>

            <h1 className="text-3xl md:text-5xl mt-8 text-white font-bold">Welcome to RenzMc's Galaxy</h1>
            <p className="text-white/90 mt-2 max-w-xl text-center">Klik tombol untuk mulai (diperlukan gesture).</p>
            {loadingMessage && <p className="text-sm text-yellow-300 mt-4">{loadingMessage}</p>}
          </div>
        </div>
      )}

      {/* VIDEO (selalu di DOM) */}
      <video
        ref={videoRef}
        className="video-fullscreen"
        playsInline
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
        Browser Anda tidak mendukung tag video.
      </video>

      {/* Overlay loading ketika mulai */}
      {hasStarted && !isPlaying && (
        <div className="loading-overlay flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-white">Memutar video... {loadingMessage ?? ""}</p>
          </div>
        </div>
      )}

      {/* STAGE OVERLAY — tampil jika kondisi terpenuhi:
          - sudah playing dan (stage sudah 1 || showEarlyOverlay true)
      */}
      {isPlaying && (stage >= 1 || showEarlyOverlay) && (
        <div className="stage-overlay">
          <div className="text-center welcome-appear pointer-events-none">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 cosmic-text gradient glow">
              Welcome to RenzMc's Galaxy
            </h1>
            <p className="text-xl md:text-3xl cosmic-text">Witness the birth of the universe...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BigBangIntro;
