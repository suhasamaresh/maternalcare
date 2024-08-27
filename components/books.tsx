"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import TypingAnimation from "./magicui/typing-animation";

interface CardData {
  title: string;
  content: string;
  bgColor: string;
  src: string;
}

const cardData: CardData[] = [
  {
    title: "What to Expect When You're Expecting",
    content:
      "This book offers practical advice and information on pregnancy, childbirth, and the first year of a baby's life. It covers a wide range of topics including physical changes, emotional wellbeing, and practical tips for expectant parents. The book is divided into easy-to-read sections that guide you through each stage of pregnancy, helping you understand what to expect and how to prepare for the arrival of your baby.",
    bgColor: "#c3f0ca",
    src: "https://covers.openlibrary.org/b/id/8779426-L.jpg",
  },
  {
    title: "The Womanly Art of Breastfeeding",
    content:
      "An essential guide for breastfeeding mothers, providing comprehensive information and support. This book covers everything from the basics of breastfeeding to dealing with common challenges and ensuring that both mother and baby are healthy and happy. It is a valuable resource for new mothers, offering practical advice and encouraging words from experienced breastfeeding advocates.",
    bgColor: "#FEF8DD",
    src: "https://covers.openlibrary.org/b/id/8226195-L.jpg",
  },
  {
    title: "Ina May's Guide to Childbirth",
    content:
      "A natural approach to childbirth, emphasizing the power and strength of women’s bodies. This book offers inspirational birth stories and practical advice on how to have a more comfortable and empowering birth experience. Ina May Gaskin shares her wisdom and knowledge gained from years of experience as a midwife, helping women to trust their bodies and make informed choices about their childbirth experience.",
    bgColor: "#ACDDDE",
    src: "https://covers.openlibrary.org/b/id/10682317-L.jpg",
  },
  {
    title: "The Birth Partner",
    content:
      "A complete guide for partners, doulas, and other labor companions. This book provides detailed information on how to support a birthing person through labor and delivery. It includes practical tips, emotional support strategies, and step-by-step guidance on what to expect during each stage of labor. It is an invaluable resource for anyone who will be supporting a birthing person, helping them to provide the best possible care and support.",
    bgColor: "#FFE7C7",
    src: "https://covers.openlibrary.org/b/id/8261844-L.jpg",
  },
  {
    title: "HypnoBirthing: The Mongan Method",
    content:
      "An approach to childbirth that emphasizes relaxation and self-hypnosis. This book teaches techniques for a more calm and comfortable birth, helping mothers to manage pain and reduce stress. It includes practical exercises, guided imagery, and positive affirmations that can be used during pregnancy and labor. The Mongan Method aims to help women have a more positive and empowering birth experience by tapping into the power of their mind and body.",
    bgColor: "#8ED6C5",
    src: "https://covers.openlibrary.org/b/id/8281998-L.jpg",
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
        className="p-8 shadow-md w-[90%] sm:w-[80%] md:w-[60%] lg:w-[1000px] h-[500px] sm:h-[200px] md:h-[300px] lg:h-[500px] rounded-xl overflow-hidden relative"
        style={{
          scale,
          top: `calc(-10px + ${i * 25}px)`,
          backgroundColor: bgColor,
        }}
      >
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold flex-grow">{title}</h2>
          <motion.img
            src={src}
            alt={title}
            style={{ opacity, scale: imagescale }}
            className="ml-4 w-[150px] h-[200px] sm:w-[120px] sm:h-[160px] md:w-[150px] md:h-[200px]"
          />
        </div>
        <p className="text-gray-700">{content}</p>
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

    lenis.on("scroll", (e: any) => {});

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
        <TypingAnimation
          className="text-4xl font-semibold pt-20 text-[#33272a]  dark:text-white"
          text="Take a look at some of the recommended books for expectant mothers"
          duration={100}
        />
        <Link href={"indivbook"}>
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
        </Link>
      </div>
      <div className="flex justify-center">
        <Link href={"/bookpage"}>
          <motion.button
            className="bg-[#ff8ba7] text-[#33272a] py-2 px-6 rounded-lg text-lg font-semibold hover:bg-[#ff6b85] transition-colors"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            More...
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default StickyCardList;
