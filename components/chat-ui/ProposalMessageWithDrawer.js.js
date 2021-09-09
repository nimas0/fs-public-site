/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useContext, useEffect, useState } from 'react';
import { Box } from 'theme-ui';
import { Scrollbars } from 'react-custom-scrollbars';
import { IoMdClose } from 'react-icons/io';
import firebase from 'firebase';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import { DrawerContext } from '../../contexts/drawer/drawer.context';
import Drawer from '../drawer';
import MessageProposal from './MessageProposal';

const styles = {
  handler: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
    width: '26px',
    mx: '1rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  profile: {},
  drawer: {
    width: '100%',
    height: '100%',
    background: '#fff',
  },

  close: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '30px',
    right: '30px',
    zIndex: '1',
  },

  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    pt: '40px',
    pb: '40px',
    px: '30px',
  },

  menu: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',

    a: {
      fontSize: '16px',
      fontWeight: '400',
      color: 'black',
      py: '5px',
      cursor: 'pointer',
    },
  },

  menuFooter: {
    width: '100%',
    padding: '2',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mt: 'auto',
  },

  button: {
    fontSize: '15px',
    fw: '700',
    height: '48px',
    borderRadius: '3px',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    py: '0',
    my: '7px',
    backgroundColor: '#1A2321',
    color: '#fff',
  },
};

const ProposalMessageWithDrawer = ({ isMine, messageData, setSelected }) => {
  const [proposal, setProposal] = useState(null);
  const { state, dispatch } = useContext(DrawerContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { proposalId } = router.query;

  // retrieve proposal id every time state changes
  // or bail out early if state === false
  useEffect(() => {
    if (!state.isOpen) router.query.proposalId = null;
    if (!state.isOpen) return;
    console.log('got called in useProposal222', proposalId);
    const unsubscribe = async () => {
      const proposalsRef = firebase
        .firestore()
        .collection('proposals')
        .doc(proposalId);
      proposalsRef
        .get()
        .then((doc) => setProposal(doc.data()))
        .catch((err) => {
          console.log(err);
          setError(err);
        });
    };
    setLoading(true);
    unsubscribe();
    setLoading(false);
    // eslint-disable-next-line consistent-return
    return () => unsubscribe();
  }, [state]);

  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: 'TOGGLE',
    });
  }, [dispatch]);

  // while effects is running
  if (loading) return <p>loading</p>;
  if (error)
    return (
      <div>
        <p>Contact Support: </p> <br /> {error}{' '}
      </div>
    );
  return (
    <Drawer
      width='420px'
      drawerHandler={
        <MessageProposal
          setSelected={setSelected}
          isMine={isMine}
          data={messageData}
        />
      }
      open={state.isOpen}
      toggleHandler={toggleHandler}
      closeButton={<IoMdClose size='24px' color='#02073E' />}
      drawerStyle={styles.drawer}
      closeBtnStyle={styles.close}
    >
      <Scrollbars autoHide>
        <Box sx={styles.content}>
          <Box sx={styles.menu}>
            <Container>
              <Row>
                You made a proposal for ${' '}
                {(proposal && proposal.offerDetails.amount) || 'coming soon'}
              </Row>
              <Row className='border border-top-0 my-3' />
              <Row className='my-2'>
                <Col>
                  <h6>Lender:</h6>
                </Col>
                <Col>
                  <h6>{(proposal && proposal.lender) || 'Coming Soon'}</h6>
                </Col>
              </Row>
              <Row className='my-2'>
                <Col>
                  <h6>Amount:</h6>
                </Col>
                <Col>
                  <h6>{(proposal && proposal.offerDetails.amount) || ' '} </h6>
                </Col>
              </Row>
              <Row className='my-2'>
                <Col>
                  <h6>Deposit:</h6>
                </Col>
                <Col>
                  <h6>{(proposal && proposal.offerDetails.deposit) || ''}</h6>
                </Col>
              </Row>
              <Row className='my-2'>
                <Col>
                  <h6>Financing:</h6>
                </Col>
                <Col>
                  <h6>{(proposal && proposal.offerDetails.financing) || ''}</h6>
                </Col>
              </Row>
              <Row className='my-2'>
                <Col>
                  <h6>Remarks:</h6>
                </Col>
                <Col>
                  <h6>
                    {(proposal && proposal.offerDetails.comment) ||
                      'no remarks'}
                  </h6>
                </Col>
              </Row>
              <Row className='border border-top-0 my-3' />
            </Container>
          </Box>

          <Box sx={styles.menuFooter}>
            <Row>
              This is not an official offer. At this stage of the process you
              are only verbally agreeing to the terms.
            </Row>
          </Box>
        </Box>
      </Scrollbars>
    </Drawer>
  );
};

export default ProposalMessageWithDrawer;
