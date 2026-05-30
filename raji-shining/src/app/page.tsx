"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Character from "@/components/Character";
import Hud from "@/components/Hud";
import Stage from "@/components/Stage";
import Scene from "@/components/scenes/Scene";
import ChatBubbles from "@/components/scenes/ChatBubbles";
import Finale from "@/components/scenes/Finale";

const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
});

const FLOATING_LIGHTS = [
  { size: 6, left: 8, dur: 18, delay: 0, hue: "gold" },
  { size: 10, left: 22, dur: 24, delay: -6, hue: "orb" },
  { size: 4, left: 35, dur: 16, delay: -12, hue: "white" },
  { size: 8, left: 48, dur: 20, delay: -4, hue: "gold" },
  { size: 12, left: 62, dur: 26, delay: -14, hue: "orb" },
  { size: 5, left: 75, dur: 15, delay: -8, hue: "gold" },
  { size: 9, left: 88, dur: 22, delay: -18, hue: "white" },
  { size: 7, left: 15, dur: 19, delay: -10, hue: "orb" },
  { size: 6, left: 42, dur: 21, delay: -2, hue: "gold" },
  { size: 11, left: 55, dur: 25, delay: -16, hue: "white" },
  { size: 5, left: 70, dur: 17, delay: -7, hue: "orb" },
  { size: 8, left: 95, dur: 23, delay: -11, hue: "gold" },
];

const HUE_MAP: Record<string, string> = {
  gold: "#f5c66c",
  orb: "#d4f4ff",
  white: "rgba(255,255,255,0.9)",
};

export default function Home() {
  const [activeScene, setActiveScene] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      const idx = Math.min(7, Math.floor((y + vh * 0.5) / (vh * 2)));
      setActiveScene(idx);
      setShowScrollHint(y < vh * 0.4);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const together = activeScene >= 3;

  return (
    <>
      <SmoothScroll />
      <Stage activeScene={activeScene} />
      <ParticleField />
      <Character together={together} />
      <Hud activeScene={activeScene} showScrollHint={showScrollHint} />

      {/* page load curtain */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          background: "var(--bg-base)",
          animation:
            "curtain-reveal 1.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s forwards",
          pointerEvents: "none",
        }}
      >
        <p
          className="font-display text-xl md:text-2xl italic tracking-[0.25em]"
          style={{
            color: "var(--ink-faint)",
            animation: "curtain-text-in 0.8s ease forwards",
          }}
        >
          for you
        </p>
      </div>

      {/* floating bokeh lights */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none overflow-hidden"
        aria-hidden
      >
        {FLOATING_LIGHTS.map((l, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: l.size,
              height: l.size,
              left: `${l.left}%`,
              bottom: -20,
              background: `radial-gradient(circle, ${HUE_MAP[l.hue]} 0%, transparent 70%)`,
              boxShadow: `0 0 ${l.size * 2}px ${HUE_MAP[l.hue]}`,
              opacity: 0.18,
              animation: `drift-up ${l.dur}s linear ${l.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="vignette" />
      <div className="grain">
        <div className="grain-inner">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <filter id="g">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#g)" />
          </svg>
        </div>
      </div>

      <main className="relative z-10">
        <Scene
          id="hero"
          title="Raji"
          subtitle="this is how I fell in love with you"
        />

        <Scene
          id="food-court"
          text="I walked up to your stall and bought a gold coin chocolate. I was going to give it to my ex. Worst investment. Best mistake of my life."
        />

        <Scene
          id="college-gate"
          text={"We crossed paths and said nothing. I didn\u2019t know yet that you were my whole life walking quietly by."}
        />

        <Scene
          id="coconut-pudding"
          text={"A friend introduced us at the carnival. I bought you coconut pudding. Then you asked for my number \u2014 the bravest, best thing anyone\u2019s ever done for me."}
        />

        <Scene
          id="endless-talks"
          text="Then came the nights that did not want to end."
          renderExtra={(progress) => <ChatBubbles progress={progress} />}
        />

        <Scene
          id="bus-ride"
          text={"Somewhere between two cities, between two windows, between two hearts that had been waiting \u2014 everything changed."}
          subtitle={"our first kiss \u00B7 the turning point"}
        />

        <Scene
          id="us"
          text={"Ups and downs. Fights at midnight, peace at dawn. The past tried to pull us back. And every single time \u2014 we chose each other."}
        />

        <Scene
          id="forever"
          text={"From buying chocolate for the wrong person\u2026 to choosing you forever."}
          subtitle={"Happy Birthday, Raji \uD83E\uDD0D"}
          renderExtra={() => <Finale />}
        />

        <section className="relative h-[50vh] flex items-center justify-center">
          <p
            className="font-display text-lg md:text-xl italic tracking-[0.2em] text-center px-6"
            style={{ color: "var(--ink-faint)" }}
          >
            — written in code, meant from the heart —
          </p>
        </section>
      </main>
    </>
  );
}
