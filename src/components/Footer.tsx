const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      name: "YouTube", 
      url: "https://www.youtube.com/@Renz-Mc", 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    { 
      name: "TikTok", 
      url: "https://www.tiktok.com/@fsociety_rl", 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    },
    { 
      name: "GitHub", 
      url: "https://github.com/RenzMc/", 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: "WhatsApp", 
      url: "https://wa.me/082318222611", 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
        </svg>
      )
    },
  ];


  return (
    <footer className="relative overflow-hidden">
      {/* Blackhole Background Container - Siap untuk animasi blackhole */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/90 to-black">
        {/* Blackhole Center Point */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-black rounded-full shadow-[0_0_100px_rgba(139,69,255,0.5),inset_0_0_50px_rgba(0,0,0,1)] animate-pulse"></div>
        
        {/* Accretion Disk Layers */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-purple-500/30 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-blue-500/20 rounded-full animate-spin-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] border border-cyan-500/10 rounded-full animate-spin-slow"></div>
      </div>

      {/* Cosmic Dust & Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Gravitational Lensing Effect */}
      <div className="absolute inset-0 bg-gradient-conic from-purple-500/10 via-transparent via-blue-500/10 via-transparent to-purple-500/10 animate-spin-slow"></div>

      {/* Content */}
      <div className="relative z-20 backdrop-blur-sm bg-black/40 border-t border-purple-500/30">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4 animate-float text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <div className="relative w-10 h-10 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 animate-stellar-rotate">
                  <span className="text-lg font-bold text-white">R</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-xl blur opacity-50 animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  RenzMc
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Creating digital universes where imagination meets reality in the infinite cosmos of creativity.
              </p>
            </div>

            {/* Connect Section */}
            <div className="animate-float text-center md:text-right" style={{ animationDelay: '0.5s' }}>
              <h4 className="text-lg font-semibold text-white mb-4">
                Connect Across the Galaxy
              </h4>
              <div className="flex flex-wrap justify-center md:justify-end gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-2 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg hover:from-purple-800/50 hover:to-blue-800/50 transition-all duration-300 group border border-slate-600/30 hover:border-purple-500/50"
                  >
                    <div className="text-gray-400 group-hover:text-white transition-all duration-300 group-hover:animate-stellar-rotate">
                      {link.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-4 border-t border-purple-500/20 animate-float" style={{ animationDelay: '1s' }}>
            <p className="text-gray-400 text-sm">
              © {currentYear} RenzMc - Exploring the infinite cosmos of creativity
            </p>
          </div>
        </div>
      </div>

      {/* Event Horizon Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-500 via-cyan-400 via-blue-500 to-purple-600 animate-pulse-glow"></div>
      
      {/* Gravitational Waves */}
      <div className="absolute top-12 right-12 w-32 h-32 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-2xl animate-nebula-flow"></div>
      <div className="absolute bottom-12 left-12 w-24 h-24 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 rounded-full blur-2xl animate-nebula-flow" style={{ animationDelay: '3s' }}></div>
    </footer>
  );
};

export default Footer;
