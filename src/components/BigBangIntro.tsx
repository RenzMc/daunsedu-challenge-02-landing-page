import { useState, useEffect, useRef } from "react";
import { Sparkles, Star, Zap, Play } from "lucide-react";
import galaxyHero from "@/assets/big-bang.mp4";

interface BigBangIntroProps {
  onComplete: () => void;
}

const BigBangIntro = ({ onComplete }: BigBangIntroProps) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [stage, setStage] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStartJourney = async () => {
    console.log("Starting journey...");
    setHasStarted(true);
    
    const video = videoRef.current;
    if (video) {
      try {
        // Reset video to beginning
        video.currentTime = 0;
        
        // Ensure video is loaded
        if (video.readyState < 2) {
          await new Promise((resolve) => {
            video.addEventListener('loadeddata', resolve, { once: true });
          });
        }
        
        // Enable audio and play
        video.muted = false;
        video.volume = 0.8; // Set volume to 80%
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          console.log("Video with audio started playing successfully");
        }
      } catch (error) {
        console.error("Video play failed:", error);
        
        // Try playing muted as fallback
        try {
          video.muted = true;
          await video.play();
          setIsPlaying(true);
          console.log("Video started playing muted as fallback");
        } catch (mutedError) {
          console.error("Even muted video failed:", mutedError);
          setVideoError(true);
          // Fallback timer
          setTimeout(() => onComplete(), 26000);
        }
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      console.log("Video loaded successfully");
      setVideoLoaded(true);
    };

    const handleCanPlay = () => {
      console.log("Video can play");
      setVideoLoaded(true);
    };

    const handleEnded = () => {
      console.log("Video ended");
      onComplete();
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e);
      setVideoError(true);
      setTimeout(() => onComplete(), 26000);
    };

    const handleTimeUpdate = () => {
      if (video.currentTime >= 10 && stage === 0) {
        setStage(1);
      }
    };

    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Preload video
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onComplete, stage]);

  useEffect(() => {
    if (!hasStarted) return;

    // Backup timer in case video doesn't end naturally
    const backupTimer = setTimeout(() => {
      console.log("Backup timer triggered");
      onComplete();
    }, 30000); // 30 seconds backup

    return () => {
      clearTimeout(backupTimer);
    };
  }, [onComplete, hasStarted]);

  // Simple start screen - just button
  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        {/* Simple animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black">
          {/* Simple stars */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Simple centered content */}
        <div className="text-center relative z-10">
          {/* Simple play button */}
          <button
            onClick={handleStartJourney}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 flex items-center justify-center transition-all duration-300 hover:scale-110 group mb-6 shadow-2xl"
          >
            <Play className="w-8 h-8 md:w-12 md:h-12 text-white ml-2" fill="currentColor" />
            
            {/* Simple glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 opacity-50 group-hover:opacity-75 animate-pulse" />
          </button>

          {/* Simple text */}
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Welcome to RenzMc's Galaxy
          </h1>
          <p className="text-lg md:text-xl text-white/80">
            Click to begin your cosmic journey
          </p>
        </div>

        {/* Hidden video for preloading */}
        <video
          ref={videoRef}
          className="hidden"
          preload="auto"
          playsInline
          webkit-playsinline="true"
          muted // Start muted for preloading
        >
          <source src={galaxyHero} type="video/mp4" />
        </video>
      </div>
    );
  }

  // Video playing screen
  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Video container */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          webkit-playsinline="true"
          style={{ 
            objectFit: 'cover',
            backgroundColor: '#000'
          }}
        >
          <source src={galaxyHero} type="video/mp4" />
        </video>
      </div>

      {/* Loading overlay */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-white">Loading cosmic experience...</p>
          </div>
        </div>
      )}

      {/* Error fallback */}
      {videoError && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/30 to-black flex items-center justify-center z-10">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Welcome to RenzMc's Galaxy
            </h2>
            <p className="text-lg text-white/80">
              Preparing your cosmic experience...
            </p>
          </div>
        </div>
      )}

      {/* Welcome text overlay (appears after 10 seconds) */}
      {stage >= 1 && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              Welcome to RenzMc's Galaxy
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg">
              Experience the birth of the universe...
            </p>
            
            {/* Simple decorative elements */}
            <div className="flex justify-center space-x-4 mt-6">
              <Star className="w-6 h-6 text-cyan-400 animate-pulse" />
              <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
              <Zap className="w-6 h-6 text-pink-400 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded text-sm z-50">
          <div>Video Loaded: {videoLoaded ? 'Yes' : 'No'}</div>
          <div>Is Playing: {isPlaying ? 'Yes' : 'No'}</div>
          <div>Stage: {stage}</div>
          <div>Error: {videoError ? 'Yes' : 'No'}</div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BigBangIntro;
