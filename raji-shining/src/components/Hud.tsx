"use client";

import { useRef, useState, useCallback } from "react";

const LABELS = [
  "",
  "chapter one",
  "chapter two",
  "chapter three",
  "chapter four",
  "chapter five",
  "chapter six",
  "the end",
];

interface HudProps {
  activeScene: number;
  showScrollHint: boolean;
}

export default function Hud({ activeScene, showScrollHint }: HudProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/song.mp3");
      audioRef.current.loop = true;
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying((p) => !p);
  }, [playing]);

  return (
    <>
      {/* top-right: music toggle — dark bg so visible on any image */}
      <button
        onClick={toggleMusic}
        className="fixed top-5 right-6 z-[95] w-12 h-12 rounded-full flex items-center justify-center text-xl hover:scale-110 transition-transform"
        style={{
          background: playing
            ? "rgba(245, 198, 108, 0.35)"
            : "rgba(0, 0, 0, 0.45)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: playing
            ? "1.5px solid rgba(245, 198, 108, 0.5)"
            : "1.5px solid rgba(255, 255, 255, 0.25)",
          color: "white",
          cursor: "pointer",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          animation: playing ? "glow-pulse 2s ease-in-out infinite" : "none",
        }}
        aria-label="Toggle music"
      >
        {playing ? "\u266B" : "\u266A"}
      </button>

      {/* bottom-center: chapter badge (hide on hero) */}
      {activeScene > 0 && LABELS[activeScene] && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[95] rounded-full px-5 py-2 select-none"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <span className="text-[11px] font-body italic tracking-wider text-white/70">
            &mdash; {LABELS[activeScene]} &mdash;
          </span>
        </div>
      )}

      {/* scroll hint — hero only */}
      {showScrollHint && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[95] flex flex-col items-center gap-2 select-none">
          <span
            className="text-[12px] font-body tracking-[0.3em] uppercase"
            style={{
              color: "rgba(60, 50, 40, 0.7)",
              textShadow: "0 1px 8px rgba(255,255,255,0.4)",
            }}
          >
            scroll gently
          </span>
          <div
            className="w-px h-8"
            style={{
              background: "rgba(60, 50, 40, 0.4)",
              animation: "bounce-line 2s ease-in-out infinite",
            }}
          />
        </div>
      )}
    </>
  );
}
