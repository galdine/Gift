"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

const MESSAGES: { text: string; side: "left" | "right"; time: string }[] = [
  { text: "you still awake?", side: "right", time: "11:47 PM" },
  { text: "always for you", side: "left", time: "11:47 PM" },
  { text: "tell me something no one knows", side: "right", time: "11:52 PM" },
  { text: "I knew you were different the moment we met", side: "left", time: "11:53 PM" },
  { text: "don\u2019t ever stop talking to me, ok?", side: "right", time: "12:01 AM" },
];

interface ChatBubblesProps {
  progress: MotionValue<number>;
}

export default function ChatBubbles({ progress }: ChatBubblesProps) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm mt-6">
      {MESSAGES.map((msg, i) => (
        <Bubble
          key={i}
          text={msg.text}
          side={msg.side}
          time={msg.time}
          index={i}
          progress={progress}
        />
      ))}
    </div>
  );
}

function Bubble({
  text,
  side,
  time,
  index,
  progress,
}: {
  text: string;
  side: "left" | "right";
  time: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.25 + (index / MESSAGES.length) * 0.3;
  const end = start + 0.08;

  const opacity = useTransform(progress, [start, end, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(
    progress,
    [start, end],
    [side === "left" ? -30 : 30, 0]
  );

  return (
    <motion.div
      style={{ opacity, x }}
      className={`glass rounded-2xl px-4 py-2.5 max-w-[80%] text-sm font-body ${
        side === "right"
          ? "self-end text-ink"
          : "self-start text-ink-soft"
      }`}
    >
      {text}
      <span className="block text-[10px] mt-1 opacity-40 tracking-wide">
        {time}
      </span>
    </motion.div>
  );
}
