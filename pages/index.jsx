import React from 'react';
import { ThemeProvider } from 'theme-ui';
import TagManager from 'react-gtm-module'
import { StickyProvider } from '../contexts/app/app.provider';
import theme from '../theme';
import Layout from '../components/layout';
import Banner from '../sections/banner';
import Services from '../sections/services';
import Jackpot from '../sections/jackpot';
import CallToAction from '../sections/call-to-action';
import Featured from '../sections/featured';
import Pricing from '../sections/pricing';
// import Testimonials from '../sections/testimonials';
import Blogs from '../sections/blogs';
import FAQ from '../sections/faq';
import Subscribe from '../sections/subscribe';
import QrCode from '../sections/QR_Code';
import SEO from '../components/seo';
import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../utils/pageWrappers/withLoginModal';



const IndexPage = ({AuthUserInfo, showLoginModal}) => {
  const {AuthUser = null } = AuthUserInfo

  const tagManagerArgs = {
    dataLayer: {
        userId: '001',
        userProject: 'project',
        page: 'home'
    },
    dataLayerName: 'PageDataLayer'
}

TagManager.dataLayer(tagManagerArgs);

  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout auth={AuthUser} showLoginModal={showLoginModal}>
          <SEO title='Finding Spaces' />
          <Banner />
          <Services />
          <Jackpot />
          <QrCode />
          <CallToAction />
          <Featured />
          <Pricing />
          {/* <Testimonials /> */}
          {/* <Blogs /> */}
          <FAQ />
          {/* <Subscribe /> */}
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  );
}

export default withAuthUser(withAuthUserInfo(withLoginModal(IndexPage)));