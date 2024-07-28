"use client";
import Book from "@/components/book";
import Books from "@/components/books";
import { motion } from "framer-motion";
import FollowerPointerCard from "@/components/exercises";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AnimatedBeamDemo } from "@/components/AnibeamCard";

export default function Home() {
  return (
    <div className="bg-[#faeee7]">
      <div className="bg-[#faeee7] flex flex-col items-center justify-between pt-10 pb-10">
        <main className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl">
          <div className="md:w-1/2 flex flex-col items-center md:items-start mb-5 md:mb-0 text-center md:text-left">
            <header className="text-center mb-10">
              <h1 className="text-[#33272a] text-4xl font-bold">
                Welcome to Maternal Care
              </h1>
            </header>
            <p className="text-[#594a4e] text-lg mb-5">
              We provide the best maternal care services to ensure the health
              and well-being of both mother and child. Our dedicated team of
              healthcare professionals is here to support you every step of the
              way.
            </p>
            <motion.button
              className="bg-[#ff8ba7] text-[#33272a] py-2 px-6 rounded-lg text-lg font-semibold hover:bg-[#ff6b85] transition-colors"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Learn More
            </motion.button>
          </div>
          <div className="md:w-3/4 flex flex-col items-center xl:pl-[240px]">
            <AnimatedBeamDemo />
            <div className="flex flex-col items-center text-center py-5">
              <WalletMultiButton 
                style={{ 
                  margin: '0 auto', 
                  width: 'auto', 
                  maxWidth: '200px',
                  padding: '10px 20px' 
                }} 
              />
            </div>
          </div>
        </main>
      </div>
      <Book />
      <Books />
      <FollowerPointerCard />
    </div>
  );
}
