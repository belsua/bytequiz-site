import React from 'react';

const FeaturesSection = () => {
    return (
        <section className="pb-16 pt-16" id="Features">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
                <span
                className="py-1 px-4 bg-indigo-100 rounded-full text-xs font-medium text-indigo-600 text-center"
                >
                Features
                </span>
                <h2 className="text-4xl text-center font-bold text-gray-900 py-5">
                    Introducing Gamification
                </h2>
                <p className="text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto">
                    Elevate learning through game-based experiences that make understanding computer fundamentals engaging and fun.
                </p>
            </div>
            <div
                className="flex justify-center items-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:justify-between lg:gap-x-8"
            >
                <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
                <div className="bg-indigo-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-indigo-600">
                    <svg className="stroke-indigo-600 transition-all duration-500 group-hover:stroke-white" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 12.9495C13.6353 13.5978 14.5207 14 15.5 14C16.4793 14 17.3647 13.5978 18 12.9495M13 12.9495C12.3814 12.3182 12 11.4537 12 10.5C12 8.567 13.567 7 15.5 7C15.6893 7 15.8751 7.01503 16.0562 7.04395M13 12.9495V17.5C13 17.5711 13 17.6067 13.0009 17.6276C13.0365 18.478 14.0504 18.898 14.6769 18.3219C14.6923 18.3077 14.7175 18.2825 14.7678 18.2322C14.7911 18.2089 14.8028 18.1972 14.8129 18.1877C15.1984 17.8231 15.8016 17.8231 16.1871 18.1877C16.1972 18.1972 16.2089 18.2089 16.2322 18.2322C16.2825 18.2825 16.3077 18.3077 16.3231 18.3219C16.9496 18.898 17.9635 18.478 17.9991 17.6276C18 17.6067 18 17.5711 18 17.5V12.9495M18 12.9495C18.6186 12.3182 19 11.4537 19 10.5C19 8.7563 17.7249 7.31041 16.0562 7.04395M16.0562 7.04395C16.0562 4.18622 16.0562 2.75736 15.1775 1.87868C14.2989 1 12.8846 1 10.0562 1H7C4.17157 1 2.75736 1 1.87868 1.87868C1 2.75736 1 4.17157 1 7V13C1 15.8284 1 17.2426 1.87868 18.1213C2.75736 19 4.17157 19 7 19H10" stroke="black" stroke-width="2" stroke-linecap="round" class="my-path"></path>
                            <path d="M9 7L4 7" stroke="black" stroke-width="2" stroke-linecap="round" class="my-path"></path>
                            <path d="M9 11L4 11" stroke="black" stroke-width="2" stroke-linecap="round" class="my-path"></path>
                        </svg>
                    </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize">
                    Track Progress
                </h4>
                <p className="text-sm font-normal text-gray-500">
                    View quiz results and unlock new subjects as you advance in learning.
                </p>
                </div>
                <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
                <div className="bg-pink-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-pink-600">
                    <svg className="stroke-pink-600 transition-all duration-500 group-hover:stroke-white" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9.15485C3 6.3795 3 4.99183 3.91017 4.40034C4.82035 3.80884 6.08842 4.37243 8.62455 5.4996L10.3754 6.27777C11.1755 6.63337 11.5756 6.81116 12 6.81116C12.4244 6.81116 12.8245 6.63337 13.6246 6.27777L15.3754 5.4996C17.9116 4.37243 19.1797 3.80884 20.0898 4.40034C21 4.99183 21 6.3795 21 9.15485V15.1168C21 16.5082 21 17.2039 20.6225 17.7277C20.245 18.2515 19.5849 18.4715 18.2649 18.9115L13.2649 20.5782C12.638 20.7871 12.3246 20.8916 12 20.8916C11.6754 20.8916 11.362 20.7871 10.7351 20.5782L5.73509 18.9115C4.41505 18.4715 3.75503 18.2515 3.37752 17.7277C3 17.2039 3 16.5082 3 15.1168V9.15485Z" stroke="black" stroke-width="2" class="my-path"></path>
                            <path d="M6 9L9.99967 10.5" stroke="black" stroke-width="2" stroke-linecap="round" class="my-path"></path>
                            <path d="M18.1071 9L14.1074 10.5" stroke="black" stroke-width="2" stroke-linecap="round" class="my-path"></path>
                            <path d="M6 14L9.99967 15.5" stroke="black" stroke-width="2" stroke-linecap="round" class="my-path"></path>
                            <path d="M18.1071 14L14.1074 15.5" stroke="black" stroke-width="2" stroke-linecap="round" class="my-path"></path>
                        </svg>
                    </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize">
                    Computer Fundamentals
                </h4>
                <p className="text-sm font-normal text-gray-500">
                    Learn core computer concepts through fun and interactive quizzes tailored for students.
                </p>
                </div>
                <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
                <div className="bg-teal-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-teal-600">
                    <svg className="stroke-teal-600 transition-all duration-500 group-hover:stroke-white" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z" stroke="black" stroke-width="2" stroke-linejoin="round" class="my-path"></path>
                            <path d="M10 8.5C10 9.32843 9.32843 10 8.5 10C7.67157 10 7 9.32843 7 8.5C7 7.67157 7.67157 7 8.5 7C9.32843 7 10 7.67157 10 8.5Z" stroke="black" stroke-width="2" stroke-linejoin="round" class="my-path"></path>
                            <path d="M17 8.5C17 9.32843 16.3284 10 15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7C16.3284 7 17 7.67157 17 8.5Z" stroke="black" stroke-width="2" stroke-linejoin="round" class="my-path"></path>
                            <path d="M7 13.4545C7 13.2035 7.20351 13 7.45455 13H16.5455C16.7965 13 17 13.2035 17 13.4545C17 15.9649 14.9649 18 12.4545 18H11.5455C9.03507 18 7 15.9649 7 13.4545Z" stroke="black" stroke-width="2" stroke-linejoin="round" class="my-path"></path>
                        </svg>
                    </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize">
                    Singleplay Mode
                </h4>
                <p className="text-sm font-normal text-gray-500">
                    Play solo to master quizzes and track progress in key computer topics.
                </p>
                </div>
                <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
                <div className="bg-orange-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-orange-600">
                    <svg className="stroke-orange-600 transition-all duration-500 group-hover:stroke-white" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http ://www.w3.org/2000/svg">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 20.0024V15.0024M8 20.0024C8 20.5547 8.44772 21.0024 9 21.0024H15C15.5523 21.0024 16 20.5547 16 20.0024M8 20.0024H3C2.44772 20.0024 2 19.5547 2 19.0024V15.0024C2 13.3456 3.34315 12.0024 5 12.0024C6.65685 12.0024 8 13.3456 8 15.0024M16 20.0024V15.0024M16 20.0024H21C21.5523 20.0024 22 19.5547 22 19.0024V15.0024C22 13.3456 20.6569 12.0024 19 12.0024C17.3431 12.0024 16 13.3456 16 15.0024M16 15.0024C16 13.3456 14.6569 12.0024 13 12.0024H11C9.34315 12.0024 8 13.3456 8 15.0024M15 6.00244C15 7.6593 13.6569 9.00244 12 9.00244C10.3431 9.00244 9 7.6593 9 6.00244C9 4.34559 10.3431 3.00244 12 3.00244C13.6569 3.00244 15 4.34559 15 6.00244ZM6.5 7.50244C6.5 8.33087 5.82843 9.00244 5 9.00244C4.17157 9.00244 3.5 8.33087 3.5 7.50244C3.5 6.67401 4.17157 6.00244 5 6.00244C5.82843 6.00244 6.5 6.67401 6.5 7.50244ZM20.5 7.50244C20.5 8.33087 19.8284 9.00244 19 9.00244C18.1716 9.00244 17.5 8.33087 17.5 7.50244C17.5 6.67401 18.1716 6.00244 19 6.00244C19.8284 6.00244 20.5 6.67401 20.5 7.50244Z" stroke="black" stroke-width="2" class="my-path"></path>
                        </svg>
                    </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize">
                    Multiplayer Mode
                </h4>
                <p className="text-sm font-normal text-gray-500">
                    Compete with friends in quiz battles, enhancing knowledge retention.
                </p>
                </div>
            </div>
            </div>
        </section>
    );
};

export default FeaturesSection;