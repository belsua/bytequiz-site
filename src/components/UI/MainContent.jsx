import React from 'react';
import HeroSection from './HeroSection';
import PhoneMockupSection from './PhoneMockupSection';
import FeaturesSection from './FeaturesSection';
import SingleplayShowcase from './SingleplayShowcase.jsx';
import MultiplayerShowcase from './MultiplayerShowcase.jsx';
import Questions from './Questions.jsx';
import Footer from './Footer.jsx';

const MainContent = () => {
  return (
    <section>
      <HeroSection/>
      {/* <PhoneMockupSection /> */}
      <FeaturesSection/>
      <SingleplayShowcase/>
      <MultiplayerShowcase/>
      <Questions/>
      <Footer />
    </section>
  );
};

export default MainContent;