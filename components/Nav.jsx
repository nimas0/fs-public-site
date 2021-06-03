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
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import useMediaBreakpoints from "@tywmick/use-media-breakpoints";
import logout from "../utils/auth/logout";
import {
  useScrollDirection,
  useScrollPosition,
} from "../utils/hooks/scrolldirection";

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
  const breakpoint = useMediaBreakpoints();

  useScrollPosition((position) => {
    if (position !== 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

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

  return (
    <>
      <Navbar
        id={solidBackground && isScrolled ? "" : "navbar-custom"}
        sticky='top'
        className={` text-info ${solidBackground &&
          " bg-light schedulingShadow "}   d-flex px-5 pt-3 pb-2 `}
      >
        <>
          <Navbar.Toggle
            className='border-0 '
            aria-controls='basic-navbar-nav'
          />
          <div className='flex-grow-0 order-1' />
          <Navbar.Text as='h1' className='text-reset flex-grow-1 order-2 mb-0'>
            {/* {address} */}
          </Navbar.Text>
        </>

        <Navbar.Collapse
          id='nav-links'
          className='flex-grow-0 order-5 order-sm-4'
        />
        <Nav className='mr-1 mr-sm-0  order-3 order-sm-5'>
          {AuthUser ? (
            AuthUser.photoURL ? (
              <NavDropdown
                key='down'
                title={
                  <div>
                    <Image src='https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/assets%2Flogos%2FProfile.png?alt=media&token=5863348f-23ce-4d09-8906-b90f5c95bcb1' />
                  </div>
                }
                id='dropdown-basic'
                className='hover-focus-opacity-90 noCaret'
              >
                {/* TODO: Add dashboard link */}
                <NavDropdown.Item onClick={logoutRefresh}>
                  Log Out
                </NavDropdown.Item>

                <NavDropdown.Item href='/learnmore'>Search</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href='#' className='profile-icon'>
                {/* TODO: Add dashboard link */}
                <FontAwesomeIcon size='3x' icon={faUserCircle} />
              </Nav.Link>
            )
          ) : (
            breakpoint.up.lg && (
              <Nav.Link
                as={Button}
                variant='inherit'
                onClick={showLoginModal}
                className='profile-icon'
              >
                <FontAwesomeIcon size='2x' icon={faUserCircle} />
              </Nav.Link>
            )
          )}
        </Nav>
      </Navbar>
    </>
  );
};
