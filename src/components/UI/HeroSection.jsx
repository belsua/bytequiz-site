// src/components/HeroSection.jsx
import React from 'react'
import Logo from '../../assets/Logo.png'
import backgroundImage from '../../assets/Sample.webp'

const HeroSection = () => {

    const handleScroll = (elementId) => {
        const element = document.getElementById(elementId);
        element.scrollIntoView({
            behavior: 'smooth',
        });
    };

    return (
        <section
            className="relative overflow-hidden"
            id="HeroSection"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >        
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 lg:content-center relative">
                <a onClick={() => handleScroll('Features')} className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200" role="alert">
                <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">ByteQuiz is out! See what's new</span> 
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </a>
                <img src={Logo} alt="Logo" className="mb-4 mx-auto w-3/4 sm:w-2/3 lg:w-2/3 xl:w-3/4" />
                <p className="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48">ByteQuiz brings improvements on academic performance by introducing gamification to enhance engagement and supplement your knowledge on educational lessons.</p>
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700">
                        Download for Android
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                    <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center bg-white/40 backdrop-blur-sm text-white rounded-lg border border-gray-300 hover:bg-white hover:text-blue-700">
                        <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2  1z"></path></svg>
                        Watch video
                    </a>  
                </div>
                <p 
                    className="absolute bottom-4 right-4 text-xs text-white opacity-10"
                    style={{
                        zIndex: 1
                    }}
                >
                    BG by Mariana Salimena
                </p>
            </div>
        </div>
    </section>
    )
}

export default HeroSection