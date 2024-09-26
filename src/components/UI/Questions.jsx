import React, { useState } from 'react';
import FAQ from '../../assets/FAQ.png'

const Questions = () => {
  const [activeAccordions, setActiveAccordions] = useState({
    'basic-collapse-one-with-arrow-always-open': false,
    'basic-collapse-two-with-arrow-always-open': false,
    'basic-collapse-three-with-arrow-always-open': false,
    'basic-collapse-four-with-arrow-always-open': false,
  });

  const handleAccordion = (accordionId) => {
    setActiveAccordions((prevAccordions) => ({
      ...prevAccordions,
      [accordionId]: !prevAccordions[accordionId],
    }));
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <img
              src={ FAQ }
              alt="FAQ ByteQuiz section"
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-16">
                <h6 className="text-lg text-center font-medium text-indigo-600 mb-2 lg:text-left">
                  FAQs
                </h6>
                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">
                  ByteQuiz FAQs
                </h2>
              </div>
              <div className="accordion-group" data-accordion="default-accordion">
                <div
                  className={`accordion py-8 border-b border-solid border-gray-200 ${
                    activeAccordions['basic-collapse-one-with-arrow-always-open']
                      ? 'active'
                      : ''
                  }`}
                  id="basic-heading-one-with-arrow-always-open"
                >
                  <button
                    className={`accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600 ${
                      activeAccordions['basic-collapse-one-with-arrow-always-open']
                        ? 'accordion-active:text-indigo-600 accordion-active:font-medium'
                        : ''
                    }`}
                    aria-controls="basic-collapse-one-with-arrow-always-open"
                    onClick={() =>
                      handleAccordion('basic-collapse-one-with-arrow-always-open')
                    }
                  >
                    <h5 className='text-left'>How can I download the game on my device?</h5>
                    <svg
                      className={`text-gray-900 transition duration-500 group-hover:text-indigo-600 ${
                        activeAccordions['basic-collapse-one-with-arrow-always-open']
                          ? 'accordion-active:text-indigo-600 accordion-active:rotate-180'
                          : ''
                      }`}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="basic-collapse-one-with-arrow-always-open"
                    className={`accordion-content w-full px-0 overflow-hidden pr-4 ${
                      activeAccordions['basic-collapse-one-with-arrow-always-open']
                        ? 'active'
                        : ''
                    }`}
                    aria-labelledby="basic-heading-one-with-arrow-always-open"
                    style={{
                      maxHeight: activeAccordions[
                        'basic-collapse-one-with-arrow-always-open'
                      ]
                        ? '100px'
                        : '0px',
                      transition: 'max-height 0.3s ease-in-out',
                    }}
                  >
                    <p className="text-base font-normal text-gray-600">
                    The game is available for Android devices. To download it, simply click the "Download" button on our website or the provided download link. Make sure you have enough storage space and a stable internet connection. After downloading, install the app and you’re ready to start!
                    </p>
                  </div>
                </div>
                <div
                  className={`accordion py-8 border-b border-solid border-gray-200 ${
                    activeAccordions['basic-collapse-two-with-arrow-always-open']
                      ? 'active'
                      : ''
                  }`}
                  id="basic-heading-two-with-arrow-always-open"
                >
                  <button
                    className={`accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600 ${
                      activeAccordions['basic-collapse-two-with-arrow-always-open']
                        ? 'accordion-active:text-indigo-600 accordion-active:font-medium'
                        : ''
                    }`}
                    aria-controls="basic-collapse-two-with-arrow-always-open"
                    onClick={() =>
                      handleAccordion('basic-collapse-two-with-arrow-always-open')
                    }
                  >
                    <h5 className='text-left'>How do I start playing the game?</h5>
                    <svg
                      className={`text-gray-900 transition duration-500 group-hover:text-indigo-600 ${
                        activeAccordions['basic-collapse-two-with-arrow-always-open']
                          ? 'accordion-active:text-indigo-600 accordion-active:rotate-180'
                          : ''
                      }`}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="basic-collapse-two-with-arrow-always-open"
                    className={`accordion-content w-full px-0 overflow-hidden pr-4 ${
                      activeAccordions['basic-collapse-two-with-arrow-always-open']
                        ? 'active'
                        : ''
                    }`}
                    aria-labelledby="basic-heading-two-with-arrow-always-open"
                    style={{
                      maxHeight: activeAccordions[
                        'basic-collapse-two-with-arrow-always-open'
                      ]
                        ? '100px'
                        : '0px',
                      transition: 'max-height 0.3s ease-in-out',
                    }}
                  >
                    <p className="text-base text-gray-500 font-normal">
                    To begin, create an in-game character by selecting your avatar and filling in basic information like your name, age, and username. Once your character is set up, you’ll start with the first unlocked topics, “History of Computer” and “Elements of Computer System.” From there, you can progress through the game as you improve your knowledge.
                    </p>
                  </div>
                </div>
                <div
                  className={`accordion py-8 border-b border-solid border-gray-200 ${
                    activeAccordions['basic-collapse-three-with-arrow-always-open']
                      ? 'active'
                      : ''
                  }`}
                  id="basic-heading-three-with-arrow-always-open"
                >
                  <button
                    className={`accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600 ${
                      activeAccordions['basic-collapse-three-with-arrow-always-open']
                        ? 'accordion-active:text-indigo-600 accordion-active:font-medium'
                        : ''
                    }`}
                    aria-controls="basic-collapse-three-with-arrow-always-open"
                    onClick={() =>
                      handleAccordion('basic-collapse-three-with-arrow-always-open')
                    }
                  >
                    <h5 className='text-left'>Can my instructor track my progress in the game?</h5>
                    <svg
                      className={`text-gray-900 transition duration-500 group-hover:text-indigo-600 ${
                        activeAccordions['basic-collapse-three-with-arrow-always-open']
                          ? 'accordion-active:text-indigo-600 accordion-active:rotate-180'
                          : ''
                      }`}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                        stroke ="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="basic-collapse-three-with-arrow-always-open"
                    className={`accordion-content w-full px-0 overflow-hidden pr-4 ${
                      activeAccordions['basic-collapse-three-with-arrow-always-open']
                        ? 'active'
                        : ''
                    }`}
                    aria-labelledby="basic-heading-three-with-arrow-always-open"
                    style={{
                      maxHeight: activeAccordions[
                        'basic-collapse-three-with-arrow-always-open'
                      ]
                        ? '100px'
                        : '0px',
                      transition: 'max-height 0.3s ease-in-out',
                    }}
                  >
                    <p className="text-base text-gray-500 font-normal">
                    Yes, your instructor can monitor your academic progress within the game. You can select one in-game character to share your quiz scores and learning data with your instructor. This data includes quiz performance, unlocked topics, and completed learning materials, which your instructor can view through their dashboard.
                    </p>
                  </div>
                </div>
                <div
                  className={`accordion py-8 ${
                    activeAccordions['basic-collapse-four-with-arrow-always-open']
                      ? 'active'
                      : ''
                  }`}
                  id="basic-heading-four-with-arrow-always-open"
                >
                  <button
                    className={`accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600 ${
                      activeAccordions['basic-collapse-four-with-arrow-always-open']
                        ? 'accordion-active:text-indigo-600 accordion-active:font-medium'
                        : ''
                    }`}
                    aria-controls="basic-collapse-four-with-arrow-always-open"
                    onClick={() =>
                      handleAccordion('basic-collapse-four-with-arrow-always-open')
                    }
                  >
                    <h5 className='text-left'>How can I play with my classmates?</h5>
                    <svg
                      className={`text-gray-900 transition duration-500 group-hover:text-indigo-600 ${
                        activeAccordions['basic-collapse-four-with-arrow-always-open']
                          ? 'accordion-active:text-indigo-600 accordion-active:rotate-180'
                          : ''
                      }`}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="basic-collapse-four-with-arrow-always-open"
                    className={`accordion-content w-full px-0 overflow-hidden pr-4 ${
                      activeAccordions['basic-collapse-four-with-arrow-always-open']
                        ? 'active'
                        : ''
                    }`}
                    aria-labelledby="basic-heading-four-with-arrow-always-open"
                    style={{
                      maxHeight: activeAccordions[
                        'basic-collapse-four-with-arrow-always-open'
                      ]
                        ? '100px'
                        : '0px',
                      transition: 'max-height 0.3s ease-in-out',
                    }}
                  >
                    <p className="text-base text-gray-500 font-normal">
                    To play with others, use the Multiplayer mode. You can either host a game or join an existing room. Once in a room, you can compete in quiz-based game modes like "Runner," "Trivia Showdown," or "Territory Conquest." A stable internet connection is required for multiplayer gameplay.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;