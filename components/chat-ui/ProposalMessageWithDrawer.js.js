/* eslint-disable react/jsx-wrap-multilines */
import React, { useContext, useEffect, useState } from 'react';
import { Button, Box } from 'theme-ui';
import { Scrollbars } from 'react-custom-scrollbars';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { Link as ScrollLink } from 'react-scroll';
import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from 'antd';
import { Col, Container, Row } from 'react-bootstrap';
import logoDark from '../../public/assets/logo-dark.svg';
import Logo from '../logo';

import { DrawerContext } from '../../contexts/drawer/drawer.context';
import menuItems from '../header/header.data';
import Drawer from '../drawer';
import logout from '../../utils/auth/logout';
import Image from '../image';
import MessageProposal from './MessageProposal';
import { useProposal } from '../../utils/hooks/useProposal';

const ProposalMessageWithDrawer = ({
  AuthUser,
  showLoginModal,
  isMine,
  messageData,
  setSelected,
  selected,
}) => {
  const [proposal, setProposal] = useState(null);
  const { state, dispatch } = useContext(DrawerContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { proposalId } = router.query;
  useEffect(() => {
    if (!state.isOpen) router.query.proposalId = null;
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

  if (loading) return <p>loading</p>;

  return (
    <Drawer
      width='320px'
      drawerHandler={
        <div>
          <MessageProposal
            setSelected={setSelected}
            isMine={isMine}
            data={messageData}
          />
        </div>
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

export default ProposalMessageWithDrawer;
