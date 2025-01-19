"use client";
import React, { useState } from 'react';
import './HomePage.css'; // Import the CSS file for animations
import FlipText from "@/components/magicui/flip-text";
import { FadeText } from "@/components/magicui/fade-text";

const HomePage = () => {
  const [showAll, setShowAll] = useState(false);
 

  const books = [
    {
      title: "Birthing Naturally, Guidelines for childbirth",
      author: "Dr Mahima Bakshi",
      img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQIBs4KQfegZCe7mYZpSox32BlzzLsoLT2GNXrfzjpcpA71XCvD_iBo5D7G-5fwhS4FF-JKYDzM49J55593xeljpWi40yZ24yZ5sHJaHMZx&usqp=CAE",
    },
    {
      title: "The Shadow Work Journal (Paperback)",
      author: "Dr. Myra J. Wick M.D. Ph.D.",
      img: "https://m.media-amazon.com/images/I/712Af-xENML._AC_UY218_.jpg",
    },

    {
      title: "Belly to Baby, A Pregnancy Memory Book",
      author: "Dipti Vora",
      img: "https://images-eu.ssl-images-amazon.com/images/I/71KM8qTSbUL._AC_UL165_SR165,165_.jpg",
    },
    {
      title: "Little Miracle: 40 Weeks Pregnancy Journal",
      author: " Rahil Mansuri ",
      img: "https://m.media-amazon.com/images/I/71edoVR5DgL._SY425_.jpg",
    },
    {
      title: "Bump to Baby Pregnancy Memory Record Book",
      author: " Almas Z. Mansuri",
      img: "https://m.media-amazon.com/images/I/71FeAaBx6qL._SY425_.jpg",
    },
    {
      title: "The Shadow Work Journal (Paperback)",
      author: "Heidi Murkoff",
      img: "https://m.media-amazon.com/images/I/810TiaIe4jL._AC_UY218_.jpg",
    },
    {
      title: "Beginning of Motherhood Garbh Sanskar",
      author: "Dr. Rohit Dhingra ",
      img: "https://m.media-amazon.com/images/I/81DYiQ3CwtL._AC_UY218_.jpg",
    },
    {
      title: "Kareena Kapoor Khan's pregnancy bible",
      author: "Kareena Kapoor, Aditi Shah Bhimjyani",
      img: "https://m.media-amazon.com/images/I/713CG+JQx9L._AC_UY218_.jpg",
    },
    
    {
      title: "The Shadow Work Journal (Paperback)",
      author: "The Happy Hippo",
      img: "https://m.media-amazon.com/images/I/61kD5hSGkzL._AC_UY218_.jpg",
    },
    {
      title: "My Pregnancy Jounel, Pregnancy Planner Set",
      author: "Alicia Souza",
      img: "https://m.media-amazon.com/images/I/61zPmfCPirL._SX569_.jpg",
    },

  ];

  

  return (
    <div className="bg-[#faeee7] min-h-screen">

      <div className="bg-[#ffc6c7] flex justify-between items-center p-4 h-20">
        <div className="flex items-center space-x-20 pl-8">
          <button className="text-[#33272a]">All Category</button>
          <button className="text-[#33272a]">Bestseller Books</button>
          <button className="text-[#33272a]">Fiction Books</button>
          <button className="text-[#33272a]">Romance</button>
          <button className="text-[#33272a]">Manga Books</button>
          <button className="text-[#33272a]">Trading Books</button>
          <button className="text-[#33272a]">Self-help</button>
          <button className="text-[#33272a]">All Books</button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 pl-28 pt-8 justify-between">
        {/* Search bar with icon */}
        <div className="relative w-1/2">
          <input type="text" placeholder="Search" className="p-2 pl-10 rounded w-1/2" />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <div className="flex space-x-4">
          {/* Wishlist button with icon */}
          <button className="text-[#33272a] flex items-center">
            <i className="fas fa-heart mr-2"></i> Read list
          </button>
          {/* Cart button with icon */}
          <button className="text-[#33272a] flex items-center pr-8">
            <i className="fas fa-shopping-cart mr-2"></i> Cart
          </button>
        </div>
      </div>

      <div className="text-center pt-16">
        <h2 className="bg-[#c3f0ca] w-full text-4xl font-medium text-[#33272a] p-1"><FlipText
      className=" text-2xl font-medium tracking-[-0.2em] text-black dark:text-white md:text-4xl md:leading-[4rem]"
      word="Latest New Release Books"
    /></h2>
        <p className="text-lg text-[#33272a] p-1 pt-16 pl-20 pr-20">
        <FadeText
        className="text-1xl font-normal text-black dark:text-white"
        direction="up"
        framerProps={{
          show: { transition: { delay: 0.1 } },
        }}
        text="Ever lusted over a book but had to control yourself because it was too expensive?
          Worry not! Because 99bookstore is here to answer all your literary prayers. Knowledge is priceless but the books come with a bill and the 99bookstore is committed to bring to you the best of the brilliant from the world of written text, at prices which are literally a steal."
      />
          
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 pl-28 pt-5 lg:grid-cols-5 gap-4 p-4">
        {books.slice(0, showAll ? books.length : 5).map((book, index) => (
          <div key={index} className="max-w-xs mb-4 book-card">
           <div className="book-inner">
           <div className="book-front">
                <img src={book.img} alt={book.title} className="h-80 pt-20 w-72 object-cover" />
            </div>  
              <div className="book-back">
                {/* Add any additional info on the back side */}
              </div>
            </div>
            <h3 className="text-lg text-[#33272a]">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <button className="mt-2 bg-[#ffc6c7] text-[#33272a] py-2 px-4 rounded flex items-center text-lg transform transition-transform duration-300 hover:scale-105 hover:bg-[#ffa9ab]">
                  <i className="fas fa-book-open mr-1"></i> Add to Read List
                </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4 p-10">
        <button onClick={() => setShowAll(!showAll)} className="bg-[#ff8ba7] text-[#33272a] py-2 px-4 rounded">
          {showAll ? 'Show Less' : 'View All'}
        </button>
      </div>
    </div>
  );
};

export default HomePage;

   