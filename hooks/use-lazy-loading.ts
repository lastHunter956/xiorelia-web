"use client"

import { useState, useEffect, useRef } from "react"

interface UseLazyLoadingOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useLazyLoading(options: UseLazyLoadingOptions = {}) {
  const { threshold = 0.1, rootMargin = "50px", triggerOnce = true } = options
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        setIsIntersecting(isVisible)

        if (isVisible && !hasIntersected) {
          setHasIntersected(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, hasIntersected])

  return {
    elementRef,
    isIntersecting,
    hasIntersected,
    shouldLoad: triggerOnce ? hasIntersected : isIntersecting,
  }
}

export function usePerformanceOptimization() {
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)

    // Performance detection
    const checkPerformance = () => {
      const connection = (navigator as any).connection
      const hardwareConcurrency = navigator.hardwareConcurrency || 4
      const deviceMemory = (navigator as any).deviceMemory || 4

      // Consider low performance if:
      // - Less than 4 CPU cores
      // - Less than 4GB RAM
      // - Slow connection
      const isLowSpec = hardwareConcurrency < 4 || deviceMemory < 4
      const isSlowConnection =
        connection &&
        (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g" || connection.saveData)

      setIsLowPerformance(isLowSpec || isSlowConnection || false)
    }

    checkPerformance()

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return {
    isLowPerformance,
    prefersReducedMotion,
    shouldReduceAnimations: isLowPerformance || prefersReducedMotion,
  }
}
