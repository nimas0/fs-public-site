import { faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

const ChatHeader = ({ AuthUser }) => (
  <>
    <Navbar
      sticky='top'
      className='nav-color  border-top-0 border-left-0 border-right-0'
      variant='light'
    >
      <Container fluid>
        <Navbar.Toggle />

        <Navbar.Text>
          <h6 className='mt-1 text-white'>1234 Main Street Phoenix AZ</h6>
        </Navbar.Text>
        <Navbar.Text className='ml-3'>
          {/* <FontAwesomeIcon size='2x' icon={faUserCircle} /> */}
        </Navbar.Text>
        <Nav>
          <Nav.Link>
            <FontAwesomeIcon size='2x' color='lightGreen' icon={faTimes} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <div className='row p-3 ml bg-light action-buttons'>
      <FontAwesomeIcon
        className='ml-3 mr-2'
        color='darkGrey'
        size='2x'
        icon={faUserCircle}
      />

      <Button size='lg' className='ml-3'>
        Make Offer
      </Button>
      <Button size='lg' className='ml-3'>
        Schedule
      </Button>
      {/* <h6 className='mt-2 ml-2'>It's easy!</h6> */}
    </div>
  </>
);

export default ChatHeader;
