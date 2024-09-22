import React from 'react';
import HeroSection from './HeroSection';
import PhoneMockupSection from './PhoneMockupSection';
import FeaturesSection from './FeaturesSection';

const MainContent = () => {
  return (
    <section>
      <HeroSection />
      {/* <PhoneMockupSection /> */}
      <FeaturesSection />
    </section>
  );
};

export default MainContent;