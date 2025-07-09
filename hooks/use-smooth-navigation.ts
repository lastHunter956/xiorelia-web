"use client"

import { useCallback } from "react"
import { smoothScrollTo, smartSmoothScroll } from "@/utils/smooth-scroll"

interface NavigationOptions {
  offset?: number
  duration?: number
  onComplete?: () => void
}

export function useSmoothNavigation() {
  const navigateToSection = useCallback((sectionId: string, options: NavigationOptions = {}) => {
    const { offset = -100, duration, onComplete } = options

    // Add visual feedback
    const targetElement = document.querySelector(sectionId)
    if (targetElement) {
      // Add a subtle highlight effect
      targetElement.classList.add("navigation-target")
      setTimeout(() => {
        targetElement.classList.remove("navigation-target")
      }, 1000)
    }

    smartSmoothScroll(sectionId, {
      offset,
      duration,
      callback: onComplete,
    })
  }, [])

  const navigateToTop = useCallback((duration = 1000) => {
    smoothScrollTo(document.body, {
      duration,
      easing: "easeOutQuart",
      offset: 0,
    })
  }, [])

  return {
    navigateToSection,
    navigateToTop,
  }
}
