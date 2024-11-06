import React from 'react';
import backgroundImage from '../../assets/Sample.webp'

const Card = ({ user }) => {
  return (
    <div className="m-4 p-6 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 border-gray-200 rounded-lg shadow-md">
      <div className="relative">
        <div className="relative z-10">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
            Welcome back, Teacher {user ? user.email : ''} 
          </h2>
          <p className="mb-3 font-normal text-white">
            We are excited to have you back in the classroom!
          </p>
          <a
            href="/"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Back to Home
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;