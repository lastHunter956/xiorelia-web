"use client"

import { memo, type ReactNode, Suspense } from "react"
import { motion } from "framer-motion"
import { useLazyLoading } from "@/hooks/use-lazy-loading"
import { useOptimizedAnimations } from "@/utils/animation-config"

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

const LazySection = memo(function LazySection({
  children,
  fallback,
  className,
  threshold = 0.1,
  rootMargin = "100px",
}: LazySectionProps) {
  const { elementRef, shouldLoad } = useLazyLoading({
    threshold,
    rootMargin,
    triggerOnce: true,
  })

  const { getAnimationConfig, variants } = useOptimizedAnimations()

  const animationConfig = getAnimationConfig({
    initial: "hidden",
    animate: shouldLoad ? "visible" : "hidden",
    variants,
    viewport: { once: true, amount: 0.3 },
  })

  return (
    <motion.section ref={elementRef} className={className} {...animationConfig}>
      {shouldLoad ? (
        <Suspense fallback={fallback || <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-64" />}>
          {children}
        </Suspense>
      ) : (
        fallback || <div className="h-64" />
      )}
    </motion.section>
  )
})

export default LazySection
