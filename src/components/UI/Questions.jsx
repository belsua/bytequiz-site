import React, { useState } from 'react';
import FAQ from '../../assets/FAQ.png';

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
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <img
              src={FAQ}
              alt="FAQ ByteQuiz section"
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-16">
                <h6 className="text-lg text-center font-medium text-blue-600 mb-2 lg:text-left">
                  FAQs
                </h6>
                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">
                  ByteQuiz FAQs
                </h2>
              </div>
              <div id="accordion-color" data-accordion="collapse" data-active-classes="bg-blue-100 text-blue-600">
                <h2 id="accordion-color-heading-1">
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 hover:bg-blue-100 gap-3 ${
                      activeAccordions['basic-collapse-one-with-arrow-always-open']
                        ? 'bg-blue-100 text-blue-600'
                        : ''
                    }`}
                    data-accordion-target="#accordion-color-body-1"
                    aria-expanded={activeAccordions['basic-collapse-one-with-arrow-always-open']}
                    aria-controls="accordion-color-body-1"
                    onClick={() =>
                      handleAccordion('basic-collapse-one-with-arrow-always-open')
                    }
                  >
                    <span className="text-left">How can I download the game on my device?</span>
                    <svg
                      data-accordion-icon
                      className={`w-3 h-3 rotate-180 shrink-0 ${
                        activeAccordions['basic-collapse-one-with-arrow-always-open']
                          ? 'rotate-180'
                          : 'rotate-90'
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-color-body-1"
                  className={`accordion-content overflow-hidden ${
                    activeAccordions['basic-collapse-one-with-arrow-always-open']
                      ? 'active'
                      : ''
                  }`}
                  aria-labelledby="accordion-color-heading-1"
                  style={{
                    maxHeight: activeAccordions[
                      'basic-collapse-one-with-arrow-always-open'
                    ]
                      ? '500px'
                      : '0px',
                    transition: 'max-height 0.5s ease-in-out',
                  }}
                >
                  <div className="p-5 border border-b-0 border-gray-200">
                    <p className="mb-2 text-gray-500">
                      The game is available for Android devices. To download it, simply click the "Download" button on our website or the provided download link. Make sure you have enough storage space and a stable internet connection. After downloading, install the app and you’re ready to start!
                    </p>
                  </div>
                </div>
                <h2 id="accordion-color-heading-2">
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 hover:bg-blue-100 gap-3 ${
                      activeAccordions['basic-collapse-two-with-arrow-always-open']
                        ? 'bg-blue-100 text-blue-600 '
                        : ''
                    }`}
                    data-accordion-target="#accordion-color-body-2"
                    aria-expanded={activeAccordions['basic-collapse-two-with-arrow-always-open']}
                    aria-controls="accordion-color-body-2"
                    onClick={() =>
                      handleAccordion('basic-collapse-two-with-arrow-always-open')
                    }
                  >
                    <span className="text-left">How do I start playing the game?</span>
                    <svg
                      data-accordion-icon
                      className={`w-3 h-3 rotate-180 shrink-0 ${
                        activeAccordions['basic-collapse-two-with-arrow-always-open']
                          ? 'rotate-180'
                          : 'rotate-90'
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-color-body-2"
                  className={`accordion-content overflow-hidden ${
                    activeAccordions['basic-collapse-two-with-arrow-always-open']
                      ? 'active'
                      : ''
                  }`}
                  aria-labelledby="accordion-color-heading-2"
                  style={{
                    maxHeight: activeAccordions[
                      'basic-collapse-two-with-arrow-always-open'
                    ]
                      ? '500px'
                      : '0px',
                    transition: 'max-height 0.3s ease-in-out',
                  }}
                >
                  <div className="p-5 border border-b-0 border-gray-200">
                    <p className="mb-2 text-gray-500">
                      To begin, create an in-game character by selecting your avatar and filling in basic information like your name, age, and username. Once your character is set up, you’ll start with the first unlocked topics, “History of Computer” and “Elements of Computer System.” From there, you can progress through the game as you improve your knowledge.
                    </p>
                  </div>
                </div>
                <h2 id="accordion-color-heading-3">
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 hover:bg-blue-100 gap-3 ${
                      activeAccordions['basic-collapse-three-with-arrow-always-open']
                        ? 'bg-blue-100 text-blue-600'
                        : ''
                    }`}
                    data-accordion-target="#accordion-color-body-3"
                    aria-expanded={activeAccordions['basic-collapse-three-with-arrow-always-open']}
                    aria-controls="accordion-color-body-3"
                    onClick={() =>
                      handleAccordion('basic-collapse-three-with-arrow-always-open')
                    }
                  >
                    <span className="text-left">Can my instructor track my progress in the game?</span>
                    <svg
                      data-accordion-icon
                      className={`w-3 h-3 rotate-180 shrink-0 ${
                        activeAccordions['basic-collapse-three-with-arrow-always-open']
                          ? 'rotate-180'
                          : 'rotate-90'
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-color-body-3"
                  className={`accordion-content overflow-hidden ${
                    activeAccordions['basic-collapse-three-with-arrow-always-open']
                      ? 'active'
                      : ''
                  }`}
                  aria-labelledby="accordion-color-heading-3"
                  style={{
                    maxHeight: activeAccordions[
                      'basic-collapse-three-with-arrow-always-open'
                    ]
                      ? '500px'
                      : '0px',
                    transition : 'max-height 0.3s ease-in-out',
                  }}
                >
                  <div className="p-5 border border-b-0 border-gray-200">
                    <p className="mb-2 text-gray-500">
                      Yes, your instructor can monitor your academic progress within the game. You can select one in-game character to share your quiz scores and learning data with your instructor. This data includes quiz performance, unlocked topics, and completed learning materials, which your instructor can view through their dashboard.
                    </p>
                  </div>
                </div>
                <h2 id="accordion-color-heading-4">
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-blue-200 hover:bg-blue-100 gap-3 ${
                      activeAccordions['basic-collapse-four-with-arrow-always-open']
                        ? 'bg-blue-100 text-blue-600'
                        : ''
                    }`}
                    data-accordion-target="#accordion-color-body-4"
                    aria-expanded={activeAccordions['basic-collapse-four-with-arrow-always-open']}
                    aria-controls="accordion-color-body-4"
                    onClick={() =>
                      handleAccordion('basic-collapse-four-with-arrow-always-open')
                    }
                  >
                    <span className="text-left">How can I play with my classmates?</span>
                    <svg
                      data-accordion-icon
                      className={`w-3 h-3 rotate-180 shrink-0 ${
                        activeAccordions['basic-collapse-four-with-arrow-always-open']
                          ? 'rotate-180'
                          : 'rotate-90'
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-color-body-4"
                  className={`accordion-content overflow-hidden ${
                    activeAccordions['basic-collapse-four-with-arrow-always-open']
                      ? 'active'
                      : ''
                  }`}
                  aria-labelledby="accordion-color-heading-4"
                  style={{
                    maxHeight: activeAccordions[
                      'basic-collapse-four-with-arrow-always-open'
                    ]
                      ? '500px'
                      : '0px',
                    transition: 'max-height 0.3s ease-in-out',
                  }}
                >
                  <div className="p-5 border border-t-0 border-gray-200">
                    <p className="mb-2 text-gray-500">
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