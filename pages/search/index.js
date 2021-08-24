import React from 'react';
import { Box, Container, ThemeProvider } from 'theme-ui';
import { StickyProvider } from '../../contexts/app/app.provider';
import theme from '../../theme';
import Layout from '../../components/layout';
import Banner from '../../sections/banner';
import Services from '../../sections/services';
import Jackpot from '../../sections/jackpot';
import CallToAction from '../../sections/call-to-action';
import Featured from '../../sections/featured';
import Pricing from '../../sections/pricing';
import Testimonials from '../../sections/testimonials';
import Blogs from '../../sections/blogs';
import FAQ from '../../sections/faq';
import Subscribe from '../../sections/subscribe';
import QrCode from '../../sections/QR_Code';
import SEO from '../../components/seo';
import withAuthUser from '../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../../utils/pageWrappers/withLoginModal';
import Search from '../../components/header/Search';

const IndexPage = ({ AuthUserInfo, showLoginModal }) => {
  const { AuthUser = null } = AuthUserInfo;

  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout auth={AuthUser} showLoginModal={showLoginModal}>
          <SEO title='Startup Landing 014' />
          <Box as='section' id='banner' sx={styles.banner}>
            <Container sx={styles.container}>
              <Search />
            </Container>
          </Box>
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  );
};

const styles = {
  banner: {
    overflow: 'hidden',
    backgroundColor: '#F9FBFD',
    textAlign: 'center',
    pt: ['110px', null, null, null, '130px'],
    h2: {
      fontSize: ['28px', null, null, '32px', '38px', '48px', '64px'],
      lineHeight: 1.25,
      color: '#02073E',
      fontWeight: 700,
      width: '100%',
      minHeight: '85vh',
      maxWidth: ['100%', null, null, '55%', '500px', '640px', '851px'],
      mx: 'auto',

      mb: ['40px', null, null, '65px'],
    },
  },
  logo: {
    display: 'block',
    borderRadius: '50%',
    mx: 'auto',
    boxShadow: '0px 15px 35px rgba(65, 104, 139, 0.12)',
  },
  button: {
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundColor: '#37A000',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 700,
    p: '6.5px 19px',
    letterSpacing: '-0.16px',
    transition: 'all 500ms ease',
    '&:hover': {
      opacity: 0.8,
    },
  },
  bannerImage: {
    display: 'block',
    mx: 'auto',
    position: 'relative',
    maxWidth: ['100%', null, null, '80%', null, '100%'],
  },
  container: {
    position: 'center',
    minHeight: '85vh',
    width: '100%',
  },

  bannerIcon7: {
    bottom: '30%',
    right: '0%',
  },
};

export default withAuthUser(withAuthUserInfo(withLoginModal(IndexPage)));
