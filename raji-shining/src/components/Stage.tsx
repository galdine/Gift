"use client";

const SCENES = [
  "/images/01-hero.png",
  "/images/02-food-court.png",
  "/images/03-college-gate.png",
  "/images/04-coconut-pudding.png",
  "/images/05-endless-talks.png",
  "/images/06-bus-ride.png",
  "/images/07-us.png",
  "/images/08-stars.png",
];

interface StageProps {
  activeScene: number;
}

export default function Stage({ activeScene }: StageProps) {
  return (
    <div className="fixed inset-0 z-[1]" aria-hidden>
      {/* parchment base so watercolor edges blend */}
      <div className="absolute inset-0" style={{ background: "#f0ebe0" }} />

      {SCENES.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity"
          style={{
            opacity: activeScene === i ? 1 : 0,
            transitionDuration: "1.4s",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: "center center",
              transform: activeScene === i ? "scale(1.04)" : "scale(1)",
              transition: "transform 8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* subtle dark overlay so light-image text stays readable */}
      <div className="absolute inset-0" style={{ background: "rgba(8, 6, 15, 0.25)" }} />
    </div>
  );
}
