"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface SceneProps {
  id: string;
  title?: string;
  text?: string;
  subtitle?: string;
  renderExtra?: (progress: MotionValue<number>) => React.ReactNode;
}

export default function Scene({
  id,
  title,
  text,
  subtitle,
  renderExtra,
}: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} id={id} className="relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 md:px-16 overflow-hidden">
        <div className="relative z-10 flex flex-col items-center gap-4 max-w-3xl">
          {title && <RevealTitle text={title} progress={scrollYProgress} />}
          {text && <RevealText text={text} progress={scrollYProgress} />}
          {subtitle && (
            <RevealSubtitle text={subtitle} progress={scrollYProgress} />
          )}
        </div>
        {renderExtra?.(scrollYProgress)}
      </div>
    </section>
  );
}

function RevealTitle({
  text,
  progress,
}: {
  text: string;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0, 0.15, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [0, 0.15], [40, 0]);

  return (
    <motion.h1
      style={{
        opacity,
        y,
        background: "linear-gradient(180deg, #fff7e8 0%, #f5c66c 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 2px 20px rgba(245, 198, 108, 0.4))",
      }}
      className="font-display text-7xl md:text-8xl lg:text-9xl font-light tracking-tight"
    >
      {text}
    </motion.h1>
  );
}

function RevealSubtitle({
  text,
  progress,
}: {
  text: string;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0.12, 0.28, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.p
      style={{
        opacity,
        color: "#5a4535",
        textShadow: "0 1px 12px rgba(255,255,255,0.4)",
      }}
      className="font-body text-sm md:text-lg italic tracking-wider"
    >
      {text}
    </motion.p>
  );
}

function RevealText({
  text,
  progress,
}: {
  text: string;
  progress: MotionValue<number>;
}) {
  const words = text.split(" ");

  return (
    <p className="max-w-2xl text-center leading-loose font-body text-lg md:text-xl lg:text-2xl">
      {words.map((w, i) => (
        <Word key={i} word={w} index={i} total={words.length} progress={progress} />
      ))}
    </p>
  );
}

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (index / total) * 0.4;
  const end = start + 0.12;

  const opacity = useTransform(progress, [start, end, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [20, 0]);
  const blurVal = useTransform(progress, [start, end], [4, 0]);
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

  return (
    <motion.span
      style={{
        opacity,
        y,
        filter,
        color: "#2a1f14",
        textShadow: "0 1px 16px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3)",
      }}
      className="inline-block mx-[0.2em]"
    >
      {word}
    </motion.span>
  );
}
