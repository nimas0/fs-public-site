import React, { useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCross,
  faTimes,
  faTimesCircle,
  faUserCircle,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import Layout from '../../components/layout';
import { StickyProvider } from '../../contexts/app/app.provider';
import theme from '../../theme';
import withAuthUser from '../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../../utils/pageWrappers/withLoginModal';
import { makeMessages, timeFormatter, addTextToMessageList } from './dataMsg';
import ChatComponent from './chat-ui/index';
import './standard.css';

const Chat = ({ AuthUserInfo, showLoginModal }) => {
  const AuthUser = AuthUserInfo.authUser;
  const [msgs, setMsg] = useState(makeMessages(20));
  return (
    <div>
      <Head>
        <title>Chat with Seller</title>
      </Head>

      <Navbar
        sticky='top'
        className='nav-color  border-top-0 border-left-0 border-right-0'
        variant='light'
      >
        <Container fluid>
          <Navbar.Toggle />

          <Navbar.Text>
            <h6 className='text-left text-white'>Brandon Mcgee</h6>
            <h4 className='mt-1 text-white'>1234 Main Street Phoenix AZ</h4>
          </Navbar.Text>
          <Navbar.Text className='ml-3'>
            {/* <FontAwesomeIcon size='2x' icon={faUserCircle} /> */}
          </Navbar.Text>
          <Nav>
            <Nav.Link eventKey={2} href='#memes'>
              <FontAwesomeIcon size='2x' color='lightGreen' icon={faTimes} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className='row p-3 ml bg-light action-buttons'>
        <Button size='lg' className='ml-3'>
          Make on Offer
        </Button>
        <Button size='lg' className='ml-3'>
          Schedule Showing
        </Button>
        {/* <h6 className='mt-2 ml-2'>It's easy!</h6> */}
      </div>

      <ChatComponent
        messages={msgs}
        agentUser='Agent'
        iconSend={<FontAwesomeIcon icon={faCheck} size={15} />}
        onMessageSend={(text) => setMsg(addTextToMessageList(text, msgs))}
        timeFormatter={timeFormatter}
        displayStop
        onMessageStop={() => null}
      />
    </div>
  );
};

export default withAuthUser(withAuthUserInfo(withLoginModal(Chat)));
