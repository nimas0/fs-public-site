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

export default ({ address, search, AuthUser, showLoginModal, logoActive }) => {
   const router = useRouter();
   const logoutRefresh = async () => {
      try {
         await logout();
      } finally {
         router.replace(router.pathname, router.asPath);
      }
   };

   return (
      <header className='navbar navbar-sticky navbar-expand-xl navbar-light'>
         {logoActive ? (
            <Link href='/' passHref>
               <Navbar.Brand className='font-italic'>
                  <img
                     width={'50%'}
                     src='https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/logo%20idea-2-transparent.png?alt=media&token=0bc11614-2775-4c8c-8052-c897afb2b336'
                  />
               </Navbar.Brand>
            </Link>
         ) : (
            <Nav.Link className='text-muted' href='#home'>
               <p>About</p>
            </Nav.Link>
         )}

         <div className='ml-auto position-relative'>
            <button
               className='navbar-toggler d-lg-none '
               type='button'
               data-toggle='navbarToggler'
               aria-label='Toggle navigation'>
               <span className='navbar-toggler-icon' />
            </button>
            <div className='navbar-inner'>
               {/*  Mobile Menu Toggler */}
               <button
                  className='navbar-toggler d-lg-none'
                  type='button'
                  data-toggle='navbarToggler'
                  aria-label='Toggle navigation'>
                  <span className='navbar-toggler-icon' />
               </button>
               <Navbar expand='lg'>
                  <Navbar.Toggle aria-controls='basic-navbar-nav' />
                  <Navbar.Collapse id='basic-navbar-nav'>
                     <Nav className='mr-auto'>
                        <Nav.Link href='/learnmore'>Learn More</Nav.Link>
                        {AuthUser && (
                           <>
                              <Nav.Link href='/buyer/dashboard'>Buying Dashboard</Nav.Link>
                              <Nav.Link href='https://seller.findingspaces/showings'>
                                 Selling Dashboard
                              </Nav.Link>
                           </>
                        )}
                     </Nav>
                  </Navbar.Collapse>

                  {AuthUser ? (
                     AuthUser.photoURL ? (
                        <NavDropdown
                           id=''
                           className='cardShadow d-flex align-content-center'
                           title={
                              <Image
                                 className=' d-flex align-content-center'
                                 src={AuthUser.photoURL}
                                 roundedCircle
                                 style={{ height: '2.0rem', width: '2.0rem' }}
                              />
                           }>
                           <NavDropdown.Item onClick={logoutRefresh}>Log Out</NavDropdown.Item>
                           <NavDropdown.Item href='https://seller.findingspaces.com'>
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
                        variant='dark'
                        onClick={showLoginModal}
                        className='profile-icon'>
                        <FontAwesomeIcon icon={faUserCircle} />
                     </Nav.Link>
                  )}
               </Navbar>
            </div>
         </div>
        
      </header>
   );
};
