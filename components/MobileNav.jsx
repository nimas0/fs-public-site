import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Navbar,
  Nav,
  Button,
  Image,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTh, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import logout from "../utils/auth/logout";
import {
  useScrollDirection,
  useScrollPosition,
} from "../utils/hooks/scrolldirection";

import firebaseInit from "../utils/firebaseInit";
import "firebase/firestore";

// Initialize Firebase ap
firebaseInit();


 const MobileNav = ({
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


  // const [subscriptions, loadingSubscriptions, errorSubscriptions] = useDocument(
  //   firebase
  //     .firestore()
  //     .collection("subscriptions")
  //     .doc((AuthUser && `${listing.id}_${AuthUser.id}`) || "1")
  // );

  const [subscriptions, loadingSubscriptions, errorSubscriptions] = useCollection(
    firebase
      .firestore()
      .collection("subscriptions")
      .where("buyerUid", "==", (AuthUser && AuthUser.id) || "1")
    // {
    //   snapshotListenOptions: { includeMetadataChanges: true },
    // }
  );


  const [isScrolled, setScrolled] = useState(false);
  const breakpoint = useMediaBreakpoints();

  // useScrollPosition((position) => {
  //   if (position !== 0) {
  //     setScrolled(true);
  //   } else {
  //     setScrolled(false);
  //   }
  // });

  const logoutRefresh = async () => {
    try {
      await logout();
      console.log("routerpath", router.pathname);
    } finally {
      if (router.pathname.match(/listing/)) {
        router.replace(router.pathname, router.asPath);
      } else {
        router.push("/");
      }
    }
  };

  if (errorSubscriptions)
    return (
      <strong>
        Error:
        {' '}
        {/* {JSON.stringify(error)} */}
      </strong>
);



    // const subscriptionData = subscriptions.docs.length ? subscriptions.docs[0].data() : false;;
    //   console.log('subscriptionData', subscriptionData)
    return (
      <>
        <Navbar
          fixed='top'
          id='navbar-custom'
          style={{backgroundColor: '#EDEDED', paddingBottom: '1rem'}}
          className='text-info'
        >
          <>
            <Navbar.Toggle
              className='border-0'
              aria-controls='basic-navbar-nav'
            />
            <Navbar.Brand href='/'>
              <img
                src='https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/assets%2Flogos%2FProfile.png?alt=media&token=5863348f-23ce-4d09-8906-b90f5c95bcb1'
                className='ml-auto'
                alt='Finding Spaces'
              />
            </Navbar.Brand>
            {/* Placeholder to force brand to the right side  */}
           
            <Navbar.Text as='h1' className='text-reset flex-grow-1 order-2 mb-2'>
              {/* {address} */}
            </Navbar.Text>
            {/* Placeholder end  */}
          </>
          <Navbar.Collapse
            id='nav-links'
            className='flex-grow-0 order-5 order-sm-4'
          />
          <Nav variant="pills" className='mr-sm-0 mt-2 order-3 order-sm-5'>
            {AuthUser ? (
              <>

                <NavDropdown
                  key='down'
                  title={(
                    <div>
                      <img alt='user' width='43px' src="https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/menu.svg?alt=media&token=3f97f690-b2f6-48cc-9ac7-7cf2107af8b5" />
                    </div>
              )}
                  className='noCaret scheduling-shadow mt-n2'
                >
     
                  {/* TODO: Add dashboard link */}
                  <NavDropdown.Header className='bg-white rounded-top text-info mx-n2 ' bsPrefix='dropdown-header'>
         
                    <b>Subscriptions</b>
                  </NavDropdown.Header>
                  {loadingSubscriptions && "Loading..."} 
                  {
                    subscriptions && subscriptions.docs.map((subscription => (
                      <NavDropdown.Header className='rounded-sm  p-2  '>
                        <Button href={`/listing/${subscription.data().listingId}`} size='lg' className='bg-info py-2 text-white w-100'>
                          <FontAwesomeIcon
                            className='mr-2'
                            size='sm'
                            icon={faHome}
                            color='white'
                          />
                          {' '}
                          {subscription.data().listing.address[0]}
                        </Button>
                      </NavDropdown.Header>
                    )))
                  }
                 
               
                  <NavDropdown.Header className='mx-n2 mt-4 text-white bg-light'>
                    <Button href="https://seller.findingspaces.com/" size='sm' className='mt-4 py-2 w-100'>Seller dashboard</Button> 
                  </NavDropdown.Header>
                  <NavDropdown.Header className='mx-n2 mb-n3 mt-n2 rounded-bottom  text-light bg-light' href='/'> 
                    {' '}
                    <Button href="https://findingspaces.com" size='sm' className='mb-4  py-2  w-100'>Enter home code</Button>
                  </NavDropdown.Header>
          
                </NavDropdown>
                <NavDropdown
                  key='down'
                  title={(
                    AuthUser.photoURL ? (
                      <div>
                        <Image
                          className='rounded-sm'
                          width='34px'
                          src={AuthUser.photoURL}
                        />
                      </div>
                  )
                    : (
                      <FontAwesomeIcon
                        color='darkGrey'
                        size='2x'
                        icon={faUserCircle}
                      />
                  )
              )}
                  id='dropdown-basic'
                  className='hover-focus-opacity-90 noCaret mr-5 mt-n1 '
                >
                  {/* TODO: Add dashboard link */}
                  <NavDropdown.Item className=' my-1 p-1 bg-light' onClick={logoutRefresh}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
          
          ) : (
         
            <>
              <Nav.Link
                as={Button}
                variant='inherit'
                onClick={showLoginModal}
                className=''
              >
                <div>
                  <img alt='user' width='33px' src="https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/menu.svg?alt=media&token=3f97f690-b2f6-48cc-9ac7-7cf2107af8b5" />
                </div>
           
              </Nav.Link>
              <Nav.Link
                as={Button}
                variant='inherit'
                onClick={showLoginModal}
                className=''
              >
                <FontAwesomeIcon
                  className=' '
                  size='2x'
                  icon={faUserCircle}
                />
           
              </Nav.Link>
            </>
       
          )}
          </Nav>
        </Navbar>
      </>
  );
};


export default MobileNav;