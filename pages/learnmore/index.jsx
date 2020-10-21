import React, { Component } from 'react';

import Header from '../../components/public/HeaderSection/Header';
import HeroSection from '../../components/public/HeroSection/HeroFive';
import FeatureSection from '../../components/public/Features/FeatureFive';
import ServiceSection from '../../components/public/ServiceSection/ServiceFive';
import DiscoverSection from '../../components/public/DiscoverSection/DiscoverFive';
import Work from '../../components/public/WorkSection/Work';
import ScreenshotSection from '../../components/public/ScreenshotSection/ScreenshotsTwo';
import ReviewSection from '../../components/public/ReviewSection/ReviewTwo';
import PricingSection from '../../components/public/PricingSection/PricingOne';
import FaqSection from '../../components/public/FaqSection/FaqOne';
import Download from '../../components/public/DownloadSection/Download';
import Subscribe from '../../components/public/SubscribeSection/Subscribe';
import Team from '../../components/public/TeamSection/Team';
import ContactSection from '../../components/public/ContactSection/Contact';
import FooterSection from '../../components/public/FooterSection/Footer';
import HomeLayout from '../../components/layout/HomeLayout';
import withAuthUser from '../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../../utils/pageWrappers/withLoginModal';
import Nav from '../../components/Nav';
const ThemeFive = ({ AuthUserInfo, showLoginModal }) => {
   const { AuthUser = null } = AuthUserInfo;

   return (
      <div className='homepage-5'>
         {/*====== Scroll To Top Area Start ======*/}
         <div id='scrollUp' title='Scroll To Top'>
            <i className='fas fa-arrow-up' />
         </div>
         {/*====== Scroll To Top Area End ======*/}
         <div className='main'>
            <Nav
               
            />
            <HeroSection />
            <FeatureSection />
            <ReviewSection />
            <DiscoverSection />
            <FaqSection />
            <Work />
            {/* <FooterSection /> */}
         </div>
      </div>
   );
};

export default withAuthUser(ThemeFive);
