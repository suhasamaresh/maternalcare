"use client";
import React from 'react';
import BlurFade from "@/components/magicui/blur-fade";
import LetterPullup from "@/components/magicui/letter-pullup";
import SparklesText from "@/components/magicui/sparkles-text";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { useInView } from 'react-intersection-observer';

interface SectionProps {
  imageSrc: string;
  title: string;
  description: string;
  reverse?: boolean;
  bgColor: string;
}

const Section: React.FC<SectionProps> = ({ imageSrc, title, description, reverse, bgColor }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <div ref={ref} className={`flex flex-col pt-20 md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center ${bgColor} py-12`}>
      <div className={`md:w-1/2 ${inView ? 'animate-slideInLeft' : 'opacity-0'}`}>
        <img src={imageSrc} alt={title} className="rounded-lg shadow-lg w-[500px] h-[400px]" />
      </div>
      <div className={`md:w-1/2 p-4 text-center md:text-left pr-60 ${inView ? 'animate-slideInRight' : 'opacity-0'}`}>
        <h2 className="text-2xl pl-4 font-semibold"><BlurFade delay={0.1} inView><LetterPullup words={title} delay={0.1}/></BlurFade></h2>
        <p className="mt-4 text-lg">{description}</p>
      </div>
    </div>
  );
};

const ExerciseDescriptionPage: React.FC = () => {
  return (
    <div>
      <header className="bg-[#ffe4e6] text-black text-center py-16">
        <BlurFade delay={0.1} inView>
          <SparklesText className=" text-center font-normal tracking-[-0.01em] h-[10px] text-black dark:text-white md:text-5xl md:leading-[0.5rem] " text="Welcome to Bloom Prenatal and Therapy Yoga" />
          <p className="mt-4 text-base pl-24 pr-24 pb-1 pt-6">
            Prenatal Yoga is a special part of yogic asanas designed and dedicated for the well being of pregnant women. With a bigger belly and a new life in place, regular yoga or your workout regime might get strenuous around your joints and pelvic areas. While the lack of physical activity is not exactly a huge downside, Prenatal yoga is known to be ideal for expectant moms. A prenatal yoga class will include Breathing techniques, Gentle stretches, Postures, and Relaxation process.
          </p>
        </BlurFade>
      </header>
    
      <section className="bg-[#c3f0ca] text-black text-center flex justify-center py-10">
        <BlurFade delay={0.1} inView>
        <GradualSpacing
      className="font-display text-center font-bold tracking-[-0.1em] h-[5px] text-black dark:text-white md:text-5xl md:leading-[1rem]"
      text="Prenatal Yogasana"
    />
        </BlurFade>
      </section>
      
      <Section
        imageSrc="https://bloomprenatalyoga.in/wp-content/uploads/2021/09/WhatsApp-Image-2021-09-10-at-8.03.48-PM-768x576.jpeg"
        title="What is Prenatal Yoga?"
        description="Prenatal Yoga is a special part of yogic asanas designed and dedicated for the well being of pregnant women. With a bigger belly and a new life in place, regular yoga or your workout regime might get strenuous."
        bgColor="bg-[#d8f3dc] pl-80"
      />
      <Section
        imageSrc="https://bloomprenatalyoga.in/wp-content/uploads/2021/09/slider-2-1-768x557.png"
        title="Meet the Therapist"
        description="Hi, I’m Vaishnavi. I derive happiness from being active. And that led me to learn and practice Yoga from 2005. No sooner, the interest in learning grew into teaching and I went ahead to complete Post Graduate diploma in Yoga Therapy in 2009."
        reverse
        bgColor="bg-[#ffe4e6] pl-80"
      />
      <Section
        imageSrc="https://bloomprenatalyoga.in/wp-content/uploads/2021/09/4.jpg"
        title="Benefits of Prenatal Yoga"
        description="Practicing Prenatal Yoga helps in maintaining flexibility, reducing stress, and preparing for labor. It's a great way to stay fit and connect with your baby."
        bgColor="bg-[#d8f3dc] pl-80"
      />
      <Section
        imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGJb6TPEQ8NWSOV8PGwfrdJVd0TeoJNPBSng&s"
        title="Join Our Classes"
        description="Join our prenatal yoga classes and experience the journey of motherhood with ease and joy. Our experienced instructors guide you through every step."
        reverse
        bgColor="bg-[#ffe4e6] pl-80"
      />
    </div>
  );
}

export default ExerciseDescriptionPage;
