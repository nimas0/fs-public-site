'use strict';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
   Navbar,
   Nav,
   Button,
   Image,
   InputGroup,
   FormControl,
   Container,
   NavDropdown,
} from 'react-bootstrap';
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
      <Navbar expand='sm' className=' bnavShadow d-flex px-1  pt-3 pb-2 mb-4'>
         <Container bsPrefix='container-md' className='px-1'>
            <div className='order-1'>
               <Link href='/' passHref>
                  <Navbar.Brand className='font-italic'>
                     <img
                        width={'50%'}
                        src='https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/logo%20idea-2-transparent.png?alt=media&token=0bc11614-2775-4c8c-8052-c897afb2b336'
                     />
                  </Navbar.Brand>
               </Link>
            </div>
            <Nav className='ml-2 mr-auto w-50 order-2 float-left p-1'>
               <InputGroup size='md'>
                  <InputGroup.Prepend className='prepend bg-transparent'>
                     <InputGroup.Text className='bg-white border-0'>
                        <FontAwesomeIcon icon={faSearch} />
                     </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                     className='form-control-override border-left-0'
                     placeholder='Find home by id or address'
                     aria-label="Recipient's username"
                     aria-describedby='basic-addon2'
                  />
               </InputGroup>
            </Nav>

            <Navbar.Toggle aria-controls='nav-links' className='order-4 order-sm-3' />
            <Navbar.Collapse id='nav-links' className='flex-grow-0 order-5 order-sm-4'>
               <Nav className='align-items-end align-items-sm-center'>
                  {!AuthUser && (
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
            <Nav className='mr-sm-0 order-3 order-sm-5'>
               {AuthUser ? (
                  AuthUser.photoURL ? (
                     <NavDropdown
                        className='cardShadow'
                        title={
                           <Nav.Link href='#' className='hover-focus-opacity-90'>
                              {/* TODO: Add dashboard link */}
                              <Image
                                 src={AuthUser.photoURL}
                                 roundedCircle
                                 style={{ height: '2.5rem', width: '2.5rem' }}
                              />
                           </Nav.Link>
                        }
                        id='basic-nav-dropdown'>
                        <NavDropdown.Item onClick={logoutRefresh}>Log Out</NavDropdown.Item>
                        <NavDropdown.Item href='http://localhost:3001'>
                           Seller's Dashboard
                        </NavDropdown.Item>
                        <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
                     </NavDropdown>
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
