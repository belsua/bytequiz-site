import React from 'react';
import Logo from '../../assets/Logo.png'

const Footer = () => {
  const handleScroll = (elementId) => {
    const element = document.getElementById(elementId);
    element.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="rounded-lg shadow dark:bg-black/85 m-4 backdrop-blur-xl">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a onClick={handleBackToTop} className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse hover: cursor-pointer">
            <img src={Logo} className="h-8" alt="ByteQuiz Logo" />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a onClick={handleBackToTop} className="hover:underline cursor-pointer me-4 md:me-6">Back to Top</a>
            </li>
            <li>
              <a onClick={() => handleScroll('SingleplayerMode')} className="hover:underline cursor-pointer me-4 md:me-6">Singleplayer Mode</a>
            </li>
            <li>
              <a onClick={() => handleScroll('MultiplayerMode')} className="hover:underline cursor-pointer me-4 md:me-6">Multiplayer Mode</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a className="hover:underline">ByteQuiz</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;