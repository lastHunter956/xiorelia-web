// Easing functions for smooth scrolling
export const easingFunctions = {
  // Smooth ease-out (starts fast, ends slow)
  easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),

  // Smooth ease-in-out (slow start, fast middle, slow end)
  easeInOutCubic: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,

  // Gentle ease-out (very smooth)
  easeOutQuart: (t: number): number => 1 - Math.pow(1 - t, 4),

  // Premium easing (custom curve for luxury feel)
  premiumEase: (t: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },

  // Elastic ease-out (slight bounce at end)
  easeOutElastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

interface SmoothScrollOptions {
  duration?: number;
  easing?: keyof typeof easingFunctions;
  offset?: number;
  callback?: () => void;
}

export function smoothScrollTo(
  target: string | HTMLElement,
  options: SmoothScrollOptions = {}
) {
  const {
    duration = 1200,
    easing = "easeOutCubic",
    offset = -100, // Account for navbar height
    callback,
  } = options;

  const targetElement =
    typeof target === "string"
      ? (document.querySelector(target) as HTMLElement)
      : target;

  if (!targetElement) {
    console.warn(`Target element not found: ${target}`);
    return;
  }

  const startPosition = window.pageYOffset;
  // Use offsetTop instead of getBoundingClientRect for more reliable positioning
  const targetPosition = targetElement.offsetTop + offset;
  const distance = targetPosition - startPosition;

  // Adjust duration based on distance (longer distances take more time)
  const adjustedDuration = Math.min(
    Math.max(Math.abs(distance) / 2, 800),
    duration
  );

  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;

    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / adjustedDuration, 1);

    // Apply easing function
    const easedProgress = easingFunctions[easing](progress);
    const currentPosition = startPosition + distance * easedProgress;

    window.scrollTo(0, currentPosition);

    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      // Animation complete
      callback?.();
    }
  }

  requestAnimationFrame(animation);
}

// Smooth scroll to top with premium easing
export function smoothScrollToTop(duration = 1000) {
  smoothScrollTo(document.body, {
    duration,
    easing: "easeOutQuart",
    offset: 0,
  });
}

// Get optimal easing based on scroll distance
export function getOptimalEasing(
  distance: number
): keyof typeof easingFunctions {
  const absDistance = Math.abs(distance);

  if (absDistance < 500) {
    return "easeOutCubic"; // Short distances - quick and smooth
  } else if (absDistance < 1500) {
    return "easeInOutCubic"; // Medium distances - balanced
  } else {
    return "easeOutQuart"; // Long distances - gentle and luxurious
  }
}

// Smooth scroll with automatic easing selection
export function smartSmoothScroll(
  target: string | HTMLElement,
  options: Omit<SmoothScrollOptions, "easing"> = {}
) {
  const targetElement =
    typeof target === "string"
      ? (document.querySelector(target) as HTMLElement)
      : target;

  if (!targetElement) {
    console.warn(`Target element not found for smartSmoothScroll: ${target}`);
    return;
  }

  const startPosition = window.pageYOffset;
  const targetPosition = targetElement.offsetTop + (options.offset || -100);
  const distance = targetPosition - startPosition;

  const optimalEasing = getOptimalEasing(distance);

  smoothScrollTo(target, {
    ...options,
    easing: optimalEasing,
  });
}
