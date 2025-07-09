import { usePerformanceOptimization } from "@/hooks/use-lazy-loading"

export const useOptimizedAnimations = () => {
  const { shouldReduceAnimations, isLowPerformance } = usePerformanceOptimization()

  const getAnimationConfig = (baseConfig: any) => {
    if (shouldReduceAnimations) {
      return {
        ...baseConfig,
        transition: { duration: 0.01 },
        animate: baseConfig.initial || {},
      }
    }

    if (isLowPerformance) {
      return {
        ...baseConfig,
        transition: {
          ...baseConfig.transition,
          duration: (baseConfig.transition?.duration || 0.5) * 0.7,
        },
      }
    }

    return baseConfig
  }

  const optimizedVariants = {
    // Reduced complexity variants for low performance
    simple: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    // Full variants for high performance
    complex: {
      hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95,
        filter: "blur(4px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      },
    },
  }

  return {
    getAnimationConfig,
    variants: isLowPerformance ? optimizedVariants.simple : optimizedVariants.complex,
    shouldReduceAnimations,
    isLowPerformance,
  }
}

export const optimizedTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.3,
}

export const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 0.8,
}

export const fastTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.15,
}
