import { Youtube, Music, Github, Phone, ExternalLink, MessageCircle } from "lucide-react";
import { useScrollAnimation, slideFromBottom, slideFromLeft, slideFromRight, scaleIn } from "@/hooks/useScrollAnimation";
import galaxyCard1 from "@/assets/galaxy-card-1.png";
import galaxyCard2 from "@/assets/galaxy-card-2.png";
import galaxyCard3 from "@/assets/galaxy-card-3.png";
import galaxyCard4 from "@/assets/galaxy-card-4.png";

const ConnectSection = () => {
  const { ref: connectRef, isVisible: connectVisible } = useScrollAnimation({ threshold: 0.3 });
  
  const socialPlatforms = [
    {
      name: "YouTube",
      handle: "@Renz-Mc",
      url: "https://www.youtube.com/@Renz-Mc",
      icon: Youtube,
      color: "from-red-500/80 to-red-600/80",
      hoverColor: "hover:shadow-red-500/50",
      description: "Tech tutorials, behind-the-scenes content, and creative projects",
      galaxyBg: galaxyCard1
    },
    {
      name: "TikTok",
      handle: "@fsociety_rl",
      url: "https://www.tiktok.com/@fsociety_rl",
      icon: Music,
      color: "from-pink-500/80 to-pink-600/80",
      hoverColor: "hover:shadow-pink-500/50",
      description: "Quick tips, trending content, and fun tech moments",
      galaxyBg: galaxyCard2
    },
    {
      name: "GitHub",
      handle: "RenzMc",
      url: "https://github.com/RenzMc/",
      icon: Github,
      color: "from-purple-500/80 to-purple-600/80",
      hoverColor: "hover:shadow-purple-500/50",
      description: "Open source projects, code repositories, and collaborations",
      galaxyBg: galaxyCard3
    },
    {
      name: "WhatsApp",
      handle: "082318222611",
      url: "https://wa.me/082318222611",
      icon: Phone,
      color: "from-green-500/80 to-green-600/80",
      hoverColor: "hover:shadow-green-500/50",
      description: "Direct messaging for collaborations and inquiries",
      galaxyBg: galaxyCard4
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
                className={`group relative rounded-2xl border border-white/20 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl ${platform.hoverColor} hover:scale-105 overflow-hidden`}
                style={{
                  ...scaleIn(connectVisible, 400 + index * 100),
                  backgroundImage: `url(${platform.galaxyBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Dark overlay untuk readability */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                
                {/* Gradient overlay untuk efek yang lebih bagus */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/60" />

                {/* Platform Header */}
                <div className={`relative h-24 bg-gradient-to-br ${platform.color} overflow-hidden flex items-center justify-center`}>
                  <IconComponent className="relative z-10 w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
                  
                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full animate-cosmic-drift"
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
                <div className="relative p-4 z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors drop-shadow-lg">
                      {platform.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-white/80 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  
                  <p className="text-sm text-primary font-medium mb-2 drop-shadow-lg">
                    {platform.handle}
                  </p>
                  
                  <p className="text-xs text-white/90 leading-relaxed drop-shadow-lg">
                    {platform.description}
                  </p>
                </div>

                {/* Glow effect saat hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-20 rounded-2xl`} />
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center" style={slideFromBottom(connectVisible, 1000)}>
          <div 
            className="relative backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-white/20 max-w-2xl mx-auto overflow-hidden"
            style={{
              backgroundImage: `url(${galaxyCard1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Dark overlay untuk CTA */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                  Let's Collaborate
                </h3>
              </div>
              <p className="text-white/90 mb-6 leading-relaxed drop-shadow-lg">
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
                  className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-white/30 text-white backdrop-blur-lg rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Subscribe on YouTube</span>
                </a>
              </div>
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
