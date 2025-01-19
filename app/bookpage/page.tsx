"use client";
import React, { useState } from "react";
import FlipText from "@/components/magicui/flip-text";
import { FadeText } from "@/components/magicui/fade-text";

const HomePage = () => {
  const [showAll, setShowAll] = useState(false);

  const books = [
    {
      title: "Birthing Naturally, Guidelines for childbirth",
      author: "Dr Mahima Bakshi",
      img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQIBs4KQfegZCe7mYZpSox32BlzzLsoLT2GNXrfzjpcpA71XCvD_iBo5D7G-5fwhS4FF-JKYDzM49J55593xeljpWi40yZ24yZ5sHJaHMZx&usqp=CAE",
      link: "https://www.amazon.in/Birthing-Naturally-Mahima-Bakshi-ebook/dp/B07CVK1Y6M",
    },
    {
      title: "Mayo Clinic Guide to a Healthy Pregnancy, 2nd Edition",
      author: "Dr. Myra J. Wick M.D. Ph.D.",
      img: "https://m.media-amazon.com/images/I/712Af-xENML._AC_UY218_.jpg",
      link: "https://www.amazon.com/Mayo-Clinic-Guide-Healthy-Pregnancy/dp/1893005607",
    },
    {
      title: "Belly to Baby, A Pregnancy Memory Book",
      author: "Dipti Vora",
      img: "https://images-eu.ssl-images-amazon.com/images/I/71KM8qTSbUL._AC_UL165_SR165,165_.jpg",
      link: "https://www.amazon.in/Pregnancy-Memories-Keepsake-Journal-Scrapbook/dp/B07BVXCK35",
    },
    {
      title: "Little Miracle: 40 Weeks Pregnancy Journal",
      author: "Rahil Mansuri",
      img: "https://m.media-amazon.com/images/I/71edoVR5DgL._SY425_.jpg",
      link: "https://www.amazon.in/Little-Miracle-Pregnancy-Milestones-Trimester/dp/B0CBSPSCY7",
    },
    {
      title: "Bump to Baby Pregnancy Memory Record Book",
      author: "Almas Z. Mansuri",
      img: "https://m.media-amazon.com/images/I/71FeAaBx6qL._SY425_.jpg",
      link: "https://www.amazon.in/Bump-Baby-Pregnancy-Milestone-Expecting/dp/B0D31R5CXL",
    },
    {
      title: "What to Expect When You're Expecting",
      author: "Heidi Murkoff",
      img: "https://m.media-amazon.com/images/I/810TiaIe4jL._AC_UY218_.jpg",
      link: "https://www.amazon.com/What-Expect-When-Youre-Expecting/dp/0761187480",
    },
    {
      title: "Beginning of Motherhood Garbh Sanskar",
      author: "Dr. Rohit Dhingra",
      img: "https://m.media-amazon.com/images/I/81DYiQ3CwtL._AC_UY218_.jpg",
      link: "https://www.amazon.in/Pregnancy-Post-Delivery-Beginning-Motherhood-GarbhSanskar/dp/B0BQWSZSZQ",
    },
    {
      title: "Kareena Kapoor Khan's pregnancy bible",
      author: "Kareena Kapoor, Aditi Shah Bhimjyani",
      img: "https://m.media-amazon.com/images/I/713CG+JQx9L._AC_UY218_.jpg",
      link: "https://www.amazon.in/KAREENA-KAPOOR-KHANS-PREGNANCY-BIBLE/dp/939116577X",
    },
    {
      title: "Nine Months - The Journey of a lifetime",
      author: "Aruna Muralidhar",
      img: "https://m.media-amazon.com/images/I/61kD5hSGkzL._AC_UY218_.jpg",
      link: "https://www.amazon.in/Nine-Months-lifetime-Aruna-Muralidhar/dp/8196322402",
    },
    {
      title: "My Pregnancy Jounel, Pregnancy Planner Set",
      author: "Alicia Souza",
      img: "https://m.media-amazon.com/images/I/61zPmfCPirL._SX569_.jpg",
      link: "https://www.amazon.in/Alicia-Souza-Pregnancy-Milestone-Maternity/dp/B097L9HMYP",
    },
  ];

  return (
    <div className="bg-[#faeee7] min-h-screen">
      

      {/* Title Section */}
      <div className="text-center">
        <h2 className="bg-[#c3f0ca] w-full text-4xl font-medium text-[#33272a] p-1">
          <FlipText
            className="text-2xl font-medium tracking-[-0.2em] text-black dark:text-white md:text-4xl md:leading-[4rem]"
            word="Latest New Release Books"
          />
        </h2>
        <p className="text-lg text-[#33272a] p-1 pt-16 px-20">
        <FadeText
          className="text-1xl font-normal text-black dark:text-white"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.1 } },
          }}
          text="Maternal care is a cornerstone of family health and well-being. Explore these insightful books to deepen your understanding and prepare for the journey of motherhood:"
        />
    </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 pl-28 pt-5 lg:grid-cols-5 gap-4 p-4">
        {books.slice(0, showAll ? books.length : 5).map((book, index) => (
          <div key={index} className="max-w-xs mb-4 group">
            <a href={book.link} target="_blank" rel="noopener noreferrer">
              <img
                src={book.img}
                alt={book.title}
                className="h-80 w-72 object-cover rounded-lg shadow-md transform group-hover:scale-105 transition-transform duration-300"
              />
            </a>
            <h3 className="text-lg text-[#33272a] mt-4">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center space-x-4 p-10">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-[#ff8ba7] text-[#33272a] py-2 px-4 rounded shadow-md transform transition-transform duration-300 hover:scale-105"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
