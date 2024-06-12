import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-pink-100 text-gray-800 py-8">
      <div className="footer-inner max-w-5xl mx-auto flex justify-between items-start flex-wrap">
        <div className="footer-section mb-4">
          <h3 className="text-xl mb-4">Regions</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-2"><a href="#" className="hover:text-gray-500">North America</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-500">Europe</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-500">Asia</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-500">Africa</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-500">South America</a></li>
          </ul>
        </div>
        <div className="footer-section mb-4">
          <h3 className="text-xl mb-4">Policies</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-2"><a href="#" className="hover:text-gray-500">Privacy Policy</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-500">Terms of Service</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-500">Refund Policy</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-500">Cookie Policy</a></li>
          </ul>
        </div>
        <div className="footer-section mb-4">
          <h3 className="text-xl mb-4">About Us</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-2"><a href="#" className="hover:text-gray-500">Company History</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-500">Our Team</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-500">Mission & Vision</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-500">Careers</a></li>
          </ul>
        </div>
        <div className="footer-section mb-4">
          <h3 className="text-xl mb-4">Contact Us</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-2"><a href="#" className="hover:text-gray-500">Email: info@example.com</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-500">Phone: +123-456-7890</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-500">Address: 123 Main Street, City</a></li>
          </ul>
        </div>
        <div className="footer-section newsletter-section w-full p-4 bg-pink-100 rounded-lg mb-4">
          <h3 className="mb-4 text-gray-800">Subscribe to our newsletter</h3>
          <p className="mb-4 text-gray-800">Stay updated on new releases and features, guides, and case studies.</p>
          <div className="flex">
            <input type="email" placeholder="Enter your email" className="p-2 rounded-lg mr-2" />
            <button className="button bg-pink-400 text-gray-800 p-2 rounded-lg hover:bg-pink-500">Subscribe</button>
          </div>
        </div>
        <div className="footer-section footer-logo w-full flex justify-center mb-4">
          <img src="https://www.shutterstock.com/image-vector/beautiful-pregnant-woman-banner-copy-260nw-2300733287.jpg" alt="Logo" className="w-24 h-auto" />
        </div>
        <div className="footer-section social-icons w-full flex justify-center p-4 rounded-lg">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" alt="Instagram" className="w-8 mx-2 cursor-pointer transform transition-transform hover:scale-110" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoiMtJG_PC4lsb3-GZAiTZkUXAm3VlkJC1Ag&s" alt="YouTube" className="w-8 mx-2 cursor-pointer transform transition-transform hover:scale-110" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553" alt="Twitter" className="w-8 mx-2 cursor-pointer transform transition-transform hover:scale-110" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s" alt="Facebook" className="w-8 mx-2 cursor-pointer transform transition-transform hover:scale-110" />
        </div>
      </div>
      <div className="copy-right mt-4 text-sm text-center bg-pink-400 text-gray-800 p-4 rounded-lg">
        &copy; 2024 Your Company Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
