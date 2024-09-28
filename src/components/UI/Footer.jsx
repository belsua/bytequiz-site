import React from 'react';
import Logo from '../../assets/Logo.png'

const Footer = () => {
  return (
    <footer className="rounded-lg shadow dark:bg-black/85 m-4 backdrop-blur-xl">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={ Logo } className="h-8" alt="Flowbite Logo" />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a onClick={() => window.scrollTo(0, 0)} className="hover:underline me-4 md:me-6">Back to Top</a>
            </li>
            <li>
              <a href="#SingleplayerMode" className="hover:underline me-4 md:me-6">Singleplayer Mode</a>
            </li>
            <li>
              <a href="#MultiplayerMode" className="hover:underline me-4 md:me-6">Multiplayer Mode</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a href="https://flowbite.com/" className="hover:underline">ByteQuiz</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;