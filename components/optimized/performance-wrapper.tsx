"use client"

import { memo, type ReactNode } from "react"
import { usePerformanceOptimization } from "@/hooks/use-lazy-loading"

interface PerformanceWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
}

const PerformanceWrapper = memo(function PerformanceWrapper({
  children,
  fallback,
  className,
}: PerformanceWrapperProps) {
  const { shouldReduceAnimations } = usePerformanceOptimization()

  if (shouldReduceAnimations && fallback) {
    return <div className={className}>{fallback}</div>
  }

  return <div className={className}>{children}</div>
})

export default PerformanceWrapper
