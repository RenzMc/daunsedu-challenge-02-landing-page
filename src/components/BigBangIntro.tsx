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
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStartJourney = async () => {
    setHasStarted(true);
    
    // Start video with audio
    const video = videoRef.current;
    if (video) {
      try {
        video.muted = false; // Enable audio since user interacted
        await video.play();
        console.log("Video with audio started playing");
      } catch (error) {
        console.error("Video play failed:", error);
        setVideoError(true);
        setTimeout(() => onComplete(), 26000);
      }
    }
  };

  useEffect(() => {
    if (!hasStarted) return;

    const video = videoRef.current;
    if (!video) return;

    // Handle video loaded
    const handleLoadedData = () => {
      setVideoLoaded(true);
    };

    // Handle video ended
    const handleEnded = () => {
      onComplete();
    };

    // Handle video error
    const handleError = () => {
      console.error("Video loading error");
      setVideoError(true);
      setTimeout(() => onComplete(), 26000);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [onComplete, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    // Welcome text appears at 10 seconds
    const timer1 = setTimeout(() => setStage(1), 10000);
    // Backup timer in case video doesn't end naturally
    const timer2 = setTimeout(() => onComplete(), 27000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete, hasStarted]);

  // If not started yet, show start button
  if (!hasStarted) {
    return (
      <>
        <style jsx>{`
          @keyframes galaxy-spin {
            0% {
              transform: rotate(0deg) scale(1);
            }
            50% {
              transform: rotate(180deg) scale(1.1);
            }
            100% {
              transform: rotate(360deg) scale(1);
            }
          }

          @keyframes cosmic-pulse {
            0%, 100% {
              box-shadow: 0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(6, 182, 212, 0.3), 0 0 60px rgba(139, 92, 246, 0.2);
            }
            50% {
              box-shadow: 0 0 30px rgba(6, 182, 212, 0.8), 0 0 60px rgba(139, 92, 246, 0.6), 0 0 90px rgba(6, 182, 212, 0.4);
            }
          }

          @keyframes text-glow {
            0%, 100% {
              text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(139, 92, 246, 0.6), 0 0 30px rgba(6, 182, 212, 0.4);
            }
            50% {
              text-shadow: 0 0 20px rgba(6, 182, 212, 1), 0 0 40px rgba(139, 92, 246, 0.8), 0 0 60px rgba(6, 182, 212, 0.6);
            }
          }

          @keyframes button-hover {
            0% {
              transform: scale(1) rotate(0deg);
            }
            50% {
              transform: scale(1.05) rotate(2deg);
            }
            100% {
              transform: scale(1) rotate(0deg);
            }
          }

          @keyframes stars-twinkle {
            0%, 100% {
              opacity: 0.3;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
          }

          .galaxy-button {
            background: radial-gradient(circle at center, 
              rgba(139, 92, 246, 0.8) 0%, 
              rgba(6, 182, 212, 0.6) 30%, 
              rgba(139, 92, 246, 0.4) 60%, 
              rgba(0, 0, 0, 0.8) 100%);
            border: 2px solid transparent;
            background-clip: padding-box;
            animation: cosmic-pulse 3s ease-in-out infinite, galaxy-spin 8s linear infinite;
          }

          .galaxy-button:hover {
            animation: cosmic-pulse 1.5s ease-in-out infinite, button-hover 0.5s ease-in-out;
            background: radial-gradient(circle at center, 
              rgba(139, 92, 246, 1) 0%, 
              rgba(6, 182, 212, 0.8) 30%, 
              rgba(139, 92, 246, 0.6) 60%, 
              rgba(0, 0, 0, 0.9) 100%);
          }

          .start-text {
            animation: text-glow 2s ease-in-out infinite;
          }

          .floating-stars {
            animation: stars-twinkle 2s ease-in-out infinite;
          }
        `}</style>

        <div className="fixed inset-0 z-50 bg-gradient-to-br from-black via-purple-900/30 to-black flex items-center justify-center overflow-hidden">
          {/* Background Stars */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
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

          {/* Main Content */}
          <div className="text-center relative z-10">
            {/* Decorative Stars Around Button */}
            <div className="absolute -top-20 -left-20">
              <Sparkles className="w-8 h-8 text-cyan-400 floating-stars" />
            </div>
            <div className="absolute -top-16 -right-16">
              <Star className="w-6 h-6 text-purple-400 floating-stars" style={{ animationDelay: '0.5s' }} />
            </div>
            <div className="absolute -bottom-20 -left-16">
              <Zap className="w-7 h-7 text-pink-400 floating-stars" style={{ animationDelay: '1s' }} />
            </div>
            <div className="absolute -bottom-16 -right-20">
              <Sparkles className="w-8 h-8 text-cyan-400 floating-stars" style={{ animationDelay: '1.5s' }} />
            </div>

            {/* Galaxy Button */}
            <button
              onClick={handleStartJourney}
              className="galaxy-button relative w-48 h-48 md:w-64 md:h-64 rounded-full flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 group mb-8"
            >
              {/* Inner Galaxy Effect */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 animate-spin" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-8 rounded-full bg-gradient-to-l from-cyan-400/30 via-purple-400/30 to-pink-400/30 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
              
              {/* Play Icon */}
              <Play className="w-12 h-12 md:w-16 md:h-16 text-white mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10" fill="currentColor" />
              
              {/* Button Text */}
              <span className="start-text text-white text-lg md:text-xl font-bold relative z-10">
                Click to Begin
              </span>
              <span className="start-text text-white/80 text-sm md:text-base font-medium relative z-10 mt-1">
                Your Journey
              </span>

              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
                <Star className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 text-yellow-400" />
                <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
                <Zap className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 text-pink-400" />
                <Star className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
              </div>
            </button>

            {/* Welcome Text */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white start-text">
                Welcome to RenzMc's Galaxy
              </h1>
              <p className="text-lg md:text-xl text-white/80 start-text">
                Embark on a cosmic adventure through space and time
              </p>
              
              {/* Decorative Elements */}
              <div className="flex items-center justify-center space-x-4 mt-6">
                <Star className="w-4 h-4 text-cyan-400 floating-stars" />
                <Sparkles className="w-5 h-5 text-purple-400 floating-stars" style={{ animationDelay: '0.3s' }} />
                <Zap className="w-4 h-4 text-pink-400 floating-stars" style={{ animationDelay: '0.6s' }} />
                <Star className="w-3 h-3 text-yellow-400 floating-stars" style={{ animationDelay: '0.9s' }} />
                <Sparkles className="w-4 h-4 text-cyan-400 floating-stars" style={{ animationDelay: '1.2s' }} />
              </div>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 md:top-8 md:left-8">
            <div className="w-8 h-8 md:w-12 md:h-12 border-l border-t border-cyan-400/30 rounded-tl-lg" />
          </div>
          <div className="absolute top-4 right-4 md:top-8 md:right-8">
            <div className="w-8 h-8 md:w-12 md:h-12 border-r border-t border-purple-400/30 rounded-tr-lg" />
          </div>
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
            <div className="w-8 h-8 md:w-12 md:h-12 border-l border-b border-purple-400/30 rounded-bl-lg" />
          </div>
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
            <div className="w-8 h-8 md:w-12 md:h-12 border-r border-b border-cyan-400/30 rounded-br-lg" />
          </div>

          {/* Hidden Video Element - Preloaded but not playing */}
          <video
            ref={videoRef}
            className="hidden"
            muted
            playsInline
            preload="metadata"
            webkit-playsinline="true"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            x5-video-orientation="portraint"
          >
            <source src={galaxyHero} type="video/mp4" />
            <source src={galaxyHero.replace('.mp4', '.webm')} type="video/webm" />
            <source src={galaxyHero.replace('.mp4', '.ogv')} type="video/ogg" />
          </video>
        </div>
      </>
    );
  }

  // After start is clicked - show video intro
  return (
    <>
      <style jsx>{`
        @keyframes cosmic-glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(6, 182, 212, 0.6), 0 0 60px rgba(139, 92, 246, 0.4);
          }
          50% {
            text-shadow: 0 0 30px rgba(6, 182, 212, 1), 0 0 60px rgba(139, 92, 246, 0.8), 0 0 90px rgba(6, 182, 212, 0.6);
          }
        }

        @keyframes text-shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes floating {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }

        @keyframes star-twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }

        @keyframes star-orbit {
          0% {
            transform: rotate(0deg) translateX(100px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(100px) rotate(-360deg);
          }
        }

        @keyframes welcome-appear {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
            filter: blur(10px);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-10px) scale(1.05);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 10px currentColor);
          }
          50% {
            filter: brightness(1.5) drop-shadow(0 0 20px currentColor);
          }
        }

        .cosmic-text {
          background: linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4);
          background-size: 400% 100%;
          animation: text-shimmer 3s ease-in-out infinite, cosmic-glow 2s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .floating {
          animation: floating 3s ease-in-out infinite;
        }

        .star-twinkle {
          animation: star-twinkle 2s ease-in-out infinite;
        }

        .star-orbit {
          animation: star-orbit 8s linear infinite;
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .video-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000;
        }

        .video-container video {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          transform: translate(-50%, -50%);
          object-fit: cover;
          z-index: 1;
        }

        .fallback-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #000000 0%, #1a0033 25%, #000066 50%, #330066 75%, #000000 100%);
          z-index: 0;
        }

        @media (max-width: 768px) {
          .welcome-text {
            font-size: 2rem !important;
          }
          .welcome-subtitle {
            font-size: 1rem !important;
          }
          
          .video-container video {
            object-fit: cover;
            width: 100%;
            height: 100%;
            min-width: auto;
            min-height: auto;
          }
        }

        @media (max-width: 480px) {
          .welcome-text {
            font-size: 1.5rem !important;
          }
          .welcome-subtitle {
            font-size: 0.9rem !important;
          }
        }

        @supports (-webkit-appearance: none) {
          .video-container video {
            -webkit-transform: translate(-50%, -50%);
            -webkit-object-fit: cover;
          }
        }
      `}</style>

      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="fallback-bg" />

        <div className="video-container">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            preload="auto"
            webkit-playsinline="true"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            x5-video-orientation="portraint"
            style={{ 
              objectFit: 'cover',
              backgroundColor: '#000'
            }}
          >
            <source src={galaxyHero} type="video/mp4" />
            <source src={galaxyHero.replace('.mp4', '.webm')} type="video/webm" />
            <source src={galaxyHero.replace('.mp4', '.ogv')} type="video/ogg" />
            <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/30 to-black flex items-center justify-center">
              <p className="text-white text-center">Your browser doesn't support video playback</p>
            </div>
          </video>
        </div>

        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p className="text-white cosmic-text">Loading cosmic experience...</p>
            </div>
          </div>
        )}

        <div className={`absolute inset-0 transition-all duration-1000 z-20 ${
          stage >= 1 ? 'bg-black/30' : 'bg-black/10'
        }`} />

        <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full star-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {stage >= 1 && (
          <div className="absolute inset-0 flex items-center justify-center z-40">
            <div className="text-center animate-[welcome-appear_2s_ease-out_forwards] opacity-0 relative">
              
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="star-orbit">
                    <Star className="w-4 h-4 md:w-6 md:h-6 text-cyan-400 pulse-glow" />
                  </div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="star-orbit" style={{ animationDelay: '-2s', animationDuration: '6s' }}>
                    <Sparkles className="w-3 h-3 md:w-5 md:h-5 text-purple-400 pulse-glow" />
                  </div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="star-orbit" style={{ animationDelay: '-4s', animationDuration: '10s' }}>
                    <Zap className="w-4 h-4 md:w-6 md:h-6 text-pink-400 pulse-glow" />
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -left-8 md:-top-12 md:-left-12">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 floating star-twinkle" />
              </div>
              <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8">
                <Star className="w-4 h-4 md:w-6 md:h-6 text-purple-400 floating star-twinkle" style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="absolute -bottom-8 -left-6 md:-bottom-12 md:-left-8">
                <Zap className="w-5 h-5 md:w-7 md:h-7 text-pink-400 floating star-twinkle" style={{ animationDelay: '1s' }} />
              </div>
              <div className="absolute -bottom-6 -right-8 md:-bottom-8 md:-right-12">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 floating star-twinkle" style={{ animationDelay: '1.5s' }} />
              </div>

              <div className="flex flex-col items-center space-y-4 md:space-y-6">
                <div className="relative">
                  <h1 className="welcome-text text-3xl md:text-6xl lg:text-7xl font-bold cosmic-text text-center px-4">
                    Welcome to RenzMc's Galaxy
                  </h1>
                  
                  <Sparkles className="absolute -top-2 left-4 w-4 h-4 md:w-6 md:h-6 text-yellow-400 floating star-twinkle" />
                  <Star className="absolute top-2 right-8 w-3 h-3 md:w-5 md:h-5 text-blue-400 floating star-twinkle" style={{ animationDelay: '0.7s' }} />
                </div>

                <p className="welcome-subtitle text-lg md:text-2xl lg:text-3xl text-white font-light text-center px-4 cosmic-text">
                  Watch the universe unfold before your eyes...
                </p>

                <div className="flex items-center space-x-4 md:space-x-6 mt-6">
                  <Star className="w-4 h-4 md:w-6 md:h-6 text-cyan-400 star-twinkle" />
                  <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-purple-400 star-twinkle" style={{ animationDelay: '0.3s' }} />
                  <Zap className="w-4 h-4 md:w-6 md:h-6 text-pink-400 star-twinkle" style={{ animationDelay: '0.6s' }} />
                  <Star className="w-3 h-3 md:w-5 md:h-5 text-yellow-400 star-twinkle" style={{ animationDelay: '0.9s' }} />
                  <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-cyan-400 star-twinkle" style={{ animationDelay: '1.2s' }} />
                </div>

                <div className="mt-8 flex justify-center">
                  <div className="w-48 md:w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full transition-all duration-1000"
                      style={{ 
                        width: stage >= 1 ? '100%' : '50%',
                        animation: 'text-shimmer 2s ease-in-out infinite'
                      }}
                    />
                  </div>
                </div>

                <p className="text-white/70 text-sm md:text-base mt-4 cosmic-text font-medium">
                  ✨ Initializing cosmic experience... ✨
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-50">
          <div className="w-8 h-8 md:w-12 md:h-12 border-l border-t border-cyan-400/30 rounded-tl-lg" />
        </div>
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
          <div className="w-8 h-8 md:w-12 md:h-12 border-r border-t border-purple-400/30 rounded-tr-lg" />
        </div>
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-50">
          <div className="w-8 h-8 md:w-12 md:h-12 border-l border-b border-purple-400/30 rounded-bl-lg" />
        </div>
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-50">
          <div className="w-8 h-8 md:w-12 md:h-12 border-r border-b border-cyan-400/30 rounded-br-lg" />
        </div>
      </div>
    </>
  );
};

export default BigBangIntro;
