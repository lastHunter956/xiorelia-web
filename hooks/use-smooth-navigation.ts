"use client";

import { useCallback } from "react";

interface NavigationOptions {
  offset?: number;
  duration?: number;
  onComplete?: () => void;
}

export function useSmoothNavigation() {
  const navigateToSection = useCallback(
    (sectionId: string, options: NavigationOptions = {}) => {
      const { offset = -100, onComplete } = options;

      // Ensure sectionId starts with #
      const targetSelector = sectionId.startsWith("#")
        ? sectionId
        : `#${sectionId}`;

      // Find the target element
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        // Get the element's position
        const elementTop = targetElement.getBoundingClientRect().top;
        const currentScroll = window.pageYOffset;
        const targetPosition = currentScroll + elementTop + offset;

        // Use native smooth scroll - fast and reliable
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Call completion callback after a short delay
        if (onComplete) {
          setTimeout(onComplete, 500);
        }
      } else {
        console.warn(`Target element not found: ${targetSelector}`);
      }
    },
    []
  );

  const navigateToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return {
    navigateToSection,
    navigateToTop,
  };
}
