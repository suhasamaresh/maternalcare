"use client";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import React, { useEffect } from "react";
import clsx from "clsx";

const PointerCard = ({ title }: { title: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const [isInside, setIsInside] = React.useState(false);

  useEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, []);

  const handleMouseMove = (event: { clientX: number; clientY: number }) => {
    if (rect) {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      x.set(event.clientX - rect.left + scrollX);
      y.set(event.clientY - rect.top + scrollY);
    }
  };

  const handleMouseLeave = () => {
    setIsInside(false);
  };

  const handleMouseEnter = () => {
    setIsInside(true);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: "none" }}
      className={clsx(
        "relative w-72 h-72 bg-[#ff8ba7] rounded-lg flex items-center justify-center ml-[100px]"
      )}
    >
      <AnimatePresence>
        {isInside && <FollowPointer x={x.get()} y={y.get()} title={title} />}
      </AnimatePresence>
      <div>{title}</div>
    </div>
  );
};

const FollowPointer = ({
  x,
  y,
  title,
}: {
  x: number;
  y: number;
  title: string;
}) => {
  const colors = [
    "var(--red-200)",
    "var(--blue-200)",
    "var(--green-200)",
    "var(--yellow-200)",
    "var(--orange-200)",
    "var(--indigo-200)",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      className="absolute z-50 rounded-full"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 text-sky-500 transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-sky-600"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>
      <motion.div
        style={{
          backgroundColor: "red",
        }}
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
        className={clsx(
          "px-2 py-2 text-white whitespace-nowrap min-w-max text-xs rounded-full"
        )}
      >
        {title || "Hello"}
      </motion.div>
    </motion.div>
  );
};

export default PointerCard;
