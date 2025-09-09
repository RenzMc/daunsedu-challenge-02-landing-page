import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// Enhanced animation types
export type AnimationType =
  | 'slideFromLeft' | 'slideFromRight' | 'slideFromTop' | 'slideFromBottom'
  | 'fadeIn' | 'scaleIn' | 'scaleOut' | 'rotateIn' | 'flipX' | 'flipY'
  | 'bounceIn' | 'elasticIn' | 'glitch' | 'morphIn' | 'parallax'
  | 'typewriter' | 'wave' | 'magnetic' | 'particle' | 'hologram';

export type EasingFunction =
  | 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'bounce' | 'elastic'
  | 'back' | 'anticipate' | 'overshoot' | 'custom';

interface UseScrollAnimationOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  animationType?: AnimationType;
  duration?: number;
  delay?: number;
  easing?: EasingFunction;
  stagger?: number;
  reverse?: boolean;
  intensity?: number;
  customEasing?: string;
  onEnter?: () => void;
  onExit?: () => void;
  onProgress?: (progress: number) => void;
  parallaxSpeed?: number;
  magneticStrength?: number;
  glitchIntensity?: number;
}

interface AnimationState {
  isVisible: boolean;
  progress: number;
  intersectionRatio: number;
  isEntering: boolean;
  isExiting: boolean;
  hasTriggered: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    isVisible: false,
    progress: 0,
    intersectionRatio: 0,
    isEntering: false,
    isExiting: false,
    hasTriggered: false,
  });

  const ref = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    threshold = [0, 0.25, 0.5, 0.75, 1],
    rootMargin = '0px',
    triggerOnce = true,
    animationType = 'fadeIn',
    duration = 600,
    delay = 0,
    easing = 'easeOut',
    stagger = 0,
    reverse = false,
    intensity = 1,
    customEasing,
    onEnter,
    onExit,
    onProgress,
    parallaxSpeed = 0.5,
    magneticStrength = 0.3,
    glitchIntensity = 0.1,
  } = options;

  // Easing functions
  const easingFunctions = useMemo(() => ({
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    back: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    anticipate: 'cubic-bezier(0.175, 0.885, 0.32, 1.8)',
    overshoot: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  }), []);

  const getEasing = useCallback(() => {
    if (customEasing) return customEasing;
    return (easingFunctions as Record<string, string>)[easing] || easingFunctions.easeOut;
  }, [easing, easingFunctions, customEasing]);

  // Enhanced intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          const isIntersecting = entry.isIntersecting;

          setAnimationState(prev => {
            const newState = {
              ...prev,
              intersectionRatio: ratio,
              progress: ratio,
            };

            if (isIntersecting && !prev.isVisible) {
              newState.isVisible = true;
              newState.isEntering = true;
              newState.isExiting = false;
              newState.hasTriggered = true;
              onEnter?.();
            } else if (!isIntersecting && prev.isVisible && !triggerOnce) {
              newState.isVisible = false;
              newState.isEntering = false;
              newState.isExiting = true;
              onExit?.();
            }

            onProgress?.(ratio);
            return newState;
          });

          // Reset entering/exiting states after animation
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setAnimationState(prev => ({
              ...prev,
              isEntering: false,
              isExiting: false,
            }));
          }, duration + delay);
        });
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [threshold, rootMargin, triggerOnce, duration, delay, onEnter, onExit, onProgress]);

  return { ref, ...animationState, getEasing };
};

// Export simple variant objects (useful for Framer Motion or direct imports)
export const slideFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export const slideFromTop = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const slideFromBottom = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Super advanced animation variants as inline style generator
export const getAnimationStyle = (
  animationState: AnimationState,
  type: AnimationType,
  options: {
    duration?: number;
    delay?: number;
    intensity?: number;
    easing?: string;
    parallaxSpeed?: number;
    magneticStrength?: number;
    glitchIntensity?: number;
  } = {}
) => {
  const {
    duration = 600,
    delay = 0,
    intensity = 1,
    easing = 'cubic-bezier(0, 0, 0.2, 1)',
    parallaxSpeed = 0.5,
    magneticStrength = 0.3,
    glitchIntensity = 0.1,
  } = options;

  const { isVisible, progress, intersectionRatio } = animationState;
  const transition = `all ${duration}ms ${easing} ${delay}ms`;

  const baseStyles: React.CSSProperties = {
    transition,
    willChange: 'transform, opacity, filter',
  };

  switch (type) {
    case 'slideFromLeft':
      return {
        ...baseStyles,
        transform: `translateX(${isVisible ? 0 : -100 * intensity}px)`,
        opacity: isVisible ? 1 : 0,
      };

    case 'slideFromRight':
      return {
        ...baseStyles,
        transform: `translateX(${isVisible ? 0 : 100 * intensity}px)`,
        opacity: isVisible ? 1 : 0,
      };

    case 'slideFromTop':
      return {
        ...baseStyles,
        transform: `translateY(${isVisible ? 0 : -100 * intensity}px)`,
        opacity: isVisible ? 1 : 0,
      };

    case 'slideFromBottom':
      return {
        ...baseStyles,
        transform: `translateY(${isVisible ? 0 : 50 * intensity}px)`,
        opacity: isVisible ? 1 : 0,
      };

    case 'scaleIn':
      return {
        ...baseStyles,
        transform: `scale(${isVisible ? 1 : 0.8 * intensity})`,
        opacity: isVisible ? 1 : 0,
      };

    case 'scaleOut':
      return {
        ...baseStyles,
        transform: `scale(${isVisible ? 1 : 1.2 * intensity})`,
        opacity: isVisible ? 1 : 0,
      };

    case 'rotateIn':
      return {
        ...baseStyles,
        transform: `rotate(${isVisible ? 0 : -180 * intensity}deg) scale(${isVisible ? 1 : 0.8})`,
        opacity: isVisible ? 1 : 0,
      };

    case 'flipX':
      return {
        ...baseStyles,
        transform: `rotateX(${isVisible ? 0 : -90 * intensity}deg)`,
        opacity: isVisible ? 1 : 0,
        transformOrigin: 'center bottom',
      };

    case 'flipY':
      return {
        ...baseStyles,
        transform: `rotateY(${isVisible ? 0 : -90 * intensity}deg)`,
        opacity: isVisible ? 1 : 0,
        transformOrigin: 'center center',
      };

    case 'bounceIn':
      return {
        ...baseStyles,
        transform: `scale(${isVisible ? 1 : 0.3}) translateY(${isVisible ? 0 : 50 * intensity}px)`,
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}ms`,
      };

    case 'elasticIn':
      return {
        ...baseStyles,
        transform: `scale(${isVisible ? 1 : 0.1}) rotate(${isVisible ? 0 : 30 * intensity}deg)`,
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}ms`,
      };

    case 'glitch': {
      const glitchOffset = isVisible ? 0 : glitchIntensity * 10;
      return {
        ...baseStyles,
        transform: `translateX(${Math.random() * glitchOffset - glitchOffset / 2}px) 
                   translateY(${Math.random() * glitchOffset - glitchOffset / 2}px)`,
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'none' : `hue-rotate(${Math.random() * 360}deg) saturate(${2 + Math.random()})`,
        textShadow: isVisible ? 'none' : `${glitchOffset}px 0 red, -${glitchOffset}px 0 blue`,
      };
    }

    case 'morphIn':
      return {
        ...baseStyles,
        transform: `scale(${isVisible ? 1 : 0.5}) skew(${isVisible ? 0 : 15 * intensity}deg)`,
        opacity: isVisible ? 1 : 0,
        borderRadius: isVisible ? '0%' : '50%',
      };

    case 'parallax': {
      const parallaxY = (1 - intersectionRatio) * 100 * parallaxSpeed;
      return {
        ...baseStyles,
        transform: `translateY(${parallaxY}px)`,
        opacity: isVisible ? 1 : 0,
      };
    }

    case 'wave': {
      const waveOffset = Math.sin(Date.now() * 0.005) * 10 * intensity;
      return {
        ...baseStyles,
        transform: `translateY(${isVisible ? waveOffset : 50}px) rotate(${isVisible ? waveOffset * 0.5 : 0}deg)`,
        opacity: isVisible ? 1 : 0,
      };
    }

    case 'magnetic':
      return {
        ...baseStyles,
        transform: `scale(${isVisible ? 1 : 0.9}) translateZ(0)`,
        opacity: isVisible ? 1 : 0,
        filter: `blur(${isVisible ? 0 : 5 * intensity}px)`,
        cursor: 'pointer',
      };

    case 'hologram':
      return {
        ...baseStyles,
        transform: `translateY(${isVisible ? 0 : 30 * intensity}px)`,
        opacity: isVisible ? 1 : 0,
        background: isVisible ? 'transparent' : 'linear-gradient(45deg, rgba(0,255,255,0.1), rgba(255,0,255,0.1))',
        filter: isVisible ? 'none' : 'blur(1px) brightness(1.2)',
        boxShadow: isVisible ? 'none' : '0 0 20px rgba(0,255,255,0.3)',
      };

    case 'particle': {
      const particleScale = isVisible ? 1 : 0.1;
      const particleRotate = isVisible ? 0 : 360 * intensity;
      return {
        ...baseStyles,
        transform: `scale(${particleScale}) rotate(${particleRotate}deg)`,
        opacity: isVisible ? 1 : 0,
        filter: `blur(${isVisible ? 0 : 3}px) brightness(${isVisible ? 1 : 2})`,
      };
    }

    case 'typewriter':
      return {
        ...baseStyles,
        opacity: 1,
        overflow: 'hidden',
        borderRight: isVisible ? 'none' : '2px solid currentColor',
        whiteSpace: 'nowrap',
        width: isVisible ? '100%' : '0%',
        animation: isVisible ? `typewriter ${duration}ms steps(40) ${delay}ms forwards` : 'none',
      };

    default:
      return {
        ...baseStyles,
        opacity: isVisible ? 1 : 0,
      };
  }
};

// Staggered animations for multiple elements
export const useStaggeredAnimation = (
  count: number,
  baseOptions: UseScrollAnimationOptions = {}
) => {
  const animations = Array.from({ length: count }, (_, index) => {
    return useScrollAnimation({
      ...baseOptions,
      delay: (baseOptions.delay || 0) + (baseOptions.stagger || 100) * index,
    });
  });

  return animations;
};

// CSS keyframes for complex animations
export const animationKeyframes = `
  @keyframes typewriter {
    from { width: 0% }
    to { width: 100% }
  }

  @keyframes glitch {
    0%, 100% { transform: translate(0) }
    20% { transform: translate(-2px, 2px) }
    40% { transform: translate(-2px, -2px) }
    60% { transform: translate(2px, 2px) }
    80% { transform: translate(2px, -2px) }
  }

  @keyframes hologram {
    0%, 100% { opacity: 1; filter: blur(0px) }
    50% { opacity: 0.8; filter: blur(1px) }
  }

  @keyframes particle {
    0% { transform: scale(0) rotate(0deg); opacity: 0 }
    50% { transform: scale(1.2) rotate(180deg); opacity: 0.8 }
    100% { transform: scale(1) rotate(360deg); opacity: 1 }
  }
`;

// Utility component for easy usage
interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: AnimationType;
  className?: string;
  style?: React.CSSProperties;
  options?: UseScrollAnimationOptions;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animation = 'fadeIn',
  className = '',
  style = {},
  options = {},
}) => {
  const animationState = useScrollAnimation(options);
  const animationStyle = getAnimationStyle(animationState, animation, options);

  return (
    <div
      ref={animationState.ref}
      className={className}
      style={{ ...style, ...animationStyle }}
    >
      {children}
    </div>
  );
};
