import React, { useState } from 'react';
import { Box, Container, Button, Heading, Text } from 'theme-ui';
import { keyframes } from '@emotion/core';
import { Link as ScrollLink, scroller } from 'react-scroll';
import { AiFillDollarCircle, AiFillPieChart } from 'react-icons/ai';
import { FaBriefcase, FaCog } from 'react-icons/fa';
import YouTube from 'react-youtube';
import useMediaBreakpoints from '@tywmick/use-media-breakpoints';
import BlockTitle from '../components/block-title';
import Image from '../components/image';
import tabImage1 from '../public/assets/leads.gif';
import dotPattern from '../public/assets/dot-pattern.svg';

const Featured = () => {
  const [tab, setTab] = useState({
    active: 'budget',
  });

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

  const handleTab = (tab) => {
    if (tab === 'budget') {
      setTab({
        ...tab,
        active: 'budget',
      });
    }
    if (tab === 'adjust') {
      setTab({
        ...tab,
        active: 'adjust',
      });
    }
    if (tab === 'report') {
      setTab({
        ...tab,
        active: 'report',
      });
    }
    if (tab === 'create') {
      setTab({
        ...tab,
        active: 'create',
      });
    }
  };
  return (
    <Box as='section' sx={styles.featured}>
      <Container sx={styles.container}>
        <Box sx={styles.blockTitle} className='blockTitle'>
          <Heading as='h3'>How it works</Heading>
          <Text as='p'>Watch this short explainer video to learn more.</Text>
        </Box>

        <YouTube
          // autoPlay={false}
          videoId='2prAwVk_RI0'
          onEnd={handleEnding}
          opts={{
            height: breakpoints.xs ? 210 : 580,
            width: breakpoints.xs ? '100%' : '100%',
            playerVars: {
              autoplay: 0,
            },
          }}
        />
        <br />
        <br />
        <br />
        {/* <Box sx={styles.tabButtonTopWrapper}>
          <Box sx={styles.tabButtonWrapper}> */}
        {/* <Button
              onClick={() => handleTab('budget')}
              className={`${tab.active === 'budget' ? 'active' : ''}`}
            >
              <AiFillDollarCircle />
              Negotiate Offers
            </Button> */}
        {/* <Button
              onClick={() => handleTab('adjust')}
              className={`${tab.active === 'adjust' ? 'active' : ''}`}
            >
              <FaCog />
              Input Listing Details
            </Button>
            <Button
              onClick={() => handleTab('report')}
              className={`${tab.active === 'report' ? 'active' : ''}`}
            >
              <AiFillPieChart />
              View Performance
            </Button>
            <Button
              onClick={() => handleTab('create')}
              className={`${tab.active === 'create' ? 'active' : ''}`}
            >
              <FaBriefcase />
              Publish Common Questions
            </Button> */}
        {/* </Box>
        </Box> */}
        {/* <Box sx={styles.tabContent}> */}
        {/* {tab.active === 'budget' && (
            <Image src={tabImage1} alt='tab image' className='tabImage' />
          )}
          {tab.active === 'create' && (
            <Image src={tabImage1} alt='tab image' className='tabImage' />
          )}
          {tab.active === 'adjust' && (
            <Image src={tabImage1} alt='tab image' className='tabImage' />
          )}
          {tab.active === 'report' && (
            <Image src={tabImage1} alt='tab image' className='tabImage' />
          )} */}
        {/* </Box> */}
      </Container>
    </Box>
  );
};

export default Featured;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const styles = {
  featured: {
    pt: ['80px', null, null, null, '80px', null, '100px'],
    backgroundColor: '#2b3b38',
    color: 'white',
  },
  container: {
    color: 'white',
  },
  tabButtonTopWrapper: {
    overflowY: ['hidden', null, null, null, null, 'inherit'],
    overflowX: ['auto', null, null, null, null, 'inherit'],
  },
  tabButtonWrapper: {
    width: ['700px', null, null, null, null, '100%'],
    mx: ['auto', null, null, null, null, '0'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid rgba(1,7,13,.1)',
    mb: '35px',
    button: {
      display: 'flex',
      alignItems: 'center',
      pb: ['15px', null, null, null, '35px'],
      px: ['15px', null, null, null, '30px'],
      flexShrink: '0',
      border: 0,
      backgroundColor: 'rgba(0,0,0,0)',
      color: '#0F2137',
      fontSize: ['14px', null, null, null, '18px'],
      fontWeight: 500,
      lineHeight: 1,
      position: 'relative',
      transition: 'all 500ms ease',
      svg: {
        fontSize: ['18px', null, null, null, '30px'],
        color: '#ADBDD0',
        opacity: 0.7,
        mr: '15px',
        transition: 'all 500ms ease',
      },
      '&:hover, &.active': {
        backgroundColor: 'rgba(0,0,0,0)',
        color: '#0F2137',
        svg: {
          color: '#0F2137',
          opacity: 1,
        },
        '&::before': {
          transform: 'scale(1,1)',
        },
      },
      '&::before': {
        content: "''",
        position: 'absolute',
        bottom: '-2px',
        backgroundColor: '#0F2137',
        left: 0,
        width: '100%',
        height: '3px',
        transform: 'scale(0,1)',
        transition: 'transform 500ms ease',
      },
    },
  },
  tabContent: {
    minHeight: ['190px', null, '300px', '385px', null, '600px'],
    position: 'relative',
    '&::before': {
      content: "''",
      width: '302px',
      height: '347px',
      backgroundImage: `url(${dotPattern})`,
      position: 'absolute',
      bottom: '-30px',
      right: '-40px',
      display: ['none', null, null, null, null, 'block'],
    },
    '.tabImage': {
      position: 'relative',
      animation: `${fadeIn} 0.8s linear`,
    },
  },
  blockTitle: {
    textAlign: 'center',
    mb: ['60px', null, null, null, '60px', null, '80px'],
    h3: {
      color: '#fff',
      fontSize: ['23px', null, null, '30px'],
      fontWeight: 700,
      letterSpacing: '-1.5px',
      lineHeight: 1,
      mb: '20px',
    },
    p: {
      lineHeight: 1,
      fontSize: '18px',
      color: 'lightGrey',
    },
  },
};
