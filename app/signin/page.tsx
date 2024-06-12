import React from 'react';
import Link from 'next/link';

const SignInPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faeee7]">
      <div className="px-8 py-6 bg-white shadow-md rounded-md w-[350px] h-[400px] items-center">
        <h2 className="text-2xl font-bold text-[#33272a] mb-4">Sign In</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#33272a]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Enter a valid gmail'
              className="mt-1 block w-full placeholder:pl-3 border-gray-300 rounded-md shadow-sm focus:ring-[#ff8ba7] focus:border-[#ff8ba7] sm:text-sm h-12  hover:text-[#faeee7] transition duration-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#33272a]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Enter valid password'
              className="mt-1 block w-full placeholder:pl-3 border-gray-300 rounded-md shadow-sm focus:ring-[#ff8ba7] focus:border-[#ff8ba7] sm:text-sm h-12  hover:text-[#faeee7] transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#ff8ba7] hover:bg-[rgb(255,113,140)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff8ba7]"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="text-[#ff8ba7] hover:text-[#ff8ba7] hover:bg-[rgb(255,113,140)]">
                Sign Up
            </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
