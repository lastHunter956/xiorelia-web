import { lazy } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import LazySection from "@/components/optimized/lazy-section";

// Lazy load heavy components
const Features = lazy(() => import("@/components/features"));
const AppDemo = lazy(() => import("@/components/app-demo"));
const Testimonials = lazy(() => import("@/components/testimonials"));
const Waitlist = lazy(() => import("@/components/waitlist"));

// Loading fallbacks
const SectionSkeleton = () => (
  <div className="py-32">
    <div className="max-w-7xl mx-auto px-6">
      <div className="animate-pulse space-y-8">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto max-w-md"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mx-auto max-w-2xl"></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"
            ></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Navbar />
      <Hero />

      <LazySection
        fallback={<SectionSkeleton />}
        threshold={0.1}
        rootMargin="200px"
      >
        <Features />
      </LazySection>

      <LazySection
        fallback={<SectionSkeleton />}
        threshold={0.1}
        rootMargin="200px"
      >
        <AppDemo />
      </LazySection>

      <LazySection
        fallback={<SectionSkeleton />}
        threshold={0.1}
        rootMargin="200px"
      >
        <Waitlist />
      </LazySection>
    </main>
  );
}
