'use strict';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Nav, Button, Image, InputGroup, FormControl, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import logout from '../../utils/auth/logout';

export default ({ address, search, AuthUser, showLoginModal }) => {
   const router = useRouter();
   const logoutRefresh = async () => {
      try {
         await logout();
      } finally {
         router.replace(router.pathname, router.asPath);
      }
   };

   return (
      <Navbar
         expand='sm'
         sticky='top'
         className='bg-white border-bottom border-top-2 navShadow d-flex px-1  pt-3 pb-2 mb-4'>
         <Container bsPrefix='container-md' className='px-1'>
            <div className='order-1'>
               <Link href='/' passHref>
                  <Navbar.Brand className='font-italic'>
                     <img  src='https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/logo%20idea-small.png?alt=media&token=03c1d0a0-7e97-4035-bbc7-5ddc44493efa' />
                  </Navbar.Brand>
               </Link>
            </div>
            <Nav className='ml-4 mr-auto w-25 order-2 float-left'>
               <InputGroup size='md'>
                  <InputGroup.Prepend className='bg-transparent'>
                     <InputGroup.Text className='bg-white border-right-0'>
                        <FontAwesomeIcon icon={faSearch} />
                     </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                     className='border-left-0'
                     placeholder='Find home by id or address'
                     aria-label="Recipient's username"
                     aria-describedby='basic-addon2'
                  />
               </InputGroup>
            </Nav>

            <Navbar.Toggle aria-controls='nav-links' className='order-4 order-sm-3' />
            <Navbar.Collapse id='nav-links' className='flex-grow-0 order-5 order-sm-4'>
               <Nav className='align-items-end align-items-sm-center'>
                  {AuthUser ? (
                     <Nav.Link as={Button} variant='link' onClick={logoutRefresh}>
                        Log out
                     </Nav.Link>
                  ) : (
                     <>
                        <Nav.Link as={Button} variant='link' onClick={showLoginModal}>
                           Learn More
                        </Nav.Link>
                        <Nav.Link as={Button} variant='link' onClick={showLoginModal}>
                           Buying
                        </Nav.Link>
                        <Nav.Link href='#'>Selling</Nav.Link>
                        {/* TODO: Determine link or function */}
                     </>
                  )}
               </Nav>
            </Navbar.Collapse>
            <Nav className='mr-3 mr-sm-0 order-3 order-sm-5 px-5'>
               {AuthUser ? (
                  AuthUser.photoURL ? (
                     <Nav.Link href='#' className='hover-focus-opacity-90'>
                        {/* TODO: Add dashboard link */}
                        <Image
                           src={AuthUser.photoURL}
                           roundedCircle
                           style={{ height: '2.5rem', width: '2.5rem' }}
                        />
                     </Nav.Link>
                  ) : (
                     <Nav.Link href='#' className='profile-icon'>
                        {/* TODO: Add dashboard link */}
                        <FontAwesomeIcon icon={faUserCircle} />
                     </Nav.Link>
                  )
               ) : (
                  <Nav.Link
                     as={Button}
                     variant='link'
                     onClick={showLoginModal}
                     className='profile-icon'>
                     <FontAwesomeIcon icon={faUserCircle} />
                  </Nav.Link>
               )}
            </Nav>
         </Container>
      </Navbar>
   );
};
