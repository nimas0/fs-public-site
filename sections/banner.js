/* eslint-disable react/style-prop-object */
import React, { useState } from 'react';
import { Box, Container, Image, Heading, Button, IconButton } from 'theme-ui';
import { keyframes } from '@emotion/core';
import { Link as ScrollLink, scroller } from 'react-scroll';
import YouTube from 'react-youtube';
import useMediaBreakpoints from '@tywmick/use-media-breakpoints';
import { Link } from '../components/link';
import logoImage from '../public/assets/Family moving boxes no sidewalk.png';
import bannerImage from '../public/assets/banner3.png';
import bannerIcon1 from '../public/assets/home@0.5x.png';
import bannerIcon2 from '../public/assets/banner-icon-1-2.svg';
import bannerIcon3 from '../public/assets/banner-icon-1-3.svg';
import bannerIcon4 from '../public/assets/banner-icon-1-4.svg';
import bannerIcon5 from '../public/assets/banner-icon-1-5.svg';
import bannerIcon6 from '../public/assets/banner-icon-1-6.svg';
import bannerIcon7 from '../public/assets/dot-pattern.svg';

const Banner = () => {
  const [showImage, setShowImage] = useState(false);
  const breakpoints = useMediaBreakpoints();
  const handleEnding = () => {
    setShowImage(true);
    scroller.scrollTo('scrollalittle', {
      duration: 1500,
      delay: 100,
      smooth: true,
      // containerId: 'scrollalittle',
      offset: 50, // Scrolls to element + 50 pixels down the page
    });
  };

  return (
    <Box as='section' id='banner' sx={styles.banner}>
      {/* <Container sx={styles.container}> */}
      {/*  
        
        
        
        
        <Image
          sx={styles.bannerIcon1}
          className='bannerIcon'
          alt='banner icon'
          src={bannerIcon1}
        />
        <Image
          sx={styles.bannerIcon2}
          className='bannerIcon'
          alt='banner icon'
          src={bannerIcon2}
        />
        <Image
          sx={styles.bannerIcon3}
          className='bannerIcon'
          alt='banner icon'
          src={bannerIcon3}
        />
        <Image
          sx={styles.bannerIcon4}
          className='bannerIcon'
          alt='banner icon'
          src={bannerIcon4}
        />
        <Image
          sx={styles.bannerIcon5}
          className='bannerIcon'
          alt='banner icon'
          src={bannerIcon5}
        />
        <Image
          sx={styles.bannerIcon6}
          className='bannerIcon'
          alt='banner icon'
          src={bannerIcon6}
        />
        <Image
          sx={styles.bannerIcon7}
          className='bannerIcon'
          alt='banner icon'
          src={bannerIcon7}
        /> */}

      {/* <Image src={logoImage} alt='logo image' /> */}

      <Heading as='h2'>
        <>
          Coming Soon.
          {/* <span style={{ color: '#589938' }}> Yourself</span> */}
          <h4> asdfasdf</h4>
        </>
      </Heading>

      <h3>A Peer to Peer Decentralized Marketplace for Real Estate</h3>
      {/* </Container> */}
      {/* <YouTube
        // autoPlay={false}
        videoId='2prAwVk_RI0'
        onEnd={handleEnding}
        opts={{
          height: breakpoints.xs ? 210 : 480,
          width: breakpoints.xs ? '100%' : '73%',
          playerVars: {
            autoplay: 0,
          },
        }}
      /> */}
    </Box>
  );
};

export default Banner;

const bannerAnim1 = keyframes`
    0% {
        transform: rotate3d(0, 1, 0, 0deg);
    }

    30% {
        transform: rotate3d(0, 0, 1, 5deg);
    }

    60% {
        transform: rotate3d(1, 0, 0, 0deg);
    }

    80% {
        transform: rotate3d(0, 0, 1, 5deg);
    }

    100% {
        transform: rotate3d(0, 1, 0, 0deg);
    }
`;

const bannerAnim2 = keyframes`
    0% {
        transform: translateY(0px) translateX(0) rotate(0);
    }

    30% {
        transform: translateY(30px) translateX(30px) rotate(15deg);
        transform-origin: center center;
    }

    50% {
        transform: translateY(50px) translateX(50px) rotate(45deg);
        transform-origin: right bottom;
    }

    80% {
        transform: translateY(30px) translateX(30px) rotate(15deg);
        transform-origin: left top;
    }

    100% {
        transform: translateY(0px) translateX(0) rotate(0);
        transform-origin: center center;
    }
`;

const bannerAnim3 = keyframes`
    0%,
    100% {
        transform: perspective(400px) translateY(0) rotate(0deg) translateZ(0px) translateX(0);
    }

    50% {
        transform: perspective(400px) rotate(-45deg) translateZ(20px) translateY(20px) translateX(20px);
    }
`;

const styles = {
  banner: {
    overflow: 'hidden',
    height: ['700px', '700px', '900px', '800px', '800px', '940px'],
    backgroundColor: '#F9F9F9',
    backgroundImage: `url(${bannerImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: [
      '80% 95%',
      '80% 95%',
      '75% 100%',
      '90% 85%',
      'bottom',
      'bottom',
    ],
    backgroundSize: ['375%', '300%', '300%', '200%', '150%', '100%'],
    textAlign: 'center',
    pt: ['30px', null, null, null, '110px'],
    h2: {
      fontSize: ['34px', null, null, '32px', '38px', '48px', '64px'],
      lineHeight: 1.25,
      color: '#2b3b38',
      fontWeight: 700,
      width: '100%',
      maxWidth: ['100%', '100%', '100%', '55%', '500px', '640px', '851px'],
      mx: 'auto',
      mt: '30px',
      mb: ['20px', '20px', '20px', '5px'],
    },
    h3: {
      marginRight: '1rem',
      // fontSize: 35,
      fontSize: ['24px', null, null, '34px', '34px', '34px', '34px'],
      color: '#2b3b38',
      // fontWeight: 700,
      display: ['block', 'block', 'inline', null, 'inline'],
      textAlign: ['left', 'left', null, null],
      ml: ['3.5rem', '3.5rem', 0, 0, 0],
    },
    h4: {
      opacity: 0,
      display: ['block'],
      fontSize: ['24px', '14px'],

      p: 0,
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
    maxWidth: ['100%', null, null, '100%', null, '100%'],
  },
  container: {
    position: 'relative',
    '.bannerIcon': {
      position: 'absolute',
      display: ['none', null, null, null, 'block'],
    },
  },
  bannerIcon1: {
    top: '10%',
    left: '10%',
    animation: `${bannerAnim2} 8s linear infinite`,
  },
  bannerIcon2: {
    top: '10%',
    right: '10%',
    animation: `${bannerAnim2} 8s linear infinite`,
  },
  bannerIcon3: {
    bottom: '40px',
    right: '-120px',
    animation: `${bannerAnim1} 5s ease-out infinite`,
  },
  bannerIcon4: {
    bottom: '130px',
    left: '-120px',
    animation: `${bannerAnim1} 5s ease-out infinite`,
  },
  bannerIcon5: {
    bottom: '50%',
    left: '15%',
  },
  bannerIcon6: {
    bottom: '-65px',
    left: '0px',
    animation: `${bannerAnim3} 9s linear infinite`,
  },
  bannerIcon7: {
    bottom: '30%',
    right: '0%',
  },
  overlay: {
    position: 'relative',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '60%',
    left: '45%',
    zIndex: 1000,
    width: 100,
  },

  playText: {
    border: 0,
    background: 'transparent',
    padding: 0,
    width: '3',
    position: 'absolute',
    top: '68%',
    left: '47%',
    zIndex: 1001,
    height: '25px',

    borderColor: 'transparent transparent transparent #37a000',
    transition: '100ms all ease',
    cursor: 'pointer',

    '&:hover': {
      borderColor: 'transparent transparent transparent #267000',
      backgroundColor: 'transparent',
    },
  },
  spacer: {
    opacity: 0,
    color: 'white',
  },
};
