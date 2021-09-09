import { faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap';

const ChatHeader = ({ AuthUser, listingId }) => {
  const router = useRouter();
  console.log(AuthUser, 'AuthUser');
  return (
    <>
      <Navbar
        sticky='top'
        className='nav-color  border-top-0 border-left-0 border-right-0'
        variant='light'
      >
        <Container fluid>
          <Navbar.Toggle />

          <Navbar>
            <h6 className='mt-1 text-white'>{router.query.address}</h6>
          </Navbar>
          <Navbar.Text className='ml-3'>
            {/* <FontAwesomeIcon size='2x' icon={faUserCircle} /> */}
          </Navbar.Text>
          <Nav>
            <Nav.Link
              onClick={async (e) => {
                e.preventDefault();
                router.push(
                  `/listing?chatId=${listingId}`,
                  `/listing/${listingId}`
                );
              }}
            >
              <FontAwesomeIcon size='2x' color='lightGreen' icon={faTimes} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className='row p-3 ml bg-light action-buttons'>
        {AuthUser.photoURL ? (
          <div>
            <Image
              className='ml-3'
              roundedCircle
              width='50px'
              src={AuthUser.photoURL}
            />
          </div>
        ) : (
          <FontAwesomeIcon color='darkGrey' size='2x' icon={faUserCircle} />
        )}
        <Button disabled size='lg' className='ml-3'>
          Offer
        </Button>
        <Button
          onClick={async (e) => {
            e.preventDefault();
            router.push(`/listing/${listingId}/tour`);
          }}
          size='lg'
          className='ml-3'
        >
          Schedule
        </Button>
      </div>
    </>
  );
};

ChatHeader.propTypes = {
  AuthUser: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    emailVerified: PropTypes.bool,
    id: PropTypes.string,
    verification: PropTypes.shape({
      status: PropTypes.string,
    }),
  }).isRequired,
  listingId: PropTypes.string.isRequired,
};

ChatHeader.defaultProps = {};

export default ChatHeader;
