import { ArrowDown, Sparkles } from "lucide-react";
import {
  useScrollAnimation,
  slideFromBottom,
  slideFromLeft,
  slideFromRight,
} from "@/hooks/useScrollAnimation";
import galaxyHero from "@/assets/galaxy-hero.jpg";

const HeroSection = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({
    threshold: 0.3,
  });

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-parallax-slow"
        style={{ backgroundImage: `url(${galaxyHero})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-cosmic-drift opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `-10px`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div>
          {/* Cosmic Badge */}
          <div
            className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-lg border border-primary/30 rounded-full px-4 py-2 mb-8 animate-pulse-glow"
            style={slideFromBottom(heroVisible, 0)}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Welcome to My Galaxy
            </span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent"
            style={slideFromLeft(heroVisible, 200)}
          >
            RenzMc
          </h1>

          <div className="mb-8 space-y-4">
            <p
              className="text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto"
              style={slideFromRight(heroVisible, 400)}
            >
              Galaxy Creator & Digital Explorer
            </p>
            <p
              className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
              style={slideFromBottom(heroVisible, 600)}
            >
              Join me on an epic journey through YouTube, TikTok, and beyond as
              we explore the infinite cosmos of creativity and innovation
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={slideFromBottom(heroVisible, 800)}
          >
            <a
              href="https://www.youtube.com/@Renz-Mc"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="flex items-center space-x-2">
                <span>Watch on YouTube</span>
                <ArrowDown className="w-4 h-4 rotate-[-45deg] group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </a>
            <a
              href="#connect"
              className="px-6 py-3 border-2 border-white/30 text-white backdrop-blur-lg rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
            >
              Connect with Me
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float hidden md:block">
          <div className="flex flex-col items-center space-y-2 text-white/60">
            <span className="text-sm uppercase tracking-wider">Explore</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Cosmic Rings */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-primary/20 rounded-full animate-stellar-rotate" />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-accent/20 rounded-full animate-stellar-rotate"
          style={{ animationDirection: "reverse", animationDuration: "15s" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
