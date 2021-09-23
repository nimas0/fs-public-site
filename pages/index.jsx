import React from 'react';
import { ThemeProvider } from 'theme-ui';

import { Navbar, Button, Container } from 'react-bootstrap';
import { IoMdClose } from 'react-icons/io';
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
import gtm from '../config/gmt';


const IndexPage = ({AuthUserInfo, showLoginModal}) => {
  const {AuthUser = null } = AuthUserInfo
  const [showSignUp, setShowSignUp] = React.useState(false);
  
  React.useEffect(() => {
    gtm.push({ event: 'page_view_home' });
    setTimeout(() => {
      setShowSignUp(true);
    }, 10000)
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout auth={AuthUser} showLoginModal={showLoginModal}>
          <SEO title='Finding Spaces' />
          <Banner />
          <div id='services'>
            <Services />
            <Jackpot />
            <QrCode />
            <CallToAction />
            <Featured />
          </div>
          <Pricing />
          {/* <Testimonials /> */}
          {/* <Blogs /> */}
          <FAQ />
          <Subscribe />

          <Navbar style={{  transition: '1.5s', padding: "20px", paddingBottom: '2rem', marginLeft: 'auto', opacity: showSignUp ?'.90' : 0}} fixed='bottom' bg="dark" expand="lg">
            <Container fluid>
              <Navbar.Brand href="#home"><h6 style={{color: 'white', wordWrap: 'normal', marginTop: '.2rem' }}>Try it out. Sign up only takes 2 minutes.</h6></Navbar.Brand>

               
                
              <Button
                as='a'
                size='large'
                href='https://seller.findingspaces.com'
                type='submit'
                style={{paddingRight: '1rem', paddingLeft: '1rem'}}
              >
                Sell Your Home
              </Button>
              <IoMdClose onClick={() => setShowSignUp(false)} style={{ cursor: 'pointer' }} size='24px' color='#fff' />
            </Container>
          </Navbar>

        </Layout>
      </StickyProvider>
    </ThemeProvider>
  );
}


export default withAuthUser(withAuthUserInfo(withLoginModal(IndexPage)));