'use strict';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Nav, Button, Image, NavDropdown, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logout from '../utils/auth/logout';
import { useScrollDirection, useScrollPosition } from '../utils/hooks/scrolldirection';

export default ({
   address,
   showQuickLinks = true,
   search,
   AuthUser,
   showLoginModal,
   solidBackground,
   showLogo,
   homepage = false,
}) => {
   const router = useRouter();

   const [isScrolled, setScrolled] = useState(false);

   useScrollPosition((position) => {
      if (position !== 0) {
         setScrolled(true);
      } else {
         setScrolled(false);
      }
   });
   
   console.log(isScrolled);
   //   useScrollDirection(direction => {
   //       console.log('direction', direction)
   //       if(direction === 'SCROLL_DIRECTION_NONE') {
   //          console.log('set Shadow')
   //       }
   //     })

   const logoutRefresh = async () => {
      try {
         await logout();
         console.log('routerpath',router.pathname)

      } finally {
         if(router.pathname.match(/listing/)) {
            router.replace(router.pathname, router.asPath);
           
         } else {
            router.push('/')
         }
        
      }
   };

   return (
      <>
         <Navbar
            id={solidBackground && isScrolled ? 'navbar-scrolling' : 'navbar-custom'}
            fixed
            sticky='top'
            className={` text-info ${solidBackground && 'bg-white schedulingShadow border'}   d-flex px-5 pt-3 pb-2 `}>
            <>
               <div className='flex-grow-0 order-1'>
                  <Link href='/' passHref>
                     <>
                        {homepage ? (
                           <Nav.Link variant='text-secondary' href='/learnmore'>
       
                           </Nav.Link>
                        ) : (
                           <Navbar.Brand style={{ cursor: 'pointer' }} className='font-italic'>
                              {showLogo && <img
                                 onClick={() => router.push('/')}
                                 width={'50%'}
                                 src='https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/logo%20idea-2-transparent.png?alt=media&token=0bc11614-2775-4c8c-8052-c897afb2b336'
                              />}
                           </Navbar.Brand>
                        )}
                     </>
                  </Link>
               </div>
               <Navbar.Text as='h1' className='text-reset flex-grow-1 order-2 mb-0'>
                  {/* {address} */}
               </Navbar.Text>
            </>

            <Navbar.Collapse id='nav-links' className='flex-grow-0 order-5 order-sm-4'>
               <Nav className='align-items-center align-items-sm-center'>
                  {AuthUser ? (
     
            
                        (showQuickLinks && (
                        <>
                           <Nav.Link
                              as={Button}
                              className='p-3'
                              variant='link'
                              href='/buyer/dashboard'>
                              Buyer's Dashboard
                           </Nav.Link>
                           <Nav.Link
                              as={Button}
                              className='p-3'
                              variant='link'
                              href='https://seller.findingspaces.com/showings'>
                              Seller's Dashboard
                           </Nav.Link>
                        </>
                        ))
        
                  ) : (
                     <>
                        <Nav.Link as={Button} variant='link' href='/learnmore'>
                           Get Started Selling Your House
                        </Nav.Link>
                        <Nav.Link as={Button} variant='link' onClick={showLoginModal}>
                           Buyer's Dashboard
                        </Nav.Link>
                        <Nav.Link as={Button} variant='link' onClick={showLoginModal}>
                           Seller's Dashboard
                        </Nav.Link>
                        {/* <Nav.Link as={Button} variant='link' onClick={showLoginModal}>
                           Buying
                        </Nav.Link> */}
                        {/* <Nav.Link as={Button} variant='link' href='#'>Home Dashboard</Nav.Link> */}
                        {/* TODO: Determine link or function */}
                     </>
                  )}
               </Nav>
            </Navbar.Collapse>
            <Nav className='mr-1 mr-sm-0 order-3 order-sm-5'>
               {AuthUser ? (
                  AuthUser.photoURL ? (
                     <NavDropdown
                        title={
                           <Image
                              src={AuthUser.photoURL}
                              roundedCircle
                              style={{ height: '2.5rem', width: '2.5rem' }}
                           />
                        }
                        id='dropdown-basic'
                        className='hover-focus-opacity-90 noCaret'>
                        {/* TODO: Add dashboard link */}
                        <NavDropdown.Item onClick={logoutRefresh}>Log Out</NavDropdown.Item>
                        <NavDropdown.Item href='/learnmore'>Learn More</NavDropdown.Item>
                        <NavDropdown.Item href='/learnmore'>Search</NavDropdown.Item>
                     </NavDropdown>
                  ) : (
                     <Nav.Link href='#' className='profile-icon'>
                        {/* TODO: Add dashboard link */}
                        <FontAwesomeIcon size='3x' icon={faUserCircle} />
                     </Nav.Link>
                  )
               ) : (
                  <Nav.Link
                     as={Button}
                     variant='inherit'
                     onClick={showLoginModal}
                     className='profile-icon'>
                     <FontAwesomeIcon size='2x' icon={faUserCircle} />
                  </Nav.Link>
               )}
            </Nav>
         </Navbar>
      </>
   );
};
