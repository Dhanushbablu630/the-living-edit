"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = { src: string; className?: string; poster?: string; label: string; children?: React.ReactNode; rounded?: boolean; cover?: boolean };

export function LazyVideo({ src, className, poster, label, children, rounded = true, cover = false }: LazyVideoProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  useEffect(() => { const node = wrapper.current; if (!node) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect(); } }, { rootMargin: "240px" }); observer.observe(node); return () => observer.disconnect(); }, []);
  useEffect(() => { if (shouldLoad && video.current) { video.current.load(); void video.current.play().catch(() => undefined); } }, [shouldLoad]);
  return <div ref={wrapper} className={className} style={{ ...(rounded ? { borderRadius: 18 } : {}), ...(cover ? { position: "relative", overflow: "hidden" } : {}) }}><video ref={video} muted loop playsInline autoPlay preload="none" poster={poster} aria-label={label} style={cover ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } : undefined}>{shouldLoad && <source src={src} type="video/mp4" />}</video>{children}</div>;
}
