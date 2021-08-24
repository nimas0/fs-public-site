/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-use-before-define */
/** @jsx jsx */
import { jsx, Container, Flex, Box } from 'theme-ui';
import { Link as ScrollLink } from 'react-scroll';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from '../link';
import Logo from '../logo';
import { DrawerProvider } from '../../contexts/drawer/drawer.provider';
import menuItems from './header.data';
import logoDark from '../../public/assets/logo idea-2-transparent extra small.png';
import UserDrawer from './UserDrawer';

export default function Header({ auth, showLoginModal, className }) {
  const router = useRouter();
  const isListingPage = router.pathname.toString().match('listing');
  const isSearchPage = router.pathname.toString().match('search');
  const hideMenu = isListingPage || isSearchPage;
  return (
    <DrawerProvider>
      <header sx={styles.header} className={className}>
        <Container sx={styles.container}>
          <Logo image={logoDark} />

          <Flex as='nav' sx={styles.nav}>
            {menuItems.map(({ path, label }, i) => (
              <ScrollLink
                activeClass='active'
                sx={styles.nav.navLink}
                to={path}
                spy
                smooth
                offset={-70}
                duration={500}
                key={i}
              >
                {!hideMenu && label}
              </ScrollLink>
            ))}
          </Flex>

          <Link
            path='https://seller.findingspaces.com'
            ml={4}
            label='Get Started'
            sx={styles.headerBtn}
            variant='buttons.primary'
          />
          <Box onClick={() => router.push('/search')} sx={styles.handler}>
            <FontAwesomeIcon icon={faSearch} color='darkGrey' size='2x' />
          </Box>
          <UserDrawer AuthUser={auth} showLoginModal={showLoginModal} />
        </Container>
      </header>
    </DrawerProvider>
  );
}

const styles = {
  headerBtn: {
    backgroundColor: '#267000',
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '-0.16px',
    borderRadius: '5px',
    color: '#ffffff',
    padding: '6.5px 24px',
    display: ['none', null, null, null, 'inline-block'],
    ml: ['0', null, null, 'auto', '0'],
    mr: ['0', null, null, '20px', '0'],
    '&:hover': {
      color: '#fff',
    },
  },
  profileButton: {
    backgroundColor: 'transparent',
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '-0.16px',
    borderRadius: '5px',
    color: '#ffffff',
    padding: '6.5px 24px',
    display: ['none', null, null, null, 'inline-block'],
    ml: ['0', null, null, 'auto', '0'],
    mr: ['0', null, null, '20px', '0'],
    '&:hover': {
      color: '#fff',
    },
  },
  handler: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
    width: '26px',
    mx: '1rem',
    ml: '2rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  header: {
    color: 'text_white',
    fontWeight: 'normal',
    py: '25px',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    transition: 'all 0.4s ease',

    '&.sticky': {
      backgroundColor: 'background',
      color: 'text',

      py: '15px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    width: [null, null, null, null, null, null, '1390px'],
    '@media screen and (max-width: 960px)': {
      justifyContent: 'space-between',
    },
  },

  nav: {
    mx: 'auto',
    '@media screen and (max-width: 960px)': {
      display: 'none',
    },
    navLink: {
      fontSize: '16px',
      color: '#02073E',
      fontWeight: '400',
      cursor: 'pointer',
      lineHeight: '1.2',
      mr: '48px',
      transition: '500ms',
      ':last-child': {
        mr: '0',
      },
      '&:hover, &.active': {
        color: 'primary',
      },
    },
    top: 0,
  },
};
