import React from 'react';
import { Box, Container, Grid } from 'theme-ui';
import BlockTitle from '../components/block-title';
import ServiceCard from '../components/cards/service-card';
import serviceImage1 from '../public/assets/service-1.png';
import serviceImage2 from '../public/assets/service-2.png';
import serviceImage3 from '../public/assets/service-3.png';
import serviceImage4 from '../public/assets/service-4.png';
import serviceImage5 from '../public/assets/service-5.png';
import serviceImage6 from '../public/assets/service-6.png';

const SERVICES_DATA = [
  {
    image: serviceImage1,
    text:
      'Need help understanding the real estate process? Finding Spaces has your back! We’ve simplified the selling process into five manageable steps that anyone can understand.',
    heading: 'Step by Step Guidance',
    path: '#',
  },
  {
    image: serviceImage2,
    text:
      'Texts from random numbers can get annoying. Set your availability and allow buyers to book showings directly from your listing page.',
    heading: 'Scheduling',
    path: '#',
  },
  {
    image: serviceImage3,
    text:
      "Show off your home's features! Buyers can chat with you, book showings and make offers.",
    heading: 'Listing Website',
    path: '#',
  },
  {
    image: serviceImage4,
    text:
      "This is your home's Identify. Buyers will scan and go directly to your listing page. Put your code on Zillow and order our yard sign to get maximum exposure.",
    heading: 'QR CODE',
    path: '#',
  },
  {
    image: serviceImage5,
    text:
      'Stop worrying about all of the real estate documents and how to fill them out. We provide the disclosures and purchase agreements you will need. These documents have been professionally explicitly written for “For Sale by Owners.” (Limited locations)',
    heading: 'Documents',
    path: '#',
  },
  {
    image: serviceImage6,
    text:
      "Don't waste your time with buyers that aren't qualified. Have them submit offers on your dashboard, where you can verify if they are serious buyers and send counteroffers.",
    heading: 'Negotiate Offers',
    path: '#',
  },
];
const Services = () => (
  <Box as='section' sx={styles.services}>
    <Container>
      <BlockTitle
        title='What does this platform offer?'
        text='Finding Spaces provides buyers and sellers with step-by-step guidance and the tools and resources needed to manage their real estate process.'
      />
      <Grid sx={styles.grid}>
        {SERVICES_DATA.map(({ image, text, heading, path }, index) => (
          <ServiceCard
            image={image}
            text={text}
            heading={heading}
            path={path}
            key={index}
          />
        ))}
      </Grid>
    </Container>
  </Box>
);

export default Services;

const styles = {
  services: {
    pt: ['80px', null, null, null, '80px', null, '100px'],
  },
  grid: {
    gridGap: '30px',
    gridTemplateColumns: ['1fr', null, null, '1fr 1fr', null, '1fr 1fr 1fr'],
  },
};
