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
    title: "My Pregnancy Jounel, Pregnancy Planner Set",
    content:
      "The road to motherhood is one of the most eventful journey a woman can take! Each moment, day, week, month brings forth a blend of emotions that are extraordinary with their ups and downs! This journal provides you the space to create a book full of precious and fun experiences, as well as stay on track for things through your pregnancy in a joyful, creative and engaging manner! A beautiful keepsake that can be looked back upon to cherish!",
    bgColor:"#FDDFDF",
    src: "https://m.media-amazon.com/images/I/61kD5hSGkzL._AC_UY218_.jpg",
  },
  {
    title: "Little Miracle: 40 Weeks Pregnancy Journal",
    content:
      "Introducing the Little Miracle Pregnancy Journal, your ultimate companion to document and cherish every incredible moment of your pregnancy journey. From the first fluttering kicks to the anticipation of holding your little one in your arms, this journal is designed to capture every milestone, memory, and emotion along the way.",
    bgColor: "#F0DEFD",
    src: "https://m.media-amazon.com/images/I/71edoVR5DgL._SY425_.jpg",
  },
  {
    title: "Belly to Baby, A Pregnancy Memory Book",
    content:
      "BELLY TO BABY: A Pregnancy Memory Book is the perfect way to document the precious memories of your pregnancy journey. We have created this modern and beautiful pregnancy memory book to record all the important photos. You will enjoy logging precious moments with notes and pictures in our special memory book. PAGES INCLUDE:Early pregnancy experience, Visits to doctors, Ultrasound photos,Baby bump journey month 1 to 9, Baby shower, Photo shoot, Delivery preparation, Baby prediction,Labor experience",
    bgColor: "#DEF3FD",
    src: "https://images-eu.ssl-images-amazon.com/images/I/71KM8qTSbUL._AC_UL165_SR165,165_.jpg",
  },
  
  {
    title: "Bump to Baby Pregnancy Memory Record Book",
    content:
      "Document every significant milestone and event throughout your entire 9-month journey with our 'Bump to Baby' keepsake Pregnancy journal. The journal features beautifully designed, cute, and vibrant pages, including sections such as First Ultrasound, Name Tracker, Baby Shower, Preparing Your Nursery, Hospital Bag Checklist, Letter to My Baby, Baby's Biodata, Trackers, Monthly Reflections, Pregnancy Facts, and helpful tips.",
    bgColor: "#DEFDE0",
    src: "https://m.media-amazon.com/images/I/71FeAaBx6qL._SY425_.jpg",
  },
  
  {
    title: "The Shadow Work Journal",
    content:
      "From the childbirth experts at the Mayo Clinic comes the newly revised guide on planning for a healthy pregnancy. With detailed information about fertility, prenatal care, common pregnancy symptoms, and childbirth, this comprehensive guide will be your go-to source for answering all your ordinary—and not so ordinary—pregnancy questions. Finally, this collective effort from the obstetrics and gynecology experts at the Mayo Clinic covers new information about the latest technologies in prenatal care and childbirth, as well as details the benefits and risks involved with growing trends in childbirth, including topics like home births, placentophagy, and vaginal seeding. ",
    bgColor: "#FCF7DE",
    src: "https://m.media-amazon.com/images/I/712Af-xENML._AC_UY218_.jpg",
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
