import { Star, Zap, Heart, Target } from "lucide-react";
import { useScrollAnimation, slideFromLeft, slideFromRight, slideFromBottom } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation({ threshold: 0.3 });
  
  const highlights = [
    { 
      icon: Star, 
      title: "Content Creator", 
      description: "Creating engaging content across YouTube and TikTok with a focus on tech and creativity",
      color: "text-yellow-400"
    },
    { 
      icon: Zap, 
      title: "Digital Explorer", 
      description: "Always pushing boundaries and exploring new frontiers in the digital universe",
      color: "text-blue-400"
    },
    { 
      icon: Heart, 
      title: "Community Builder", 
      description: "Connecting with amazing people and building communities around shared passions",
      color: "text-pink-400"
    },
    { 
      icon: Target, 
      title: "Innovation Focused", 
      description: "Constantly seeking new ways to innovate and create meaningful digital experiences",
      color: "text-green-400"
    },
  ];

  return (
    <section ref={aboutRef} id="about" className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-cosmic-drift"
            style={{
              top: `${Math.random() * 100}%`,
              left: `-10px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            style={slideFromBottom(aboutVisible, 0)}
          >
            About the Explorer
          </h2>
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            style={slideFromBottom(aboutVisible, 200)}
          >
            A passionate creator navigating the digital galaxy, connecting worlds through content and community
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Story */}
          <div className="space-y-6" style={slideFromLeft(aboutVisible, 400)}>
            <div className="bg-card/50 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-primary">The Journey</h3>
              </div>
              
              <div className="space-y-4 text-card-foreground/90 leading-relaxed">
                <p>
                  Welcome to my cosmic corner of the internet! I'm RenzMc, a digital explorer passionate about 
                  creating content that bridges the gap between technology and creativity.
                </p>
                <p>
                  Through my YouTube channel and TikTok presence, I share insights, tutorials, and behind-the-scenes 
                  glimpses into the ever-evolving world of digital creation and innovation.
                </p>
                <p>
                  When I'm not creating content, you'll find me exploring new technologies, connecting with the 
                  community, or simply enjoying the infinite possibilities that the digital universe has to offer.
                </p>
              </div>
            </div>

            {/* Philosophy Card */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-lg p-6 rounded-xl border border-primary/20">
              <h4 className="text-lg font-semibold text-primary mb-2">My Philosophy</h4>
              <p className="text-foreground/80 italic">
                "Every piece of content is a star in the digital constellation. Together, they light up the path for others to follow and explore."
              </p>
            </div>
          </div>

          {/* Right Column - Highlights */}
          <div className="space-y-6" style={slideFromRight(aboutVisible, 600)}>
            <h3 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">
              What Drives Me
            </h3>
            
            <div className="space-y-4">
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <div
                    key={highlight.title}
                    className="bg-card/40 backdrop-blur-lg p-4 md:p-6 rounded-xl border border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
                    style={slideFromRight(aboutVisible, 800 + index * 100)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg bg-background/50 ${highlight.color} group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                          {highlight.title}
                        </h4>
                        <p className="text-sm text-card-foreground/70 leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-xl animate-nebula-flow opacity-50" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-accent/20 to-transparent rounded-full blur-xl animate-nebula-flow opacity-50" style={{ animationDelay: '3s' }} />
    </section>
  );
};

export default AboutSection;