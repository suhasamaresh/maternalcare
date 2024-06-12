import React from 'react';

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faeee7]">
      <div className="max-w-md px-8 py-6 bg-white shadow-md rounded-md w-[350px] h-[400px] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-[#33272a] mb-4">Sign Up</h2>
        <form className="w-full">
          <div className="mb-4 w-full">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#33272a] mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="mt-1 block w-full placeholder:pl-3 h-10 border border-gray-300 rounded-md shadow-sm focus:ring-[#ff8ba7] focus:border-[#ff8ba7] sm:text-sm"
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#33272a] mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Enter a valid gmail'
              className="mt-1 block w-full placeholder:pl-3 h-10 border border-gray-300 rounded-md shadow-sm focus:ring-[#ff8ba7] focus:border-[#ff8ba7] sm:text-sm"
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#33272a] mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Enter a strong password'
              className="mt-1 block w-full h-10 border placeholder:pl-3 border-gray-300 rounded-md shadow-sm focus:ring-[#ff8ba7] focus:border-[#ff8ba7] sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#ff8ba7] hover:bg-[rgb(255,113,140)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff8ba7]"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
