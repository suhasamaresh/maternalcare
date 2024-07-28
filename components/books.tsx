"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import React, { use, useEffect, useRef } from "react";

interface CardData {
  title: string;
  content: string;
  bgColor: string;
  src: string;
}

const cardData: CardData[] = [
  {
    title: "Card Title 1",
    content: "This is the content of Card 1.",
    bgColor: "bg-red-200",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ_2oII-AssPFNOvcLQ6ecJ6ZWQlUbKU3j8w&s",
  },
  {
    title: "Card Title 2",
    content: "This is the content of Card 2.",
    bgColor: "bg-blue-200",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA2oASENe7GdCli1KnAl6cnDnuD6lGT60txQ&s",
  },
  {
    title: "Card Title 3",
    content: "This is the content of Card 3.",
    bgColor: "bg-green-200",
    src: "next.svg",
  },
  {
    title: "Card Title 4",
    content: "This is the content of Card 4.",
    bgColor: "bg-yellow-200",
    src: "next.svg",
  },
  {
    title: "Card Title 5",
    content: "This is the content of Card 5.",
    bgColor: "bg-purple-200",
    src: "next.svg",
  },
];

const StickyCard = ({
  i,
  title,
  content,
  bgColor,
  src,
  progress,
  range,
  targetScale,
}: CardData & {
  i: number;
  progress: any;
  range: number[];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const imagescale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
  
    <div
      ref={container}
      className="flex flex-col h-screen items-center justify-center mt-8 sticky top-0"
    >
      <motion.div
        className={`p-8 shadow-md w-[90%] sm:w-[80%] md:w-[60%] lg:w-[1000px] h-[500px] sm:h-[200px] md:h-[300px] lg:h-[500px] rounded-xl overflow-hidden relative ${bgColor}`}
        style={{ scale, top: `calc(-10px + ${i * 25}px)` }}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700">{content}</p>
        <div className="overflow-hidden">
          <motion.img
            src={src}
            alt={title}
            style={{ opacity, scale: imagescale }}
            className="mt-4 w-full h-[50px]"
          />
        </div>
      </motion.div>
    </div>
  );
};

const StickyCardList = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e: any) => {
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <div>
   
    <div
      ref={container}
      className="flex flex-col items-center justify-center space-y-8"
    >
         <p className='font-bold text-black text-center text-4xl pt-10'>These are some of the books we recommend to read during pregnancy</p>
      {cardData.map((card, index) => {
        const targetScale = 1 - (cardData.length - index) * 0.05;
        const range = [index / cardData.length, 1];
        return (
          <StickyCard
            i={index}
            key={index}
            title={card.title}
            content={card.content}
            bgColor={card.bgColor}
            src={card.src}
            range={range}
            targetScale={targetScale}
            progress={scrollYProgress}
          />
        );
      })}
    </div></div>
  );
};

export default StickyCardList;
