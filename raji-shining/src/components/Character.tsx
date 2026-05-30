"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CharacterProps {
  together: boolean;
}

function Butterfly({
  size = 80,
  className = "",
  id = "main",
}: {
  size?: number;
  className?: string;
  id?: string;
}) {
  const filterId = `bfly-glow-${id}`;
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size }}
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* left wing */}
      <g
        style={{
          transformOrigin: "50px 45px",
          animation: "wing-flap 1.8s ease-in-out infinite",
        }}
      >
        <path
          d="M50 45 C35 15, 5 10, 8 35 C10 50, 25 60, 50 50 Z"
          fill="rgba(212, 244, 255, 0.25)"
          stroke="rgba(212, 244, 255, 0.6)"
          strokeWidth="0.8"
          filter={`url(#${filterId})`}
        />
        <path
          d="M50 50 C30 55, 10 65, 18 48 C22 42, 35 45, 50 45 Z"
          fill="rgba(245, 198, 108, 0.2)"
          stroke="rgba(245, 198, 108, 0.5)"
          strokeWidth="0.6"
        />
      </g>

      {/* right wing */}
      <g
        style={{
          transformOrigin: "50px 45px",
          animation: "wing-flap 1.8s ease-in-out infinite",
        }}
      >
        <path
          d="M50 45 C65 15, 95 10, 92 35 C90 50, 75 60, 50 50 Z"
          fill="rgba(212, 244, 255, 0.25)"
          stroke="rgba(212, 244, 255, 0.6)"
          strokeWidth="0.8"
          filter={`url(#${filterId})`}
        />
        <path
          d="M50 50 C70 55, 90 65, 82 48 C78 42, 65 45, 50 45 Z"
          fill="rgba(245, 198, 108, 0.2)"
          stroke="rgba(245, 198, 108, 0.5)"
          strokeWidth="0.6"
        />
      </g>

      {/* body */}
      <ellipse cx="50" cy="47" rx="2.5" ry="10" fill="rgba(244, 237, 225, 0.7)" />

      {/* antennae */}
      <path
        d="M49 38 C46 30, 42 26, 38 22"
        stroke="rgba(244,237,225,0.5)"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M51 38 C54 30, 58 26, 62 22"
        stroke="rgba(244,237,225,0.5)"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="38" cy="22" r="1.5" fill="rgba(212, 244, 255, 0.8)" />
      <circle cx="62" cy="22" r="1.5" fill="rgba(212, 244, 255, 0.8)" />
    </svg>
  );
}

export default function Character({ together }: CharacterProps) {
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // soft, floaty spring — butterfly feel
  const x = useSpring(mouseX, { stiffness: 50, damping: 18, mass: 1.2 });
  const y = useSpring(mouseY, { stiffness: 50, damping: 18, mass: 1.2 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div style={{ animation: "flutter 3.2s ease-in-out infinite" }}>
        <div className="relative">
          {/* main butterfly */}
          <Butterfly size={80} className="hidden md:block" id="main-lg" />
          <Butterfly size={58} className="block md:hidden" id="main-sm" />

          {/* glowing orb trail */}
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2"
            style={{ animation: "float-orb 4s ease-in-out infinite" }}
          >
            <div className="relative w-3 h-3">
              <div className="absolute inset-0 rounded-full bg-orb opacity-90 blur-[2px]" />
              <div className="absolute -inset-1 rounded-full bg-orb opacity-50 blur-[6px]" />
              <div className="absolute -inset-2 rounded-full bg-orb opacity-25 blur-[10px]" />
            </div>
          </div>

          {/* companion butterfly */}
          <div
            className="absolute top-2 -left-14 transition-opacity duration-700"
            style={{ opacity: together ? 1 : 0 }}
          >
            <Butterfly size={50} className="hidden md:block" id="comp-lg" />
            <Butterfly size={36} className="block md:hidden" id="comp-sm" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
