import React from 'react';
import HeroSection from './HeroSection';
import PhoneMockupSection from './PhoneMockupSection';
import FeaturesSection from './FeaturesSection';
import SingleplayShowcase from './SingleplayShowcase.jsx';
import MultiplayerShowcase from './MultiplayerShowcase.jsx';
import Questions from './Questions.jsx';
import Footer from './Footer.jsx';
import { Helmet } from 'react-helmet';

const MainContent = () => {
  return (
    <section>
    <Helmet>
      <title>Welcome to ByteQuiz - An Educational Platform for Computer Fundamentals Learning</title>
    </Helmet>
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