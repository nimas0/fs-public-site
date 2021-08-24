import React from 'react';
import { Box, Container, Flex, Text, Heading } from 'theme-ui';
import { Link } from '../components/link';
import BlockTitle from '../components/block-title';
import Accordion from '../components/accordion/accordion';

const accordionData = [
  {
    isExpanded: false,
    title: 'Does Finding Spaces Use Real Estate Agents?',
    contents: (
      <div>
        No. Finding Spaces allows buyers and sellers to work directly, online,
        without real estate agents.
      </div>
    ),
  },
  {
    isExpanded: false,
    title: 'Does Finding Spaces Create A Real Estate Contract For Me?',
    contents: (
      <div>
        No. A purchase agreement (drafted by and reviewed by attorneys and
        meeting all the requirements of a binding contract) is included upon
        sign up. Buyers and sellers will be responsible for completing the
        document after they come to terms with an agreement.
      </div>
    ),
  },
  {
    isExpanded: false,
    title: 'Is the Finding Spaces Contract A Legally Binding Document?',
    contents: (
      <div>
        Yes. Our purchase agreement has been drafted by and reviewed by
        attorneys in Arizona and meeting all the requirements of a binding
        contract
      </div>
    ),
  },
  {
    isExpanded: false,
    title: ' What Does For Sale By Owner mean?',
    contents: (
      <div>
        Buying or selling For Sale By Owner means no real estate agent is
        involved in the process, therefore, you don't have to pay a middle man
        for their services.
      </div>
    ),
  },
  {
    isExpanded: false,
    title: 'Is For Sale By Owner Safe?',
    contents: (
      <div>
        Absolutely! Finding Spaces provides the same safeguards as a real estate
        agent would offer. Our legal documents have been professionally drafted
        and reviewed by Arizona attorneys. The rest of the hard work is
        completed by a title/escrow company of your choice.
      </div>
    ),
  },
  {
    isExpanded: false,
    title: 'What are the benefits of For Sale By Owner?',
    contents: (
      <div>
        By cutting out the middleman you not only save thousands, but you are
        able to be in control of the entire process. Real estate agents are busy
        people handling multiple transactions at once. This can put sellers at
        risk of not always getting top quality service.
      </div>
    ),
  },
  {
    isExpanded: false,
    title: 'Does Finding Spaces Advertise My Home?',
    contents: (
      <div>
        No. We will give the seller recommendations of the best marketing
        practices; however, sellers will be responsible for advertising on
        Zillow and other real estate marketplaces.
      </div>
    ),
  },
  {
    isExpanded: false,
    title: 'What Prevents Unqualified Offers?',
    contents: (
      <div>
        We require all buyers to submit a pre-approval before being able to book
        a showing or make an offer.
      </div>
    ),
  },
  {
    isExpanded: false,
    title: 'How Do Buyers Submit Offers?',
    contents: (
      <div>
        Sellers will give potential buyers their property code where buyers go
        to make “quick offers”. Quick offers are designed to get the buyer and
        seller to agree on the essential terms of an offer before filling out
        the purchase agreement. These are NOT binding agreements. Finding Spaces
        will walk the buyer through our quick offer process. Once all terms are
        agreed on, a purchase agreement will be provided along with instructions
        on the next steps of the process
      </div>
    ),
  },
];

const FAQ = () => {
  return (
    <Box as='section' id='fandq'>
      <Container>
        <BlockTitle
          title='Frequently Ask Question'
          text='Ask your question and meet'
        />
        <Flex sx={styles.flex}>
          <Box sx={styles.faqWrapper}>
            <Accordion items={accordionData} />
          </Box>
          <Box sx={styles.content}>
            <Heading as='h3'>
              Do you have any quesiton? Please ask here we ready to support
            </Heading>
            <Text as='p'>
              If your question is not list here, please feel free to make a
              manual support.
            </Text>
            <Link sx={styles.askButton} path='#'>
              Ask your Question
            </Link>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default FAQ;

const styles = {
  flex: {
    flexWrap: 'wrap',
    flexDirection: ['column', null, null, null, null, 'row-reverse'],
    pb: ['70px', null, null, null, '90px', null, '130px'],
  },
  content: {
    flex: ['0 0 100%', null, null, null, '0 0 33.333%'],
    maxWidth: ['100%', null, null, '450px', '100%'],
    mx: ['auto', null, null, null, '0'],
    mb: ['0px', null, null, null, '0'],
    textAlign: ['center', null, null, null, null, 'left'],
    mt: ['40px', null, null, null, null, '0'],
    h3: {
      fontSize: ['23px', null, null, null, '24px'],
      lineHeight: [1.5, null, null, null, 1.67],
      color: 'black',
      fontWeight: 700,
      letterSpacing: '-1.5px',
      mt: '-5px',
      pr: ['0', null, null, null, null, '30px'],
    },
    p: {
      fontSize: '16px',
      lineHeight: 1.87,
      color: '#343D48',
      opacity: 0.7,
      mt: '10px',
      pr: ['0', null, null, null, null, '80px'],
    },
  },
  askButton: {
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundColor: '#02073E',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 700,
    p: '6.5px 19px',
    letterSpacing: '-0.16px',
    mt: '25px',
    transition: 'all 500ms ease',
    '&:hover': {
      opacity: 0.8,
    },
  },
  faqWrapper: {
    flex: ['0 0 100%', null, null, null, '0 0 66.666%'],
  },
};
