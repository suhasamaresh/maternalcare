/* This navbar needs to be fixed 
issue 1: Not responsive, not working properly on mobile devices
issue 2: Once page is scrolled, navbar should be fixed at the top
*/

"use client"
import React, { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

require("@solana/wallet-adapter-react-ui/styles.css");

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav
      className={`bg-[#faeee7] w-full z-0 top-0 shadow-md transition-transform duration-300 ease-in-out transform  ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-[#33272a] text-xl font-bold">Maternal Care</div>
        <div className="md:hidden">
          <button
            onClick={toggleNavbar}
            className="text-[#33272a] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
          className={`fixed inset-y-0 left-0 bg-[#faeee7] md:bg-transparent transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:items-center md:justify-between w-64 md:w-auto`}
        >
          <div className="flex justify-end p-4 md:hidden">
            <button
              onClick={toggleNavbar}
              className="text-[#33272a] focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col md:flex-row md:space-x-4 items-center w-full md:w-auto bg-[#faeee7] md:h-auto h-screen">
            <li>
              <a
                href="/"
                className="block py-2 px-4 text-[#594a4e] hover:text-[#33272a]"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-[#594a4e] hover:text-[#33272a]"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-[#594a4e] hover:text-[#33272a]"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-[#594a4e] hover:text-[#33272a]"
              >
                Contact
              </a>
            </li>
            
            <li>
              <a
                href="/signin"
                className="block py-2 px-4 text-[#33272a] bg-[#ff8ba7] hover:bg-[#ff718c] rounded-md"
              >
                Sign In
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
