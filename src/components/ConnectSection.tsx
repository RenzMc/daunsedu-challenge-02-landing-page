import { Youtube, Music, Github, Phone, ExternalLink, MessageCircle } from "lucide-react";
import { useScrollAnimation, slideFromBottom, slideFromLeft, slideFromRight, scaleIn } from "@/hooks/useScrollAnimation";

const ConnectSection = () => {
  const { ref: connectRef, isVisible: connectVisible } = useScrollAnimation({ threshold: 0.3 });
  
  const socialPlatforms = [
    {
      name: "YouTube",
      handle: "@Renz-Mc",
      url: "https://www.youtube.com/@Renz-Mc",
      icon: Youtube,
      color: "from-red-500 to-red-600",
      hoverColor: "hover:shadow-red-500/50",
      description: "Tech tutorials, behind-the-scenes content, and creative projects"
    },
    {
      name: "TikTok",
      handle: "@fsociety_rl",
      url: "https://www.tiktok.com/@fsociety_rl",
      icon: Music,
      color: "from-pink-500 to-pink-600",
      hoverColor: "hover:shadow-pink-500/50",
      description: "Quick tips, trending content, and fun tech moments"
    },
    {
      name: "GitHub",
      handle: "RenzMc",
      url: "https://github.com/RenzMc/",
      icon: Github,
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:shadow-purple-500/50",
      description: "Open source projects, code repositories, and collaborations"
    },
    {
      name: "WhatsApp",
      handle: "082318222611",
      url: "https://wa.me/082318222611",
      icon: Phone,
      color: "from-green-500 to-green-600",
      hoverColor: "hover:shadow-green-500/50",
      description: "Direct messaging for collaborations and inquiries"
    }
  ];

  return (
    <section ref={connectRef} id="connect" className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-muted/10" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full animate-cosmic-drift"
            style={{
              top: `${Math.random() * 100}%`,
              left: `-10px`,
              animationDelay: `${Math.random() * 25}s`,
              animationDuration: `${25 + Math.random() * 15}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            style={slideFromBottom(connectVisible, 0)}
          >
            Connect Across the Galaxy
          </h2>
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            style={slideFromBottom(connectVisible, 200)}
          >
            Join me on different platforms and let's explore the digital universe together
          </p>
        </div>

        {/* Social Platforms Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {socialPlatforms.map((platform, index) => {
            const IconComponent = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-card/40 backdrop-blur-lg rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl ${platform.hoverColor} hover:scale-105 overflow-hidden`}
                style={scaleIn(connectVisible, 400 + index * 100)}
              >
                {/* Platform Header */}
                <div className={`h-24 bg-gradient-to-br ${platform.color} relative overflow-hidden flex items-center justify-center`}>
                  <IconComponent className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  
                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-cosmic-drift"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `-5px`,
                          animationDelay: `${Math.random() * 8}s`,
                          animationDuration: `${8 + Math.random() * 4}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Platform Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {platform.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  
                  <p className="text-sm text-primary font-medium mb-2">
                    {platform.handle}
                  </p>
                  
                  <p className="text-xs text-card-foreground/70 leading-relaxed">
                    {platform.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center" style={slideFromBottom(connectVisible, 1000)}>
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-primary/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h3 className="text-xl md:text-2xl font-bold text-primary">
                Let's Collaborate
              </h3>
            </div>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              Whether you're interested in collaborations, have questions about content creation, 
              or just want to connect with a fellow digital explorer, I'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/082318222611"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>
              <a
                href="https://www.youtube.com/@Renz-Mc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-primary/30 text-primary backdrop-blur-lg rounded-xl font-semibold hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 transform hover:scale-105"
              >
                <Youtube className="w-4 h-4" />
                <span>Subscribe on YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 left-20 w-24 h-24 bg-gradient-to-r from-primary/30 to-transparent rounded-full blur-xl animate-nebula-flow opacity-50" />
      <div className="absolute bottom-32 right-20 w-32 h-32 bg-gradient-to-r from-accent/20 to-transparent rounded-full blur-xl animate-nebula-flow opacity-50" style={{ animationDelay: '4s' }} />
    </section>
  );
};

export default ConnectSection;