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
import serviceBackground from '../public/assets/services.jpeg';

const SERVICES_DATA = [
  {
    image: serviceImage1,
    text:
      'From putting your home on the market to writing offers, glide through the real estate process using findingSpaces dashboard to provide the education and tools needed along the way.',
    heading: 'Step by Step Guidance',
    path: '#',
  },
  {
    image: serviceImage6,
    text:
      'We give sellers easy access to market their home on Zillow and social media platforms. Buyers no longer need real estate agents to search for homes on the MLS',
    heading: 'Marketing',
    path: '#',
  },
  {
    image: serviceImage2,
    text:
      'Stop scheduling showings manually. After sellers set their availability, buyers can request a showing directly from the listing page.',
    heading: 'Scheduling',
    path: '#',
  },
  {
    image: serviceImage3,
    text:
      'The listing page is where buyers will spend the majority of their time. Buyers can communicate with sellers and make guided offers.',
    heading: 'Listing Website',
    path: '#',
  },
  {
    image: serviceImage4,
    text:
      'Sellers can market their homes with a QR code to direct all buyers to their listing page. This prevents sellers from getting unwanted calls from real estate agents. ',
    heading: 'QR CODE',
    path: '#',
  },
  {
    image: serviceImage5,
    text:
      'Real estate documentation can be the tricky part. Our easy-fill documentation makes writing offers seem effortless.',
    heading: 'Documents',
    path: '#',
  },
];
const Services = () => (
  <Box as='section' sx={styles.services}>
    <Container>
      <BlockTitle
        title='What does this platform offer?'
        text='Buyers and sellers with little real estate experience can avoid hidden agents fees and work directly with each other.'
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
    // backgroundImage: `url(${serviceBackground})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: ['100%'],
  },
  grid: {
    gridGap: '30px',
    gridTemplateColumns: ['1fr', null, null, '1fr 1fr', null, '1fr 1fr 1fr'],
  },
};
