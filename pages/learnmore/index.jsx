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

class ThemeFive extends Component {
   render() {
      return (
         <div className='homepage-5'>
            {/*====== Scroll To Top Area Start ======*/}
            <div id='scrollUp' title='Scroll To Top'>
               <i className='fas fa-arrow-up' />
            </div>
            {/*====== Scroll To Top Area End ======*/}
            <div className='main'>
               <Header
                  imageData={
                     'https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/logo%20idea-2-transparent.png?alt=media&token=0bc11614-2775-4c8c-8052-c897afb2b336'
                  }
               />
               <HeroSection />
               <FeatureSection />
               <DiscoverSection />
               <ServiceSection />
               <Work />
               {/* <ScreenshotSection /> */}
               <ReviewSection />
               <PricingSection />
               <FaqSection />
               <Team />
               <Download />
               <Subscribe />
               <ContactSection />
               <FooterSection />
            </div>
         </div>
      );
   }
}

export default ThemeFive;
