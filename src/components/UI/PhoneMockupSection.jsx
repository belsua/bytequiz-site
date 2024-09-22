// src/components/PhoneMockupSection.jsx
import React from 'react';
import ByteQuizMockup from '../../assets/ByteQuizMockup.png';

const PhoneMockupSection = () => {
  return (
    <section className="px-4 pb-4">
        
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] max-w-[600px] max-h-[300px]">
        <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        {/* <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div> */}
        {/* <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div> */}
        <div className="rounded-[2rem] overflow-hidden max-w-[572px] max-h-[272px] bg-white dark:bg-gray-800">
          <img src={ByteQuizMockup} className="w-full h-full object-contain" alt="" />
        </div>
      </div>
    </section>
  );
};

export default PhoneMockupSection;