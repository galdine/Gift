"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const EMOJIS = ["\uD83E\uDE99", "\uD83D\uDC9B", "\u2B50", "\uD83E\uDD0D", "\u2728"];

interface Coin {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function Finale() {
  const ref = useRef<HTMLDivElement>(null);
  const [coins, setCoins] = useState<Coin[]>([]);
  const triggered = useRef(false);

  const burst = useCallback((count: number, baseId: number) => {
    const batch: Coin[] = Array.from({ length: count }, (_, i) => ({
      id: baseId + i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
      size: 16 + Math.random() * 20,
    }));
    setCoins((prev) => [...prev, ...batch]);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          burst(60, 0);
          const t1 = setTimeout(() => burst(30, 100), 5000);
          const t2 = setTimeout(() => burst(20, 200), 10000);
          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
          };
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [burst]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {coins.map((c) => (
        <span
          key={c.id}
          className="absolute top-0"
          style={{
            left: `${c.left}%`,
            fontSize: `${c.size}px`,
            animation: `coin-fall ${c.duration}s ease-in ${c.delay}s forwards`,
          }}
        >
          {c.emoji}
        </span>
      ))}
    </div>
  );
}
