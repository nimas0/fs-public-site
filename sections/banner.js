/* eslint-disable react/style-prop-object */
import React, { useState } from 'react';
import { Box, Container, Image, Heading, Button, IconButton } from 'theme-ui';
import { keyframes } from '@emotion/core';
import { Link as ScrollLink, scroller } from 'react-scroll';
import YouTube from 'react-youtube';
import { Link } from '../components/link';
import logoImage from '../public/assets/Family moving boxes no sidewalk.png';
import bannerImage from '../public/assets/banner-mockup.png';
import bannerIcon1 from '../public/assets/home@0.5x.png';
import bannerIcon2 from '../public/assets/banner-icon-1-2.svg';
import bannerIcon3 from '../public/assets/banner-icon-1-3.svg';
import bannerIcon4 from '../public/assets/banner-icon-1-4.svg';
import bannerIcon5 from '../public/assets/banner-icon-1-5.svg';
import bannerIcon6 from '../public/assets/banner-icon-1-6.svg';
import bannerIcon7 from '../public/assets/dot-pattern.svg';

const Banner = () => {
  const [showImage, setShowImage] = useState(false);

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
      <Container sx={styles.container}>
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
        />

        {/* <Image src={logoImage} alt='logo image' /> */}

        <Heading as='h2'>
          Sell Your Home For Sale By Owner. It’s Commission Free
        </Heading>
        {showImage ? (
          <div className='scrollalittle' sx={styles.overlay}>
            <IconButton
              sx={styles.playButton}
              onClick={() => setShowImage(false)}
              aria-label='Toggle dark mode'
            >
              <svg
                version='1.1'
                id='Layer_1'
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                viewBox='0 0 512 512'
                width={100}
                height={100}
                style={{
                  enableBackground: 'new 0 0 512 512',
                }}
                xmlSpace='preserve'
              >
                <circle
                  style={{ fill: '#366796', boxShadow: '5px 10px #888888' }}
                  cx='256'
                  cy='256'
                  r='256'
                />
                <path
                  style={{ fill: '#273B7A' }}
                  d='M166.041,375.282l133.082,133.082c86.643-14.7,158.465-72.923,192.183-151.4L378.649,244.307
	L166.041,375.282z'
                />
                <path
                  style={{ fill: '#FDE085' }}
                  d='M189.745,133.454l183.025,105.67c12.991,7.501,12.991,26.252,0,33.751l-183.025,105.67
	c-12.991,7.501-29.229-1.876-29.229-16.875V150.331C160.516,135.33,176.755,125.954,189.745,133.454z'
                />
                <path
                  style={{ fill: '#FFC91B' }}
                  d='M160.516,256.862V361.67c0,15.001,16.239,24.376,29.229,16.875l183.025-105.67
	c6.211-3.586,9.418-9.743,9.69-16.013H160.516z'
                />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
              </svg>
            </IconButton>

            {/* <Heading as='h6' sx={styles.playText}>
              {' '}
              Replay
            </Heading> */}

            <Image src={bannerImage} sx={styles.bannerImage} alt='banner moc' />
          </div>
        ) : (
          <div>
            <YouTube
              videoId='2prAwVk_RI0'
              onEnd={handleEnding}
              opts={{
                height: '480',
                width: '70%',
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
            {/* <YoutubePlayer
            autoPlay
            src='https://youtu.be/2prAwVk_RI0' // Reqiured
            width='100%'
            height={700}
          /> */}
          </div>
        )}
      </Container>
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
    backgroundColor: '#F9FBFD',
    textAlign: 'center',
    pt: ['110px', null, null, null, '130px'],
    h2: {
      fontSize: ['28px', null, null, '32px', '38px', '48px', '64px'],
      lineHeight: 1.25,
      color: '#02073E',
      fontWeight: 700,
      width: '100%',
      maxWidth: ['100%', null, null, '55%', '500px', '640px', '851px'],
      mx: 'auto',
      mt: '30px',
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
};
