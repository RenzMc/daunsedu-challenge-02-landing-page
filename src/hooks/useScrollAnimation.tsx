import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  staggerChildren?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Calculate animation progress based on intersection ratio
          setAnimationProgress(entry.intersectionRatio);
          
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
          setAnimationProgress(0);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible, animationProgress };
};

// Enhanced animation variants with more complex effects
export const slideFromLeft = (isVisible: boolean, delay = 0) => ({
  transform: isVisible 
    ? 'translateX(0) rotateY(0deg)' 
    : 'translateX(-120px) rotateY(-15deg)',
  opacity: isVisible ? 1 : 0,
  filter: isVisible ? 'blur(0px) brightness(1)' : 'blur(8px) brightness(0.7)',
  transition: `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}ms`,
  transformOrigin: 'left center',
});

export const slideFromRight = (isVisible: boolean, delay = 0) => ({
  transform: isVisible 
    ? 'translateX(0) rotateY(0deg)' 
    : 'translateX(120px) rotateY(15deg)',
  opacity: isVisible ? 1 : 0,
  filter: isVisible ? 'blur(0px) brightness(1)' : 'blur(8px) brightness(0.7)',
  transition: `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}ms`,
  transformOrigin: 'right center',
});

export const slideFromBottom = (isVisible: boolean, delay = 0) => ({
  transform: isVisible 
    ? 'translateY(0) rotateX(0deg) scale(1)' 
    : 'translateY(80px) rotateX(25deg) scale(0.95)',
  opacity: isVisible ? 1 : 0,
  filter: isVisible ? 'blur(0px) saturate(1)' : 'blur(6px) saturate(0.8)',
  boxShadow: isVisible 
    ? '0 20px 40px rgba(0,0,0,0.1)' 
    : '0 5px 15px rgba(0,0,0,0.05)',
  transition: `all 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}ms`,
  transformOrigin: 'bottom center',
});

export const fadeIn = (isVisible: boolean, delay = 0) => ({
  opacity: isVisible ? 1 : 0,
  filter: isVisible 
    ? 'blur(0px) contrast(1) saturate(1)' 
    : 'blur(10px) contrast(0.8) saturate(0.5)',
  transform: isVisible ? 'scale(1)' : 'scale(1.05)',
  transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
});

export const scaleIn = (isVisible: boolean, delay = 0) => ({
  transform: isVisible 
    ? 'scale(1) rotate(0deg)' 
    : 'scale(0.7) rotate(-5deg)',
  opacity: isVisible ? 1 : 0,
  filter: isVisible 
    ? 'blur(0px) brightness(1) contrast(1)' 
    : 'blur(12px) brightness(0.6) contrast(0.8)',
  boxShadow: isVisible 
    ? '0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)' 
    : '0 5px 15px rgba(0,0,0,0.05)',
  transition: `all 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}ms`,
  transformOrigin: 'center center',
});

// Bonus: Advanced animation variants
export const slideFromTop = (isVisible: boolean, delay = 0) => ({
  transform: isVisible 
    ? 'translateY(0) rotateX(0deg) perspective(1000px)' 
    : 'translateY(-80px) rotateX(-25deg) perspective(1000px)',
  opacity: isVisible ? 1 : 0,
  filter: isVisible ? 'blur(0px) hue-rotate(0deg)' : 'blur(6px) hue-rotate(10deg)',
  transition: `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}ms`,
  transformOrigin: 'top center',
});

export const flipIn = (isVisible: boolean, delay = 0) => ({
  transform: isVisible 
    ? 'rotateY(0deg) scale(1)' 
    : 'rotateY(90deg) scale(0.8)',
  opacity: isVisible ? 1 : 0,
  filter: isVisible ? 'blur(0px)' : 'blur(4px)',
  transition: `all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}ms`,
  transformOrigin: 'center center',
  transformStyle: 'preserve-3d' as const,
});

export const bounceIn = (isVisible: boolean, delay = 0) => ({
  transform: isVisible ? 'scale(1)' : 'scale(0.3)',
  opacity: isVisible ? 1 : 0,
  filter: isVisible ? 'blur(0px)' : 'blur(8px)',
  transition: `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}ms`,
});

export const slideRotateIn = (isVisible: boolean, delay = 0) => ({
  transform: isVisible 
    ? 'translateX(0) rotate(0deg) scale(1)' 
    : 'translateX(-100px) rotate(-180deg) scale(0.5)',
  opacity: isVisible ? 1 : 0,
  filter: isVisible ? 'blur(0px) hue-rotate(0deg)' : 'blur(10px) hue-rotate(45deg)',
  transition: `all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}ms`,
  transformOrigin: 'center center',
});

// Utility function for staggered animations
export const createStaggeredAnimation = (
  animationFn: (isVisible: boolean, delay: number) => any,
  isVisible: boolean,
  index: number,
  staggerDelay = 100
) => {
  return animationFn(isVisible, index * staggerDelay);
};

// Advanced parallax-like effect
export const parallaxSlide = (isVisible: boolean, delay = 0, intensity = 1) => ({
  transform: isVisible 
    ? `translateY(0) translateZ(0) scale(1)` 
    : `translateY(${50 * intensity}px) translateZ(-100px) scale(0.95)`,
  opacity: isVisible ? 1 : 0,
  filter: isVisible 
    ? 'blur(0px) brightness(1)' 
    : `blur(${4 * intensity}px) brightness(0.8)`,
  transition: `all ${0.8 + (intensity * 0.2)}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
  transformStyle: 'preserve-3d' as const,
});
