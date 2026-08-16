/** Golden Hour motion system: damped Lenis scroll, quiet progress wayfinding, and restrained pointer-responsive controls. */
import Lenis from "lenis";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { useLocation } from "wouter";

export default function SmoothMotion({ children }: { children: ReactNode }) {
  const progressRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.05,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let frameId = 0;
    const animate = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    const onScroll = ({ progress }: { progress: number }) => {
      progressRef.current?.style.setProperty("transform", `scaleX(${Math.max(0, progress)})`);
    };
    lenis.on("scroll", onScroll);

    const magneticTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const cleanups = magneticTargets.map((target) => {
      const move = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const rect = target.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 4;
        target.style.setProperty("--magnetic-x", `${x}px`);
        target.style.setProperty("--magnetic-y", `${y}px`);
      };
      const leave = () => {
        target.style.setProperty("--magnetic-x", "0px");
        target.style.setProperty("--magnetic-y", "0px");
      };
      target.addEventListener("pointermove", move);
      target.addEventListener("pointerleave", leave);
      return () => {
        target.removeEventListener("pointermove", move);
        target.removeEventListener("pointerleave", leave);
      };
    });

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    progressRef.current?.style.setProperty("transform", "scaleX(0)");
  }, [location]);

  return <><div className="scroll-progress" ref={progressRef} aria-hidden="true" />{children}</>;
}
