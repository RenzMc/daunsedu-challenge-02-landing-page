import React, { useEffect, useRef, useState } from "react";
import { Play, Sparkles, Star, Zap } from "lucide-react";
// Opsi A: import asset lewat bundler (Vite/Next). Jika ini bermasalah, gunakan Opsi B di komentar bawah.
import galaxyHero from "@/assets/big-bang.mp4";

interface BigBangIntroProps {
  onComplete: () => void;
  // optional: jika mau pakai public folder, kirimkan publicPath mis: "/big-bang.mp4"
  publicVideoPath?: string;
}

const BigBangIntro: React.FC<BigBangIntroProps> = ({ onComplete, publicVideoPath }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stage, setStage] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);

  // Membentuk src yang akan digunakan (bundler import atau public path)
  const videoSrc = publicVideoPath ? publicVideoPath : (galaxyHero as unknown as string);

  // Dipanggil saat user klik tombol Start
  const handleStartJourney = async () => {
    const video = videoRef.current;
    if (!video) {
      console.error("[BigBangIntro] videoRef is null");
      setLoadingMessage("Video tidak tersedia.");
      setTimeout(() => onComplete(), 26000);
      return;
    }

    // Pastikan atribut inline untuk iOS
    try {
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");
    } catch (e) {}

    // Reset keadaan dan beri indikator loading
    setLoadingMessage("Mempersiapkan video...");
    setHasStarted(true);

    try {
      // SAFEST APPROACH: mute dulu sebelum play -> sering diterima oleh browser
      video.muted = true;
      // biarkan browser memuat sedikit
      // request play (user gesture) -> harus berhasil di browser modern
      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise;
      }

      // Video sudah mulai, sekarang kita unmute (jika hardware/browser mengizinkan)
      try {
        video.muted = false;
        video.volume = 0.8; // volume default
      } catch (e) {
        // beberapa browser mungkin tidak mengizinkan unmute otomatis; tetap fine
        console.warn("[BigBangIntro] Unmute failed:", e);
      }

      setIsPlaying(true);
      setLoadingMessage(null);
    } catch (err) {
      console.error("[BigBangIntro] play() failed:", err);
      // fallback: coba lagi dengan muted true (beberapa device butuh ini)
      try {
        await (async () => {
          video.muted = true;
          const p = video.play();
          if (p !== undefined) await p;
        })();
        setIsPlaying(true);
        setLoadingMessage(null);
      } catch (err2) {
        console.error("[BigBangIntro] fallback play() failed:", err2);
        // Kalau masih gagal, berikan fallback: lanjut ke onComplete setelah timeout
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

    const onCanPlay = () => {
      // berguna untuk debug
      // console.log("[BigBangIntro] canplay, readyState:", video.readyState);
    };

    const onError = (ev: any) => {
      console.error("[BigBangIntro] video error event:", ev);
      setLoadingMessage("Terjadi error saat memuat video. Cek network/path.");
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, [onComplete, stage]);

  useEffect(() => {
    if (hasStarted && isPlaying) {
      // safety timeout untuk memastikan onComplete dipanggil apabila video terlalu lama
      const t = setTimeout(() => {
        onComplete();
      }, 28000);
      return () => clearTimeout(t);
    }
  }, [hasStarted, isPlaying, onComplete]);

  return (
    <>
      <style jsx>{`
        .video-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: 40;
        }
      `}</style>

      {/* START SCREEN (tombol) */}
      {!hasStarted && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-black via-purple-900/30 to-black flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(80)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `translate3d(0,0,0)`,
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

            <h1 className="text-3xl md:text-5xl mt-8 text-white font-bold">
              Welcome to RenzMc's Galaxy
            </h1>
            <p className="text-white/90 mt-2 max-w-xl text-center">
              Embark on an epic cosmic experience. Klik tombol untuk mulai (diperlukan gesture).
            </p>
            {loadingMessage && <p className="text-sm text-yellow-300 mt-4">{loadingMessage}</p>}
          </div>
        </div>
      )}

      {/* VIDEO — selalu ada di DOM (jangan gunakan display:none) */}
      <video
        ref={videoRef}
        className="video-fullscreen"
        playsInline
        // jangan autoPlay; play() kita panggil dari user gesture
        preload="auto"
        // controls={false} // kalau mau debugging, bisa aktifkan controls
      >
        <source src={videoSrc} type="video/mp4" />
        {/* fallback text */}
        Browser Anda tidak mendukung tag video.
      </video>

      {/* Overlay loading / spinner ketika video mulai tapi belum playing */}
      {hasStarted && !isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-white">Memutar video... {loadingMessage ?? ""}</p>
          </div>
        </div>
      )}

      {/* Stage overlay (contoh) */}
      {stage >= 1 && isPlaying && (
        <div className="fixed inset-0 z-60 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold">Welcome to the Stars</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default BigBangIntro;
