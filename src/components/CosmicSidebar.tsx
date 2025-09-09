import { useState } from "react";
import { Home, User, Star, MessageCircle, Youtube, Music, Github, Phone } from "lucide-react";

const CosmicSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Connect", href: "#connect", icon: MessageCircle },
  ];

  const socialLinks = [
    { name: "YouTube", url: "https://www.youtube.com/@Renz-Mc", icon: Youtube, color: "hover:text-red-400" },
    { name: "TikTok", url: "https://www.tiktok.com/@fsociety_rl", icon: Music, color: "hover:text-pink-400" },
    { name: "GitHub", url: "https://github.com/RenzMc/", icon: Github, color: "hover:text-purple-400" },
    { name: "WhatsApp", url: "https://wa.me/082318222611", icon: Phone, color: "hover:text-green-400" },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden p-3 rounded-xl bg-background/80 backdrop-blur-lg border border-border text-foreground shadow-lg hover:shadow-xl hover:bg-primary/20 transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-background/95 backdrop-blur-xl border-r border-border z-50 transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 w-72 lg:w-64 xl:w-72`}>
        
        {/* Cosmic Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-accent/20 pointer-events-none" />
        
        {/* Header */}
        <div className="p-6 border-b border-border relative">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                RenzMc
              </h2>
              <p className="text-muted-foreground text-sm">Galaxy Creator</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={toggleSidebar}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 group text-foreground hover:text-primary"
                  >
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">
                      {item.name}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="p-6 border-t border-border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            Connect
          </h3>
          <div className="space-y-2">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 group text-muted-foreground ${link.color}`}
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium">{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Cosmic Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-cosmic-drift"
              style={{
                top: `${Math.random() * 100}%`,
                left: `-5px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default CosmicSidebar;